/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mitt = __webpack_require__(2);

var _mitt2 = _interopRequireDefault(_mitt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = (0, _mitt2.default)();
var SUPPORTED = 'supported';
var ERROR = 'error';
var SUBSCRIBED = 'subscribed';
var UNSUBSCRIBED = 'unsubscribed';

function buildApplicationServerKey() {
    var base64 = 'BE8PyI95I_jBIfb_LTS_nkUJnOwjLP2zAaGBSFEi3jmFJ3l5ox7-NtNqrVuyPL4Qmt4UxDI-YgwYI1sEMIpoU90=';
    var rfc4648 = base64.replace(/-/g, '+').replace(/_/g, '/');
    var characters = atob(rfc4648).split('').map(function (character) {
        return character.charCodeAt(0);
    });
    return new Uint8Array(characters);
}

function sendSubscriptionToServer(subscription) {
    // This is where you'd update the subscription on the server.
    document.querySelector('.js-subscription').innerHTML = JSON.stringify(subscription.toJSON());
}

function removeSubscriptionFromServer(subscription) {
    // This is where you'd remove the subscription from the server.
}

var registerServiceWorker = function registerServiceWorker() {
    if ('serviceWorker' in navigator || 'Notification' in window) {
        // Unless you change the URL of the service worker script,
        // `navigator.serviceWorker.register()` is effectively a no-op during subsequent visits.
        navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
            initializeState();
            console.log('ServiceWorker registration successful.', registration);
            return navigator.serviceWorker.ready;
        }).catch(function (error) {
            console.error('ServiceWorker registration failed.', error);
        });
    } else {
        console.log('Service workers aren’t supported in this browser.');
    }
};

var initializeState = function initializeState() {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.error('Notifications aren’t supported.');
        return;
    }

    // If the current notification permission is denied,
    // it's a permanent block until the user changes the permission
    if (Notification.permission === 'denied') {
        console.error('The user has blocked notifications.');
        return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        console.error('Push messaging isn’t supported.');
        return;
    }

    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(function (subscription) {
            emitter.emit(SUPPORTED);

            // Do we already have a push message subscription?
            if (subscription) {
                sendSubscriptionToServer(subscription);
                emitter.emit(SUBSCRIBED);
            }
        }).catch(function (error) {
            console.error('Error during getSubscription()', error);
        });
    });
};

var subscribe = function subscribe() {
    function permissionDenied() {
        emitter.emit(ERROR, 'Um Push-Benachrichtigungen zu erhalten, ' + 'müssen Sie Benachrichtigungen für diese Website in Ihrem Browser erlauben.');
        unsubscribe();
    }

    function permissionGranted() {
        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: buildApplicationServerKey()
            }).then(function (subscription) {
                sendSubscriptionToServer(subscription);
                emitter.emit(SUBSCRIBED);
            }).catch(function (error) {
                console.error('Unable to subscribe to messaging server.', error);
                emitter.emit(ERROR, 'Bei der Anmeldung am externen Benachrichtigungsdienst ist ein Fehler aufgetreten. ' + 'Bitte versuchen Sie es in ein paar Minuten wieder oder wenden sich an Ihren Ansprechpartner.');
            });
        });
    }

    if (Notification.permission === 'denied') {
        permissionDenied();
        return;
    }
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(function (result) {
            if (result !== 'granted') {
                permissionDenied();
                return;
            }
            permissionGranted();
        });
        return;
    }
    permissionGranted();
};

var unsubscribe = function unsubscribe() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(function (subscription) {
            if (!subscription) {
                emitter.emit(UNSUBSCRIBED);
                return;
            }
            subscription.unsubscribe().then(function () {
                emitter.emit(UNSUBSCRIBED);
            }).catch(function (error) {
                console.error('Unable to unsubscribe to messaging server.', error);
                emitter.emit(ERROR, 'Bei der Abmeldung am externen Benachrichtigungsdienst ist ein Fehler aufgetreten. ' + 'Sie werden von uns dennoch keine Push-Benachrichtigungen mehr erhalten.');
            });
            removeSubscriptionFromServer();
        }).catch(function (error) {
            console.error('Error during getSubscription()', error);
        });
    });
};

exports.default = {
    init: registerServiceWorker,
    on: emitter.on,
    SUPPORTED: SUPPORTED,
    ERROR: ERROR,
    SUBSCRIBED: SUBSCRIBED,
    UNSUBSCRIBED: UNSUBSCRIBED,
    subscribe: subscribe,
    unsubscribe: unsubscribe
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _push = __webpack_require__(0);

var _push2 = _interopRequireDefault(_push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $button = document.querySelector('.js-button');
var activated = false;

$button.addEventListener('click', function () {
    if (!activated) {
        $button.disabled = true;
        _push2.default.subscribe();
        $button.innerHTML = 'Disable Push Notifications';
    } else {
        $button.disabled = true;
        _push2.default.unsubscribe();
        $button.innerHTML = 'Enable Push Notifications';
    }
    activated = !activated;
});

_push2.default.on(_push2.default.SUBSCRIBED, function () {
    activated = true;
});
_push2.default.on(_push2.default.UNSUBSCRIBED, function () {
    activated = false;
});

_push2.default.on('*', function () {
    $button.disabled = false;
});

_push2.default.init();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ __webpack_exports__["default"] = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ })
/******/ ]);