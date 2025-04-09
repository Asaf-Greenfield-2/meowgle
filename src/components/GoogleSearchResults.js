import React, { useEffect, useState } from 'react';


const API_KEY = 'AIzaSyB6bJgRlFwksEqK6OdsrCuKrRYA8K4rEJw';
const CX = '019126e701b724cbd';

const GoogleSearchResults = ({ query }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.items || []);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="results-container">
      {results.map((item, idx) => (
        <div className="result-card" key={idx}>
          <a href={item.link} target="_blank" rel="noreferrer">
            <h3>{item.title}</h3>
            <p>{item.snippet}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default GoogleSearchResults;
