import { useNavigate } from "react-router-dom";
import { Ghost } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <Ghost size={80} className="text-brand-stone/20 mb-8 animate-bounce" />
      <h1 className="text-6xl font-serif font-bold text-brand-stone mb-4">404</h1>
      <p className="text-xl text-brand-stone/60 font-serif italic mb-8 max-w-md">
        This volume seems to have been misplaced or removed from the archives.
      </p>
      <button 
        onClick={() => navigate("/")}
      className="px-8 py-3 bg-brand-amber text-white rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer"
      >
        Return to Discovery
      </button>
    </div>
  );
}
