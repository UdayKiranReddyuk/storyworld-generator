import React from 'react';
import { Globe, Users, Map, BookOpen, Palette } from 'lucide-react';

function OverviewTab({ world }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="text-blue-400" size={28} />
        <h3 className="text-2xl font-bold text-white">World Overview</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">Summary</h4>
            <p className="text-gray-300 leading-relaxed text-lg">{world.summary}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Theme</h4>
                <p className="text-white font-medium">{world.theme}</p>
             </div>
             <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Genre</h4>
                <p className="text-white font-medium capitalize">{world.genre}</p>
             </div>
             <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Complexity</h4>
                <p className="text-white font-medium capitalize">{world.complexity}</p>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-200 mb-2">World Statistics</h4>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-300">
                <Users size={20} className="text-purple-400" />
                <span>Characters</span>
              </div>
              <span className="text-xl font-bold text-white">{world.characters.length}</span>
            </div>
            <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-gray-300">
                <Map size={20} className="text-green-400" />
                <span>Locations</span>
              </div>
              <span className="text-xl font-bold text-white">{world.locations.length}</span>
            </div>
            <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-gray-300">
                <BookOpen size={20} className="text-yellow-400" />
                <span>Story Phases</span>
              </div>
              <span className="text-xl font-bold text-white">{world.story_arc.phases ? world.story_arc.phases.length : 0}</span>
            </div>
            <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-gray-300">
                <Palette size={20} className="text-pink-400" />
                <span>Art Concepts</span>
              </div>
              <span className="text-xl font-bold text-white">{world.art_prompts.length}</span>
            </div>
            <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-pink-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {world.created_at && (
        <div className="text-sm text-gray-500 text-right pt-4 border-t border-white/5">
          Generated on {new Date(world.created_at).toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default OverviewTab;
