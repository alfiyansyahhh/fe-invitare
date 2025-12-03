'use client';

import i18n from '@/config/i18n';
import React, { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import LanguageDropdown from '@/components/ui/LanguageDropDown';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const AuthLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  let { t } = useTranslation();
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/home');
      }

      if (session?.user?.role === 'applicant') {
        router.push('/home');
      }
    }
  }, [status, router]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className='min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0F0F0F]'>
        {/* === Futuristic Page Background (Animated) === */}
        <div className='absolute inset-0 pointer-events-none'>
          {/* Moving green glow (drifting slowly) */}
          <motion.div
            animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute -top-20 -left-32 w-[500px] h-[500px] bg-[#21AF7D]/25 rounded-full blur-[160px]'
          />

          {/* Moving blue glow */}
          <motion.div
            animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#4c6aff]/20 rounded-full blur-[150px]'
          />

          {/* Hologram grid scrolling */}
          <motion.div
            animate={{ backgroundPositionY: [0, 40] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]'
          />

          {/* === HEARTBEAT LINE (EKG) NEON GLOW — FIX VERSION === */}
          <motion.div
            animate={{ x: ['100%', '-150%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className='absolute top-1/2 left-0 w-[300%] h-[3px] opacity-80'
          >
            {/* Glow layer */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                filter: 'blur(14px)',
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='20'><polyline points='0,10 20,10 30,5 40,15 50,10 70,10 90,0 110,20 130,10 160,10 180,5 190,15 200,10 250,10 260,0 270,20 280,10 300,10' fill='none' stroke='%2321AF7D' stroke-width='4' stroke-linejoin='round' stroke-linecap='round'/></svg>\")",
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'cover',
                opacity: 0.45,
              }}
            />

            {/* Sharp layer */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='20'><polyline points='0,10 20,10 30,5 40,15 50,10 70,10 90,0 110,20 130,10 160,10 180,5 190,15 200,10 250,10 260,0 270,20 280,10 300,10' fill='none' stroke='%2321AF7D' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/></svg>\")",
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'cover',
              }}
            />
          </motion.div>
        </div>

        {/* === Card (Your Existing Motion) === */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.015,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          className='w-[400px] relative z-10'
          style={{
            filter: 'drop-shadow(0px 15px 30px rgba(0,0,0,0.35))',
          }}
        >
          <div
            className='
          mt-4 rounded-xl px-10 py-5 shadow-lg flex flex-col 
          bg-gray-300 backdrop-blur-xl relative overflow-hidden
        '
          >
            {/* Glow inside card */}
            <div className='absolute inset-0 pointer-events-none'>
              <div className='absolute -top-20 -left-20 w-60 h-60 bg-[#21AF7D]/30 rounded-full blur-3xl'></div>
              <div className='absolute bottom-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl'></div>
            </div>

            <div className='absolute inset-0 rounded-xl border border-white/20'></div>

            <div className='relative z-10'>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>{t(title)}</h1>
                <LanguageDropdown />
              </div>

              <div className='mt-4'>{children}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </I18nextProvider>
  );
};

export default AuthLayout;
