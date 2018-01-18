const request = require('request');

var geoCodeAddress = (address)=> {

	return new Promise((resolve, reject) => {
		const encodedAddress = encodeURIComponent(address);

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBmmv-SC9bLvUqXoI71rVd3Z-J7TINRqxQ`,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject('Unable to connect to Googl servers');
			} else if (body.status === 'ZERO_RESULTS') {
				reject('Unable to find that address');
			} else if (body.status === 'OK') {
				resolve({
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			}
		});
	});
};

geoCodeAddress('223 big hollow').then((location)=> {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
})