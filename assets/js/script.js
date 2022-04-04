let APIKey = "58c181ba70d6d89d42febadc51ef7d70";
let locations = [];

function getlocalData(lat, lon, city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=,minutely,hourly,alerts&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        
        .then(function (response) {

            showlocalData(response, city);

        });           
 };