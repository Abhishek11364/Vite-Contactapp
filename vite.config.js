// vite.config.js
export default {
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      input: {
        main: './src/index.js',
      },
    },
  },
};
