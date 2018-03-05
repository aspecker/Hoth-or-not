const swapi = require('swapi-node');
// const inquirer = require ('inquirer');

// inquirer.prompt([
//     {
//         type: 'input',
//         name: 'search',
//         message: 'Search a character.'
//     }
// ]).then(function(user){
//     var search = user.search;
//     searchSWAPI(search);
// });
var charArray = ['Luke Skywalker','Darth Vader','Leia Organa','Jar Jar Binks','R2-D2'];
var random = Math.floor(Math.random()*charArray.length);
console.log(charArray);
console.log(random);
var searchSWAPI = function (search){
    swapi.get(`http://swapi.co/api/people/?search=${search}`).then((result) => {
    // console.log(result);
    console.log(result.results[0].name);
    console.log(result.results[0].height);
})
}
searchSWAPI(charArray[random]);
