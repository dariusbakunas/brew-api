FROM node:8-alpine as builder

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY .babelrc /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/
COPY webpack.config.js /usr/src/app/
COPY jest.config.js /usr/src/app/
RUN npm install
COPY src /usr/src/app/src

RUN npm run test
RUN npm run build:prod
RUN npm prune --production && npm install --production

FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json

EXPOSE 4000
CMD [ "npm", "run", "server:prod" ]
