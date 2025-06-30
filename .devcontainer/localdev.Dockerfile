# Node.js dev container for the whole project
FROM node:current

WORKDIR /workspace

RUN npm install -g typescript

# Keep container running for devcontainer
CMD ["sleep", "infinity"]
