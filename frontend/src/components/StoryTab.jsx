import React from 'react';

function StoryTab({ storyArc }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">{storyArc.title}</h3>
      <div className="space-y-4">
        {storyArc.phases.map((phase, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <h4 className="text-lg font-semibold text-white">Phase {index + 1}</h4>
            </div>
            <p className="text-gray-300 ml-11">{phase}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryTab;
