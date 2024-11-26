// src/main.js
import { createApp, nextTick } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el router

// Importar estilos
import './assets/vendor/normalize/normalize.min.css';  // Importa el archivo CSS
import './assets/fonts/fonts.css';  // Importa el archivo CSS
import './assets/css/helper.css';  // Importa el archivo CSS
import './assets/css/theme.css';    // Importa el archivo CSS
import './assets/css/styles.css';    // Importa el archivo CSS


// Crea la instancia de la app
const app = createApp(App);


// Utiliza el router
app.use(router); // Esto agrega el router a la aplicación

// Monta la aplicación
app.mount('#app');

// Inicializa animaciones y scripts después de que el componente esté montado
nextTick(() => {
      // initTextAnimations();
//   initScripts();
});

