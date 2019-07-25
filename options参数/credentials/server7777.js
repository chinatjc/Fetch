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
		console.log(request.url);
		console.log(request.headers.cookie);

		// 允许任何域访问
		responseHead.options['Access-Control-Allow-Origin'] = 'http://www.autohome.com.cn:7777';
		// 跨域访问，默认只支持 'GET, POST, HEAD' 方法，其他方法需要通过 'Access-Control-Allow-Methods' 来设置
		responseHead.options['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
		// content-type，仅限于：application/x-www-form-urlencoded、multipart/form-data、text/plain，其他值需要通过 'Access-Control-Allow-Headers' 来设置
		responseHead.options['Access-Control-Allow-Headers'] = 'Content-Type';
		// 跨域访问，是否可以允许发送cookie
		responseHead.options['Access-Control-Allow-Credentials'] = true;

		responseBody = 'this is response!';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
