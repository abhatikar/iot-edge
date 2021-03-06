'use strict';

let Protocol = require('azure-iot-device-amqp').Amqp;
let Client = require('azure-iot-device').Client;
let Message = require('azure-iot-device').Message;

class IotHubWriterModule
{
    constructor() {
        this.iothub_client = null;
        this.connected = false;
    }

    on_connect(err) {
        if(err) {
            console.error(`Could not connect to IoT Hub. Error: ${err.message}`);
        }
        else {
            this.connected = true;
            this.iothub_client.on('error', this.on_error.bind(this));
            this.iothub_client.on('disconnect', this.on_disconnect.bind(this));
            this.iothub_client.on('message', this.on_message.bind(this));
        }
    }

    on_error(err) {
        console.error(`Azure IoT Hub error: ${err.message}`);
    }

    on_disconnect() {
        console.log('Got disconnected from Azure IoT Hub.');
        this.connected = false;
    }

    on_message(msg) {
	    console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
	    this.iothub_client.complete(msg, () => {
			    console.log('Done');
	    });
	    var parsedData = JSON.parse(msg.data);
	    //var parsedData = JSON.parse("{\"Frequency\" : \"2000\"}");
	    this.broker.publish({
		properties: {
			'source': 'iothubwriter'
		},
		content: new Uint8Array(
			Buffer.from(JSON.stringify(parsedData), 'utf8')
			)
		});
    }

    create(broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;

        if(this.configuration && this.configuration.connection_string) {
            // open a connection to the IoT Hub
            this.iothub_client = Client.fromConnectionString(this.configuration.connection_string, Protocol);
            this.iothub_client.open(this.on_connect.bind(this));

            return true;
        }
        else {
            console.error('This module requires the connection string to be passed in via configuration.');
            return false;
        }
    }

    receive(message) {
	    if(this.connected) {
		    var m = new Message(JSON.stringify(message.content));
		    if(message.properties) {
			    for(var prop in message.properties) {
				    m.properties.add(prop, message.properties[prop]);
			    }
		    }
		    this.iothub_client.sendEvent(m, err => {
			    if(err) {
				    console.error(`An error occurred when sending message to Azure IoT Hub: ${err.toString()}`);
			    }
		    });
	    }
     }

    destroy() {
        console.log('iothub_writer.destroy');
        if(this.connected) {
            this.iothub_client.close(err => {
                if(err) {
                    console.error(`An error occurred when disconnecting from Azure IoT Hub: ${err.toString()}`);
                }
            });
        }
    }
}

module.exports = new IotHubWriterModule();
