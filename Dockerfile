FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package.json /app/package-lock.json ./

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/public ./public

COPY --from=builder /app/next.config.mjs ./

ARG NEXT_PUBLIC_APPLICATION_ID
ARG NEXT_PUBLIC_JS_KEY
ARG NEXT_PUBLIC_SERVER_URL


ENV NEXT_PUBLIC_APPLICATION_ID=$NEXT_PUBLIC_APPLICATION_ID
ENV NEXT_PUBLIC_JS_KEY=$NEXT_PUBLIC_JS_KEY
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL


RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]