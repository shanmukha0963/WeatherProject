// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/", function (req, res) {
//   const query = req.body.cityName;
//   const apiKey = "de8645650afca954ff659f03cb13b286";
//   const url =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     query +
//     "&appid=" +
//     apiKey +
//     "&units=metric";

//   https.get(url, function (response) {
//     console.log(response.statusCode);
//     let data = "";

//     response.on("data", function (chunk) {
//       data += chunk;
//     });

//     response.on("end", function () {
//       if (response.statusCode === 200) {
//         const weatherData = JSON.parse(data);
//         const temp = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;
//         const icon = weatherData.weather[0].icon;
//         const imageUrl =
//           "http://openweathermap.org/img/wn/" + icon + "@2x.png";

//         const htmlResponse =
//           "<h1>The temperature in " +
//           query +
//           " is " +
//           temp +
//           " degrees Celsius.</h1>" +
//           "<p>The weather condition is currently " +
//           weatherDescription +
//           "</p>" +
//           '<img src="' +
//           imageUrl +
//           '">';

//         res.send(htmlResponse);
//       } else {
//         // Handle the case where the city was not found or there was an API error
//         res.send("<h1>Enter a correct city name.</h1>");
//       }
//     });
//   });
// });

// app.listen(3000, function () {
//   console.log("Server is running on port 3000.");
// });
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "de8645650afca954ff659f03cb13b286";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);
    let data = "";

    response.on("data", function (chunk) {
      data += chunk;
    });

    response.on("end", function () {
      if (response.statusCode === 200) {
        const weatherData = JSON.parse(data);
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const temp = weatherData.main.temp;
        const imageUrl =
          "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        const htmlResponse = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              /* Add your CSS styles here */
              body {
                font-family: Arial, sans-serif;
                background-image: url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=clouds-dawn-dramatic-1118873.jpg&fm=jpg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
              }

              .weather-info {
                text-align: center;
                color: #fff;
                font-size: 24px;
              }

              .weather-description {
                font-weight: bold;
                margin: 0;
              }
              .weather-temperature{
                font-weight: bold;
                margin: 0;
              }

              .weather-image img {
                max-width: 100px;
                max-height: 100px;
              }
            </style>
          </head>
          <body>
            <div class="weather-info">
              <p class="weather-description">${weatherDescription}</p>
              <p class="weather-temperature">Temperature: ${temp}°C</p>
            </div>
            <div class="weather-image">
              <img src="${imageUrl}" alt="Weather Icon">
            </div>
          </body>
          </html>
        `;

        res.send(htmlResponse);
      } else {
        // Handle the case where the city was not found or there was an API error
        res.send("<h1>Enter a correct city name.</h1>");
      }
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
