'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

import MapPicker from '@/components/mapPicker/page';
import { generateSlug, getTemplateComponent } from '@/lib/utils';

export default function CreateInvitationPage() {
  const router = useRouter();

  // =========================
  // FORM STATE
  // =========================
  const [form, setForm] = useState({
    coupleNames: '',
    introText: '',
    date: '',
    time: '',
    venue: '',
    template: 'template1',
    slug: '',
  });

  const [dateValue, setDateValue] = useState<Date | undefined>();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  const [position, setPosition]: any = useState({
    lat: -6.2,
    lng: 106.816666,
  });

  const TemplatePreview = getTemplateComponent(form.template);

  // =========================
  // UPLOAD IMAGES
  // =========================
  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files);

    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImages((prev) => [...prev, reader.result as string]);
        setGalleryImages((prev) => [
          ...prev,
          { src: reader.result, description: '' },
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = () => {
    if (!form.coupleNames) return alert('Nama pasangan wajib diisi');
    if (!dateValue) return alert('Tanggal wajib dipilih');

    const finalSlug = form.slug
      ? generateSlug(form.slug)
      : generateSlug(form.coupleNames);

    const mapLink = `https://www.google.com/maps?q=${position.lat},${position.lng}`;

    const dataToSave = {
      template: form.template,
      heroData: {
        coupleNames: form.coupleNames,
        introText: form.introText,
        date: format(dateValue, 'dd MMMM yyyy'),
        time: form.time,
        venue: form.venue,
        mapLink,
      },
      galleryImages,
      guests: [],
    };

    localStorage.setItem(finalSlug, JSON.stringify(dataToSave));

    router.push(`/${finalSlug}`);
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-10'>
      {/* LEFT FORM */}
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Buat Undangan</h1>

        {/* NAMA PASANGAN */}
        <input
          className='w-full p-3 border rounded'
          placeholder='Nama Pasangan'
          value={form.coupleNames}
          onChange={(e) => setForm({ ...form, coupleNames: e.target.value })}
        />

        {/* INTRO */}
        <textarea
          className='w-full p-3 border rounded'
          placeholder='Intro Text'
          value={form.introText}
          onChange={(e) => setForm({ ...form, introText: e.target.value })}
        />

        {/* DATE PICKER - SHADCN */}
        <div className='space-y-2'>
          <p className='font-semibold'>Tanggal Acara</p>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-full justify-between'
              >
                {dateValue ? format(dateValue, 'PP') : 'Pilih tanggal'}
                <CalendarIcon className='w-4 h-4 opacity-50' />
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto'>
              <Calendar
                mode='single'
                selected={dateValue}
                onSelect={setDateValue}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* TIME */}
        <input
          className='w-full p-3 border rounded'
          placeholder='Jam'
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        {/* VENUE */}
        <input
          className='w-full p-3 border rounded'
          placeholder='Lokasi Acara'
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />

        {/* TEMPLATE SELECT */}
        <select
          className='w-full p-3 border rounded'
          value={form.template}
          onChange={(e) => setForm({ ...form, template: e.target.value })}
        >
          <option value='template1'>Template 1</option>
          <option value='template2'>Template 2</option>
          <option value='template3'>Template 3</option>
        </select>

        {/* CUSTOM URL */}
        <input
          className='w-full p-3 border rounded'
          placeholder='Custom URL (opsional)'
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        {/* SLUG PREVIEW */}
        <p className='text-sm text-gray-600'>
          URL:{' '}
          {typeof window !== 'undefined' && (
            <span className='text-blue-600 font-medium'>
              {window.location.origin}/
              {generateSlug(form.slug || form.coupleNames)}
            </span>
          )}
        </p>

        {/* IMAGE UPLOAD */}
        <div className='space-y-2'>
          <p className='font-semibold'>Foto Galeri</p>

          <input
            type='file'
            multiple
            onChange={handleImageUpload}
          />

          <div className='grid grid-cols-3 gap-3'>
            {previewImages.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt='preview'
                width={150}
                height={150}
                className='rounded-lg object-cover'
              />
            ))}
          </div>
        </div>

        {/* MAP PICKER */}
        <div className='space-y-2'>
          <p className='font-semibold'>Lokasi Acara (Geser Peta)</p>
          <MapPicker
            position={position}
            setPosition={setPosition}
          />
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className='w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
        >
          Buat Undangan
        </button>
      </div>

      {/* RIGHT PREVIEW */}
      <div className='sticky top-10 h-[90vh] overflow-y-scroll border rounded-xl shadow-inner p-4 bg-white'>
        <p className='font-semibold mb-4 text-gray-700'>Preview Template</p>

        <TemplatePreview
          heroData={{
            coupleNames: form.coupleNames || 'Nama Pasangan',
            introText: form.introText || 'Intro akan tampil di sini',
            date: dateValue ? format(dateValue, 'dd MMMM yyyy') : 'Tanggal',
            time: form.time || 'Waktu',
            venue: form.venue || 'Lokasi Acara',
            mapLink: `https://www.google.com/maps?q=${position.lat},${position.lng}`,
          }}
          galleryImages={galleryImages}
          initialGuests={[]}
        />
      </div>
    </div>
  );
}
