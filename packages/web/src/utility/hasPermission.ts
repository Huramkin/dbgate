import { useAppStore } from '@/stores/appStore';

let compiledPermissions: Record<string, boolean> | null = null;

export function compilePermissions() {
  const config = useAppStore.getState().config;
  compiledPermissions = {};

  if (config?.permissions) {
    for (const perm of config.permissions) {
      compiledPermissions[perm] = true;
    }
  }
}

export function subscribePermissionCompiler() {
  useAppStore.subscribe(() => {
    compilePermissions();
  });
}

export default function hasPermission(permission: string): boolean {
  if (!compiledPermissions) return true;
  return compiledPermissions[permission] !== false;
}
