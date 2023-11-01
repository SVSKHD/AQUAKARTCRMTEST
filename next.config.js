const nextConfig = {
  basePath: "/admin/crm",
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    db:"mongodb+srv://Aqua:aqua@aqua.7xpb5.mongodb.net/aquaecom?retryWrites=true&w=majority",
    apiKey: "http://localhost:4000/admin/crm/api"
  }
}

module.exports = nextConfig
