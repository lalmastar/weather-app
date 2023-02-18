import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./details.css";

function Details() {
  const { cityname } = useParams();
  const [currentData, setCurrentData] = useState("");
  const [foreCastData, setForeCastData] = useState("");
  const API_KEY = "668a14a241e8323d96804226db1da03c";
  async function fetchData() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${API_KEY}`
    );

    const data = await response.json();
    const cResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`
    );
    const cData = await cResponse.json();
    setCurrentData(cData);
    setForeCastData(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="main">
      <h3 id="header">Weather Channel</h3>
      <div className="homeContainer">
        <div className="screens">
          <div>
            <NavLink to="/">
              <h3>Home</h3>
            </NavLink>
          </div>
          <div>
            {" "}
            <NavLink to="/citysearch">
              <h3>Search</h3>
            </NavLink>
          </div>
          <div>
            <h3 style={{ color: "yellow" }}>Details</h3>
          </div>
        </div>
        <h3 className="det">{cityname.toUpperCase()} </h3>

        <div className="foreCastContainer">
          {currentData ? (
            <div className="indForeCast" id="cdetails">
              <h4>{`${new Date().toLocaleDateString().split("/").join("-")} / ${
                new Date().toLocaleTimeString().split(":")[0]
              }:${new Date().toLocaleTimeString().split(":")[1]}`}</h4>
              <img
                src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
              ></img>
              <h4>
                {(currentData.main.temp - 273.15).toFixed(0)}
                <sup>o</sup>c{" "}
              </h4>
              <h4>{currentData.weather[0].main}</h4>
            </div>
          ) : (
            ""
          )}
          {foreCastData
            ? foreCastData.list.map((elem, index) => {
                return (
                  <div className="indForeCast" key={index}>
                    <h4>{`${elem.dt_txt.split(" ")[0]}  / ${
                      elem.dt_txt.split(" ")[1].split(":")[0]
                    }:00`}</h4>
                    <img
                      src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}
                    ></img>
                    <h4>
                      {(elem.main.temp - 273.15).toFixed(0)}
                      <sup>o</sup>c{" "}
                    </h4>
                    <h4>{elem.weather[0].main}</h4>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Details;
