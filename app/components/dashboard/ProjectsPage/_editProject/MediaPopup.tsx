import { FiX, FiLink, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface MediaPopupProps {
  isOpen: boolean;
  selectedSlot: number | null;
  tempUrl: string;
  setTempUrl: (url: string) => void;
  images: string[];
  onClose: (e: React.MouseEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onClear: (e: React.MouseEvent) => void;
}

export default function MediaPopup({
  isOpen,
  selectedSlot,
  tempUrl,
  setTempUrl,
  images,
  onClose,
  onSave,
  onClear,
}: MediaPopupProps) {
  if (!isOpen || selectedSlot === null) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h4 className="font-bold text-stone-800">
            {images[selectedSlot] ? "Edit Image" : "Add Image"} - Slot {selectedSlot + 1}
          </h4>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-stone-400 hover:text-stone-600 transition-colors p-1 rounded-lg hover:bg-stone-100"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Image URL
            </label>
            <div className="flex items-center bg-stone-50 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500/50">
              <FiLink className="ml-4 text-stone-400" size={16} />
              <input
                type="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="w-full bg-transparent border-none p-4 text-sm focus:ring-0 placeholder:text-stone-400"
                placeholder="https://example.com/image.jpg"
                autoFocus
              />
            </div>
          </div>
          
          {/* Preview in popup */}
          {tempUrl && (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-stone-50 border border-stone-200 relative">
              <img src={tempUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                e.currentTarget.nextElementSibling?.classList.add('flex');
              }} />
              <div className="hidden absolute inset-0 flex-col items-center justify-center text-stone-400 bg-stone-50 p-4 text-center">
                  <FiAlertCircle size={24} className="mb-2 text-red-400 opacity-50" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Invalid URL</span>
              </div>
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClear}
            disabled={!images[selectedSlot] && !tempUrl}
            className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
          >
            Clear Slot
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-bold text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/25"
            >
              Save Image
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
