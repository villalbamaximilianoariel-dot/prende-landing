import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

interface ImageCarouselProps {
  images: string[];
  altPrefix?: string;
}

export default function ImageCarousel({ images, altPrefix = 'Imagen' }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, boxShadow: '0 8px 32px rgba(255, 235, 93, 0.2)' }}>
      {images.map((img, index) => (
        <Box
          key={index}
          component="img"
          src={img}
          alt={`${altPrefix} ${index + 1}`}
          sx={{
            width: '100%',
            height: { xs: 250, md: 400 },
            objectFit: 'cover',
            position: index === 0 ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            opacity: current === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            component="button"
            onClick={() => setCurrent(index)}
            aria-label={`${altPrefix} ${index + 1}`}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: current === index ? '#FFEB5D' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              border: 'none',
              p: 0,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
