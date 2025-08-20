FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* ./

RUN if [ -f "yarn.lock" ]; then yarn install --frozen-lockfile; else npm ci; fi

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NEXT_SHARP_PATH=/app/node_modules/sharp \
    NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
# 複製 Next.js 的 .next 資料夾 (包含建構後的應用程式)
COPY --from=builder /app/.next ./.next
# 複製 public 資料夾 (靜態檔案)
COPY --from=builder /app/public ./public
# 複製 package.json (用於運行時的啟動命令)
COPY package.json ./

EXPOSE 3000

CMD ["sh", "-c", "node ./.next/standalone/server.js"]