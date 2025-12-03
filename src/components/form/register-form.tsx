'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FormInput } from '../ui/form-input';
import { Form } from '../ui/form';
import { useTranslation } from 'react-i18next';
import { registerSchema } from '@/schemas'; // pastikan ini beda dengan login
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
  const [isPending, setisPending] = useState(false);
  const { t } = useTranslation();
  let router = useRouter();

  const { data: session } = useSession();

  // ----------- HANDLE GOOGLE REGISTER -----------
  useEffect(() => {
    const handleGoogleRegister = async () => {
      if (!session?.user || session?.user?.provider !== 'google') return;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/register`,
          {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            provider: 'google',
          }
        );

        if (res.data.success) {
          toast.success('Register Google berhasil!');
          router.push('/login');
        } else {
          toast.error('Google register gagal');
        }
      } catch (err) {
        toast.error('Terjadi kesalahan pada Google Register');
      }
    };

    handleGoogleRegister();
  }, [session]);

  // ----------- REGISTER MANUAL USING FORM -----------
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setisPending(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/register`,
        values
      );

      if (res.status === 200 && res.data.success) {
        toast.success('Register berhasil, silakan login.');
        router.push('/login');
      } else {
        toast.error(res.data.message || 'Registrasi gagal');
      }
    } catch (e) {
      toast.error('Terjadi kesalahan saat registrasi');
    }

    setisPending(false);
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div className='space-y-5'>
            <FormInput
              control={form.control}
              name='name'
              label='Nama'
              type='text'
              placeholder='Nama lengkap'
              isPending={isPending}
            />

            <FormInput
              control={form.control}
              name='email'
              label='E-mail'
              type='email'
              placeholder='Masukkan E-mail'
              isPending={isPending}
            />

            <FormInput
              control={form.control}
              name='password'
              label='Password'
              type='password'
              placeholder='Masukkan Kata Sandi'
              isPending={isPending}
            />

            {/* REGISTER BUTTON */}
            <Button
              type='submit'
              disabled={!form.formState.isValid}
              loading={isPending}
              className='w-full rounded-[5px] h-[50px]'
            >
              {t('Daftar')}
            </Button>

            {/* GOOGLE REGISTER BUTTON */}
            <Button
              type='button'
              variant='outline'
              loading={isPending}
              className='w-full rounded-[5px] h-[50px]'
              onClick={() => signIn('google')}
            >
              {t('Masuk Dengan Google')}
            </Button>

            <div className='text-center'>
              Already have an account? Let’s
              <Link
                className='text-end font-bold text-[15px] ml-2'
                href={'/login'}
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
