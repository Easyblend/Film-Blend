import React from "react";
import { CustomHooks } from "./CustomHooks";
import CardListComponent from "./CardListComponent";
import { useState } from "react";
import { list } from "./WatchListContext";
import { useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const NowStreaming = ({ baseImg }) => {
  const [page, setPage] = useState(1);

  let url = `https://api.themoviedb.org/3/trending/all/day?api_key=2a590dc31c8c1b1df56b1c94ca625897&page=${page}`;
  const { data, load } = CustomHooks(url);

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };
  const { num, setNum } = useContext(list);
  if (JSON.parse(localStorage.getItem("data")) !== null) {
    setNum(JSON.parse(localStorage.getItem("data")).length);
  }

  let newData = data.filter(function (el) {
    return el.title !== undefined && el.poster_path !== null;
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {load ? (
        <div className="load">
          <span class="loader"></span>
        </div>
      ) : (
        <>
          <div className="mt-4 container-fluid ">
            <div
              data-aos="zoom-out"
              className="col banner-img  mx-auto"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)`,
              }}
            ></div>
          </div>
          <CardListComponent baseImg={baseImg} page={page} newData={newData} />
          <div className="d-flex justify-content-center mx-auto">
            {page > 1 ? (
              <button
                className="btn bg-light mx-auto d-flex my-3"
                onClick={previousPage}
              >
                Previous Page
              </button>
            ) : (
              <button className="d-none"></button>
            )}
            {page < 100 ? (
              <button
                className="btn bg-light mx-auto d-flex my-3"
                onClick={nextPage}
              >
                Next Page
              </button>
            ) : (
              <button className="d-none"></button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default NowStreaming;
