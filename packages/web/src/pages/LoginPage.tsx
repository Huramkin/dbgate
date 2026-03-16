import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FontIcon from '@/icons/FontIcon';

interface LoginPageProps {
  isAdminPage: boolean;
}

export default function LoginPage({ isAdminPage }: LoginPageProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="text-center">
          <FontIcon icon="img dbgate" className="text-4xl" />
          <h1 className="mt-4 text-2xl font-bold">
            {isAdminPage ? 'Admin Login' : 'Login to DbGate'}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="login">
              Username
            </label>
            <Input
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Enter your username"
              data-testid="LoginPage_login"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              data-testid="LoginPage_password"
            />
          </div>
          <Button type="submit" className="w-full" data-testid="LoginPage_submit">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
