var app = app || {};

app.on("before:start", function() {

  this.places = new app.PlacesCollection();

});

app.on("start", function() {
  
  this.controller = new app.Controller();
  this.router = new app.Router({controller: this.controller});
  Backbone.history.start();

});

app.start();

