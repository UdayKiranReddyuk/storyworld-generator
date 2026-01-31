import React from 'react';

function DialoguesTab({ dialogues }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Sample Dialogues</h3>
      <div className="space-y-6">
        {dialogues.map((dialogue, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">{dialogue.characters}</h4>
            <div className="space-y-3 text-gray-300 font-mono text-sm">
              {dialogue.dialogue.split('\n').map((line, lineIndex) => (
                <p key={lineIndex} className="leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DialoguesTab;
