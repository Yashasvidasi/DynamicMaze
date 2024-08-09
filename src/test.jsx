import React, { useEffect } from "react";

const Getter = () => {
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return null; // or replace with appropriate JSX markup
};

export default Getter;
