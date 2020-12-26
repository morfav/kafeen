const WebSocket = require('ws');
const { Order, ordersEmitter } = require('./order.model');

ordersEmitter.on('ordersChanged', async () => {
  const orders = await Order.find().exec();
  sendOrders(JSON.stringify(orders));
});

const ws = new WebSocket.Server({ noServer: true });

function onUpgrade (request, socket, head) {
  // console.log(request.url);
  // const pathname = new url.URL(request.url).pathname;
  // console.log(pathname);
  if (request.url === '/orders') {
    ws.handleUpgrade(request, socket, head, function done (activeWs) {
      activeWs.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
}

const sendOrders = (data) => {
  ws.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

exports.onUpgrade = onUpgrade;
