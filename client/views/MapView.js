var app = app || {};

app.MapView = Marionette.ItemView.extend({

  template: Handlebars.compile($('#mapTemplate').html())

});
