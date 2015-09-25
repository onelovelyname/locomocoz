var app = app || {};

app.on("before:start", function() {

  this.places = new app.PlacesCollection();
  
  // fetch places from a data store
  this.placesTable.orderByChild("room").equalTo(1).on("value", function(snapshot) {
    
    var placesInDB = snapshot.val();

    for (var key in placesInDB) {

      app.places.add(placesInDB[key]);

    }

  });

});

app.on("start", function() {
  
  this.controller = new app.Controller();
  this.router = new app.Router({controller: this.controller});
  Backbone.history.start();

});

app.start();
