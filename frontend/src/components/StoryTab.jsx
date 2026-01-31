import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

function StoryTab({ storyArc }) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-yellow-400" size={28} />
        <h3 className="text-2xl font-bold text-white">{storyArc.title}</h3>
      </div>
      
      <div className="space-y-6 relative">
        {/* Vertical line connecting phases */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30"></div>

        {storyArc.phases.map((phase, index) => (
          <div key={index} className="relative pl-12 group">
            {/* Phase Number Bubble */}
            <div className="absolute left-0 top-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 z-10 group-hover:scale-110 transition-transform duration-300">
              {index + 1}
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                Phase {index + 1}
                <ArrowRight size={16} className="text-gray-500" />
              </h4>
              <p className="text-gray-300 leading-relaxed">{phase}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryTab;
