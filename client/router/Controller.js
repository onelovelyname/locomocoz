var app = app || {};

app.Controller = Marionette.Object.extend({

  initialize: function() {

    app.LayoutViewInstance = new app.LayoutView();
    app.getRegion('appRegion').show(app.LayoutViewInstance);

  },

  home: function() {

    app.LayoutViewInstance.getRegion('search').show(new app.SearchView());
    app.LayoutViewInstance.getRegion('map').show(new app.MapView());
    app.LayoutViewInstance.getRegion('list').show(new app.ListView());

  },

  map: function() {

  }

});
