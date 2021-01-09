// popup.js
$(document).ready(function () {

    $('#config').click(function () {
        chrome.runtime.openOptionsPage();
    });

    $('#connectDevice').click(function () {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, {connectDevice: true}, function(response) {
                var lastError = chrome.runtime.lastError;
                if (lastError) {
                    console.log(lastError.message);
                    // 'Could not establish connection. Receiving end does not exist.'
                    return;
                }
            });
        });
    });

});

