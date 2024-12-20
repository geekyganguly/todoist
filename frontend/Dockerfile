# Frontend build
FROM node:22.12.0-alpine AS build-stage

# Set the working directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Copy the application code
COPY . .

# Install project dependencies
ENV PATH /usr/app/node_modules/.bin:$PATH
RUN yarn install

# Build the application
RUN yarn build

# Production build
FROM nginx:1.27.3-alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts
COPY --from=build-stage /usr/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]