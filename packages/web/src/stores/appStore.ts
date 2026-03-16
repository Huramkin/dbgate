import { create } from 'zustand';
import _ from 'lodash';
import type { ExtensionsDirectory } from 'dbgate-types';

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch {}
  return defaultValue;
}

function setToStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const isAdminPage = () => window.dbgate_page === 'admin';

interface AppState {
  selectedWidget: string;
  lockedDatabaseMode: boolean;
  visibleWidgetSideBar: boolean;
  leftPanelWidth: number;
  rightPanelWidth: number;
  rightPanelWidget: string | null;
  visibleCommandPalette: any;
  visibleTitleBar: boolean;
  isFileDragActive: boolean;

  currentDatabase: any;
  openedConnections: string[];
  temporaryOpenedConnections: any[];
  openedSingleDatabaseConnections: string[];
  expandedConnections: string[];

  extensions: ExtensionsDirectory | null;
  commands: Record<string, any>;
  commandsSettings: Record<string, any>;
  currentDropDownMenu: any;
  openedModals: any[];
  openedSnackbars: any[];

  currentArchive: string;
  currentApplication: string | null;
  recentDatabases: any[];
  pinnedDatabases: any[];
  pinnedTables: any[];
  copyRowsFormat: string;
  allResultsInOneTabDefault: boolean;

  loadingPluginStore: { loaded: boolean; loadingPackageName: string | null };
  appliedCurrentSchema: string | null;
  loadingSchemaLists: Record<string, boolean>;
  selectedDatabaseObjectAppObject: any;
  focusedConnectionOrDatabase: { conid: string; database?: string; connection: any } | null;
  focusedTreeRedisKey: { key: string; type: string; text: string } | null;
  cloudConnectionsStore: Record<string, any>;
  appUpdateStatus: any;
  appUpdaterActive: boolean;

  draggingDbGroup: any;
  draggingDbGroupTarget: any;
  draggedPinnedObject: any;

  currentEditorTheme: string | null;
  currentEditorKeybindingMode: string | null;
  currentEditorWrapEnabled: boolean;
  currentEditorFontSize: number | null;

  activeRedisKeysStore: Record<string, any>;
  lastUsedDefaultActions: Record<string, any>;
  emptyConnectionGroupNames: string[];
  collapsedConnectionGroupNames: string[];
  promoWidgetPreview: any;

  serverSummarySelectedTab: number;

  settings: Record<string, any>;
  config: Record<string, any>;

  setSelectedWidget: (widget: string) => void;
  setLockedDatabaseMode: (locked: boolean) => void;
  setVisibleWidgetSideBar: (visible: boolean) => void;
  setLeftPanelWidth: (width: number) => void;
  updateLeftPanelWidth: (delta: number) => void;
  setRightPanelWidth: (width: number) => void;
  updateRightPanelWidth: (delta: number) => void;
  setRightPanelWidget: (widget: string | null) => void;
  setVisibleCommandPalette: (value: any) => void;
  setVisibleTitleBar: (visible: boolean) => void;
  setIsFileDragActive: (active: boolean) => void;

  setCurrentDatabase: (db: any) => void;
  setOpenedConnections: (connections: string[]) => void;
  updateOpenedConnections: (updater: (conns: string[]) => string[]) => void;
  setExtensions: (ext: ExtensionsDirectory | null) => void;
  setCommands: (cmds: Record<string, any>) => void;
  setCommandsSettings: (settings: Record<string, any>) => void;
  setCurrentDropDownMenu: (menu: any) => void;
  setOpenedModals: (modals: any[]) => void;
  updateOpenedModals: (updater: (modals: any[]) => any[]) => void;
  setOpenedSnackbars: (snackbars: any[]) => void;
  addSnackbar: (snackbar: any) => void;
  removeSnackbar: (id: string) => void;

  setCurrentArchive: (archive: string) => void;
  setLoadingPluginStore: (store: { loaded: boolean; loadingPackageName: string | null }) => void;
  setAppliedCurrentSchema: (schema: string | null) => void;
  setSelectedDatabaseObjectAppObject: (obj: any) => void;
  setFocusedConnectionOrDatabase: (value: any) => void;
  setCloudConnectionsStore: (store: Record<string, any>) => void;
  setAppUpdateStatus: (status: any) => void;
  setAppUpdaterActive: (active: boolean) => void;

