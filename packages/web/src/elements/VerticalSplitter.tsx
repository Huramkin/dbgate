import React, { useState, useCallback, useRef } from 'react';

interface VerticalSplitterProps {
  children: [React.ReactNode, React.ReactNode];
  initialRatio?: number;
  hideFirst?: boolean;
  isSplitter?: boolean;
}

export default function VerticalSplitter({
  children,
  initialRatio = 0.5,
  hideFirst = false,
  isSplitter = true,
}: VerticalSplitterProps) {
  const [ratio, setRatio] = useState(initialRatio);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newRatio = (moveEvent.clientY - rect.top) / rect.height;
        setRatio(Math.max(0.1, Math.min(0.9, newRatio)));
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    []
  );

  if (hideFirst) {
    return <div className="flex flex-col flex-1 h-full">{children[1]}</div>;
  }

  if (!isSplitter) {
    return <div className="flex flex-col flex-1 h-full">{children[0]}</div>;
  }

  return (
    <div ref={containerRef} className="flex flex-col h-full w-full">
      <div style={{ height: `${ratio * 100}%` }} className="w-full overflow-hidden">
        {children[0]}
      </div>
      <div
        className="vertical-split-handle"
        onMouseDown={handleMouseDown}
      />
      <div style={{ height: `${(1 - ratio) * 100}%` }} className="w-full overflow-hidden">
        {children[1]}
      </div>
    </div>
  );
}
