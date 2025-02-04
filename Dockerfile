
FROM node:23-slim
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node app/* ./
USER node
RUN npm install
EXPOSE 8080
CMD [ "node", "index.js" ]
