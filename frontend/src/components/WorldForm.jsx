import React from 'react';
import { Wand2, Loader2 } from 'lucide-react';

function WorldForm({ theme, setTheme, genre, setGenre, complexity, setComplexity, loading, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="max-w-2xl mx-auto card-glass p-8 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-200 mb-2">
            Your World Theme
          </label>
          <input
            id="theme"
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., desert planet with ancient ruins and alien tribes"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={500}
            required
          />
          <p className="text-xs text-gray-400 mt-1">{theme.length}/500 characters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-200 mb-2">
              Genre
            </label>
            <select
              id="genre"
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
            <label htmlFor="complexity" className="block text-sm font-medium text-gray-200 mb-2">
              Complexity
            </label>
            <select
              id="complexity"
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
          type="submit"
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
      </form>
    </div>
  );
}

export default WorldForm;
