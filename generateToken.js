var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("<YOUR-SECRET-HERE>");
var token = tokenGenerator.createToken({uid: "server"});
console.log(token);
