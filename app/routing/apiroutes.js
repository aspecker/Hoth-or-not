// var firebase = require ('../data/firebase.js');
var characters = require ('../data/charObj.js')
console.log(characters);


module.exports = function (app){
    var array = [];
    app.post('/api/characters', function (req,res){
        console.log(req.body.char);
 
        // console.log(array);
    });
    app.get('/api/characters', function (req,res){
        res.send(characters);        
    })
}