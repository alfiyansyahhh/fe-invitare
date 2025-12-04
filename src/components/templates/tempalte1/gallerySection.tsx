'use client';
import { AnimatePresence, motion } from 'framer-motion';

interface GallerySectionProps {
  galleryImages: any[];
  selectedImg: any;
  setSelectedImg: (img: any) => void;
}

export default function GallerySection({
  galleryImages,
  selectedImg,
  setSelectedImg,
}: GallerySectionProps) {
  return (
    <section className='my-16 max-w-5xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-[#b88f5f]'>Galeri Kami</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {galleryImages.map((img, i) => (
          <motion.img
            key={i}
            src={img.src}
            alt={`Gallery ${i}`}
            className='w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer'
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelectedImg(img)}
          />
        ))}
      </div>
      {/* Modal Preview */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className='fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              className='relative max-w-3xl max-h-[80vh] rounded-xl overflow-hidden shadow-2xl'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={selectedImg?.src}
                alt='Preview'
                className='w-full h-auto object-cover'
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className='absolute inset-0 bg-black/50'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              {selectedImg?.description && (
                <motion.div
                  className='absolute bottom-0 left-0 w-full h-[140px] bg-gradient-to-t from-[#fff8f0]/90 to-transparent p-6'
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <motion.p
                    className='text-white text-center text-lg font-semibold'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                  >
                    {selectedImg.description}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
