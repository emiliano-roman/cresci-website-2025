<template>
<!-- header -->
<header id="cs-header" class="cs-header-fixed jwpnavbar">
    <div class="cs-header-inner">

        <div class="cs-header-col">

            <!-- logo -->
            <div class="cs-logo"> 
                <a href="/m/">
                    <!-- Logo blanco -->
                    <div class="magnetic-wrap">
                        <img id="logo-white" :src="require('@/assets/img/logo-white-xxl.svg')" class="cs-logo-white magnetic-item" alt="Cresci's" style="display: none;">
                    </div>
                    <!-- Logo oscuro -->
                    <div class="magnetic-wrap">
                        <img id="logo-dark" :src="require('@/assets/img/logo-dark.svg')" class="cs-logo-dark magnetic-item" alt="Cresci's" style="display: none;">
                    </div>
                </a>
            </div>
            <!-- End logo -->

        </div> <!-- /.cs-header-col -->

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
                                <li><a href="/m/" class="cs-link">Home</a></li> 
                                <li><a href="/m/projects" class="cs-link">Projects</a></li>
                                <li><a href="/m/expertise" class="cs-link">Expertise</a></li>
                            </ul>
                            <!-- End menu list -->

                        </div> <!-- /.cs-ol-menu-content -->
                    </div> <!-- /.cs-ol-menu-inner -->
                </div> <!-- /.cs-ol-menu-holder -->

                <ul class="cs-ol-menu-contact">
                    <li><small class="text-white no-margin">Let´s Talk</small></li>
                    <li><a href="mailto:info@cresci.co" class="link-contact text-white cs-link">info@cresci.co</a></li>
                </ul>
            </nav> 
            <!-- End overlay menu -->

        </div> <!-- /.header-col -->
    </div> <!-- /.header-inner -->
</header>
<!-- End header -->
</template>



<script>
export default {
  name: 'AppHeader', // Cambiado aquí
};
</script>



<style scoped>

</style>