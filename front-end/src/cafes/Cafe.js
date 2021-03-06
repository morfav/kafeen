import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
}));

const Cafe = () => {
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState({});
  const [drinks, setDrinks] = useState({});
  const [cafe, setCafe] = useState("");
  const ws = useRef(null);
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('http://localhost:8080/customers');
      const res = await data.json();
      setCustomer(res);
    }
    getData().catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('http://localhost:8080/orders');
      const res = await data.json();
      setOrders(res);
    }
    getData().catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:8080${location.pathname}`);
      const res = await data.json();
      setCafe(res);
    }
    getData().catch(err => console.log(err));
  }, [location.pathname]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('http://localhost:8080/drinks');
      const res = await data.json();
      setDrinks(
        res.reduce(
          (accumulator, currentValue) =>
            Object.assign(accumulator, {[currentValue._id]: currentValue.name}), {}));
    }
    getData().catch(err => console.log(err));
  }, []);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/orders");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      setOrders(message);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const placeOrder = (drinkId) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        customer: customer._id,
        drinks: [drinkId],
        cafe: cafe._id,
      })
    };
    fetch('http://localhost:8080/orders', requestOptions).catch(err => console.log(err));
  }

  return (
    <Container className={classes.root} maxWidth="sm">
      <h2>{cafe.name}</h2>
      {drinks
      && Object.keys(drinks).map(id =>
        (<Button
          onClick={() => placeOrder(id)}
          key={id}
        >
          {drinks[id]}
        </Button>))}
      {orders.map(order =>
        order.drinks.map((drink, i) =>
          <div key={order._id + `${i}`}>{drinks[drink]}</div>))}
    </Container>
  )
}

export default Cafe;
