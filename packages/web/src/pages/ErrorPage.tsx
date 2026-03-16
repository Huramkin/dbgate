import React from 'react';
import FontIcon from '@/icons/FontIcon';
import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <FontIcon icon="img error" className="text-6xl" />
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-muted-foreground">
          An error occurred while loading DbGate.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reload Page
        </Button>
      </div>
    </div>
  );
}
