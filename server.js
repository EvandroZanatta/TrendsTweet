'use strict';

const express = require('express');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database();

var request = require("request");


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
	res.send('Hello world\n');
});

app.get('/install', (req, res) => {
	res.send('Instalado\n');
});

/*
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

  console.log("Titulo:" + result[0]['articles'][0]['articleTitle']);
  console.log("URL:" + result[0]['articles'][0]['articleTitle']);
  console.log("Hastags: #" + result[0]['entityNames'][0] + " #" + result[0]['entityNames'][1]);
});
*/


//https://trends.google.com.br/trends/api/stories/latest?hl=pt-BR&tz=120&cat=b&fi=15&fs=15&geo=BR&ri=300&rs=15&sort=0


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

//http://www.sqlitetutorial.net/sqlite-create-table/

//https://alvinalexander.com/android/sqlite-create-table-insert-syntax-examples