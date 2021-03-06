var app = app || {};

app.ListItemView = Marionette.ItemView.extend({

  template: _.template("<td class='itemName'><%= name %></td><td><%= savedBy %></td><td><%= votes %></td><td><button class='btn btn-default'>Vote</button></td>"),

  tagName: "tr",

  initialize: function() {

    this.bindEntityEvents(this.model, this.completionEvents);

  },

  completionEvents: {

    "change:votes": "render"

  },

  events: {

    "click button": function() {
      var currentVotes = this.model.get("votes");
      var modelId = this.model.get('id');

      this.model.set("votes", ++currentVotes);

      var modelRef = app.placesTable.child(this.model.get('firebaseId'));

      modelRef.update({
        votes: currentVotes
      });

    },

    "click.itemName": function() {

      app.utility.getPlaceDetails.call(this.model);

    }

  },

  templateHelpers: function() {

    return {

      name: this.model.get("name"),
      savedBy: this.model.get("savedBy"),
      votes: this.model.get("votes")

    };

  }

});
