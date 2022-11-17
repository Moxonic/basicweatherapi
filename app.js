const express = require('express');
const app = express();
const https= require('https');



app.get('/', function(req, res){

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Oslo&units=metric&appid=09e8329f22ae95af14e635362477e856';
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/'+ iconCode +'@2x.png'

            res.write('<h1>The weather is currently ' + weatherDescription +'</h1>');
            res.write('<h1>The temperature is '+ temp + 'deg Celsius </h1>');
            res.write('<img src=' + imageURL + '>');
            res.send();
        });
    });
});






app.listen(3000, function(){
    console.log('Server running on 3000');
})