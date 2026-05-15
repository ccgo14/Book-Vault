import { useState } from 'react';
import { ImageOff } from 'lucide-react';

function BookCard({ book, actionLabel, onAction }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card book-hover fade-in flex flex-col h-full">
      <div className="w-full h-64 bg-gray-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center border border-gray-200">
        {book.image && !imgError ? (
          <img 
            src={book.image} 
            alt={book.title} 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)} 
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <ImageOff size={40} strokeWidth={1} />
            <span className="text-[10px] mt-2 font-medium uppercase tracking-widest">No Cover Found</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <h3 className="font-bold text-lg line-clamp-1 text-gray-900">{book.title}</h3>
        <p className="text-gray-500 text-sm">{book.author}</p>
        
        <button 
          onClick={() => onAction(book)}
          className="btn-primary mt-auto w-full text-sm py-2.5"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

export default BookCard;