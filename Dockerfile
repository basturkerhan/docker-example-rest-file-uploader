FROM node:14-slim
WORKDIR /opt/node-uploadly-app
COPY server/ .
RUN npm install
CMD ["npm", "run","dev"]