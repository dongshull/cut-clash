<template>
  <div class="row g-4 custom-div">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0">
      <div class="tab-content p-0 glass-effect">
        <div class="tab-pane fade show active">
          <div class="card mb-4 glass-effect">
            <div class="card-body">
              <div class="row mb-3 g-3">
                <div class="col-12">
                  <label class="form-label" for="add-user-email">订阅链接</label>
                  <textarea class="form-control" v-model.trim="urls" :placeholder="placeholder" rows="3"></textarea>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label" for="client">客户端</label>
                  <select class="form-select" id="client" v-model="target" @change="selectTarget">
                    <option v-for="option in targetOptions" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
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
                <div class="col-12 col-md-10">
                  <label class="form-label" for="remote">远程配置</label>
                  <select class="form-select" id="remote" @change="selectRemoteConfig">
                    <option value="">请选择配置</option>
                    <option v-for="option in remoteConfigOptions" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                </div>
                <div class="col-12 col-md-2 d-flex align-items-end">
                  <label class="form-label">&nbsp;</label>
                  <button type="button" class="btn btn-warning w-100" @click="showMoreConfig">参数</button>
                </div>
                <div class="col-12" v-if="isShowMoreConfig">
                  <input class="form-control" placeholder="自定义远程配置地址" v-model="remoteConfig" v-show="isShowRemoteConfig" />
                </div>
                <div class="col-12 col-md-12" v-if="isShowMoreConfig">
                  <label class="form-label" for="add-user-email">可选参数</label>
                  <div class="row g-3">
                    <div class="col-12 d-flex flex-wrap">
                      <input class="form-control" placeholder="Include: 可选" v-model="moreConfig.include" />
                    </div>
                    <div class="col-12 d-flex flex-wrap">
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
                <div class="col-12">
                  <div class="divider divider-dashed">
                    <div class="divider-text"><i class="ti ti-refresh" style="color: gray"></i></div>
                  </div>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击转换链接" v-model.trim="result.subUrl" />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-success w-100" @click="getSubUrl">转换</button>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control" placeholder="点击获取短链" v-model.trim="result.shortUrl" />
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
      dialogMessage: '', // 新增变量，用于存储弹窗的消息内容
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
      this.isShowRemoteConfig = event.target.value === 'manual';
    },
    getSubUrl() {
      const self = this;
      if (this.urls.length <= 0 || !this.target) {
        showNotification('warning', '请输入订阅链接和客户端类型!');
        return;
      }
      showLoading('加载中，请稍候...');
      request({
        method: 'POST',
        url: self.api,
        data: {
          target: self.target,
          urls: self.urls,
          config: self.moreConfig,
          remoteConfig: self.remoteConfig,
        },
      })
        .then((response) => {
          if (response.data) {
            self.result.subUrl = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
          showNotification('danger', '请求失败，请重试！');
        })
        .finally(() => {
          hideLoading();
        });
    },
    getShortUrl() {
      const self = this;
      if (!regexCheck(this.result.subUrl)) {
        showNotification('warning', '请输入正确的订阅链接!');
        return;
      }
      showLoading('生成中，请稍候...');
      getSubLink(self.shortUrl, self.result.subUrl)
        .then((response) => {
          self.result.shortUrl = response;
        })
        .catch((error) => {
          console.log(error);
          showNotification('danger', '请求失败，请重试！');
        })
        .finally(() => {
          hideLoading();
        });
    },
    closeDialog() {
      const dialog = this.$refs.errorDialog;
      dialog.close();
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
  background-color: #008BFF;
  color: white;
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
  background-color: #FF7F50;
}
</style>
