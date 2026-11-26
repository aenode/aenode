FROM oven/bun:1-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./

RUN bun install --production

COPY dist ./dist

EXPOSE 3000

USER bun

CMD ["bun", "dist/main.js"]