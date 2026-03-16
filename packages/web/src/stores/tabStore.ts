import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import _ from 'lodash';

export interface TabDefinition {
  title: string;
  closedTime?: number;
  icon: string;
  props: any;
  selected: boolean;
  busy: boolean;
  tabid: string;
  tabComponent: string;
  tabOrder?: number;
  multiTabIndex?: number;
  unsaved?: boolean;
  tabPreviewMode?: boolean;
  focused?: boolean;
  appObject?: string;
  appObjectData?: any;
}

interface TabState {
  openedTabs: TabDefinition[];
  draggingTab: TabDefinition | null;
  draggingTabTarget: TabDefinition | null;

  setOpenedTabs: (tabs: TabDefinition[]) => void;
  updateOpenedTabs: (updater: (tabs: TabDefinition[]) => TabDefinition[]) => void;
  setDraggingTab: (tab: TabDefinition | null) => void;
  setDraggingTabTarget: (tab: TabDefinition | null) => void;

  getActiveTab: () => TabDefinition | undefined;
  getActiveTabId: () => string | undefined;
}

const localforageStorage = {
  getItem: async (name: string) => {
    const value = await localforage.getItem(name);
    return value ? JSON.stringify({ state: { openedTabs: value } }) : null;
  },
  setItem: async (name: string, value: string) => {
    const parsed = JSON.parse(value);
    await localforage.setItem(name, parsed.state?.openedTabs || []);
  },
  removeItem: async (name: string) => {
    await localforage.removeItem(name);
  },
};

export const useTabStore = create<TabState>()((set, get) => ({
  openedTabs: [],
  draggingTab: null,
  draggingTabTarget: null,

  setOpenedTabs: (tabs) => set({ openedTabs: tabs }),
  updateOpenedTabs: (updater) =>
    set((state) => ({ openedTabs: updater(state.openedTabs) })),
  setDraggingTab: (tab) => set({ draggingTab: tab }),
  setDraggingTabTarget: (tab) => set({ draggingTabTarget: tab }),

  getActiveTab: () => get().openedTabs.find((x) => x.selected),
  getActiveTabId: () => get().openedTabs.find((x) => x.selected)?.tabid,
}));

localforage.getItem('openedTabs').then((value: any) => {
  if (value && Array.isArray(value)) {
    useTabStore.setState({ openedTabs: value });
  }
});

useTabStore.subscribe((state) => {
  localforage.setItem('openedTabs', state.openedTabs);
});
