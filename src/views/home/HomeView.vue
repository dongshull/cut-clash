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
  background: url('/public/doraemon-desktop.png') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  border-radius: 0;
  padding-top: 2rem; /* 减少顶部间距 */
}

/* 为手机屏幕设置不同的背景图片 */
@media (max-width: 575.98px) {
  .landing-hero {
    background: url('/public/doraemon-mobile.png') no-repeat center center;
    background-size: cover;
  }
}

.transparent-background {
  background-color: transparent !important;
}

.hero-text-box {
  background: transparent;
  padding: 1.5rem 0; /* 减少内容区的上下内边距 */
}

.landing-hero .hero-animation-img {
  margin-bottom: 0;
  padding-top: 3rem; /* 减少顶部内边距 */
}

@media (max-width: 1199.98px) {
  .landing-hero .hero-animation-img {
    padding-top: 2.5rem; /* 调整小屏幕下的顶部内边距 */
  }
}

@media (max-width: 575.98px) {
  .landing-hero .hero-animation-img {
    padding-top: 2rem; /* 调整手机屏幕下的顶部内边距 */
  }
}

.landing-hero-blank {
  padding-top: 0;
  min-height: 0;
}
</style>
