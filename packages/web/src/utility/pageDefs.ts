export function isAdminPage() {
  return (window as any)['dbgate_page'] == 'admin';
}

export function isOneOfPage(...pages: string[]) {
  return pages.includes((window as any)['dbgate_page']);
}

export function getOpenedTabsStorageName() {
  return isAdminPage() ? 'adminOpenedTabs' : 'openedTabs';
}
