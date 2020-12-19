import React, {useEffect, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';

const Orders = () => {
  const [orderId, setOrderId] = useState(0);
  const [orders, setOrders] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/orders");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      // console.log(e.data);
      setOrders(message);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const placeOrder = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: orderId})
    };
    fetch('http://localhost:8080/orders', requestOptions)
    setOrderId(orderId + 1);
  }

  return (
    <>
      <Button
        onClick={() => placeOrder()}
      >
        Order
      </Button>
      {orders.map(order => <span key={order}>{order} </span>)}
    </>
  )
}

export default Orders;
