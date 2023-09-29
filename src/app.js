const express = require("express");
const dotenv = require("dotenv");
const request = require("request");

dotenv.config()
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiKey = `${process.env.API_KEY}`;

app.post("/forecast", function (req, res) {
  // Get city name
  const { city } = req.body;

  // Use that city name to fetch data
  // Use the API_KEY in the '.env' file
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // Request for data using the URL
  request(url, function (err, response, body) {
    // On return, check the json data fetched
    if (err) {
      res.json({
        weather: null,
        error: "Error, please try again",
      });
    } else {
      let weather = JSON.parse(body);
      // you shall output it in the console just to make sure that the data being displayed is what you want
      console.log(weather);

      if (weather.main == undefined) {
        res.json({
          weather: null,
          error: "Error, please try again",
        });
      } else {
        // we shall use the data got to set up your output
        let place = `${weather.name}, ${weather.sys.country}`,
          /* you shall calculate the current timezone using the data fetched*/
          weatherTimezone = `${new Date(
            weather.dt * 1000 - weather.timezone * 1000
          )}`;
        let weatherTemp = `${weather.main.temp}`,
          weatherPressure = `${weather.main.pressure}`,
          /* you will fetch the weather icon and its size using the icon data*/
          weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
          weatherDescription = `${weather.weather[0].description}`,
          humidity = `${weather.main.humidity}`,
          clouds = `${weather.clouds.all}`,
          visibility = `${weather.visibility}`,
          main = `${weather.weather[0].main}`,
          weatherFahrenheit;
        weatherFahrenheit = (weatherTemp * 9) / 5 + 32;

        // you shall also round off the value of the degrees fahrenheit calculated into two decimal places
        function roundToTwo(num) {
          return +(Math.round(num + "e+2") + "e-2");
        }
        weatherFahrenheit = roundToTwo(weatherFahrenheit);

        res.json({
            weather: weather,
            place: place,
            temp: weatherTemp,
            pressure: weatherPressure,
            icon: weatherIcon,
            description: weatherDescription,
            timezone: weatherTimezone,
            humidity: humidity,
            fahrenheit: weatherFahrenheit,
            clouds: clouds,
            visibility: visibility,
            main: main,
            error: null,
          });
      }
    }
  });
}
);

module.exports = app;
