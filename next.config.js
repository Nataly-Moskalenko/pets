/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn2.thecatapi.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: '28.media.tumblr.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn1.theimageapi.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
    ],
  },
};

module.exports = nextConfig;
