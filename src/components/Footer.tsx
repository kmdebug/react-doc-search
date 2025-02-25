const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="font-sans font-medium w-full fixed bottom-0 text-gray-500 flex items-center justify-between border-t border-gray-300 bg-white px-6 py-2">
      <div className="flex items-center gap-4">
        <a
          className="text-gray-700 text-xs cursor-pointer hover:underline"
          rel="noreferrer"
          href="https://github.com/kmdebug/react-doc-search"
          target="_blank"
        >
          GitHub
        </a>
      </div>
      <p className="text-gray-700 text-xs">
        <a
          className="hover:underline"
          rel="noreferrer"
          href="https://www.linkedin.com/in/kaissar-mouelhi/"
          target="_blank"
        >
          Kaissar Mouelhi
        </a>
      </p>
    </footer>
  );
};

export default Footer;
