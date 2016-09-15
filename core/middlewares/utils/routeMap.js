var ObjectId= require('mongodb').ObjectId;

module.exports= function (method,action) {
	if(!isNaN(action))
		action= parseFloat(action);

	switch (method) {
		case 'GET':
			if(ObjectId.isValid(action))
				return 'findOne';
			else if(typeof(action)==="undefined")
				return "find";
			else
				return action;
			break;
		case 'POST':
			if(typeof(action)==="undefined")
				return "create";
			else
				return action;
			break;
		case 'PUT':
			if(ObjectId.isValid(action))
				return 'update';
			else
				return action;
			break;
		case 'DELETE':
			if(ObjectId.isValid(action))
				return 'destroy';
			else
				return action;
			break;
		default:
			return action;
			break;
	}
}