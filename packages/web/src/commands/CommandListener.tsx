import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import getElectron from '@/utility/getElectron';

function parseKeyText(keyText: string): { ctrl: boolean; shift: boolean; alt: boolean; meta: boolean; key: string } {
  const parts = keyText.split('+');
  let ctrl = false;
  let shift = false;
  let alt = false;
  let meta = false;
  let key = '';

  for (const part of parts) {
    const lower = part.trim().toLowerCase();
    if (lower === 'ctrl' || lower === 'ctrlorcommand') {
      if (navigator.platform.includes('Mac')) {
        meta = true;
      } else {
        ctrl = true;
      }
    } else if (lower === 'shift') {
      shift = true;
    } else if (lower === 'alt') {
      alt = true;
    } else if (lower === 'meta') {
      meta = true;
    } else {
      key = lower === 'tab' ? 'Tab' : part.trim();
    }
  }

  return { ctrl, shift, alt, meta, key };
}

export default function CommandListener() {
  const commands = useAppStore((s) => s.commands);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const cmd of Object.values(commands)) {
        if (!cmd.keyText) continue;
        const binding = parseKeyText(cmd.keyText);

        if (
          e.ctrlKey === binding.ctrl &&
          e.shiftKey === binding.shift &&
          e.altKey === binding.alt &&
          e.metaKey === binding.meta &&
          e.key.toLowerCase() === binding.key.toLowerCase()
        ) {
          if (!cmd.testEnabled || cmd.testEnabled()) {
            e.preventDefault();
            e.stopPropagation();
            cmd.onClick?.();
            return;
          }
        }
      }
    };

    const electron = getElectron();
    if (electron) {
      electron.addEventListener('run-command', (e: any, data: any) => {
        const cmd = commands[data];
        if (cmd?.onClick && (!cmd.testEnabled || cmd.testEnabled())) {
          cmd.onClick();
        }
      });
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commands]);

  return null;
}
