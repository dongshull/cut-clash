<template>
  <div class="row g-4 custom-div">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0">
      <div class="tab-content p-0 glass-effect">
        <div class="tab-pane fade show active">
          <div class="card mb-4 glass-effect">
            <div class="card-body">
              <div class="row mb-3 g-3">
                <div class="col-12 col-md-12">
                  <label class="form-label" for="add-user-email">订阅链接</label>
                  <textarea class="form-control" v-model.trim="urls" :placeholder="placeholder" rows="3"></textarea>
                </div>
                <div class="col-5 col-md-6">
                  <label class="form-label" for="client">客户端</label>
                  <select class="form-select" id="client" v-model="target" @change="selectTarget">
                    <option v-for="option in targetOptions" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div class="col-7 col-md-6">
                  <label class="form-label" for="api">后端服务</label>
                  <select class="form-select" id="api" @change="selectApi">
                    <option value="">请选择后端</option>
                    <option v-for="option in apiUrl" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义后端 API 地址</option>
                  </select>
                </div>
                <div class="col-12 col-md-12" v-if="isShowManualApiUrl">
                  <input class="form-control" placeholder="自定义后端API地址" v-model="api" />
                </div>
                <div class="col-8 col-md-10">
                  <label class="form-label" for="remote">远程配置</label>
                  <select class="form-select" id="remote" @change="selectRemoteConfig">
                    <option value="">请选择配置</option>
                    <option v-for="option in remoteConfigOptions" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                </div>
                <div class="col-12 col-md-2">
                  <label class="form-label">&nbsp;</label>
                  <button type="button" class="btn btn-warning align-button-select" @click="showMoreConfig">参数</button>
                </div>
                <div class="col-12 col-md-12" v-if="isShowRemoteConfig">
                  <input class="form-control" placeholder="自定义远程配置地址" v-model="remoteConfig" />
                </div>
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
                <div class="col-12 col-md-12">
                  <div class="divider divider-dashed">
                    <div class="divider-text"><i class="ti ti-refresh" style="color: gray"></i></div>
                  </div>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击转换链接" v-model.trim="result.subUrl" />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-success" @click="getSubUrl()">转换</button>
                </div>
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
      dialogMessage: '',  // 新增变量，用于存储弹窗的消息内容
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
        this.api = event.target.value;
        this.isShowManualApiUrl = false;
      }
    },
    selectRemoteConfig(event) {
      if (event.target.value == 'manual') {
        this.remoteConfig = '';
        this.isShowRemoteConfig = true;
      } else {
        this.remoteConfig = event.target.value;
        this.isShowRemoteConfig = false;
      }
    },
    selectTarget(event) {
      this.target = event.target.value;
    },
    async getSubUrl() {
      if (!this.urls) {
        this.showError('没有发现订阅链接');
        return;
      }
      showLoading('订阅链接转换中...');
      const url = `${this.api}/sub?target=${this.target}&url=${encodeURIComponent(
        this.urls
      )}&insert=false&emoji=true&list=false&udp=true&tfo=false&sort=false&scv=false`;
      try {
        this.result.subUrl = await getSubLink(url, 'sub');
      } catch (error) {
        this.showError('订阅链接转换失败');
      } finally {
        hideLoading();
      }
    },
    async getShortUrl() {
      if (!this.result.subUrl) {
        this.showError('没有可转换的链接');
        return;
      }
      const longUrl = this.result.subUrl;
      showLoading('链接转换中...');
      try {
        const { data } = await request({
          url: `${this.shortUrl}/url/short`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            longUrl: longUrl,
          }),
        });
        this.result.shortUrl = data.data.shortUrl;
        hideLoading();
        showNotification('链接转换成功');
      } catch (error) {
        hideLoading();
        this.showError('链接转换失败');
      }
    },
    showError(message) {
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
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
}
.glass-effect {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.5);
}
textarea.form-control {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 10px;
}
button.align-button-select {
  height: 38px; /* 确保按钮高度与下拉框一致 */
  line-height: 38px; /* 设置行高使文字居中 */
  padding: 0 20px; /* 调整内边距 */
  background-color: #ffcc00;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button.align-button-select:hover {
  background-color: #e6b800;
}

select.form-select {
  height: 38px; /* 确保下拉框高度与按钮一致 */
}

.dialog {
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
