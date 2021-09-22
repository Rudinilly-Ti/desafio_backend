FROM node:alpine

WORKDIR /user/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .

EXPOSE 3333

CMD ["yarn", "dev:server"]