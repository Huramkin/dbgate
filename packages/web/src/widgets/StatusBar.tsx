import React from 'react';
import FontIcon from '@/icons/FontIcon';
import { useAppStore } from '@/stores/appStore';

export default function StatusBar() {
  const currentDatabase = useAppStore((s) => s.currentDatabase);
  const appUpdateStatus = useAppStore((s) => s.appUpdateStatus);

  const databaseName = currentDatabase?.name;
  const connection = currentDatabase?.connection;

  return (
    <div
      className="flex items-stretch justify-between cursor-default flex-1 text-[var(--theme-statusbar-foreground)]"
      data-testid="StatusBar"
    >
      <div className="flex items-stretch">
        {databaseName && databaseName !== '_api_database_' && (
          <div className="px-2.5 flex items-center whitespace-nowrap">
            <FontIcon icon={connection?.isReadOnly ? 'icon lock' : 'icon database'} padRight />
            {databaseName}
          </div>
        )}
        {connection && (
          <div className="px-2.5 flex items-center whitespace-nowrap">
            <FontIcon icon={databaseName === '_api_database_' ? 'icon api' : 'icon server'} padRight />
            {connection.displayName || connection.server || 'Connection'}
          </div>
        )}
        {connection?.user && (
          <div className="px-2.5 flex items-center whitespace-nowrap">
            <FontIcon icon="icon account" padRight />
            {connection.user}
          </div>
        )}
        {!connection && (
          <div className="px-2.5 flex items-center whitespace-nowrap">
            <FontIcon icon="icon disconnected" padRight />
            Not connected
          </div>
        )}
      </div>
      <div className="flex items-stretch">
        {appUpdateStatus && (
          <div className="px-2.5 flex items-center whitespace-nowrap">
            <FontIcon icon={appUpdateStatus.icon} padRight />
            {appUpdateStatus.message}
          </div>
        )}
      </div>
    </div>
  );
}
