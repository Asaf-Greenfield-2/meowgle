import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [results, setResults] = useState([]);

  const getFilteredSuggestions = () => {
    if (!query) return trendingSearches;
    return trendingSearches.filter((text) =>
      text.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.thecatapi.com/v1/breeds/search?q=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
    setSuggestionsVisible(false);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSuggestionsVisible(true);
  };

  const handleSuggestionClick = (text) => {
    setQuery(text);
    setSuggestionsVisible(false);
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestionsVisible(false), 100);
  };

  return (
    <div className="App">
      <div className="centered-container">
        <h1><span role="img" aria-label="cat">😺</span> Meowgle</h1>

        <form onSubmit={handleSearch}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for cat stuff..."
              value={query}
              onChange={handleChange}
              onFocus={() => setSuggestionsVisible(true)}
              onBlur={handleBlur}
            />
            {suggestionsVisible && (
              <ul className="suggestions">
                <li className="suggestions-title">Trending Searches</li>
                {getFilteredSuggestions().map((text, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(text)}>
                    {text}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit">Search</button>
        </form>

        {/* 💬 Search Results */}
        {results.length > 0 && (
          <div className="results">
            <h2>Results for "{query}"</h2>
            {results.map((breed, index) => (
              <div key={index} className="result-card">
                <h3>{breed.name}</h3>
                <p>{breed.description || 'No description available.'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
