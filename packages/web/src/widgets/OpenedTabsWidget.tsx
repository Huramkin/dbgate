import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import FontIcon from '@/icons/FontIcon';
import { useTabStore } from '@/stores/tabStore';

export default function OpenedTabsWidget() {
  const openedTabs = useTabStore((s) => s.openedTabs);
  const visibleTabs = openedTabs.filter((t) => !t.closedTime);

  return (
    <div className="flex flex-col flex-1 overflow-hidden" data-testid="OpenedTabsWidget">
      <div className="flex items-center gap-1 p-2 border-b border-[var(--theme-sidebar-border)]">
        <div className="flex-1 text-sm font-semibold text-[var(--theme-sidebar-foreground)]">
          <FontIcon icon="icon opened-tabs" padRight />
          Opened Tabs
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-1">
          {visibleTabs.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4">No tabs open.</div>
          ) : (
            visibleTabs.map((tab) => (
              <div
                key={tab.tabid}
                className="flex items-center gap-1 px-2 py-1 text-sm cursor-pointer hover:bg-accent rounded-sm"
              >
                <FontIcon icon={tab.icon} />
                <span className="truncate flex-1">{tab.title}</span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
