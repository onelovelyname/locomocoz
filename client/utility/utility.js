var app = app || {};

app.utility = (function() {

  var sendGeocoderRequest = function(suggestedPlace, currentPlace) {

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

  };

  var findPlaces = function(location, suggestedPlace, context) {

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

    var image = "";

    service.nearbySearch(SearchRequest, function(results, status) {
      if(status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          context.createMarker(results[i], image);
        }
      }
    });

  };

  var createMarker = function(place) {

    var context = this;
    var placeLocation = place.geometry.location;

    var marker = new google.maps.Marker({
      map: app.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', this.getPlaceDetails.bind(place));
  };

  var getPlaceDetails = function() {

    var service = new google.maps.places.PlacesService(app.map);

    service.getDetails({
      // google place, PlaceModel, place in Firebase
      placeId: this.place_id || this.get("id") || this.id
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var placeModel = new app.PlaceModel(place);
        var InfoViewInstance = new app.InfoView({model: placeModel});
        app.LayoutViewInstance.getRegion('info').show(InfoViewInstance);
      }
    });

  };

  return {

    sendGeocoderRequest: sendGeocoderRequest,
    findPlaces: findPlaces,
    createMarker: createMarker,
    getPlaceDetails: getPlaceDetails

  };

})();
