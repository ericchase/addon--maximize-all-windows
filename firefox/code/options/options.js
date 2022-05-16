'use strict'

console.log('loaded: options.js')

// Dynamically reference all 'input' items under the 'options' div.
const options = document.querySelectorAll('#options input')
for (const option of options) {
  // Hook up each 'input' item's onclick event to the 'update_storage' function.
  option.onclick = update_storage
  // Look through storage for the option item and check it if set to true.
  browser.storage.local
    .get(option.id)
    .then(results => {
      console.log('[options.js] info:', option.id, 'is', results[option.id])
      option.checked = results[option.id]
    })
}

function update_storage (event) {
  console.log('[options.js] update_storage()')
  const id = event.currentTarget.id
  const checked = event.currentTarget.checked

  browser.storage.local
    .set({ [id]: checked })
    .then(() => console.log('[options.js] update_storage: info: set', id, 'to', checked))
    .catch(error => console.log('[options.js] update_storage: error: ', error))
}
