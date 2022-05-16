'use strict';

//console.log('loaded: options.js');

// Dynamically reference all 'input' items under the 'options' div.
const options = document.querySelectorAll('#options input');

for (const option of options) {
  // Hook up each 'input' item's onclick event to the 'update_storage' function.
  option.onclick = update_storage;

  // Look through storage for the option item and check it if set to true.
  chrome.storage.local
    .get(option.id, function (items) {
      if (typeof chrome.runtime.lastError !== 'undefined') {
        console.log('[options.js] error:', chrome.runtime.lastError);
      } else {
        //console.log('[options.js] info:', option.id, 'is', items[option.id]);
        option.checked = items[option.id];
      }
    });
}

function update_storage(event) {
  //console.log('[options.js] update_storage()');

  const id = event.currentTarget.id;
  const checked = event.currentTarget.checked;

  chrome.storage.local
    .set({ [id]: checked }, function () {
      if (typeof chrome.runtime.lastError !== 'undefined') {
        console.log('[options.js] update_storage: error:', chrome.runtime.lastError);
      } else {
        //console.log('[options.js] update_storage: info: set', id, 'to', checked);
      }
    });
}
