'use client';

import { useState, useEffect } from 'react';

export default function TopButton() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return showTopButton ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition flex items-center justify-center shadow-lg"
      style={{ zIndex: 50 }}
    >
      ↑
    </button>
  ) : null;
}
