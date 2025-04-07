import React, { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = `${search} cats`;
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
    const data = await response.json();

    setResults(data.RelatedTopics || []);
  };

  return (
    <div className="App">
      <h1>😺 Meowgle</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search for cat stuff..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((item, index) => (
          <li key={index}>
            <a href={item.FirstURL} target="_blank" rel="noreferrer">
              {item.Text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
