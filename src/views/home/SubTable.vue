<template>
  <div class="row g-4 custom-div glass-effect">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0 glass-effect">
      <div class="tab-content p-0 glass-effect">
        <div class="tab-pane fade show active">
          <div class="card mb-4 glass-effect">
            <div class="card-body glass-effect">
              <div class="row mb-3 g-3">
                <div class="col-12 col-md-12">
                  <label class="form-label" for="add-user-email">订阅链接</label>
                  <textarea
                    class="form-control glass-effect"
                    v-model.trim="urls"
                    :placeholder="placeholder"
                    rows="3"
                  ></textarea>
                </div>
                <div class="col-5 col-md-6">
                  <label class="form-label" for="client">客户端</label>
                  <select
                    class="form-select glass-effect"
                    id="client"
                    v-model="target"
                    @change="selectTarget"
                  >
                    <option
                      v-for="option in targetOptions"
                      :key="option"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div class="col-7 col-md-6">
                  <label class="form-label" for="api">后端服务</label>
                  <select
                    class="form-select glass-effect"
                    id="api"
                    @change="selectApi"
                  >
                    <option value="">请选择后端</option>
                    <option
                      v-for="option in apiUrl"
                      :key="option"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义后端 API 地址</option>
                  </select>
                </div>
                <div class="col-12 col-md-12" v-if="isShowManualApiUrl">
                  <input
                    class="form-control glass-effect"
                    placeholder="自定义后端API地址"
                    v-model="api"
                  />
                </div>
                <div class="col-8 col-md-10">
                  <label class="form-label" for="remote">远程配置</label>
                  <select
                    class="form-select glass-effect"
                    id="remote"
                    @change="selectRemoteConfig"
                  >
                    <option value="">请选择配置</option>
                    <option
                      v-for="option in remoteConfigOptions"
                      :key="option"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                </div>
                <div class="col-4 col-md-2">
                  <label class="form-label">&nbsp;</label>
                  <button
                    type="button"
                    class="btn btn-warning glass-effect"
                    @click="showMoreConfig"
                  >
                    参数
                  </button>
                </div>
                <div class="col-12 col-md-12" v-if="isShowRemoteConfig">
                  <input
                    class="form-control glass-effect"
                    placeholder="自定义远程配置地址"
                    v-model="remoteConfig"
                  />
                </div>
                <div class="col-12 col-md-12" v-if="isShowMoreConfig">
                  <label class="form-label" for="add-user-email">可选参数</label>
                  <div class="row g-3">
                    <div class="col-12 col-md-12">
                      <input
                        class="form-control glass-effect"
                        placeholder="Include: 可选"
                        v-model="moreConfig.include"
                      />
                    </div>
                    <div class="col-12 col-md-12">
                      <input
                        class="form-control glass-effect"
                        placeholder="Exclude: 可选"
                        v-model="moreConfig.exclude"
                      />
                    </div>
                    <div
                      class="col-md check-div"
                      :style="{ display: 'flex', flexWrap: 'wrap' }"
                    >
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input glass-effect"
                          type="checkbox"
                          id="emoji"
                          v-model="moreConfig.emoji"
                        />
                        <label class="form-check-label" for="emoji">Emoji</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input glass-effect"
                          type="checkbox"
                          id="udp"
                          v-model="moreConfig.udp"
                        />
                        <label class="form-check-label" for="udp">开启UDP</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input glass-effect"
                          type="checkbox"
                          id="sort"
                          v-model="moreConfig.sort"
                        />
                        <label class="form-check-label" for="sort">排序节点</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input glass-effect"
                          type="checkbox"
                          id="scv"
                          v-model="moreConfig.scv"
                        />
                        <label class="form-check-label" for="scv">关闭证书检查</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input glass-effect"
                          type="checkbox"
                          id="nodelist"
                          v-model="moreConfig.list"
                        />
                        <label class="form-check-label" for="nodelist">Node List</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12">
                  <div class="divider divider-dashed">
                    <div class="divider-text">
                      <i class="ti ti-refresh" style="color: gray"></i>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-10">
                  <input
                    class="form-control glass-effect"
                    placeholder="点击转换链接"
                    v-model.trim="result.subUrl"
                  />
                </div>
                <div class="col-12 col-md-2">
                  <button
                    type="button"
                    class="btn btn-success glass-effect"
                    @click="getSubUrl"
                  >
                    转换
                  </button>
                </div>
                <div class="col-12 col-md-10">
                  <input
                    class="form-control glass-effect"
                    placeholder="点击获取短链"
                    v-model.trim="result.shortUrl"
                  />
                </div>
                <div class="col-12 col-md-2">
                  <button
                    type="button"
                    class="btn btn-primary glass-effect"
                    @click="getShortUrl"
                  >
                    短链
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 弹窗结构 -->
  <dialog id="errorDialog" ref="errorDialog" class="glass-effect">
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
      placeholder:
        '多订阅链接或节点请确保每行一条\n支持手动使用"|"分割多链接或节点',
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
      remoteConfig: '', // Ensure you define the initial value for remoteConfig
    };
  },
  methods: {
    selectTarget() {
      // Method implementation
    },
    selectApi() {
      this.isShowManualApiUrl = this.api === 'manual';
    },
    selectRemoteConfig() {
      this.isShowRemoteConfig = this.remoteConfig === 'manual';
    },
    showMoreConfig() {
      this.isShowMoreConfig = !this.isShowMoreConfig;
    },
    getSubUrl() {
      // Method implementation
    },
    getShortUrl() {
      // Method implementation
    },
    closeDialog() {
      this.$refs.errorDialog.close();
    },
  },
};
</script>
