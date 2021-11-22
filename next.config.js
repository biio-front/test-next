/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV !== 'production';
const rewritesConfig = isDevelopment
  ? [{ source: '/pokemon/:search', destination: 'https://pokeapi.co/api/v2/pokemon/:search' }]
  : [];

module.exports = {
  reactStrictMode: true,
  rewrites: async () => rewritesConfig,
};
