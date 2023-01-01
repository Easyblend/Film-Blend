import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactPlayer from "react-player/youtube";
import { list } from "./WatchListContext";
import { useContext } from "react";
import { useEffect } from "react";

const Detail = ({ baseImg }) => {
  const choosenMovie = useParams();
  const [fetchData, setFetchData] = useState([]);
  const [load, setLoad] = useState(true);
  const [profile, setProfile] = useState([]);

  React.useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  async function getDetail() {
    setLoad(true);
    let respond = await fetch(
      `https://api.themoviedb.org/3/movie/${choosenMovie.id}?api_key=2a590dc31c8c1b1df56b1c94ca625897&language=en-US`
    );
    let result = await respond.json();
    setFetchData(result);
    let videoLink = await fetch(
      `https://api.themoviedb.org/3/movie/${result.id}/videos?api_key=2a590dc31c8c1b1df56b1c94ca625897&language=en-US`
    );
    let resultLink = await videoLink.json();
    setData(resultLink.results);
    setLoad(false);

    let profilefetch = await fetch(
      `https://api.themoviedb.org/3/movie/${result.id}/credits?api_key=2a590dc31c8c1b1df56b1c94ca625897&language=en-US`
    );
    let profile = await profilefetch.json();
    setProfile(profile.cast);
  }

  const [data, setData] = useState([]);

  let pickTrailer = data.filter(function (el) {
    return el.type === "Trailer";
  });
  const { num, setNum } = useContext(list);

  const addItem = () => {
    if (localStorage.getItem("data") == null) {
      localStorage.setItem("data", "[]");
    }

    let old = JSON.parse(localStorage.getItem("data"));
    old.push(fetchData);
    localStorage.setItem("data", JSON.stringify(old));
    setNum(JSON.parse(localStorage.getItem("data")).length);
  };
  if (JSON.parse(localStorage.getItem("data")) !== null) {
    setNum(JSON.parse(localStorage.getItem("data")).length);
  }

  const newData = pickTrailer.slice(0, 3);

  let newProfile = profile.filter(function (el) {
    return el.profile_path !== null;
  });

  return (
    <div className="container">
      {load ? (
        <div className="load">
          <img src="https://i.stack.imgur.com/hzk6C.gif" alt="" />
        </div>
      ) : (
        <div className=" container detail-container mt-5 pt-5 gt-5">
          <h1 className="text-center">{fetchData.title}</h1>
          <div className=" card-detail row justify-content-center">
            <div className="col-12 col-lg-4 original-column column-1">
              <img
                className="banner"
                src={baseImg + fetchData.poster_path}
                alt="Thumbnails"
                height="100%"
                width="100%"
              />
              {newData[0] !== undefined ? (
                <a
                  href={`https://www.youtube.com/watch?v=${newData[0].key}`}
                  className="btn bg-light mx-auto justify-content-center d-flex my-3 fs-5">
                  Watch Trailer
                </a>
              ) : (
                <></>
              )}
              <button
                type="button"
                className="btn  mx-auto d-flex justify-content-center watchlist-btn my-4
                "
                onClick={addItem}>
                Add to WatchList
              </button>
            </div>
            <div className="col-lg-4 col-12 yt-player original-column column-2">
              {newData.length !== 0 ? (
                newData.map((thumbs) => {
                  return (
                    <ReactPlayer
                      key={thumbs.key}
                      url={`https://www.youtube.com/watch?v=${thumbs.key}`}
                      height="15rem"
                      width="80%"
                      controls={true}
                      className="mx-auto d-flex my-3  yt-player-each"
                    />
                  );
                })
              ) : (
                <img
                  src="https://cdn3.vectorstock.com/i/thumb-large/51/72/no-photo-available-icon-default-image-symbol-vector-40885172.jpg"
                  alt=""
                  className="mx-auto d-flex my-3  yt-player-each"
                  data-aos="zoom-out"
                />
              )}
            </div>
            <div className="col-lg-4 col-12 original-column  column-3">
              <div className="movie-info-container d-flex">
                <div className="movie-info col-lg-5 col-4">
                  <h5 data-aos="fade-right" className="mb-xl-5 mb-4">
                    Released :
                  </h5>
                  <h5 data-aos="fade-right" className="mb-xl-5 mb-4">
                    Runtime :
                  </h5>
                  <h5 data-aos="fade-right" className="mb-xl-5 mb-4">
                    Ratings :
                  </h5>
                  <h5 data-aos="fade-right" className="mb-xl-5 mb-4">
                    Language :
                  </h5>
                  <h5 data-aos="fade-right" className="mb-xl-5 mb-4">
                    Genres:
                  </h5>
                </div>
                <div className="movie-info col-lg-7 col-8 ">
                  <h5 className="mb-xl-5 mb-4">
                    <span>{fetchData.release_date}</span>
                  </h5>
                  <h5 className="mb-xl-5 mb-4">
                    <span>{fetchData.runtime} Minutes</span>
                  </h5>
                  <h5 className="mb-xl-5 mb-4">
                    <span>{fetchData.vote_average}</span>
                  </h5>
                  <h5 className="mb-xl-5 mb-4">
                    {fetchData.spoken_languages[0] !== undefined ? (
                      fetchData.spoken_languages.map((language) => {
                        return (
                          <span className="genre" key={language.id}>
                            {language.name},
                          </span>
                        );
                      })
                    ) : (
                      <span>Nudity Content</span>
                    )}
                  </h5>
                  <h5>
                    {fetchData.genres.map((genre) => {
                      return <span key={genre.id}> {genre.name}, </span>;
                    })}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <h1 className=" fs-4 mt-5">Description</h1>
          <p className="col description-section">{fetchData.overview}</p>
          <div className="profile-container row justify-content-center  text-center">
            <h1>Actors</h1>
            {newProfile.map((pic) => {
              return (
                <div key={pic.id} className="col profile-detail ">
                  <img
                    data-aos="flip-left"
                    src={baseImg + pic.profile_path}
                    className="profile-img"
                    height="140px"
                    width="100px"
                    alt="missing"
                  />
                  <p>
                    {pic.name} As {pic.character}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
