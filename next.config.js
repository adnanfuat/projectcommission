/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{appDir: true},
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['https://lh3.googleusercontent.com'],
  },
  webpack: function (config, {buildId}) {


    config.module.rules.push({
      test: /\.(mp3||wav)$/,  //eot|woff|woff2|ttf|svg|png|jpg|gif|
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });
    return config;
  }

}

module.exports = nextConfig


