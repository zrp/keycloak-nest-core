# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3333

# Deploy the migrations & Start the server using the production build
CMD npx prisma migrate deploy && npm run start:prod