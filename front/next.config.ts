
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['29.media.tumblr.com', '25.media.tumblr.com', '24.media.tumblr.com', '28.media.tumblr.com', '27.media.tumblr.com', '30.media.tumblr.com', '64.media.tumblr.com'], // Ajoute ici tous les domaines nécessaires
  },
};

module.exports = nextConfig;
