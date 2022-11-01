apt-get update && apt-get upgrade -y
apt install netcat -y #nano
apt-get install zsh -y

npm config set unsafe-perm t
npm install -g grpc-tools
npm install -g ts-protoc-gen

chmod +x ./build/protoc-install.sh
chmod +x ./build/protoc-generate.sh

/bin/zsh ./build/protoc-install.sh
/bin/zsh ./build/protoc-generate.sh
