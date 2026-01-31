import React from 'react';
import { Wand2 } from 'lucide-react';

function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Wand2 className="text-yellow-400" size={40} />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Storyworld Generator
        </h1>
      </div>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Transform your ideas into complete fictional worlds with characters, maps, stories, and art
      </p>
    </div>
  );
}

export default Header;
