/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    console.log({
      webpackVersion: webpack.version,
      dev,
      isServer,
      nextRuntime,
    });
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/}))
    return config;
  },
};

module.exports = nextConfig;
