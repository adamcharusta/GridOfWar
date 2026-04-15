# syntax=docker/dockerfile:1.7

############################
# Build stage
############################
FROM node:22-alpine AS build
WORKDIR /app

# Install deps from lockfile (cached layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources and build
COPY . .
RUN npm run build

############################
# Runtime stage (static via nginx)
############################
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
