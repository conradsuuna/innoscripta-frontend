# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /innoscripta-frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Serve the app
CMD ["npm", "start"]
