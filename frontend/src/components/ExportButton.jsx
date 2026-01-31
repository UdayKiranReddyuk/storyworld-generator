import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';

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
    <div className="flex gap-2">
      <button
        onClick={exportAsJSON}
        className="btn-secondary flex items-center gap-2"
        title="Download as JSON"
      >
        <Download size={18} />
        Export JSON
      </button>
      <button
        onClick={copyToClipboard}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-gray-600 hover:bg-gray-700 text-white'
        }`}
        title="Copy to clipboard"
      >
        {copied ? (
          <>
            <Check size={18} />
            Copied!
          </>
        ) : (
          'Copy All'
        )}
      </button>
    </div>
  );
}

export default ExportButton;
