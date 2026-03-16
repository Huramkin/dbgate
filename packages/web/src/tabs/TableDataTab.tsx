import React from 'react';
import FontIcon from '@/icons/FontIcon';

interface TableDataTabProps {
  tabid: string;
  conid?: string;
  database?: string;
  schemaName?: string;
  pureName?: string;
}

export default function TableDataTab({ tabid, conid, database, schemaName, pureName }: TableDataTabProps) {
  return (
    <div className="flex flex-col h-full" data-testid="TableDataTab">
      <div className="flex items-center gap-2 px-2 py-1 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="img table" />
        <span className="text-sm font-medium">
          {schemaName ? `${schemaName}.${pureName}` : pureName}
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 text-xs border rounded hover:bg-accent" data-testid="TableDataTab_refresh">
            <FontIcon icon="icon refresh" padRight />
            Refresh
          </button>
          <button className="px-2 py-1 text-xs border rounded hover:bg-accent" data-testid="TableDataTab_filter">
            <FontIcon icon="icon filter" padRight />
            Filter
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="p-4 text-sm text-muted-foreground text-center">
          Data grid for {schemaName ? `${schemaName}.${pureName}` : pureName}
          <br />
          <span className="text-xs">(Data grid component to be implemented)</span>
        </div>
      </div>
    </div>
  );
}
