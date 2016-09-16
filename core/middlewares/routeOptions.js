var pathToRegexp= require('path-to-regexp');
var routeMap= require('./utils/routeMap');
var capitalize= require('./utils/capitalize');

var testUrl= pathToRegexp('/:model/:id?',[]);
var url= require('url');

var allSupportedActions= ['find','findOne','create','update','destroy'];

var _= require('lodash');

module.exports= function (controllers) {
	return function (req,res,next) {
		var test= testUrl.exec(url.parse(req.url).pathname);
		var options= {
			method: req.method,
			controller: undefined,
			action: undefined
		};

		if(test)
		{
			options['controller']=capitalize(test[1]);

			var allAdditionalRoutesInController;
			if(controllers[capitalize(test[1])+'Controller'])
			{
				allAdditionalRoutesInController=Object.keys(controllers[capitalize(test[1])+'Controller']);
				allAdditionalRoutesInController=_.difference(allAdditionalRoutesInController, allSupportedActions);
			}

			console.log(allAdditionalRoutesInController,allSupportedActions.indexOf(test[2]));

			if(allAdditionalRoutesInController && allAdditionalRoutesInController.indexOf(test[2])>=0)
			{
				options['action']=test[2];
				console.log(1);
			}
			else if(allSupportedActions.indexOf(test[2])>=0 )
			{
				console.log(2);
				options['action']=undefined;
			}
			else
			{
				options['action']=routeMap(req.method,test[2]);
				console.log(3);
			}
		}

		req.options=options;

		// console.log(options);
		return next();
	}
} 