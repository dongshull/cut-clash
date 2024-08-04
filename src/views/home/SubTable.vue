<template>
  <div class="row g-4 custom-div">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0">
      <div class="tab-content p-0 glass-effect">
        <div class="tab-pane fade show active">
          <div class="card mb-4 glass-effect">
            <div class="card-body">
              <div class="row mb-3 g-3">
                <!-- 订阅链接 -->
                <div class="col-12">
                  <label class="form-label" for="add-user-email">订阅链接</label>
                  <textarea class="form-control" v-model.trim="urls" :placeholder="placeholder" rows="3"></textarea>
                </div>

                <!-- 客户端和后端服务 -->
                <div class="col-12 col-md-6">
                  <label class="form-label" for="client">客户端</label>
                  <select class="form-select" id="client" v-model="target" @change="selectTarget">
                    <option v-for="option in targetOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label" for="api">后端服务</label>
                  <select class="form-select" id="api" @change="selectApi">
                    <option value="">请选择后端</option>
                    <option v-for="option in apiUrl" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义后端 API 地址</option>
                  </select>
                  <input v-if="isShowManualApiUrl" class="form-control mt-2" placeholder="自定义后端API地址" v-model="api" />
                </div>

                <!-- 远程配置 -->
                <div class="col-12 col-md-10">
                  <label class="form-label" for="remote">远程配置</label>
                  <select class="form-select" id="remote" @change="selectRemoteConfig">
                    <option value="">请选择配置</option>
                    <option v-for="option in remoteConfigOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                  <input v-if="isShowRemoteConfig" class="form-control mt-2" placeholder="自定义远程配置地址" v-model="remoteConfig" />
                </div>
                <div class="col-12 col-md-2 d-flex align-items-end">
                  <button type="button" class="btn btn-warning w-100" @click="showMoreConfig">参数</button>
                </div>

                <!-- 更多配置 -->
                <div class="col-12" v-if="isShowMoreConfig">
                  <label class="form-label">可选参数</label>
                  <div class="row g-3">
                    <div class="col-12 col-md-6">
                      <input class="form-control" placeholder="Include: 可选" v-model="moreConfig.include" />
                    </div>
                    <div class="col-12 col-md-6">
                      <input class="form-control" placeholder="Exclude: 可选" v-model="moreConfig.exclude" />
                    </div>
                    <div class="col-12 d-flex flex-wrap">
                      <div class="form-check form-check-inline" v-for="(label, key) in checkboxOptions" :key="key">
                        <input class="form-check-input" type="checkbox" :id="key" v-model="moreConfig[key]" />
                        <label class="form-check-label" :for="key">{{ label }}</label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 链接转换 -->
                <div class="col-12">
                  <div class="divider divider-dashed">
                    <div class="divider-text"><i class="ti ti-refresh" style="color: gray"></i></div>
                  </div>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击转换链接" v-model.trim="result.subUrl" readonly />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-success w-100" @click="getSubUrl">转换</button>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击获取短链" v-model.trim="result.shortUrl" readonly />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-primary w-100" @click="getShortUrl">短链</button>
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
  </div>
</template>

<script>
import { showLoading, hideLoading } from '@/components/loading';
import { getSubLink, regexCheck } from './index.js';
import { request } from '@/network';

export default {
  name: 'SubTable',
  setup() {
    return {
      DEFAULT_MORECONFIG: {
        include: '',
        exclude: '',
        emoji: true,
        udp: true,
        sort: false,
        scv: false,
        list: false,
      },
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
      dialogMessage: '',
    };
  },
  computed: {
    checkboxOptions() {
      return {
        emoji: 'Emoji',
        udp: '开启UDP',
        sort: '排序节点',
        scv: '关闭证书检查',
        list: 'Node List',
      };
    },
  },
  methods: {
    showMoreConfig() {
      this.isShowMoreConfig = !this.isShowMoreConfig;
    },
    selectApi(event) {
      this.isShowManualApiUrl = event.target.value === 'manual';
      if (!this.isShowManualApiUrl) {
        this.api = event.target.value;
      }
    },
    selectRemoteConfig(event) {
      this.isShowRemoteConfig = event.target.value === 'manual';
      if (!this.isShowRemoteConfig) {
        this.remoteConfig = event.target.value;
      }
    },
    validateInputs() {
      if (!this.urls) {
        this.showDialog('请输入订阅链接或节点');
        return false;
      }
      if (!regexCheck(this.api)) {
        this.showDialog('请输入自定义后端 API 地址，或选择默认后端服务。');
        return false;
      }
      if (!this.remoteConfig && this.isShowRemoteConfig) {
        this.showDialog('请输入远程配置地址，或选择默认配置。');
        return false;
      }
      return true;
    },
    getConverter() {
      if (!this.validateInputs()) {
        return false;
      }
      this.api = this.api.replace(/\/$/, '');
      this.result.subUrl = getSubLink(
        this.urls,
        this.api,
        this.target,
        this.remoteConfig,
        this.isShowMoreConfig,
        this.moreConfig
      );
      return true;
    },
    getSubUrl() {
      if (this.getConverter()) {
        this.toCopy(this.result.subUrl, '订阅链接');
      }
    },
    getShortUrl() {
      if (!this.getConverter()) {
        return;
      }
      const data = new FormData();
      data.append('longUrl', btoa(this.result.subUrl));
      showLoading();
      request({
        method: 'post',
        url: this.shortUrl + '/short',
        headers: {
          'Content-Type': 'application/form-data; charset=utf-8',
        },
        data,
      })
        .then(res => {
          this.result.shortUrl = res.data.data.shortUrl;
          this.toCopy(this.result.shortUrl, '短链');
        })
        .catch(() => {
          this.showDialog('短链获取失败');
        })
        .finally(() => {
          hideLoading();
        });
    },
    toCopy(val, type) {
      navigator.clipboard.writeText(val)
        .then(() => {
          this.showDialog(`${type}已复制`);
        })
        .catch(() => {
          this.showDialog('复制失败，请手动复制');
        });
    },
    showDialog(message) {
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
/* 毛玻璃效果样式 */
.glass-effect {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 弹窗样式 */
dialog {
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
}
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

/* 按钮样式 */
button {
  background-color: #4CAF50; /* 绿色背景色 */
  color: white; /* 白色文字 */
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049; /* 鼠标悬停的颜色 */
}
</style>
