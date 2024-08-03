<template>
  <section id="hero-animation">
    <div id="landingHero" class="section-py landing-hero position-relative">
      <div class="container">
        <div class="hero-text-box text-center">
          <h1 class="text-primary display-6 fw-bold">订阅转换</h1>
        </div>
        <div class="hero-animation-img">
          <SubTable />
        </div>
      </div>
    </div>
    <!-- 移除了底部黑色条幅 -->
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
.light-style .landing-hero {
  background: url('/public/doraemon-image.jpeg') no-repeat center center;
  background-size: cover;
}

.landing-hero .hero-animation-img {
  margin-bottom: -24rem;
}

@media (max-width: 1199.98px) {
  .landing-hero .hero-animation-img {
    margin-bottom: -18rem;
  }
}

@media (max-width: 575.98px) {
  .landing-hero .hero-animation-img {
    margin-bottom: -10rem;
  }
}

/* 去除可能导致黑色条幅的样式 */
.landing-hero-blank {
  display: none;
  padding-top: 0;
}
</style>
