/*jslint browser: true*/
/*global $, jQuery, alert*/


//used to grab a random photos information 0-24 because requesting 25 photos.
function randomNumber() {
    'use strict';
    return Math.floor(Math.random() * 25);
}



//used to create the URL string for the request
function createURL(str, i) {
    'use strict';
    if (str[i] === " ") {
        return " ";
        
    } else if (isNaN(str[i])) {
        var url = "https://api.flickr.com/services/rest/?&method=flickr.groups.pools.getPhotos&api_key=6356dd8d29bc85882555cb14cdb3c8e5&group_id=27034531%40N00";
        url += "&tags=" + str[i].toUpperCase() + "&per_page=25&format=json&nojsoncallback=1";
        return url;
    
    } else if (!isNaN(str[i])) {
        var url = "https://api.flickr.com/services/rest/?&method=flickr.groups.pools.getPhotos&api_key=6356dd8d29bc85882555cb14cdb3c8e5&group_id=54718308@N00";
        url += "&tags=" + str[i] + "&per_page=25&format=json&nojsoncallback=1";
        return url;
    } else {
        return " ";
    }
    
}


$(document).ready(function () {
    'use strict';
    $('form').submit(function (evt) {
        evt.preventDefault();
        var str = $('#search').val().split(''),
            urlList = [],
            flickerAPI,
            finalWord = [],
            placedWord,
            finalLetter = false,
            
            flickrOptions = {
                format: "json"
            };
        
          
        
        //uses the randomNumber function to get a random photos info than builds up the photo location and finally builds up the HTML to place. When done, it pushes it into an array for later use
        function displayWord(data) {
                  
            var randNum = randomNumber();
            var farmID = data.photos.photo[randNum].farm;
            var servID = data.photos.photo[randNum].server;
            var photoID = data.photos.photo[randNum].id;
            var secretID = data.photos.photo[randNum].secret;

            

                
            var letterPhoto = 'https://farm' + farmID + '.staticflickr.com/';
            letterPhoto += servID + '/' + photoID + '_' + secretID + '_s.jpg';

            
            var letterHTML = '<div class="wordDiv">';
            
            letterHTML += '<a href="' + letterPhoto + '" class="image">';
            letterHTML += '<img class="img-fluid" id="wordPics" ';
            letterHTML += 'src="' + letterPhoto + '"></a></div>';
            
        
            finalWord.push(letterHTML);
            

            if (finalLetter) {                
                placedWord = (finalWord).join('');
                $('#wordHere').html(placedWord);
            }
        }
        
        
        //creates an array of URLs that will be used used to call the API
         
        for (var i = 0; i < str.length; i++){
           urlList.push(createURL(str, i));
        }//end for loop  
        
    
        //flickerAPI takes the URL created above and, this loops thru one letter at a time to create an array of HTML files.
//        for (var j = 0; j < urlList.length; j++){
//                if (j === urlList.length-1) {
//                finalLetter = true;
//                }
//                flickerAPI = urlList[j]; 
//                console.log("flickerAPI = " + flickerAPI, "J = " + j);
//                $.getJSON(flickerAPI, flickrOptions, displayWord);
//                $.ajax({
//                    url: flickerAPI,
//                    dataType: "json",
//                    success: function(data) {
//                        displayWord(data);
//                        setTimeout(10000);
//                    }
//                });
//        }

        
        
        
        
        
        // set delay here, 2 seconds as an example...
        var my_delay = 100;


        
        
        function callAjax() {
        if (urlList.length > 0) {
            var flickerAPI = urlList[0];
            urlList.shift();
            while (flickerAPI === " ") {
                finalWord.push(flickerAPI);
                var flickerAPI = urlList[0];

                urlList.shift();
            }
            if (urlList.length === 0 ) {
                finalLetter = true;
            }
            $.ajax({
                url: flickerAPI,
                dataType: "json",
                success  : function(data) {
                               displayWord(data);
                               setTimeout(callAjax); //took out , my_delay may need it again
                           }
            });
        }
        }
        
        // call your ajax function when the document is ready...
//        $(function() {
            callAjax();
//        });

        
        
    }); //end form submit
    
}); //end document.ready


    