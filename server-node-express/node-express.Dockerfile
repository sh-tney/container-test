# Use an official Node.js runtime as the base image
FROM node:current-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm i -g typescript
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the TypeScript application
RUN npm run build

# Command to run the application
CMD ["node", "./dist/index.js"] 