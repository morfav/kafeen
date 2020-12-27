import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';

const Cafes = () => {
  const [cafes, setCafes] = useState();
  const history = useHistory();

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
    console.log(`Navigating to cafe /${cafeId}`);
    history.push(`/cafes/${cafeId}`);
  }

  return (
    <>
      {cafes && cafes.map(cafe =>
        (<Button
          onClick={() => navigateToCafe(cafe._id)}
          key={cafe._id}
        >
          {cafe.name}
        </Button>))}
    </>
  )
}

export default Cafes;
