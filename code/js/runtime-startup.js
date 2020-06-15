'use strict'

console.log('loaded: runtime-startup.js')

//  browser.runtime
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime
//  This module provides information about your extension and the environment it's running in.
//
//  It also provides messaging APIs enabling you to:
//
//    Communicate between different parts of your extension.
//    Communicate with other extensions.
//    Communicate with native applications.
//
//
//  runtime.onStartup
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onStartup
//  Fired when a profile that has this extension installed first starts up. This event is not fired when a private
//  browsing/incognito profile is started, even if this extension is operating in 'split' incognito mode.
//
//  onStartup.addListener(callback)
//
//  callback: Function -> Called when this event occurs.
browser.runtime.onStartup.addListener(() => {
  browser.storage.local
    .get('maximize-on-startup')
    .then(results => {
      if (results['maximize-on-startup'] === true) { maximize_all_windows() }
    })
})

//  runtime.onInstalled
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onInstalled
//
//  Fired when the extension is first installed, when the extension is updated to a new version, and when the browser
//  is updated to a new version.
//
//  onInstalled.addListener(details => )
//  details: object ->  An object with the following properties:
//  {
//    id: string ->  The ID of the imported shared module extension that updated. This is present only if the reason
//                   value is shared_module_update.
//
//    previousVersion: string ->  The previous version of the extension just updated. This is only present if the
//                                reason value is update.
//
//    reason: runtime.OnInstalledReason ->  Value stating the reason that this event is being dispatched.
//    runtime.OnInstalledReason: strings ->  Possible values are:
//    {
//      "install" ->  The extension was installed.
//      "update" ->  The extension was updated to a new version.
//      "browser_update" ->  The browser was updated to a new version.
//      "shared_module_update" ->  Another extension, which contains a module used by this extension, was updated.
//    {
//
//    temporary: boolean ->  True if the add-on was installed temporarily. For example, using the "about:debugging"
//                           page in Firefox or using web-ext run. False otherwise.
//  }
browser.runtime.onInstalled.addListener(details => {
  console.log('[runtime-startup.js] onInstalled()')

  if (details.reason === 'install') {
    //
    //  local.set( keys )
    //  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set
    //  Stores one or more items in the storage area, or update existing items.
    //
    //  returns: promise ->  A Promise that will be fulfilled with no arguments if the operation succeeded. If the
    //                       operation failed, the promise will be rejected with an error message.
    //
    //  keys: object ->  An object containing one or more key/value pairs to be stored in storage. If an item already
    //                   exists, its value will be updated.
    //  {
    //    [id] : checked ->  the key-value pair to be stored
    //  }
    //
    //  Notes:
    //  [id] ->  brackets around a variable allow us to use a variable's value as the property's name
    //  checked ->  variables can already be used to set the property's value
    //
    console.log('[runtime-startup.js] on-install: info: welcome to version', version)
    console.log('[runtime-startup.js] on-install: info: thank you for installing')
    browser.storage.local
      .set({
        'maximize-on-startup': true,
        'maximize-on-created': true,
        'minimize-after-action': true
      })
      .then(() => {
        console.log('[runtime-startup.js] on-install: info: setting maximize-on-startup to true')
        console.log('[runtime-startup.js] on-install: info: setting maximize-on-created to true')
        console.log('[runtime-startup.js] on-install: info: setting minimize-after-action to true')
      })
      .catch(err => console.log('[runtime-startup.js] on-install: error: ', err))
  }

  if (details.reason === 'update') {
    console.log('[runtime-startup.js] on-update: info: welcome to version', version)
    console.log('[runtime-startup.js] on-update: info: thank you for updating')
  }
})

// windows.onCreated
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/onCreated
//
// Fired when a window is created.
browser.windows.onCreated.addListener(window => {
  console.log('[runtime-startup.js] onCreated()')

  browser.storage.local
    .get('maximize-on-created')
    .then(results => {
      if (results['maximize-on-created'] === true)
        maximize(window)
    }).catch(err => console.log('[runtime-startup.js] on-created: error: ', err))
})
