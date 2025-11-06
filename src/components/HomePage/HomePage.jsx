import React, { useEffect, useState } from 'react';
import './HomePage.scss';

const words = ['Track your habits', 'Join challenges', 'Improve daily', 'Compete with others'];

function HomePage() {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const word = words[wordIndex];
      if (!deleting) {
        setCurrentWord(word.slice(0, charIndex + 1));
        if (charIndex + 1 === word.length) setDeleting(true);
        else setCharIndex(charIndex + 1);
      } else {
        setCurrentWord(word.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
          setCharIndex(0);
        } else setCharIndex(charIndex - 1);
      }
    }, deleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <div className="home-page">
      <h1>Welcome to HabitQuest</h1>
      <p>Track your habits and join challenges with others</p>
      <p className="animated-text">
        <span>{currentWord}</span>
        <span className="cursor">|</span>
      </p>
      <div className="home-buttons">
        <a href="/challenges" className="btn">Browse Challenges</a>
        <a href="/dashboard" className="btn secondary">My Dashboard</a>
      </div>
    </div>

  );
}

export default HomePage;
