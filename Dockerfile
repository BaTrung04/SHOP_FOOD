FROM node:18

WORKDIR /SHOP_FOOD
RUN apt-get update

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE ${VITE_PORT}

CMD ["npm run dev"]
