import { useAppStore } from '@/stores/appStore';
import { useTabStore } from '@/stores/tabStore';

export function switchCurrentDatabase(db: any) {
  useAppStore.getState().setCurrentDatabase(db);
}

export function setSelectedTab(tabid: string) {
  useTabStore.getState().updateOpenedTabs((tabs) =>
    tabs.map((t) => ({ ...t, selected: t.tabid === tabid }))
  );
}
