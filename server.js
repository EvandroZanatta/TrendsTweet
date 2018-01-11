'use strict';

const express = require('express');
var request = require("request");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('posts.db');

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS posts \
		( \
			id integer PRIMARY KEY, \
			id_post text NOT NULL, \
			time_int integer NOT NULL)\
		");
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
	res.send('Hello world\n');
});

var options = { method: 'GET',
  url: 'https://trends.google.com.br/trends/api/stories/latest',
  qs: 
   { hl: 'pt-BR',
     tz: '120',
     cat: 'b',
     fi: '15',
     fs: '10',
     geo: 'BR',
     ri: '3',
     rs: '3',
     sort: '0' },
  headers: 
   {'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	var result = JSON.parse(body.slice(5));
	result = result['storySummaries']['trendingStories'];

	/*
	console.log("Titulo:" + result[0]['articles'][0]['articleTitle']);
	console.log("URL:" + result[0]['articles'][0]['articleTitle']);
	console.log("Hastags: #" + result[0]['entityNames'][0] + " #" + result[0]['entityNames'][1]);
	*/
	
	var idTrendsPosts = result[0]['id'];

	// busca por todas as linhas que possuem o id do post
	db.all("SELECT id_post FROM posts WHERE id_post = '" + idTrendsPosts + "'", function(err, allRows) {

		// Se nao existir no banco o id registrado
		if(allRows.length == 0){

			// insere no banco de dados
			db.serialize(function() {
				db.run("INSERT INTO posts (id_post, time_int) VALUES (?, ?)", [idTrendsPosts, Date.now()]);
			});

			// AQUI CHAMA A FUNCAO DE POST
		}
	});

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

/* LINKS DE APOIO */

//http://www.sqlitetutorial.net/sqlite-create-table/

//https://alvinalexander.com/android/sqlite-create-table-insert-syntax-examples

//https://trends.google.com.br/trends/api/stories/latest?hl=pt-BR&tz=120&cat=b&fi=15&fs=15&geo=BR&ri=300&rs=15&sort=0