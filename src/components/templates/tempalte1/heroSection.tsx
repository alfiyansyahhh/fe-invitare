'use client';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  fadeUp: any;
  heroData: {
    coupleNames: string;
    introText: string;
    date: string;
    time: string;
    venue: string;
    mapLink: string;
  };
}

export default function HeroSection({ fadeUp, heroData }: HeroSectionProps) {
  const { coupleNames, introText, date, time, venue, mapLink } = heroData;

  return (
    <section className='max-w-3xl mx-auto mt-16 text-center px-4'>
      <motion.p
        className='text-lg text-gray-700 mb-2'
        initial='hidden'
        animate='visible'
        variants={fadeUp}
      >
        {introText}
      </motion.p>
      <motion.h1
        className='text-5xl md:text-6xl font-serif text-[#b88f5f] mb-4'
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.5 }}
        variants={fadeUp}
      >
        {coupleNames}
      </motion.h1>
      <motion.div
        className='text-lg text-gray-700 space-y-1'
        initial='hidden'
        animate='visible'
        transition={{ delay: 1 }}
        variants={fadeUp}
      >
        <p>
          Mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami
        </p>
        <p>
          <strong>Hari/Tanggal:</strong> {date}
        </p>
        <p>
          <strong>Waktu:</strong> {time}
        </p>
        <p>
          <strong>Tempat:</strong> {venue}
        </p>
        <a
          href={mapLink}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block mt-4 px-6 py-2 bg-[#b88f5f] text-white rounded-lg shadow hover:bg-[#a07040] transition'
        >
          Lihat Lokasi
        </a>
      </motion.div>
    </section>
  );
}
