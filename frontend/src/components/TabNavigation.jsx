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
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white/20 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon size={18} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabNavigation;
