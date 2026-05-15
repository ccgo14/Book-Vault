import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Loader2, ArrowLeft } from 'lucide-react'; 

function BookForm({ onAddBook }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    status: 'Want to Read',
    rating: 0,
    dateAdded: new Date().toISOString().split('T')[0] 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    
    fetch('http://localhost:6001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save book");
        return res.json();
      })
      .then((newBook) => {
        
        if (onAddBook) onAddBook(newBook);
        
        
        navigate('/library');
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving book. Is the server running?");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-sm border border-gray-100 mt-10">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-3xl font-bold text-gray-900 font-serif italic">New Addition</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 ml-1">Title</label>
            <input 
              type="text" 
              name="title" 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              placeholder="e.g. The Great Gatsby" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 ml-1">Author</label>
            <input 
              type="text" 
              name="author" 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              placeholder="Author Name" 
              value={formData.author} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600 ml-1">Cover Image URL</label>
          <input 
            type="text" 
            name="image" 
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            placeholder="Paste URL from Open Library or similar" 
            value={formData.image} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600 ml-1">Reading Status</label>
          <select 
            name="status" 
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all appearance-none"
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-600 transition-all disabled:bg-gray-400 shadow-lg shadow-gray-200"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Save size={20} />
              Save to Vault
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default BookForm;