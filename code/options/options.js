'use strict'

console.log( 'loaded: options.js' )

// Dynamically reference all 'input' items under the 'options' div.
let options = document.querySelectorAll( '#options input' )
for (let option of options) {
  // Hook up each 'input' item's onclick event to the 'update_storage' function.
  option.onclick = update_storage
  // Look through storage for the option item and check it if set to true.
  browser.storage.local
    .get( option.id )
    .then( results => option.checked = results[option.id] )
}

function update_storage( event ) {
  let id = event.currentTarget.id
  let checked = event.currentTarget.checked
  //
  // browser.storage
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage
  // Enables extensions to store and retrieve data, and listen for changes to stored items.
  //
  // storage.local
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local
  // Represents the local storage area. Items in local storage are local to the machine the extension was installed on.
  //
  // local.set( keys )
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set
  // Stores one or more items in the storage area, or update existing items.
  //
  // returns: promise -> A Promise that will be fulfilled with no arguments if the operation succeeded. If the
  //                     operation failed, the promise will be rejected with an error message.
  //
  // keys: object -> An object containing one or more key/value pairs to be stored in storage. If an item already
  //                 exists, its value will be updated.
  //
  // [id] -> brackets allow us to use a variable string as the property name
  // checked -> variables can already be used to set the value
  browser.storage.local
    .set( {[id]: checked} )
    .then( () => console.log( '[options.js update_storage] info: set', id, 'to', checked ) )
    .catch( err => console.log( '[options.js update_storage] error: ', err ) )
}
