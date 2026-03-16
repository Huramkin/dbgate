import React, { Suspense } from 'react';
import { useTabStore, type TabDefinition } from '@/stores/tabStore';
import { useAppStore } from '@/stores/appStore';
import { shouldShowTab } from './TabsPanel';
import tabComponents from '@/tabs';
import LoadingInfo from '@/elements/LoadingInfo';

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

  const tabInfo = tabComponents[activeTab.tabComponent];
  if (!tabInfo) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <div className="text-sm">
            Unknown tab component: {activeTab.tabComponent}
          </div>
        </div>
      </div>
    );
  }

  const TabComponent = tabInfo.default;

  return (
    <div className="relative flex-1 h-full overflow-hidden" data-testid="TabContent">
      <div className="absolute inset-0">
        <Suspense fallback={<LoadingInfo message="Loading tab..." wrapper />}>
          <TabComponent {...activeTab.props} tabid={activeTab.tabid} />
        </Suspense>
      </div>
    </div>
  );
}
