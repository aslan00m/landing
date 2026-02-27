import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Image Slider */}
      <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={images[currentIndex]}
            alt={`${title} ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
            onClick={() => openGallery(currentIndex)}
          />
        </AnimatePresence>

        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          تأجير / بيع
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>

            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
            onClick={closeGallery}
          >
            <button 
              className="absolute top-4 right-4 z-20 text-white p-3 bg-black/20 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
              onClick={closeGallery}
            >
              <span className="material-symbols-outlined text-2xl md:text-3xl">close</span>
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <button 
                className="absolute left-2 md:left-4 z-10 text-white p-2 md:p-3 bg-black/20 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
                onClick={prevImage}
              >
                <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_left</span>
              </button>
              
              <motion.img 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                src={images[currentIndex]} 
                alt={`${title} ${currentIndex + 1}`} 
                className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <button 
                className="absolute right-2 md:right-4 z-10 text-white p-2 md:p-3 bg-black/20 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
                onClick={nextImage}
              >
                <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_right</span>
              </button>
            </div>

            <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 overflow-x-auto p-2 px-12">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all flex-shrink-0 ${idx === currentIndex ? 'bg-white w-6 md:w-8' : 'bg-white/40 w-2 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
