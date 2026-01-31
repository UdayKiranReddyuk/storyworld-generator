import React, { useState } from 'react';
import Header from './components/Header';
import WorldForm from './components/WorldForm';
import WorldDisplay from './components/WorldDisplay';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [theme, setTheme] = useState(''); 
  const [genre, setGenre] = useState('fantasy');
  const [complexity, setComplexity] = useState('medium');
  const [world, setWorld] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  const generateWorld = async () => {
    if (!theme.trim()) {
      setError('Please enter a theme for your world.');
      return;
    }
    
    if (theme.length < 3) {
      setError('Theme must be at least 3 characters long.');
      return;
    }

    setLoading(true);
    setError(null);
    
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
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setWorld(data);
      setActiveTab('overview');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to generate world. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewWorld = () => {
    setWorld(null);
    setTheme('');
    setActiveTab('overview');
    setError(null);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      world ? `genre-${genre}` : 'bg-gradient-to-br from-gray-900 to-gray-800'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
        
        {/* Input Section */}
        {!world && (
          <WorldForm
            theme={theme}
            setTheme={setTheme}
            genre={genre}
            setGenre={setGenre}
            complexity={complexity}
            setComplexity={setComplexity}
            loading={loading}
            onSubmit={generateWorld}
          />
        )}

        {/* Results Section */}
        {world && (
          <WorldDisplay
            world={world}
            genre={world.genre}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onNewWorld={handleNewWorld}
          />
        )}
      </div>
    </div>
  );
}

export default App;
