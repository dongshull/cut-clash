<template>
    <div>
      <!-- 打开模态框按钮 -->
      <button class="btn menu-text fw-bold" @click="showModal = true">🖼️</button>
      <!-- 清除背景按钮 -->
      <button class="btn menu-text fw-bold" @click="clearBackground">清除背景</button>
  
      <!-- 模态框 -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" @click="showModal = false">×</span>
          </div>
          <div class="modal-body">
            <label>请输入背景图片的URL: </label>
            <input type="text" v-model="backgroundUrl" placeholder="背景图片URL" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="setBackground">设置背景</button>
            <button type="button" class="btn btn-primary" @click="showModal = false">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import eventBus from './eventBus.js';
  
  export default {
    data() {
      return {
        showModal: false, // 控制模态框的显示
        backgroundUrl: '', // 输入框中的背景图片 URL
      };
    },
    methods: {
      setBackground() {
        if (this.backgroundUrl.trim()) {
          // 设置背景并保存到 localStorage
          this.updateBackground(this.backgroundUrl);
          localStorage.setItem('backgroundUrl', this.backgroundUrl);
          this.showModal = false;
          this.backgroundUrl = '';
        } else {
          alert('请输入有效的图片URL');
        }
      },
      clearBackground() {
        // 清除 localStorage 中的背景 URL
        localStorage.removeItem('backgroundUrl');
        this.updateBackground('');
        alert('背景已恢复为默认');
      },
      updateBackground(url) {
        // 通过 eventBus 更新背景
        eventBus.emit('background-updated', url);
      }
    }
  };
  </script>
  
  <style scoped>
  /* 模态框样式 */
  .modal {
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  
  .modal-content {
    background: #fff;
    width: 100%;
    max-width: 320px;
    margin: auto;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header {
    display: flex;
    justify-content: flex-end;
    padding: 5px 15px;
  }
  
  .close {
    cursor: pointer;
    font-size: 24px;
    color: #ccc;
  }
  
  .modal-body {
    padding: 5px 15px;
  }
  
  .modal-body label {
    color: #000;
    font-size: 12px;
    display: block;
    margin-bottom: 5px;
  }
  
  .modal-body input[type=text] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .modal-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
  }
  
  .btn {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  