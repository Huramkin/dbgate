import React from 'react';
import FontIcon from '@/icons/FontIcon';

export default function ViewDataTab({ schemaName, pureName }: any) {
  return (
    <div className="flex flex-col h-full" data-testid="ViewDataTab">
      <div className="flex items-center gap-2 px-2 py-1 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="img view" />
        <span className="text-sm font-medium">
          {schemaName ? `${schemaName}.${pureName}` : pureName}
        </span>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="text-sm text-muted-foreground text-center py-4">
          View data for {schemaName ? `${schemaName}.${pureName}` : pureName}
        </div>
      </div>
    </div>
  );
}
