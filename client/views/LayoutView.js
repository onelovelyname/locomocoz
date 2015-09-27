var app = app || {};

app.LayoutView = Marionette.LayoutView.extend({

  tagName: 'section',

  template: Handlebars.compile($('#layoutTemplate').html()),

  regions: {
    'search': '#search-region',
    'map': '#map-region',
    'list': '#list-region',
    'info': '#info-region'
  }

});
