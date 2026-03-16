import React, { useRef, useCallback } from 'react';
import FontIcon from '@/icons/FontIcon';
import { useTabStore, type TabDefinition } from '@/stores/tabStore';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function shouldShowTab(
  tab: TabDefinition,
  lockedDatabaseMode: boolean,
  currentDatabase: any
): boolean {
  if (lockedDatabaseMode) {
    return (
      tab.closedTime == null &&
      (!tab.props?.conid ||
        !tab.props?.database ||
        (tab.props?.conid === currentDatabase?.connection?._id &&
          tab.props?.database === currentDatabase?.name))
    );
  }
  return tab.closedTime == null;
}

interface TabsPanelProps {
  multiTabIndex: number;
}

export default function TabsPanel({ multiTabIndex }: TabsPanelProps) {
  const openedTabs = useTabStore((s) => s.openedTabs);
  const updateOpenedTabs = useTabStore((s) => s.updateOpenedTabs);
  const lockedDatabaseMode = useAppStore((s) => s.lockedDatabaseMode);
  const currentDatabase = useAppStore((s) => s.currentDatabase);
  const tabsRef = useRef<HTMLDivElement>(null);

  const visibleTabs = openedTabs.filter(
    (tab) =>
      shouldShowTab(tab, lockedDatabaseMode, currentDatabase) &&
      (tab.multiTabIndex || 0) === multiTabIndex
  );

  const activeTab = openedTabs.find((x) => x.selected);

  const handleTabClick = useCallback(
    (tabid: string) => {
      updateOpenedTabs((tabs) =>
        tabs.map((t) => ({ ...t, selected: t.tabid === tabid }))
      );
    },
    [updateOpenedTabs]
  );

  const handleCloseTab = useCallback(
    (tabid: string) => {
      updateOpenedTabs((tabs) => {
        const newTabs = tabs.map((t) =>
          t.tabid === tabid
            ? { ...t, closedTime: Date.now(), selected: false }
            : t
        );
        if (!newTabs.find((t) => t.selected && !t.closedTime)) {
          const lastVisible = [...newTabs]
            .filter((t) => !t.closedTime)
            .pop();
          if (lastVisible) {
            return newTabs.map((t) => ({
              ...t,
              selected: t.tabid === lastVisible.tabid,
            }));
          }
        }
        return newTabs;
      });
    },
    [updateOpenedTabs]
  );

  const handleMiddleClick = useCallback(
    (e: React.MouseEvent, tabid: string) => {
      if (e.button === 1) {
        e.preventDefault();
        handleCloseTab(tabid);
      }
    },
    [handleCloseTab]
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const scrollAmount =
      Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? 0 : e.deltaY;
    if (scrollAmount !== 0 && tabsRef.current) {
      e.preventDefault();
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'auto' });
    }
  }, []);

  return (
    <div className="absolute inset-0 text-[var(--theme-tabs-panel-foreground)]" data-testid="TabsPanel">
      <div
        ref={tabsRef}
        className="h-[var(--dim-tabs-panel-height)] flex overflow-x-auto absolute left-0 top-0 right-[35px] bottom-0"
        onWheel={handleWheel}
      >
        {visibleTabs.map((tab) => (
          <div
            key={tab.tabid}
            id={`file-tab-item-${tab.tabid}`}
            className={cn(
              'flex items-center px-3 cursor-pointer select-none shrink min-w-[10px] border-b border-r',
              'bg-[var(--theme-tabs-panel-item-background)] border-[var(--theme-tabs-panel-border)]',
              tab.tabid === activeTab?.tabid &&
                'bg-[var(--theme-tabs-panel-active-background)] text-[var(--theme-tabs-panel-active-foreground)] border-t-2 border-t-[var(--theme-tabs-panel-active-border)]',
              tab.tabPreviewMode && 'italic'
            )}
            onClick={() => handleTabClick(tab.tabid)}
            onMouseUp={(e) => handleMiddleClick(e, tab.tabid)}
          >
            <FontIcon icon={tab.busy ? 'icon loading' : tab.icon} />
            <span className="ml-1 whitespace-nowrap flex-1 text-sm">{tab.title}</span>
            <button
              className="ml-2 opacity-60 hover:opacity-100 transition-opacity tabCloseButton"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseTab(tab.tabid);
              }}
              data-testid="TabsPanel_closeTab"
            >
              {tab.unsaved ? (
                <FontIcon icon="icon unsaved" />
              ) : (
                <FontIcon icon="icon close" />
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="absolute right-1 top-0 bottom-0 flex items-center text-[20pt]">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[var(--theme-tabs-panel-foreground)] hover:text-[var(--theme-tabs-panel-active-foreground)]"
          title="New query"
          data-testid="TabsPanel_buttonNewObject"
        >
          <FontIcon icon="icon add" />
        </Button>
      </div>
    </div>
  );
}
