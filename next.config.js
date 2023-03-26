/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// webpack: (config) => {
//   config.experiments = {
//     topLevelAwait: true,
//   }
//   return config
// }

module.exports = {
  experimental: { appDir: true },
  reactStrictMode: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}


// module.exports = nextConfig
