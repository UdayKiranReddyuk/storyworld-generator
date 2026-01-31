import React from 'react';
import { User, Heart, Target, ScrollText } from 'lucide-react';

function CharactersTab({ characters }) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <User className="text-purple-400" size={28} />
        <h3 className="text-2xl font-bold text-white">Key Characters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {characters.map((character, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{character.name}</h4>
                <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium mt-2 border border-purple-500/30">
                  {character.role}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <User size={20} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Heart size={14} className="text-pink-400" />
                  <span>Personality</span>
                </div>
                <p className="text-gray-200 text-sm">{character.personality}</p>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Target size={14} className="text-red-400" />
                  <span>Motivation</span>
                </div>
                <p className="text-gray-200 text-sm">{character.motivation}</p>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <ScrollText size={14} className="text-amber-400" />
                  <span>Backstory</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{character.backstory}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharactersTab;
