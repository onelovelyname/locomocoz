var App = Marionette.Application.extend({

  initialize: function() {

    $(window).on('resize', function() {

      if ($('body').width() > 991) {

        var mapHeight = ($('body').height() - 120).toString() + "px";
        $('#map-region').css("height", mapHeight);
        
      } else {

        $('#map-region').css("height", "400px");

      }
      
    });

  }

});

var app = new App();

app.addRegions({
  appRegion: '#app-region'
});

