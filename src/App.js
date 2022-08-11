import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("tunisia");
  const [photos, setPhotos] = useState([]);


  const ifClicked = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=f825344b0cf0672c689378549f9868db&units=metric`
      )
      .then((res) => {
        console.log("res", res.data);
        setWeather(res.data);
      }).catch = (err) => {
      // Handle error
      console.log(err);
    };
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${locations}&client_id=2nQAGVJ7BSIQWEzXLmp-JARSLT2r1M4Imn_LQPkSDlE`
      )
      .then((res) => {
        setPhotos(res.data.results[0].urls.raw);
      }).catch = (err) => {
      // Handle error
      console.log(err);
    };
  };
  console.log(weather);
  useEffect(() => {
    ifClicked();
  }, [photos]);
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">
            <p className="day">
              {moment().format("dddd")}, <span>{moment().format("LL")}</span>
            </p>
            <span class="iconify" data-icon="fa-solid:temperature-high"></span>
            Temperatu: {weather?.main?.temp} &deg;C
            <p>
              <span class="iconify" data-icon="wi:humidity"></span> Humidity:{" "}
              {weather?.main?.humidity}%{" "}
            </p>
            <p>
              <span class="iconify" data-icon="bi:wind"></span> Wend:{" "}
              {weather?.wind?.speed}%
            </p>
          </p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;
