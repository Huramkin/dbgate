import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/stores/appStore';
import FontIcon from '@/icons/FontIcon';

export default function CommandPalette() {
  const commands = useAppStore((s) => s.commands);
  const setVisibleCommandPalette = useAppStore((s) => s.setVisibleCommandPalette);
  const [search, setSearch] = useState('');

  const filteredCommands = useMemo(() => {
    const allCommands = Object.values(commands).filter(
      (cmd: any) => cmd.name && (!cmd.testEnabled || cmd.testEnabled())
    );

    if (!search) return allCommands;

    const lower = search.toLowerCase();
    return allCommands.filter(
      (cmd: any) =>
        cmd.name.toLowerCase().includes(lower) ||
        cmd.category?.toLowerCase().includes(lower) ||
        cmd.id.toLowerCase().includes(lower)
    );
  }, [commands, search]);

  return (
    <div className="fixed inset-0 z-50" onClick={() => setVisibleCommandPalette(null)}>
      <div
        className="absolute top-[var(--dim-header-top)] left-[var(--dim-widget-icon-size)] w-[500px] bg-popover border rounded-b-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
        data-testid="CommandPalette"
      >
        <div className="p-2">
          <input
            autoFocus
            className="w-full px-3 py-2 text-sm border rounded-md bg-background"
            placeholder="Type a command..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setVisibleCommandPalette(null);
            }}
            data-testid="CommandPalette_input"
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {filteredCommands.map((cmd: any) => (
            <div
              key={cmd.id}
              className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-accent"
              onClick={() => {
                setVisibleCommandPalette(null);
                cmd.onClick?.();
              }}
            >
              <div className="flex items-center gap-2">
                {cmd.icon && <FontIcon icon={cmd.icon} />}
                <span>
                  {cmd.category && (
                    <span className="text-muted-foreground">{cmd.category}: </span>
                  )}
                  {cmd.name}
                </span>
              </div>
              {cmd.keyText && (
                <span className="text-xs text-muted-foreground">{cmd.keyText}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
