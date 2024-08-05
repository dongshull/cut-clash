<template>
  <section id="hero-animation">
    <div id="landingHero" class="section-py landing-hero position-relative">
      <div class="container">
        <div class="hero-text-box text-center transparent-background">
        </div>
        <div class="hero-animation-img">
          <SubTable />
        </div>
      </div>
    </div>
    <div class="landing-hero-blank"></div>
  </section>
</template>

<script>
import SubTable from './SubTable.vue';

export default {
  name: 'SubconverterView',
  components: {
    SubTable,
  },
};
</script>

<style scoped>
/* 大屏幕背景 - 桌面设备 */
.landing-hero {
  background: url('/public/doraemon-large.png') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  border-radius: 0;
  padding-top: 3rem;
}

/* 中等屏幕背景 */
@media (max-width: 1199.98px) {
  .landing-hero {
    background: url('/public/doraemon-medium.png') no-repeat center center;
    background-size: cover;
    padding-top: 3rem;
  }
}

/* 手机竖屏（小屏幕）背景 */
@media (max-device-width: 575.98px) and (orientation: portrait) {
  .landing-hero {
    background: url('/public/doraemon-small-portrait.png') no-repeat center center;
    background-size: cover;
    padding-top: 2rem;
  }
}

/* 手机横屏（小屏幕）背景 */
@media (max-device-width: 575.98px) and (orientation: landscape) {
  .landing-hero {
    background: url('/public/doraemon-small-landscape.png') no-repeat center center;
    background-size: cover;
    padding-top: 2rem;
  }
}

.transparent-background {
  background-color: transparent !important;
}

.hero-text-box {
  background: transparent;
  padding: 2rem 0;
}

.landing-hero .hero-animation-img {
  margin-bottom: 0;
  padding-top: 4rem;
}

.landing-hero-blank {
  padding-top: 0;
  min-height: 0;
}
</style>
