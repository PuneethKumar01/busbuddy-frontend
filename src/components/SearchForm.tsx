import { useState } from "react";

interface Props {
  onSearch: (from: string, to: string) => void;
}

const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(from.trim(), to.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="From stop" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input type="text" placeholder="To stop" value={to} onChange={(e) => setTo(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
