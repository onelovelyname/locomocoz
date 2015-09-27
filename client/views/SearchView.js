var app = app || {};

app.SearchView = Marionette.ItemView.extend({

  template: Handlebars.compile($('#searchTemplate').html()),

  tagName: "form",

  className: "form-inline",

  events: {
    "submit": "handleSubmit"
  },

  handleSubmit: function(event) {

    event.preventDefault();

    var suggestedPlace = $('#suggestedPlace').val();
    var currentPlace = $('#currentPlace').val();
  
    app.utility.sendGeocoderRequest(suggestedPlace, currentPlace);

  }

});
