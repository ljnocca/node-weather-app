const yargs = require('yargs');
// axios library helps with promises so that you can easily chain them. it's get method returns a promise so you can use 'then'
// promises instead of traditional callbacks because you can nest callbacks you can simply chain
const axios = require('axios');

// object that stores final parsed output. Takes the input from the process variable pass it through yargs and result is here
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

const encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBmmv-SC9bLvUqXoI71rVd3Z-J7TINRqxQ`

axios.get(geocodeURL).then((response) => {
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find that address');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;

	var weatherURL = `https://api.darksky.net/forecast/7d8922c7a3944e0741158d456278bb48/${lat},${lng}`
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherURL);
}).then((response) => {
	var summary = response.data.currently.summary;
	var rainChance = response.data.currently.precipProbability;
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;

	console.log(`Today's weather: ${summary}.`);
	console.log(`Chance of rain today: ${rainChance}%`);
	console.log(`It's currently ${temperature}°F. It feels like ${apparentTemperature}°F.`);
}).catch((e) => {
	if(e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers');
	} else {
		console.log(e.message);
	}
});
