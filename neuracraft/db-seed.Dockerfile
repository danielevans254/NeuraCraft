FROM node:18-alpine3.18

# Install MySQL client and dependencies for waiting
RUN apk add --no-cache mysql-client bash

WORKDIR /app

# Copy necessary files for database operations
COPY neuracraft/package*.json ./
COPY neuracraft/prisma ./prisma
COPY neuracraft/prisma/tsconfig.prisma.json ./prisma/

# Install dependencies
RUN npm install
RUN npm run postinstall

# Verify files are copied
RUN ls -la prisma/migrations/

# Copy seed files and scripts
# COPY scripts ./scripts
COPY neuracraft/package*.json ./
COPY neuracraft/prisma ./prisma
COPY neuracraft/tsconfig.json ./

# Healthcheck to ensure database is ready
HEALTHCHECK --interval=5s --timeout=30s --start-period=10s --retries=3 \
  CMD mysqladmin ping -h database -u root -p$$MYSQL_ROOT_PASSWORD | grep alive

# neuracraft/db-seed.Dockerfile
CMD ["sh", "-c", "npx prisma migrate deploy --skip-validate && npx prisma db seed"]