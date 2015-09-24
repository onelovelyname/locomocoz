var app = app || {};

app.ListView = Marionette.CompositeView.extend({

  template: Handlebars.compile($('#listTemplate').html()),

  collection: app.places,

  childView: app.ListItemView,

  childViewContainer: "tbody",

  emptyView: app.EmptyListView

});
