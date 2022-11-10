#FROM node:16.18.0 AS builder
#COPY . ./core
#WORKDIR /core
#RUN chmod +x ./build/builder-start.sh
#RUN build/builder-start.sh
#RUN npm install
#EXPOSE 50050

FROM node:16.18.0 AS dev
#RUN echo "dev"> devtest
COPY . ./core
WORKDIR /core
RUN chmod +x ./build/builder-start.sh
RUN chmod +x ./build/wait-for/wait-for
RUN build/builder-start.sh
RUN npm install
EXPOSE 50050
#COPY --from=builder /core /core

FROM node:16.18.0
USER node
COPY --chown=node:node --from=dev /core /core
WORKDIR /core
RUN rm -r node_modules
RUN rm -r tests
RUN npm ci --only=production
