import BookCard from './BookCard';

export default function Library({ books, onDeleteBook, onUpdateBook }) {
  const API_URL = 'https://6a06d5f6c83ba8ad9b3df174.mockapi.io/books';

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) onDeleteBook(id);
      })
      .catch(err => console.error("Delete failed:", err));
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Want to Read" ? "Completed" : "Want to Read";
    
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(updatedBook => onUpdateBook(updatedBook))
    .catch(err => console.error("Update failed:", err));
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Personal Vault</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {books.length} Books
        </span>
      </header>

      {books.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 italic">Your vault is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book.id} className="flex flex-col">
              <BookCard 
                book={book} 
                actionLabel="Remove from Vault" 
                onAction={() => handleDelete(book.id)} 
              />
              <div className="mt-2 flex items-center justify-between px-1">
                <span className={`text-[10px] font-bold uppercase ${book.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>
                  {book.status}
                </span>
                <button 
                  onClick={() => handleToggleStatus(book.id, book.status)}
                  className="text-[10px] text-blue-600 hover:underline cursor-pointer"
                >
                  Mark as {book.status === "Want to Read" ? "Completed" : "Want to Read"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}