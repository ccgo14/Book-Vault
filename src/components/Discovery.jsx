import { useState, useCallback, useRef } from 'react';
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import { motion, AnimatePresence } from "framer-motion";

function Discovery({ onAddBook, existingBooks = [] }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savingIds, setSavingIds] = useState(new Set());
  
  // Abort controller prevents race conditions
  const abortControllerRef = useRef(null);

  const handleSearch = useCallback((query) => {
    const cleanQuery = query.trim();
    if (!cleanQuery || cleanQuery.length < 2) return;

    // Cancel the previous unfinished search request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(cleanQuery)}&limit=12`, {
      signal: abortControllerRef.current.signal
    })
      .then(res => {
        if (res.status === 422) throw new Error("Search term too short or broad for the server.");
        if (!res.ok) throw new Error("The library is currently busy. Try again?");
        return res.json();
      })
      .then(data => {
        const results = data.docs.map(book => ({
          id: book.key,
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown Author",
          image: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null
        }));
        setBooks(results);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // Ignore intentional cancellations
        console.error("Discovery Error:", err);
        setError(err.message);
        setBooks([]);
      })
      .finally(() => {
        if (!abortControllerRef.current?.signal.aborted) {
          setLoading(false);
        }
      });
  }, []);

  const addToLibrary = async (book) => {
    if (savingIds.has(book.id)) return;

    setSavingIds(prev => new Set(prev).add(book.id));

    try {
      const res = await fetch('https://6a06d5f6c83ba8ad9b3df174.mockapi.io/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...book,
          status: "Want to Read",
          dateAdded: new Date().toISOString().split('T')[0]
        })
      });

      if (!res.ok) throw new Error("Could not save to your cloud database.");
      
      const savedBook = await res.json();
      if (onAddBook) onAddBook(savedBook);
      alert(`Added "${book.title}" to your library!`);
    } catch (err) {
      console.error("Save Error:", err);
      alert(err.message);
    } finally {
      setSavingIds(prev => {
        const next = new Set(prev);
        next.delete(book.id);
        return next;
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Discover Books</h1>
        <p className="text-slate-500 mt-2 text-lg">Explore millions of titles from the Open Library.</p>
      </header>

      <div className="flex flex-col items-center mb-16">
        <SearchBar onSearch={handleSearch} loading={loading} />
        {error && <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {books.map((book, index) => {
            const isAlreadyAdded = existingBooks.some(b => b.id === book.id);
            const isSaving = savingIds.has(book.id);

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                key={book.id}
              >
                <BookCard 
                  book={book} 
                  actionLabel={isSaving ? "Saving..." : isAlreadyAdded ? "In Library" : "Add to Library"} 
                  onAction={() => addToLibrary(book)}
                  disabled={isSaving || isAlreadyAdded}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!loading && books.length === 0 && !error && (
        <div className="text-center py-20 opacity-30">
          <p className="text-2xl italic font-serif">"A room without books is like a body without a soul."</p>
          <p className="mt-2">— Cicero</p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      )}
    </div>
  );
}

export default Discovery;
