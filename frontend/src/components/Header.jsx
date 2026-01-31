import React from 'react';
import { Wand2, Sparkles } from 'lucide-react';

function Header() {
  return (
    <div className="text-center mb-16 pt-8 animate-fade-in">
      <div className="relative inline-block mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 animate-pulse-slow"></div>
        <div className="relative flex items-center justify-center gap-4 bg-black/20 backdrop-blur-sm px-8 py-4 rounded-full border border-white/10">
          <Wand2 className="text-blue-400 animate-float" size={32} />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent tracking-tight">
            Storyworld Generator
          </h1>
          <Sparkles className="text-purple-400 animate-float animate-delay-200" size={24} />
        </div>
      </div>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-slide-up animate-delay-100">
        Transform your ideas into complete fictional worlds with characters, maps, stories, and art using the power of AI.
      </p>
    </div>
  );
}

export default Header;
