import autoprefixer from 'autoprefixer';

// postcss.config.js
import tailwindcss from '@tailwindcss/postcss';

export default {
  plugins: [tailwindcss(), autoprefixer()],
};
