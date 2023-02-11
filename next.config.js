/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "storage.googleapis.com",
      "toeicexamstore.com",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
