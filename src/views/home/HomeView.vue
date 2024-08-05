<template>
  <section id="hero-animation">
    <div id="landingHero" class="section-py landing-hero position-relative" :style="{ backgroundImage: `url(${currentBackground})` }">
      <div class="container">
        <div class="hero-text-box text-center transparent-background">
          <!-- 可以在这里添加内容 -->
        </div>
        <div class="hero-animation-img">
          <SubTable />
        </div>
        <!-- 上传背景图片 -->
        <input type="file" @change="uploadBackground" class="bg-upload-input" accept="image/*" />
        <!-- 选择背景类型 -->
        <div class="background-type-selector">
          <label>
            <input type="radio" v-model="uploadType" value="large" checked />
            上传大屏幕背景
          </label>
          <label>
            <input type="radio" v-model="uploadType" value="small" />
            上传小屏幕背景
          </label>
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
  data() {
    return {
      currentBackground: '', // 当前背景图片路径
      largeScreenBackground: '/public/doraemon-large.png', // 大屏幕背景图片默认值
      smallScreenBackground: '/public/doraemon-small.png', // 小屏幕背景图片默认值
      uploadType: 'large', // 上传背景图片类型，默认上传大屏幕背景
    };
  },
  methods: {
    setBackground() {
      const isSmallScreen = window.innerWidth <= 576;
      this.currentBackground = isSmallScreen ? this.smallScreenBackground : this.largeScreenBackground;
    },
    uploadBackground(event) {
      // 上传背景图片，根据选定的类型处理大屏幕或小屏幕背景
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (this.uploadType === 'large') {
            this.largeScreenBackground = e.target.result;
          } else {
            this.smallScreenBackground = e.target.result;
          }
          this.setBackground(); // 更新背景图片
        };
        reader.readAsDataURL(file);
      }
    },
  },
  mounted() {
    this.setBackground(); // 初始化背景图片
    window.addEventListener('resize', this.setBackground); // 监听窗口大小变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setBackground);
  }
};
</script>

<style scoped>
.landing-hero {
  background-size: cover;
  min-height: 100vh;
  border-radius: 0;
  padding-top: 3rem; /* 适当增加顶部内边距，保持一定距离 */
}

/* 文件上传按钮样式 */
.bg-upload-input {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
  width: 120px; /* 增加按钮的点击区域 */
  height: 50px;
}

/* 背景类型选择器样式 */
.background-type-selector {
  position: absolute;
  top: 80px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
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
