import React, { useState } from 'react';
import FontIcon from '@/icons/FontIcon';

export default function JsonEditorTab() {
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-full" data-testid="JsonEditorTab">
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="icon json" />
        <span className="text-sm font-medium">JSON Editor</span>
      </div>
      <div className="flex-1">
        <textarea
          className="w-full h-full p-4 font-mono text-sm bg-transparent resize-none focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='{ "key": "value" }'
          data-testid="JsonEditorTab_editor"
        />
      </div>
    </div>
  );
}
