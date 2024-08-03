<template>
  <div class="row g-4 doraemon-theme">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0">
      <div class="tab-content p-0">
        <div class="tab-pane fade show active">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row mb-3 g-3">
                <div class="col-12 col-md-12">
                  <label class="form-label doraemon-label" for="add-user-email">订阅链接</label>
                  <textarea class="form-control doraemon-textarea" v-model.trim="urls" :placeholder="placeholder" rows="3"></textarea>
                </div>
                <div class="col-5 col-md-6">
                  <label class="form-label doraemon-label" for="client">客户端</label>
                  <select class="form-select doraemon-select" id="client" v-model="target" @change="selectTarget">
                    <option v-for="option in targetOptions" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div class="col-7 col-md-6">
                  <label class="form-label doraemon-label" for="api">后端服务</label>
                  <select class="form-select doraemon-select" id="api" @change="selectApi">
                    <option value="">请选择后端</option>
                    <option v-for="option in apiUrl" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义后端 API 地址</option>
                  </select>
                </div>
                <div class="col-12 col-md-12" v-if="isShowManualApiUrl">
                  <input class="form-control doraemon-input" placeholder="自定义后端API地址" v-model="api" />
                </div>
                <div class="col-8 col-md-10">
                  <label class="form-label doraemon-label" for="remote">远程配置</label>
                  <select class="form-select doraemon-select" id="remote" @change="selectRemoteConfig">
                    <option value="">请选择配置</option>
                    <option v-for="option in remoteConfigOptions" :key="option" :value="option.value">
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                </div>
                <div class="col-4 col-md-2">
                  <label class="form-label">&nbsp;</label>
                  <button type="button" class="btn doraemon-button" @click="showMoreConfig">参数</button>
                </div>
                <div class="col-12 col-md-12" v-if="isShowRemoteConfig">
                  <input class="form-control doraemon-input" placeholder="自定义远程配置地址" v-model="remoteConfig" />
                </div>
                <div class="col-12 col-md-12" v-if="isShowMoreConfig">
                  <label class="form-label doraemon-label" for="add-user-email">可选参数</label>
                  <div class="row g-3">
                    <div class="col-12 col-md-12">
                      <input class="form-control doraemon-input" placeholder="Include: 可选" v-model="moreConfig.include" />
                    </div>
                    <div class="col-12 col-md-12">
                      <input class="form-control doraemon-input" placeholder="Exclude: 可选" v-model="moreConfig.exclude" />
                    </div>
                    <div class="col-md check-div" :style="{ display: 'flex', flexWrap: 'wrap' }">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="emoji" v-model="moreConfig.emoji" />
                        <label class="form-check-label doraemon-label" for="emoji">Emoji</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="udp" v-model="moreConfig.udp" />
                        <label class="form-check-label doraemon-label" for="udp">开启UDP</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="sort" v-model="moreConfig.sort" />
                        <label class="form-check-label doraemon-label" for="sort">排序节点</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="scv" v-model="moreConfig.scv" />
                        <label class="form-check-label doraemon-label" for="scv">关闭证书检查</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="nodelist" v-model="moreConfig.list" />
                        <label class="form-check-label doraemon-label" for="nodelist">Node List</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12">
                  <div class="divider divider-dashed doraemon-divider">
                    <div class="divider-text doraemon-divider-text"><i class="ti ti-refresh doraemon-icon"></i></div>
                  </div>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control doraemon-input" placeholder="点击转换链接" v-model.trim="result.subUrl" />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn doraemon-button" @click="getSubUrl()">转换</button>
                </div>
                <div class="col-12 col-md-10">
                  <input class="form-control doraemon-input" placeholder="点击获取短链" v-model.trim="result.shortUrl" />
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="btn btn-primary doraemon-button-primary" @click="getShortUrl()">短链</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 弹窗结构 -->
  <dialog id="errorDialog" ref="errorDialog" class="doraemon-dialog">
    <div>
      <p>{{ dialogMessage }}</p>
      <button @click="closeDialog" class="btn doraemon-button">关闭</button>
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
    toCopy(url, title) {
      if (!url) {
        this.dialogMessage = '复制失败 内容为空';
        this.openDialog();
        return;
      }
      var copyInput = document.createElement('input');
      copyInput.setAttribute('value', url);
      document.body.appendChild(copyInput);
      copyInput.select();
      try {
        var copyed = document.execCommand('copy');
        if (copyed) {
          document.body.removeChild(copyInput);
          showNotification(title + ' 复制成功', '成功');
        }
      } catch {
        this.dialogMessage = '复制失败，请检查浏览器兼容性';
        this.openDialog();
      }
    },
    getConverter() {
      if (this.urls == '') {
        this.dialogMessage = '请输入订阅链接或节点';
        this.openDialog();
        return false;
      }
      if (!regexCheck(this.api)) {
        this.dialogMessage = '请输入自定义后端 API 地址，或选择默认后端服务。';
        this.openDialog();
        return false;
      }
      if (this.remoteConfig == '' && this.isShowRemoteConfig) {
        this.dialogMessage = '请输入远程配置地址，或选择默认配置。';
        this.openDialog();
        return false;
      }
      if (this.api.endsWith('/')) {
        this.api = this.api.slice(0, -1);
      }
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
      if (!this.getConverter()) {
        return;
      }
      this.toCopy(this.result.subUrl, '订阅链接');
    },
    getShortUrl() {
      if (!this.getConverter()) {
        return;
      }
      let data = new FormData();
      data.append('longUrl', btoa(this.result.subUrl));
      showLoading();
      request({
        method: 'post',
        url: this.shortUrl + '/short',
        header: {
          'Content-Type': 'application/form-data; charset=utf-8',
        },
        data: data,
      })
        .then((res) => {
          if (res.data.Code === 1 && res.data.ShortUrl !== '') {
            this.result.shortUrl = res.data.ShortUrl;
            this.toCopy(this.result.shortUrl, '短链接');
          }
          hideLoading();
        })
        .catch(() => {
          this.dialogMessage = '短链接生成失败 请检查短链接服务是否可用';
          this.openDialog();
          hideLoading();
        });
    },
    openDialog() {
      const dialog = this.$refs.errorDialog;
      dialog.showModal();
    },
    closeDialog() {
      const dialog = this.$refs.errorDialog;
      dialog.close();
    },
  },
};
</script>

<style scoped>
.doraemon-theme {
  background-color: #f0f8ff;
  color: #333;
  font-family: 'Comic Sans MS', sans-serif;
}

.doraemon-label {
  color: #1e90ff;
}

.doraemon-input,
.doraemon-textarea,
.doraemon-select {
  border: 1px solid #1e90ff;
  border-radius: 4px;
}

.doraemon-button {
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.doraemon-button-primary {
  background-color: #ff4500;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.doraemon-dialog {
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
}

.doraemon-divider {
  border-color: #1e90ff;
}

.doraemon-divider-text {
  color: #1e90ff;
}

.doraemon-icon {
  color: #1e90ff;
}
</style>
