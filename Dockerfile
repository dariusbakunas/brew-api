FROM gcr.io/google-appengine/nodejs as builder

RUN install_node v8.12.0

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY .babelrc /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/
COPY webpack.config.js /usr/src/app/
COPY jest.config.js /usr/src/app/
RUN NODE_ENV=development npm --unsafe-perm install
COPY src /usr/src/app/src
COPY tests /usr/src/app/tests

ENV SCHEMA_LOCATION ./src/schema

RUN npm run test
RUN npm run build:prod
RUN npm prune --production && npm install --production

FROM gcr.io/google-appengine/nodejs
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json

EXPOSE 8080
CMD [ "npm", "run", "server:prod" ]
