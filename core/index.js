module.exports= function (models,controllers,token) {
	var app= require('./app');
	var middlewares= require('./middlewares');

	middlewares.bodyParser(app);

	app.use(middlewares.busboy);
	middlewares.cors(app);
	app.use(middlewares.aggregateParams);

	app.use(middlewares.routeValidate);
	app.use(middlewares.routeOptions(controllers));

	app.use(middlewares.token(token));
	app.use(middlewares.safeAttributes(models));

	middlewares.routeLink.index(app,models,controllers);
	
	return app;
}