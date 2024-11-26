const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const path = require('path');

module.exports = defineConfig({
  publicPath: '/m/', // la ruta 
  productionSourceMap: false, // Desactiva los Source Maps en producción
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Alias para la carpeta 'src'
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false), // Inyecta el flag necesario
      }),
    ],
  },
  devServer: {
    allowedHosts: 'all', // Permitir todos los hosts
    client: {
      webSocketURL: 'wss://localhost:8080/ws', // Cambia el URL si es necesario
    },
  },
});
