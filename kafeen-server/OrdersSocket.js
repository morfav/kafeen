const WebSocket = require('ws');

const ws = new WebSocket.Server({ noServer: true });

let ordersWs;
function onUpgrade (request, socket, head) {
  // console.log(request.url);
  // const pathname = new url.URL(request.url).pathname;
  // console.log(pathname);
  if (request.url === '/orders') {
    ws.handleUpgrade(request, socket, head, function done (activeWs) {
      activeWs.emit('connection', ws, request);
      ordersWs = activeWs;
    });
  } else {
    socket.destroy();
  }
}

const sendOrders = (data) => {
  // ordersWs.send(data);
  ws.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

module.exports = { sendOrders, onUpgrade };
