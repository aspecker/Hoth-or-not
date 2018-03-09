// declare array to rotate through
var characters = ["test", "yoda", "luke", "han", "ackbar", "lando", "jabba","vader","rey", "palpatine",  "binks", "finn", "grievous", "amidala", "qui-gon", "chewbacca","poe","r2-d2", "leia", "anakin", "greedo", "maul","windu", "wicket", "dooku","boba",'obi-wan'];
// dummy array that will be replaced by user picks
var user_picks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false];
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
var topHots = [];
var topNots = [];

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
        $('#info-div').html("<h5>Click either button to get started!</h5> <h5>Mustafar for Hot, and Hoth for Not.</h5>")
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
// runs when the last character is voted on, and outputs the users votes and all-user votes taken from firebase
var returnScore = () => {
    user_picks = JSON.parse(localStorage.getItem('votes'))
    database.ref().on("value", function(snapshot) {       topHots = [];
        topNots = [];
        $('#data-dump').empty();
        $('#data-dump').append('<h3>Your votes</h3>')
        $('#totalVotes').empty();
        $('#totalVotes').html(`<h2 id='voteDisplay'>${snapshot.val()[characters[1]].total} total users have voted</h2>`);

            for (var i=1;i<characters.length;i++){
                // gather vote counts from firebase
                var gamma = characters[i];
                var output = $('<p>');
                var choice = '';
                var hot = snapshot.val()[gamma].hot;
                var total = snapshot.val()[gamma].total;
                var percent = ((hot/total)*100).toFixed(2);
                var result = '';
                var character = characters[i].charAt(0).toUpperCase() + characters[i].slice(1);
                // add high and low results to arrays
                if (percent>70){
                    topHots.push(gamma);
                }
                if (percent<35){
                    topNots.push(gamma);
                }
                // assign strings based on user vote
                if (user_picks[i]===false){
                    choice = 'Hoth';
                    output.addClass('hothResult');
                } else {
                    choice = 'Mustafar'
                    output.addClass('musResult');
                }
                 output.text(`${character}  |  You: ${choice}  |  ${percent}% think Mustafar`)
                $('#data-dump').append(output);
            }
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};
var mostHot = () =>{
    $('#data-dump').empty();
    $('.data-dump').addClass('musResult');
    $('#data-dump').append('<h3 class="musResult">The Most Mustafar<h3>');
        
    database.ref().on("value", function(snapshot) {
        for (var i=0;i<topHots.length;i++){
            var gamma = topHots[i];
            var char = gamma.charAt(0).toUpperCase() + gamma.slice(1);
            var hot = snapshot.val()[gamma].hot;
            var total = snapshot.val()[gamma].total;
            var percent = ((hot/total)*100).toFixed(2);
            $('#data-dump').append(`<p >${char}:    <b>${percent}%</b>    Mustafar</p>`)
        }
    }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
    });      
}
var mostNot = () =>{
    $('#data-dump').empty();
    $('.data-dump').addClass('hothResult');
    $('#data-dump').append('<h3 class="hothResult">The Most Hoth<h3>')
        
    database.ref().on("value", function(snapshot) {
        for (var i=0;i<topNots.length;i++){
            var gamma = topNots[i];
            var char = gamma.charAt(0).toUpperCase() + gamma.slice(1);
            var hot = snapshot.val()[gamma].hot;
            var total = snapshot.val()[gamma].total;
            var percent = ((hot/total)*100).toFixed(2);
            $('#data-dump').append(`<p>${char}:    <b>${percent}%</b>    Mustafar</p>`)
        }
    }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
    });  
}


$(document).on("click", ".hoth-btn", ice);
$(document).on("click", ".mustafar-btn", fire);
$(document).on('click', "#mostHot",mostHot);
$(document).on('click','#mostNot',mostNot);
$(document).on('click','#myVotes',returnScore)
generate();

