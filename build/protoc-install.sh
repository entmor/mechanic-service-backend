# Make sure you grab the latest version
curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.18.1/protoc-3.18.1-linux-x86_64.zip
# Unzip
unzip protoc-3.18.1-linux-x86_64.zip -d protoc3
# Move protoc to /usr/local/bin/
mv protoc3/bin/* /usr/local/bin/
# Move protoc3/include to /usr/local/include/
mv protoc3/include/* /usr/local/include/
rm protoc-3.18.1-linux-x86_64.zip
rm -rf protoc3


# Optional: change owner
#sudo chown [user] /usr/local/bin/protoc
#sudo chown -R [user] /usr/local/include/google
