const http = require("http");

http.createServer(function(req, res) {
	res.write(`<!DOCTYPE html><h1>Hello world!</h1>`);
	res.end();
}).listen(3000);
console.log("Server started on port 3000");
