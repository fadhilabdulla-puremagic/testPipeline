# Use an official Node runtime as a parent image
FROM node:12-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages
RUN npm install --force

# Build the app
RUN npm run build

# Expose port 80 for the React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
