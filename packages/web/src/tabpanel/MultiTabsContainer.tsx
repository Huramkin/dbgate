import React from 'react';
import { useTabStore } from '@/stores/tabStore';
import { useAppStore } from '@/stores/appStore';
import { shouldShowTab } from './TabsPanel';
import TabsContainer from './TabsContainer';

export default function MultiTabsContainer() {
  const openedTabs = useTabStore((s) => s.openedTabs);
  const lockedDatabaseMode = useAppStore((s) => s.lockedDatabaseMode);
  const currentDatabase = useAppStore((s) => s.currentDatabase);

  const filteredTabs = openedTabs.filter((x) => shouldShowTab(x, lockedDatabaseMode, currentDatabase));
  const isLeft = filteredTabs.some((x) => !x.multiTabIndex);
  const isRight = filteredTabs.some((x) => x.multiTabIndex === 1);

  if (isRight && isLeft) {
    return (
      <div className="flex h-full" data-testid="MultiTabsContainer">
        <div className="flex-1 h-full">
          <TabsContainer multiTabIndex={0} />
        </div>
        <div className="w-[4px] cursor-col-resize bg-transparent hover:bg-[var(--theme-splitter-active)] transition-colors" />
        <div className="flex-1 h-full">
          <TabsContainer multiTabIndex={1} />
        </div>
      </div>
    );
  }

  if (isRight && !isLeft) {
    return <TabsContainer multiTabIndex={1} />;
  }

  return <TabsContainer multiTabIndex={0} />;
}
