/** @type {import('next').NextConfig} */

// const NEXT_PUBLIC_API_PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL;
// const NEXT_PUBLIC_API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME;
// const NEXT_PUBLIC_API_PORT = process.env.NEXT_PUBLIC_API_PORT;

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
