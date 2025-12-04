'use client';
import { motion } from 'framer-motion';

interface FooterSectionProps {
  fadeUp: any;
}

export default function FooterSection({ fadeUp }: FooterSectionProps) {
  return (
    <footer className='text-center py-8 text-gray-500'>
      <motion.div
        className='text-4xl font-bold text-[#b88f5f] mb-4'
        initial='hidden'
        animate='visible'
        transition={{ delay: 4 }}
        variants={fadeUp}
      >
        S & D
      </motion.div>
      &copy; 2026 Sarah & Dimas. All rights reserved.
    </footer>
  );
}
