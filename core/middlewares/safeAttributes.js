var models= require('path').resolve('./advaya').models;

module.exports= function (req,res,next) {
	if(req.options.action === "update")	
	{
		if(models[req.options.controller].schema.hasOwnProperty('safeAttributes'))
		{
			models[req.options.controller].schema.safeAttributes.map(function (val) {
				delete req.body[val];
				delete req.Params[val];
			});
			next();
		}
		else
		{
			next();
		}
	}
	else
	{
		next();
	}
}