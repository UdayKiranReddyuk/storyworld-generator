import React from 'react';
import TabNavigation from './TabNavigation';
import OverviewTab from './OverviewTab';
import CharactersTab from './CharactersTab';
import LocationsTab from './LocationsTab';
import StoryTab from './StoryTab';
import DialoguesTab from './DialoguesTab';
import ArtPromptsTab from './ArtPromptsTab';
import ExportButton from './ExportButton';
import { RefreshCw } from 'lucide-react';

function WorldDisplay({ world, genre, activeTab, onTabChange, onNewWorld }) {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab world={world} />;
      case 'characters':
        return <CharactersTab characters={world.characters} />;
      case 'locations':
        return <LocationsTab locations={world.locations} />;
      case 'story':
        return <StoryTab storyArc={world.story_arc} />;
      case 'dialogues':
        return <DialoguesTab dialogues={world.dialogues} />;
      case 'art':
        return <ArtPromptsTab artPrompts={world.art_prompts} />;
      default:
        return <OverviewTab world={world} />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* World Header */}
      <div className="card-glass p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{world.title}</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">{world.summary}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={onNewWorld} className="btn-secondary flex items-center gap-2 group">
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Create New World
          </button>
          <ExportButton world={world} />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-4 z-50 backdrop-blur-md rounded-xl p-2 bg-black/20 border border-white/5">
        <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {/* Tab Content */}
      <div className="card-glass p-6 md:p-8 min-h-[400px] animate-slide-up">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default WorldDisplay;
