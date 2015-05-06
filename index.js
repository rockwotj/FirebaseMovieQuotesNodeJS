var Firebase = require("firebase");
var fs = require("fs");
var key = null;

var token = "<GENERATED-TOKEN-HERE>";

fs.readFile('./lastKey.json', function (err, data) {
  key = data;
});

var saveKey = function(firebaseKey) {
  fs.writeFile('./lastKey.json', firebaseKey);
};

var moviequotesRef = new Firebase("https://rockwotj-moviequotes.firebaseio.com/quotes");
moviequotesRef.on("child_added", function(dataSnapshot) {
  var snapshotKey = dataSnapshot.key();
  if (!key || key < snapshotKey) {
    saveKey(snapshotKey);
    key = snapshotKey;
    var quote = dataSnapshot.child("quote");
    quote.ref().set(quote.val() + "!");
  }
});

var trashRef = new Firebase("https://rockwotj-moviequotes.firebaseio.com/trash");
trashRef.authWithCustomToken(token, function(error, authData) {
  if (error) {
    console.log("Login Failed!");
  } else {
    console.log("Authenticated Successful!");
  }
});
moviequotesRef.on("child_removed", function(dataSnapshot) {
  var deletedQuote = dataSnapshot.exportVal();
  trashRef.push().set(deletedQuote);
});
