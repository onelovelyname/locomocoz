var app = app || {};

app.InfoView = Marionette.ItemView.extend({

  template: _.template("<h3><%= name %><h3><p><%= vicinity %><p><p><%= rating %><p><button>Add to list</button>"),

  events: {

    "click button": "addModelToDb"

  },

  addModelToDb: function() {

    var place = this.model;

    var PlaceModel = {
      id: place.get("place_id"),
      name: place.get("name"),
      rating: place.get("place.rating") || null,
      price: place.get("price_level") || null,
      geometry: place.get("geometry"),
      savedBy: sessionStorage.getItem('username'),
      votes: 0,
      room: sessionStorage.getItem('room-num')
    };

    app.placesTable.push(PlaceModel);

  },

  templateHelpers: function() {

    return {

      name: this.model.get("name"),
      vicinity: this.model.get("vicinity"),
      rating: this.model.get("rating")

    };

  }

});
