import React, { useEffect, useState } from "react";
import dummydata from "../dummydata";
import "./home.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCity, intialUpdate } from "../../redux/action/action";
import Button from 'react-bootstrap/Button';
const API_KEY = "668a14a241e8323d96804226db1da03c";

function Home() {
  const item = localStorage.getItem("weatherapp");
  const [weatherData, setWeatherData] = useState(dummydata);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const dispatcher = useDispatch();
  const favList = useSelector((store) => {
    return store.favReducer;
  });

  if (!item) {
    localStorage.setItem("weatherapp", JSON.stringify([]));
  }

  useEffect(() => {
    let timerid = setTimeout(() => {
      dispatcher(intialUpdate(JSON.parse(item)));
    }, 1000);
    return function () {
      clearTimeout(timerid);
    };
  }, []);

  useEffect(() => {
    let timerid = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return function () {
      clearInterval(timerid);
    };
  }, []);

  const [current_location, setCurrent_location] = useState({
    longitude: 23,
    latitude: 23,
    isAvailable: false,
  });

  if (!current_location.isAvailable) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        setCurrent_location({
          longitude: data.coords.longitude,
          latitude: data.coords.latitude,
          isAvailable: true,
        });
      });
    } else {
      alert("Geo loaction not supported by the device");
    }
  }
  async function fetchData() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${current_location.latitude}&lon=${current_location.longitude}&appid=${API_KEY}`
    );
    const data = await response.json();
    setWeatherData(data);
  }

  useEffect(() => {
    fetchData();
  }, [current_location]);

  function removeFav(city) {
    dispatcher(removeCity(city));
  }

  return (
    <>
      <div className="main">
        <h1 id="header">Weather App</h1>
        <div className="homeContainer">
          <div className="screens">
            <div>
              <h3 style={{ color: "yellow" }}>Home</h3>
            </div>
            <div>
              {" "}
              <NavLink to="/citysearch">
                <h3>Search</h3>
              </NavLink>
            </div>
            <div>
              <h3>Details</h3>
            </div>
          </div>
          <div className="currentLocation">
            <NavLink to={`/details/${weatherData.name}`}>
              <h3>{` ${weatherData.name} / ${weatherData.sys.country}`}</h3>
            </NavLink>
            <p className="p-tag">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              ></img>
            </p>
            <p className="p-tag">{time}</p>
            <h4>
              {`${(weatherData.main.temp - 273.15).toFixed(0)} `}
              <sup>o</sup> {`c / ${weatherData.weather[0].description}`}
            </h4>
          </div>
          <div className="favList">
            {favList.map((elem, index) => {
              return (
                <div key={index} className="favDiv">
                  <div>
                    <NavLink to={`/details/${elem}`}>
                      <p className="p-tag" id="cityName">{elem.toUpperCase()}</p>
                    </NavLink>
                  </div>
                  {/* <button></button> */}
                  <div id="button">
                    <Button variant="primary"
                      id="favListbutton"
                      onClick={() => {
                        removeFav(elem);
                      }}
                    >
                      Remove Favorite
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
