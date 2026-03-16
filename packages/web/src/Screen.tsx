import React, { useCallback, useRef } from 'react';
import WidgetContainer from '@/widgets/WidgetContainer';
import WidgetIconPanel from '@/widgets/WidgetIconPanel';
import StatusBar from '@/widgets/StatusBar';
import Snackbar from '@/widgets/Snackbar';
import TitleBar from '@/widgets/TitleBar';
import MultiTabsContainer from '@/tabpanel/MultiTabsContainer';
import CommandListener from '@/commands/CommandListener';
import CommandPalette from '@/commands/CommandPalette';
import ModalLayer from '@/modals/ModalLayer';
import { useAppStore } from '@/stores/appStore';
import getElectron from '@/utility/getElectron';
import FontIcon from '@/icons/FontIcon';

export default function Screen() {
  const selectedWidget = useAppStore((s) => s.selectedWidget);
  const visibleWidgetSideBar = useAppStore((s) => s.visibleWidgetSideBar);
  const visibleTitleBar = useAppStore((s) => s.visibleTitleBar);
  const rightPanelWidget = useAppStore((s) => s.rightPanelWidget);
  const visibleCommandPalette = useAppStore((s) => s.visibleCommandPalette);
  const isFileDragActive = useAppStore((s) => s.isFileDragActive);
  const openedSnackbars = useAppStore((s) => s.openedSnackbars);
  const updateLeftPanelWidth = useAppStore((s) => s.updateLeftPanelWidth);
  const updateRightPanelWidth = useAppStore((s) => s.updateRightPanelWidth);

  const isElectron = !!getElectron();
  const showLeftPanel = selectedWidget && visibleWidgetSideBar;

  const leftSplitterRef = useRef<HTMLDivElement>(null);
  const rightSplitterRef = useRef<HTMLDivElement>(null);

  const handleLeftSplitterMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const handleMouseMove = (moveEvent: MouseEvent) => {
        updateLeftPanelWidth(moveEvent.clientX - startX);
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [updateLeftPanelWidth]
  );

  const handleRightSplitterMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const handleMouseMove = (moveEvent: MouseEvent) => {
        updateRightPanelWidth(startX - moveEvent.clientX);
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [updateRightPanelWidth]
  );

  return (
    <>
      {/* Mobile not supported message */}
      <div className={`hidden max-sm:block text-center ${isElectron ? 'hidden' : ''}`}>
        <div className="m-5 text-xl">
          <FontIcon icon="img warn" />
        </div>
        <div className="m-3">Sorry, DbGate is not supported on mobile devices.</div>
        <div className="m-3">
          Please visit <a href="https://www.dbgate.io">DbGate web</a> for more info.
        </div>
      </div>

      {/* Main screen */}
      <div
        className="root dbgate-screen text-[var(--theme-generic-font)] max-sm:hidden"
        onContextMenu={(e) => e.preventDefault()}
        data-testid="Screen"
      >
        {/* Title bar */}
        {visibleTitleBar && (
          <div className="fixed top-0 left-0 right-0" style={{ height: 'var(--dim-titlebar-height)' }}>
            <TitleBar />
          </div>
        )}

        {/* Icon bar (left) */}
        <div
          className="fixed left-0 flex bg-[var(--theme-widget-panel-background)]"
          style={{
            top: 'var(--dim-header-top)',
            bottom: 'var(--dim-statusbar-height)',
            width: 'var(--dim-widget-icon-size)',
          }}
        >
          <WidgetIconPanel />
        </div>

        {/* Status bar (bottom) */}
        <div
          className="fixed left-0 right-0 bottom-0 flex bg-[var(--theme-statusbar-background)]"
          style={{ height: 'var(--dim-statusbar-height)' }}
        >
          <StatusBar />
        </div>

        {/* Left panel */}
        {showLeftPanel && (
          <div
            className="fixed flex bg-[var(--theme-sidebar-background)] text-[var(--theme-sidebar-foreground)] border-r border-[var(--theme-sidebar-border)]"
            style={{
              top: 'var(--dim-header-top)',
              left: 'var(--dim-widget-icon-size)',
              bottom: 'var(--dim-statusbar-height)',
              width: 'var(--dim-left-panel-width)',
            }}
          >
            <WidgetContainer />
          </div>
        )}

        {/* Main tabs area */}
        <div
          className="fixed bg-[var(--theme-content-background)]"
          style={{
            top: 'var(--dim-header-top)',
            left: 'var(--dim-content-left)',
            bottom: 'var(--dim-statusbar-height)',
            right: 'var(--dim-content-right)',
          }}
        >
          <MultiTabsContainer />
        </div>

        {/* Left splitter */}
        {showLeftPanel && (
          <div
            ref={leftSplitterRef}
            className="horizontal-split-handle absolute"
            style={{
              top: 'var(--dim-header-top)',
              bottom: 'var(--dim-statusbar-height)',
              left: 'calc(var(--dim-widget-icon-size) + var(--dim-left-panel-width))',
            }}
            onMouseDown={handleLeftSplitterMouseDown}
          />
        )}

        {/* Right splitter */}
        {rightPanelWidget && (
          <div
            ref={rightSplitterRef}
            className="horizontal-split-handle absolute"
            style={{
              top: 'var(--dim-header-top)',
              bottom: 'var(--dim-statusbar-height)',
              right: 'var(--dim-content-right)',
            }}
            onMouseDown={handleRightSplitterMouseDown}
          />
        )}

        {/* Right panel */}
        {rightPanelWidget && (
          <div
            className="fixed flex bg-[var(--theme-altsidebar-background)] text-[var(--theme-altsidebar-foreground)] border-l border-[var(--theme-altsidebar-border)]"
            style={{
              top: 'var(--dim-header-top)',
              right: 0,
              bottom: 'var(--dim-statusbar-height)',
              width: 'var(--dim-right-panel-width)',
            }}
          >
            {/* TODO: RightWidgetContainer */}
          </div>
        )}

        {/* Command Palette */}
        {visibleCommandPalette && <CommandPalette />}

        {/* Modal Layer */}
        <ModalLayer />

        {/* Command Listener (keyboard shortcuts) */}
        <CommandListener />

        {/* Snackbar container */}
        <div
          className="fixed right-0 z-[1000]"
          style={{ bottom: 'var(--dim-statusbar-height)' }}
        >
          {openedSnackbars.map((snackbar) => (
            <Snackbar key={snackbar.id} {...snackbar} />
          ))}
        </div>
      </div>
    </>
  );
}
