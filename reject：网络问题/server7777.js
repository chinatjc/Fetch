const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {
		'cache-control': 'no-store'
	}};
	let responseBody = '';

	if (request.url === '/') {
		responseBody = fs.readFileSync('./index.html', 'utf-8');
		responseHead.options['content-type'] = 'text/html';
	} else if (request.url === '/request') {
		// content-type，仅限于：application/x-www-form-urlencoded、multipart/form-data、text/plain，其他值需要通过 'Access-Control-Allow-Headers' 来设置
		responseBody = 'this is response!';
	}

	if (request.url === '/request') {
	} else {
		response.writeHead(responseHead.code, responseHead.options)
		response.end(responseBody);
	}
}).listen(7777);
