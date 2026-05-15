import BookCard from './BookCard';

function Library({ books, onDelete, onUpdateStatus }) {
 
  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Personal Vault</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
    {books.length} Books  
</span>
      </header>

    {books.length === 0 ? (        <div className="text-center mt-20">
          <p className="text-gray-500 italic">Your vault is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book.id} className="flex flex-col">
              <BookCard 
                book={book} 
                actionLabel="Remove from Vault" 
               onAction={() => onDelete(book.id)} 
              />
              
              <div className="mt-2 flex items-center justify-between px-1">
                <span className={`text-[10px] font-bold uppercase ${book.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>
                  {book.status}
                </span>
                {onUpdateStatus && (
                <button 
                 onClick={() => onUpdateStatus(book.id, book.status)}
                  className="text-[10px] text-blue-600 hover:underline cursor-pointer"
                >
                  Mark as {book.status === "Want to Read" ? "Completed" : "Want to Read"}
                </button>
              )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Library;