FROM node:18-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
  default-mysql-client \
  python3 \
  build-essential \
  libvips-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy necessary files for seeding
COPY neuracraft/package*.json ./
COPY neuracraft/prisma ./prisma
COPY neuracraft/tsconfig.json ./

# Install all dependencies (non‑production for seed scripts)
RUN npm install

# Install ts-node globally for running TypeScript files
RUN npm install -g ts-node@10.9.1

# Default CMD will run migrations and seed the database.
# (docker-compose overrides the command to include a wait‑loop for the database)
CMD ["sh", "-c", "npx prisma migrate deploy && ts-node -P prisma/tsconfig.prisma.json prisma/seed.ts"]
