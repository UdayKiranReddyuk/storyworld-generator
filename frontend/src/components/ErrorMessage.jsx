import React from 'react';
import { AlertCircle, X } from 'lucide-react';

function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="max-w-2xl mx-auto mb-8 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 backdrop-blur-sm animate-fade-in">
      <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <h4 className="text-red-400 font-semibold mb-1">Error</h4>
        <p className="text-red-200 text-sm leading-relaxed">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/10 rounded-lg"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
