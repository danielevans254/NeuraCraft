FROM node:18.13.0

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]