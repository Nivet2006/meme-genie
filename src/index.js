const fetch = require('isomorphic-fetch');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const url = 'https://www.memedroid.com/search?query=programming'

const express = require('express');
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/', (req, res) => {

	fetch(url)
	.then(res => res.text())
	.then(text => {
		const dom = new JSDOM(text);
		let list = (dom.window.document.querySelectorAll('.item-aux-container > a > img[src]'))
		let index = Math.floor((Math.random()*list.length));
		let url =  list[index].src;

		fetch(url)
		.then(response => response.buffer())
		.then(buffer => {
			fs.writeFile('./meme.jpeg', buffer, () => {
				console.log('finished downloading!')
				res.sendFile('meme.jpeg', { root: __dirname })
			});
		})
	})
});

app.listen(3000, () => {
  console.log('server started');
});

