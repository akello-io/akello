FROM node:18.12.0

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm



COPY ./apps/registry ./apps/registry
COPY ./packages ./packages

WORKDIR /apps/registry

RUN rm -rf node_modules
RUN pnpm i

EXPOSE 5173

CMD ["pnpm", "dev"]

