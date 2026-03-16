import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import FontIcon from '@/icons/FontIcon';

export default function FilesWidget() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" data-testid="FilesWidget">
      <div className="flex items-center gap-1 p-2 border-b border-[var(--theme-sidebar-border)]">
        <div className="flex-1 text-sm font-semibold text-[var(--theme-sidebar-foreground)]">
          <FontIcon icon="icon file" padRight />
          Favorites & Saved Files
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 text-sm text-muted-foreground text-center py-4">
          No saved files yet.
        </div>
      </ScrollArea>
    </div>
  );
}
