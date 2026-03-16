import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FontIcon from '@/icons/FontIcon';
import VerticalSplitter from '@/elements/VerticalSplitter';

interface QueryTabProps {
  tabid: string;
  conid?: string;
  database?: string;
}

export default function QueryTab({ tabid, conid, database }: QueryTabProps) {
  const [sql, setSql] = useState('');

  return (
    <div className="flex flex-col h-full" data-testid="QueryTab">
      <div className="flex items-center gap-1 px-2 py-1 border-b bg-[var(--theme-toolstrip-background)]">
        <Button variant="ghost" size="sm" title="Execute (F5)" data-testid="QueryTab_execute">
          <FontIcon icon="icon play" padRight />
          Execute
        </Button>
        <Button variant="ghost" size="sm" title="Execute current" data-testid="QueryTab_executeCurrent">
          <FontIcon icon="icon run" padRight />
          Execute current
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" title="Format" data-testid="QueryTab_format">
          <FontIcon icon="icon format-code" />
        </Button>
        <Button variant="ghost" size="sm" title="Save" data-testid="QueryTab_save">
          <FontIcon icon="icon save" />
        </Button>
      </div>
      <VerticalSplitter initialRatio={0.6}>
        <div className="h-full bg-[var(--theme-content-background)]">
          <textarea
            className="w-full h-full p-3 font-mono text-sm bg-transparent border-0 resize-none focus:outline-none"
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="-- Write your SQL query here..."
            data-testid="QueryTab_editor"
          />
        </div>
        <div className="h-full bg-[var(--theme-content-background)] p-2">
          <div className="text-sm text-muted-foreground text-center py-4">
            Execute a query to see results
          </div>
        </div>
      </VerticalSplitter>
    </div>
  );
}
