FROM node:20-alpine
WORKDIR /app
COPY package*.json yarn.lock* .npmrc* .yarnrc* ./ 2>/dev/null || true
COPY . .
RUN yarn install --frozen-lockfile || npm ci
EXPOSE 5173
CMD ["yarn","dev","--host","0.0.0.0"]