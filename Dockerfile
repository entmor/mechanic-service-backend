FROM node:18.1.0 AS builder
COPY . ./core
WORKDIR /core
RUN chmod +x ./build/builder-start.sh
RUN build/builder-start.sh
RUN /bin/zsh ./build/protoc-generate.sh
RUN npm install
EXPOSE 50050

FROM node:latest AS dev
RUN echo "dev"> devtest
COPY --from=builder /core /core
RUN npm i

FROM node:latest
COPY --from=builder /core /core
WORKDIR /core
#RUN npm i
