'use strict';

//console.log('loaded: runtime-startup.js');

//  chrome.runtime  
//  https://developer.chrome.com/extensions/runtime  
//  
//  Use the chrome.runtime API to retrieve the background page, return details about the
//  manifest, and listen for and respond to events in the app or extension lifecycle.
//  You can also use this API to convert the relative path of URLs to fully-qualified
//  URLs.

//  chrome.runtime.onStartup  
//  https://developer.chrome.com/extensions/runtime#event-onStartup  
//  
//  Fired when a profile that has this extension installed first starts up. This event
//  is not fired when an incognito profile is started, even if this extension is
//  operating in 'split' incognito mode.
//
//  addListener  
//  chrome.runtime.onStartup.addListener(function callback)  
//  
//  callback
//  The callback parameter should be a function that looks like this:  
//  function() {...};
chrome.runtime.onStartup.addListener(function () {
  //console.log('[runtime-startup.js] onStartup()');

  chrome.storage.local
    .get('maximize-on-startup', function (items) {
      if (typeof chrome.runtime.lastError !== 'undefined') {
        console.log('[runtime-startup.js] onStartup: error:', chrome.runtime.lastError);
      } else {
        if (items['maximize-on-startup'] === true)
          maximize_all_windows();
      }
    });
});

//  chrome.runtime.onInstalled  
//  https://developer.chrome.com/extensions/runtime#event-onInstalled  
//  
//  Fired when the extension is first installed, when the extension is updated to a new
//  version, and when Chrome is updated to a new version.
//  
//  addListener  
//  chrome.runtime.onInstalled.addListener(function callback)  
//
//  callback  
//  The callback parameter should be a function that looks like this:  
//  function(object details) {...};
//
//  details  
//  {
//    reason: OnInstalledReason  
//    The reason that this event is being dispatched. One of the following:
//    {
//      "install"
//      "update"
//      "chrome_update"
//      "shared_module_update"
//    }
//    
//    previousVersion: string (optional)  
//    Indicates the previous version of the extension, which has just been updated. This
//    is present only if 'reason' is 'update'.
//    
//    id: string (optional)  
//    Indicates the ID of the imported shared module extension which updated. This is
//    present only if 'reason' is 'shared_module_update'.
//  }
chrome.runtime.onInstalled.addListener(function (details) {
  //console.log('[runtime-startup.js] onInstalled()');

  switch (details.reason) {
    case 'install':
      console.log('[runtime-startup.js] on-install: info: welcome to version', version);
      console.log('[runtime-startup.js] on-install: info: thank you for installing');

      chrome.storage.local
        .set({
          'maximize-on-startup': true,
          'maximize-on-created': true,
          'minimize-after-action': true
        }, function (items) {
          if (typeof chrome.runtime.lastError !== 'undefined') {
            console.log('[runtime-startup.js] on-install: error:', chrome.runtime.lastError);
          } else {
            console.log('[runtime-startup.js] on-install: info: setting maximize-on-startup to true');
            console.log('[runtime-startup.js] on-install: info: setting maximize-on-created to true');
            console.log('[runtime-startup.js] on-install: info: setting minimize-after-action to true');
          }
        });
      break;

    case 'update':
      console.log('[runtime-startup.js] on-update: info: welcome to version', version);
      console.log('[runtime-startup.js] on-update: info: thank you for updating');
      break;
  }
});

//  chrome.windows.onCreated  
//  https://developer.chrome.com/extensions/windows#event-onCreated  
//  
//  Fired when a window is created.
//  
//  addListener  
//  chrome.windows.onCreated.addListener(function callback)  
//  
//  callback  
//  The callback parameter should be a function that looks like this:  
//  function( Window window) {...};
chrome.windows.onCreated.addListener(function (window) {
  //console.log('[runtime-startup.js] onCreated()');

  chrome.storage.local
    .get('maximize-on-created', function (items) {
      if (typeof chrome.runtime.lastError !== 'undefined') {
        console.log('[runtime-startup.js] on-created: error:', chrome.runtime.lastError);
      } else {
        if (items['maximize-on-created'] === true)
          maximize(window);
      }
    })
});
