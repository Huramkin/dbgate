import { useAppStore } from '@/stores/appStore';

interface CommandDefinition {
  id: string;
  category?: string;
  name: string;
  keyText?: string;
  testEnabled?: () => boolean;
  onClick?: (...args: any[]) => void;
  icon?: string;
  toolbar?: boolean;
  isRelatedToTab?: boolean;
  toolbarName?: string;
  toolbarOrder?: number;
  disableByDefault?: boolean;
}

export default function registerCommand(definition: CommandDefinition) {
  const commands = useAppStore.getState().commands;
  useAppStore.getState().setCommands({
    ...commands,
    [definition.id]: definition,
  });
}

export function findCommand(id: string) {
  return useAppStore.getState().commands[id];
}

export function runCommand(id: string) {
  const cmd = findCommand(id);
  if (cmd?.onClick && (!cmd.testEnabled || cmd.testEnabled())) {
    cmd.onClick();
  }
}
