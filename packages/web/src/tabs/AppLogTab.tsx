import React from 'react';
import FontIcon from '@/icons/FontIcon';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AppLogTab() {
  return (
    <div className="flex flex-col h-full" data-testid="AppLogTab">
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="img applog" />
        <span className="text-sm font-medium">Application Log</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 font-mono text-xs">
          <div className="text-muted-foreground text-center py-4">
            Application log output
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
