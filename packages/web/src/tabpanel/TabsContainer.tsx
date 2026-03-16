import React from 'react';
import TabsPanel from './TabsPanel';
import TabContent from './TabContent';

interface TabsContainerProps {
  multiTabIndex: number;
}

export default function TabsContainer({ multiTabIndex }: TabsContainerProps) {
  return (
    <div className="flex flex-col h-full" data-testid="TabsContainer">
      <div className="relative" style={{ height: 'var(--dim-tabs-panel-height)' }}>
        <TabsPanel multiTabIndex={multiTabIndex} />
      </div>
      <div className="flex-1 relative">
        <TabContent multiTabIndex={multiTabIndex} />
      </div>
    </div>
  );
}
