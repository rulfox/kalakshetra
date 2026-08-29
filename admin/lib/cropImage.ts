export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

/**
 * Extracts the cropped rect onto a canvas and exports it as a JPEG blob. Capped only at
 * maxDimension (default matches the largest width the site's <Image> srcSet ever requests),
 * so real photos are never downscaled below what the site would use at full size.
 */
export async function getCroppedImageBlob(
  imageSrc: string,
  cropPixels: PixelCrop,
  opts?: { maxDimension?: number; quality?: number },
): Promise<Blob> {
  const maxDimension = opts?.maxDimension ?? 3840;
  const quality = opts?.quality ?? 0.92;

  const image = await loadImage(imageSrc);

  const scale = Math.min(1, maxDimension / Math.max(cropPixels.width, cropPixels.height));
  const outWidth = Math.round(cropPixels.width * scale);
  const outHeight = Math.round(cropPixels.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = outWidth;
  canvas.height = outHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    outWidth,
    outHeight,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
      'image/jpeg',
      quality,
    );
  });
}
