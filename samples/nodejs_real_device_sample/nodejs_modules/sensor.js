'use strict';

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        return true;
    },

    start: function () {
	var net = require('net'),
	JsonSocket = require('json-socket');
	var port = 9838;
	var server = net.createServer();
	server.listen(port);
	server.on('connection', (socket) => { //This is a standard net.Socket
	    socket = new JsonSocket(socket); /* Now we've decorated
						the net.Socket to be a JsonSocket */
	    socket.on('message', (messagedata) => {
		var temperature = parseFloat(messagedata.Temperature);
		var humidity = parseFloat(messagedata.Humidity);
		var MacAddr = messagedata.MacAddr;
		var SensorID = messagedata.SensorID;
		var SensorName = messagedata.SensorName;
		var newProperties = {
                            'source': SensorName,
                            'macAddr': MacAddr,
                            'SensorID': SensorID
                };
		var newContent = {
			GatewayID: 'Ubuntu G/W',
			temperature: temperature,
			humidity : humidity
		};

		this.broker.publish({
			properties: newProperties,
			content: new Uint8Array(Buffer.from(JSON.stringify(newContent), 'utf8'))
			/*
			content: new Uint8Array([
				temperature,
				humidity
			])
			*/
		});
	    });
	});
    },

    receive: function(message) {
    },

    destroy: function() {
        console.log('sensor.destroy');
    }
};
