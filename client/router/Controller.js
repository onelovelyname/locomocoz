var app = app || {};

app.Controller = Marionette.Object.extend({

  initialize: function() {

    app.LayoutViewInstance = new app.LayoutView();
    app.getRegion('appRegion').show(app.LayoutViewInstance);

  },

  home: function() {

    var LandingPageViewInstance = new app.LandingPageView();
    app.LayoutViewInstance.getRegion('search').show(LandingPageViewInstance);
    $('section#search-region').addClass("home-ui");

  },

  map: function() {
    
    // fetch places from Firebase, listen for updates
    // create map markers and add to app.places
    var roomNumber = sessionStorage.getItem('room-num');
    console.log("roomNumber inside of map: ", roomNumber);

    app.placesTable.orderByChild("room").equalTo(roomNumber).on("value", function(snapshot) {
      
      var placesInDB = snapshot.val();

      for (var key in placesInDB) {

        placesInDB[key]['firebaseId'] = key;

        app.places.add(placesInDB[key]);

      }

    });

    app.placesTable.on("child_changed", function(snapshot) {
      
      var changedPlace = snapshot.val();
      var modelId = changedPlace.id;

      var modelToUpdate = app.places.get(modelId);

      if(modelToUpdate) {
        modelToUpdate.set('votes', changedPlace.votes);
      }

    });

    // size and style map to fit page

    if ($('body').width() > 991) {
      var mapHeight = ($('body').height() - 120).toString() + "px";
      $('#map-region').css("height", mapHeight);
    } else {
      $('#map-region').css("height", "400px");
    }

    $('section#search-region').addClass("home-ui");

    app.map = new google.maps.Map(document.getElementById('map-region'), {
      center: new google.maps.LatLng(0,0),
      zoom: 2
    });

    var SearchViewInstance = new app.SearchView();
    var ListViewInstance = new app.ListView({collection: app.places});

    app.LayoutViewInstance.getRegion('search').show(SearchViewInstance);
    app.LayoutViewInstance.getRegion('list').show(ListViewInstance);

  }

});
