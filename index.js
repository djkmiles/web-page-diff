var express = require('express');
var app = express();
var Promise = require('promise');
var webshot = require('webshot');
var imageDiff = require('image-diff');

var port = process.env.PORT || 3000;

app.get('/v1/:one/:two', function(req, res) {
	var one = req.params.one;
	var two = req.params.two;
	if (!(one && two)) error('Request must contain urls for "one" and "two".');
	var opt = {shotSize: {width: 'window', height: 'all'}};
	console.log('Getting %s and %s', one, two);
	webshot(one, 'one.png', opt, function() {
		console.log('Rendered %s', one);
		webshot(two, 'two.png', opt, function() {
			console.log('Rendered %s', two);
			console.log('Comparing...');
			imageDiff({
				actualImage: 'one.png',
				expectedImage: 'two.png',
				diffImage: 'diff.png',
			}, function (err, imagesAreSame) {
				if (err) throw new Error(err);
				if (imagesAreSame) return end(res, 200, 'Pages are the same!');
				res.sendFile(process.env.PWD + '/diff.png');
				console.log('Done, streamed output OK!');
			});
		});
	});
});

function error(res, msg) {
	console.error(msg);
	end(res, 400);
}

function end(res, code, msg) {
	if (msg) console.log(msg);
	res.writeHead(code || 200, {'Content-type': 'text/plain'});
	res.end(msg ? msg : '');
}

app.listen(port, function(){
	console.log('Webdiff server listening on port %s', port);
});
