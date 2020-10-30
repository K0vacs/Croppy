FROM node:14.15.0-alpine3.10

COPY . ./app/

WORKDIR app

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev"]