import resolveApi, { resolveApiHeaders } from './resolveApi';
import getElectron from './getElectron';
import { showSnackbarError } from './snackbar';
import { isOneOfPage } from './pageDefs';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const strmid = uuidv4();

let eventSource: EventSource | null = null;
let apiLogging = false;
let apiDisabled = false;

let volatileConnectionMap: Record<string, string> = {};
let volatileConnectionInvMap: Record<string, string> = {};

export function getVolatileConnectionMap() {
  return volatileConnectionMap;
}

export function getVolatileConnectionInvMap() {
  return volatileConnectionInvMap;
}

export function disableApi() {
  apiDisabled = true;
}

export function enableApi() {
  apiDisabled = false;
}

export function setVolatileConnectionRemapping(existingConnectionId: string, volatileConnectionId: string) {
  volatileConnectionMap = { ...volatileConnectionMap, [existingConnectionId]: volatileConnectionId };
  volatileConnectionInvMap = { ...volatileConnectionInvMap, [volatileConnectionId]: existingConnectionId };
}

export function getVolatileRemapping(conid: string) {
  return volatileConnectionMap[conid] || conid;
}

export function getVolatileRemappingInv(conid: string) {
  return volatileConnectionInvMap[conid] || conid;
}

export function removeVolatileMapping(conid: string) {
  const mapped = volatileConnectionMap[conid];
  if (mapped) {
    volatileConnectionMap = _.omit(volatileConnectionMap, conid);
    volatileConnectionInvMap = _.omit(volatileConnectionInvMap, mapped);
  }
}

function wantEventSource() {
  if (!eventSource) {
    eventSource = new EventSource(`${resolveApi()}/stream?strmid=${strmid}`);
  }
}

async function processApiResponse(route: string, args: any, resp: any) {
  if (resp?.missingCredentials) {
    return resp?.detail?.keepErrorResponseFromApi ? resp : null;
  } else if (resp?.apiErrorMessage) {
    showSnackbarError('API error:' + resp?.apiErrorMessage);
    return { errorMessage: resp.apiErrorMessage };
  }
  return resp;
}

export function transformApiArgs(args: any) {
  return _.mapValues(args, (v, k) => {
    if (k == 'conid' && v && volatileConnectionMap[v]) return volatileConnectionMap[v];
    if (k == 'conidArray' && _.isArray(v)) return v.map((x) => volatileConnectionMap[x] || x);
    return v;
  });
}

export async function apiCall(
  route: string,
  args: any = undefined,
  options?: { skipDisableChecks?: boolean }
) {
  if (apiLogging) {
    console.log('>>> API CALL', route, args);
  }
  if (!options?.skipDisableChecks) {
    if (apiDisabled) {
      console.log('API disabled!!', route);
      return;
    }
  }

  args = transformApiArgs(args);

  const electron = getElectron();
  if (electron) {
    const resp = await electron.invoke(route.replace('/', '-'), args);
    return await processApiResponse(route, args, resp);
  } else {
    const resp = await fetch(`${resolveApi()}/${route}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'x-api-session-id': getApiSessionId(),
        'x-ui-language': localStorage.getItem('selectedLanguage') || 'en',
        ...resolveApiHeaders(),
      },
      body: JSON.stringify(args),
    });

    if (resp.status == 401 && !apiDisabled) {
      const page = (window as any)['dbgate_page'];
      disableApi();
      console.log('Disabling API', route);
      if (page != 'login' && page != 'admin-login' && page != 'not-logged') {
        const config = await apiCall('config/get', {}, { skipDisableChecks: true });
        // TODO: handle auth on startup
      }
      return;
    }

    const json = await resp.json();
    return await processApiResponse(route, args, json);
  }
}

const apiHandlers = new WeakMap();

export function apiOn(event: string, handler: Function) {
  const electron = getElectron();
  if (electron) {
    if (!apiHandlers.has(handler)) {
      const handlerProxy = (e: any, data: any) => {
        if (apiLogging) console.log('@@@ API EVENT', event, data);
        handler(data);
      };
      apiHandlers.set(handler, handlerProxy);
    }
    electron.addEventListener(event, apiHandlers.get(handler));
  } else {
    wantEventSource();
    if (!apiHandlers.has(handler)) {
      const handlerProxy = (e: MessageEvent) => {
        const json = JSON.parse(e.data);
        if (apiLogging) console.log('@@@ API EVENT', event, json);
        handler(json);
      };
      apiHandlers.set(handler, handlerProxy);
    }
    eventSource!.addEventListener(event, apiHandlers.get(handler));
  }
}

export function apiOff(event: string, handler: Function) {
  const electron = getElectron();
  if (apiHandlers.has(handler)) {
    if (electron) {
      electron.removeEventListener(event, apiHandlers.get(handler));
    } else {
      wantEventSource();
      eventSource!.removeEventListener(event, apiHandlers.get(handler));
    }
  }
}

export function getVolatileConnections() {
  return Object.values(volatileConnectionMap);
}

export function installNewVolatileConnectionListener() {
  apiOn('got-volatile-token', async ({ savedConId, volatileConId }: any) => {
    setVolatileConnectionRemapping(savedConId, volatileConId);
  });
}

export function installNewCloudTokenListener() {
  apiOn('got-cloud-token', async (tokenHolder: any) => {
    // TODO: cloud signin token handling
  });
}

export function getAuthCategory(config: any) {
  if (config.isBasicAuth) return 'basic';
  if (isOneOfPage('admin', 'admin-license') && config.isAdminLoginForm) return 'admin';
  if (getElectron()) return 'electron';
  if (config.skipAllAuth) return 'none';
  return 'token';
}

export function refreshPublicCloudFiles(_force = false) {
  // Cloud disabled
}

let apiSessionIdValue: string | null = null;
function getApiSessionId() {
  if (!apiSessionIdValue) {
    apiSessionIdValue = uuidv4();
  }
  return apiSessionIdValue;
}

function enableApiLog() {
  apiLogging = true;
  console.log('API logging enabled');
}

function disableApiLog() {
  apiLogging = false;
  console.log('API logging disabled');
}

(window as any)['enableApiLog'] = enableApiLog;
(window as any)['disableApiLog'] = disableApiLog;
