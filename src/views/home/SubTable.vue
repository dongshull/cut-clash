<template>
  <div class="doraemon-container">
    <div class="doraemon-header">
      <label for="add-user-email">订阅链接</label>
      <textarea 
        class="doraemon-textarea" 
        v-model.trim="urls" 
        :placeholder="placeholder" 
        rows="3">
      </textarea>
    </div>
    <div class="doraemon-controls">
      <div class="control-group">
        <label for="client">客户端</label>
        <select class="doraemon-select" id="client" v-model="target">
          <option v-for="option in targetOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="control-group">
        <label for="api">后端服务</label>
        <select class="doraemon-select" id="api" @change="selectApi">
          <option value="">请选择后端</option>
          <option v-for="option in apiUrl" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
          <option value="manual">自定义后端 API 地址</option>
        </select>
      </div>
      <div v-if="isShowManualApiUrl" class="control-group">
        <input class="doraemon-input" placeholder="自定义后端API地址" v-model="api" />
      </div>
      <div class="control-group">
        <label for="remote">远程配置</label>
        <select class="doraemon-select" id="remote" @change="selectRemoteConfig">
          <option value="">请选择配置</option>
          <option v-for="option in remoteConfigOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
          <option value="manual">自定义远程配置地址</option>
        </select>
      </div>
      <div v-if="isShowRemoteConfig" class="control-group">
        <input class="doraemon-input" placeholder="自定义远程配置地址" v-model="remoteConfig" />
      </div>
    </div>

    <div class="doraemon-optional" v-if="isShowMoreConfig">
      <div class="control-group">
        <label for="add-user-email">可选参数</label>
        <input class="doraemon-input" placeholder="Include: 可选" v-model="moreConfig.include" />
        <input class="doraemon-input" placeholder="Exclude: 可选" v-model="moreConfig.exclude" />
        <div class="doraemon-checkbox-group">
          <div v-for="(value, key) in moreConfig" :key="key">
            <input type="checkbox" :id="key" v-model="moreConfig[key]" />
            <label :for="key">{{ key }}</label>
          </div>
        </div>
      </div>
    </div>

    <button class="doraemon-more-btn" @click="showMoreConfig">更多配置</button>

    <div class="doraemon-actions">
      <input class="doraemon-input" placeholder="点击转换链接" v-model.trim="result.subUrl" />
      <button class="doraemon-btn" @click="getSubUrl">转换</button>
      <input class="doraemon-input" placeholder="点击获取短链" v-model.trim="result.shortUrl" />
      <button class="doraemon-btn" @click="getShortUrl">短链</button>
    </div>

    <!-- 弹窗结构 -->
    <dialog id="errorDialog" ref="errorDialog" class="doraemon-dialog">
      <p>{{ dialogMessage }}</p>
      <button @click="closeDialog" class="doraemon-btn">关闭</button>
    </dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeholder: '多订阅链接或节点请确保每行一条\n支持手动使用"|"分割多链接或节点',
      targetOptions: [
        { value: 'clash', text: 'Clash' },
        { value: 'clashr', text: 'ClashR' },
        { value: 'v2ray', text: 'V2Ray' },
        { value: 'singbox', text: 'Sing-box' },
        // 其他选项...
      ],
      apiUrl: [{ value: 'https://api.example.com', text: '默认后端' }],
      remoteConfigOptions: [{ value: 'https://config.example.com', text: '默认配置' }],
      moreConfig: {
        include: '',
        exclude: '',
        emoji: true,
        udp: true,
        sort: false,
        scv: false,
        list: false,
      },
      isShowMoreConfig: false,
      isShowManualApiUrl: false,
      isShowRemoteConfig: false,
      result: {
        subUrl: '',
        shortUrl: '',
      },
      urls: '',
      api: '',
      target: 'clash',
      remoteConfig: '',
      dialogMessage: '',
    };
  },
  methods: {
    showMoreConfig() {
      this.isShowMoreConfig = !this.isShowMoreConfig;
    },
    selectApi(event) {
      if (event.target.value == 'manual') {
        this.api = '';
        this.isShowManualApiUrl = true;
      } else {
        this.isShowManualApiUrl = false;
        this.api = event.target.value;
      }
    },
    selectRemoteConfig(event) {
      if (event.target.value == 'manual') {
        this.remoteConfig = '';
        this.isShowRemoteConfig = true;
      } else {
        this.isShowRemoteConfig = false;
        this.remoteConfig = event.target.value;
      }
    },
    getSubUrl() {
      if (!this.urls) {
        this.dialogMessage = '请输入订阅链接';
        this.openDialog();
      } else {
        this.result.subUrl = `https://api.example.com/convert?urls=${encodeURIComponent(this.urls)}`;
      }
    },
    getShortUrl() {
      this.result.shortUrl = `https://shorturl.example.com/${btoa(this.result.subUrl)}`;
    },
    openDialog() {
      this.$refs.errorDialog.showModal();
    },
    closeDialog() {
      this.$refs.errorDialog.close();
    },
  },
};
</script>

<style scoped>
.doraemon-container {
  padding: 20px;
  background-color: #f0f8ff;
  border: 2px solid #1c9fe3;
  border-radius: 12px;
  max-width: 800px;
  margin: 0 auto;
}

.doraemon-header,
.doraemon-controls,
.doraemon-optional,
.doraemon-actions {
  margin-bottom: 20px;
}

.doraemon-header label,
.control-group label {
  color: #1c9fe3;
  font-weight: bold;
}

.doraemon-textarea,
.doraemon-select,
.doraemon-input {
  width: 100%;
  border: 1px solid #1c9fe3;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 10px;
  color: #333333;
  margin-bottom: 10px;
}

.doraemon-btn,
.doraemon-more-btn {
  background-color: #1c9fe3;
  color: #ffffff;
  border-radius: 8px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.doraemon-more-btn {
  background-color: #ffcc00;
  color: #333333;
}

.doraemon-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.doraemon-checkbox-group input {
  margin-right: 5px;
}

.doraemon-checkbox-group label {
  margin-right: 15px;
  color: #1c9fe3;
}

.doraemon-dialog {
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
}

.doraemon-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}
</style>
