'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
interface Guest {
  name: string;
  message: string;
}

export default function Template1() {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMusic = () => setIsPlaying(!isPlaying);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const flowers = [
    { left: '10%', duration: 10 },
    { left: '40%', duration: 12 },
    { left: '70%', duration: 14 },
  ];

  const galleryImages = [
    'https://i.ibb.co/album1.jpg',
    'https://i.ibb.co/album2.jpg',
    'https://i.ibb.co/album3.jpg',
  ];

  const storyEvents = [
    { year: '2018', desc: 'Pertemuan pertama di kampus.' },
    { year: '2019', desc: 'Mulai menjalin hubungan.' },
    { year: '2024', desc: 'Lamaran yang manis.' },
    { year: '2026', desc: 'Menuju pernikahan.' },
  ];

  const corners = [
    { style: { top: '20px', left: '20px' }, rotation: 0 }, // kiri atas
    { style: { top: '20px', right: '20px' }, rotation: -150 }, // kanan atas
    { style: { bottom: '20px', left: '20px' }, rotation: -90 }, // kiri bawah
    { style: { bottom: '20px', right: '20px' }, rotation: 180 }, // kanan bawah
  ];

  // Handle Guestbook Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      setGuests([...guests, { name, message }]);
      setName('');
      setMessage('');
    }
  };

  // Play music saat open
  useEffect(() => {
    if (open && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [open]);

  // Animasi untuk banner masuk
  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
  };

  if (!open) {
    return (
      <div className='w-full h-screen bg-[#b88f5f] flex flex-col items-center justify-center text-center text-white px-4'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={bannerVariants}
        >
          <h1 className='text-4xl font-bold mb-4'>Undangan Pernikahan</h1>
          <p className='mb-6'>Sarah & Dimas</p>
          <motion.button
            className='px-6 py-3 bg-white text-[#b88f5f] rounded-lg font-semibold hover:bg-gray-100 transition'
            whileHover={{ scale: 1.05 }}
            onClick={() => setOpen(true)}
          >
            Buka Undangan
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='relative w-full min-h-screen bg-[#fff8f0] flex flex-col items-center text-center px-4 overflow-x-hidden'>
      <ReactPlayer
        src='https://www.youtube.com/watch?v=qrjSLC-5Nc0'
        playing={isPlaying}
        loop
        volume={0.5}
        style={{ display: 'none' }}
      />

      <button
        onClick={toggleMusic}
        className='fixed top-4 right-4 bg-white rounded-full p-3 shadow-lg z-50 hover:scale-110 transition'
      >
        asdas
      </button>
      {corners.map((corner, index) => (
        <motion.img
          key={index}
          src='https://png.pngtree.com/png-clipart/20230312/ourmid/pngtree-transparent-watercolor-flowers-png-image_6646331.png'
          alt={`bouquet ${index + 1}`}
          style={{
            position: 'fixed',
            width: '120px',
            height: 'auto',
            zIndex: 1000,
            ...corner.style,
          }}
          initial={{ rotate: corner.rotation }}
          animate={{
            y: [0, -10, 0, 10, 0],
            rotate: [
              corner.rotation,
              corner.rotation + 5,
              corner.rotation - 5,
              corner.rotation + 5,
              corner.rotation,
            ],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Flowers */}
      {flowers.map((f, i) => (
        <motion.img
          key={i}
          src='https://png.pngtree.com/png-clipart/20220806/ourmid/pngtree-outlined-leaves-decoration-with-watercolor-flowers-bouquet-frame-png-image_6101124.png'
          alt='flower'
          className='absolute w-16 h-16 opacity-80'
          style={{ left: f.left }}
          animate={{ y: ['100vh', '-20vh'] }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        />
      ))}

      {/* Hero Section */}
      <motion.p
        className='text-lg mt-12 mb-4'
        initial='hidden'
        animate='visible'
        variants={fadeUp}
      >
        Dengan memohon rahmat dan ridho Allah SWT
      </motion.p>

      <motion.h1
        className='text-4xl font-bold text-[#b88f5f] mb-4'
        initial='hidden'
        animate='visible'
        transition={{ delay: 1 }}
        variants={fadeUp}
      >
        Sarah & Dimas
      </motion.h1>

      {/* Detail Acara */}
      <motion.div
        className='text-lg mb-12'
        initial='hidden'
        animate='visible'
        transition={{ delay: 2 }}
        variants={fadeUp}
      >
        <p>
          Mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami
        </p>
        <p>
          <strong>Hari/Tanggal:</strong> Sabtu, 10 Juni 2026
        </p>
        <p>
          <strong>Waktu:</strong> 10.00 WIB – Selesai
        </p>
        <p>
          <strong>Tempat:</strong> Gedung Harmoni, Jakarta
        </p>
        <motion.a
          href='https://maps.google.com'
          target='_blank'
          className='inline-block mt-4 px-6 py-2 bg-[#b88f5f] text-white rounded-lg hover:bg-[#a07040] transition'
        >
          Lihat Lokasi
        </motion.a>
      </motion.div>

      {/* Gallery */}
      <div className='my-12 max-w-5xl mx-auto'>
        <h2 className='text-2xl font-bold mb-6'>Galeri Kami</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {galleryImages.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Gallery ${i}`}
              className='w-full h-64 object-cover rounded-lg shadow-lg'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Story / Kisah */}
      <div className='my-12 max-w-3xl mx-auto'>
        <h2 className='text-2xl font-bold mb-6'>Kisah Kami</h2>
        <div className='space-y-6 text-center'>
          {storyEvents.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
            >
              <p className='font-semibold text-[#b88f5f]'>{e.year}</p>
              <p>{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Guestbook */}
      <div className='my-12 max-w-3xl mx-auto'>
        <h2 className='text-2xl font-bold mb-6'>Tulis Ucapanmu</h2>
        <form
          onSubmit={handleSubmit}
          className='mb-6 space-y-3 text-center'
        >
          <input
            type='text'
            placeholder='Nama'
            className='w-full p-2 border rounded'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder='Ucapan / Doa'
            className='w-full p-2 border rounded'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type='submit'
            className='px-4 py-2 bg-[#b88f5f] text-white rounded hover:bg-[#a07040] transition'
          >
            Kirim
          </button>
        </form>
        <div className='space-y-4'>
          {guests.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='border p-3 rounded shadow-sm'
            >
              <p className='font-semibold'>{g.name}</p>
              <p>{g.message}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Monogram / Footer */}
      <motion.div
        className='text-3xl font-bold text-[#b88f5f] mt-8 mb-4'
        initial='hidden'
        animate='visible'
        transition={{ delay: 4 }}
        variants={fadeUp}
      >
        S & D
      </motion.div>
      <div className='text-center py-8 text-gray-500'>
        &copy; 2026 Sarah & Dimas. All rights reserved.
      </div>
    </div>
  );
}
