import React, { useEffect } from 'react';

const GoogleCatSearch = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=864f43d2ce42748ef';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div className="gcse-search"></div>;
};

export default GoogleCatSearch;
