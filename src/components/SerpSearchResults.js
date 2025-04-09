import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SerpSearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    axios.get('http://localhost:5050/api/search', {
        params: { q: query }
      })
    .then(res => {
      const organicResults = res.data.organic_results || [];
      console.log("✅ Organic Results:", organicResults);
      setResults(organicResults);
    })
    .catch(err => {
      console.error('❌ Server error:', err);
      setError('Failed to fetch results. Try again later.');
    })
    .finally(() => {
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="results">
      {loading && <p>Searching the web for furry knowledge... 🐾</p>}
      {error && <p>{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p>No results found for “{query}” 😿</p>
      )}
      {!loading && !error && results.map((result, index) => (
        <div key={index} className="result-card">
          <a href={result.link} target="_blank" rel="noopener noreferrer">
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt={result.title}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '0.5rem' }}
              />
            )}
            <h3>{result.title}</h3>
            <p>{result.snippet}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SerpSearchResults;
