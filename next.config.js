/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV !== 'production';
const rewritesConfig = isDevelopment
  ? [
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/:path*',
        destination: 'https://pokeapi.co/api/v2/:path*',
      },
    ]
  : [];

module.exports = {
  reactStrictMode: true,
  rewrites: async () => rewritesConfig,
};
