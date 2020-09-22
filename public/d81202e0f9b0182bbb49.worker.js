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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/workerize-loader/dist/rpc-worker-loader.js!./node_modules/gatsby/dist/utils/babel-loader.js?!./src/components/utils/sha256/sha256.worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/workerize-loader/dist/rpc-worker-loader.js!./node_modules/gatsby/dist/utils/babel-loader.js?!./src/components/utils/sha256/sha256.worker.ts":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/workerize-loader/dist/rpc-worker-loader.js!./node_modules/gatsby/dist/utils/babel-loader.js??ref--19!./src/components/utils/sha256/sha256.worker.ts ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: Sha256Worker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sha256Worker", function() { return Sha256Worker; });
/* harmony import */ var _sha256_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha256.utils */ "./src/components/utils/sha256/sha256.utils.ts");
const hashTable = {};

const Sha256Worker = async () => await Object(_sha256_utils__WEBPACK_IMPORTED_MODULE_0__["Sha256"])(hashTable); //   async function sign(message: string) {
//     const msgBuffer = new TextEncoder().encode(message);
//     const key = await crypto.subtle.importKey(
//       "raw", // raw format of the key - should be Uint8Array
//       enc.encode("mysecretkey"),
//       {
//         // algorithm details
//         name: "HMAC",
//         hash: { name: "SHA-256" },
//       },
//       false, // export = false
//       ["sign", "verify"], // what the key can do'
//     );
//     const hashBuffer = await crypto.subtle.sign("SHA-256", key, msgBuffer);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     // convert bytes to hex string
//     const signHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join(
//       "",
//     );
//     return signHex;
//   }
addEventListener('message', function (e) {var _e$data = e.data,type = _e$data.type,method = _e$data.method,id = _e$data.id,params = _e$data.params,f,p;if (type === 'RPC' && method) {if (f = __webpack_exports__[method]) {p = Promise.resolve().then(function () {return f.apply(__webpack_exports__, params);});} else {p = Promise.reject('No such method');}p.then(function (result) {postMessage({type: 'RPC',id: id,result: result});}).catch(function (e) {var error = {message: e};if (e.stack) {error.message = e.message;error.stack = e.stack;error.name = e.name;}postMessage({type: 'RPC',id: id,error: error});});}});postMessage({type: 'RPC',method: 'ready'});

/***/ }),

/***/ "./src/components/utils/sha256/sha256.utils.ts":
/*!*****************************************************!*\
  !*** ./src/components/utils/sha256/sha256.utils.ts ***!
  \*****************************************************/
/*! exports provided: Sha256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sha256", function() { return Sha256; });
const Sha256 = (hashTable = {}) => ({
  hash: async strInput => {
    console.log("YYYYYAYYAYAYAYA");
    const hash = await sha256(strInput);
    const shorterHash = shortener(hash);
    hashTable[hash] = strInput;
    return shorterHash;

    function shortener(hash) {
      for (let i = 1; i < 64; i++) {
        const shorterHash = hash.substr(0, i);

        if (hashTable[shorterHash] === undefined) {
          hashTable[shorterHash] = hash;
          return shorterHash;
        }

        if (hashTable[shorterHash] === hash) return shorterHash;
      }

      return hash;
    }
  },
  unHash: async hash => hashTable[hashTable[hash]]
});

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert bytes to hex string

  const hashHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("");
  return hashHex;
}

/***/ })

/******/ });
//# sourceMappingURL=d81202e0f9b0182bbb49.worker.js.map