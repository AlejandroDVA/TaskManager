FROM node:latest AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:latest

WORKDIR /app

COPY --from=build /app /app

RUN npm install --dev

EXPOSE 3000

CMD ["npm", "run", "start:dev"]