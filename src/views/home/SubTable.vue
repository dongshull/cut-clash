<template>
  <div class="row g-4 custom-div">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0">
      <div class="tab-content p-0">
        <div class="tab-pane fade show active">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row mb-3 g-3">
                <!-- 订阅链接区域 -->
                <div class="col-12 col-md-12">
                  <label class="form-label" for="add-user-email">订阅链接</label>
                  <textarea class="form-control" v-model.trim="urls" :placeholder="placeholder" rows="3"></textarea>
                </div>

                <!-- 客户端选择区域 -->
                <div class="col-5 col-md-6">
                  <label class="form-label" for="client">客户端</label>
                  <select class="form-select" id="client" v-model="target" @change="selectTarget">
                    <option v-for="option in targetOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>

                <!-- 后端服务选择区域 -->
                <div class="col-7 col-md-6">
                  <label class="form-label" for="api">后端服务</label>
                  <select class="form-select" id="api" @change="selectApi">
                    <option value="">请选择后端</option>
                    <option v-for="option in apiUrl" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义后端 API 地址</option>
                  </select>
                </div>

                <!-- 自定义后端 API 地址 -->
                <div class="col-12 col-md-12" v-if="isShowManualApiUrl">
                  <input class="form-control" placeholder="自定义后端API地址" v-model="api" />
                </div>

                <!-- 远程配置区域 -->
                <div class="col-8 col-md-9 d-flex align-items-center">
                  <label class="form-label mb-0" for="remote">远程配置</label>
                  <select class="form-select ms-2" id="remote" @change="selectRemoteConfig">
                    <option value="">请选择配置</option>
                    <option v-for="option in remoteConfigOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                </div>

                <!-- 参数按钮 -->
                <div class="col-4 col-md-3 d-flex align-items-center">
                  <button type="button" class="btn btn-warning ms-auto" @click="showMoreConfig">参数</button>
                </div>

                <!-- 自定义远程配置地址 -->
                <div class="col-12 col-md-12" v-if="isShowRemoteConfig">
                  <input class="form-control" placeholder="自定义远程配置地址" v-model="remoteConfig" />
                </div>

                <!-- 可选参数区域 -->
                <div class="col-12 col-md-12" v-if="isShowMoreConfig">
                  <label class="form-label" for="add-user-email">可选参数</label>
                  <div class="row g-3">
                    <div class="col-12 col-md-12">
                      <input class="form-control" placeholder="Include: 可选" v-model="moreConfig.include" />
                    </div>
                    <div class="col-12 col-md-12">
                      <input class="form-control" placeholder="Exclude: 可选" v-model="moreConfig.exclude" />
                    </div>
                    <div class="col-md check-div" :style="{ display: 'flex', flexWrap: 'wrap' }">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="emoji" v-model="moreConfig.emoji" />
                        <label class="form-check-label" for="emoji">Emoji</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="udp" v-model="moreConfig.udp" />
                        <label class="form-check-label" for="udp">开启UDP</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="sort" v-model="moreConfig.sort" />
                        <label class="form-check-label" for="sort">排序节点</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="scv" v-model="moreConfig.scv" />
                        <label class="form-check-label" for="scv">关闭证书检查</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="nodelist" v-model="moreConfig.list" />
                        <label class="form-check-label" for="nodelist">Node List</label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 转换链接 -->
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击转换链接" v-model.trim="result.subUrl" />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-success" @click="getSubUrl()">转换</button>
                </div>

                <!-- 获取短链 -->
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击获取短链" v-model.trim="result.shortUrl" />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-primary" @click="getShortUrl()">短链</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 弹窗结构 -->
  <dialog id="errorDialog" ref="errorDialog">
    <div>
      <p>{{ dialogMessage }}</p>
      <button @click="closeDialog">关闭</button>
    </div>
  </dialog>
</template>

<script>
import { showLoading, hideLoading } from '@/components/loading';
import { getSubLink, regexCheck } from './index.js';
import { request } from '@/network';
import showNotification from '@/components/notification';

export default {
  name: 'SubTable',
  setup() {
    const DEFAULT_MORECONFIG = {
      include: '',
      exclude: '',
      emoji: true,
      udp: true,
      sort: false,
      scv: false,
      list: false,
    };
    return {
      DEFAULT_MORECONFIG,
    };
  },
  data() {
    return {
      placeholder: '多订阅链接或节点请确保每行一条\n支持手动使用"|"分割多链接或节点',
      targetOptions: [
        { value: 'clash', text: 'Clash' },
        { value: 'clashr', text: 'ClashR' },
        { value: 'v2ray', text: 'V2Ray' },
        { value: 'singbox', text: 'Sing-box' },
        { value: 'quan', text: 'Quantumult' },
        { value: 'quanx', text: 'Quantumult X' },
        { value: 'surge&ver=2', text: 'SurgeV2' },
        { value: 'surge&ver=3', text: 'SurgeV3' },
        { value: 'surge&ver=4', text: 'SurgeV4' },
        { value: 'surfboard', text: 'Surfboard' },
        { value: 'ss', text: 'SS (SIP002)' },
        { value: 'sssub', text: 'SS Android' },
        { value: 'ssd', text: 'SSD' },
        { value: 'ssr', text: 'SSR' },
        { value: 'loon', text: 'Loon' },
      ],
      apiUrl: window.config.apiUrl,
      shortUrl: window.config.shortUrl,
      remoteConfigOptions: window.config.remoteConfigOptions,
      moreConfig: this.DEFAULT_MORECONFIG,
      isShowMoreConfig: false,
      isShowManualApiUrl: false,
      isShowRemoteConfig: false,
      result: {
        subUrl: '',
        shortUrl: '',
      },
      urls: [],
      api: window.config.apiUrl,
      target: 'clash',
      remoteConfig: '',
      dialogMessage: '',  // 用于存储弹窗的消息内容
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
      }
    },
    selectRemoteConfig(event) {
      if (event.target.value == 'manual') {
        this.remoteConfig = '';
        this.isShowRemoteConfig = true;
      } else {
        this.isShowRemoteConfig = false;
      }
    },
    async getSubUrl() {
      try {
        showLoading();
        const response = await getSubLink({
          urls: this.urls,
          target: this.target,
          api: this.api,
          remoteConfig: this.remoteConfig,
          moreConfig: this.moreConfig,
        });
        this.result.subUrl = response.data.subUrl;
        hideLoading();
      } catch (error) {
        hideLoading();
        this.dialogMessage = '获取链接失败，请检查配置';
        this.$refs.errorDialog.showModal();
      }
    },
    async getShortUrl() {
      try {
        showLoading();
        const response = await request({
          method: 'POST',
          url: this.shortUrl,
          data: { url: this.result.subUrl },
        });
        this.result.shortUrl = response.data.shortUrl;
        hideLoading();
      } catch (error) {
        hideLoading();
        this.dialogMessage = '获取短链失败，请重试';
        this.$refs.errorDialog.showModal();
      }
    },
    closeDialog() {
      this.$refs.errorDialog.close();
    },
  },
};
</script>

<style scoped>
.custom-div {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.card-body {
  padding: 1.5rem;
}

.check-div {
  display: flex;
  flex-wrap: wrap;
}

.btn-warning {
  margin-left: auto;
}
</style>
