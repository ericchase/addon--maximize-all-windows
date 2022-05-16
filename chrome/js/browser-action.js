'use strict';

//console.log('loaded: browser-action.js');

//  chrome.browserAction  
//  https://developer.chrome.com/extensions/browserAction#event-onClicked  
//
//  Use browser actions to put icons in the main Google Chrome toolbar, to the right of
//  the address bar. In addition to its icon, a browser action can have a tooltip, a
//  badge, and a popup.

//  chrome.browserAction.onClicked  
//  https://developer.chrome.com/extensions/browserAction#event-onClicked  
//
//  Fired when a browser action icon is clicked. Does not fire if the browser action has
//  a popup.
//
//  addListener  
//  chrome.browserAction.onClicked.addListener(function callback)  
//
//  callback  
//  The callback parameter should be a function that looks like this:  
//  function( tabs.Tab tab ) {...};
chrome.browserAction.onClicked.addListener(function (tab) {
  maximize_all_windows();
});
