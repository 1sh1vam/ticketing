FROM amd64/node:alpine

WORKDIR /app

COPY ./package.json .
RUN npm install --only=prod
COPY . .

RUN ["npm", "start"]