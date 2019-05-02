'use strict'

console.log( 'loaded: __shared.js' )

function maximize_all_windows() {
//
// windows.getAll
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/getAll
// Gets information about all open windows, passing them into a callback.
//
  browser.windows.getAll( {
    windowTypes: ['normal', 'popup', 'panel', 'devtools'],
  } ).then( windowList => {
    let current = null
    windowList.forEach( window => {
      // save currently focused window for later
      if (window.focused) current = window
      //
      // windows.update
      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/update
      // Updates the properties of a window. Use this to move, resize, and (un)focus a window, etc.
      //
      // state: string -> The new state of the window.
      //   "normal"
      //   "minimized"
      //   "maximized"
      //   "fullscreen"
      //   "docked"
      //
      browser.windows.update( window.id, {
        state: 'maximized',
      } )
    } )
    // bring previously focused window back into focused
    browser.windows.update( current.id, {
      focused: true,
    } )
  } )
}
