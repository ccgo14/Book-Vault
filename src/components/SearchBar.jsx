
import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) {
        setError("Please enter a book to be searched");
        return;
    }
    setError("")
    onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className = 'border rounded-xl p-0.5 m-1'
      />
      <button type="submit" 
      disabled={loading || !query.trim()} 
      className='border rounded-xl p-0.5 m-1 cursor-pointer'>
        {loading ? 'Searching…' : 'Search'}
      </button>
    </form>
  );
=======
import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) {
        setError("Please enter a book to be searched");
        return;
    }
    setError("")
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
        }}
        className = 'border rounded-xl p-0.5 m-1'
      />
      <button type="submit" 
      disabled={loading || !query.trim()} 
      className='border rounded-xl p-0.5 m-1 cursor-pointer'>
        {loading ? 'Searching…' : 'Search'}
      </button>
      {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
    </form>
  );
>>>>>>> origin/dev:src/components/SearchBar.jsx
}
