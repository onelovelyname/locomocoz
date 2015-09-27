var app = app || {};

app.Controller = Marionette.Object.extend({

  initialize: function() {

    app.LayoutViewInstance = new app.LayoutView();
    app.getRegion('appRegion').show(app.LayoutViewInstance);

  },

  home: function() {
    console.log("home");
    var LandingPageViewInstance = new app.LandingPageView();
    app.LayoutViewInstance.getRegion('search').show(LandingPageViewInstance);
    $('section#search-region').addClass("home-ui");

  },

  map: function() {

    var roomNumber = sessionStorage.getItem('room-num');

    console.log("roomNumber inside of map: ", roomNumber);
    
    // fetch places from a data store, and listen for updates
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

    app.map = new google.maps.Map(document.getElementById('map-region'), {
      center: new google.maps.LatLng(0,0),
      zoom: 1
    });

    var SearchViewInstance = new app.SearchView();
    var ListViewInstance = new app.ListView({collection: app.places});

    app.LayoutViewInstance.getRegion('search').show(SearchViewInstance);
    app.LayoutViewInstance.getRegion('list').show(ListViewInstance);

  }

});
