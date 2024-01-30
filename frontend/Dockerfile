# Use an official Node runtime as a parent image
FROM node:14 as build

# Set the working directory to /frontend
WORKDIR /frontend

# Copy the current directory contents into the container at /frontend
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Run npm build
RUN npm run build

# Set up Nginx to serve the build files
FROM nginx:alpine

# Copy the build files from the build stage
COPY --from=build /frontend/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
