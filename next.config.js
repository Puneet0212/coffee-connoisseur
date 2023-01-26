/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"],
  },

};

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         port: '3000',
//         pathname: '/coffee-store/${coffeeStore.id}',
//       },
//     ],
//   },
// }

module.exports = nextConfig
