import React from 'react';
import FontIcon from '@/icons/FontIcon';

interface LoadingInfoProps {
  message?: string;
  wrapper?: boolean;
}

export default function LoadingInfo({ message = 'Loading...', wrapper = false }: LoadingInfoProps) {
  const content = (
    <div className="flex items-center gap-2 p-4">
      <FontIcon icon="icon loading" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );

  if (wrapper) {
    return (
      <div className="flex items-center justify-center h-full">
        {content}
      </div>
    );
  }

  return content;
}
