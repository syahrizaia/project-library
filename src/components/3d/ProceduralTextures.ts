import * as THREE from 'three';

// Cache generated textures so they are created only once in client memory
let leatherBumpTexture: THREE.CanvasTexture | null = null;
let pageEdgesTexture: THREE.CanvasTexture | null = null;
let goldEmbossTexture: THREE.CanvasTexture | null = null;

/**
 * Procedural Leather Grain Texture for Hardcover Book Bindings
 */
export function getLeatherTexture(): THREE.CanvasTexture {
  if (typeof window === 'undefined') {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }
  if (leatherBumpTexture) return leatherBumpTexture;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base tone
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);

    // Fine organic leather micro-grain
    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 35;
      data[i] = Math.min(255, Math.max(0, 128 + noise));
      data[i + 1] = Math.min(255, Math.max(0, 128 + noise));
      data[i + 2] = Math.min(255, Math.max(0, 128 + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    // Subtle cell boundaries (leather grain pores)
    ctx.strokeStyle = 'rgba(60, 60, 60, 0.12)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 8 + 3;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  leatherBumpTexture = texture;
  return leatherBumpTexture;
}

/**
 * Procedural Stacked Paper Edges Texture (simulating thousands of thin book leaves)
 */
export function getPageEdgesTexture(): THREE.CanvasTexture {
  if (typeof window === 'undefined') {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }
  if (pageEdgesTexture) return pageEdgesTexture;

  const width = 128;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Warm ivory base
    ctx.fillStyle = '#fcf9ea';
    ctx.fillRect(0, 0, width, height);

    // Dense horizontal page lines with varying tone
    for (let y = 0; y < height; y += 2) {
      const opacity = Math.random() * 0.25 + 0.1;
      ctx.strokeStyle = `rgba(180, 160, 130, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 12);
  pageEdgesTexture = texture;
  return pageEdgesTexture;
}

/**
 * Procedural Gold Foil Stamping Texture for Book Cover Accents & Title Borders
 */
export function getGoldEmbossTexture(): THREE.CanvasTexture {
  if (typeof window === 'undefined') {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }
  if (goldEmbossTexture) return goldEmbossTexture;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    // Elegant classical book border filigree in bright white for displacement/bump
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.strokeRect(32, 32, size - 64, size - 64);

    ctx.lineWidth = 2;
    ctx.strokeRect(44, 44, size - 88, size - 88);

    // Corner rosettes
    const corners = [
      [44, 44],
      [size - 44, 44],
      [44, size - 44],
      [size - 44, size - 44],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    // Center library insignia oval
    ctx.beginPath();
    ctx.ellipse(size / 2, size / 2, 80, 50, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  goldEmbossTexture = texture;
  return goldEmbossTexture;
}
