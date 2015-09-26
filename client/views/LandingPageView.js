var app = app || {};

app.LandingPageView = Marionette.ItemView.extend({

  template: Handlebars.compile($('#landingPageTemplate').html()),

  events: {
    "change input#username": "getUsername",
    "change input#room-num": "getRoomNumber"
  },

  getUsername: function(event) {

    event.preventDefault();

    var username = $('#username').val();
    
    sessionStorage.setItem('username', username);

  },

  getRoomNumber: function(event) {

    event.preventDefault();

    var roomNumber = $('#room-num').val();

    sessionStorage.setItem('room-num', roomNumber);
  }

});
