import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FontIcon from '@/icons/FontIcon';

export default function ConnectionTab({ tabid }: any) {
  const [server, setServer] = useState('');
  const [port, setPort] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [engine, setEngine] = useState('mysql@dbgate-plugin-mysql');

  return (
    <div className="flex flex-col h-full overflow-auto" data-testid="ConnectionTab">
      <div className="max-w-2xl mx-auto p-6 w-full">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FontIcon icon="img connection" />
          New Connection
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Display Name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="My Connection"
                data-testid="ConnectionTab_displayName"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Database Engine</label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                data-testid="ConnectionTab_engine"
              >
                <option value="mysql@dbgate-plugin-mysql">MySQL</option>
                <option value="postgres@dbgate-plugin-postgres">PostgreSQL</option>
                <option value="mssql@dbgate-plugin-mssql">SQL Server</option>
                <option value="oracle@dbgate-plugin-oracle">Oracle</option>
                <option value="mongo@dbgate-plugin-mongo">MongoDB</option>
                <option value="redis@dbgate-plugin-redis">Redis</option>
                <option value="sqlite@dbgate-plugin-sqlite">SQLite</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1 block">Server</label>
              <Input
                value={server}
                onChange={(e) => setServer(e.target.value)}
                placeholder="localhost"
                data-testid="ConnectionTab_server"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Port</label>
              <Input
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="3306"
                data-testid="ConnectionTab_port"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">User</label>
              <Input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="root"
                data-testid="ConnectionTab_user"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                data-testid="ConnectionTab_password"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button data-testid="ConnectionTab_test">
              <FontIcon icon="icon play" padRight />
              Test Connection
            </Button>
            <Button variant="outline" data-testid="ConnectionTab_save">
              <FontIcon icon="icon save" padRight />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
