<template>
  <section id="hero-animation">
    <div id="landingHero" class="section-py landing-hero position-relative">
      <div class="container">
        <div class="hero-text-box text-center transparent-background">
        </div>
        <SubTable />
      </div>
    </div>
    <div class="landing-hero-blank"></div>
  </section>
</template>

<script>
const SubTable = () => import('./SubTable.vue');

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

.transparent-background,
.hero-text-box {
  background-color: transparent;
}

.hero-text-box {
  padding: 2rem 0;
}

.hero-animation-img {
  padding-top: 5rem;
  margin-bottom: 0;
}

@media (max-width: 1199.98px) {
  .hero-animation-img {
    padding-top: 3rem;
  }
}

@media (max-width: 575.98px) {
  .hero-animation-img {
    padding-top: 2rem;
  }
}

.landing-hero-blank {
  padding-top: 0;
  min-height: 0;
}
</style>
