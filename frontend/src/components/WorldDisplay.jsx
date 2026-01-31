import React from 'react';
import TabNavigation from './TabNavigation';
import OverviewTab from './OverviewTab';
import CharactersTab from './CharactersTab';
import LocationsTab from './LocationsTab';
import StoryTab from './StoryTab';
import DialoguesTab from './DialoguesTab';
import ArtPromptsTab from './ArtPromptsTab';
import ExportButton from './ExportButton';

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
    <div className="space-y-8">
      {/* World Header */}
      <div className="card-glass p-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-2">{world.title}</h2>
        <p className="text-xl text-gray-300 mb-4">{world.summary}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={onNewWorld} className="btn-secondary">
            Create New World
          </button>
          <ExportButton world={world} />
        </div>
      </div>

      {/* Navigation Tabs */}
      <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

      {/* Tab Content */}
      <div className="card-glass p-8">{renderTabContent()}</div>
    </div>
  );
}

export default WorldDisplay;
