// declare array to rotate through
var characters = ["test", "yoda", "luke", "han", "lando", "rey", "poe", "finn", "windu", "amidala", "qui-gon", "chewbacca",
                    "r2-d2", "ackbar", "leia", "anakin", "palpatine", "greedo", "jabba", "maul", "vader","binks",
                    "wicket","grievous", "dooku","boba","jango",'ayla','ki-adi','obi-wan','kit'];
// dummy array that will be replaced by user picks
var user_picks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false, false, false, false, false, false,false,false,false,false,false];
var current_char = 0;
var person = (characters[current_char]);

// initialize firebase
var config = {
    apiKey: "AIzaSyDqMMiRCJqUOw2BGZe3UETcuBPDFyHIn04",
    authDomain: "hoth-or-not-d14ab.firebaseapp.com",
    databaseURL: "https://hoth-or-not-d14ab.firebaseio.com",
    projectId: "hoth-or-not-d14ab",
    storageBucket: "hoth-or-not-d14ab.appspot.com",
    messagingSenderId: "273129403707"
};
firebase.initializeApp(config);

var database = firebase.database();

var hotCount = 0;
var notCount = 0;
var totalVotes = 0;

// function that runs on click of the Mustafar button
function fire(event) {
    event.preventDefault();
    var gamma = $(this).attr("data-Hvalue");

    database.ref().on("value", function(snapshot) {

        // take information from firebase
        hotCount = snapshot.val()[gamma].hot;
        notCount = snapshot.val()[gamma].not;
        totalVotes = snapshot.val()[gamma].total;
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    // add votes to global variables
    hotCount++;
    totalVotes++;

    // change data on firebase
    database.ref().child(gamma).set({
        hot: hotCount,
        not: notCount,
        total: totalVotes
    });

    // adds user pick to the array, advances to next character, and calls checker 
    user_picks[current_char] = true;
    current_char++;
    person = (characters[current_char]);
    checker();
}; 

// function called in hoth button on click event, mirrors mustafar button
function ice(event) {
    event.preventDefault();
    var gamma = $(this).attr("data-Cvalue");
    database.ref().on("value", function(snapshot) {
        hotCount = snapshot.val()[gamma].hot;
        notCount = snapshot.val()[gamma].not;
        totalVotes = snapshot.val()[gamma].total;
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    notCount++;
    totalVotes++;
    database.ref().child(gamma).set({
        hot: hotCount,
        not: notCount,
        total: totalVotes
    });

    user_picks[current_char] = false;
    current_char++;
    person = (characters[current_char]);
    checker();
};
// function to generate the information, image, and buttons for the next character
function generate() {
    // Generate 'Hot' Button
    $("#mustafar-btn").empty();
    var nextHotBtn = $("<button>");
    nextHotBtn.addClass('waves-effect waves-light btn-large mustafar-btn')
    nextHotBtn.attr("data-Hvalue", person);
    nextHotBtn.text("MUSTAFAR");
    $("#mustafar-btn").html(nextHotBtn); 

    // Generate 'Cold' Button
    $("#hoth-btn").empty();
    var nextColdBtn = $("<button>");
    nextColdBtn.addClass('waves-effect waves-light btn-large hoth-btn ')
    nextColdBtn.attr("data-Cvalue", person);
    nextColdBtn.text("HOTH");
    $("#hoth-btn").html(nextColdBtn);         

    // Function to deliver images and character info
    getImage(person); 
    charInfo(person);         
}
// checks if at the end of the character array
function checker() {
    // if at end of array route to results page
    if (current_char == (characters.length)) {
        localStorage.setItem('votes',JSON.stringify(user_picks));
        window.location.href = "/results";
    }
    // otherwise run generate function to deliver next character
    else if (current_char < (characters.length)) {
        generate();
    }
}
// makes AJAX calls to SWAPI to display information about each character
var charInfo = (character) =>{
    if (current_char ==0){
        // displays initial readout for 'test' case at index 0
        $('#info-div').html('<h3>Click either button to get started!</h3>')
    } else {
    $.ajax({
        url: `https://swapi.co/api/people/?search=${character}`,
        method: "GET"
      }).then((result) => {
        // appends info-div with the character information
        $("#info-div").empty();
        var name = $("<h5>");
        name.text(`Name: ${result.results[0].name}`);
        $("#info-div").append(name);
        var gender = $("<h5>");
        gender.text(`Gender: ${result.results[0].gender}`);
        $("#info-div").append(gender);
        var height = $("<h5>");
        height.text(`Height: ${result.results[0].height} cm`);
        $("#info-div").append(height);
        var mass = $("<h5>");
        mass.text(`Mass: ${result.results[0].mass} kg`);
        $("#info-div").append(mass);
        var eyeColor = $("<h5>");
        eyeColor.text(`Eye color: ${result.results[0].eye_color}`);
        $("#info-div").append(eyeColor);
        var skinColor = $("<h5>");
        skinColor.text(`Skin Color: ${result.results[0].skin_color}`);
        $("#info-div").append(skinColor);
        var birthYear = $("<h5>");
        birthYear.text(`Birth Year: ${result.results[0].birth_year}`);
        $("#info-div").append(birthYear);

        // ajax call for species
        $.ajax({
            // url: result.results[0].species[0].replace('https', 'http'),
            url: result.results[0].species[0],
            method: "GET"
          }).then((result) => {
            var species = $("<h5>");
            species.text(`Species: ${result.name}`);
            $("#info-div").append(species);
        });
        // ajax call for homeworld
        $.ajax({
            // url: result.results[0].homeworld.replace('https','http'),
            url: result.results[0].homeworld,
            method: "GET"
          }).then((result) => {
            var homeWorld = $("<h5>");
            homeWorld.text(`Homeworld: ${result.name}`);
            $("#info-div").append(homeWorld);
        });
    });
    }
};
// delivers an image based on the character name from our charObj.js
function getImage (charname) {
    $.get('/api/characters', function (data){
        console.log(data);
        for (var i =0;i<data.length;i++){
            if (data[i].name.indexOf(charname)>-1){
                if (charname==='obi-wan'){
                    Materialize.toast('Hello there!', 3500)
                }
                $('#img-div').empty();
                var newImg = $('<img>');
                newImg.addClass('char-img')
                newImg.attr('src',data[i].url);
                $('#img-div').append(newImg);
            }
        }
    })
}
// runs when the last characted is voted on, and outputs the users votes and all-user votes taken from firebase
var returnScore = () => {
    user_picks = JSON.parse(localStorage.getItem('votes'))
    console.log(user_picks);
    database.ref().on("value", function(snapshot) {     
        $('#data_dump_1').empty();
        $('#data_dump_2').empty();    
            for (var i=1;i<characters.length;i++){
                var gamma = characters[i];
                var choice = "";
                var hot = snapshot.val()[gamma].hot;
                var total = snapshot.val()[gamma].total;
                var percent = ((hot/total)*100).toFixed(2);
                var character = characters[i].charAt(0).toUpperCase() + characters[i].slice(1);
                if (user_picks[i]===false){
                    choice = 'Hoth';
                } else {
                    choice = 'Mustafar';
                }
                var result = (`${character}  || You voted: ${choice}`);
                var hotness = (`Total Hotness Score: ${percent}%`)
                var nextResult = $("<p>");
                var nextHotness = $("<p>");
                nextResult.addClass('voteResult');
                nextResult.text(result);
                nextHotness.addClass ('hotResult');
                nextHotness.text(hotness);
                var lineBump = $('<br>');
                if (i<=15){
                    $("#data_dump_1").append(nextResult);
                    $("#data_dump_1").append(nextHotness);
                }
                else if (i>15) {
                    $("#data_dump_2").append(nextResult);
                    $("#data_dump_2").append(nextHotness);
                }
                
            }
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};

$(document).on("click", ".hoth-btn", ice);
$(document).on("click", ".mustafar-btn", fire);
generate();

