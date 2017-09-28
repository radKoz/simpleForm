/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function () {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if ('serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function (registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function () {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing;

            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case 'redundant':
                  throw new Error('The installing ' +
                    'service worker became redundant.');

                default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function (e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here

  // material design lite fix 
  document.onready = function () {
    document.querySelectorAll("input[data-required]").forEach(function (e) {
      e.required = true;
    });
  };





  var submitBtn = document.getElementById('checkoutBtn');

  

  submitBtn.onclick = function (e) {
  
    e.preventDefault();

    if (checkIfEmpty()) {
      // var perForm = document.getElementById("personalForm");
      // var payForm = document.getElementById("paymentsForm");
      // perForm.submit();
      // payForm.submit();

      var conf = document.getElementById('confirmed')
      console.log("data sent...");
      conf.style.display = 'block';
      setTimeout(function () {
        location.reload()
      }, 3000)

    }

  }

  function checkIfEmpty() {

    var eFirstName = document.forms['personalForm']['first-name'].value;
    var eLastName = document.forms['personalForm']['last-name'].value;
    var eEmail = document.forms['personalForm']['email'].value;
    var eCountry = document.forms['personalForm']['country'].value;
    var ePostalCode = document.forms['personalForm']['postal-code'].value;
    var ePhoneNumber = document.forms['personalForm']['phone-number'].value;

    var eCCard = document.forms['paymentsForm']['credit-card-number'].value;
    var eCCardlength = (''+eCCard).length;

    var eCVV = document.forms['paymentsForm']['cvv'].value
    var eCVVlength = (''+eCVV).length;
    
    var eExpDate = document.forms['paymentsForm']['exp-date'].value;
    var eEDlength = (''+eExpDate).length;
    
    if (!eFirstName) {
      alert("Please enter First Name")
      return false;
    }
    if (!eLastName) {
      alert("Please enter Last Name")
      return false;
    }
    if (!eEmail) {
      alert("Please enter Email")
      return false;
    }
    if (!eCountry) {
      alert("Please enter Country")
      return false;
    }
    if (!ePostalCode) {
      alert("Please enter Postal Code")
      return false;
    }
    if (!ePhoneNumber) {
      alert("Please enter Phone Number")
      return false;
    }
    if (eCCardlength < 12) {
      alert("Please enter correct Credit Card Number")
      return false;
    }

    if (eCVVlength < 3 ) {
      alert("Please enter 3-digit Security Code")
      return false;
    }
    if (eEDlength < 4) {
      alert("Please enter correct Expiration Date")
      return false;
    } else {
      return true;
    }

  }


})();
