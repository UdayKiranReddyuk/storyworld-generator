import React, { useState } from 'react';
import { Palette, Copy, Check, Image } from 'lucide-react';

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
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Palette className="text-orange-400" size={28} />
        <h3 className="text-2xl font-bold text-white">Art Generation Prompts</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {artPrompts.map((prompt, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400">
                <Image size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 font-mono text-sm leading-relaxed break-words">
                  {prompt}
                </p>
              </div>
              
              <button
                onClick={() => copyToClipboard(prompt, index)}
                className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
                  copiedIndex === index 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
                title="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
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
