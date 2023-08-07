import React from "react";

const Weatherbox = ({ weather, handleCityChange }) => {
  console.log(weather);

  let celsiusTemp = weather?.main?.temp; // temp오류 해결
  let roundFahrenheitTemp = (celsiusTemp * 1.8 + 32).toFixed(2);

  return (
    <div className="box">
      <h2>
        {weather?.sys?.country} : {/* country오류 해결 */}
        {weather?.name || "날씨를 가져오는데 실패했습니다."}
      </h2>
      <br></br>
      {weather?.weather && weather.weather.length > 0 && (
        // 0타입오류 해결
        <h5>
          <span className="celsius">섭씨온도 : {celsiusTemp}C </span>
          <span className="Fahrenheit">
            / 화씨온도 : {roundFahrenheitTemp}°F
          </span>
        </h5>
      )}
      <br></br>
      {weather?.weather && weather.weather.length > 0 && (
        <h4 className="cloud">
          날씨 : {weather && weather?.weather[0]?.description}
        </h4>
      )}
    </div>
  );
};

export default Weatherbox;
