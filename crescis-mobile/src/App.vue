<template>
    <main id="body-inner">
      
			<div id="page-transition">
				<div class="ptr-overlay"></div>
          <div class="ptr-preloader">
            <div class="ptr-prel-content">
              <div class="loader loader--animate">
                  <div class="loader__inner">
                      <div class="loader__wrap">
                        <div class="loader__box">
                          <div>C</div>
                          <div>R<span><svg class="simbol-l" width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.87127 0H0.410131C0.183625 0 0 0.188073 0 0.420072V15.5427C0 15.7747 0.183625 15.9628 0.410131 15.9628H5.87127C6.09778 15.9628 6.2814 15.7747 6.2814 15.5427V0.420072C6.2814 0.188073 6.09778 0 5.87127 0Z" fill="white"/></svg></span></div>
                          <div>S<svg class="simbol-l simbol-l2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.01659 0C13.8895 0 18 3.85952 18 8.95009C18 14.0407 13.9227 18 9.01659 18C4.11051 18 0 14.1405 0 8.95009C0 3.7597 4.11051 0 9.01659 0V0ZM9.01659 16.6359C13.1602 16.6359 16.3757 13.3087 16.3757 8.91682C16.3757 4.52495 13.1602 1.2976 9.01659 1.2976C4.87294 1.2976 1.62433 4.62477 1.62433 8.91682C1.62433 13.2089 4.80664 16.6359 9.01659 16.6359ZM5.53591 3.69316H9.58012C12.0663 3.69316 13.2266 4.69131 13.2266 6.68762C13.2266 8.5841 12.0332 9.38263 10.4752 9.54898L13.4586 14.1738H11.7017L8.85083 9.6488H7.12706V14.1738H5.50278V3.72643L5.53591 3.69316ZM7.16024 8.3512H8.85083C10.2763 8.3512 11.6022 8.28466 11.6022 6.62107C11.6022 5.22366 10.4088 5.02403 9.31492 5.02403H7.16024V8.3512Z" fill="white"/></svg></div>
                          <div>C</div>
                          <div>S<svg class="simbol-l simbol-l2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.01659 0C13.8895 0 18 3.85952 18 8.95009C18 14.0407 13.9227 18 9.01659 18C4.11051 18 0 14.1405 0 8.95009C0 3.7597 4.11051 0 9.01659 0V0ZM9.01659 16.6359C13.1602 16.6359 16.3757 13.3087 16.3757 8.91682C16.3757 4.52495 13.1602 1.2976 9.01659 1.2976C4.87294 1.2976 1.62433 4.62477 1.62433 8.91682C1.62433 13.2089 4.80664 16.6359 9.01659 16.6359ZM5.53591 3.69316H9.58012C12.0663 3.69316 13.2266 4.69131 13.2266 6.68762C13.2266 8.5841 12.0332 9.38263 10.4752 9.54898L13.4586 14.1738H11.7017L8.85083 9.6488H7.12706V14.1738H5.50278V3.72643L5.53591 3.69316ZM7.16024 8.3512H8.85083C10.2763 8.3512 11.6022 8.28466 11.6022 6.62107C11.6022 5.22366 10.4088 5.02403 9.31492 5.02403H7.16024V8.3512Z" fill="white"/></svg></div>
                          <div>R<span><svg class="simbol-l" width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.87127 0H0.410131C0.183625 0 0 0.188073 0 0.420072V15.5427C0 15.7747 0.183625 15.9628 0.410131 15.9628H5.87127C6.09778 15.9628 6.2814 15.7747 6.2814 15.5427V0.420072C6.2814 0.188073 6.09778 0 5.87127 0Z" fill="white"/></svg></span></div>
                        </div>
                      </div>
                      <span class="loader__title"><img data-src="assets/logo-light.svg" alt="Cresci's"></span>
                  </div>
              </div>
          </div>
        </div>
      </div> 


      <AppHeader />

      
      <!-- Wrap -->
      <div id="content-wrap"> 
        <router-view /> <!-- Comentar o reemplazar -->
        <AppFooter/>
      </div>
      <!-- End content wrap -->
    </main>
</template>

<script>
import { redirectResolution, initUrlAssets } from './assets/js/urlAssets.js';
import AppHeader from './components/AppHeader.vue';  
import AppFooter from './components/AppFooter.vue';  

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  mounted() {
    redirectResolution(); 
    initUrlAssets(); 
  },
  watch: {
    '$route' (to, from) {
      console.log('Ruta cambiada de', from, 'a', to);
    }
  },
};
</script>

<style scoped>
</style>
