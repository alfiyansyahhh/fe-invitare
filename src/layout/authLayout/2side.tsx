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
  const { t } = useTranslation();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status, router]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className='min-h-screen flex flex-col md:flex-row bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden'>
        <div className='w-full md:w-1/2 h-64 md:h-screen relative overflow-hidden'>
          <img
            src='/images/invitation-hero.jpg'
            alt='Invitation'
            className='w-full h-full object-cover rounded-r-3xl'
          />
          <div className='absolute inset-0 bg-black/10 rounded-r-3xl' />
        </div>

        <motion.div
          className='md:w-1/2 flex items-center justify-center p-8 overflow-hidden'
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
        >
          <div className='w-full max-w-md bg-white rounded-3xl shadow-lg p-10 overflow-hidden'>
            <div className='flex items-center justify-between mb-6'>
              <h1 className='text-xl font-bold'>{t(title)}</h1>
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
