const swapi = require('swapi-node');
var giphyKey = '8M2UHf1IMhGeVjJh9FucWYCaTAmV2gKs';
const giphy = require('giphy-api')(giphyKey);

var char = process.argv[2];

var userVotes = [false,true,false,false];
var characters = ['test',"yoda", "luke", "han", "lando", "rey", "poe", "finn", "windu", "amidala", "qui-gon", "chewbacca", "r2-d2", "ackbar", "leia", "anakin", "palpatine", "greedo", "jabba", "maul", "vader","binks","wicket","grievous", "dooku","boba","jango"];
var charArr = [
    {
        name: 'luke',
        hot: 10,
        not: 5
    },
    {
        name: 'vader',
        hot: 3,
        not: 14
    },
    {
        name: 'han',
        hot: 15,
        not: 1
    },
    {
        name: 'leia',
        hot: 17,
        not: 0
    }
]

// function for pulling character information from the SWAPI
var charInfo = (character) =>{
    swapi.get(`http://swapi.co/api/people/?search=${character}`).then((result) => {
    console.log(`\nName: ${result.results[0].name}`);
    console.log(`Gender: ${result.results[0].gender}`);
    console.log(`Height: ${result.results[0].height} cm`);
    console.log(`Mass: ${result.results[0].mass} kg`);
    console.log(`Eye color: ${result.results[0].eye_color}`);
    console.log(`Skin Color: ${result.results[0].skin_color}`);
    console.log(`Birth Year: ${result.results[0].birth_year}`);

    swapi.get(result.results[0].species[0].replace('https', 'http')).then((result)=>{
        console.log(`Species: ${result.name}`);
    });
    swapi.get(result.results[0].homeworld.replace('https','http')).then((result)=>{
        console.log(`Homeworld: ${result.name}`);
    });
    });
};
// charInfo(char);

// for (var i=0;i<charArr.length;i++){
//     charInfo(charArr[i].name);
// }

// function for displaying user score and total score at the end of the game
var returnScore = () => {
    for (var i=0;i<charArr.length;i++){
        var choice = "";
        var hot = charArr[i].hot;
        var total = charArr[i].hot +charArr[i].not;
        var percent = Math.floor((hot/total)*100);
        var character = charArr[i].name.charAt(0).toUpperCase() + charArr[i].name.slice(1);
        if (userVotes[i]===false){
            choice = 'Hoth';
        } else {
            choice = 'Mustafar';
        }
        console.log(`Character: ${character}  || You voted: ${choice}  ||  Total Hotness Score: ${percent}`)
    }
}
// returnScore();

// returns a gif based on the character tag
var gifMe = (character) =>{
    giphy.search(character).then(function (res){
        console.log(res.data[0].url);
    });
}
// gifMe(char);
