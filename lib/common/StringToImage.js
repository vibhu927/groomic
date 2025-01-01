'use client'

const createNeonInitialsImage = (inputString, width = 500, height = 500, fontSize = 200) => {
  if (typeof window === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const initials = inputString
    .split(' ')
    .map(word => word[0]?.toUpperCase())
    .join('');

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'pink');
  gradient.addColorStop(0.5, 'purple');
  gradient.addColorStop(1, 'blue');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.shadowColor = 'cyan';
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'white';
  ctx.fillText(initials, width / 2, height / 2);

  return canvas.toDataURL('image/png');
};

export default createNeonInitialsImage;