FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV PORT=8080
EXPOSE 8080
CMD ["node", "dist/main"]


# docker build -f docker/build.Dockerfile -t credit-programs-image .
