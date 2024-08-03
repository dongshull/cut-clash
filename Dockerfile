FROM node:14-alpine AS build
LABEL maintainer="Stille <stille@ioiox.com>"

ENV VERSION 2.2

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.16-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY . /app
EXPOSE 8888
CMD [ "sh", "-c", "/app/start.sh" ]
