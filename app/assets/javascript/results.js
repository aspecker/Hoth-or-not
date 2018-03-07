// var characters = ["yoda", "porg", "luke", "han", "lando", "rey", "poe", "finn", "mace_windu", "amidala", "qui-gon", "chewbacca",
    //                     "wicket_warrick", "r2-d2", "ackbar", "leia", "anakin", "palpatine", "general_grevious", "count_dooku",
    //                     "greedo", "jabba_the_hutt", "boba_fett", "jango_fett", "snoke", "darth_maul", "phasma", "tusken_raider", "darth_vader",
    //                     "jar_jar_binks", "kylo_ren"];
    var characters = ["test", "yoda", "luke", "han", "lando", "rey", "poe", "finn", "windu", "amidala", "qui-gon", "chewbacca",
                        "r2-d2", "ackbar", "leia", "anakin", "palpatine", "greedo", "jabba", "maul", "vader","binks",
                        "wicket","grievous", "dooku","boba","jango"];
    //var user_picks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false,
        //                   false, false, false, false, false, false, false, false, false, false, false, false, false];
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
    
    
    $.ajax({ url: currentURL + "api/user_picks", method: "GET"})
    .then(function(returnScore){
    // var returnScore = () => {
        database.ref().on("value", function(snapshot) {
                                
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
                    var result = (`Character: ${character}  || You voted: ${choice}  ||  Total Hotness Score: ${percent}%`);
                    var nextResult = $("<h3>");
                    nextResult.text(result);
                    if (i<=14){
                        $("#data_dump_1").append(nextResult);
                    }
                    else if (i>14) {
                        $("#data_dump_2").append(nextResult);
                    }
                }
            

        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    // }
    })