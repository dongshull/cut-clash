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

### docker 自定义版 + 短链接版
自定义版可以挂载配置文件来修改`API 地址`,`短链接地址`,`站点名称`,`导航链接`.  
参考以下命令,修改本地挂载路径,启动容器后会生成`config.js`配置文件,更改后刷新生效.

```shell
docker run -d --name subweb --restart always \
  -p 18080:80 \
  -v /PATH/subweb/public/conf:/usr/share/nginx/html/conf \
  shihairu/subweb
```

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
