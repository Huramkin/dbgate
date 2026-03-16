import React from 'react';
import FontIcon from '@/icons/FontIcon';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface WidgetDef {
  icon: string;
  name: string;
  title: string;
}

const widgets: WidgetDef[] = [
  { icon: 'icon database', name: 'database', title: 'Database connections' },
  { icon: 'icon opened-tabs', name: 'opened-tabs', title: 'Opened tabs' },
  { icon: 'icon file', name: 'file', title: 'Favorites & Saved files' },
  { icon: 'icon history', name: 'history', title: 'Query history & Closed tabs' },
  { icon: 'icon archive', name: 'archive', title: 'Archive (saved tabular data)' },
];

export default function WidgetIconPanel() {
  const selectedWidget = useAppStore((s) => s.selectedWidget);
  const visibleWidgetSideBar = useAppStore((s) => s.visibleWidgetSideBar);
  const setSelectedWidget = useAppStore((s) => s.setSelectedWidget);
  const setVisibleWidgetSideBar = useAppStore((s) => s.setVisibleWidgetSideBar);

  const visibleSelected = visibleWidgetSideBar ? selectedWidget : null;

  function handleChangeWidget(name: string) {
    if (visibleSelected === name) {
      setVisibleWidgetSideBar(false);
    } else {
      setSelectedWidget(name);
      setVisibleWidgetSideBar(true);
    }
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-1 flex-col">
        {widgets.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'h-[50px] flex items-center justify-center text-[20pt] cursor-pointer transition-colors',
                  'text-[var(--theme-widget-panel-foreground)] hover:text-[var(--theme-widget-icon-foreground-hover)]',
                  item.name === visibleSelected &&
                    'text-[var(--theme-widget-icon-foreground-active)] bg-[var(--theme-widget-icon-background-active)] border-l-[var(--theme-widget-icon-border-active)]'
                )}
                onClick={() => handleChangeWidget(item.name)}
                data-testid={`WidgetIconPanel_${item.name}`}
              >
                <FontIcon icon={item.icon} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}

        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="h-[50px] flex items-center justify-center text-[20pt] cursor-pointer text-[var(--theme-widget-panel-foreground)] hover:text-[var(--theme-widget-icon-foreground-hover)]"
              data-testid="WidgetIconPanel_addButton"
            >
              <FontIcon icon="icon add" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Add New</TooltipContent>
        </Tooltip>

        <div className="flex-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="h-[50px] flex items-center justify-center text-[20pt] cursor-pointer text-[var(--theme-widget-panel-foreground)] hover:text-[var(--theme-widget-icon-foreground-hover)]"
              onClick={() => {
                // TODO: Open settings tab
              }}
              data-testid="WidgetIconPanel_settings"
            >
              <FontIcon icon="icon settings" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
