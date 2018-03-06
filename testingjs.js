//import { METHODS } from 'http';

//var fs = require('fs');
var firebase = require('firebase');


var characters = ["Rey", "Darth Sideous", "Porg"];

var index = Math.floor(Math.random() * characters.length);
var active = characters[index];

//console.log (active);
//console.log (index);

var config = {
   apiKey: "AIzaSyDqMMiRCJqUOw2BGZe3UETcuBPDFyHIn04",
   authDomain: "hoth-or-not-d14ab.firebaseapp.com",
   databaseURL: "https://hoth-or-not-d14ab.firebaseapp.com",
   storageBucket: "gs://hoth-or-not-d14ab.appspot.com"
  };
  //console.log("1");

  firebase.initializeApp(config);
  //console.log("2");

  var database = firebase.database();
  //console.log(database);
  database.ref().on("value", function(snapshot) {
      console.log(snapshot);
     // var hotCount = snapshot.hot.val();
    }, function(errorObject) {

        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
      });
     // console.log(snapshot.val());


//   service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read, write: if request.auth != null;
//       }
//     }
//   }



// fs.readFile("testing.txt", "utf8", function(err, data) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);
//     var info = data.split(",");
//     console.log (info);
    // var mission = info[0];
    // var reward = info[1];
    // console.log(mission);
    // console.log(reward);
//});



//every METHODS

//firebase

