import React from 'react';
import FontIcon from '@/icons/FontIcon';
import { useAppStore } from '@/stores/appStore';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CommandListTab() {
  const commands = useAppStore((s) => s.commands);
  const allCommands = Object.values(commands) as any[];

  return (
    <div className="flex flex-col h-full" data-testid="CommandListTab">
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="icon keyboard" />
        <span className="text-sm font-medium">Keyboard Shortcuts</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Command</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Shortcut</th>
              </tr>
            </thead>
            <tbody>
              {allCommands
                .filter((c) => c.name && c.keyText)
                .sort((a, b) => (a.category || '').localeCompare(b.category || ''))
                .map((cmd) => (
                  <tr key={cmd.id} className="border-b hover:bg-accent">
                    <td className="py-1.5">{cmd.name}</td>
                    <td className="py-1.5 text-muted-foreground">{cmd.category}</td>
                    <td className="py-1.5">
                      <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">{cmd.keyText}</kbd>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
}
