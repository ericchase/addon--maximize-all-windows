'use strict'

console.log('loaded: options.js')

// Dynamically reference all 'input' items under the 'options' div.
let options = document.querySelectorAll('#options input')
for (let option of options) {
  // Hook up each 'input' item's onclick event to the 'update_storage' function.
  option.onclick = update_storage
  // Look through storage for the option item and check it if set to true.
  browser.storage.local
    .get(option.id)
    .then(results => option.checked = results[option.id])
}

function update_storage( event ) {
  let id = event.currentTarget.id
  let checked = event.currentTarget.checked
  //
  browser.storage.local
    .set({[id]: checked})
    .then(() => console.log('[options.js update_storage] info: set', id, 'to', checked))
    .catch(err => console.log('[options.js update_storage] error: ', err))
}
