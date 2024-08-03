<template>
  <section id="hero-animation">
    <div id="landingHero" class="section-py landing-hero position-relative">
      <div class="container">
        <div class="hero-text-box text-center">
          <h1 class="text-primary display-6 fw-bold">订阅转换</h1>
        </div>
        <div class="hero-animation-img">
          <div class="glass-effect">
            <SubTable />
          </div>
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
  background: url('/public/doraemon-image.jpeg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.landing-hero .hero-animation-img {
  margin-bottom: 0;
  padding-top: 5rem;
}

@media (max-width: 1199.98px) {
  .landing-hero .hero-animation-img {
    padding-top: 3rem;
  }
}

@media (max-width: 575.98px) {
  .landing-hero .hero-animation-img {
    padding-top: 2rem;
  }
}

.landing-hero-blank {
  padding-top: 0;
  min-height: 0;
}
</style>
