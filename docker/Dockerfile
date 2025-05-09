# Use an official Node.js runtime as the base image
# NOTE: This Dockerfile assumes it's being built with the parent directory as context.
# Build this image using:
#   docker build -t server-app -f docker/Dockerfile .
# from the parent directory of docker/ and server/
FROM node:current-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for better layer caching
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY server/ ./

# Build the TypeScript application
RUN npm run build

# Command to run the application
CMD ["node", "./dist/app.js"]

