import React from 'react';
import FontIcon from '@/icons/FontIcon';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SettingsTab() {
  return (
    <div className="flex flex-col h-full" data-testid="SettingsTab">
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="icon settings" />
        <span className="text-sm font-medium">Settings</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto p-6">
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Appearance</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Theme</span>
                  <select className="border rounded px-2 py-1 text-sm bg-background">
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Language</span>
                  <select className="border rounded px-2 py-1 text-sm bg-background">
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Editor</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Editor Theme</span>
                  <select className="border rounded px-2 py-1 text-sm bg-background">
                    <option>Default</option>
                    <option>Monokai</option>
                    <option>GitHub</option>
                    <option>Tomorrow Night</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Font Size</span>
                  <select className="border rounded px-2 py-1 text-sm bg-background">
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>16</option>
                    <option>18</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Word Wrap</span>
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
