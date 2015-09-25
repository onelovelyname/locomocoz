var app = app || {};

app.db = new Firebase('https://vivid-inferno-258.firebaseio.com//');

app.usersTable = app.db.child("users");
app.roomsTable = app.db.child("rooms");
app.placesTable = app.db.child("places");
