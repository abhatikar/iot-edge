'use strict';

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;

        return true;
    },

    receive: function (message) {
	//console.log('Old format');
        //console.log(`printer.receive - ${message.content.join(', ')}`);
	//console.log('New format');
	var properties = JSON.stringify(message.properties);
	var content = Buffer.from(message.content).toString('utf8');

	console.log(`printer.receive.content - ${content}\n`);
	console.log(`printer.receive.properties - ${properties}`);
    },

    destroy: function () {
        console.log('printer.destroy');
    }
};
