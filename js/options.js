// popup.js
$(document).ready(function () {

    getConfig();

    $('#configFormSave').click(function () {
        saveConfig();
    });

});


function saveConfig() {
    var storage = chrome.storage.local;
    var configForm = document.getElementById('configForm');
    var configFormChildren = configForm.children;  
    for(i = 0; i < configFormChildren.length; i++) {       
        if(configFormChildren[i].type === 'text' || configFormChildren[i] instanceof HTMLSelectElement) {
            var configItem = configFormChildren[i].getAttribute('id');   
            var configValue = configFormChildren[i].value; 
            storage.set({ [configItem] : configValue }, function() {
                if(chrome.runtime.error) {
                   alert("Error saving configuration");
                } 
            });
        }                                       
    }

}

function getConfig() {

    var storage = chrome.storage.local;
    var configForm = document.getElementById('configForm');
    var configFormChildren = configForm.children;  
    for(i = 0; i < configFormChildren.length; i++) {       
        if(configFormChildren[i].type === 'text' || configFormChildren[i] instanceof HTMLSelectElement) {
            var configItem = configFormChildren[i].getAttribute('id'); 
            storage.get([configItem], function(configValue) {
                if (!chrome.runtime.error && configValue && typeof configValue === 'object' && Object.keys(configValue).length > 0) {
                    document.getElementById(Object.keys(configValue)[0]).value = Object.values(configValue)[0];
                }
            });
        }                                       
    }

}