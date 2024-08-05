<template>
  <section id="hero-animation">
    <div id="landingHero" class="section-py landing-hero position-relative">
      <div class="container">
        <div class="hero-text-box text-center transparent-background">
          <!-- 可以在这里添加内容 -->
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
.landing-hero {
  background: url('/public/doraemon.png') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  border-radius: 0;
  padding-top: 3rem; /* 适当增加顶部内边距，保持一定距离 */
}

.transparent-background {
  background-color: transparent !important;
}

.hero-text-box {
  background: transparent;
  padding: 2rem 0; /* 设置内部内容的上下内边距，保持一定距离 */
}

.landing-hero .hero-animation-img {
  margin-bottom: 0;
  padding-top: 4rem; /* 适度减少顶部内边距 */
}

@media (max-width: 1199.98px) {
  .landing-hero .hero-animation-img {
    padding-top: 3rem; /* 在较小屏幕上保持合适的距离 */
  }
}

@media (max-width: 575.98px) {
  .landing-hero .hero-animation-img {
    padding-top: 2rem; /* 在手机屏幕上保持适当的距离 */
  }
}

.landing-hero-blank {
  padding-top: 0;
  min-height: 0;
}
</style>
