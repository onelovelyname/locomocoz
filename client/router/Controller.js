var app = app || {};

app.Controller = Marionette.Object.extend({

  initialize: function() {

    app.LayoutViewInstance = new app.LayoutView();
    app.getRegion('appRegion').show(app.LayoutViewInstance);

  },

  home: function() {
    console.log("home");
    var LandingPageViewInstance = new app.LandingPageView();
    app.LayoutViewInstance.getRegion('search').show(LandingPageViewInstance);
    $('section#search-region').addClass("home-ui");

  },

  map: function() {

    app.map = new google.maps.Map(document.getElementById('map-region'), {
      center: new google.maps.LatLng(0,0),
      zoom: 1
    });

    var ListViewInstance = new app.ListView({collection: app.places});
    var SearchViewInstance = new app.SearchView();
    app.LayoutViewInstance.getRegion('search').show(SearchViewInstance);
    app.LayoutViewInstance.getRegion('list').show(ListViewInstance);

  }

});
