import React, { useEffect } from 'react';
import FontIcon from '@/icons/FontIcon';
import { closeSnackbar } from '@/utility/snackbar';
import { Button } from '@/components/ui/button';

interface SnackbarProps {
  id: string;
  message: string;
  progressMessage?: string;
  icon?: string;
  autoClose?: boolean;
  allowClose?: boolean;
  buttons?: Array<{
    label: string;
    onClick: Function;
    autoClose?: boolean;
  }>;
}

export default function Snackbar({ id, message, progressMessage, icon, autoClose, allowClose, buttons }: SnackbarProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => closeSnackbar(id), 5000);
      return () => clearTimeout(timer);
    }
  }, [id, autoClose]);

  return (
    <div className="flex items-center gap-2 bg-popover border rounded-md shadow-lg p-3 mb-2 mr-2 min-w-[200px] max-w-[400px] animate-in slide-in-from-right">
      {icon && <FontIcon icon={icon} />}
      <div className="flex-1">
        <div className="text-sm">{message}</div>
        {progressMessage && <div className="text-xs text-muted-foreground mt-1">{progressMessage}</div>}
      </div>
      {buttons?.map((btn, i) => (
        <Button
          key={i}
          variant="outline"
          size="sm"
          onClick={() => {
            btn.onClick();
            if (btn.autoClose) closeSnackbar(id);
          }}
        >
          {btn.label}
        </Button>
      ))}
      {allowClose && (
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => closeSnackbar(id)}>
          <FontIcon icon="icon close" />
        </Button>
      )}
    </div>
  );
}
