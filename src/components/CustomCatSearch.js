import React, { useState } from 'react';

const CustomCatSearch = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = 'https://cse.google.com/cse';
    const cx = '864f43d2ce42748ef'; // Your Search Engine ID
    const searchUrl = `${baseUrl}?cx=${cx}#gsc.tab=0&gsc.q=${encodeURIComponent(query)}`;
    window.location.href = searchUrl;
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <input
        type="text"
        placeholder="Search cat stuff..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '10px',
          width: '300px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: '#ffb6c1',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Meowgle It 🐾
      </button>
    </form>
  );
};

export default CustomCatSearch;
