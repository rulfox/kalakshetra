/** @type {import('next').NextConfig} */
const s3Hostname = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_URL || '').hostname;
  } catch {
    return null;
  }
})();

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      // Real product/lookbook photos, once uploaded, live on the S3 bucket (or its CloudFront
      // domain) configured via NEXT_PUBLIC_S3_PUBLIC_BASE_URL.
      ...(s3Hostname ? [{ protocol: 'https', hostname: s3Hostname }] : []),
    ],
  },
};

module.exports = nextConfig;
