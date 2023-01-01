import React from "react";
import { list } from "./WatchListContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import CardListComponent from "./CardListComponent";
import { CustomHooks } from "./CustomHooks";

const Searched = ({ baseImg }) => {
  const search = useParams();

  const url = `https://api.themoviedb.org/3/search/multi?api_key=2a590dc31c8c1b1df56b1c94ca625897&language=en-US&query=${search.name}&page=1&include_adult=false`;

  const { data, load } = CustomHooks(url);

  let newData = data.filter(function (el) {
    return el.poster_path !== null && el.media_type !== "tv";
  });

  const { num, setNum } = useContext(list);
  if (JSON.parse(localStorage.getItem("data")) !== null) {
    setNum(JSON.parse(localStorage.getItem("data")).length);
  }

  return (
    <div className="mt-5 search-container">
      {load ? (
        <div className="load">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3f3a3831234507.564a1d2338123.gif"
            alt=""
          />
        </div>
      ) : (
        <>
          <CardListComponent baseImg={baseImg} newData={newData} />
        </>
      )}
    </div>
  );
};

export default Searched;
