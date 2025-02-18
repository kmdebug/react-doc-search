import { useState, useEffect } from 'react';

const useMatchNavigation = (matches: RegExpExecArray[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [matches]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % matches.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + matches.length) % matches.length);

  return { setCurrentIndex, currentIndex, next, prev };
};

export default useMatchNavigation;
