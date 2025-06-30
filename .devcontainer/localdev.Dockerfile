# Node.js dev container for the whole project
FROM node:latest

WORKDIR /workspace

# Keep container running for devcontainer
CMD ["sleep", "infinity"]
