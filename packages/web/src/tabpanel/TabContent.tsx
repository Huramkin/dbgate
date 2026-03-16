import React from 'react';
import { useTabStore, type TabDefinition } from '@/stores/tabStore';
import { useAppStore } from '@/stores/appStore';
import { shouldShowTab } from './TabsPanel';

interface TabContentProps {
  multiTabIndex: number;
}

export default function TabContent({ multiTabIndex }: TabContentProps) {
  const openedTabs = useTabStore((s) => s.openedTabs);
  const lockedDatabaseMode = useAppStore((s) => s.lockedDatabaseMode);
  const currentDatabase = useAppStore((s) => s.currentDatabase);

  const activeTab = openedTabs.find(
    (tab) =>
      tab.selected &&
      shouldShowTab(tab, lockedDatabaseMode, currentDatabase) &&
      (tab.multiTabIndex || 0) === multiTabIndex
  );

  if (!activeTab) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">No tab selected</div>
          <div className="text-sm">Open a tab from the sidebar or use the + button</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 h-full overflow-hidden" data-testid="TabContent">
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 p-4 overflow-auto">
          <div className="text-sm text-muted-foreground">
            Tab: {activeTab.title} ({activeTab.tabComponent})
          </div>
        </div>
      </div>
    </div>
  );
}
