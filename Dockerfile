# Build stage
FROM node:16 as build
WORKDIR /app
COPY cvizard/package*.json ./
RUN npm install
RUN npx tailwindcss -i ./src/index.css -o ./dist/output.css
COPY . .
RUN cd cvizard && npm run build

# Production stage
FROM nginx:alpine as production
COPY --from=build /app/cvizard/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 5173
# EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
