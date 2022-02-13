# Installing base node alpine image
FROM amd64/node:alpine

WORKDIR /app

COPY ./package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]