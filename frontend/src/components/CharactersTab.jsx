import React from 'react';

function CharactersTab({ characters }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Key Characters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {characters.map((character, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-2">{character.name}</h4>
            <p className="text-yellow-400 mb-3">{character.role}</p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Personality:</strong> {character.personality}</p>
              <p><strong>Motivation:</strong> {character.motivation}</p>
              <p><strong>Backstory:</strong> {character.backstory}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharactersTab;
