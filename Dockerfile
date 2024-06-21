FROM node:18

WORKDIR /app

# need to install python
RUN apt-get update && \
    apt-get install -y python3 build-essential && \
    ln -s /usr/bin/python3 /usr/bin/python

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]