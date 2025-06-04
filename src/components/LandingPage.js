import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onComplete }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.toLowerCase() === 'kitties') {
      onComplete();
    }
  };

  const letters = 'kitties'.split('');
  return (
    <div className="landing-container">
      <h1 className="logo">
        {letters.map((l, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{l}</span>
        ))}
      </h1>
      <form onSubmit={handleSubmit} className="landing-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

export default LandingPage;
