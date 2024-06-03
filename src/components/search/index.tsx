import React, { useState, useCallback, ChangeEvent } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative flex w-full flex-col relative mb-8 pb-2 max-w-screen-md box-border">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search videos..."
        className="peer w-full p-2 text-2xl rounded text-white mb-2 border-none outline-none bg-transparent"
      />
      <span className="bottom-0 absolute left-0 block h-[2px] w-0 bg-white transform transition-all duration-300 ease-out peer-focus:w-full"></span>
      <span className="bottom-0 left-0 w-full h-[1px] brightness-50 absolute bg-white" />
    </div>
  );
};

export default SearchBar;
