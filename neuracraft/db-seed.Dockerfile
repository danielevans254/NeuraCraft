FROM node:18-alpine3.18

# Install MySQL client and dependencies for waiting
RUN apk add --no-cache mysql-client bash

WORKDIR /app

# Copy necessary files for database operations
COPY neuracraft/package*.json ./
COPY neuracraft/prisma ./prisma
COPY neuracraft/tsconfig.json ./

# Install dependencies
RUN npm install
RUN npm run postinstall

# Copy seed files and scripts
# COPY scripts ./scripts
COPY neuracraft/prisma/seed.ts ./prisma/
COPY neuracraft/prisma/seed_data.ts ./prisma/

# Healthcheck to ensure database is ready
HEALTHCHECK --interval=5s --timeout=30s --start-period=10s --retries=3 \
  CMD mysqladmin ping -h database -u root -p$$MYSQL_ROOT_PASSWORD | grep alive

# neuracraft/db-seed.Dockerfile
CMD ["sh", "-c", "npx prisma migrate deploy --skip-validate && npx prisma db seed"]