FROM node:14-alpine AS build
LABEL maintainer="Stille <stille@ioiox.com>"

# 修正 ENV 格式
ENV VERSION=2.2

WORKDIR /app
COPY . /app

# 安装依赖
RUN npm install

# 构建项目
RUN npm run build

# 使用 nginx 作为服务器
FROM nginx:1.16-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY . /app
EXPOSE 80
CMD [ "sh", "-c", "/app/start.sh" ]
