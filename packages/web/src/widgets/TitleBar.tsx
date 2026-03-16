import React from 'react';
import FontIcon from '@/icons/FontIcon';
import getElectron from '@/utility/getElectron';

export default function TitleBar() {
  const electron = getElectron();

  return (
    <div
      className="flex items-center h-full bg-[var(--theme-titlebar-background)] text-[var(--theme-titlebar-foreground)] select-none"
      style={{ WebkitAppRegion: 'drag' } as any}
      data-testid="TitleBar"
    >
      <div className="flex items-center gap-2 px-3 flex-1">
        <FontIcon icon="img dbgate" />
        <span className="text-sm font-medium">DbGate</span>
      </div>
      {electron && (
        <div className="flex items-center" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <button
            className="h-[30px] w-[46px] flex items-center justify-center hover:bg-[var(--theme-titlebar-button-hover)]"
            onClick={() => electron.send('window-minimize')}
          >
            <FontIcon icon="icon window-minimize" />
          </button>
          <button
            className="h-[30px] w-[46px] flex items-center justify-center hover:bg-[var(--theme-titlebar-button-hover)]"
            onClick={() => electron.send('window-maximize')}
          >
            <FontIcon icon="icon window-maximize" />
          </button>
          <button
            className="h-[30px] w-[46px] flex items-center justify-center hover:bg-red-600 hover:text-white"
            onClick={() => electron.send('window-close')}
          >
            <FontIcon icon="icon window-close" />
          </button>
        </div>
      )}
    </div>
  );
}
