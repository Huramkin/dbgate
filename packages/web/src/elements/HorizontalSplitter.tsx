import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HorizontalSplitterProps {
  children: [React.ReactNode, React.ReactNode];
  initialRatio?: number;
  hideFirst?: boolean;
  isSplitter?: boolean;
  allowCollapseChild1?: boolean;
  allowCollapseChild2?: boolean;
}

export default function HorizontalSplitter({
  children,
  initialRatio = 0.5,
  hideFirst = false,
  isSplitter = true,
}: HorizontalSplitterProps) {
  const [ratio, setRatio] = useState(initialRatio);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newRatio = (moveEvent.clientX - rect.left) / rect.width;
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
    return <div className="flex flex-1 h-full">{children[1]}</div>;
  }

  if (!isSplitter) {
    return <div className="flex flex-1 h-full">{children[0]}</div>;
  }

  return (
    <div ref={containerRef} className="flex h-full w-full">
      <div style={{ width: `${ratio * 100}%` }} className="h-full overflow-hidden">
        {children[0]}
      </div>
      <div
        className="horizontal-split-handle"
        onMouseDown={handleMouseDown}
      />
      <div style={{ width: `${(1 - ratio) * 100}%` }} className="h-full overflow-hidden">
        {children[1]}
      </div>
    </div>
  );
}
