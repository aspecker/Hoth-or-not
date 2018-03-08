var characters = ["test", "yoda", "luke", "han", "lando", "rey", "poe", "finn", "windu", "amidala", "qui-gon", "chewbacca",
                    "r2-d2", "ackbar", "leia", "anakin", "palpatine", "greedo", "jabba", "maul", "vader","binks",
                    "wicket","grievous", "dooku","boba","jango"];
var user_picks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false, false, false, false, false, false];
var current_char = 0;
var person = (characters[current_char]);

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

function fire(event) {
    event.preventDefault();
    var gamma = $(this).attr("data-Hvalue");

    database.ref().on("value", function(snapshot) {

        hotCount = snapshot.val()[gamma].hot;
        notCount = snapshot.val()[gamma].not;
        totalVotes = snapshot.val()[gamma].total;
        //console.log(hotCount);
        //console.log(notCount);

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    //console.log(gamma)
    hotCount++;
    totalVotes++;

    database.ref().child(gamma).set({
        hot: hotCount,
        not: notCount,
        total: totalVotes
    });

    user_picks[current_char] = true;
    current_char++;
    person = (characters[current_char]);
    checker();
}; 

function ice(event) {
    event.preventDefault();
    var gamma = $(this).attr("data-Cvalue");
    database.ref().on("value", function(snapshot) {

        hotCount = snapshot.val()[gamma].hot;
        notCount = snapshot.val()[gamma].not;
        totalVotes = snapshot.val()[gamma].total;
        //console.log(notCount);
        //console.log(notCount);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


    //console.log(gamma + " pickles");
    //console.log(beta);
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
    if (current_char == 27) {
        console.log(current_char);
        // module.exports = user_picks;
        window.location.replace = "/results";
    }
    else if (current_char < 27) {
        generate();
    }
}
var charInfo = (character) =>{
    if (current_char ==0){
        $('#info-div').html('<h3>Click either button to get started!</h3>')
    } else {
    $.ajax({
        url: `http://swapi.co/api/people/?search=${character}`,
        method: "GET"
      }).then((result) => {
    // swapi.get(`http://swapi.co/api/people/?search=${character}`).then((result) => {
        console.log(result)

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

        $.ajax({
            url: result.results[0].species[0].replace('https', 'http'),
            method: "GET"
          }).then((result) => {
            console.log(result)

        // swapi.get(result.results[0].species[0].replace('https', 'http')).then((result)=>{
            var species = $("<h5>");
            species.text(`Species: ${result.name}`);
            $("#info-div").append(species);
        });
        $.ajax({
            url: result.results[0].homeworld.replace('https','http'),
            method: "GET"
          }).then((result) => {
              console.log(result)
        // swapi.get(result.results[0].homeworld.replace('https','http')).then((result)=>{
            var homeWorld = $("<h5>");
            homeWorld.text(`Homeworld: ${result.name}`);
            $("#info-div").append(homeWorld);
        });
    });
    }
};
function getImage (charname) {
    // console.log(charname);
    $.get('/api/characters', function (data){
        for (var i =0;i<data.length;i++){
            if (data[i].name.indexOf(charname)>-1){
                // console.log(data[i]);
                $('#img-div').empty();
                var newImg = $('<img>');
                newImg.addClass('char-img')
                newImg.attr('src',data[i].url);
                $('#img-div').append(newImg);
            }
        }
    })
}
$(document).on("click", ".hoth-btn", ice);
$(document).on("click", ".mustafar-btn", fire);
generate();

