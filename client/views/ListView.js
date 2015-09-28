var app = app || {};

app.ListView = Marionette.CompositeView.extend({


  template: _.template("<div><h4>Room Number:&nbsp;<%= getRoomNumber() %></h4></div><table class='table'>"+
      "<thead><tr><th>Place</th><th>Suggested by</th><th>Votes</th><th>Vote</th></tr></thead>"+
      "<tbody></tbody></table>"),

  collection: app.places,

  childView: app.ListItemView,

  childViewContainer: "tbody",

  emptyView: app.EmptyListView,

  templateHelpers: function() {

    return {

      getRoomNumber: function() {
        return sessionStorage.getItem('room-num');
      }

    };

  },

});
