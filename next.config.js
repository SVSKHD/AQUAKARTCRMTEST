const withFonts = require('next-fonts');
const nextConfig = {
  basePath:"/admin/crm",
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack(config, options) {
    return config;
  },
}

module.exports = nextConfig
