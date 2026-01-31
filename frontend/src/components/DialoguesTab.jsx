import React from 'react';
import { MessageSquare, Quote } from 'lucide-react';

function DialoguesTab({ dialogues }) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-pink-400" size={28} />
        <h3 className="text-2xl font-bold text-white">Sample Dialogues</h3>
      </div>
      
      <div className="space-y-8">
        {dialogues.map((dialogue, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Quote size={64} className="text-white" />
            </div>
            
            <h4 className="text-lg font-semibold text-pink-300 mb-6 border-b border-white/10 pb-2 inline-block">
              {dialogue.characters}
            </h4>
            
            <div className="space-y-4">
              {dialogue.dialogue.split('\n').map((line, lineIndex) => {
                // Simple heuristic to alternate alignment based on speaker change (if detected)
                // This is a basic implementation; a more robust one would parse speaker names
                const isSpeaker1 = lineIndex % 2 === 0; 
                
                return (
                  <div 
                    key={lineIndex} 
                    className={`flex ${isSpeaker1 ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-4 ${
                        isSpeaker1 
                          ? 'bg-white/10 rounded-tl-none text-gray-200' 
                          : 'bg-blue-600/20 rounded-tr-none text-blue-100 border border-blue-500/20'
                      }`}
                    >
                      <p className="leading-relaxed">{line}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DialoguesTab;
