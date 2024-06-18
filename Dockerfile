FROM node:20-alpine
WORKDIR /shopee/server
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build
EXPOSE 8888
CMD ["npm", "run", "test"]

#docker build --tag shopee-server .
#docker run -p 8080:8080 -d shopee-server
# docker build -t shopee-server .