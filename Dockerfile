FROM node:18-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine as deploy-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD mv -f /usr/share/nginx/html/instance-config-$ENVIRONMENT.js /usr/share/nginx/html/instance-config.js && nginx -g "daemon off;"