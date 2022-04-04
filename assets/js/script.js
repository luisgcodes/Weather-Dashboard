let apiKey = "58c181ba70d6d89d42febadc51ef7d70";
let searchedLocations = [];

function getlocalData(lat, lon, city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=,minutely,hourly,alerts&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        
        .then(function (response) {

            showlocalData(response, city);

        });           
 };

 function loadWeatherlocation(city, isClicked) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCpde + ",us&appid=" + apiKey;
    var weatherContent = $("#weatherContent");

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) { 

            if (!isClicked)
            {
                saveLocations(response);  
                renderLocations();
            }

            getlocalData(response.city.coord.lat, response.city.coord.lon, response.city.name);

        }).catch(function (response){
            alert("Location Not Valid")
        });
}
