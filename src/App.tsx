import { useState, useEffect, useRef } from 'react';

const App: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();

        setIsOpen(true);

        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
            <span className="text-sm text-gray-600">0</span>

            <button
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
      </div>
    </div>
  );
};

export default App;
