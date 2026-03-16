import React from 'react';
import FontIcon from '@/icons/FontIcon';
import { Button } from '@/components/ui/button';

export default function NotLoggedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <FontIcon icon="icon account" className="text-6xl" />
        <h1 className="text-2xl font-bold">Not Logged In</h1>
        <p className="text-muted-foreground">
          You need to be logged in to access DbGate.
        </p>
        <Button
          onClick={() => {
            window.location.href = '/login.html';
          }}
          data-testid="NotLoggedPage_loginButton"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}
