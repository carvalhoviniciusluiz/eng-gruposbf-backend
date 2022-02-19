FROM node:17

RUN yarn global add @nestjs/cli

COPY package.json .
RUN yarn

COPY . /nest
WORKDIR /nest

CMD ["yarn", "start"]
