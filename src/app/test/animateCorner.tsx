'use client';
import { motion } from 'framer-motion';

export default function FlowersAnimation() {
  // Bunga pojok (corners)
  const corners = [
    { style: { top: '20px', left: '20px' }, rotation: 0 },
    { style: { top: '20px', right: '20px' }, rotation: -150 },
    { style: { bottom: '20px', left: '20px' }, rotation: -90 },
    { style: { bottom: '20px', right: '20px' }, rotation: 180 },
  ];

  // Bunga hujan
  const fallingFlowers = [
    { left: '10%', duration: 10, delay: 0 },
    { left: '30%', duration: 12, delay: 2 },
    { left: '50%', duration: 14, delay: 4 },
    { left: '70%', duration: 11, delay: 1 },
    { left: '85%', duration: 13, delay: 3 },
  ];

  return (
    <>
      {/* Bunga Pojok */}
      {corners.map((corner, index) => (
        <motion.img
          key={`corner-${index}`}
          src='https://png.pngtree.com/png-clipart/20230312/ourmid/pngtree-transparent-watercolor-flowers-png-image_6646331.png'
          alt={`corner-flower ${index + 1}`}
          style={{
            position: 'fixed',
            width: '100px',
            height: 'auto',
            zIndex: 1000,
            ...corner.style,
          }}
          initial={{ rotate: corner.rotation }}
          animate={{
            y: [0, -8, 0, 8, 0],
            rotate: [
              corner.rotation,
              corner.rotation + 5,
              corner.rotation - 5,
              corner.rotation + 5,
              corner.rotation,
            ],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Bunga Hujan */}
      {fallingFlowers.map((flower, index) => (
        <motion.img
          key={`falling-${index}`}
          src='https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly90aGVtZXMudmlkaW5nLmNvL3RoZW1lXzE2Ny9hc3NldHMvaW1hZ2VzL2Zsb3dlci01LnBuZw.webp'
          alt={`falling-flower ${index + 1}`}
          style={{
            position: 'fixed',
            top: '-100px',
            left: flower.left,
            width: '30px',
            zIndex: 999,
          }}
          animate={{ y: ['-100px', '100vh'] }}
          transition={{
            duration: flower.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: flower.delay,
          }}
        />
      ))}
    </>
  );
}
