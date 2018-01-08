const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// handle response of geocodeAddress with a callback that either logs an error or stringifies the result
geocode.geocodeAddress(argv.address, (errorMessage, results)=> {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(results.address);

		// run weather based on success
		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemp}.`);
			}
		});
	}
});

