
import React, { useState } from 'react';
import { Wand2, Loader2, Sparkles, X } from 'lucide-react';
import { generateCakeVisual } from '../services/geminiService';

export const AICakeDesigner: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const img = await generateCakeVisual(prompt);
    setResultImage(img);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <div>
            <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
              <Sparkles className="text-amber-500" />
              AI Cake Designer
            </h2>
            <p className="text-sm text-stone-500">Visualize your dream cake with AI</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-stone-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Describe your vision</label>
            <textarea
              className="w-full h-24 p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none text-stone-800"
              placeholder="e.g., A three-tier lavender colored cake with edible silver leaf and white roses..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="px-8 py-3 bg-amber-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-amber-600 disabled:opacity-50 transition-all shadow-lg shadow-amber-200"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Baking Vision...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Visualization
                </>
              )}
            </button>
          </div>

          {resultImage && (
            <div className="rounded-2xl overflow-hidden border-4 border-stone-100 shadow-inner group relative">
              <img src={resultImage} alt="Generated Cake" className="w-full aspect-square object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-stone-900/60 backdrop-blur p-3 text-white text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                AI Interpretation of your request
              </div>
            </div>
          )}
          
          {!resultImage && !loading && (
            <div className="h-64 border-2 border-dashed border-stone-200 rounded-2xl flex items-center justify-center text-stone-400">
              <p>Your creation will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
