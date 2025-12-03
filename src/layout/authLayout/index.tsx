'use client';

import i18n from '@/config/i18n';
import React, { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Image from 'next/image';
import LanguageDropdown from '@/components/ui/LanguageDropDown';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
      <div className='min-h-screen flex items-center justify-center bg-gray-100 '>
        <div className=' w-[400px]  border  rounded-md '>
          <div className='mt-4  rounded-md  px-10 py-5 shadow-lg flex flex-col '>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-bold '>{t(title)}</h1>
              <LanguageDropdown />
            </div>

            <div className='mt-4'>{children}</div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default AuthLayout;
