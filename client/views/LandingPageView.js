var app = app || {};

app.LandingPageView = Marionette.ItemView.extend({

  template: Handlebars.compile($('#landingPageTemplate').html()),

  events: {
    "change input#username": "getUsername",
    "change input#room-num": "getRoomNumber",
    "click a#create-new-room": "createNewRoom"
  },

  onBeforeShow: function() {

    $('body').addClass("home-ui");

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
  
  },

  createNewRoom: function(event) {

    var user = sessionStorage.getItem('username');
    var newRoomRef = app.roomsTable.push({ creator: user });
    var roomId = newRoomRef.key();

    sessionStorage.setItem('room-num', roomId);

  }

});
