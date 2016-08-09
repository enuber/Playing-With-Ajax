// weather underground key :- f0C719219951c798


//Checks to see if a State is chosen, important because city/state have to be chosen together


function checkState(state) {
    var needState = ('<p>Please Choose A State To Complete</p>');
    if (state === "") {
        $("#placeHere").append(needState);
        return false;
    } else {
        return true;
    }
}


//Checks to see how weather will be checked first by Zip, if not checks for State and City filled out, sends errors based on situation else True for Zip and False for City/State

function priorityCheck(city, state, zip) {
    var stateExist = false;
    var moreInfo = ('<p>Not enough information was given</p>');
    var noInfo = ('<p>No information was given</p>');
    if (zip !== "") {
        return true;
    } else if (city !== "") {
            stateExist = checkState(state);
            if (stateExist){
                return false;
            } else { 
                $("#placeHere").append(moreInfo);
            }
    } else if (checkState(state)) {
        $("#placeHere").append(moreInfo);
        return "";
    } else {
        $("#placeHere").append(noInfo);
        return "";
    }
        
};


$(document).ready(function() {


    $('form').submit(function(evt) {
        evt.preventDefault();
        var weatherAPI = "";
        var byZip;
        var stateName = $("#state").val();
        var cityName = $('#city').val();
        var zipCode = $('#zipcode').val();        
        var byZip = priorityCheck(cityName, stateName, zipCode);
        
//        if(byZip !== "") {
//        if (byZip) {
//            weatherAPI = "http://api.wunderground.com/api/f0C719219951c798/conditions/forecast/q/" + zipCode + ".json";
//        } else {
//            weatherAPI = "http://api.wunderground.com/api/f0c719219951c798/conditions/forecast/q/"+ stateName + "/" + cityName + ".json";
//        } ;
//        }
        
        
        //this if/else statement fills in the URL to send in the request based on Zip or State and City names.
        if(byZip !== "") {
        if (byZip) {
            weatherAPI = "http://api.wunderground.com/api/f0C719219951c798/conditions/forecast/q/" + zipCode + ".json?callback=?";
        } else {
            weatherAPI = "http://api.wunderground.com/api/f0c719219951c798/conditions/forecast/q/"+ stateName + "/" + cityName + ".json?callback=?";
        } ;
        }
        
        
        //sets the information being requested for ajax call
        var weatherOptions = {
            dataType: "jsonp"
        }
        
        
//        This is the call back function that will actually do something with the data
        function displayWeather(data) {
            var tempF = data.current_observation.temp_f,
                tempC = data.current_observation.temp_c,
                todayIcon = data.current_observation.icon_url,
                cityName = data.current_observation.display_location.city;
//                tomorrowDay = data.forecast.txt_forecast.forecastday[2].title,
//                tomorrowForcast = data.forecast.txt_forecast.forecastday[2].fcttext,
//                tomorrowIcon = data.forecast.txt_forecast.forecastday[2].icon_url,
//                nextDay = data.forecast.txt_forecast.forecastday[4].title,
//                nextDayForcast = data.forecast.txt_forecast.forecastday[4].fcttext,
//                nextDayIcon = data.forecast.txt_forecast.forecastday[4].icon_url,
//                thirdDay = data.forecast.txt_forecast.forecastday[6].title,
//                thirdDayForcast = data.forecast.txt_forecast.forecastday[6].fcttext,
//                thirdDayIcon = data.forecast.txt_forecast.forecastday[6].icon_url;
                
            
            var weatherHTML = '<div class="container"><div class="row">';
            weatherHTML += '<div class="col-md-4 card m-t-3"><div class="weatherCard">';
            weatherHTML += '<h4 class="m-t-1">' + cityName + '</h4>';
            weatherHTML += '<img class="card-img-top" src="' + todayIcon + '"/>';
            weatherHTML += '<div class="card-block">';
            weatherHTML += '<h5 class="card-title">Temperature Right Now</h5>';
            weatherHTML += '<h6 class="card-text">' + tempF +'&deg; F</h6>';
            weatherHTML += '<p class="card-text">' + tempC + '&deg; C</p>';
            weatherHTML += '</div></div></div></div></div>';
            
            
            var forcastHTML = '<ul class="list-group m-t-3">';
            for (var i = 1; i <= 7; i++) {
                forcastHTML += '<li class="list-group-item">';
                forcastHTML += '<img class="pull-md-left img-fluid m-r-2" src="'
                forcastHTML += data.forecast.txt_forecast.forecastday[i].icon_url;
                forcastHTML += '"/><h4 class="list-group-item-heading">';
                forcastHTML += data.forecast.txt_forecast.forecastday[i].title;
                forcastHTML += '</h4>' + data.forecast.txt_forecast.forecastday[i].fcttext;
                forcastHTML += '</li>';
            }
            forcastHTML += '</ul>';
            
            document.getElementById("placeHere").innerHTML = "";
            
            $("#placeHere").append(weatherHTML).append(forcastHTML);
            

        }
        $.getJSON(weatherAPI, weatherOptions, displayWeather);
    });
  
    
    //For clear button.
    $("#clear").on('click', function(evt) {
        document.getElementById("placeHere").innerHTML = "";
    });
});
