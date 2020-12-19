import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

const Orders = () => {
  const [orderId, setOrderId] = useState(0);

  const placeOrder = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId })
    };
    fetch('http://localhost:8080/orders', requestOptions)
    setOrderId(orderId + 1);
  }

  return(
    <Button
      onClick={() => placeOrder()}
    >
      Order
    </Button>)
}

export default Orders;
