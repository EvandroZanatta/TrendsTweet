# TrendsTweet

Sistema de tweets automático dos destaques do Google Trends.

## Gerando o docker

Crie a imagem com o seguinte comando

`docker build -t trendstweet/trendstweet .`

Crie um novo container

`docker run -p 49160:8080 -v "$PWD":/usr/src/app -t -i --name trendstweet  -d trendstweet/trendstweet`

Acesse o container

`docker attach trendstweet`

Execute a instalação das dependências do projeto

Para dev `npm install` ou produção `npm install --only=production`

Execute o projeto

`node server.js` 