var acl= require('./utils/acl');
var token= require('path').resolve('./advaya').token;
var defaults= acl.defaults();

module.exports= function (req,res,next) {

	//has authorization header
	if(req.headers.hasOwnProperty('authorization'))
	{
		var token=req.headers['authorization'].split('Bearer ')[1];

		if(!token.verify(token))
			return res.status(401).json({msg:"Malformed token supplied",status:4300});

	    var decoded= token.payload(token);

	    var authName=defaults['authenticated_default'];
	    if(decoded.hasOwnProperty('auth'))
	    	authName=decoded.auth;

	    if( acl.verify({auth:authName,controller:req.options.controller, action:req.options.action}) )
	    {
			req.user={};
			req.user.id=decoded.base;
			return next();
	    }
	    else
	    	return res.status(401).json({msg:"Unauthorized Access",status:4301});
	}

	//No authorization header
	else
	{
		if( acl.verify({auth:defaults['not_authenticated_default'],controller:req.options.controller, action:req.options.action}) )
	    {
			return next();
	    }
	    else if(req.method==="OPTIONS")
	    {
	    	return next();
	    }
	    else
	    	return res.status(401).json({msg:"Unauthorized Access",status:4302});
	}

}