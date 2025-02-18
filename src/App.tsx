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
              className="pl-8 pr-2 py-1 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search in document..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
