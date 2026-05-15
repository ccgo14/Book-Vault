import { useState } from 'react';
import SearchBar from './SearchBar'; 
import BookCard from './BookCard';
import { motion, AnimatePresence } from "framer-motion";

function Discovery({ onAddBook }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (query) => {
        const cleanQuery = query.trim();
        if (!cleanQuery || cleanQuery.length < 2) return; 

        setLoading(true);
        setError(null);

        
        fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(cleanQuery)}&limit=12`)
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
                    image: book.cover_i 
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
                        : null 
                }));
                setBooks(results);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Discovery Error:", err);
                setError(err.message);
                setBooks([]);
                setLoading(false);
            });
    };

    const addToLibrary = (book) => {
        
        fetch('http://localhost:6001/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ...book, 
                status: "Want to Read",
                dateAdded: new Date().toISOString().split('T')[0]
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Local server not running");
            return res.json();
        })
        .then((savedBook) => {
            if (onAddBook) onAddBook(savedBook);
            alert(`Added "${book.title}" to your library!`);
        })
        .catch(err => {
            console.error("Save Error:", err);
            alert("Could not save. Is your json-server running on port 6001?");
        });
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
                <AnimatePresence>
                    {books.map((book, index) => (
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
                                actionLabel="Add to Library" 
                                onAction={() => addToLibrary(book)} 
                            />
                        </motion.div>
                    ))}
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