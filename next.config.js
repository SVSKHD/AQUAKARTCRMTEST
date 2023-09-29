const withFonts = require('next-fonts');
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack(config, options) {
    return config;
  },
}

module.exports = nextConfig
