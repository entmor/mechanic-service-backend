<h1>Mechanic App Mode</h1>

Jest to Backend napisany do aplikacji frontedowej w Angularze: https://github.com/entmor/mechanic-service-frontend

<h2>Production Mode</h2>
<h3>1. Wygeneruj obraz dla wersji dev</h3>
<description>Podczas generowania obrazu, są generowane pliki GRPC z plików PROTO</description><br><br>
<code> ~/project/ docker build --no-cache -t mechanic_service ./ </code>

<h3>2. Odpalenie kontenerów</h3>
<code> ~/project/ docker-compose -f docker-compose.yml up --force-recreate
</code>
<br><br>

<h3>3. API GATEWAY dostępne pod: </h3>
<description>Routy opisane poniżej</description><br><br>
<code>80 oraz 443 portem</code>
<br><br>
~~

<h2>Dev Mode</h2>
<p>W dev mode, wszystko jest gotowe do działania</p>
<h3>1. Wygeneruj obraz dla wersji dev</h3>
<description>Podczas generowania obrazu, są generowane pliki GRPC z plików PROTO</description><br><br>
<code> ~/project/ docker build --no-cache --target dev -t mechanic_service:dev ./ </code>

<h3>2. Odpalenie kontenerów</h3>
<code> ~/project/ docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --force-recreate
</code>

<h3>3. API GATEWAY dostępne pod: </h3>
<description>Routy opisane poniżej</description><br><br>
<code> http://localhost:3000/v1/
</code>
<br><br>
~~

<h2>Tworzenie plików GRPC dla lokalnego użytkowania</h2>

Podczas tworzenia obrazu, zawsze są generowane pliki GRPC z plików PROTO.

Pliki GRPC można wygeneorwać do plików lokalnych, aby IDE importowało poprawnie za pomocą komendy:

<code> ~/project/ sudo sh ./build/grpc-rebuild.sh</code>
<br><br>
~~

<h2>Testy</h2>

1) Wygeneruj obraz i odpal kontentery w trybie developerskim
2) <code>npm install</code>
3) Run test <code>npm run test</code>
4) <s>if u want simulate broken services, use npm run test-full</s>
<br><br>
~~

<h2>API ROUTE</h2>

Niestety, całe API nie zostało jeszcze opisane.

<h3>###### AUTH ######</h3>

<h3>POST /v1/auth </h3>
<h4>Request</h4>

| data       | Description   |
|------------|---------------|
| `email`    | User email    |
| `password` | User Password |

<h4>Response</h4>

| data    | Description |
|---------|-------------|
| `token` | JWT TOKEN   |
| `user`  | User INFO   |

<h3>GET /v1/auth </h3>
<h4>Request</h4>

<code>-header "Authorization: Bearer JWT-TOKEN" \ </code>

<h4>Response</h4>

| data    | Description |
|---------|-------------|
| `token` | JWT TOKEN   |
| `user`  | User INFO   |

<h2>###### USER ######</h2>
<h3>GET /v1/user/:id </h3>
<h4>Request</h4>

<code>-header "Authorization: Bearer JWT-TOKEN" \ </code>

| param | Description |
|-------|-------------|
| `id`  | User id     |

<h4>Response</h4>

| data        | Description                             |
|-------------|-----------------------------------------|
| `id`        | User ID                                 |
| `firstname` | firstname                               |
| `lastname`  | lastname                                |
| `status`    | 'active' OR 'pending'                   |
| `role`      | 'admin' or 'mechanic'                   |
| `email`     | email                                   |
| `createdAt` | created at (last updated (milliseconds) |
| `updatedAt` | last updated (milliseconds)             |

<h3>POST /v1/user </h3>
<h4>Request</h4>
<code>-header "Authorization: Bearer JWT-TOKEN" \ </code>

| data        | Description                             |
|-------------|-----------------------------------------|
| `email`     | email                                   |
| `password`  | password                                |
| `firstname` | firstname                               |
| `lastname`  | lastname(optional)                      |
| `status`    | 'active' OR 'pending'                   |
| `role`      | 'admin' or 'mechanic'                   |

<h4>Response</h4>

| data        | Description     |
|-------------|-----------------|
| `id`        | User ID         |

<h3>PUT /v1/user </h3>
<h4>Request</h4>
<code>-header "Authorization: Bearer JWT-TOKEN" \ </code>

| data        | Description                      |
|-------------|----------------------------------|
| `id`        | User id                          |
| `email`     | email   (optional)               |
| `password`  | password   (optional)            |
| `firstname` | firstname (optional)             |
| `lastname`  | lastname (optional)              |
| `status`    | 'active' OR 'pending' (optional) |
| `role`      | 'admin' or 'mechanic' (optional) |

<h4>Response</h4>

| data      | Description |
|-----------|-------------|
| `updated` | boolean     |

<h3>DELETE /v1/user/:id </h3>
<h4>Request</h4>
<code>-header "Authorization: Bearer JWT-TOKEN" \ </code>

| param | Description |
|-------|-------------|
| `id`  | User id     |

<h4>Response</h4>

| data      | Description |
|-----------|-------------|
| `deleted` | boolean     |
