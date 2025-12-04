'use client';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Pause, Play } from 'lucide-react';
import CoverSection from './coverSection';
import HeroSection from './heroSection';
import GallerySection from './gallerySection';
import GuestbookSection from './guestBookSection';
import FooterSection from './footerSection';
import AnimatedCorners from './animateCorner';

interface Guest {
  name: string;
  message: string;
}

interface GalleryImage {
  src: string;
  description: string;
}

interface HeroData {
  coupleNames: string;
  introText: string;
  date: string;
  time: string;
  venue: string;
  mapLink: string;
}

interface Template1Props {
  guestName: string;

  heroData?: HeroData;
  galleryImages?: GalleryImage[];
  initialGuests?: Guest[];
}

export default function Template1({
  guestName = 'Bapak Ahmad & Pasangan',
  heroData = {
    coupleNames: 'Sarah & Dimas',
    introText: 'Dengan memohon rahmat dan ridho Allah SWT',
    date: 'Sabtu, 10 Juni 2026',
    time: '10.00 WIB – Selesai',
    venue: 'Gedung Harmoni, Jakarta',
    mapLink: 'https://maps.google.com',
  },
  galleryImages = [
    {
      src: 'https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE1MC9hc3NldHMvaW1hZ2VzL2JhY2tncm91bmQtMi53ZWJw.webp',
      description: 'Deskripsi gambar 1',
    },
    {
      src: 'https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE1MC9hc3NldHMvaW1hZ2VzL2JhY2tncm91bmQtMi53ZWJw.webp',
      description: 'Deskripsi gambar 2',
    },
    {
      src: 'https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE1MC9hc3NldHMvaW1hZ2VzL2JhY2tncm91bmQtMi53ZWJw.webp',
      description: 'Deskripsi gambar 3',
    },
  ],
  initialGuests = [],
}: Template1Props) {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);

  const toggleMusic = () => setIsPlaying(!isPlaying);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  if (!open)
    return (
      <CoverSection
        bannerVariants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }}
        onOpen={setOpen}
        guestName={guestName}
      />
    );

  return (
    <div className='relative w-full min-h-screen bg-gradient-to-b from-[#fff8f0] to-[#fff0e0] flex flex-col items-center text-center px-4 overflow-x-hidden font-sans'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-[#C6BAAB] overflow-y-scroll'
        style={{
          backgroundImage:
            "url('https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2JnLTEucG5n.webp')",
        }}
      >
        {/* Music Player */}
        <ReactPlayer
          src='https://www.youtube.com/watch?v=qrjSLC-5Nc0'
          playing={isPlaying}
          loop
          volume={0.5}
          style={{ display: 'none' }}
        />

        {/* Bunga animasi */}
        <AnimatedCorners />

        {/* Toggle Music */}
        <button
          onClick={toggleMusic}
          className='fixed top-38 right-10 cursor-pointer bg-white rounded-full p-3 shadow-lg z-50 hover:scale-110 transition-all'
          aria-label='Toggle Music'
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

        {/* Hero Section */}
        <HeroSection
          fadeUp={fadeUp}
          heroData={heroData}
        />

        {/* Gallery Section */}
        <GallerySection
          galleryImages={galleryImages}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />

        {/* Guestbook Section */}
        <GuestbookSection
          guests={guests}
          setGuests={setGuests}
        />

        {/* Footer Section */}
        <FooterSection fadeUp={fadeUp} />
      </div>
    </div>
  );
}
