require("dotenv").config();
const request = require("node-superfetch");
const Detail = require("../models/Details");
const url = "http://api.weatherapi.com/v1";
async function getWeather(city) {
  const data = await request.get(`${url}/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`);
  return data.body;
}

async function getforecast(city, days) {
  const data = await request.get(`${url}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=${days}`);
  return data.body;
}

async function getDaily(city) {
  let data = await request.get(`${url}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=1`);
  console.log(data);
  data = data.body;
  const condition = data.forecast.forecastday[0].day.condition.text;
  const willItRain = data.forecast.forecastday[0].day.daily_will_it_rain;
  const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
  const minTemp = data.forecast.forecastday[0].day.mintemp_c;
  const avgTemp = data.forecast.forecastday[0].day.avgtemp_c;
  const avghumidity = data.forecast.forecastday[0].day.avghumidity;
  const chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
  const maxwind = data.forecast.forecastday[0].day.maxwind_kph;
  const response = {
    city: data.location.name,
    country: data.location.country,
    temperature: data.current.temp_c,
    condition,
    willItRain,
    maxTemp,
    minTemp,
    avgTemp,
    avghumidity,
    chanceOfRain,
    maxwind
  };
  return response;
}

async function isCropAbleToGrow(crop, city) {
  const detail = await Detail.find({ crop });
  // check if the crop is in the database
  if (!detail) return false;
  const weather = await getDaily(city);
  const howOld = detail[0].howOld;
  const estimatedTime = detail[0].estimatedTime;
  let willItRain = 0;
  if (willItRain === 1) { willItRain = "yes";} else { willItRain = "no";}
  // check chance of rain
  
  let response = {
    city: weather.city,
    crop: crop,
    howOld,
    willItRain,
    estimatedTime,
    status: "",
    goodOrBad: "",
    action: "",
    message: ""
  };
  if (weather.chanceOfRain === 1 || weather.willItRain === 1) {
    response.status = "Rainy";
    response.goodOrBad = "bad";
    response.action = "Avoid";
    response.message = "Protect your crop from rain";
    return response;
  } 
  if (weather.maxwind > 160) {
    response.status = "Thunderstorm";
    response.goodOrBad = "bad";
    response.action = "Avoid";
    response.message = "Thunderstorm is not good for it";
    return response;
  }
  if (weather.avghumidity > 90) {
    response.status = "Humid";
    response.goodOrBad = "bad";
    response.action = "Avoid";
    response.message = "Humidity is not good for it";
    return response;
  }
  if (weather.avgTemp > detail.maxTemp) {
    response.status = "Too hot";
    response.goodOrBad = "bad";
    response.action = "Avoid";
    response.message = "Too hot for it";
    return response;
  }
  if (weather.avgTemp < detail.minTemp) {
    response.status = "Too cold";
    response.goodOrBad = "bad";
    response.action = "Avoid";
    response.message = "Too cold for it";
    return response;
  }
  response.status = "Able to grow";
  response.goodOrBad = "good";
  response.action = "Grow";
  response.message = "You can grow it";
  return response;
// need to implement proper logics , just a gimick for now
}


module.exports = {
  getWeather,
  getforecast,
  getDaily,
  isCropAbleToGrow
};
