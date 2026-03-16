import { useState, useEffect, useCallback } from 'react';
import { apiCall, apiOn, apiOff } from '@/utility/api';

export function useApiCall<T = any>(
  route: string | null,
  args: any = {},
  defaultValue: T = null as any
) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(!!route);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!route) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall(route, args);
      setData(result ?? defaultValue);
    } catch (err: any) {
      setError(err.message || 'API call failed');
    } finally {
      setLoading(false);
    }
  }, [route, JSON.stringify(args)]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}

export function useApiEvent(event: string, handler: (data: any) => void) {
  useEffect(() => {
    const fn = (data: any) => handler(data);
    apiOn(event, fn);
    return () => apiOff(event, fn);
  }, [event]);
}
