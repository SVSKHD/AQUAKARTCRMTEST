FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]