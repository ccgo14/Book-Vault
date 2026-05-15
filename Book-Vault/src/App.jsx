import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import './index.css'


function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');


  async function handleSearch(query) {
    setLoading(true)
    setError('');
    setResults([]);
      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data = await res.json();
      if (data.docs.length === 0) {
      setError('Book not found');
      } else {
      setResults(data.docs);
      }
    } catch (err) {
    setError('Something went wrong. Please try again.');
    } finally {
    setLoading(false);
    }
  }
  return (
    <div className = 'items-center text-center'>
      <h1 className = 'font-bold text-2xl'>Discover your Next Read</h1>
      <p>Search the vault for classics and contemporary gems!</p>
      <SearchBar onSearch={handleSearch} loading={loading}/>

      {error && <p className="text-red-500 mt-2">{error}</p>}
{results.map((book) => (
  <div key={book.key} className="border rounded-xl p-2 m-2">
    <p className="font-bold">{book.title}</p>
    <p className="text-sm text-gray-600">{book.author_name?.join(', ')}</p>
  </div>
))}
    </div>
  )
}

export default App
