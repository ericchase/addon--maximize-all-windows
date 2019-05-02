'use strict'

browser.runtime.onStartup.addListener( () => {
  browser.windows.getAll().then( windowList => {
    let current = null
    windowList.forEach( window => {
      if (window.focused) current = window
      browser.windows.update( window.id, {
        state: 'maximized',
      } )
    } )
    browser.windows.update( current.id, {
      focused: true,
    } )
  } )
} )
