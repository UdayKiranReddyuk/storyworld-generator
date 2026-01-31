import React from 'react';

function OverviewTab({ world }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">World Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-200 mb-2">Summary</h4>
          <p className="text-gray-300">{world.summary}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-200 mb-2">Key Features</h4>
          <ul className="text-gray-300 space-y-1">
            <li>• {world.characters.length} Main Characters</li>
            <li>• {world.locations.length} Key Locations</li>
            <li>• {world.story_arc.phases.length} Story Phases</li>
            <li>• {world.art_prompts.length} Art Concepts</li>
          </ul>
        </div>
      </div>
      {world.created_at && (
        <div className="text-sm text-gray-400">
          Created: {new Date(world.created_at).toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default OverviewTab;
