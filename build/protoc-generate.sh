# Path to this plugin, Note this must be an abolsute path on Windows (see #15)
#PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Path to the grpc_node_plugin
#PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"

# Directory to write generated code to (.js and .d.ts files)
#OUT_DIR="/../src/grpc"
##
#cd services
##
#find ./ -name grpc -type d -exec rm -Rf {}  \;
#find ./ -name proto -type d -exec /bin/zsh -c 'cd {} && cd .. && mkdir src/grpc' \;
#find ./ -name proto -type d -exec /bin/zsh -c "protoc -I{} --js_out="import_style=commonjs,binary:{}${OUT_DIR}" --ts_out="service=grpc-node,mode=grpc-js:{}${OUT_DIR}" --grpc_out="grpc_js:{}${OUT_DIR}" --plugin=protoc-gen-ts=`which protoc-gen-ts` --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` {}/**/*.proto" \;

mkdir grpc
cd protos

OUT_DIR="../grpc"
protoc -I. --js_out="import_style=commonjs,binary:${OUT_DIR}" --ts_out="service=grpc-node,mode=grpc-js:${OUT_DIR}" --grpc_out="grpc_js:${OUT_DIR}" --plugin=protoc-gen-ts=`which protoc-gen-ts` --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` ./**/*.proto
