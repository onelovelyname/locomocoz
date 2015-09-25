var app = app || {};

app.ListItemView = Marionette.ItemView.extend({

  template: _.template("<td><%= name %></td><td><%= savedBy %></td><td><%= votes %></td><td><button>Vote</button></td>"),

  tagName: "tr",

  initialize: function() {

    this.bindEntityEvents(this.model, this.completionEvents);

  },

  completionEvents: {

    "change:votes": "render"

  },

  events: {

    "click button": function() {
      console.log("button click heard!");
      var currentVotes = this.model.get("votes");
      this.model.set("votes", ++currentVotes);
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
