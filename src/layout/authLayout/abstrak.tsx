'use client';

import i18n from '@/config/i18n';
import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import LanguageDropdown from '@/components/ui/LanguageDropDown';
import { motion } from 'framer-motion';

const AuthLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <div className='min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900'>
        {/* === Abstract Motion Background === */}
        <motion.div
          className='absolute inset-0'
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className='absolute rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 opacity-30'
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* === Center Card/Form === */}
        <motion.div
          className='relative z-10 w-full max-w-lg p-8'
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{
            scale: 1.02,
            rotate: [0, 1, -1, 0],
            transition: { duration: 0.5 },
          }}
        >
          <div className='bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-700 p-10 text-white relative overflow-hidden'>
            <div className='flex items-center justify-between mb-6'>
              <h1 className='text-3xl font-bold'>{t(title)}</h1>
              <LanguageDropdown />
            </div>
            <div>{children}</div>
          </div>
        </motion.div>
      </div>
    </I18nextProvider>
  );
};

export default AuthLayout;
