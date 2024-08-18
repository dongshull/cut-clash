# subweb

## 简介
基于[stilleshan/subweb](https://github.com/stilleshan/subweb) 配置修改
为自用仓库，可供参考
## 部署
### docker 本地版
*适用于本机快速部署使用*
```shell
docker run -d --name subweb --restart always \
  -p 18080:80 \
  shihairu/subweb
```

访问 `http://127.0.0.1:18080`


同时也可以不挂载目录,直接通过`-e`环境变量来修改`API 地址`,`短链接地址`和`站点名称`,但是无法修改`导航链接`.  
`注意:以下域名请严格填写 http 或 https 协议,结尾不要 / 斜杠符号.`
```shell
docker run -d --name subweb --restart always \
  -p 18080:80 \
  -e SITE_NAME=subweb \
  -e API_URL=https://你的域名 \
  -e SHORT_URL=https://你的域名 \
  shihairu/subweb
```
