FROM node:16-alpine

EXPOSE 5173


WORKDIR /app

COPY cvizard/package.json package.json

RUN npm install

COPY . . 

CMD ["npm", "run", "dev"]
