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
      var currentVotes = this.model.get("votes");
      var modelId = this.model.get('id');

      this.model.set("votes", ++currentVotes);

      // app.placesTable.orderByChild("id").equalTo(modelId).on("value", function(snapshot){
      //   var modelKey = Object.keys(snapshot.val())[0];
      //   var modelRef = app.placesTable.child(modelKey);

      //   // modelRef.update({
      //   //   votes: 
      //   // })

      // });

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
