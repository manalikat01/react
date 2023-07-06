import "./App.css";
import Albums from './types/Album';
import { useEffect, useState } from "react";

export default function App() {
  const [apiResponse, setState] = useState<Array<Albums>>([]);
  const [activeCount, setCount] = useState<number | null>();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.text())
      .then((data) => setState(JSON.parse(data)));
  }, []);

  function handleClick(val: any) {
    setCount(val?.userId)
    const newObjectArr = apiResponse.map((p: any) =>
      p.id == val.id
        ? { ...p, isViewed: p.id == val.id && !val.isViewed }
        : { ...p }
    );
    setState(
      newObjectArr
    )
  }

  function returnCount(count: any) {
    return apiResponse.filter((val) => (val?.userId === count && !val?.isViewed))?.length
  }

  function returnItems() {
    return apiResponse.filter((val) => (val?.userId === activeCount && !val?.isViewed))
  }

  function handleChange(e: any) {
    if (e.target.value.length > 3)
      setState(apiResponse.filter((val) => (val?.title.includes(e.target.value))))
  }

  return <div className="App">

    <div className="search-container">
      <div>
        Logo
      </div>
      <input type='text' onChange={(e) => handleChange(e)} placeholder="Search" />
    </div>    
    
    <div className="wrapper">
      {apiResponse.map((val, index) => {
        return (
          <div key={index} className={val?.isViewed ? 'first-level-card-selected' : 'first-level-card'} onClick={() => handleClick(val)}>
            <span>UserID: {val?.id}</span>
            <span className="badge">{returnCount(val?.userId)}</span>
          </div>
        );
      })}

    </div>
    <p>
      <b>Section Title</b>
    </p>
    <div className="title-wrapper">
      {returnItems().map((p, i) => {
        return <span className='title' key={i}>{p.title}</span>
      })}
    </div>
  </div>;
}