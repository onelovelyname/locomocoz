var app = app || {};

app.ListItemView = Marionette.ItemView.extend({

  template: _.template("<td><%= name %></td><td><%= savedBy %></td><td><%= votes %></td>"),

  tagName: "tr",

  templateHelpers: function() {

    return {

      name: this.model.get("name"),
      savedBy: this.model.get("savedBy"),
      votes: this.model.get("votes")

    };

  }

});
