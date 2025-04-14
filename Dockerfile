# Base node image
FROM node:lts-alpine as base

# Set environment for all stages
ENV NODE_ENV=production

# Create non-root user and app directory
RUN addgroup student && \
    adduser -D -H -g "student" -G student student && \
    mkdir /cst8918-a01 && \
    chown -R student:student /cst8918-a01

# ---------- Stage: deps ----------
FROM base as deps

WORKDIR /cst8918-a01

ADD package.json ./
RUN npm install --include=dev

# ---------- Stage: production-deps ----------
FROM base as production-deps

WORKDIR /cst8918-a01

COPY --from=deps /cst8918-a01/node_modules ./node_modules
ADD package.json ./
RUN npm prune --omit=dev

# ---------- Stage: build ----------
FROM base as build

WORKDIR /cst8918-a01

COPY --from=deps /cst8918-a01/node_modules ./node_modules
ADD . .
RUN npm run build

# ---------- Final Production Image ----------
    FROM base

    ENV PORT=8080
    ENV NODE_ENV=production
    
    WORKDIR /cst8918-a01
    
    COPY --from=production-deps /cst8918-a01/node_modules ./node_modules
    COPY --from=build /cst8918-a01/build ./build
    COPY --from=build /cst8918-a01/public ./public
    COPY --from=build /cst8918-a01/package.json .
    
    EXPOSE 8080
    
    RUN chown -R student:student /cst8918-a01
    USER student
    
    CMD ["npx", "remix-serve", "build/index.js", "--port", "8080", "--hostname", "0.0.0.0"]
    
