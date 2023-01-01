import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const CardListComponent = ({ newData, baseImg }) => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <div className="main-container-navigate container">
      <div>
        <div className="container  main-search-container">
          {newData.length == 0 ? (
            <h1 className=" row  search-container">No Results Found</h1>
          ) : (
            <div className=" row  gx-0">
              {newData.map((data) => {
                return (
                  <Link
                    data-aos="flip-left"
                    key={data.id}
                    to={`/detail/${data.id}`}
                    className=" col mx-auto gx-0 gy-4">
                    <div
                      className="mx-auto  card-link"
                      style={{
                        backgroundImage: `url(${baseImg + data.poster_path})`,
                        width: "9rem",
                        height: "16rem",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        borderRadius: "10px",
                      }}></div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardListComponent;
