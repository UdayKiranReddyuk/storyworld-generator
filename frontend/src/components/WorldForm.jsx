import React from 'react';
import { Wand2, Loader2, Sparkles } from 'lucide-react';

function WorldForm({ theme, setTheme, genre, setGenre, complexity, setComplexity, loading, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-up animate-delay-200">
      <div className="card-glass p-8 md:p-10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div>
            <label htmlFor="theme" className="label-text flex items-center gap-2">
              <Sparkles size={16} className="text-blue-400" />
              Your World Theme
            </label>
            <div className="relative group">
              <textarea
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Describe your world... e.g., A desert planet with ancient ruins where water is more valuable than gold, ruled by techno-barbarian tribes."
                className="input-glass min-h-[120px] resize-none text-lg leading-relaxed"
                maxLength={500}
                required
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500 group-focus-within:text-blue-400 transition-colors">
                {theme.length}/500
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="genre" className="label-text">Genre</label>
              <div className="relative">
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="input-glass appearance-none cursor-pointer"
                >
                  <option value="fantasy" className="bg-gray-900">Fantasy</option>
                  <option value="sci-fi" className="bg-gray-900">Sci-Fi</option>
                  <option value="steampunk" className="bg-gray-900">Steampunk</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="complexity" className="label-text">Complexity</label>
              <div className="relative">
                <select
                  id="complexity"
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="input-glass appearance-none cursor-pointer"
                >
                  <option value="simple" className="bg-gray-900">Simple</option>
                  <option value="medium" className="bg-gray-900">Medium</option>
                  <option value="complex" className="bg-gray-900">Complex</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !theme.trim()}
            className="w-full btn-primary flex items-center justify-center gap-3 text-lg group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Forging World...</span>
              </>
            ) : (
              <>
                <Wand2 size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Generate Storyworld</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorldForm;
