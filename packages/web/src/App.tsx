import React, { useEffect, useState, useCallback } from 'react';
import Screen from './Screen';
import { useAppStore } from '@/stores/appStore';
import { apiCall, installNewVolatileConnectionListener } from '@/utility/api';
import getElectron from '@/utility/getElectron';
import FontIcon from '@/icons/FontIcon';

interface AppProps {
  isAdminPage?: boolean;
}

function AppStartInfo({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <FontIcon icon="icon loading" className="text-4xl" />
        <div className="text-sm text-muted-foreground">{message}</div>
      </div>
    </div>
  );
}

export default function App({ isAdminPage = false }: AppProps) {
  const [loadedApi, setLoadedApi] = useState(false);
  const [loadedPlugins, setLoadedPlugins] = useState(false);
  const loadingPluginStore = useAppStore((s) => s.loadingPluginStore);
  const setConfig = useAppStore((s) => s.setConfig);
  const setSettings = useAppStore((s) => s.setSettings);

  const loadApi = useCallback(async () => {
    try {
      const config = await apiCall('config/get');
      if (!config) {
        console.log('API not initialized correctly, trying again in 1s');
        setTimeout(loadApi, 1000);
        return;
      }

      setConfig(config);

      const connections = await apiCall('connections/list');
      const settings = await apiCall('config/get-settings');
      if (settings) {
        setSettings(settings);
      }

      const loadedApiValue = !!(settings && connections && config);

      if (loadedApiValue) {
        installNewVolatileConnectionListener();

        const electron = getElectron();
        if (electron) {
          electron.send('app-started');
        }
      }

      setLoadedApi(loadedApiValue);

      if (!loadedApiValue) {
        console.log('API not initialized correctly, trying again in 1s');
        setTimeout(loadApi, 1000);
      }
    } catch (err) {
      console.log('Error calling API, trying again in 1s');
      setTimeout(loadApi, 1000);
    }
  }, [setConfig, setSettings]);

  useEffect(() => {
    loadApi();
  }, [loadApi]);

  useEffect(() => {
    const removed = document.getElementById('starting_dbgate_zero');
    if (removed) removed.remove();
  }, []);

  useEffect(() => {
    if (loadedApi && loadingPluginStore?.loaded) {
      setLoadedPlugins(true);
      getElectron()?.send('app-started');
    }
  }, [loadedApi, loadingPluginStore]);

  if (!loadedApi) {
    return <AppStartInfo message="Starting DbGate" />;
  }

  if (!loadedPlugins) {
    // Skip plugin loading check for now - plugins are handled differently in the new architecture
    // Go directly to the screen
  }

  return <Screen />;
}
