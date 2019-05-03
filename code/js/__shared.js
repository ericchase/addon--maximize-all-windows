'use strict'

console.log('loaded: __shared.js')

//
//  runtime.getManifest
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/getManifest
//  Get the complete manifest.json file, serialized to a JSON object.
//
let version = browser.runtime.getManifest().version

//  The function that handles maximizing all of the browser's windows.
function maximize_all_windows() {
//
//  windows.getAll
//  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/getAll
//  Gets information about all open windows, passing them into a callback.
//
  browser.windows.getAll({
    windowTypes: ['normal', 'popup', 'panel', 'devtools'],
  }).then(windowList => {
    let current = null
    windowList.forEach(window => {
      //  save currently focused window for later
      if (window.focused) current = window
      //
      //  windows.update
      //  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/update
      //  Updates the properties of a window. Use this to move, resize, and (un)focus a window, etc.
      //
      //  state: string -> The new state of the window.
      //  {
      //    "normal"
      //    "minimized"
      //    "maximized"
      //    "fullscreen"
      //    "docked" (deprecated)
      //  }
      browser.windows.update(window.id, {
        state: 'maximized',
      })
      //  after maximizing the window, we want to minimize it again if it were minimized before
      if (window.state === 'minimized') {
        browser.windows.update(window.id, {
          state: 'minimized',
        })
      }
    })
    //  bring previously focused window back into focus
    browser.windows.update(current.id, {
      focused: true,
    })
  })
}
