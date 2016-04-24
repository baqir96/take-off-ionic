var config = require('../config');

var express = require('express');

var app_id = config.application_id;

var api = express.Router();

var topic_details = [];

var request = require("request-promise")

api.get('/weather', function(req,res) {
  console.log(req);
  var city1 = req.param('city1');
  var city2 = req.param('city2');
  var openweather_url = "http://api.openweathermap.org/data/2.5/weather?q="+city1+"&APPID=31490bd8ba57314162fc21d6a60ec80e";
  var openweather_url2 = "http://api.openweathermap.org/data/2.5/weather?q="+city2+"&APPID=31490bd8ba57314162fc21d6a60ec80e";
  var response = {};

  request(openweather_url)
    .then(function (resp) {
      resp = JSON.parse(resp);
      response[city1] = {};
      response[city1].coord = resp.coord;
      response[city1].desc = resp.weather;
      response[city1].main = resp.weather;
      response[city1].temp = resp.main;
      response[city1].temp.temp = Math.round((response[city1].temp.temp - 273) * 10) / 10;
      response[city1].pressure = resp.main;
      response[city1].humidity = resp.main;
    }).then(function(resp) {
        return request(openweather_url2);
      })
      .then(function (resp) {
      console.log(resp);
      resp = JSON.parse(resp);
      response[city2] = {};
      response[city2].coord = resp.coord;
      response[city2].desc = resp.weather;
      response[city2].main = resp.weather;
      response[city2].temp = resp.main;
      response[city2].temp.temp = Math.round((response[city2].temp.temp - 273) * 10) / 10;
      response[city2].pressure = resp.main;
      response[city2].humidity = resp.main;
      res.send(response);
    })

})

module.exports = api;
