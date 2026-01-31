import React, { useState } from 'react';
import { Palette, Copy, Check } from 'lucide-react';

function ArtPromptsTab({ artPrompts }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (prompt, index) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Art Generation Prompts</h3>
      <div className="space-y-4">
        {artPrompts.map((prompt, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <Palette className="text-green-400 mt-1 flex-shrink-0" size={18} />
                <p className="text-gray-300 font-mono text-sm leading-relaxed">{prompt}</p>
              </div>
              <button
                onClick={() => copyToClipboard(prompt, index)}
                className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <Check className="text-green-400" size={18} />
                ) : (
                  <Copy className="text-gray-400 hover:text-white" size={18} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtPromptsTab;
