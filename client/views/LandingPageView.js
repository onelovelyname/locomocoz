var app = app || {};

app.LandingPageView = Marionette.ItemView.extend({

  template: Handlebars.compile($('#landingPageTemplate').html()),

  events: {
    "change input#username": "getUsername"
  },

  getUsername: function(event) {

    event.preventDefault();

    app.username = $('#username').val();

  }

});
