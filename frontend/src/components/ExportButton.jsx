import React, { useState } from 'react';
import { Download, Check, Copy } from 'lucide-react';

function ExportButton({ world }) {
  const [copied, setCopied] = useState(false);

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(world, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${world.title.replace(/\s+/g, '_')}_storyworld.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(world, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={exportAsJSON}
        className="btn-secondary flex items-center gap-2 group"
        title="Download as JSON"
      >
        <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
        Export JSON
      </button>
      <button
        onClick={copyToClipboard}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border ${
          copied
            ? 'bg-green-600/20 border-green-500/50 text-green-400'
            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
        }`}
        title="Copy to clipboard"
      >
        {copied ? (
          <>
            <Check size={18} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={18} />
            Copy JSON
          </>
        )}
      </button>
    </div>
  );
}

export default ExportButton;
