var app = app || {};

app.on("before:start", function() {

  this.places = new app.PlacesCollection();
  
  // fetch places from a data store, and listen for updates
  this.placesTable.orderByChild("room").equalTo(1).on("value", function(snapshot) {
    
    var placesInDB = snapshot.val();

    for (var key in placesInDB) {

      placesInDB[key]['firebaseId'] = key;

      app.places.add(placesInDB[key]);

    }

  });

  this.placesTable.on("child_changed", function(snapshot) {
    
    var changedPlace = snapshot.val();
    var modelId = changedPlace.id;

    var modelToUpdate = app.places.get(modelId);

    modelToUpdate.set('votes', changedPlace.votes);

  });

});

app.on("start", function() {
  
  this.controller = new app.Controller();
  this.router = new app.Router({controller: this.controller});
  Backbone.history.start();

});

app.start();
