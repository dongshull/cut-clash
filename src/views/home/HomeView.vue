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
/* 大屏幕（宽度大于1200px） */
.landing-hero {
  background: url('/public/doraemon-large.png') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  border-radius: 0;
  padding-top: 3rem;
}

/* 中等屏幕（宽度介于576px到1200px之间） */
@media (max-width: 1199.98px) {
  .landing-hero {
    background: url('/public/doraemon-medium.png') no-repeat center center;
    background-size: cover;
    min-height: 100vh;
    padding-top: 3rem;
  }
}

/* 小屏幕（宽度小于576px） */
@media (max-width: 575.98px) {
  .landing-hero {
    background: url('/public/doraemon-small.png') no-repeat center center;
    background-size: cover;
    min-height: 100vh;
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
