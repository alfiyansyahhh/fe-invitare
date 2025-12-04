'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface GuestbookSectionProps {
  guests: any[];
  setGuests: (guests: any[]) => void;
}

export default function GuestbookSection({
  guests,
  setGuests,
}: GuestbookSectionProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      setGuests([...guests, { name, message }]);
      setName('');
      setMessage('');
    }
  };

  return (
    <section className='my-16 max-w-3xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-[#b88f5f]'>Tulis Ucapanmu</h2>
      <form
        onSubmit={handleSubmit}
        className='mb-6 space-y-4 text-center'
      >
        <input
          type='text'
          placeholder='Nama'
          className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5f]'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder='Ucapan / Doa'
          className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5f]'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type='submit'
          className='px-6 py-3 bg-[#b88f5f] text-white rounded-lg hover:bg-[#a07040] transition'
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
            className='border p-4 rounded-lg shadow-sm bg-white'
          >
            <p className='font-semibold text-[#b88f5f]'>{g.name}</p>
            <p>{g.message}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
