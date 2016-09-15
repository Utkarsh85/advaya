var models= require(require('path').resolve('./advaya')).models();
var controllers= require(require('path').resolve('./advaya')).controllers();

module.exports= function (app) {

	app = require('./map/actions')(app,models,controllers);
	app = require('./map/find')(app,models,controllers);
	app = require('./map/findOne')(app,models,controllers);
	app = require('./map/create')(app,models,controllers);
	app = require('./map/update')(app,models,controllers);
	app = require('./map/destroy')(app,models,controllers);

	return app;
}