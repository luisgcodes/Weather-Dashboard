const apiKey = "58c181ba70d6d89d42febadc51ef7d70";
let city = $("#city").val();
let currentDate = new Date();

$('#city').keypress(function(event) {
    event.preventDefault();
    $("#search-btn").click();
});

$('#search-btn').on("click", function() {
    $('#five-day-forecast').addClass("show");
    city=$("#city").val();
    $("#city").val("");

    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
