FROM node:16-alpine

EXPOSE 5173:5173

WORKDIR /app

COPY cvizard/package.json /app/package.json
COPY cvizard/package-lock.json /app/package-lock.json


# RUN apk add --no-cache bash

COPY . . 
RUN cd cvizard && npm i && npm i -g vite
# CMD ["cd","cvizard","&&","npm","i","&&","npm", "run", "dev"]
CMD ["npm", "run", "dev"]
