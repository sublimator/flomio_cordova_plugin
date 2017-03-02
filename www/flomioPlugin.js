var exec = require('cordova/exec');
/**
 * Constructor
 */
module.exports = {
        init: (success, failure) => {
            exec(success, failure, 'FlomioPlugin', 'init', []);
        },

        selectDeviceType: (deviceType, success, failure) => {
            exec(success, failure, 'FlomioPlugin', 'selectDeviceType', [deviceType]);
            // deviceType is "FloJack-BZR", "FloJack-MSR", "FloBLE-EMV" or "FloBLE-Plus" (case insensitive)
        },

        setConfiguration: (configurationDictionary, success, failure) => {
            var configurationArray = new Array();
            var keyArray = new Array("scanPeriod", "scanSound");

            // convert dictionary to array
            for (index in keyArray) {
                if (typeof configurationDictionary[keyArray[index]] === 'undefined') {
                    configurationArray.push("unchanged");
                } else {
                    configurationArray.push(readerSettings[keyArray[index]]);
                }
            }
            exec(success, failure, "FlomioPlugin", "setConfiguration", configurationArray);
        },

        getConfiguration: (configurationDictionary, success, failure) => {
            exec(
                (scanPeriod, scanSound) => { resultCallback({ scanPeriod: scanPeriod, scanSound: scanSound }) },
                (failure) => { console.log("ERROR: FlomioPlugin.getConfiguration: " + failure) },
                "FlomioPlugin", "getReaderSettings", []);
        },

        stopReaders: (success, failure) => {
            exec(
                (scanPeriod, scanSound) => { resultCallback({ deviceId: deviceId, responseApdu: responseApdu }) },
                (failure) => { console.log("ERROR: FlomioPlugin.stopReaders: " + failure) },
                "FlomioPlugin", "getReaderSettings", []);
        },

        sendApdu: (resultCallback, deviceId, apdu, success, failure) => {
            exec(
                success,
                (failure) => { console.log("ERROR: FlomioPlugin.sendApdu: " + failure) },
                "FlomioPlugin", "sendApdu", [deviceId, apdu]);
        },

        // Delegate/Event Listeners
        addConnectedDevicesListener: (resultCallback, success, failure) => {
            exec(
                (deviceIdList) => { resultCallback(deviceIdList) },
                (failure) => { console.log("ERROR: FlomioPlugin.addConnectedDevicesListener: " + failure) },
                "FlomioPlugin", "setConnectedDevicesUpdateCallback", []);
        },

        addTagStatusChangeListener: (resultCallback, success, failure) => {
            exec(
                (deviceId, status) => { resultCallback({ deviceId: deviceId, status: status }) },
                (failure) => { console.log("ERROR: FlomioPlugin.addTagStatusChangeListener: " + failure) },
                "FlomioPlugin", "setCardStatusChangeCallback", []);
        },

        addTagDiscoveredListener: (resultCallback, success, failure) => {
            exec(
                (deviceId, tagUid) => { resultCallback({ tagUid: tagUid, deviceId: deviceId }) },
                (failure) => { console.log("ERROR: FlomioPlugin.addTagDiscoveredListener: " + failure) },
                "FlomioPlugin", "setTagDiscoveredCallback", []);
        },
    }
    // FlomioPlugin.prototype.sendApdu = function(resultCallback, deviceId, apdu)
    // {
    //   exec(
    //     function(deviceId, responseApdu)
    //     {
    //       resultCallback({deviceId: deviceId, responseApdu: responseApdu});
    //     },
    //     function(error)
    //     {
    //       console.log("ERROR: FlomioPlugin.sendApdu: " + error);
    //     },
    //     "FlomioPlugin",
    //     "sendApdu",
    //     [deviceId, apdu]
    //   );
    // }

// FlomioPlugin.prototype.getReaderSettings = function(resultCallback)
// {
//   exec(
//     function(scanPeriod, scanSound)
//     {
//       resultCallback({scanPeriod: scanPeriod, scanSound: scanSound});
//     },
//     function(error)
//     {
//       console.log("ERROR: FlomioPlugin.getReaderSettings: " + error);
//     },
//     "FlomioPlugin",
//     "getReaderSettings",
//     []
//   );
// }

// FlomioPlugin.prototype.stopReaders = function()
// {
//   exec(
//     function()
//     {
//       // no result returned
//     },
//     function(error)
//     {
//       console.log("ERROR: FlomioPlugin.stopReaders: " + error);
//     }, 
//     "FlomioPlugin", 
//     "stopReaders",  
//     []
//   );
// }

// FlomioPlugin.prototype.sendApdu = function(resultCallback, deviceId, apdu)
// {
//   exec(
//     function(deviceId, responseApdu)
//     {
//       resultCallback({deviceId: deviceId, responseApdu: responseApdu});
//     },
//     function(error)
//     {
//       console.log("ERROR: FlomioPlugin.sendApdu: " + error);
//     },
//     "FlomioPlugin",
//     "sendApdu",
//     [deviceId, apdu]
//   );
// }

// FlomioPlugin.prototype.onDeviceConnectionChange = function(resultCallback)
// {
//   exec(
//     function(deviceIdList)
//     {
//       resultCallback(deviceIdList);
//     },
//     function(error)
//     {
//       console.log("ERROR: FlomioPlugin.onDeviceConnectionChange: " + error);
//     },
//     "FlomioPlugin",
//     "setDeviceConnectionChangeCallback",
//     []
//   );
// }

// FlomioPlugin.prototype.onTagStatusChange = function(resultCallback)
// {
//   exec(
//     function(deviceId, status)
//     {
//       resultCallback({deviceId: deviceId, status: status});
//     },
//     function(error)
//     {
//       console.log("ERROR: FlomioPlugin.onTagStatusChange: " + error);
//     },
//     "FlomioPlugin",
//     "setCardStatusChangeCallback",
//     []
//   );
// }

// FlomioPlugin.prototype.onTagUidRead = function(resultCallback)
// {
//   exec(
//     function(deviceId, tagUid)
//     {
//       resultCallback({tagUid: tagUid, deviceId: deviceId});
//     },
//     function(error)
//     {
//       console.log("ERROR: FlomioPlugin.onTagUidRead: " + error);
//     }, 
//     "FlomioPlugin", 
//     "setTagUidReadCallback",
//     []
//   );
// }

// FlomioPlugin.prototype.getDataBlocks = function(resultCallback, deviceId)
// {
//   exec(
//     function(deviceId, ndef)
//     {
//       resultCallback({ndef: ndef, deviceId: deviceId});
//     },
//     function(error)
//     {
//       console.log("ERROR: FlomioPlugin.onNdefDiscovery: " + error);
//     }, 
//     "FlomioPlugin", 
//     "getDataBlocks",
//     [deviceId]
//   );
// }

// var flomioPlugin = new FlomioPlugin();
// module.exports = flomioPlugin;