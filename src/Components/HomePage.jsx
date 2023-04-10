import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CardListComponent from "./CardListComponent";
import { CustomHooks } from "./CustomHooks";
import { list } from "./WatchListContext";
import { useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const HomePage = ({ baseImg, baseUrl, queryUrl }) => {
  const prefered = useParams();
  const [page, setPage] = useState(1);
  let url = {
    url: "https://api.themoviedb.org/3/search/multi?api_key=2a590dc31c8c1b1df56b1c94ca625897&language=en-US&query=porn&page=1&include_adult=true",
  };

  let img = {
    img: "https://4kwallpapers.com/images/wallpapers/black-adam-2022-movies-dwayne-johnson-dc-comics-dc-4480x2520-8729.jpg",
  };
  if (prefered.name === "adult") {
    img = `https://images.unsplash.com/photo-1568383293350-156a59eb6491?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`;
    url = `https://api.themoviedb.org/3/search/multi?api_key=2a590dc31c8c1b1df56b1c94ca625897&language=en-US&query=porn&page=${page}&include_adult=true`;
  } else if (prefered.name === "kids") {
    img = `https://free4kwallpapers.com/uploads/originals/2015/10/23/cartoon-landscape.jpg`;
    url = `https://api.themoviedb.org/3/search/multi?api_key=2a590dc31c8c1b1df56b1c94ca625897&language=en-US&query=pixar&page=${page}&include_adult=false`;
  } else {
    url = baseUrl + prefered.name + queryUrl + `&page=${page}`;
    if (prefered.name === "top_rated") {
      img = `https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`;
    } else if (prefered.name === "popular") {
      img = `https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`;
    } else if (prefered.name === "upcoming") {
      img = `https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`;
    } else if (prefered.name === "now_playing") {
      img = `https://4kwallpapers.com/images/wallpapers/black-adam-2022-movies-dwayne-johnson-dc-comics-dc-4480x2520-8729.jpg`;
    }
  }

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data, load } = CustomHooks(url);

  let newData = data.filter(function (el) {
    return el.title !== undefined && el.poster_path !== null;
  });

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

  return (
    <>
      <div className="mt-4 container-fluid ">
        <div
          className="col banner-img  mx-auto"
          data-aos="zoom-out"
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
      </div>
      {!load ? (
        <>
          {prefered.name === "popular" ? (
            <h3 className="text-center movie-link-title mt-3">
              Popular Movies
            </h3>
          ) : prefered.name === "upcoming" ? (
            <h3 className="text-center movie-link-title mt-3">
              Upcoming Movies
            </h3>
          ) : prefered.name === "top_rated" ? (
            <h3 className="text-center movie-link-title mt-3">
              Top Rated Movies
            </h3>
          ) : prefered.name === "kids" ? (
            <h3 className="text-center movie-link-title mt-3">Kids Movies</h3>
          ) : prefered.name === "now_playing" ? (
            <h3 className="text-center movie-link-title mt-3">
              Top Streaming Movies
            </h3>
          ) : (
            <h3 className="text-center movie-link-title mt-3">Adult Channel</h3>
          )}{" "}
          <CardListComponent newData={newData} baseImg={baseImg} />
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
      ) : (
        <div className=" d-flex mx-auto text-center align-items-center justify-content-center m-5 ">
          <span class="loader"></span>
        </div>
      )}
    </>
  );
};

export default HomePage;
