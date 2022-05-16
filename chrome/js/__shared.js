'use strict';

//console.log('loaded: __shared.js');

//  chrome.runtime.getManifest()  
//  https://developer.chrome.com/extensions/runtime#method-getManifest  
//  
//  Get the complete manifest.json file, serialized to a JSON object.
const version = chrome.runtime.getManifest().version;

//  chrome.runtime.lastError  
//  https://developer.chrome.com/extensions/runtime#property-lastError  
//  
//  This will be defined during an API method callback if there was an error.
//  
//  message: string (optional)  
//  Details about the error which occurred.
//
//  This property is only defined inside the closure of the callback function if a
//  runtime error occurred. If no error occurred, the property will be undefined.


function maximize_all_windows() {
  //console.log('[__shared.js] info: maximize_all_windows()');

  //  chrome.windows.getAll  
  //  https://developer.chrome.com/extensions/windows#method-getAll  
  //  
  //  Gets all windows.
  chrome.windows
    .getAll({
      populate: false,
      windowTypes: ['normal', 'popup', 'panel', 'app', 'devtools']
    }, function (windows) {
      maximize_all(windows)
        .then(minimize_necessary)
        .then(bring_back_focus)
        .catch(error =>
          console.log('[__shared.js] maximize_all_windows: error:', error));
    });
}

//  Each of these functions acts like part of a stream. No matter what happens, they
//  return the arguments they receive without changing them. By doing this, it becomes
//  very easy to chain multiple functions together that alter the environment, but not
//  the arguments.

function maximize_all(windows) {
  //console.log('[__shared.js] info: maximize_all()');

  return new Promise(function (resolve) {
    return Promise
      .all(windows
        .filter(window =>
          window.state !== 'maximized')
        .map(maximize))
      .then(() =>
        resolve(windows))
      .catch(() =>
        resolve(windows));
  });
}

function minimize_necessary(windows) {
  //console.log('[__shared.js] info: minimize_necessary()');

  return new Promise(function (resolve) {
    chrome.storage.local
      .get('minimize-after-action', function (items) {
        if (items['minimize-after-action'] === true) {
          return Promise
            .all(windows
              .filter(window => window.state === 'minimized')
              .map(minimize))
            .then(() =>
              resolve(windows))
            .catch(() =>
              resolve(windows));
        } else {
          resolve(windows);
        }
      });
  });
}

//  bring the previously focused window back into focus
function bring_back_focus(windows) {
  //console.log('[__shared.js] info: bring_back_focus()')

  return new Promise(function (resolve) {
    return Promise
      .all(windows
        .filter(window => window.focused)
        .map(window => chrome.windows
          .update(window.id, { focused: true }, function (window) {
            if (typeof chrome.runtime.lastError !== 'undefined') {
              console.log('[__shared.js] bring_back_focus: error:', chrome.runtime.lastError);
            }
            //else {
            //  console.log('[__shared.js] info: focused:', window.id);
            //}
          })))
      .then(() =>
        resolve(windows))
      .catch(() =>
        resolve(windows));
  });
}

//  chrome.windows.update(integer windowId, object updateInfo, function callback)  
//  https://developer.chrome.com/extensions/windows#method-update  
//  
//  Updates the properties of a window. Specify only the properties to be changed;
//  unspecified properties are unchanged.
//
//  updateInfo: object
//  {
//    state: string -> The new state of the window. One of the following:
//    {
//      "normal"
//      "minimized"
//      "maximized"
//      "fullscreen"
//    }
//  }
//  
//  callback (optional)  
//  If you specify the callback parameter, it should be a function that looks like this:  
//  function( Window window) {...};
function maximize(window) {
  //console.log('[__shared.js] info: maximize:', window.id);

  return chrome.windows
    .update(window.id, { state: 'maximized' }, function (window) {
      if (typeof chrome.runtime.lastError !== 'undefined') {
        console.log('[__shared.js] maximize: error:', chrome.runtime.lastError);
      }
    });
}

function minimize(window) {
  //console.log('[__shared.js] info: minimize:', window.id);

  return chrome.windows
    .update(window.id, { state: 'minimized' }, function (window) {
      if (typeof chrome.runtime.lastError !== 'undefined') {
        console.log('[__shared.js] minimize: error:', chrome.runtime.lastError);
      }
    });
}
