import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { list } from "./WatchListContext";

export const NavBar = () => {
  const [search, setSearched] = useState("");
  const { num, setNmum } = useContext(list);

  const submitFunction = (e) => {
    e.preventDefault();
  };

  const [notify, setNotify] = useState("unnotify");
  const [notify2, setNotify2] = useState("uncount");

  useEffect(() => {
    if (num > 0) {
      setNotify("notify");
      setNotify2("count");
    } else {
      setNotify("unnotify");
      setNotify2("uncount");
    }
  });

  return (
    <div className="nav-container mx-auto d-flex justify-content-center">
      <nav className="navbar navbar-expand-xl d-flex mx-auto col-10 ">
        <div className="container-fluid text-center ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="fa-solid fa-bars"></i>
            <div
              className={`d-flex justify-content-center align-items-center ${notify}`}>
              {num}
            </div>
          </button>
          <Link
            to="/"
            className="navbar-brand"
            onClick={window.location.reload}>
            FILM-BLEND
          </Link>

          <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
            <form
              className="d-flex col-8  mx-auto col-xl-3 col-xxl-5"
              role="search"
              onSubmit={submitFunction}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Movie"
                aria-label="Search"
                value={search}
                required
                onChange={(e) => setSearched(e.target.value)}
              />
              <Link
                to={`/searched/${search}.`}
                className="btn btn-outline-light bg-light searchBtn"
                type="submit">
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              </Link>
            </form>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <Link to={`/popular`} className="nav-link">
                Popular
              </Link>

              <Link to="/top_rated" className="nav-link">
                Featured
              </Link>

              <Link to="/upcoming" className="nav-link ">
                Upcoming
              </Link>

              <Link to="/now_playing" className="nav-link ">
                Streaming
              </Link>
              <Link to="/kids" className="nav-link ">
                Kids
              </Link>
              <Link to="/adult" className="nav-link ">
                Adult
              </Link>
              <Link to="/watchlist" className="nav-link watchlist-nav">
                My WatchList <span className={`${notify2}`}>{num}</span>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
