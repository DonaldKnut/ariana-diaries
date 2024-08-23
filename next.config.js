/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");
const { config } = require("dotenv");

config(); // Load environment variables from .env file

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "eu.ui-avatars.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.hbs$/,
      loader: "handlebars-loader",
    });
    return config;
  },
};

module.exports = withVideos(nextConfig);
