/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(m4a|mp3|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]', // Nombre del archivo
          outputPath: 'assets/Numeros/', // Ruta de salida
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
