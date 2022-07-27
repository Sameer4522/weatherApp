import React, { useEffect, useState } from "react";
import "./styles.css";
import WeatherCard from "./weatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("mumbai");
  const [tempInfo, setTempInfo] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7db246c0e01fea10f14db00cb9482e9a
`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const newWeatherInfo = {
        temp,
        pressure,
        humidity,
        weathermood,
        speed,
        name,
        country,
        sunset,
      };

      setTempInfo(newWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="
        Search ..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
