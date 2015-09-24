var app = app || {};

app.EmptyListView = Marionette.ItemView.extend({

  template: _.template("<td>Looks like you have no places chosen. Search for places above!</td>"),

  tagName: "tr"

});
