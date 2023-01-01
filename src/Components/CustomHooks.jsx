import { useState, useEffect } from "react";

export const CustomHooks = (url) => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchFunction();
  }, [url]);

  const fetchFunction = () => {
    setLoad(true);
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setData(response.results);
      })
      .then(() =>
        setTimeout(() => {
          setLoad(false);
        }, 1000)
      )
      .catch((err) => console.error(err));
  };

  return { data, load };
};
