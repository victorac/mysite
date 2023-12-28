const http = require("http");
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	res.sendFile("index.html", {root: __dirname});
});

const server = http.createServer();
server.on("request", app);
server.listen(PORT, () => {
	console.log(`server starter on port ${PORT}`);
});

const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({server});

wss.on("connection", function connection(ws) {
	const numClients = wss.clients.size;
	console.log("Clients connected", numClients);

	wss.broadcast(`Current visitors: ${numClients}`);

	if (ws.readyState === ws.OPEN) {
		ws.send("Welcome to my server");
	}

	ws.on("close", function close() {
		wss.broadcast(`Current visitors: ${numClients}`);
		console.log("A client has disconnected");
	});
});

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(client => client.send(data));
}
