import getElectron from './getElectron';
import { isOneOfPage } from './pageDefs';

let apiUrl: string | null = null;
try {
  apiUrl = (import.meta as any).env?.VITE_API_URL || process.env.API_URL || null;
} catch {}

export default function resolveApi() {
  if (apiUrl) {
    return apiUrl;
  }
  return (window.location.origin + window.location.pathname)
    .replace(/\/[a-zA-Z-]+\.html$/, '')
    .replace(/\/*$/, '');
}

export function resolveApiHeaders(): Record<string, string> {
  const res: Record<string, string> = {};
  const accessToken = localStorage.getItem(
    isOneOfPage('admin', 'admin-license') ? 'adminAccessToken' : 'accessToken'
  );
  if (accessToken) {
    res['Authorization'] = `Bearer ${accessToken}`;
  }
  return res;
}
