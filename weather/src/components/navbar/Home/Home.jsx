import React from "react";
import "../Home/Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbHaze, TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
// 0bf05978ce858b9ae276d4804667688a

const API_KEY = "0bf05978ce858b9ae276d4804667688a";

const Home = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("mumbai");
  const [inputvalue, setinputvalue] = useState("");
  const [animate, setanimate] = useState(false);
  const [loading, setloading] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState('');

  const handalinput = (e) => {
    setinputvalue(e.target.value);
  };

  //   console.log(inputvalue);
  const handalsumbit = (e) => {
    e.preventDefault();

    // console.log(inputvalue);
    if (inputvalue !== "") {
      setLocation(inputvalue);
    }

    const input = document.querySelector("input");
    if (input.value === "") {
      setanimate(true);
      setTimeout(() => {
        setanimate(false);
      }, 500);
    }
    input.value = "";
  };
  useEffect(() => {
    setloading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    axios.get(url).then((res) => {
      setTimeout((res) => {
        // setData(res.data);
        setloading(false);
      }, 1500);
      setData(res.data); //for spinner off
    }).catch(err=>{
        setloading(false)
        setErrorMsg(err)
    })
  }, [location]);


useEffect(()=>{
const timer=setTimeout(()=>{
setErrorMsg('')
},2000)
return ( )=>clearTimeout(timer)

},[ErrorMsg])

  if (!data) {
    return (
      <div>
        <div>
          //for spinner off
          <ImSpinner8 className="" />
        </div>
      </div>
    );
  }
  let icon;

  console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;

    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;

    case "Rain":
      icon = <IoMdRainy />;
      break;

    case "Clear":
      icon = <IoMdSunny />;
      break;

    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;

    case "Snow":
      icon = <IoMdSnow />;
      break;

    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }
  console.log(data);
  //   date object

  const date = new Date();
  return (
    <div id="home_main">
    
        {ErrorMsg && <div>{`${ErrorMsg.response.data.message}`}</div>}
      {/* {form} */}
      <form>
        <div>
          <input
            onChange={(e) => handalinput(e)}
            type="text"
            placeholder="Search by city or country"
          />
          <button onClick={(e) => handalsumbit(e)}>
            <IoMdSearch />
          </button>
        </div>
      </form>
      {/* {card} */}
      <div>
        {loading ? <div>
            <ImSpinner8/>
        </div> : <div>

            </div>}
        {/* {card top} */}

        <div>
          <div>{icon}</div>
          {/* content name */}
          <div>
            <div>
              {data.name},{data.sys.country}
            </div>
            {/* date */}
            <div>
              {date.getUTCDate()}/{date.getUTCMonth() + 1}/
              {date.getUTCFullYear()}
            </div>
          </div>
        </div>
        {/* {card body} */}
        <div>
          <div>
            {/* temp */}
            <div>{parseInt(data.main.temp)}</div>
            {/* celsius icon */}
            <div>
              <div>
                <TbTemperatureCelsius />
              </div>
            </div>
            {/* wether disciption */}
            <div>{data.weather[0].description}</div>
          </div>
        </div>

        {/* {card bottom} */}
        <div>
          <div>
            <div>
              {/* icon */}
              <div>
                <BsEye />
              </div>
              <div>
                Visbilty<span>{data.visibility / 1000}km</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              {/* icon */}
              <div>
                <BsThermometer />
              </div>
              <div>
                Feels like
                <div>
                  {parseInt(data.main.feels_like)}
                  <div>
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              {/* icon */}
              <div>
                <BsWater />
              </div>
              <div>
                Humidity<span>{data.main.humidity}%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              {/* icon */}
              <div>
                <BsWind />
              </div>
              <div>
                Wind<span>{data.wind.speed}m/s </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
