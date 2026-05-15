import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) {
        setError("Please enter a book to be searched");
        return;
    }
    setError("")
    setNotFound("")
    onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (error) setError("");
          if (notFound) setNotFound("");
        }}
        className = 'border rounded-xl p-0.5 m-1'
      />
      <button type="submit" 
      disabled={loading || !query.trim()} 
      className='border rounded-xl p-0.5 m-1 cursor-pointer'>
        {loading ? 'Searching…' : 'Search'}
      </button>
      {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
      {notFound && <p style={{ color: 'orange', fontSize: '12px' }}>{notFound}</p>}
    </form>
  );
}
