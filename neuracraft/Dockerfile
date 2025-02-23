# Stage 1: Build
FROM node:18.13.0 as builder
WORKDIR /app

# Copy package files and prisma schema for caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy all remaining files
COPY . .

# Build the Next.js app (ensure standalone output is enabled)
RUN npm run build

# Generate the Prisma client (needed at runtime)
RUN npx prisma generate

# Stage 2: Production Image
FROM node:18.13.0
WORKDIR /app
ENV NODE_ENV=production

# Copy the standalone server and required assets from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
# Start the server – note that in standalone mode the server file is available as "server.js"
CMD ["node", "server.js"]