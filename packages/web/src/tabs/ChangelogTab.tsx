import React from 'react';
import FontIcon from '@/icons/FontIcon';

export default function ChangelogTab() {
  return (
    <div className="flex flex-col h-full" data-testid="ChangelogTab">
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="icon history" />
        <span className="text-sm font-medium">Changelog</span>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="text-sm text-muted-foreground text-center py-4">
          Version changelog
        </div>
      </div>
    </div>
  );
}
