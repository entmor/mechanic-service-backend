#FROM node:16.18.0 AS builder
#COPY . ./core
#WORKDIR /core
#RUN chmod +x ./build/builder-start.sh
#RUN build/builder-start.sh
#RUN npm install
#EXPOSE 50050

FROM node:16.18.0 AS dev
RUN echo "dev"> devtest
COPY . ./core
WORKDIR /core
RUN chmod +x ./build/builder-start.sh
RUN build/builder-start.sh
#COPY --from=builder /core /core

FROM node:16.18.0
USER node
COPY --chown=node:node --from=dev /core /core
WORKDIR /core
RUN rm -r node_modules
RUN npm ci --only=production
