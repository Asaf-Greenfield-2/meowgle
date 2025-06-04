import React, { useState } from 'react';
import './App.css';
import SerpSearchResults from './components/SerpSearchResults';
import LandingPage from './components/LandingPage';

const trendingSearches = [
  'Chonky cats',
  'Cats in boxes',
  'Loaf mode',
  'Tiny hats',
  'Cat memes',
  'Space cats 🚀',
  'Blep compilation',
  'Cats judging you',
  'Zoomies at 3AM',
  'Meow ASMR'
];

function App() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const handleLandingComplete = () => {
    setShowLanding(false);
    setSubmittedQuery('kitties');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(query);
    setSuggestionsVisible(false);
  };

  const handleSuggestionClick = (text) => {
    setQuery(text);
    setSubmittedQuery(text);
    setSuggestionsVisible(false);
  };

  const getFilteredSuggestions = () => {
    return query
      ? trendingSearches.filter(t =>
          t.toLowerCase().includes(query.toLowerCase()))
      : trendingSearches;
  };

  if (showLanding) {
    return <LandingPage onComplete={handleLandingComplete} />;
  }

  return (
    <div className="App">
      <div className="centered-container">
        <h1>😺 Meowgle</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for cat stuff..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSuggestionsVisible(true);
              }}
              onFocus={() => setSuggestionsVisible(true)}
              onBlur={() => setTimeout(() => setSuggestionsVisible(false), 100)}
            />
            {suggestionsVisible && (
              <ul className="suggestions">
                <li className="suggestions-title">Trending Searches</li>
                {getFilteredSuggestions().map((text, index) => (
                  <li key={index} onMouseDown={() => handleSuggestionClick(text)}>
                    {text}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit">Meowgle It 🐾</button>
        </form>

        {/* Show search results using SerpAPI */}
        {submittedQuery && <SerpSearchResults query={submittedQuery} />}
      </div>
    </div>
  );
}

export default App;
