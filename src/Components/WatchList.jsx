import React from "react";
import CardListComponent from "./CardListComponent";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { list } from "./WatchListContext";

const WatchList = ({ baseImg }) => {
  let data = JSON.parse(localStorage.getItem("data"));

  const { num, setNum } = useContext(list);

  const clearWatch = () => {
    localStorage.clear("data");
    setNum("");
  };

  return (
    <div className="container watchlist-container">
      {data !== null ? (
        <>
          <h2 className=" text-center">My WatchList</h2>
          <h6 className=" text-center">
            {data.length} Movies Added <br /> includes Duplicate
          </h6>
          <CardListComponent newData={data} baseImg={baseImg} />
          <button
            className="clear-watch mx-auto d-flex btn my-5"
            onClick={clearWatch}
          >
            Clear WatchList
          </button>
        </>
      ) : (
        <div className="discover mx-auto my-auto d-flex my-auto">
          <h1 className="text-center">No items added to WatchList</h1>
          <Link
            to="/popular"
            type="button"
            className=" btn btn-success text-center mx-auto"
          >
            Discover your Taste
          </Link>
        </div>
      )}
    </div>
  );
};

export default WatchList;
