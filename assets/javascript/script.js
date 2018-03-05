const swapi = require('swapi-node');

var charInfo = (char) =>{
    swapi.get(`http://swapi.co/api/people/?search=${char}`).then((result) => {
    console.log(`Name: ${result.results[0].name}`);
    console.log(`Gender: ${result.results[0].gender}`);
    console.log(`Height: ${result.results[0].height} cm`);
    console.log(`Mass: ${result.results[0].mass} kg`);
    console.log(`Eye color: ${result.results[0].eye_color}`);
    swapi.get(result.results[0].species[0].replace('https', 'http')).then((result)=>{
        console.log(`Species: ${result.name}`);
    });
    swapi.get(result.results[0].homeworld.replace('https','http')).then((result)=>{
        console.log(`Homeworld: ${result.name}`)
    });
});

}
charInfo('anakin');