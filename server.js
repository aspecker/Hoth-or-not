const bodyParser = require ('body-parser');
const express = require ('express');
const path = require ('path');
var app = express ();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './app/public')));

require ('./app/routing/apiroutes.js')(app);
require ('./app/routing/htmlroutes.js')(app);


app.listen(PORT, function () {
    console.log('Listening on '+PORT);
});
