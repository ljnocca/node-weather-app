console.log('Starting app');

setTimeout(() => {
	console.log('first timeout');
}, 2000);

setTimeout(()=> {
	console.log('second timeout');
}, 0);

console.log('Finishing app');