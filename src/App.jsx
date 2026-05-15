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
  const API_URL = 'https://6a06d5f6c83ba8ad9b3df174.mockapi.io/books';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setIsLoading(false);
      });
  }, []);
  const handleAddBook = (newBook) => setBooks((prev) => [...prev, newBook]);

const onDeleteBook = (id) => {
  setBooks(books.filter(book => book.id !== id));
};
const onUpdateBook = (updatedBook) => {
  setBooks(books.map(book => 
    book.id === updatedBook.id ? updatedBook : book
  ));
};


  
  const displayedBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-brand-cream/10 text-brand-stone selection:bg-brand-amber/20">
      <Navbar onSearchChange={setSearchTerm} />
      <main className="flex-1 w-full lg:pl-64 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto p-4 md:p-8 lg:p-12 pt-20 lg:pt-12">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="flex justify-center items-center h-[70vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-amber/10 border-b-brand-amber"></div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Routes>
                  <Route path="/" element={<Discovery onAddBook={handleAddBook} />} />
                  <Route path="/library" element={
                    <Library 
                      books={displayedBooks} 
                      onDeleteBook={onDeleteBook} 
                      onUpdateBook={onUpdateBook} 
                    />
                  } />
                  <Route path="/add" element={<BookForm onAddBook={handleAddBook} />} />
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