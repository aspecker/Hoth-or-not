var firebase = require ('../data/firebase.js');


module.exports = function (app){
    var array = [];
    app.post('/api/characters', function (req,res){
        console.log(req.body.char);
        // console.log(array);
    });
}