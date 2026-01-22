import React, { useState } from 'react';
import { Wand2, Globe, Users, Map, BookOpen, MessageSquare, Palette, Loader2 } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(''); 
  const [genre, setGenre] = useState('fantasy');
  const [complexity, setComplexity] = useState('medium');
  const [world, setWorld] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const generateWorld = async () => {
    if (!theme.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate-world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: theme,
          genre: genre,
          complexity: complexity
        }),
      });
      
      if (!response.ok) throw new Error('Failed to generate world');
      
      const data = await response.json();
      setWorld(data);
      setActiveTab('overview');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate world. Make sure the backend is running!');
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ id, icon: Icon, label, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isActive ? 'bg-white/20 text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${world ? `genre-${genre}` : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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

        {/* Input Section */}
        {!world && (
          <div className="max-w-2xl mx-auto card-glass p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Your World Theme
                </label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g., desert planet with ancient ruins and alien tribes"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Genre
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="fantasy">Fantasy</option>
                    <option value="sci-fi">Sci-Fi</option>
                    <option value="steampunk">Steampunk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Complexity
                  </label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="simple">Simple</option>
                    <option value="medium">Medium</option>
                    <option value="complex">Complex</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateWorld}
                disabled={loading || !theme.trim()}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Wand2 size={20} />
                )}
                {loading ? 'Creating Your World...' : 'Generate Storyworld'}
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {world && (
          <div className="space-y-8">
            {/* World Header */}
            <div className="card-glass p-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-2">{world.title}</h2>
              <p className="text-xl text-gray-300">{world.summary}</p>
              <button
                onClick={() => setWorld(null)}
                className="mt-4 btn-secondary"
              >
                Create New World
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              <TabButton id="overview" icon={Globe} label="Overview" isActive={activeTab === 'overview'} />
              <TabButton id="characters" icon={Users} label="Characters" isActive={activeTab === 'characters'} />
              <TabButton id="locations" icon={Map} label="Locations" isActive={activeTab === 'locations'} />
              <TabButton id="story" icon={BookOpen} label="Story Arc" isActive={activeTab === 'story'} />
              <TabButton id="dialogues" icon={MessageSquare} label="Dialogues" isActive={activeTab === 'dialogues'} />
              <TabButton id="art" icon={Palette} label="Art Prompts" isActive={activeTab === 'art'} />
            </div>

            {/* Tab Content */}
            <div className="card-glass p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
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
                </div>
              )}

              {/* Characters Tab */}
              {activeTab === 'characters' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Key Characters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {world.characters.map((character, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-6">
                        <h4 className="text-xl font-bold text-white mb-2">{character.name}</h4>
                        <p className="text-yellow-400 mb-3">{character.role}</p>
                        <div className="space-y-2 text-gray-300">
                          <p><strong>Personality:</strong> {character.personality}</p>
                          <p><strong>Motivation:</strong> {character.motivation}</p>
                          <p><strong>Backstory:</strong> {character.backstory}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations Tab */}
              {activeTab === 'locations' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">World Locations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {world.locations.map((location, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-6">
                        <h4 className="text-xl font-bold text-white mb-2">{location.name}</h4>
                        <p className="text-blue-400 mb-2 capitalize">{location.type}</p>
                        <p className="text-gray-300">{location.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Story Arc Tab */}
              {activeTab === 'story' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">{world.story_arc.title}</h3>
                  <div className="space-y-4">
                    {world.story_arc.phases.map((phase, index) => (
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
              )}

              {/* Dialogues Tab */}
              {activeTab === 'dialogues' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Sample Dialogues</h3>
                  <div className="space-y-6">
                    {world.dialogues.map((dialogue, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-4">{dialogue.characters}</h4>
                        <div className="space-y-3 text-gray-300 font-mono text-sm">
                          {dialogue.dialogue.split('\n').map((line, lineIndex) => (
                            <p key={lineIndex} className="leading-relaxed">{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Art Prompts Tab */}
              {activeTab === 'art' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Art Generation Prompts</h3>
                  <div className="space-y-4">
                    {world.art_prompts.map((prompt, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                          <Palette className="text-green-400 mt-1 flex-shrink-0" size={18} />
                          <p className="text-gray-300 font-mono text-sm leading-relaxed">{prompt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
