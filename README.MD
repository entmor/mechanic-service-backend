<h1>Car mechanic App</h1>

<h2>Dev Mode</h2>

<h4>1. Build Image for containers</h4>
<description>Image build protos file to GRPC JS/TS files</description><br><br>
<code> docker build --no-cache --target dev -t course ./ </code>

<h4>2. Build Image for containers</h4>
<code> docker compose -f docker-compose.yml -f docker-compose-dev.yml up --force-recreate
</code>


~~<h2>Recreate GRPC files for local use</h2>

Image always generate new GRPC files, but they are only in image. For Local use u must copy this files from image.

If u need create new GRPC Files from proto, u can copy from builded image or create local on your system using protoc 

<h3>FROM DOCKER IMAGE</h3>
<h4>1) Generate image from Dockerfile ( Step 1 in Dev Mode );</h4>

<h4>2) Run Container from created image </h4>
<code> ~/project/ docker run -it --rm --name grpc_copy course bash</code>

<h4>3) Open new console tab and copy files from container to local file </h4>
<code> ~/project/ rm -Rf ./grpc && docker cp grpc_copy:./core/grpc ./</code>

<h4>4) Done, you can close both consoles </h4>~~

<h2>Tests</h2>

1) First, build image and start components
2) <code>npm install</code>
3) Run test <code>npm run test</code>
4) if u want simulate broken services, use <code> npm run test-full</code>
