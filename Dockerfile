FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm i && npm i -g nodemon

COPY . .
CMD [ "npm", "run", "start-dev" ]
