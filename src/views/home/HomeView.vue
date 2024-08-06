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
import eventBus from '../../layouts/main/navbar/eventBus.js';
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'SubconverterView',
  components: {
    SubTable,
  },
  setup() {
    const backgroundUrl = ref(localStorage.getItem('backgroundUrl') || '');

    const defaultDesktopBackgroundUrl = 'https://www.z4a.net/images/2024/08/07/doraemon-mobile.jpg'; // 默认桌面背景地址
    const defaultMobileBackgroundUrl = 'https://www.z4a.net/images/2024/08/07/doraemon-desktop.png'; // 默认移动端背景地址


    const isMobile = ref(false);
    // 检查当前屏幕宽度并更新 isMobile
    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 575.98;
    };


    // 在组件挂载时立即检查一次屏幕宽度
    onMounted(() => {
      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);
      // 使用事件总线的 on 方法来监听事件
      eventBus.on('background-updated', handleBackgroundUpdate);
    });
    onUnmounted(() => {
      window.removeEventListener('resize', updateIsMobile);
      // 使用事件总线的 off 方法来移除事件监听
      eventBus.off('background-updated', handleBackgroundUpdate);
    });
    
    // 动态计算和返回样式对象
    const styleObject = computed(() => {
      let backgroundImageUrl;
      if (backgroundUrl.value) {
        backgroundImageUrl = backgroundUrl.value;
      } else if (isMobile.value) {
        backgroundImageUrl = defaultMobileBackgroundUrl;
      } else {
        backgroundImageUrl = defaultDesktopBackgroundUrl;
      }

      return {
        background: `url('${backgroundImageUrl}') no-repeat center center / cover`
      };
    });
    
    const handleBackgroundUpdate = (url) => {
      backgroundUrl.value = url; // 更新背景图片URL
      localStorage.setItem('backgroundUrl', url); // 保存背景图片URL到本地存储
    };

    // 返回响应式属性以在模板中使用
    return {
      backgroundUrl,
      styleObject
    };
  }
 
  

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
