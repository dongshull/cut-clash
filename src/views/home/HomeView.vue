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
.landing-hero {
  background: url('/public/doraemon-image.jpeg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  border-radius: 0;
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
