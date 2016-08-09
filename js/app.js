$(document).ready(function() {


 $('form').submit(function (evt) {
    evt.preventDefault();
    var searchingFor = $('#search').val();
    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    
    var flickrOptions = {      
      tags: searchingFor,
      format: "json"
    };
//    function displayPhotos(data) {
//      var photoHTML = '<ul>';
//      $.each(data.items,function(i,photo) {
//        photoHTML += '<li class="grid-25 tablet-grid-50">';
//        photoHTML += '<a href="' + photo.link + '" class="image">';
//        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
//      }); // end each
//      photoHTML += '</ul>';
//      $('#photos').html(photoHTML);
     
     
    function displayPhotos(data) {
      var photoHTML = '<div class="container makePretty">';
        photoHTML += '<div class="row">';
      $.each(data.items,function(i,photo) {
        photoHTML += '<div class="col-sm-6 col-lg-4 m-y-2">';
        photoHTML += '<div class="card flickrCard">';  
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img class="card-img-top img-fluid  m-x-auto beautify w-100" '
        photoHTML += 'src="' + photo.media.m + '"></a></div></div>';
    }); // end each
      photoHTML += '</div></div>';
      $('#photos').html(photoHTML);
     
     
     
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

}); // end ready


//key: feb6712a603691f442ad6a6b8180fdd8 secret: ff8224a0131dfc22   group_id: "27034531@N00", api_key: "feb6712a603691f442ad6a6b8180fdd8",    