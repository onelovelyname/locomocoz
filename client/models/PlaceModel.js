var app = app || {};

app.PlaceModel = Backbone.Model.extend({

  defaults: {
    name: "San Francisco Zoo",
    rating: 3,
    price: 2,
    savedBy: "Melanie",
    votes: 0
  }

});
