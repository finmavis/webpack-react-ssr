FROM node:16.15.1-alpine

WORKDIR /app

RUN apk add --no-cache \
  git

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]