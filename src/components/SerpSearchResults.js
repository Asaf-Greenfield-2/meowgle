import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SerpSearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = '027c4fee338f2a6424890d1b8dfbccd303fccaa69a99a8953dfd0b6f9c9e7d2a';

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    axios.get('https://serpapi.com/search.json', {
      params: {
        q: query,
        engine: 'google',
        api_key: API_KEY
      }
    })
    .then(res => {
        console.log('🔎 Full SerpAPI response:', res.data); // ← log it to inspect
      
        if (res.data && res.data.organic_results && res.data.organic_results.length > 0) {
          setResults(res.data.organic_results);
        } else {
          setResults([]); // empty results or missing data
        }
      })
      .catch(err => {
        console.error('SerpAPI error:', err);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="results">
      {loading && <p>Searching the web for furry knowledge... 🐾</p>}
      {!loading && results.length === 0 && query && (
        <p>No results found for “{query}” 😿</p>
      )}
      {results.map((result, index) => (
        <div key={index} className="result-card">
          <a href={result.link} target="_blank" rel="noopener noreferrer">
            <h3>{result.title}</h3>
          </a>
          <p>{result.snippet}</p>
        </div>
      ))}
    </div>
  );
};

export default SerpSearchResults;
