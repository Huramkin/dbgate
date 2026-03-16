import React, { useState } from 'react';
import FontIcon from '@/icons/FontIcon';

export default function MarkdownEditorTab() {
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-full" data-testid="MarkdownEditorTab">
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-[var(--theme-toolstrip-background)]">
        <FontIcon icon="icon markdown" />
        <span className="text-sm font-medium">Markdown Editor</span>
      </div>
      <div className="flex-1">
        <textarea
          className="w-full h-full p-4 font-mono text-sm bg-transparent resize-none focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="# Write your markdown here..."
          data-testid="MarkdownEditorTab_editor"
        />
      </div>
    </div>
  );
}
