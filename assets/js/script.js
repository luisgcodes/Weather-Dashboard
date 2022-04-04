let apiKey = "58c181ba70d6d89d42febadc51ef7d70";
let locations = [];

function getweatherData(lat, lon, city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=,minutely,hourly,alerts&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        
        .then(function (response) {
           
            showweatherData(response, city);

        });           
 };

 function loadWeatherlocation(city, isClicked) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + city + ",us&appid=" + apiKey;
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

            getweatherData(response.city.coord.lat, response.city.coord.lon, response.city.name);

        }).catch(function (response){
            alert("Location Not Valid")
        });
}

function loadWeather(city, isClicked) {
    
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=" + apiKey;
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

            getweatherData(response.city.coord.lat, response.city.coord.lon, response.city.name);

        }).catch(function(response){
            alert("Location Not Valid");
        });
    }

    function showweatherData(weatherData, city)
{
    
    var icon = "http://openweathermap.org/img/w/" + weatherData.current.weather[0].icon + ".png"; 
    $("#cDate").html(city + " (" + new Date().toLocaleDateString() + ") <img id=\"icon\" src=\"" + icon  + "\" alt=\"Weather icon\"/>");

    var temp = parseInt(weatherData.current.temp);
    temp = Math.round(((temp-273.15)*1.8) + 32);
    $("#cTemp").html(" " + temp +  "  &degF");
    $("#cHumidity").html(weatherData.current.humidity + "%");
    $("#cWindSpeed").html(weatherData.current.wind_speed + " MPH");

    
    var uvIndex = weatherData.current.uvi;

    var bgColor = "";  
    var textColor = "";  

    if (uvIndex < 3) 
    {
        bgColor = "bg-success";
        textColor = "text-light";  
    }
    else if (uvIndex > 2 && uvIndex < 6)  
    {
        bgColor = "bg-warning";
        textColor = "text-dark";             
    }
    else  
    {
        bgColor = "bg-danger";
        textColor = "text-light";            
    }

    $("#cUVIndex").html(uvIndex).addClass(bgColor + " p-1 " +  textColor); 

    var fDayf = $("#fiveDay");
    fDayf.empty();

    for (i=1; i < 6; i++)  
    {
        var div = $("<div>").addClass("bg-secondary rounded");

        var dateTime = parseInt(weatherData.daily[i].dt); 
        var dateHeading = $("<h5>").text(new Date(dateTime * 1000).toLocaleDateString());  
        var iconDayURL = "http://openweathermap.org/img/w/" + weatherData.daily[i].weather[0].icon + ".png";  
        var icon = $("<img>").attr("src", iconDayURL);

        temp = parseInt(weatherData.daily[i].temp.day); 
        temp = Math.round(((temp-273.15)*1.8) + 32);  
        var tempf = $("<p>").html("Temp: " + temp +  "  &degF");

        var windf = $("<p>").html("Wind: " + weatherData.current.wind_speed + " MPH");

        var humidityf = $("<p>").html("Humidity: " + weatherData.daily[i].humidity + "%");

    
        div.append(dateHeading);
        div.append(icon);
        div.append(tempf);
        div.append(windf);
        div.append(humidityf);
        fDayf.append(div);

    }

    $("#weatherData").show();
}

function showLocations()
{
    var lArray = localStorage.getItem("locations");
    if (lArray) 
    {
      locations = JSON.parse(lArray);  
      renderLocations();
    }
    else {
      localStorage.setItem("locations", JSON.stringify(locations)); 
    }
}

function renderLocations()
{
    var divLocations = $("#lHistory");
    divLocations.empty(); 

    $.each(locations, function(index, item){
        var a = $("<a>").addClass("list-group-item list-group-item-action city").attr("data-city", locations[index]).text(locations[index]);
        divLocations.append(a);
    });

    $("#lHistory > a").off();

    $("#lHistory > a").click(function (event)
    {   
        var element = event.target;
        var city = $(element).attr("data-city");

        loadWeather(city, true);
    });

}

function saveLocations(data)
{

    var city = data.city.name; 

    locations.unshift(city);
    localStorage.setItem("locations", JSON.stringify(locations)); 
}

$(document).ready(function () {

    $("#weatherData").hide(); 
    
    showLocations(); 

    $("#searchBtn").click(function (event) { 
        var element = event.target; 
        var sCriteria = $("#cityZ").val(); 
        
        if (sCriteria !== "")  
        {
            var zip = parseInt(sCriteria); 

            if (!isNaN(zip)) 
            {
                loadWeatherlocation(zip, false);
            }
            else
            {
                loadWeather(sCriteria, false);  
            }
        }
    });
});