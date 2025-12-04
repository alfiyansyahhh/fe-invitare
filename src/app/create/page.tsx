'use client';
import { useState } from 'react';
import { generateSlug } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CreateInvitationPage() {
  const router = useRouter();

  const [coupleNames, setCoupleNames] = useState('');
  const [introText, setIntroText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [template, setTemplate] = useState('template1');
  const [slug, setSlug] = useState('');

  const handleSubmit = () => {
    if (!coupleNames) return alert('Nama pasangan wajib diisi');

    const finalSlug = slug ? generateSlug(slug) : generateSlug(coupleNames);

    const data = {
      template,
      heroData: {
        coupleNames,
        introText,
        date,
        time,
        venue,
        mapLink,
      },
      galleryImages: [],
      guests: [],
    };

    // simpan ke localStorage (sementara)
    localStorage.setItem(finalSlug, JSON.stringify(data));

    // redirect
    router.push(`/${finalSlug}`);
  };

  return (
    <div className='max-w-2xl mx-auto py-10 space-y-6'>
      <h1 className='text-3xl font-bold mb-4'>Buat Undangan</h1>

      <div className='space-y-4'>
        <input
          className='w-full p-3 border rounded'
          placeholder='Nama Pasangan (contoh: Sarah & Dimas)'
          value={coupleNames}
          onChange={(e) => setCoupleNames(e.target.value)}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Intro Text'
          value={introText}
          onChange={(e) => setIntroText(e.target.value)}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Tanggal'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Jam'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Lokasi'
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Link Map'
          value={mapLink}
          onChange={(e) => setMapLink(e.target.value)}
        />

        {/* Template Picker */}
        <select
          className='w-full p-3 border rounded'
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          <option value='template1'>Template 1</option>
          <option value='template2'>Template 2</option>
          <option value='template3'>Template 3</option>
        </select>

        {/* Custom Slug */}
        <input
          className='w-full p-3 border rounded'
          placeholder='Custom URL (opsional, contoh: sarah-dimas)'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className='w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Buat Undangan
        </button>
      </div>
    </div>
  );
}
