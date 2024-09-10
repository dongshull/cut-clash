# CUT-Clash
## 简介
CUT-Clash( Clash url tool) 是基于 subconverter 订阅转换的前端项目,方便用户快速生成各平台的订阅链接.

> *docker image support for X86 and ARM*

## 部署
### Docker 本地版
*适用于本机快速部署使用*
```shell
docker run -d --name cut-clash --restart always \
  -p 18080:80 \
  dongshull/cut-clash
```

访问 `http://127.0.0.1:18080`

### Docker 自定义版 + 短链接版
自定义版可以挂载配置文件来修改`API 地址`,`短链接地址`,`站点名称`,`导航链接`.  
参考以下命令,修改本地挂载路径,启动容器后会生成`config.js`配置文件,更改后刷新生效.

```shell
docker run -d --name cut-clash --restart always \
  -p 18080:80 \
  -v /PATH/cut-clash/public/conf:/usr/share/nginx/html/conf \
  dongshull/cut-clash
```

同时也可以不挂载目录,直接通过`-e`环境变量来修改`API 地址`,`短链接地址`和`站点名称`,但是无法修改`导航链接`.  
`注意:以下域名请严格填写 http 或 https 协议,结尾不要 / 斜杠符号.`
```shell
docker run -d --name cut-clash --restart always \
  -p 18080:80 \
  -e SITE_NAME=cut-clash \
  -e API_URL=https://sub.ops.ci \
  -e SHORT_URL=https://s.ops.ci \
  dongshull/cut-clash
```
```shell
version: "3"
services:
  cut-clash:
     image: "dongshull/cut-clash:3.1"  # 东叔改版的前端镜像可完美匹配短链api
     container_name: cut-clash
     volumes:
       - /PATH/cut-clash/public/conf:/usr/share/nginx/html/conf  # 前端映射的本地配置文件可自己修改config.js参数    
     network_mode: cut-clash
     environment:
       API_URL: http://x.x.x.x:25500  # 你的后端地址
     ports:
       - '18080:80'
     restart: always
```

访问 `http://127.0.0.1:18080`  
> *推荐使用 nginx 反向代理部署*

---
