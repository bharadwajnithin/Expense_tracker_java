# 1. Specify the base image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install project dependencies
RUN npm install

# 5. Copy the rest of your application's source code
COPY . .

# 6. Expose the port your app runs on
EXPOSE 3000

# 7. Specify the command to run your application
CMD [ "node", "server.js" ]
