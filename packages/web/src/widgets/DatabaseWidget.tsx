import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FontIcon from '@/icons/FontIcon';
import { useAppStore } from '@/stores/appStore';

export default function DatabaseWidget() {
  const currentDatabase = useAppStore((s) => s.currentDatabase);
  const [search, setSearch] = React.useState('');

  return (
    <div className="flex flex-col flex-1 overflow-hidden" data-testid="DatabaseWidget">
      <div className="flex items-center gap-1 p-2 border-b border-[var(--theme-sidebar-border)]">
        <div className="flex-1 text-sm font-semibold text-[var(--theme-sidebar-foreground)]">
          <FontIcon icon="icon database" padRight />
          Connections
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          title="Add new connection"
          data-testid="DatabaseWidget_addConnection"
        >
          <FontIcon icon="icon add" />
        </Button>
      </div>
      <div className="px-2 py-1">
        <Input
          placeholder="Search connections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 text-xs"
          data-testid="DatabaseWidget_search"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 text-sm text-muted-foreground">
          {currentDatabase ? (
            <div className="flex items-center gap-1">
              <FontIcon icon="img database" />
              <span>{currentDatabase.name}</span>
            </div>
          ) : (
            <div className="text-center py-4">
              No connections configured.
              <br />
              Click + to add a new connection.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
