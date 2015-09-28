var app = app || {};

app.InfoView = Marionette.ItemView.extend({

  template: _.template("<div class='row'><%= getPlacePhoto() %><div class='col-md-8'><h4><%= name %></h4><p><%= vicinity %></p><a href=<%= url %> target='_blank'><%= url %></a><p>Rating: <%= rating %></p><%= showButton() %><div></div>"),

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

    var context = this;

    return {

      name: this.model.get("name"),
      vicinity: this.model.get("vicinity"),
      url: this.model.get("url"),
      rating: this.model.get("rating"),

      getPlacePhoto: function() {

        if (context.model.get('photos')) {
          var photoUrl = context.model.get('photos')[0].getUrl({
            'maxWidth': 150,
            'maxHeight': 150
          });

          return "<div class='col-md-4'><img src=" + photoUrl + "alt='place-photo'></div>";
        }

        return;

      },

      showButton: function() {
        
        if (!app.places.get(context.model.get("place_id"))) {
          return "<button class='btn'>Add to list</button>";
        }

        return;
      }

    };

  }

});
