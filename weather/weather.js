const request = require('request');


var getWeather = (lat, lng, callback)=> {
		request({
		url: `https://api.darksky.net/forecast/7d8922c7a3944e0741158d456278bb48/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemp: body.currently.apparentTemperature
			});
		} else {
			callback('unable to fetch weather');
		}
	});
};

module.exports.getWeather = getWeather;
