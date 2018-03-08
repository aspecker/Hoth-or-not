var characters = require ('../data/charObj.js')

module.exports = function (app){
    app.get('/api/characters', function (req,res){
        res.send(characters);        
    })
}