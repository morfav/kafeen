import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
}));

const Cafes = () => {
  const [cafes, setCafes] = useState();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('http://localhost:8080/cafes');
      const res = await data.json();
      setCafes(res);
    }
    getData()
      .catch(err => console.log(err));
  }, []);

  const navigateToCafe = cafeId => {
    history.push(`/cafes/${cafeId}`);
  }

  return (
    <Container className={classes.root} maxWidth="sm">
      <h2>Get coffee near you</h2>
      {cafes && cafes.map(cafe =>
        (
          <Button
            onClick={() => navigateToCafe(cafe._id)}
            key={cafe._id}
            fullWidth
          >
            {cafe.name}
          </Button>
        ))}
    </Container>
  )
}

export default Cafes;
