docker build --target builder --tag carservice ./

docker run -it -d --rm --name grpc_copy carservice bash

rm -Rf ./grpc && docker cp grpc_copy:./core/grpc ./

docker stop grpc_copy
