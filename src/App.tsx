import { useState, useEffect, useRef, useMemo } from 'react';

import Document from './components/Document';
import Button from './components/Button';

import useMatchNavigation from './hooks/useMatchNavigation';

const App: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debounceSearchText, setDebounceSearchText] = useState('');
  const [matches, setMatches] = useState<RegExpExecArray[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const searchInputRef = useRef<null | HTMLInputElement>(null);

  const { currentIndex, next, prev } = useMatchNavigation(matches);

  const content = 'hello, world, hello, everyone and hello to all.';

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceSearchText(searchText);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();

        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) searchInputRef.current?.focus();
  }, [isOpen]);

  // Calculate matches
  useEffect(() => {
    if (!debounceSearchText) {
      setMatches([]);
      setCurrentMatchIndex(0);
      return;
    }

    try {
      const regex = new RegExp(debounceSearchText, 'gi');
      const found = Array.from(content.matchAll(regex));

      setMatches(found);
      setCurrentMatchIndex((prev) => Math.min(prev, found.length - 1));
    } catch {
      setMatches([]);
    }
  }, [debounceSearchText, content]);

  // Highlight text with memoisation
  const highlightedContent = useMemo(() => {
    if (!debounceSearchText) return content;

    const regex = new RegExp(`(${debounceSearchText})`, 'gi');
    return content.split(regex).map((part, index) =>
      part.toLowerCase() === debounceSearchText.toLowerCase() ? (
        <span
          key={index}
          className={`${
            Math.floor(index / 2) === currentIndex
              ? 'bg-[#6DD58C]'
              : 'bg-[#C4EED0]'
          }`}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  }, [content, debounceSearchText, currentIndex]);

  if (!isOpen) {
    return <Document>{content}</Document>;
  }

  return (
    <Document>
      <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-2 flex items-center gap-2 border border-gray-200">
        <div className="relative flex items-center">
          <input
            ref={searchInputRef}
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="text-black px-2 py-1 border border-gray-200 rounded-md w-36 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
            placeholder="Find in document"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {matches.length > 0
              ? `${currentIndex + 1} of ${matches.length}`
              : ''}
          </span>

          <Button
            className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:hover:bg-transparent"
            onClick={prev}
            disabled={!matches.length}
            title="Previous match"
          >
            <svg
              className="w-4 h-4"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
            </svg>
          </Button>

          <Button
            className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:hover:bg-transparent"
            onClick={next}
            disabled={!matches.length}
            title="Previous match"
          >
            <svg
              className="w-4 h-4"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
            </svg>
          </Button>

          <Button
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => setIsOpen(false)}
            title="Close search"
          >
            <svg
              className="w-4 h-4"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </Button>
        </div>
      </div>
      {highlightedContent}
    </Document>
  );
};

export default App;
