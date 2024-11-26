<template>
    <!-- header -->
    <header id="cs-header" class="cs-header-fixed jwpnavbar">
        <div class="cs-header-inner">
            <div class="cs-header-col">
                <!-- logo -->
                <div class="cs-logo"> 
                    <a href="/">
                        <!-- Logo blanco -->
                        <div class="magnetic-wrap">
                            <img id="logo-white" data-src="assets/logo-light.svg" class="cs-logo-white magnetic-item" alt="Cresci's" style="display: none;">
                        </div>
                        <!-- Logo oscuro -->
                        <div class="magnetic-wrap">
                            <img id="logo-dark" data-src="assets/logo-dark.svg" class="cs-logo-dark magnetic-item" alt="Cresci's" style="display: none;">
                        </div>
                    </a>
                </div>
                <!-- End logo -->
            </div>
  
            <div class="cs-header-col">
                <!-- Begin overlay menu toggle button -->
                <div id="cs-ol-menu-toggle-btn-wrap">
                    <div class="cs-ol-menu-toggle-btn-text">
                        <span class="text-menu" data-hover="Open">Menu</span>
                        <span class="text-close">Close</span>
                    </div>
                    <div class="cs-ol-menu-toggle-btn-holder">
                        <a href="#" class="cs-ol-menu-toggle-btn magnetic-item"><span></span></a>
                    </div>
                </div>
                <!-- End overlay menu toggle button -->
  
                <!-- Begin overlay menu -->
                <nav class="cs-overlay-menu cs-ol-menu-center cs-ol-menu-count">
                    <div class="cs-ol-menu-holder">
                        <div class="cs-ol-menu-inner cs-wrap">
                            <div class="cs-ol-menu-content">
                                <!-- Begin menu list -->
                                <ul class="cs-ol-menu-list">
                                    <li><a href="/" class="cs-link border-orange">Home</a></li> 
                                    <li><a href="/projects" class="cs-link border-orange">Projects</a></li>
                                    <li><a href="/expertise" class="cs-link border-orange">Expertise</a></li>
                                </ul>
                                <!-- End menu list -->
                            </div>
                        </div>
                    </div>
  
                    <ul class="cs-ol-menu-contact">
                        <li><small class="text-white no-margin">Let´s Talk</small></li>
                        <li><a href="mailto:jobs@cresci.co" class="link-contact text-white cs-link">info@cresci.co</a></li>
                    </ul>
                </nav> 
                <!-- End overlay menu -->
            </div>
        </div>
    </header>
    <!-- End header -->
  </template>
  

  <script setup>
    import { onMounted } from 'vue'; // Importa onMounted desde Vue
    import { menuSite, navbarFix } from '../assets/js/navbarApp.js';

    onMounted(() => {
        menuSite();
        navbarFix();
    });
  </script>

z
  
  <style scoped>
  /* Agrega tus estilos personalizados aquí */
  </style>
  