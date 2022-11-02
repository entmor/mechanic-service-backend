docker build --target builder --tag grpc_generate ./

docker run -it -d --rm --name grpc_copy grpc_generate bash

rm -Rf ./grpc && docker cp grpc_copy:./core/grpc ./

docker stop grpc_copy

docker image rm -f grpc_generate
