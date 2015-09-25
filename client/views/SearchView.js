var app = app || {};

app.SearchView = Marionette.ItemView.extend({

  template: Handlebars.compile($('#searchTemplate').html()),

  tagName: "form",

  events: {
    "submit": "handleSubmit"
  },

  handleSubmit: function(event) {

    event.preventDefault();

    var suggestedPlace = $('#suggestedPlace').val();
    var currentPlace = $('#currentPlace').val();
  
    this.sendGeocoderRequest(suggestedPlace, currentPlace);

  },

  sendGeocoderRequest: function(suggestedPlace, currentPlace) {

    var geocoder = new google.maps.Geocoder();
    var context = this;

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

  },

  findPlaces: function(location, suggestedPlace, context) {

    var latitude = location[0].geometry.location["H"];
    var longitude = location[0].geometry.location["L"];
    var currentLocation = new google.maps.LatLng(latitude, longitude);

    app.map = new google.maps.Map(document.getElementById('map-region'), {
      center: currentLocation,
      zoom: 12
    });

    var service = new google.maps.places.PlacesService(app.map);

    var SearchRequest = {
      location: currentLocation,
      radius: '3200',
      keyword: suggestedPlace,
      type: ['bar', 'cafe', 'food', 'night_club', 'movie_theater']
    };

    service.nearbySearch(SearchRequest, function(results, status) {
      if(status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          context.createMarker(results[i]);
        }
      }
    });

  },

  createMarker: function(place) {
    var context = this;
    var placeLocation = place.geometry.location;
    var marker = new google.maps.Marker({
      map: app.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      
    app.username = $("#username").val();

      var PlaceModel = {
        id: place.place_id,
        name: place.name,
        rating: place.rating || null,
        price: place.price_level || null,
        geometry: place.geometry,
        savedBy: app.username,
        votes: 0,
        room: 1
      };

      app.placesTable.push(PlaceModel);

    });
  }

});
