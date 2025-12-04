'use client';

import { motion } from 'framer-motion';

const CoverSection = ({
  bannerVariants,
  onOpen,
  guestName,
  Titlename,
}: {
  bannerVariants: any;
  onOpen: any;
  guestName?: string; // tambahkan optional prop
  Titlename: string;
}) => {
  return (
    <>
      <div className='relative w-full h-screen overflow-hidden'>
        {/* Background utama */}
        <div
          className='absolute inset-0 bg-cover bg-center bg-[#C6BAAB]'
          style={{
            backgroundImage:
              "url('https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2JnLTEucG5n.webp')",
          }}
        ></div>

        {/* Gebyok atas: masuk dari atas */}
        <motion.img
          src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2dlYnlvay11cHBlci5wbmc.webp'
          alt='gebyok atas'
          className='absolute -top-[1rem] left-0 w-full h-[80px] pointer-events-none select-none z-10'
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Gebyok bawah: masuk dari bawah */}
        <motion.img
          src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2dlYnlvay11cHBlci5wbmc.webp'
          alt='gebyok bawah'
          className='absolute -bottom-[1rem] left-0 w-full h-[80px] pointer-events-none select-none z-10'
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        <motion.img
          src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2ZyYW1lLnBuZw.webp'
          className='absolute -top-[65px] -left-5 w-[50%] lg:w-[20%] lg:h-[50%] pointer-events-none select-none z-10'
          alt='frame kiri'
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Frame kanan: masuk dari kanan ke kiri */}
        <motion.img
          src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2ZyYW1lLnBuZw.webp'
          className='absolute -top-[65px] -right-5 w-[50%] lg:w-[20%] lg:h-[50%] scale-x-[-1] pointer-events-none select-none z-10'
          alt='frame kanan'
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Pohon Kiri (tambahkan motion) */}
        <motion.img
          src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL3RyZWUucG5n.webp'
          className='absolute w-[432px] h-[540px] bottom-40 -left-40 pointer-events-none select-none z-10'
          alt='tree-left'
          animate={{
            x: [-12, 12, -12], // goyang kiri-kanan
            y: [0, -6, 0], // sedikit naik turun untuk efek *lambai*
          }}
          transition={{
            duration: 6, // sedikit lebih lambat biar natural
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Pohon Kanan (sudah benar, hanya tambahkan sedikit y agar match kiri) */}
        <motion.img
          src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL3RyZWUucG5n.webp'
          className='absolute w-[432px] h-[540px] bottom-40 -right-40 pointer-events-none select-none z-10'
          alt='tree-right'
          animate={{
            x: [-15, 15, -15],
            y: [0, -6, 0], // sama gerakan naik turun
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div>
          <motion.img
            src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci0xLnBuZw.webp'
            className='absolute h-[188px] w-[144px] bottom-20 pointer-events-none select-none z-10'
            alt='flower-wind'
            animate={{
              x: [-6, 6, -6], // goyangan angin kecil
              y: [0, -8, 0], // melayang naik turun lembut
              rotate: [-4, 4, -4], // goyangan kelopak
            }}
            transition={{
              duration: 5.5, // lebih cepat dari pohon, biar ringan
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.img
            src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci0yLnBuZw.webp'
            className='absolute h-[259px] w-[430px] -left-20 -bottom-30 pointer-events-none select-none z-10'
            alt='flower-wind'
            animate={{
              x: [-6, 6, -6], // goyangan angin kecil
              y: [0, -8, 0], // melayang naik turun lembut
              rotate: [-4, 4, -4], // goyangan kelopak
            }}
            transition={{
              duration: 5.5, // lebih cepat dari pohon, biar ringan
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.img
            src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci0zLnBuZw.webp'
            className='absolute w-[156px] h-[326px] left-70 -bottom-50 pointer-events-none select-none z-10'
            alt='flower-wind'
            animate={{
              x: [-6, 6, -6], // goyangan angin kecil
              y: [0, -8, 0], // melayang naik turun lembut
              rotate: [-4, 4, -4], // goyangan kelopak
            }}
            transition={{
              duration: 5.5, // lebih cepat dari pohon, biar ringan
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.img
            src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci01LnBuZw.webp'
            className='absolute w-[156px] h-[326px] -left-10 -bottom-40 pointer-events-none select-none z-10'
            alt='flower-wind-right'
            animate={{
              x: [6, -6, 6],
              y: [0, -8, 0],
              rotate: [4, -4, 4], // mirror
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div>
          {/* Bunga kanan 1 */}
          <motion.img
            src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci0xLnBuZw.webp'
            className='absolute h-[188px] w-[144px] bottom-20 right-0 pointer-events-none select-none z-10'
            alt='flower-wind-right'
            animate={{
              x: [6, -6, 6], // arah kebalikan kiri
              y: [0, -8, 0],
              rotate: [4, -4, 4], // mirror rotation → menghadap ke dalam
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Bunga kanan 2 */}
          <motion.img
            src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci0yLnBuZw.webp'
            className='absolute h-[259px] w-[430px] -right-20 -bottom-30 pointer-events-none select-none z-10'
            alt='flower-wind-right'
            animate={{
              x: [6, -6, 6],
              y: [0, -8, 0],
              rotate: [4, -4, 4], // mirror
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Bunga kanan 3 */}
          <motion.img
            src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci0zLnBuZw.webp'
            className='absolute w-[156px] h-[326px] right-60 -bottom-50 pointer-events-none select-none z-10'
            alt='flower-wind-right'
            animate={{
              x: [6, -6, 6],
              y: [0, -8, 0],
              rotate: [4, -4, 4], // mirror
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.img
            src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci01LnBuZw.webp'
            className='absolute w-[156px] h-[326px] -right-10 -bottom-40 pointer-events-none select-none z-10'
            alt='flower-wind-right'
            animate={{
              x: [6, -6, 6],
              y: [0, -8, 0],
              rotate: [4, -4, 4], // mirror
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Konten Tengah */}
        <div className='relative w-full h-screen bg-cover bg-center'>
          <div className='absolute inset-0 bg-black/40'></div>
          <div className='relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4'>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={bannerVariants}
            >
              <h1 className='text-4xl font-bold mb-4'>Undangan Pernikahan</h1>

              {guestName && (
                <p className='mb-2 text-xl'>
                  Untuk: <strong>{guestName}</strong>
                </p>
              )}

              <p className='mb-6 text-2xl'>{Titlename}</p>

              <motion.button
                className='px-6 py-3 bg-white cursor-pointer text-[#b88f5f] rounded-lg font-semibold hover:bg-gray-100 transition'
                whileHover={{ scale: 1.05 }}
                onClick={() => onOpen(true)}
              >
                Buka Undangan
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverSection;
