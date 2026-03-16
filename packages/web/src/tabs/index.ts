import React from 'react';

export interface TabComponentInfo {
  default: React.ComponentType<any>;
  allowAddToFavorites?: (props: any) => boolean;
  allowSwitchDatabase?: (props: any) => boolean;
}

const tabComponents: Record<string, TabComponentInfo> = {};

function registerTab(name: string, info: TabComponentInfo) {
  tabComponents[name] = info;
}

function lazyTab(importFn: () => Promise<{ default: React.ComponentType<any> }>) {
  return React.lazy(importFn);
}

registerTab('QueryTab', {
  default: lazyTab(() => import('./QueryTab')),
  allowAddToFavorites: () => true,
  allowSwitchDatabase: () => true,
});

registerTab('TableDataTab', {
  default: lazyTab(() => import('./TableDataTab')),
  allowAddToFavorites: (props) => !!props?.pureName,
  allowSwitchDatabase: () => true,
});

registerTab('TableStructureTab', {
  default: lazyTab(() => import('./TableStructureTab')),
  allowAddToFavorites: (props) => !!props?.pureName,
  allowSwitchDatabase: () => true,
});

registerTab('ViewDataTab', {
  default: lazyTab(() => import('./ViewDataTab')),
  allowAddToFavorites: (props) => !!props?.pureName,
  allowSwitchDatabase: () => true,
});

registerTab('CollectionDataTab', {
  default: lazyTab(() => import('./CollectionDataTab')),
  allowAddToFavorites: (props) => !!props?.pureName,
  allowSwitchDatabase: () => true,
});

registerTab('ConnectionTab', {
  default: lazyTab(() => import('./ConnectionTab')),
});

registerTab('SettingsTab', {
  default: lazyTab(() => import('./SettingsTab')),
});

registerTab('ServerSummaryTab', {
  default: lazyTab(() => import('./ServerSummaryTab')),
});

registerTab('ImportExportTab', {
  default: lazyTab(() => import('./ImportExportTab')),
});

registerTab('MarkdownEditorTab', {
  default: lazyTab(() => import('./MarkdownEditorTab')),
  allowAddToFavorites: () => true,
});

registerTab('JsonEditorTab', {
  default: lazyTab(() => import('./JsonEditorTab')),
  allowAddToFavorites: () => true,
});

registerTab('DiagramTab', {
  default: lazyTab(() => import('./DiagramTab')),
  allowAddToFavorites: () => true,
});

registerTab('CommandListTab', {
  default: lazyTab(() => import('./CommandListTab')),
});

registerTab('ChangelogTab', {
  default: lazyTab(() => import('./ChangelogTab')),
});

registerTab('AppLogTab', {
  default: lazyTab(() => import('./AppLogTab')),
});

export default tabComponents;
