'use strict'

console.log( 'loaded: runtime-startup.js' )

// browser.runtime
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime
// This module provides information about your extension and the environment it's running in.
//
// It also provides messaging APIs enabling you to:
//
//   Communicate between different parts of your extension.
//   Communicate with other extensions.
//   Communicate with native applications.
//
//
// runtime​.onStartup
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onStartup
// Fired when a profile that has this extension installed first starts up. This event is not fired when a private
// browsing/incognito profile is started, even if this extension is operating in 'split' incognito mode.
//
// onStartup.addListener(callback)
//   Adds a listener to this event.
//
// callback: Function -> Called when this event occurs.
browser.browserAction.onClicked.addListener(
  maximize_all_windows,
)
