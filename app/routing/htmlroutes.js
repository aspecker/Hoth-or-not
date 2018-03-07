var path = require ('path');

module.exports = function (app){
    app.get('/game', function (req,res) {
        res.sendFile(path.join(__dirname,'/../public/game.html'));
    });
    app.get('*', function (req,res){
        res.sendFile(path.join(__dirname,'/../public/index.html'));
    });
    app.get('/results',(req,res)=>{
        res.sendFile(path.join(__dirname,'/../public/results.html'))
    });
    // app.get('*',(req,res)=>{
    //     res.sendFile(path.join(__dirname,'/../../testing.html'))
    // });
}