  setSettings: (settings: Record<string, any>) => void;
  setConfig: (config: Record<string, any>) => void;

  setDraggingDbGroup: (group: any) => void;
  setDraggingDbGroupTarget: (target: any) => void;
}

export const useAppStore = create<AppState>()((set, get) => ({
  selectedWidget: getFromStorage(isAdminPage() ? 'selectedAdminWidget' : 'selectedWidget', isAdminPage() ? 'admin' : 'database'),
  lockedDatabaseMode: getFromStorage('lockedDatabaseMode', false),
  visibleWidgetSideBar: getFromStorage('visibleWidgetSideBar', true),
  leftPanelWidth: getFromStorage('leftPanelWidth', 300),
  rightPanelWidth: getFromStorage('rightPanelWidth', 300),
  rightPanelWidget: getFromStorage('rightPanelWidget', null),
  visibleCommandPalette: null,
  visibleTitleBar: false,
  isFileDragActive: false,

  currentDatabase: getFromStorage('currentDatabase', null),
  openedConnections: [],
  temporaryOpenedConnections: [],
  openedSingleDatabaseConnections: [],
  expandedConnections: [],

  extensions: null,
  commands: {},
  commandsSettings: {},
  currentDropDownMenu: null,
  openedModals: [],
  openedSnackbars: [],

  currentArchive: getFromStorage('currentArchive', 'default'),
  currentApplication: getFromStorage('currentApplication', null),
  recentDatabases: getFromStorage('recentDatabases', []),
  pinnedDatabases: getFromStorage('pinnedDatabases', []),
  pinnedTables: getFromStorage('pinnedTables', []),
  copyRowsFormat: getFromStorage('copyRowsFormat', 'textWithoutHeaders'),
  allResultsInOneTabDefault: getFromStorage('allResultsInOneTabDefault', false),

  loadingPluginStore: { loaded: false, loadingPackageName: null },
  appliedCurrentSchema: null,
  loadingSchemaLists: {},
  selectedDatabaseObjectAppObject: null,
  focusedConnectionOrDatabase: null,
  focusedTreeRedisKey: null,
  cloudConnectionsStore: {},
  appUpdateStatus: null,
  appUpdaterActive: false,

  draggingDbGroup: null,
  draggingDbGroupTarget: null,
  draggedPinnedObject: null,

  currentEditorTheme: getFromStorage('currentEditorTheme', null),
  currentEditorKeybindingMode: getFromStorage('currentEditorKeybindigMode', null),
  currentEditorWrapEnabled: getFromStorage('currentEditorWrapEnabled', false),
  currentEditorFontSize: getFromStorage('currentEditorFontSize', null),

  activeRedisKeysStore: getFromStorage('activeRedisKeysStore', {}),
  lastUsedDefaultActions: getFromStorage('lastUsedDefaultActions', {}),
  emptyConnectionGroupNames: getFromStorage('emptyConnectionGroupNames', []),
  collapsedConnectionGroupNames: getFromStorage('collapsedConnectionGroupNames', []),
  promoWidgetPreview: null,

  serverSummarySelectedTab: getFromStorage('serverSummary.selectedTab', 0),

  settings: {},
  config: {},

  setSelectedWidget: (widget) => {
    set({ selectedWidget: widget });
    setToStorage(isAdminPage() ? 'selectedAdminWidget' : 'selectedWidget', widget);
  },
  setLockedDatabaseMode: (locked) => {
    set({ lockedDatabaseMode: locked });
    setToStorage('lockedDatabaseMode', locked);
  },
  setVisibleWidgetSideBar: (visible) => {
    set({ visibleWidgetSideBar: visible });
    setToStorage('visibleWidgetSideBar', visible);
  },
  setLeftPanelWidth: (width) => {
    set({ leftPanelWidth: width });
    setToStorage('leftPanelWidth', width);
  },
  updateLeftPanelWidth: (delta) => {
    const newWidth = get().leftPanelWidth + delta;
    set({ leftPanelWidth: newWidth });
    setToStorage('leftPanelWidth', newWidth);
  },
  setRightPanelWidth: (width) => {
    set({ rightPanelWidth: width });
    setToStorage('rightPanelWidth', width);
  },
  updateRightPanelWidth: (delta) => {
    const newWidth = get().rightPanelWidth + delta;
    set({ rightPanelWidth: newWidth });
    setToStorage('rightPanelWidth', newWidth);
  },
  setRightPanelWidget: (widget) => {
    set({ rightPanelWidget: widget });
    setToStorage('rightPanelWidget', widget);
  },
  setVisibleCommandPalette: (value) => set({ visibleCommandPalette: value }),
  setVisibleTitleBar: (visible) => set({ visibleTitleBar: visible }),
  setIsFileDragActive: (active) => set({ isFileDragActive: active }),

  setCurrentDatabase: (db) => {
    set({ currentDatabase: db });
    setToStorage('currentDatabase', db);
    if (db?.connection?._id) {
      const state = get();
      if (db?.connection?.singleDatabase) {
        set({ openedSingleDatabaseConnections: _.uniq([...state.openedSingleDatabaseConnections, db.connection._id]) });
      } else {
        set({
          openedConnections: _.uniq([...state.openedConnections, db.connection._id]),
          expandedConnections: _.uniq([...state.expandedConnections, db.connection._id]),
        });
      }
    }
  },
  setOpenedConnections: (connections) => set({ openedConnections: connections }),
  updateOpenedConnections: (updater) => set((state) => ({ openedConnections: updater(state.openedConnections) })),
  setExtensions: (ext) => set({ extensions: ext }),
  setCommands: (cmds) => set({ commands: cmds }),
  setCommandsSettings: (settings) => set({ commandsSettings: settings }),
  setCurrentDropDownMenu: (menu) => set({ currentDropDownMenu: menu }),
  setOpenedModals: (modals) => set({ openedModals: modals }),
  updateOpenedModals: (updater) => set((state) => ({ openedModals: updater(state.openedModals) })),
  setOpenedSnackbars: (snackbars) => set({ openedSnackbars: snackbars }),
  addSnackbar: (snackbar) => set((state) => ({ openedSnackbars: [...state.openedSnackbars, snackbar] })),
  removeSnackbar: (id) => set((state) => ({ openedSnackbars: state.openedSnackbars.filter((s) => s.id !== id) })),

  setCurrentArchive: (archive) => {
    set({ currentArchive: archive });
    setToStorage('currentArchive', archive);
  },
  setLoadingPluginStore: (store) => set({ loadingPluginStore: store }),
  setAppliedCurrentSchema: (schema) => set({ appliedCurrentSchema: schema }),
  setSelectedDatabaseObjectAppObject: (obj) => set({ selectedDatabaseObjectAppObject: obj }),
  setFocusedConnectionOrDatabase: (value) => set({ focusedConnectionOrDatabase: value }),
  setCloudConnectionsStore: (store) => set({ cloudConnectionsStore: store }),
  setAppUpdateStatus: (status) => set({ appUpdateStatus: status }),
  setAppUpdaterActive: (active) => set({ appUpdaterActive: active }),

  setSettings: (settings) => set({ settings }),
  setConfig: (config) => set({ config }),

  setDraggingDbGroup: (group) => set({ draggingDbGroup: group }),
  setDraggingDbGroupTarget: (target) => set({ draggingDbGroupTarget: target }),
}));

function subscribeCssVariable(
  selector: (state: AppState) => any,
  transform: (value: any) => string,
  cssVariable: string
) {
  useAppStore.subscribe((state) => {
    const value = selector(state);
    document.documentElement.style.setProperty(cssVariable, transform(value));
  });
  const value = selector(useAppStore.getState());
  document.documentElement.style.setProperty(cssVariable, transform(value));
}

subscribeCssVariable(
  (s) => s.selectedWidget && s.visibleWidgetSideBar,
  (x) => (x ? '1' : '0'),
  '--dim-visible-left-panel'
);
subscribeCssVariable((s) => s.leftPanelWidth, (x) => `${x}px`, '--dim-left-panel-width');
subscribeCssVariable((s) => s.rightPanelWidth, (x) => `${x}px`, '--dim-right-panel-width');
subscribeCssVariable((s) => s.visibleTitleBar, (x) => (x ? '1' : '0'), '--dim-visible-titlebar');
subscribeCssVariable((s) => s.lockedDatabaseMode, (x) => (x ? '0' : '1'), '--dim-visible-tabs-databases');
subscribeCssVariable((s) => s.rightPanelWidget, (x) => (x ? '1' : '0'), '--dim-visible-right-panel');
