<template>
  <nav class="layout-navbar shadow-none py-0" :class="navStyles">
    <div class="container">
      <div class="navbar navbar-expand-lg landing-navbar px-3 px-md-4">
        <AppBrand />
        <NavMenu />
        <Background />
      </div>
    </div>
  </nav>
</template>

<script>
import AppBrand from './AppBrand.vue';
import NavMenu from './NavMenu.vue';
import Background from './Background.vue';

export default {
  name: 'NavBar',
  components: {
    AppBrand,
    NavMenu,
    Background,
  },
  computed: {
    navStyles() {
      // 首页滚动 nav 透明度样式
      return [...this.$store.state.style.main.navStyles].join(' ');
    },
  },
};
</script>
