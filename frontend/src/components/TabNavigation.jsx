import React from 'react';
import { Globe, Users, Map, BookOpen, MessageSquare, Palette } from 'lucide-react';

function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'overview', icon: Globe, label: 'Overview' },
    { id: 'characters', icon: Users, label: 'Characters' },
    { id: 'locations', icon: Map, label: 'Locations' },
    { id: 'story', icon: BookOpen, label: 'Story Arc' },
    { id: 'dialogues', icon: MessageSquare, label: 'Dialogues' },
    { id: 'art', icon: Palette, label: 'Art Prompts' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm md:text-base ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon size={18} className={isActive ? 'animate-pulse-slow' : ''} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabNavigation;
