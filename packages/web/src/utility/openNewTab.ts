import { useTabStore, type TabDefinition } from '@/stores/tabStore';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

interface OpenTabOptions {
  title: string;
  icon: string;
  tabComponent: string;
  props?: any;
  multiTabIndex?: number;
  forceNewTab?: boolean;
  tabPreviewMode?: boolean;
}

export default function openNewTab(options: OpenTabOptions) {
  const { title, icon, tabComponent, props = {}, multiTabIndex, forceNewTab, tabPreviewMode } = options;
  const store = useTabStore.getState();
  const tabs = store.openedTabs;

  if (!forceNewTab) {
    const existing = tabs.find(
      (t) =>
        t.tabComponent === tabComponent &&
        !t.closedTime &&
        _.isEqual(t.props, props)
    );

    if (existing) {
      store.updateOpenedTabs((tabs) =>
        tabs.map((t) => ({ ...t, selected: t.tabid === existing.tabid }))
      );
      return;
    }
  }

  if (tabPreviewMode) {
    const previewTab = tabs.find((t) => t.tabPreviewMode && !t.closedTime);
    if (previewTab) {
      store.updateOpenedTabs((tabs) =>
        tabs.map((t) =>
          t.tabid === previewTab.tabid
            ? { ...t, title, icon, tabComponent, props, selected: true }
            : { ...t, selected: false }
        )
      );
      return;
    }
  }

  const maxOrder = Math.max(0, ...tabs.map((t) => t.tabOrder || 0));
  const tabid = uuidv4();
  const newTab: TabDefinition = {
    title,
    icon,
    tabComponent,
    props,
    tabid,
    selected: true,
    busy: false,
    tabOrder: maxOrder + 1,
    multiTabIndex: multiTabIndex || 0,
    tabPreviewMode,
  };

  store.updateOpenedTabs((tabs) => [
    ...tabs.map((t) => ({ ...t, selected: false })),
    newTab,
  ]);
}

export function getTabDbKey(tab: TabDefinition): string {
  const { props, tabComponent } = tab;
  if (tabComponent === 'ConnectionTab') return 'connections.all';
  if (props?.conid && props?.database && props?.database !== '_api_database_') {
    return `database://${props.database}-${props.conid}`;
  }
  if (props?.conid && props?.database === '_api_database_') {
    return `api://${props.conid}`;
  }
  if (props?.conid) return `server://${props.conid}`;
  if (props?.archiveFolder) return `archive://${props.archiveFolder}`;
  return '_no';
}

export function sortTabs(tabs: TabDefinition[]): TabDefinition[] {
  return _.sortBy(tabs, 'tabOrder');
}

export function groupTabs(tabs: TabDefinition[]) {
  const groups: Record<string, any> = {};
  for (const tab of sortTabs(tabs)) {
    const key = getTabDbKey(tab);
    if (!groups[key]) {
      groups[key] = {
        grpid: key,
        tabDbKey: key,
        tabDbName: (tab as any).tabDbName || '(no DB)',
        tabDbServer: (tab as any).tabDbServer || null,
        tabs: [],
      };
    }
    groups[key].tabs.push(tab);
  }
  return Object.values(groups);
}

export function duplicateTab(tab: TabDefinition) {
  openNewTab({
    title: tab.title,
    icon: tab.icon,
    tabComponent: tab.tabComponent,
    props: { ...tab.props },
    forceNewTab: true,
  });
}

export function setSelectedTab(tabid: string) {
  useTabStore.getState().updateOpenedTabs((tabs) =>
    tabs.map((t) => ({ ...t, selected: t.tabid === tabid }))
  );
}
