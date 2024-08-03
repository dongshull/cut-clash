FROM node:14-alpine AS build
ENV VERSION=2.2
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.16-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost/ || exit 1
CMD [ "sh", "-c", "/app/start.sh" ]
