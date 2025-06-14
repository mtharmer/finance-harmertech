FROM node:18-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=
ENV VITE_FINANCE_API_URL=
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "prod"]
