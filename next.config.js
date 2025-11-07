/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',          // 🔸 disables server rendering globally
  trailingSlash: true
};

module.exports = nextConfig;
