/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
