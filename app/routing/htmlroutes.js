var path = require ('path');

module.exports = function (app){
    app.get('/game', function (req,res) {
        res.sendFile(path.join(__dirname,'/../public/gamepage.html'));
    });
    app.get('*', function (req,res){
        res.sendFile(path.join(__dirname,'/../public/index.html'));
    });
    app.get('/results',(req,res)=>{
        res.sendFile(path.join(__dirname,'/../public/score.html'))
    });
}
