var app = app || {};

app.PlaceModel = Backbone.Model.extend({

  defaults: {
    name: "San Francisco Zoo",
    savedBy: "Melanie",
    votes: 0
  }

});
