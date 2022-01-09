import { NODE_ENV } from 'process.env';

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
