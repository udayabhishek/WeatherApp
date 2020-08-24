const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const apiKey = "9631cea25501cc9c21d272f2988df970";
    const city = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apiKey
    
    https.get(url, function (response) {
        console.log(response);
        console.log(response.statusCode);

        response.on("data", function (data) {
            console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            //city name
            const cityName = weatherData.name;
            const temprature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconName = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + iconName + "@2x.png";
            console.log(imageURL);
            res.write("<h1>The temprature in " + cityName + " is " + temprature + " deg Cel</h1>");
            res.write("<h3> It's currently " + weatherDescription + "</h3>")
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    });
});

app.listen(3000, function () {
    console.log("Server is running at 3000");
});