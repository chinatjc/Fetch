const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {
		// 'cache-control': 'no-store'
	}};
	let responseBody = '';


	// console.log(request.url, +new Date());

	if (request.url === '/') {
		responseBody = fs.readFileSync('./index.html', 'utf-8');
		responseHead.options['content-type'] = 'text/html';
	} else if (request.url === '/request') {

		console.log('-----------------------------------');
		console.log(request.headers['user-agent']);

		responseBody = String(new Date());
	} else if (request.url === '/home') {
		responseBody = 'this is home!';
	} else if (request.url === '/page') {
		responseBody = 'this is page!';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
