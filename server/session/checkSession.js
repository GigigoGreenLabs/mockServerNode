var BaseServer = require('../_base/entities/Server.js');
var LoggerUtils = require('../_utils/Logger.js');

function _showHelp() {
	var helpMessage = "*** " + this._configuration.getName() + ": use " + this._configuration.getMethod() + " " + this._configuration.getEndpoint();
	helpMessage += "\n body params: 'token' & 'user'";
	return helpMessage;
}

function _createEndpoints() {
	this._server.launchCall(this._configuration.getEndpoint(), this._configuration.getMethod(), this._configuration.getResponseType(), function (req, res) {			  	
	  	var response;
		
		var token = req.getBodyParam("token");
		var user = req.getBodyParam("user");

		response = res.loadResponseFile();	

		if((token == undefined) || (user == undefined)) {
			response.code = "1";
			response.error = "bad POST body parameters";

			if(token == undefined) 
				response.data = { "message": "'token' empty"};
			if(user == undefined) 
				response.data = { "message": "'user' empty"};
		}

	  	return response;
	});
}

exports.init = function(app, options) {
	this._server = BaseServer.Server(app, options);
	this._configuration = this._server.getConfiguration();

	_logger = LoggerUtils.Logger(true);

	if(this._server != undefined)
		_createEndpoints.call(this);	
	else {
		_logger.error("Server can not be created! please check your configuration");
	}
}

exports.getServerConfiguration = function(){
	return this._server.getConfiguration();
}
exports.showHelp = function() {
	return _showHelp.call(this);
}