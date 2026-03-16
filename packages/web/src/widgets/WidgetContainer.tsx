import React from 'react';
import { useAppStore } from '@/stores/appStore';
import DatabaseWidget from './DatabaseWidget';
import FilesWidget from './FilesWidget';
import HistoryWidget from './HistoryWidget';
import OpenedTabsWidget from './OpenedTabsWidget';
import ArchiveWidget from './ArchiveWidget';

export default function WidgetContainer() {
  const selectedWidget = useAppStore((s) => s.selectedWidget);
  const visibleWidgetSideBar = useAppStore((s) => s.visibleWidgetSideBar);

  const visibleSelected = visibleWidgetSideBar ? selectedWidget : null;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {visibleSelected === 'database' && <DatabaseWidget />}
      {visibleSelected === 'file' && <FilesWidget />}
      {visibleSelected === 'history' && <HistoryWidget />}
      {visibleSelected === 'opened-tabs' && <OpenedTabsWidget />}
      {visibleSelected === 'archive' && <ArchiveWidget />}
    </div>
  );
}
