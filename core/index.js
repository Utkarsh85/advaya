var app= require('./app');
var middlewares= require('./middlewares');

middlewares.bodyParser(app);

app.use(middlewares.busboy);
middlewares.cors(app);
app.use(middlewares.aggregateParams);

app.use(middlewares.routeValidate);
app.use(middlewares.routeOptions);
app.use(middlewares.token);
app.use(middlewares.safeAttributes);

middlewares.routeLink.index(app);

module.exports= app;