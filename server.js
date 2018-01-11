'use strict';

/* --- Chamada package necessarios --- */
require('dotenv').config()
var request = require("request");
var sqlite3 = require('sqlite3').verbose();
var Twitter = require('twitter');

/* --- Configuracoes do projeto --- */

var client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var db = new sqlite3.Database('posts.db');

var options = { method: 'GET',
  url: 'https://trends.google.com.br/trends/api/stories/latest',
  qs: 
   { hl: 'pt-BR',
     tz: '120',
     cat: 't',
     fi: '15',
     fs: '10',
     geo: 'BR',
     ri: '3',
     rs: '3',
     sort: '0' },
  headers: 
   {'cache-control': 'no-cache' } };

/* --- Criacao do banco na primeira execucao --- */

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS posts \
		( \
			id integer PRIMARY KEY, \
			id_post text NOT NULL, \
			time_int integer NOT NULL)\
		");
});

/* --- Funcoes do projeto --- */

function postTweet(msg){
	client.post('statuses/update', {status: msg}, function(error, tweet, response) {
		if (error) {
			console.log(error);
		}
	});
}

function getTrendsPost(){

	// faz a chamada na API do Google Trends para pegar os posts
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
			
		var result = JSON.parse(body.slice(5));
		result = result['storySummaries']['trendingStories'];

		// percorre todos os posts
		for (let index = 0; index < 3; index++) {
		
			var idTrendsPosts = result[index]['id'];
			
			// busca por todas as linhas que possuem o id do post
			db.all("SELECT id_post FROM posts WHERE id_post = '" + idTrendsPosts + "'", function(err, allRows) {
				
				// Se nao existir no banco o id registrado
				if(allRows.length == 0){

					// insere no banco de dados
					db.serialize(function() {
						db.run("INSERT INTO posts (id_post, time_int) VALUES (?, ?)", [idTrendsPosts, Date.now()]);
					});

					// Pegar os dados e gera o tweet
					var hash1 = result[index]['entityNames'][0].replace(/[^a-zA-Z]/g, "");
					var hash2 = result[index]['entityNames'][1].replace(/[^a-zA-Z]/g, "");
					var contentPost = result[index]['articles'][0]['articleTitle'] + " #" + hash1 + " #" + hash2 + " " + result[index]['articles'][0]['url'];

					// faz o POST do tweet
					postTweet(contentPost);
				}
			});
		}

	});
}
	
/* --- Autorun --- */

console.log("RUN...");

// Chama a funcao para postar
getTrendsPost();

// a cadas 2 minutos refaz a chama de post
setInterval(function(e){
	getTrendsPost();
}, 180000);