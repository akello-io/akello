# Use an official Node.js runtime as the parent image
FROM node:18-alpine

# Install curl and any required system dependencies using apk for Alpine Linux
RUN apk add --no-cache curl

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 3000 (React apps typically run on port 3000)
EXPOSE 3000

# Run the app using npm
CMD ["npm", "run", "start"]
