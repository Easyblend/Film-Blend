import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import NowStreaming from "./Components/NowStreaming";
import Searched from "./Components/Searched";
import Detail from "./Components/Detail";
import WatchList from "./Components/WatchList";
import { list } from "./Components/WatchListContext";

const App = () => {
  const base_url = "https://api.themoviedb.org/3/movie/";
  const query_url = "?api_key=2a590dc31c8c1b1df56b1c94ca625897"; //process.env.REACT_APP_API_KEY; //Insert your own API key here
  const base_img = "https://image.tmdb.org/t/p/w500";

  const [num, setNum] = useState("");

  return (
    <div className="">
      <list.Provider value={{ num, setNum }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<NowStreaming baseImg={base_img} />} />
          <Route
            path=":name"
            element={
              <HomePage
                baseImg={base_img}
                baseUrl={base_url}
                queryUrl={query_url}
              />
            }
          />
          <Route
            path="/searched/:name"
            element={<Searched baseImg={base_img} />}
          />
          <Route path="detail/:id" element={<Detail baseImg={base_img} />} />
          <Route path="watchlist" element={<WatchList baseImg={base_img} />} />
          <Route path="*" element={<NowStreaming baseImg={base_img} />} />
        </Routes>
      </list.Provider>
    </div>
  );
};

export default App;
