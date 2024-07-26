window.config = {
  // 网站标题
  siteName: 'Subweb-new',
  // API 地址
  apiUrl: [
    {
      value: 'http://127.0.0.1:25500',
      text: '本地局域网版后端',
    },
  ],
  // 短域名服务地址
  shortUrl: 'https://s.ops.ci',
  // 远程配置地址,可以自行按照格式添加。
  remoteConfigOptions: [
    {
      value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini',
      text: 'ACL4SSR Online',
    },
    {
      value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini',
      text: 'ACL4SSR Online Full',
    },
  ],
};
