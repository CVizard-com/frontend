FROM node:16-alpine

EXPOSE 5173:5173

WORKDIR /app

COPY cvizard/package.json /app/package.json
COPY cvizard/package-lock.json /app/package-lock.json


# RUN npm install

COPY . . 

CMD ["cd","cvizard","&&","npm","i","&&","npm", "run", "dev"]
