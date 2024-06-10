FROM node:18.20.2

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY ./apps/registry /apps/registry
COPY ./.env /apps/registry/.env.local
COPY ./microservices /microservices
COPY ./packages /packages


# build packages
WORKDIR /microservices/account/packages/account
RUN rm -rf dist
RUN rm -rf node_modules
RUN pnpm i
RUN pnpm build:lib

WORKDIR /packages/npm-core
RUN rm -rf dist
RUN rm -rf node_modules
RUN pnpm i
RUN pnpm build:lib

WORKDIR /packages/npm-react-hook
RUN rm -rf dist
RUN rm -rf node_modules
RUN pnpm i
RUN pnpm build:lib

WORKDIR /apps/registry
RUN rm -rf node_modules
RUN pnpm i

EXPOSE 5173

CMD ["pnpm", "dev"]

