import React from 'react';
import FontIcon from '@/icons/FontIcon';

interface TableStructureTabProps {
  tabid: string;
  conid?: string;
  database?: string;
  schemaName?: string;
  pureName?: string;
}

export default function TableStructureTab({ schemaName, pureName }: TableStructureTabProps) {
  return (
    <div className="flex flex-col h-full" data-testid="TableStructureTab">
      <div className="flex items-center gap-2 px-2 py-1 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="img table-structure" />
        <span className="text-sm font-medium">
          Structure: {schemaName ? `${schemaName}.${pureName}` : pureName}
        </span>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="text-sm text-muted-foreground text-center py-4">
          Table structure editor for {schemaName ? `${schemaName}.${pureName}` : pureName}
        </div>
      </div>
    </div>
  );
}
