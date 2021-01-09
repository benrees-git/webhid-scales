// content.js

var lastInput = null;

if ("hid" in navigator) {

    navigator.hid.addEventListener("connect", handleConnectedDevice);
    navigator.hid.addEventListener("disconnect", handleDisconnectedDevice);
    
    // Prompt for new connection if user requests
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(request);
            if(request.connectDevice) {
                connectDevice().then((device) => {
                    sendResponse(device)
                }).catch((e) => {
                    sendResponse('error')
                })
            }
        }
    );

    // Load and open any existing device connections
    navigator.hid.getDevices().then((devices) => {
        if (devices.length == 0) return;
        openDevice(devices[0]);
    });

} else {

    alert('WebHID is not supported by your browser')

}


function handleConnectedDevice(e) {
    // Currently this isn't really much use as persistent permissions are not yet implemented.
    console.log("Device connected: " + e.device.productName);
}

function handleDisconnectedDevice(e) {
    
    console.log("Device disconnected: " + e.device.productName);
    e.device.removeEventListener('inputreport', handleInputReport);

}

function handleInputReport(e) {

    const i0 = e.data.getUint8(0);
    const i1 = e.data.getUint8(1);
    const i2 = e.data.getUint8(2);
    const i3 = e.data.getUint8(3);
    const i4 = e.data.getUint8(4);

    const input = i3 + (i4*256);

    if(input != lastInput) {

        lastInput = input;

        Promise.all([
            getConfigItem('weightInputElement'),
            getConfigItem('weightInputElementIframe'),
            getConfigItem('weightMeasurementUnits'),
            getConfigItem('decimaliseWeight')]
        ).then((configValues) => {

            weightInputElement = configValues[0];
            weightInputElementIframe = configValues[1];
            weightMeasurementUnits = configValues[2];
            decimaliseWeight = configValues[3];
            
            if(weightMeasurementUnits == 'lbs') {
                // Pounds and Ounces 
                var weight = input
                console.log(decimaliseWeight)
                if(decimaliseWeight !== 'true') {
                    weight = Math.ceil(input / 10);
                    var lbs = Math.floor(weight / 16);
                    var oz = weight - (lbs * 16)
                    weight = lbs + ":" + oz;
                } else {
                    weight = Math.ceil(input / 10) / 16;
                }
            } else {
                // Killograms
                var weight = input / 1000
            }

            if(weightInputElementIframe) {
                document.getElementById(weightInputElementIframe).contentWindow.document.getElementById(weightInputElement).value = weight;
            } else {
                document.getElementById(weightInputElement).value = weight;
            }

        }).catch((e) => {
            // -> Error retrieving config
        });
        
    }
    
}

async function connectDevice() {
    
    console.log('Requesting permissions...')
    let scaleModel = await getConfigItem('scaleModel');
    let vendorId = null;
    if(scaleModel === 'dymo_m') {
        vendorId = 0x0922;
    }

    let deviceFilter = { vendorId: vendorId };
    let requestParams = { filters: [ deviceFilter ] };


    navigator.hid.requestDevice(requestParams).then((devices) => {
        if (devices.length == 0) return;
        return openDevice(devices[0]);
    }).catch((e) => {
        console.log(e);
        return e
    });
}

async function openDevice(device) {

    device.open().then(() => {
        device.addEventListener('inputreport', handleInputReport);
        console.log("Opened device: " + device.productName, device);
    }); 

}

async function getConfigItem(configItem) {

    var storage = chrome.storage.local;
    return new Promise((resolve,reject) =>
        storage.get([configItem], function(configValue) {
            if (!chrome.runtime.error && configValue && typeof configValue === 'object' && Object.keys(configValue).length > 0) {
                resolve(Object.values(configValue)[0]);
            } else {
                reject('unable to find configuration setting');
            }
        })
    );

}
