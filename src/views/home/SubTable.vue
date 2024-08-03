<template>
  <div class="row g-4 custom-div">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0">
      <div class="tab-content p-0">
        <div class="tab-pane fade show active">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row mb-3 g-3">
                <!-- 订阅链接 -->
                <div class="col-12">
                  <label class="form-label" for="add-user-email">订阅链接</label>
                  <textarea class="form-control" v-model.trim="urls" :placeholder="placeholder" rows="3"></textarea>
                </div>
                <!-- 客户端选择 -->
                <div class="col-6">
                  <label class="form-label" for="client">客户端</label>
                  <select class="form-select" id="client" v-model="target" @change="selectTarget">
                    <option v-for="option in targetOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <!-- 后端服务选择 -->
                <div class="col-6">
                  <label class="form-label" for="api">后端服务</label>
                  <select class="form-select" id="api" v-model="api" @change="toggleManualApiUrl">
                    <option value="">请选择后端</option>
                    <option v-for="option in apiUrl" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义后端 API 地址</option>
                  </select>
                  <input v-if="isShowManualApiUrl" class="form-control mt-2" placeholder="自定义后端API地址" v-model="api" />
                </div>
                <!-- 远程配置与参数按钮 -->
                <div class="col-8">
                  <label class="form-label" for="remote">远程配置</label>
                  <select class="form-select" id="remote" v-model="remoteConfig" @change="toggleManualRemoteConfig">
                    <option value="">请选择配置</option>
                    <option v-for="option in remoteConfigOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                  <input v-if="isShowRemoteConfig" class="form-control mt-2" placeholder="自定义远程配置地址" v-model="remoteConfig" />
                </div>
                <div class="col-4 d-flex align-items-end">
                  <button type="button" class="btn btn-warning w-100" @click="toggleMoreConfig">参数</button>
                </div>
                <!-- 可选参数 -->
                <div v-if="isShowMoreConfig" class="col-12">
                  <label class="form-label" for="optional-params">可选参数</label>
                  <div class="row g-3">
                    <input v-model="moreConfig.include" class="form-control" placeholder="Include: 可选" />
                    <input v-model="moreConfig.exclude" class="form-control" placeholder="Exclude: 可选" />
                    <div class="form-check-inline" v-for="(label, key) in checkboxOptions" :key="key">
                      <input class="form-check-input" type="checkbox" :id="key" v-model="moreConfig[key]" />
                      <label class="form-check-label" :for="key">{{ label }}</label>
                    </div>
                  </div>
                </div>
                <!-- 转换和短链生成 -->
                <div class="col-12">
                  <div class="divider divider-dashed">
                    <div class="divider-text"><i class="ti ti-refresh" style="color: gray"></i></div>
                  </div>
                </div>
                <div class="col-10">
                  <input class="form-control" placeholder="点击转换链接" v-model.trim="result.subUrl" />
                </div>
                <div class="col-2">
                  <button type="button" class="btn btn-success w-100" @click="getSubUrl()">转换</button>
                </div>
                <div class="col-10">
                  <input class="form-control" placeholder="点击获取短链" v-model.trim="result.shortUrl" />
                </div>
                <div class="col-2">
                  <button type="button" class="btn btn-primary w-100" @click="getShortUrl()">短链</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 错误弹窗 -->
  <dialog ref="errorDialog">
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
      moreConfig: {
        include: '',
        exclude: '',
        emoji: true,
        udp: true,
        sort: false,
        scv: false,
        list: false,
      },
      checkboxOptions: {
        emoji: 'Emoji',
        udp: '开启UDP',
        sort: '排序节点',
        scv: '关闭证书检查',
        list: 'Node List',
      },
      result: { subUrl: '', shortUrl: '' },
      urls: [],
      api: window.config.apiUrl,
      target: 'clash',
      remoteConfig: '',
      isShowMoreConfig: false,
      isShowManualApiUrl: false,
      isShowRemoteConfig: false,
      dialogMessage: '',
    };
  },
  methods: {
    toggleMoreConfig() {
      this.isShowMoreConfig = !this.isShowMoreConfig;
    },
    toggleManualApiUrl() {
      this.isShowManualApiUrl = this.api === 'manual';
    },
    toggleManualRemoteConfig() {
      this.isShowRemoteConfig = this.remoteConfig === 'manual';
    },
    async getSubUrl() {
      if (!regexCheck(this.api)) return this.showErrorDialog('错误的后端API地址');
      showLoading('生成中...');
      try {
        this.result.subUrl = await getSubLink(this.api, {
          urls: this.urls,
          target: this.target,
          moreConfig: this.moreConfig,
          remoteConfig: this.remoteConfig,
        });
      } catch (e) {
        showNotification({ type: 'error', title: '出错了', message: e.toString() });
      } finally {
        hideLoading();
      }
    },
    async getShortUrl() {
      showLoading('生成中...');
      try {
        const { code, data, message } = await request(`${this.shortUrl}/api`, 'post', { url: this.result.subUrl });
        if (code === 200) this.result.shortUrl = data;
        else this.showErrorDialog(message || '出错了');
      } catch (e) {
        this.showErrorDialog(e.toString());
      } finally {
        hideLoading();
      }
    },
    showErrorDialog(message) {
      this.dialogMessage = message;
      this.$refs.errorDialog.showModal();
    },
    closeDialog() {
      this.$refs.errorDialog.close();
    },
  },
};
</script>

<style scoped>
.custom-div {
  margin-bottom: 0;
}

.d-flex.align-items-end {
  display: flex;
  align-items: flex-end;
}

.btn {
  height: calc(100
