var pathToRegexp= require('path-to-regexp');
var routeMap= require('./utils/routeMap');
var capitalize= require('./utils/capitalize');

var testUrl= pathToRegexp('/:model/:id?',[]);
var url= require('url');

module.exports= function (req,res,next) {
	var test= testUrl.exec(url.parse(req.url).pathname);
	var options= {
		method: req.method,
		controller: undefined,
		action: undefined
	};

	if(test)
	{
		options['controller']=capitalize(test[1]);
		options['action']=routeMap(req.method,test[2]);
	}

	req.options=options;

	console.log(options);
	return next();
}