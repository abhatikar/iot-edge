# How-To Enable Node JS Module Development
This document describes how to prepare your development environment to use *Azure IoT Edge* for Node JS module development.

## Prerequisites
- Install [Node.js](https://nodejs.org/)
- [Prepare your development environment](../../doc/devbox_setup.md)

## Building simple sample
### Windows
From a Visual Studio Developer Command Prompt:
- `cd <azure_iot_gateway_sdk_root>\tools\`
- `build_nodejs.cmd`
  - Will download and build Node JS from source as runtime linked modules
- Copy and paste the `set` message that shows up on screen to set the `NODE_INCLUDE` and `NODE_LIB` environment variables
- `build.cmd --enable-nodejs-binding`
- `cd ..\samples\nodejs_real_device_sample\nodejs_modules\`
- `npm install`

### Linux
From the command line:
- `cd <azure_iot_gateway_sdk_root>/tools/`
- `./build_nodejs.sh`
  - Will download and build Node JS from source as runtime linked modules
- Copy and paste the `export` message that shows up on screen to set the `NODE_INCLUDE` and `NODE_LIB` environment variables
- `./build.sh --enable-nodejs-binding`
- `cd ../samples/nodejs_real_device_sample/nodejs_modules/`
- `npm install`

## Running real device sample

### Windows
In order to run a gateway with a Node.js module do the following:
- `cd <azure_iot_gateway_sdk_root>\samples\nodejs_real_device_sample\src\`
- Update `gateway_sample_win.json` by replacing `<IoT Hub device connection string>` (in the `iothub_writer` module config JSON (*shown below*)) with your actual IoT Hub device connection string
```
        {
            "name": "iothub_writer",
            "loader": {
                "name": "node",
                "entrypoint": {
                    "main.path": "../../../samples/nodejs_real_device_sample/nodejs_modules/iothub_writer.js"
                }
            },
            "args": {
                "connection_string": "<IoT Hub device connection string>"
            }
        },
```
- `cd ..\..\..\build\samples\nodejs_real_device_sample\`
- `Debug\nodejs_real_device_sample ..\..\..\samples\nodejs_real_device_sample\src\gateway_sample_win.json`

### Linux
On a terminal window follow these steps:
- `cd <azure_iot_gateway_sdk_root>/samples/nodejs_real_device_sample/src/`
- Update `gateway_sample_lin.json` by replacing `<IoT Hub device connection string>` (in the `iothub_writer` module config JSON (*shown below*)) with your actual IoT Hub device connection string
```
        {
            "name": "iothub_writer",
            "loader": {
                "name": "node",
                "entrypoint": {
                    "main.path": "../../../samples/nodejs_real_device_sample/nodejs_modules/iothub_writer.js"
                }
            },
            "args": {
                "connection_string": "<IoT Hub device connection string>"
            }
        },
```
- `cd ../../../build/samples/nodejs_real_device_sample/`
- `./nodejs_real_device_sample ../../../samples/nodejs_real_device_sample/src/gateway_sample_lin.json`

## Running the code to get data from the Sensor Tag Device
### Linux
Power on the sensor tag and then on a terminal window follow these steps:

- `cd <azure_iot_gateway_sdk_root>/samples/nodejs_real_device_sample/nodejs_modules/`
- `sudo node sensortagTemperatureHumidity.js`


## Real Device sample output (IoTEdge Module)
On successful run you should see **sample** output like this
```
Gateway is running. Press return to quit.
printer.receive - 27, 82
printer.receive - 27, 82
printer.receive - 27, 82
printer.receive - 27, 82
printer.receive - 27, 82

Gateway is quitting
printer.destroy
sensor.destroy
iothub_writer.destroy
```

## Sensor Tag device code output
On successful run you should see **sample** output like this
```
connectAndSetUp
enableHumidity
	temperature = 27.1 °C
	humidity = 82 %
	temperature = 27.1 °C
	humidity = 82 %
	temperature = 27.1 °C
	humidity = 82.1 %
	temperature = 27.1 °C
	humidity = 82.1 %
	temperature = 27.1 °C
	humidity = 82.1 %
```
