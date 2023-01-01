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
  const query_url = process.env.REACT_APP_API_KEY;
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
