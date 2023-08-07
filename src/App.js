import "./App.css";
import Weatherbox from "./component/Weatherbox";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Weatherbutton from "./component/Weatherbutton";
import ClipLoader from "react-spinners/ClipLoader";
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [apiError, setAPIError] = useState("");
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const cityList = [
    "Seoul",
    "New York",
    "Tokyo",
    "Paris",
    "London",
    "Beijing",
    "Jerusalem",
    "Africa",
    "Moscow",
    "Berlin",
    "Gyeonggi-do",
    "Gangwon-do",
    "Incheon",
  ];
  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(getCurrentLocation()); // 날씨를 가져오지 못하는(404) 오류 해결
    } else {
      setCity(city);
    }
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=886ffd837002a57c740e59725765393d&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };
  const getWeatherByCity = async () => {
    try {
      if (city === "current") {
        getCurrentLocation(); // 현재 위치의 날씨 정보 가져오기
        return;
      }

      if (!city) {
        // city가 null이면 API 호출을 하지 않고 종료
        return;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=886ffd837002a57c740e59725765393d&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="main">
          <ClipLoader color="red" loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className="main">
          <Weatherbox weather={weather} />
          <Weatherbutton
            cityList={cityList}
            setCity={setCity}
            handleCityChange={handleCityChange}
          />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
