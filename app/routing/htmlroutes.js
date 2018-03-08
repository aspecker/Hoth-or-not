var path = require ('path');

module.exports = function (app){
    app.get('/game', function (req,res) {
        res.sendFile(path.join(__dirname,'../game.html'));
    });
    app.get('/', function (req,res){
        res.sendFile(path.join(__dirname,'../index.html'));
    });
    app.get('/results',function (req,res){
        res.sendFile(path.join(__dirname,'../results.html'))
    });
}
