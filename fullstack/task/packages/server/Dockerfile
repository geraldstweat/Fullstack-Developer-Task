FROM node:20-alpine
WORKDIR /app
COPY package*.json yarn.lock* .npmrc* .yarnrc* ./ 2>/dev/null || true
COPY . .
RUN yarn install --frozen-lockfile || npm ci
RUN yarn build || npm run build
EXPOSE 4001
CMD ["yarn","start:prod"]