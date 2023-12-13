import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const Loaders = () => (
  <>
    <img src="https://i.gifer.com/ZKZg.gif" alt="loader" width={50} />
    <img src={logo} className="App-logo" alt="logo" width={50} />
  </>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products"); // faking an async call to a server
      const json = await response.json();
      console.log(json);

      const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let shuffled = shuffle([...sortedArray]);
      // faking a heavy sync task
      while (shuffled.toString() !== sortedArray.toString()) shuffle(shuffled);

      setData(shuffled);
      setIsLoading(false);
    };

    fetchData();

    return () => {};
  }, []);

  return isLoading ? (
    <>
      <Loaders />
      Loading...
    </>
  ) : (
    <>
      <Loaders />
      Loaded {JSON.stringify(data)}
    </>
  );
}

export default App;
