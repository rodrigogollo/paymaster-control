FROM node:24-alpine
WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . . 
EXPOSE 3000
CMD ["sh", "-c", "npm run db:generate && npm run db:migrate && npm run dev"]
