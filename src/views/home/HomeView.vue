<template>
  <section id="hero-animation">
    <div id="landingHero" class="section-py landing-hero position-relative" :style="styleObject">
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
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'SubconverterView',
  components: {
    SubTable,
  },
  setup() {
    // 获取 config.js 中的背景图片 URL
    const desktopBackgroundUrl = window.config?.backgrounds?.desktop || require('../../assets/img/front-pages/backgrounds/doraemon-desktop.png');
    const mobileBackgroundUrl = window.config?.backgrounds?.mobile || require('../../assets/img/front-pages/backgrounds/doraemon-mobile.png');

    // 获取 localStorage 中的背景 URL
    const backgroundUrl = ref(localStorage.getItem('backgroundUrl') || '');

    const isMobile = ref(false);

    // 检查是否为移动设备
    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 575.98;
    };

    onMounted(() => {
      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateIsMobile);
    });

    // 动态计算样式，根据 localStorage、config.js 和设备类型选择背景图片
    const styleObject = computed(() => {
      let backgroundImageUrl;

      if (backgroundUrl.value) {
        // 使用 localStorage 中的背景图片
        backgroundImageUrl = backgroundUrl.value;
      } else if (isMobile.value) {
        // 使用 config.js 中或本地的移动端背景图片
        backgroundImageUrl = mobileBackgroundUrl;
      } else {
        // 使用 config.js 中或本地的桌面端背景图片
        backgroundImageUrl = desktopBackgroundUrl;
      }

      return {
        background: `url('${backgroundImageUrl}') no-repeat center center / cover`
      };
    });

    return {
      styleObject,
    };
  },
};
</script>

<style scoped>
.landing-hero {
  background-size: cover;
  min-height: 100vh;
  border-radius: 0;
  padding-top: 2rem; /* 减少顶部间距 */
}

/* 为手机屏幕设置不同的背景图片 */
@media (max-width: 575.98px) {
  .landing-hero {
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
