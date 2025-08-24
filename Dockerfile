# Use an official Node.js runtime as the base image
FROM node:18-alpine

ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZmNrcWJ3bmhmdWxraWx3bXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODk3ODMsImV4cCI6MjA0MTA2NTc4M30.EBG3M1TsKzwuwlVF8szUqIDhPXhGTGcQrMfXTbMf6qA
ARG NEXT_PUBLIC_SUPABASE_URL=https://ypfckqbwnhfulkilwmre.supabase.co/

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
