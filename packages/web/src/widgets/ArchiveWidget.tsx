import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import FontIcon from '@/icons/FontIcon';

export default function ArchiveWidget() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" data-testid="ArchiveWidget">
      <div className="flex items-center gap-1 p-2 border-b border-[var(--theme-sidebar-border)]">
        <div className="flex-1 text-sm font-semibold text-[var(--theme-sidebar-foreground)]">
          <FontIcon icon="icon archive" padRight />
          Archive
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 text-sm text-muted-foreground text-center py-4">
          No archived data.
        </div>
      </ScrollArea>
    </div>
  );
}
