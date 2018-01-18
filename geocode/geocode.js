const request = require('request');

var geocodeAddress = (address, callback)=> {
	// encodeURIComponent() adds the %20 for spaces in strings. decodeURIComponent() does the opposite
	const encodedAddress = encodeURIComponent(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBmmv-SC9bLvUqXoI71rVd3Z-J7TINRqxQ`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Googl servers')
		} else if (body.status === 'ZERO_RESULTS') {
			callback('Unable to find that address');
		} else if (body.status === 'OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});
}

module.exports = {
	geocodeAddress
}