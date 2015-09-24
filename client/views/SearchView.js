var app = app || {};

app.SearchView = Marionette.ItemView.extend({

  template: Handlebars.compile($('#searchTemplate').html()),

  tagName: "form",

  events: {
    "submit": "handleSubmit"
  },

  createMarker: function(place, map) {
    var placeLocation = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function(){
      console.log("place.name on click: ", place.name);
    });
  },

  findPlaces: function(location, suggestedPlace, context) {

    var latitude = location[0].geometry.location["H"];
    var longitude = location[0].geometry.location["L"];
    var currentLocation = new google.maps.LatLng(latitude, longitude);

    var map = new google.maps.Map(document.getElementById('map-region'), {
      center: currentLocation,
      zoom: 12
    });

    var service = new google.maps.places.PlacesService(map);

    var SearchRequest = {
      location: currentLocation,
      radius: '3200',
      keyword: suggestedPlace,
      type: ['bar', 'cafe', 'food', 'night_club', 'movie_theater']
    };

    service.nearbySearch(SearchRequest, function(results, status) {
      if(status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          context.createMarker(results[i], map);
        }
      }
    });

  },

  handleSubmit: function(event) {

    event.preventDefault();

    var context = this;
    
    var geocoder = new google.maps.Geocoder();
    var suggestedPlace = $('#suggestedPlace').val();
    var currentPlace = $('#currentPlace').val();
  
    // Geocode request for use in Google Places API
    var GeocoderRequest = {
      address: currentPlace,
      region: 'US'
    };

    geocoder.geocode(GeocoderRequest, function(results, status) {
      if(status === google.maps.GeocoderStatus.OK) {
        context.findPlaces(results, suggestedPlace, context);
      } else {
        console.log("Geocode did not work, given the following status: ", status);
      }
    });

    // Make request to Google Places using results provided



  }

});
