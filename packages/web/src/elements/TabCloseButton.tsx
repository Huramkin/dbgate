import React from 'react';
import FontIcon from '@/icons/FontIcon';

interface TabCloseButtonProps {
  unsaved?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function TabCloseButton({ unsaved, onClick }: TabCloseButtonProps) {
  return (
    <span
      className="ml-1 cursor-pointer opacity-60 hover:opacity-100 transition-opacity tabCloseButton"
      onClick={onClick}
    >
      {unsaved ? <FontIcon icon="icon unsaved" /> : <FontIcon icon="icon close" />}
    </span>
  );
}
