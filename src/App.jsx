import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Discovery from './components/Discovery';
import Library from './components/Library';
import About from './components/About';
import NotFound from './components/NotFound';
import BookForm from './components/BookForm'; 

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    fetch('http://localhost:6001/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching library:", err);
        setIsLoading(false);
      });
  }, []);

  
  const displayedBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBookToState = (newBook) => setBooks((prev) => [...prev, newBook]);

  const handleDeleteBook = (id) => {
    fetch(`http://localhost:6001/books/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) setBooks((prev) => prev.filter(book => book.id !== id));
      });
  };

  const handleUpdateStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "Completed" ? "Want to Read" : "Completed";
    fetch(`http://localhost:6001/books/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    })
      .then((res) => res.json())
      .then((updated) => setBooks(books.map((b) => (b.id === id ? updated : b))));
  };

  return (
    <div className="flex min-h-screen bg-brand-cream/10 text-brand-stone selection:bg-brand-amber/20">
      
      <Navbar onSearchChange={setSearchTerm} />

      
      <main className="flex-1 w-full lg:pl-64 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto p-4 md:p-8 lg:p-12 pt-20 lg:pt-12">
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center h-[70vh] gap-6"
              >
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-amber/10 border-b-brand-amber"></div>
                  <div className="absolute inset-0 m-auto h-6 w-6 bg-brand-amber/20 rounded-full animate-pulse" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-brand-stone/60 italic">
                  Opening the Vault...
                </h2>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Routes>
                  <Route path="/" element={<Discovery onAddBook={handleAddBookToState} />} />
                  <Route path="/library" element={<Library books={displayedBooks} onDelete={handleDeleteBook} onUpdateStatus={handleUpdateStatus} />} />
                  <Route path="/add" element={<BookForm onAddBook={handleAddBookToState} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}