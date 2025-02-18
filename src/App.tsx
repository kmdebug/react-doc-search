import { useState, useEffect, useRef, useMemo } from 'react';

const App: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debounceSearchText, setDebounceSearchText] = useState('');
  const [matches, setMatches] = useState<RegExpExecArray[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const searchInputRef = useRef<null | HTMLInputElement>(null);

  const content = 'hello, world, hello, everyone and hello to all.';

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceSearchText(searchText);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

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
            Math.floor(index / 2) === currentMatchIndex
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
  }, [content, debounceSearchText, currentMatchIndex]);

  // Navigation handlers
  const handleNext = (): void => {
    setCurrentMatchIndex((prev) => (prev + 1) % matches.length);
  };

  const handlePrevious = (): void => {
    setCurrentMatchIndex(
      (prev) => (prev - 1 + matches.length) % matches.length
    );
  };

  if (!isOpen) {
    return (
      <div
        className="bg-[#f9fbfd]"
        style={{
          padding: '11px 0px 0px',
        }}
      >
        <div
          className="bg-white w-[804px] h-[1201px] border mx-auto p-[68px] text-[15px] font-sans leading-normal font-normal"
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.20) 0px 0px 0px 0.7px',
          }}
        >
          <div className="sp-4 text-black">
            <p className="whitespace-pre-wrap">{content}</p>
          </div>{' '}
        </div>{' '}
      </div>
    );
  }

  return (
    <div
      className="bg-[#f9fbfd]"
      style={{
        padding: '11px 0px 0px',
      }}
    >
      <div
        className="bg-white w-[804px] h-[1201px] border mx-auto p-[68px] text-[15px] font-sans leading-normal font-normal"
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.20) 0px 0px 0px 0.7px',
        }}
      >
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
                ? `${currentMatchIndex + 1} of ${matches.length}`
                : ''}
            </span>

            <button
              onClick={handlePrevious}
              disabled={!matches.length}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
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
            </button>

            <button
              onClick={handleNext}
              disabled={!matches.length}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
              title="Next match"
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
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
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
            </button>
          </div>
        </div>
        <p className="whitespace-pre-wrap text-black">{highlightedContent}</p>
      </div>
    </div>
  );
};

export default App;
