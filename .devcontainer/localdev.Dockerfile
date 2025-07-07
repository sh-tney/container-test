# Node.js dev container for the whole project
FROM node:latest

WORKDIR /container-test

# Keep container running for devcontainer
CMD ["sleep", "infinity"]
