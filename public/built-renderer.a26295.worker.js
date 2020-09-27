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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* AUTO-GENERATED. DO NOT MODIFY. */

/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@beautifier.io>
      https://beautifier.io/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@beautifier.io>


  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy        !jslint_happy
            ---------------------------------
            function ()         function()

            switch () {         switch() {
            case 1:               case 1:
              break;                break;
            }                   }

    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
          NOTE: This option is overriden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none" | any of the former + ",preserve-inline"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
            preserve-inline will try to preserve inline blocks of curly braces

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    end_with_newline (default false)  - end output with a newline


    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });

*/
(function () {
  /* GENERATED_BUILD_OUTPUT */
  var legacy_beautify_js =
  /******/
  function (modules) {
    // webpackBootstrap

    /******/
    // The module cache

    /******/
    var installedModules = {};
    /******/

    /******/
    // The require function

    /******/

    function __webpack_require__(moduleId) {
      /******/

      /******/
      // Check if module is in cache

      /******/
      if (installedModules[moduleId]) {
        /******/
        return installedModules[moduleId].exports;
        /******/
      }
      /******/
      // Create a new module (and put it into the cache)

      /******/


      var module = installedModules[moduleId] = {
        /******/
        i: moduleId,

        /******/
        l: false,

        /******/
        exports: {}
        /******/

      };
      /******/

      /******/
      // Execute the module function

      /******/

      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/

      /******/
      // Flag the module as loaded

      /******/

      module.l = true;
      /******/

      /******/
      // Return the exports of the module

      /******/

      return module.exports;
      /******/
    }
    /******/

    /******/

    /******/
    // expose the modules object (__webpack_modules__)

    /******/


    __webpack_require__.m = modules;
    /******/

    /******/
    // expose the module cache

    /******/

    __webpack_require__.c = installedModules;
    /******/

    /******/
    // define getter function for harmony exports

    /******/

    __webpack_require__.d = function (exports, name, getter) {
      /******/
      if (!__webpack_require__.o(exports, name)) {
        /******/
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/

    };
    /******/

    /******/
    // define __esModule on exports

    /******/


    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

    /******/
    // create a fake namespace object

    /******/
    // mode & 1: value is a module id, require it

    /******/
    // mode & 2: merge all properties of value into the ns

    /******/
    // mode & 4: return value when already ns object

    /******/
    // mode & 8|1: behave like require

    /******/


    __webpack_require__.t = function (value, mode) {
      /******/
      if (mode & 1) value = __webpack_require__(value);
      /******/

      if (mode & 8) return value;
      /******/

      if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/

      var ns = Object.create(null);
      /******/

      __webpack_require__.r(ns);
      /******/


      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });
      /******/

      if (mode & 2 && typeof value != 'string') for (var key in value) {
        __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
      }
      /******/

      return ns;
      /******/
    };
    /******/

    /******/
    // getDefaultExport function for compatibility with non-harmony modules

    /******/


    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
      /******/
      function getDefault() {
        return module['default'];
      } :
      /******/
      function getModuleExports() {
        return module;
      };
      /******/

      __webpack_require__.d(getter, 'a', getter);
      /******/


      return getter;
      /******/
    };
    /******/

    /******/
    // Object.prototype.hasOwnProperty.call

    /******/


    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/

    /******/
    // __webpack_public_path__

    /******/


    __webpack_require__.p = "";
    /******/

    /******/

    /******/
    // Load entry module and return exports

    /******/

    return __webpack_require__(__webpack_require__.s = 0);
    /******/
  }(
  /************************************************************************/

  /******/
  [
  /* 0 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Beautifier = __webpack_require__(1).Beautifier,
        Options = __webpack_require__(5).Options;

    function js_beautify(js_source_text, options) {
      var beautifier = new Beautifier(js_source_text, options);
      return beautifier.beautify();
    }

    module.exports = js_beautify;

    module.exports.defaultOptions = function () {
      return new Options();
    };
    /***/

  },
  /* 1 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Output = __webpack_require__(2).Output;

    var Token = __webpack_require__(3).Token;

    var acorn = __webpack_require__(4);

    var Options = __webpack_require__(5).Options;

    var Tokenizer = __webpack_require__(7).Tokenizer;

    var line_starters = __webpack_require__(7).line_starters;

    var positionable_operators = __webpack_require__(7).positionable_operators;

    var TOKEN = __webpack_require__(7).TOKEN;

    function in_array(what, arr) {
      return arr.indexOf(what) !== -1;
    }

    function ltrim(s) {
      return s.replace(/^\s+/g, '');
    }

    function generateMapFromStrings(list) {
      var result = {};

      for (var x = 0; x < list.length; x++) {
        // make the mapped names underscored instead of dash
        result[list[x].replace(/-/g, '_')] = list[x];
      }

      return result;
    }

    function reserved_word(token, word) {
      return token && token.type === TOKEN.RESERVED && token.text === word;
    }

    function reserved_array(token, words) {
      return token && token.type === TOKEN.RESERVED && in_array(token.text, words);
    } // Unsure of what they mean, but they work. Worth cleaning up in future.


    var special_words = ['case', 'return', 'do', 'if', 'throw', 'else', 'await', 'break', 'continue', 'async'];
    var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline']; // Generate map from array

    var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);
    var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];
    var MODE = {
      BlockStatement: 'BlockStatement',
      // 'BLOCK'
      Statement: 'Statement',
      // 'STATEMENT'
      ObjectLiteral: 'ObjectLiteral',
      // 'OBJECT',
      ArrayLiteral: 'ArrayLiteral',
      //'[EXPRESSION]',
      ForInitializer: 'ForInitializer',
      //'(FOR-EXPRESSION)',
      Conditional: 'Conditional',
      //'(COND-EXPRESSION)',
      Expression: 'Expression' //'(EXPRESSION)'

    };

    function remove_redundant_indentation(output, frame) {
      // This implementation is effective but has some issues:
      //     - can cause line wrap to happen too soon due to indent removal
      //           after wrap points are calculated
      // These issues are minor compared to ugly indentation.
      if (frame.multiline_frame || frame.mode === MODE.ForInitializer || frame.mode === MODE.Conditional) {
        return;
      } // remove one indent from each line inside this section


      output.remove_indent(frame.start_line_index);
    } // we could use just string.split, but
    // IE doesn't like returning empty strings


    function split_linebreaks(s) {
      //return s.split(/\x0d\x0a|\x0a/);
      s = s.replace(acorn.allLineBreaks, '\n');
      var out = [],
          idx = s.indexOf("\n");

      while (idx !== -1) {
        out.push(s.substring(0, idx));
        s = s.substring(idx + 1);
        idx = s.indexOf("\n");
      }

      if (s.length) {
        out.push(s);
      }

      return out;
    }

    function is_array(mode) {
      return mode === MODE.ArrayLiteral;
    }

    function is_expression(mode) {
      return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
    }

    function all_lines_start_with(lines, c) {
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();

        if (line.charAt(0) !== c) {
          return false;
        }
      }

      return true;
    }

    function each_line_matches_indent(lines, indent) {
      var i = 0,
          len = lines.length,
          line;

      for (; i < len; i++) {
        line = lines[i]; // allow empty lines to pass through

        if (line && line.indexOf(indent) !== 0) {
          return false;
        }
      }

      return true;
    }

    function Beautifier(source_text, options) {
      options = options || {};
      this._source_text = source_text || '';
      this._output = null;
      this._tokens = null;
      this._last_last_text = null;
      this._flags = null;
      this._previous_flags = null;
      this._flag_store = null;
      this._options = new Options(options);
    }

    Beautifier.prototype.create_flags = function (flags_base, mode) {
      var next_indent_level = 0;

      if (flags_base) {
        next_indent_level = flags_base.indentation_level;

        if (!this._output.just_added_newline() && flags_base.line_indent_level > next_indent_level) {
          next_indent_level = flags_base.line_indent_level;
        }
      }

      var next_flags = {
        mode: mode,
        parent: flags_base,
        last_token: flags_base ? flags_base.last_token : new Token(TOKEN.START_BLOCK, ''),
        // last token text
        last_word: flags_base ? flags_base.last_word : '',
        // last TOKEN.WORD passed
        declaration_statement: false,
        declaration_assignment: false,
        multiline_frame: false,
        inline_frame: false,
        if_block: false,
        else_block: false,
        do_block: false,
        do_while: false,
        import_block: false,
        in_case_statement: false,
        // switch(..){ INSIDE HERE }
        in_case: false,
        // we're on the exact line with "case 0:"
        case_body: false,
        // the indented case-action block
        indentation_level: next_indent_level,
        alignment: 0,
        line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
        start_line_index: this._output.get_line_number(),
        ternary_depth: 0
      };
      return next_flags;
    };

    Beautifier.prototype._reset = function (source_text) {
      var baseIndentString = source_text.match(/^[\t ]*/)[0];
      this._last_last_text = ''; // pre-last token text

      this._output = new Output(this._options, baseIndentString); // If testing the ignore directive, start with output disable set to true

      this._output.raw = this._options.test_output_raw; // Stack of parsing/formatting states, including MODE.
      // We tokenize, parse, and output in an almost purely a forward-only stream of token input
      // and formatted output.  This makes the beautifier less accurate than full parsers
      // but also far more tolerant of syntax errors.
      //
      // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
      // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
      // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
      // most full parsers would die, but the beautifier gracefully falls back to
      // MODE.BlockStatement and continues on.

      this._flag_store = [];
      this.set_mode(MODE.BlockStatement);
      var tokenizer = new Tokenizer(source_text, this._options);
      this._tokens = tokenizer.tokenize();
      return source_text;
    };

    Beautifier.prototype.beautify = function () {
      // if disabled, return the input unchanged.
      if (this._options.disabled) {
        return this._source_text;
      }

      var sweet_code;

      var source_text = this._reset(this._source_text);

      var eol = this._options.eol;

      if (this._options.eol === 'auto') {
        eol = '\n';

        if (source_text && acorn.lineBreak.test(source_text || '')) {
          eol = source_text.match(acorn.lineBreak)[0];
        }
      }

      var current_token = this._tokens.next();

      while (current_token) {
        this.handle_token(current_token);
        this._last_last_text = this._flags.last_token.text;
        this._flags.last_token = current_token;
        current_token = this._tokens.next();
      }

      sweet_code = this._output.get_code(eol);
      return sweet_code;
    };

    Beautifier.prototype.handle_token = function (current_token, preserve_statement_flags) {
      if (current_token.type === TOKEN.START_EXPR) {
        this.handle_start_expr(current_token);
      } else if (current_token.type === TOKEN.END_EXPR) {
        this.handle_end_expr(current_token);
      } else if (current_token.type === TOKEN.START_BLOCK) {
        this.handle_start_block(current_token);
      } else if (current_token.type === TOKEN.END_BLOCK) {
        this.handle_end_block(current_token);
      } else if (current_token.type === TOKEN.WORD) {
        this.handle_word(current_token);
      } else if (current_token.type === TOKEN.RESERVED) {
        this.handle_word(current_token);
      } else if (current_token.type === TOKEN.SEMICOLON) {
        this.handle_semicolon(current_token);
      } else if (current_token.type === TOKEN.STRING) {
        this.handle_string(current_token);
      } else if (current_token.type === TOKEN.EQUALS) {
        this.handle_equals(current_token);
      } else if (current_token.type === TOKEN.OPERATOR) {
        this.handle_operator(current_token);
      } else if (current_token.type === TOKEN.COMMA) {
        this.handle_comma(current_token);
      } else if (current_token.type === TOKEN.BLOCK_COMMENT) {
        this.handle_block_comment(current_token, preserve_statement_flags);
      } else if (current_token.type === TOKEN.COMMENT) {
        this.handle_comment(current_token, preserve_statement_flags);
      } else if (current_token.type === TOKEN.DOT) {
        this.handle_dot(current_token);
      } else if (current_token.type === TOKEN.EOF) {
        this.handle_eof(current_token);
      } else if (current_token.type === TOKEN.UNKNOWN) {
        this.handle_unknown(current_token, preserve_statement_flags);
      } else {
        this.handle_unknown(current_token, preserve_statement_flags);
      }
    };

    Beautifier.prototype.handle_whitespace_and_comments = function (current_token, preserve_statement_flags) {
      var newlines = current_token.newlines;
      var keep_whitespace = this._options.keep_array_indentation && is_array(this._flags.mode);

      if (current_token.comments_before) {
        var comment_token = current_token.comments_before.next();

        while (comment_token) {
          // The cleanest handling of inline comments is to treat them as though they aren't there.
          // Just continue formatting and the behavior should be logical.
          // Also ignore unknown tokens.  Again, this should result in better behavior.
          this.handle_whitespace_and_comments(comment_token, preserve_statement_flags);
          this.handle_token(comment_token, preserve_statement_flags);
          comment_token = current_token.comments_before.next();
        }
      }

      if (keep_whitespace) {
        for (var i = 0; i < newlines; i += 1) {
          this.print_newline(i > 0, preserve_statement_flags);
        }
      } else {
        if (this._options.max_preserve_newlines && newlines > this._options.max_preserve_newlines) {
          newlines = this._options.max_preserve_newlines;
        }

        if (this._options.preserve_newlines) {
          if (newlines > 1) {
            this.print_newline(false, preserve_statement_flags);

            for (var j = 1; j < newlines; j += 1) {
              this.print_newline(true, preserve_statement_flags);
            }
          }
        }
      }
    };

    var newline_restricted_tokens = ['async', 'break', 'continue', 'return', 'throw', 'yield'];

    Beautifier.prototype.allow_wrap_or_preserved_newline = function (current_token, force_linewrap) {
      force_linewrap = force_linewrap === undefined ? false : force_linewrap; // Never wrap the first token on a line

      if (this._output.just_added_newline()) {
        return;
      }

      var shouldPreserveOrForce = this._options.preserve_newlines && current_token.newlines || force_linewrap;
      var operatorLogicApplies = in_array(this._flags.last_token.text, positionable_operators) || in_array(current_token.text, positionable_operators);

      if (operatorLogicApplies) {
        var shouldPrintOperatorNewline = in_array(this._flags.last_token.text, positionable_operators) && in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE) || in_array(current_token.text, positionable_operators);
        shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
      }

      if (shouldPreserveOrForce) {
        this.print_newline(false, true);
      } else if (this._options.wrap_line_length) {
        if (reserved_array(this._flags.last_token, newline_restricted_tokens)) {
          // These tokens should never have a newline inserted
          // between them and the following expression.
          return;
        }

        this._output.set_wrap_point();
      }
    };

    Beautifier.prototype.print_newline = function (force_newline, preserve_statement_flags) {
      if (!preserve_statement_flags) {
        if (this._flags.last_token.text !== ';' && this._flags.last_token.text !== ',' && this._flags.last_token.text !== '=' && (this._flags.last_token.type !== TOKEN.OPERATOR || this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) {
          var next_token = this._tokens.peek();

          while (this._flags.mode === MODE.Statement && !(this._flags.if_block && reserved_word(next_token, 'else')) && !this._flags.do_block) {
            this.restore_mode();
          }
        }
      }

      if (this._output.add_new_line(force_newline)) {
        this._flags.multiline_frame = true;
      }
    };

    Beautifier.prototype.print_token_line_indentation = function (current_token) {
      if (this._output.just_added_newline()) {
        if (this._options.keep_array_indentation && current_token.newlines && (current_token.text === '[' || is_array(this._flags.mode))) {
          this._output.current_line.set_indent(-1);

          this._output.current_line.push(current_token.whitespace_before);

          this._output.space_before_token = false;
        } else if (this._output.set_indent(this._flags.indentation_level, this._flags.alignment)) {
          this._flags.line_indent_level = this._flags.indentation_level;
        }
      }
    };

    Beautifier.prototype.print_token = function (current_token) {
      if (this._output.raw) {
        this._output.add_raw_token(current_token);

        return;
      }

      if (this._options.comma_first && current_token.previous && current_token.previous.type === TOKEN.COMMA && this._output.just_added_newline()) {
        if (this._output.previous_line.last() === ',') {
          var popped = this._output.previous_line.pop(); // if the comma was already at the start of the line,
          // pull back onto that line and reprint the indentation


          if (this._output.previous_line.is_empty()) {
            this._output.previous_line.push(popped);

            this._output.trim(true);

            this._output.current_line.pop();

            this._output.trim();
          } // add the comma in front of the next token


          this.print_token_line_indentation(current_token);

          this._output.add_token(',');

          this._output.space_before_token = true;
        }
      }

      this.print_token_line_indentation(current_token);
      this._output.non_breaking_space = true;

      this._output.add_token(current_token.text);

      if (this._output.previous_token_wrapped) {
        this._flags.multiline_frame = true;
      }
    };

    Beautifier.prototype.indent = function () {
      this._flags.indentation_level += 1;

      this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
    };

    Beautifier.prototype.deindent = function () {
      if (this._flags.indentation_level > 0 && (!this._flags.parent || this._flags.indentation_level > this._flags.parent.indentation_level)) {
        this._flags.indentation_level -= 1;

        this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
      }
    };

    Beautifier.prototype.set_mode = function (mode) {
      if (this._flags) {
        this._flag_store.push(this._flags);

        this._previous_flags = this._flags;
      } else {
        this._previous_flags = this.create_flags(null, mode);
      }

      this._flags = this.create_flags(this._previous_flags, mode);

      this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
    };

    Beautifier.prototype.restore_mode = function () {
      if (this._flag_store.length > 0) {
        this._previous_flags = this._flags;
        this._flags = this._flag_store.pop();

        if (this._previous_flags.mode === MODE.Statement) {
          remove_redundant_indentation(this._output, this._previous_flags);
        }

        this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
      }
    };

    Beautifier.prototype.start_of_object_property = function () {
      return this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement && (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0 || reserved_array(this._flags.last_token, ['get', 'set']));
    };

    Beautifier.prototype.start_of_statement = function (current_token) {
      var start = false;
      start = start || reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD;
      start = start || reserved_word(this._flags.last_token, 'do');
      start = start || !(this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement) && reserved_array(this._flags.last_token, newline_restricted_tokens) && !current_token.newlines;
      start = start || reserved_word(this._flags.last_token, 'else') && !(reserved_word(current_token, 'if') && !current_token.comments_before);
      start = start || this._flags.last_token.type === TOKEN.END_EXPR && (this._previous_flags.mode === MODE.ForInitializer || this._previous_flags.mode === MODE.Conditional);
      start = start || this._flags.last_token.type === TOKEN.WORD && this._flags.mode === MODE.BlockStatement && !this._flags.in_case && !(current_token.text === '--' || current_token.text === '++') && this._last_last_text !== 'function' && current_token.type !== TOKEN.WORD && current_token.type !== TOKEN.RESERVED;
      start = start || this._flags.mode === MODE.ObjectLiteral && (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0 || reserved_array(this._flags.last_token, ['get', 'set']));

      if (start) {
        this.set_mode(MODE.Statement);
        this.indent();
        this.handle_whitespace_and_comments(current_token, true); // Issue #276:
        // If starting a new statement with [if, for, while, do], push to a new line.
        // if (a) if (b) if(c) d(); else e(); else f();

        if (!this.start_of_object_property()) {
          this.allow_wrap_or_preserved_newline(current_token, reserved_array(current_token, ['do', 'for', 'if', 'while']));
        }

        return true;
      }

      return false;
    };

    Beautifier.prototype.handle_start_expr = function (current_token) {
      // The conditional starts the statement if appropriate.
      if (!this.start_of_statement(current_token)) {
        this.handle_whitespace_and_comments(current_token);
      }

      var next_mode = MODE.Expression;

      if (current_token.text === '[') {
        if (this._flags.last_token.type === TOKEN.WORD || this._flags.last_token.text === ')') {
          // this is array index specifier, break immediately
          // a[x], fn()[x]
          if (reserved_array(this._flags.last_token, line_starters)) {
            this._output.space_before_token = true;
          }

          this.print_token(current_token);
          this.set_mode(next_mode);
          this.indent();

          if (this._options.space_in_paren) {
            this._output.space_before_token = true;
          }

          return;
        }

        next_mode = MODE.ArrayLiteral;

        if (is_array(this._flags.mode)) {
          if (this._flags.last_token.text === '[' || this._flags.last_token.text === ',' && (this._last_last_text === ']' || this._last_last_text === '}')) {
            // ], [ goes to new line
            // }, [ goes to new line
            if (!this._options.keep_array_indentation) {
              this.print_newline();
            }
          }
        }

        if (!in_array(this._flags.last_token.type, [TOKEN.START_EXPR, TOKEN.END_EXPR, TOKEN.WORD, TOKEN.OPERATOR])) {
          this._output.space_before_token = true;
        }
      } else {
        if (this._flags.last_token.type === TOKEN.RESERVED) {
          if (this._flags.last_token.text === 'for') {
            this._output.space_before_token = this._options.space_before_conditional;
            next_mode = MODE.ForInitializer;
          } else if (in_array(this._flags.last_token.text, ['if', 'while'])) {
            this._output.space_before_token = this._options.space_before_conditional;
            next_mode = MODE.Conditional;
          } else if (in_array(this._flags.last_word, ['await', 'async'])) {
            // Should be a space between await and an IIFE, or async and an arrow function
            this._output.space_before_token = true;
          } else if (this._flags.last_token.text === 'import' && current_token.whitespace_before === '') {
            this._output.space_before_token = false;
          } else if (in_array(this._flags.last_token.text, line_starters) || this._flags.last_token.text === 'catch') {
            this._output.space_before_token = true;
          }
        } else if (this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
          // Support of this kind of newline preservation.
          // a = (b &&
          //     (c || d));
          if (!this.start_of_object_property()) {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else if (this._flags.last_token.type === TOKEN.WORD) {
          this._output.space_before_token = false; // function name() vs function name ()
          // function* name() vs function* name ()
          // async name() vs async name ()
          // In ES6, you can also define the method properties of an object
          // var obj = {a: function() {}}
          // It can be abbreviated
          // var obj = {a() {}}
          // var obj = { a() {}} vs var obj = { a () {}}
          // var obj = { * a() {}} vs var obj = { * a () {}}

          var peek_back_two = this._tokens.peek(-3);

          if (this._options.space_after_named_function && peek_back_two) {
            // peek starts at next character so -1 is current token
            var peek_back_three = this._tokens.peek(-4);

            if (reserved_array(peek_back_two, ['async', 'function']) || peek_back_two.text === '*' && reserved_array(peek_back_three, ['async', 'function'])) {
              this._output.space_before_token = true;
            } else if (this._flags.mode === MODE.ObjectLiteral) {
              if (peek_back_two.text === '{' || peek_back_two.text === ',' || peek_back_two.text === '*' && (peek_back_three.text === '{' || peek_back_three.text === ',')) {
                this._output.space_before_token = true;
              }
            }
          }
        } else {
          // Support preserving wrapped arrow function expressions
          // a.b('c',
          //     () => d.e
          // )
          this.allow_wrap_or_preserved_newline(current_token);
        } // function() vs function ()
        // yield*() vs yield* ()
        // function*() vs function* ()


        if (this._flags.last_token.type === TOKEN.RESERVED && (this._flags.last_word === 'function' || this._flags.last_word === 'typeof') || this._flags.last_token.text === '*' && (in_array(this._last_last_text, ['function', 'yield']) || this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, ['{', ',']))) {
          this._output.space_before_token = this._options.space_after_anon_function;
        }
      }

      if (this._flags.last_token.text === ';' || this._flags.last_token.type === TOKEN.START_BLOCK) {
        this.print_newline();
      } else if (this._flags.last_token.type === TOKEN.END_EXPR || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.END_BLOCK || this._flags.last_token.text === '.' || this._flags.last_token.type === TOKEN.COMMA) {
        // do nothing on (( and )( and ][ and ]( and .(
        // TODO: Consider whether forcing this is required.  Review failing tests when removed.
        this.allow_wrap_or_preserved_newline(current_token, current_token.newlines);
      }

      this.print_token(current_token);
      this.set_mode(next_mode);

      if (this._options.space_in_paren) {
        this._output.space_before_token = true;
      } // In all cases, if we newline while inside an expression it should be indented.


      this.indent();
    };

    Beautifier.prototype.handle_end_expr = function (current_token) {
      // statements inside expressions are not valid syntax, but...
      // statements must all be closed when their container closes
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }

      this.handle_whitespace_and_comments(current_token);

      if (this._flags.multiline_frame) {
        this.allow_wrap_or_preserved_newline(current_token, current_token.text === ']' && is_array(this._flags.mode) && !this._options.keep_array_indentation);
      }

      if (this._options.space_in_paren) {
        if (this._flags.last_token.type === TOKEN.START_EXPR && !this._options.space_in_empty_paren) {
          // () [] no inner space in empty parens like these, ever, ref #320
          this._output.trim();

          this._output.space_before_token = false;
        } else {
          this._output.space_before_token = true;
        }
      }

      this.deindent();
      this.print_token(current_token);
      this.restore_mode();
      remove_redundant_indentation(this._output, this._previous_flags); // do {} while () // no statement required after

      if (this._flags.do_while && this._previous_flags.mode === MODE.Conditional) {
        this._previous_flags.mode = MODE.Expression;
        this._flags.do_block = false;
        this._flags.do_while = false;
      }
    };

    Beautifier.prototype.handle_start_block = function (current_token) {
      this.handle_whitespace_and_comments(current_token); // Check if this is should be treated as a ObjectLiteral

      var next_token = this._tokens.peek();

      var second_token = this._tokens.peek(1);

      if (this._flags.last_word === 'switch' && this._flags.last_token.type === TOKEN.END_EXPR) {
        this.set_mode(MODE.BlockStatement);
        this._flags.in_case_statement = true;
      } else if (this._flags.case_body) {
        this.set_mode(MODE.BlockStatement);
      } else if (second_token && (in_array(second_token.text, [':', ',']) && in_array(next_token.type, [TOKEN.STRING, TOKEN.WORD, TOKEN.RESERVED]) || in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, [TOKEN.WORD, TOKEN.RESERVED]))) {
        // We don't support TypeScript,but we didn't break it for a very long time.
        // We'll try to keep not breaking it.
        if (!in_array(this._last_last_text, ['class', 'interface'])) {
          this.set_mode(MODE.ObjectLiteral);
        } else {
          this.set_mode(MODE.BlockStatement);
        }
      } else if (this._flags.last_token.type === TOKEN.OPERATOR && this._flags.last_token.text === '=>') {
        // arrow function: (param1, paramN) => { statements }
        this.set_mode(MODE.BlockStatement);
      } else if (in_array(this._flags.last_token.type, [TOKEN.EQUALS, TOKEN.START_EXPR, TOKEN.COMMA, TOKEN.OPERATOR]) || reserved_array(this._flags.last_token, ['return', 'throw', 'import', 'default'])) {
        // Detecting shorthand function syntax is difficult by scanning forward,
        //     so check the surrounding context.
        // If the block is being returned, imported, export default, passed as arg,
        //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
        this.set_mode(MODE.ObjectLiteral);
      } else {
        this.set_mode(MODE.BlockStatement);
      }

      var empty_braces = !next_token.comments_before && next_token.text === '}';
      var empty_anonymous_function = empty_braces && this._flags.last_word === 'function' && this._flags.last_token.type === TOKEN.END_EXPR;

      if (this._options.brace_preserve_inline) // check for inline, set inline_frame if so
        {
          // search forward for a newline wanted inside this block
          var index = 0;
          var check_token = null;
          this._flags.inline_frame = true;

          do {
            index += 1;
            check_token = this._tokens.peek(index - 1);

            if (check_token.newlines) {
              this._flags.inline_frame = false;
              break;
            }
          } while (check_token.type !== TOKEN.EOF && !(check_token.type === TOKEN.END_BLOCK && check_token.opened === current_token));
        }

      if ((this._options.brace_style === "expand" || this._options.brace_style === "none" && current_token.newlines) && !this._flags.inline_frame) {
        if (this._flags.last_token.type !== TOKEN.OPERATOR && (empty_anonymous_function || this._flags.last_token.type === TOKEN.EQUALS || reserved_array(this._flags.last_token, special_words) && this._flags.last_token.text !== 'else')) {
          this._output.space_before_token = true;
        } else {
          this.print_newline(false, true);
        }
      } else {
        // collapse || inline_frame
        if (is_array(this._previous_flags.mode) && (this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.COMMA)) {
          if (this._flags.last_token.type === TOKEN.COMMA || this._options.space_in_paren) {
            this._output.space_before_token = true;
          }

          if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR && this._flags.inline_frame) {
            this.allow_wrap_or_preserved_newline(current_token);
            this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame;
            this._flags.multiline_frame = false;
          }
        }

        if (this._flags.last_token.type !== TOKEN.OPERATOR && this._flags.last_token.type !== TOKEN.START_EXPR) {
          if (this._flags.last_token.type === TOKEN.START_BLOCK && !this._flags.inline_frame) {
            this.print_newline();
          } else {
            this._output.space_before_token = true;
          }
        }
      }

      this.print_token(current_token);
      this.indent(); // Except for specific cases, open braces are followed by a new line.

      if (!empty_braces && !(this._options.brace_preserve_inline && this._flags.inline_frame)) {
        this.print_newline();
      }
    };

    Beautifier.prototype.handle_end_block = function (current_token) {
      // statements must all be closed when their container closes
      this.handle_whitespace_and_comments(current_token);

      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }

      var empty_braces = this._flags.last_token.type === TOKEN.START_BLOCK;

      if (this._flags.inline_frame && !empty_braces) {
        // try inline_frame (only set if this._options.braces-preserve-inline) first
        this._output.space_before_token = true;
      } else if (this._options.brace_style === "expand") {
        if (!empty_braces) {
          this.print_newline();
        }
      } else {
        // skip {}
        if (!empty_braces) {
          if (is_array(this._flags.mode) && this._options.keep_array_indentation) {
            // we REALLY need a newline here, but newliner would skip that
            this._options.keep_array_indentation = false;
            this.print_newline();
            this._options.keep_array_indentation = true;
          } else {
            this.print_newline();
          }
        }
      }

      this.restore_mode();
      this.print_token(current_token);
    };

    Beautifier.prototype.handle_word = function (current_token) {
      if (current_token.type === TOKEN.RESERVED) {
        if (in_array(current_token.text, ['set', 'get']) && this._flags.mode !== MODE.ObjectLiteral) {
          current_token.type = TOKEN.WORD;
        } else if (current_token.text === 'import' && this._tokens.peek().text === '(') {
          current_token.type = TOKEN.WORD;
        } else if (in_array(current_token.text, ['as', 'from']) && !this._flags.import_block) {
          current_token.type = TOKEN.WORD;
        } else if (this._flags.mode === MODE.ObjectLiteral) {
          var next_token = this._tokens.peek();

          if (next_token.text === ':') {
            current_token.type = TOKEN.WORD;
          }
        }
      }

      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        if (reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD) {
          this._flags.declaration_statement = true;
        }
      } else if (current_token.newlines && !is_expression(this._flags.mode) && (this._flags.last_token.type !== TOKEN.OPERATOR || this._flags.last_token.text === '--' || this._flags.last_token.text === '++') && this._flags.last_token.type !== TOKEN.EQUALS && (this._options.preserve_newlines || !reserved_array(this._flags.last_token, ['var', 'let', 'const', 'set', 'get']))) {
        this.handle_whitespace_and_comments(current_token);
        this.print_newline();
      } else {
        this.handle_whitespace_and_comments(current_token);
      }

      if (this._flags.do_block && !this._flags.do_while) {
        if (reserved_word(current_token, 'while')) {
          // do {} ## while ()
          this._output.space_before_token = true;
          this.print_token(current_token);
          this._output.space_before_token = true;
          this._flags.do_while = true;
          return;
        } else {
          // do {} should always have while as the next word.
          // if we don't see the expected while, recover
          this.print_newline();
          this._flags.do_block = false;
        }
      } // if may be followed by else, or not
      // Bare/inline ifs are tricky
      // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();


      if (this._flags.if_block) {
        if (!this._flags.else_block && reserved_word(current_token, 'else')) {
          this._flags.else_block = true;
        } else {
          while (this._flags.mode === MODE.Statement) {
            this.restore_mode();
          }

          this._flags.if_block = false;
          this._flags.else_block = false;
        }
      }

      if (this._flags.in_case_statement && reserved_array(current_token, ['case', 'default'])) {
        this.print_newline();

        if (this._flags.last_token.type !== TOKEN.END_BLOCK && (this._flags.case_body || this._options.jslint_happy)) {
          // switch cases following one another
          this.deindent();
        }

        this._flags.case_body = false;
        this.print_token(current_token);
        this._flags.in_case = true;
        return;
      }

      if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
        if (!this.start_of_object_property()) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
      }

      if (reserved_word(current_token, 'function')) {
        if (in_array(this._flags.last_token.text, ['}', ';']) || this._output.just_added_newline() && !(in_array(this._flags.last_token.text, ['(', '[', '{', ':', '=', ',']) || this._flags.last_token.type === TOKEN.OPERATOR)) {
          // make sure there is a nice clean space of at least one blank line
          // before a new function definition
          if (!this._output.just_added_blankline() && !current_token.comments_before) {
            this.print_newline();
            this.print_newline(true);
          }
        }

        if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD) {
          if (reserved_array(this._flags.last_token, ['get', 'set', 'new', 'export']) || reserved_array(this._flags.last_token, newline_restricted_tokens)) {
            this._output.space_before_token = true;
          } else if (reserved_word(this._flags.last_token, 'default') && this._last_last_text === 'export') {
            this._output.space_before_token = true;
          } else if (this._flags.last_token.text === 'declare') {
            // accomodates Typescript declare function formatting
            this._output.space_before_token = true;
          } else {
            this.print_newline();
          }
        } else if (this._flags.last_token.type === TOKEN.OPERATOR || this._flags.last_token.text === '=') {
          // foo = function
          this._output.space_before_token = true;
        } else if (!this._flags.multiline_frame && (is_expression(this._flags.mode) || is_array(this._flags.mode))) {// (function
        } else {
          this.print_newline();
        }

        this.print_token(current_token);
        this._flags.last_word = current_token.text;
        return;
      }

      var prefix = 'NONE';

      if (this._flags.last_token.type === TOKEN.END_BLOCK) {
        if (this._previous_flags.inline_frame) {
          prefix = 'SPACE';
        } else if (!reserved_array(current_token, ['else', 'catch', 'finally', 'from'])) {
          prefix = 'NEWLINE';
        } else {
          if (this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && current_token.newlines) {
            prefix = 'NEWLINE';
          } else {
            prefix = 'SPACE';
            this._output.space_before_token = true;
          }
        }
      } else if (this._flags.last_token.type === TOKEN.SEMICOLON && this._flags.mode === MODE.BlockStatement) {
        // TODO: Should this be for STATEMENT as well?
        prefix = 'NEWLINE';
      } else if (this._flags.last_token.type === TOKEN.SEMICOLON && is_expression(this._flags.mode)) {
        prefix = 'SPACE';
      } else if (this._flags.last_token.type === TOKEN.STRING) {
        prefix = 'NEWLINE';
      } else if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD || this._flags.last_token.text === '*' && (in_array(this._last_last_text, ['function', 'yield']) || this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, ['{', ',']))) {
        prefix = 'SPACE';
      } else if (this._flags.last_token.type === TOKEN.START_BLOCK) {
        if (this._flags.inline_frame) {
          prefix = 'SPACE';
        } else {
          prefix = 'NEWLINE';
        }
      } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
        this._output.space_before_token = true;
        prefix = 'NEWLINE';
      }

      if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
        if (this._flags.inline_frame || this._flags.last_token.text === 'else' || this._flags.last_token.text === 'export') {
          prefix = 'SPACE';
        } else {
          prefix = 'NEWLINE';
        }
      }

      if (reserved_array(current_token, ['else', 'catch', 'finally'])) {
        if ((!(this._flags.last_token.type === TOKEN.END_BLOCK && this._previous_flags.mode === MODE.BlockStatement) || this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && current_token.newlines) && !this._flags.inline_frame) {
          this.print_newline();
        } else {
          this._output.trim(true);

          var line = this._output.current_line; // If we trimmed and there's something other than a close block before us
          // put a newline back in.  Handles '} // comment' scenario.

          if (line.last() !== '}') {
            this.print_newline();
          }

          this._output.space_before_token = true;
        }
      } else if (prefix === 'NEWLINE') {
        if (reserved_array(this._flags.last_token, special_words)) {
          // no newline between 'return nnn'
          this._output.space_before_token = true;
        } else if (this._flags.last_token.text === 'declare' && reserved_array(current_token, ['var', 'let', 'const'])) {
          // accomodates Typescript declare formatting
          this._output.space_before_token = true;
        } else if (this._flags.last_token.type !== TOKEN.END_EXPR) {
          if ((this._flags.last_token.type !== TOKEN.START_EXPR || !reserved_array(current_token, ['var', 'let', 'const'])) && this._flags.last_token.text !== ':') {
            // no need to force newline on 'var': for (var x = 0...)
            if (reserved_word(current_token, 'if') && reserved_word(current_token.previous, 'else')) {
              // no newline for } else if {
              this._output.space_before_token = true;
            } else {
              this.print_newline();
            }
          }
        } else if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
          this.print_newline();
        }
      } else if (this._flags.multiline_frame && is_array(this._flags.mode) && this._flags.last_token.text === ',' && this._last_last_text === '}') {
        this.print_newline(); // }, in lists get a newline treatment
      } else if (prefix === 'SPACE') {
        this._output.space_before_token = true;
      }

      if (current_token.previous && (current_token.previous.type === TOKEN.WORD || current_token.previous.type === TOKEN.RESERVED)) {
        this._output.space_before_token = true;
      }

      this.print_token(current_token);
      this._flags.last_word = current_token.text;

      if (current_token.type === TOKEN.RESERVED) {
        if (current_token.text === 'do') {
          this._flags.do_block = true;
        } else if (current_token.text === 'if') {
          this._flags.if_block = true;
        } else if (current_token.text === 'import') {
          this._flags.import_block = true;
        } else if (this._flags.import_block && reserved_word(current_token, 'from')) {
          this._flags.import_block = false;
        }
      }
    };

    Beautifier.prototype.handle_semicolon = function (current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        // Semicolon can be the start (and end) of a statement
        this._output.space_before_token = false;
      } else {
        this.handle_whitespace_and_comments(current_token);
      }

      var next_token = this._tokens.peek();

      while (this._flags.mode === MODE.Statement && !(this._flags.if_block && reserved_word(next_token, 'else')) && !this._flags.do_block) {
        this.restore_mode();
      } // hacky but effective for the moment


      if (this._flags.import_block) {
        this._flags.import_block = false;
      }

      this.print_token(current_token);
    };

    Beautifier.prototype.handle_string = function (current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        // One difference - strings want at least a space before
        this._output.space_before_token = true;
      } else {
        this.handle_whitespace_and_comments(current_token);

        if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD || this._flags.inline_frame) {
          this._output.space_before_token = true;
        } else if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
          if (!this.start_of_object_property()) {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else {
          this.print_newline();
        }
      }

      this.print_token(current_token);
    };

    Beautifier.prototype.handle_equals = function (current_token) {
      if (this.start_of_statement(current_token)) {// The conditional starts the statement if appropriate.
      } else {
        this.handle_whitespace_and_comments(current_token);
      }

      if (this._flags.declaration_statement) {
        // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
        this._flags.declaration_assignment = true;
      }

      this._output.space_before_token = true;
      this.print_token(current_token);
      this._output.space_before_token = true;
    };

    Beautifier.prototype.handle_comma = function (current_token) {
      this.handle_whitespace_and_comments(current_token, true);
      this.print_token(current_token);
      this._output.space_before_token = true;

      if (this._flags.declaration_statement) {
        if (is_expression(this._flags.parent.mode)) {
          // do not break on comma, for(var a = 1, b = 2)
          this._flags.declaration_assignment = false;
        }

        if (this._flags.declaration_assignment) {
          this._flags.declaration_assignment = false;
          this.print_newline(false, true);
        } else if (this._options.comma_first) {
          // for comma-first, we want to allow a newline before the comma
          // to turn into a newline after the comma, which we will fixup later
          this.allow_wrap_or_preserved_newline(current_token);
        }
      } else if (this._flags.mode === MODE.ObjectLiteral || this._flags.mode === MODE.Statement && this._flags.parent.mode === MODE.ObjectLiteral) {
        if (this._flags.mode === MODE.Statement) {
          this.restore_mode();
        }

        if (!this._flags.inline_frame) {
          this.print_newline();
        }
      } else if (this._options.comma_first) {
        // EXPR or DO_BLOCK
        // for comma-first, we want to allow a newline before the comma
        // to turn into a newline after the comma, which we will fixup later
        this.allow_wrap_or_preserved_newline(current_token);
      }
    };

    Beautifier.prototype.handle_operator = function (current_token) {
      var isGeneratorAsterisk = current_token.text === '*' && (reserved_array(this._flags.last_token, ['function', 'yield']) || in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.COMMA, TOKEN.END_BLOCK, TOKEN.SEMICOLON]));
      var isUnary = in_array(current_token.text, ['-', '+']) && (in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.START_EXPR, TOKEN.EQUALS, TOKEN.OPERATOR]) || in_array(this._flags.last_token.text, line_starters) || this._flags.last_token.text === ',');

      if (this.start_of_statement(current_token)) {// The conditional starts the statement if appropriate.
      } else {
        var preserve_statement_flags = !isGeneratorAsterisk;
        this.handle_whitespace_and_comments(current_token, preserve_statement_flags);
      }

      if (reserved_array(this._flags.last_token, special_words)) {
        // "return" had a special handling in TK_WORD. Now we need to return the favor
        this._output.space_before_token = true;
        this.print_token(current_token);
        return;
      } // hack for actionscript's import .*;


      if (current_token.text === '*' && this._flags.last_token.type === TOKEN.DOT) {
        this.print_token(current_token);
        return;
      }

      if (current_token.text === '::') {
        // no spaces around exotic namespacing syntax operator
        this.print_token(current_token);
        return;
      } // Allow line wrapping between operators when operator_position is
      //   set to before or preserve


      if (this._flags.last_token.type === TOKEN.OPERATOR && in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
        this.allow_wrap_or_preserved_newline(current_token);
      }

      if (current_token.text === ':' && this._flags.in_case) {
        this.print_token(current_token);
        this._flags.in_case = false;
        this._flags.case_body = true;

        if (this._tokens.peek().type !== TOKEN.START_BLOCK) {
          this.indent();
          this.print_newline();
        } else {
          this._output.space_before_token = true;
        }

        return;
      }

      var space_before = true;
      var space_after = true;
      var in_ternary = false;

      if (current_token.text === ':') {
        if (this._flags.ternary_depth === 0) {
          // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
          space_before = false;
        } else {
          this._flags.ternary_depth -= 1;
          in_ternary = true;
        }
      } else if (current_token.text === '?') {
        this._flags.ternary_depth += 1;
      } // let's handle the operator_position option prior to any conflicting logic


      if (!isUnary && !isGeneratorAsterisk && this._options.preserve_newlines && in_array(current_token.text, positionable_operators)) {
        var isColon = current_token.text === ':';
        var isTernaryColon = isColon && in_ternary;
        var isOtherColon = isColon && !in_ternary;

        switch (this._options.operator_position) {
          case OPERATOR_POSITION.before_newline:
            // if the current token is : and it's not a ternary statement then we set space_before to false
            this._output.space_before_token = !isOtherColon;
            this.print_token(current_token);

            if (!isColon || isTernaryColon) {
              this.allow_wrap_or_preserved_newline(current_token);
            }

            this._output.space_before_token = true;
            return;

          case OPERATOR_POSITION.after_newline:
            // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
            //   then print a newline.
            this._output.space_before_token = true;

            if (!isColon || isTernaryColon) {
              if (this._tokens.peek().newlines) {
                this.print_newline(false, true);
              } else {
                this.allow_wrap_or_preserved_newline(current_token);
              }
            } else {
              this._output.space_before_token = false;
            }

            this.print_token(current_token);
            this._output.space_before_token = true;
            return;

          case OPERATOR_POSITION.preserve_newline:
            if (!isOtherColon) {
              this.allow_wrap_or_preserved_newline(current_token);
            } // if we just added a newline, or the current token is : and it's not a ternary statement,
            //   then we set space_before to false


            space_before = !(this._output.just_added_newline() || isOtherColon);
            this._output.space_before_token = space_before;
            this.print_token(current_token);
            this._output.space_before_token = true;
            return;
        }
      }

      if (isGeneratorAsterisk) {
        this.allow_wrap_or_preserved_newline(current_token);
        space_before = false;

        var next_token = this._tokens.peek();

        space_after = next_token && in_array(next_token.type, [TOKEN.WORD, TOKEN.RESERVED]);
      } else if (current_token.text === '...') {
        this.allow_wrap_or_preserved_newline(current_token);
        space_before = this._flags.last_token.type === TOKEN.START_BLOCK;
        space_after = false;
      } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
        // unary operators (and binary +/- pretending to be unary) special cases
        if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR) {
          this.allow_wrap_or_preserved_newline(current_token);
        }

        space_before = false;
        space_after = false; // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
        // if there is a newline between -- or ++ and anything else we should preserve it.

        if (current_token.newlines && (current_token.text === '--' || current_token.text === '++')) {
          this.print_newline(false, true);
        }

        if (this._flags.last_token.text === ';' && is_expression(this._flags.mode)) {
          // for (;; ++i)
          //        ^^^
          space_before = true;
        }

        if (this._flags.last_token.type === TOKEN.RESERVED) {
          space_before = true;
        } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
          space_before = !(this._flags.last_token.text === ']' && (current_token.text === '--' || current_token.text === '++'));
        } else if (this._flags.last_token.type === TOKEN.OPERATOR) {
          // a++ + ++b;
          // a - -b
          space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(this._flags.last_token.text, ['--', '-', '++', '+']); // + and - are not unary when preceeded by -- or ++ operator
          // a-- + b
          // a * +b
          // a - -b

          if (in_array(current_token.text, ['+', '-']) && in_array(this._flags.last_token.text, ['--', '++'])) {
            space_after = true;
          }
        }

        if ((this._flags.mode === MODE.BlockStatement && !this._flags.inline_frame || this._flags.mode === MODE.Statement) && (this._flags.last_token.text === '{' || this._flags.last_token.text === ';')) {
          // { foo; --i }
          // foo(); --bar;
          this.print_newline();
        }
      }

      this._output.space_before_token = this._output.space_before_token || space_before;
      this.print_token(current_token);
      this._output.space_before_token = space_after;
    };

    Beautifier.prototype.handle_block_comment = function (current_token, preserve_statement_flags) {
      if (this._output.raw) {
        this._output.add_raw_token(current_token);

        if (current_token.directives && current_token.directives.preserve === 'end') {
          // If we're testing the raw output behavior, do not allow a directive to turn it off.
          this._output.raw = this._options.test_output_raw;
        }

        return;
      }

      if (current_token.directives) {
        this.print_newline(false, preserve_statement_flags);
        this.print_token(current_token);

        if (current_token.directives.preserve === 'start') {
          this._output.raw = true;
        }

        this.print_newline(false, true);
        return;
      } // inline block


      if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
        this._output.space_before_token = true;
        this.print_token(current_token);
        this._output.space_before_token = true;
        return;
      } else {
        this.print_block_commment(current_token, preserve_statement_flags);
      }
    };

    Beautifier.prototype.print_block_commment = function (current_token, preserve_statement_flags) {
      var lines = split_linebreaks(current_token.text);
      var j; // iterator for this case

      var javadoc = false;
      var starless = false;
      var lastIndent = current_token.whitespace_before;
      var lastIndentLength = lastIndent.length; // block comment starts with a new line

      this.print_newline(false, preserve_statement_flags); // first line always indented

      this.print_token_line_indentation(current_token);

      this._output.add_token(lines[0]);

      this.print_newline(false, preserve_statement_flags);

      if (lines.length > 1) {
        lines = lines.slice(1);
        javadoc = all_lines_start_with(lines, '*');
        starless = each_line_matches_indent(lines, lastIndent);

        if (javadoc) {
          this._flags.alignment = 1;
        }

        for (j = 0; j < lines.length; j++) {
          if (javadoc) {
            // javadoc: reformat and re-indent
            this.print_token_line_indentation(current_token);

            this._output.add_token(ltrim(lines[j]));
          } else if (starless && lines[j]) {
            // starless: re-indent non-empty content, avoiding trim
            this.print_token_line_indentation(current_token);

            this._output.add_token(lines[j].substring(lastIndentLength));
          } else {
            // normal comments output raw
            this._output.current_line.set_indent(-1);

            this._output.add_token(lines[j]);
          } // for comments on their own line or  more than one line, make sure there's a new line after


          this.print_newline(false, preserve_statement_flags);
        }

        this._flags.alignment = 0;
      }
    };

    Beautifier.prototype.handle_comment = function (current_token, preserve_statement_flags) {
      if (current_token.newlines) {
        this.print_newline(false, preserve_statement_flags);
      } else {
        this._output.trim(true);
      }

      this._output.space_before_token = true;
      this.print_token(current_token);
      this.print_newline(false, preserve_statement_flags);
    };

    Beautifier.prototype.handle_dot = function (current_token) {
      if (this.start_of_statement(current_token)) {// The conditional starts the statement if appropriate.
      } else {
        this.handle_whitespace_and_comments(current_token, true);
      }

      if (reserved_array(this._flags.last_token, special_words)) {
        this._output.space_before_token = false;
      } else {
        // allow preserved newlines before dots in general
        // force newlines on dots after close paren when break_chained - for bar().baz()
        this.allow_wrap_or_preserved_newline(current_token, this._flags.last_token.text === ')' && this._options.break_chained_methods);
      } // Only unindent chained method dot if this dot starts a new line.
      // Otherwise the automatic extra indentation removal will handle the over indent


      if (this._options.unindent_chained_methods && this._output.just_added_newline()) {
        this.deindent();
      }

      this.print_token(current_token);
    };

    Beautifier.prototype.handle_unknown = function (current_token, preserve_statement_flags) {
      this.print_token(current_token);

      if (current_token.text[current_token.text.length - 1] === '\n') {
        this.print_newline(false, preserve_statement_flags);
      }
    };

    Beautifier.prototype.handle_eof = function (current_token) {
      // Unwind any open statements
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }

      this.handle_whitespace_and_comments(current_token);
    };

    module.exports.Beautifier = Beautifier;
    /***/
  },
  /* 2 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function OutputLine(parent) {
      this.__parent = parent;
      this.__character_count = 0; // use indent_count as a marker for this.__lines that have preserved indentation

      this.__indent_count = -1;
      this.__alignment_count = 0;
      this.__wrap_point_index = 0;
      this.__wrap_point_character_count = 0;
      this.__wrap_point_indent_count = -1;
      this.__wrap_point_alignment_count = 0;
      this.__items = [];
    }

    OutputLine.prototype.clone_empty = function () {
      var line = new OutputLine(this.__parent);
      line.set_indent(this.__indent_count, this.__alignment_count);
      return line;
    };

    OutputLine.prototype.item = function (index) {
      if (index < 0) {
        return this.__items[this.__items.length + index];
      } else {
        return this.__items[index];
      }
    };

    OutputLine.prototype.has_match = function (pattern) {
      for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
        if (this.__items[lastCheckedOutput].match(pattern)) {
          return true;
        }
      }

      return false;
    };

    OutputLine.prototype.set_indent = function (indent, alignment) {
      if (this.is_empty()) {
        this.__indent_count = indent || 0;
        this.__alignment_count = alignment || 0;
        this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
      }
    };

    OutputLine.prototype._set_wrap_point = function () {
      if (this.__parent.wrap_line_length) {
        this.__wrap_point_index = this.__items.length;
        this.__wrap_point_character_count = this.__character_count;
        this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
        this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
      }
    };

    OutputLine.prototype._should_wrap = function () {
      return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
    };

    OutputLine.prototype._allow_wrap = function () {
      if (this._should_wrap()) {
        this.__parent.add_new_line();

        var next = this.__parent.current_line;
        next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
        next.__items = this.__items.slice(this.__wrap_point_index);
        this.__items = this.__items.slice(0, this.__wrap_point_index);
        next.__character_count += this.__character_count - this.__wrap_point_character_count;
        this.__character_count = this.__wrap_point_character_count;

        if (next.__items[0] === " ") {
          next.__items.splice(0, 1);

          next.__character_count -= 1;
        }

        return true;
      }

      return false;
    };

    OutputLine.prototype.is_empty = function () {
      return this.__items.length === 0;
    };

    OutputLine.prototype.last = function () {
      if (!this.is_empty()) {
        return this.__items[this.__items.length - 1];
      } else {
        return null;
      }
    };

    OutputLine.prototype.push = function (item) {
      this.__items.push(item);

      var last_newline_index = item.lastIndexOf('\n');

      if (last_newline_index !== -1) {
        this.__character_count = item.length - last_newline_index;
      } else {
        this.__character_count += item.length;
      }
    };

    OutputLine.prototype.pop = function () {
      var item = null;

      if (!this.is_empty()) {
        item = this.__items.pop();
        this.__character_count -= item.length;
      }

      return item;
    };

    OutputLine.prototype._remove_indent = function () {
      if (this.__indent_count > 0) {
        this.__indent_count -= 1;
        this.__character_count -= this.__parent.indent_size;
      }
    };

    OutputLine.prototype._remove_wrap_indent = function () {
      if (this.__wrap_point_indent_count > 0) {
        this.__wrap_point_indent_count -= 1;
      }
    };

    OutputLine.prototype.trim = function () {
      while (this.last() === ' ') {
        this.__items.pop();

        this.__character_count -= 1;
      }
    };

    OutputLine.prototype.toString = function () {
      var result = '';

      if (this.is_empty()) {
        if (this.__parent.indent_empty_lines) {
          result = this.__parent.get_indent_string(this.__indent_count);
        }
      } else {
        result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
        result += this.__items.join('');
      }

      return result;
    };

    function IndentStringCache(options, baseIndentString) {
      this.__cache = [''];
      this.__indent_size = options.indent_size;
      this.__indent_string = options.indent_char;

      if (!options.indent_with_tabs) {
        this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
      } // Set to null to continue support for auto detection of base indent


      baseIndentString = baseIndentString || '';

      if (options.indent_level > 0) {
        baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
      }

      this.__base_string = baseIndentString;
      this.__base_string_length = baseIndentString.length;
    }

    IndentStringCache.prototype.get_indent_size = function (indent, column) {
      var result = this.__base_string_length;
      column = column || 0;

      if (indent < 0) {
        result = 0;
      }

      result += indent * this.__indent_size;
      result += column;
      return result;
    };

    IndentStringCache.prototype.get_indent_string = function (indent_level, column) {
      var result = this.__base_string;
      column = column || 0;

      if (indent_level < 0) {
        indent_level = 0;
        result = '';
      }

      column += indent_level * this.__indent_size;

      this.__ensure_cache(column);

      result += this.__cache[column];
      return result;
    };

    IndentStringCache.prototype.__ensure_cache = function (column) {
      while (column >= this.__cache.length) {
        this.__add_column();
      }
    };

    IndentStringCache.prototype.__add_column = function () {
      var column = this.__cache.length;
      var indent = 0;
      var result = '';

      if (this.__indent_size && column >= this.__indent_size) {
        indent = Math.floor(column / this.__indent_size);
        column -= indent * this.__indent_size;
        result = new Array(indent + 1).join(this.__indent_string);
      }

      if (column) {
        result += new Array(column + 1).join(' ');
      }

      this.__cache.push(result);
    };

    function Output(options, baseIndentString) {
      this.__indent_cache = new IndentStringCache(options, baseIndentString);
      this.raw = false;
      this._end_with_newline = options.end_with_newline;
      this.indent_size = options.indent_size;
      this.wrap_line_length = options.wrap_line_length;
      this.indent_empty_lines = options.indent_empty_lines;
      this.__lines = [];
      this.previous_line = null;
      this.current_line = null;
      this.next_line = new OutputLine(this);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false; // initialize

      this.__add_outputline();
    }

    Output.prototype.__add_outputline = function () {
      this.previous_line = this.current_line;
      this.current_line = this.next_line.clone_empty();

      this.__lines.push(this.current_line);
    };

    Output.prototype.get_line_number = function () {
      return this.__lines.length;
    };

    Output.prototype.get_indent_string = function (indent, column) {
      return this.__indent_cache.get_indent_string(indent, column);
    };

    Output.prototype.get_indent_size = function (indent, column) {
      return this.__indent_cache.get_indent_size(indent, column);
    };

    Output.prototype.is_empty = function () {
      return !this.previous_line && this.current_line.is_empty();
    };

    Output.prototype.add_new_line = function (force_newline) {
      // never newline at the start of file
      // otherwise, newline only if we didn't just add one or we're forced
      if (this.is_empty() || !force_newline && this.just_added_newline()) {
        return false;
      } // if raw output is enabled, don't print additional newlines,
      // but still return True as though you had


      if (!this.raw) {
        this.__add_outputline();
      }

      return true;
    };

    Output.prototype.get_code = function (eol) {
      this.trim(true); // handle some edge cases where the last tokens
      // has text that ends with newline(s)

      var last_item = this.current_line.pop();

      if (last_item) {
        if (last_item[last_item.length - 1] === '\n') {
          last_item = last_item.replace(/\n+$/g, '');
        }

        this.current_line.push(last_item);
      }

      if (this._end_with_newline) {
        this.__add_outputline();
      }

      var sweet_code = this.__lines.join('\n');

      if (eol !== '\n') {
        sweet_code = sweet_code.replace(/[\n]/g, eol);
      }

      return sweet_code;
    };

    Output.prototype.set_wrap_point = function () {
      this.current_line._set_wrap_point();
    };

    Output.prototype.set_indent = function (indent, alignment) {
      indent = indent || 0;
      alignment = alignment || 0; // Next line stores alignment values

      this.next_line.set_indent(indent, alignment); // Never indent your first output indent at the start of the file

      if (this.__lines.length > 1) {
        this.current_line.set_indent(indent, alignment);
        return true;
      }

      this.current_line.set_indent();
      return false;
    };

    Output.prototype.add_raw_token = function (token) {
      for (var x = 0; x < token.newlines; x++) {
        this.__add_outputline();
      }

      this.current_line.set_indent(-1);
      this.current_line.push(token.whitespace_before);
      this.current_line.push(token.text);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
    };

    Output.prototype.add_token = function (printable_token) {
      this.__add_space_before_token();

      this.current_line.push(printable_token);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = this.current_line._allow_wrap();
    };

    Output.prototype.__add_space_before_token = function () {
      if (this.space_before_token && !this.just_added_newline()) {
        if (!this.non_breaking_space) {
          this.set_wrap_point();
        }

        this.current_line.push(' ');
      }
    };

    Output.prototype.remove_indent = function (index) {
      var output_length = this.__lines.length;

      while (index < output_length) {
        this.__lines[index]._remove_indent();

        index++;
      }

      this.current_line._remove_wrap_indent();
    };

    Output.prototype.trim = function (eat_newlines) {
      eat_newlines = eat_newlines === undefined ? false : eat_newlines;
      this.current_line.trim();

      while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
        this.__lines.pop();

        this.current_line = this.__lines[this.__lines.length - 1];
        this.current_line.trim();
      }

      this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
    };

    Output.prototype.just_added_newline = function () {
      return this.current_line.is_empty();
    };

    Output.prototype.just_added_blankline = function () {
      return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
    };

    Output.prototype.ensure_empty_line_above = function (starts_with, ends_with) {
      var index = this.__lines.length - 2;

      while (index >= 0) {
        var potentialEmptyLine = this.__lines[index];

        if (potentialEmptyLine.is_empty()) {
          break;
        } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
          this.__lines.splice(index + 1, 0, new OutputLine(this));

          this.previous_line = this.__lines[this.__lines.length - 2];
          break;
        }

        index--;
      }
    };

    module.exports.Output = Output;
    /***/
  },
  /* 3 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Token(type, text, newlines, whitespace_before) {
      this.type = type;
      this.text = text; // comments_before are
      // comments that have a new line before them
      // and may or may not have a newline after
      // this is a set of comments before

      this.comments_before = null;
      /* inline comment*/
      // this.comments_after =  new TokenStream(); // no new line before and newline after

      this.newlines = newlines || 0;
      this.whitespace_before = whitespace_before || '';
      this.parent = null;
      this.next = null;
      this.previous = null;
      this.opened = null;
      this.closed = null;
      this.directives = null;
    }

    module.exports.Token = Token;
    /***/
  },
  /* 4 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /* jshint node: true, curly: false */
    // Parts of this section of code is taken from acorn.
    //
    // Acorn was written by Marijn Haverbeke and released under an MIT
    // license. The Unicode regexps (for identifiers and whitespace) were
    // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
    //
    // Git repositories for Acorn are available at
    //
    //     http://marijnhaverbeke.nl/git/acorn
    //     https://github.com/marijnh/acorn.git
    // ## Character categories
    // acorn used char codes to squeeze the last bit of performance out
    // Beautifier is okay without that, so we're using regex
    // permit # (23), $ (36), and @ (64). @ is used in ES7 decorators.
    // 65 through 91 are uppercase letters.
    // permit _ (95).
    // 97 through 123 are lowercase letters.

    var baseASCIIidentifierStartChars = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a"; // inside an identifier @ is not allowed but 0-9 are.

    var baseASCIIidentifierChars = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a"; // Big ugly regular expressions that match characters in the
    // whitespace, identifier, and identifier-start categories. These
    // are only applied when a character is found to actually have a
    // code point above 128.

    var nonASCIIidentifierStartChars = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc";
    var nonASCIIidentifierChars = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f"; //var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    //var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

    var identifierStart = "(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "])";
    var identifierChars = "(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])*";
    exports.identifier = new RegExp(identifierStart + identifierChars, 'g');
    exports.identifierStart = new RegExp(identifierStart);
    exports.identifierMatch = new RegExp("(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])+");
    var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
    // Whether a single character denotes a newline.

    exports.newline = /[\n\r\u2028\u2029]/; // Matches a whole line break (where CRLF is considered a single
    // line break). Used to count lines.
    // in javascript, these two differ
    // in python they are the same, different methods are called on them

    exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
    exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');
    /***/
  },
  /* 5 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var BaseOptions = __webpack_require__(6).Options;

    var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

    function Options(options) {
      BaseOptions.call(this, options, 'js'); // compatibility, re

      var raw_brace_style = this.raw_options.brace_style || null;

      if (raw_brace_style === "expand-strict") {
        //graceful handling of deprecated option
        this.raw_options.brace_style = "expand";
      } else if (raw_brace_style === "collapse-preserve-inline") {
        //graceful handling of deprecated option
        this.raw_options.brace_style = "collapse,preserve-inline";
      } else if (this.raw_options.braces_on_own_line !== undefined) {
        //graceful handling of deprecated option
        this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse"; // } else if (!raw_brace_style) { //Nothing exists to set it
        //   raw_brace_style = "collapse";
      } //preserve-inline in delimited string will trigger brace_preserve_inline, everything
      //else is considered a brace_style and the last one only will have an effect


      var brace_style_split = this._get_selection_list('brace_style', ['collapse', 'expand', 'end-expand', 'none', 'preserve-inline']);

      this.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option

      this.brace_style = "collapse";

      for (var bs = 0; bs < brace_style_split.length; bs++) {
        if (brace_style_split[bs] === "preserve-inline") {
          this.brace_preserve_inline = true;
        } else {
          this.brace_style = brace_style_split[bs];
        }
      }

      this.unindent_chained_methods = this._get_boolean('unindent_chained_methods');
      this.break_chained_methods = this._get_boolean('break_chained_methods');
      this.space_in_paren = this._get_boolean('space_in_paren');
      this.space_in_empty_paren = this._get_boolean('space_in_empty_paren');
      this.jslint_happy = this._get_boolean('jslint_happy');
      this.space_after_anon_function = this._get_boolean('space_after_anon_function');
      this.space_after_named_function = this._get_boolean('space_after_named_function');
      this.keep_array_indentation = this._get_boolean('keep_array_indentation');
      this.space_before_conditional = this._get_boolean('space_before_conditional', true);
      this.unescape_strings = this._get_boolean('unescape_strings');
      this.e4x = this._get_boolean('e4x');
      this.comma_first = this._get_boolean('comma_first');
      this.operator_position = this._get_selection('operator_position', validPositionValues); // For testing of beautify preserve:start directive

      this.test_output_raw = this._get_boolean('test_output_raw'); // force this._options.space_after_anon_function to true if this._options.jslint_happy

      if (this.jslint_happy) {
        this.space_after_anon_function = true;
      }
    }

    Options.prototype = new BaseOptions();
    module.exports.Options = Options;
    /***/
  },
  /* 6 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Options(options, merge_child_field) {
      this.raw_options = _mergeOpts(options, merge_child_field); // Support passing the source text back with no change

      this.disabled = this._get_boolean('disabled');
      this.eol = this._get_characters('eol', 'auto');
      this.end_with_newline = this._get_boolean('end_with_newline');
      this.indent_size = this._get_number('indent_size', 4);
      this.indent_char = this._get_characters('indent_char', ' ');
      this.indent_level = this._get_number('indent_level');
      this.preserve_newlines = this._get_boolean('preserve_newlines', true);
      this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);

      if (!this.preserve_newlines) {
        this.max_preserve_newlines = 0;
      }

      this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');

      if (this.indent_with_tabs) {
        this.indent_char = '\t'; // indent_size behavior changed after 1.8.6
        // It used to be that indent_size would be
        // set to 1 for indent_with_tabs. That is no longer needed and
        // actually doesn't make sense - why not use spaces? Further,
        // that might produce unexpected behavior - tabs being used
        // for single-column alignment. So, when indent_with_tabs is true
        // and indent_size is 1, reset indent_size to 4.

        if (this.indent_size === 1) {
          this.indent_size = 4;
        }
      } // Backwards compat with 1.3.x


      this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
      this.indent_empty_lines = this._get_boolean('indent_empty_lines'); // valid templating languages ['django', 'erb', 'handlebars', 'php']
      // For now, 'auto' = all off for javascript, all on for html (and inline javascript).
      // other values ignored

      this.templating = this._get_selection_list('templating', ['auto', 'none', 'django', 'erb', 'handlebars', 'php'], ['auto']);
    }

    Options.prototype._get_array = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || [];

      if (typeof option_value === 'object') {
        if (option_value !== null && typeof option_value.concat === 'function') {
          result = option_value.concat();
        }
      } else if (typeof option_value === 'string') {
        result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
      }

      return result;
    };

    Options.prototype._get_boolean = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = option_value === undefined ? !!default_value : !!option_value;
      return result;
    };

    Options.prototype._get_characters = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || '';

      if (typeof option_value === 'string') {
        result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
      }

      return result;
    };

    Options.prototype._get_number = function (name, default_value) {
      var option_value = this.raw_options[name];
      default_value = parseInt(default_value, 10);

      if (isNaN(default_value)) {
        default_value = 0;
      }

      var result = parseInt(option_value, 10);

      if (isNaN(result)) {
        result = default_value;
      }

      return result;
    };

    Options.prototype._get_selection = function (name, selection_list, default_value) {
      var result = this._get_selection_list(name, selection_list, default_value);

      if (result.length !== 1) {
        throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result[0];
    };

    Options.prototype._get_selection_list = function (name, selection_list, default_value) {
      if (!selection_list || selection_list.length === 0) {
        throw new Error("Selection list cannot be empty.");
      }

      default_value = default_value || [selection_list[0]];

      if (!this._is_valid_selection(default_value, selection_list)) {
        throw new Error("Invalid Default Value!");
      }

      var result = this._get_array(name, default_value);

      if (!this._is_valid_selection(result, selection_list)) {
        throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result;
    };

    Options.prototype._is_valid_selection = function (result, selection_list) {
      return result.length && selection_list.length && !result.some(function (item) {
        return selection_list.indexOf(item) === -1;
      });
    }; // merges child options up with the parent options object
    // Example: obj = {a: 1, b: {a: 2}}
    //          mergeOpts(obj, 'b')
    //
    //          Returns: {a: 2}


    function _mergeOpts(allOptions, childFieldName) {
      var finalOpts = {};
      allOptions = _normalizeOpts(allOptions);
      var name;

      for (name in allOptions) {
        if (name !== childFieldName) {
          finalOpts[name] = allOptions[name];
        }
      } //merge in the per type settings for the childFieldName


      if (childFieldName && allOptions[childFieldName]) {
        for (name in allOptions[childFieldName]) {
          finalOpts[name] = allOptions[childFieldName][name];
        }
      }

      return finalOpts;
    }

    function _normalizeOpts(options) {
      var convertedOpts = {};
      var key;

      for (key in options) {
        var newKey = key.replace(/-/g, "_");
        convertedOpts[newKey] = options[key];
      }

      return convertedOpts;
    }

    module.exports.Options = Options;
    module.exports.normalizeOpts = _normalizeOpts;
    module.exports.mergeOpts = _mergeOpts;
    /***/
  },
  /* 7 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var InputScanner = __webpack_require__(8).InputScanner;

    var BaseTokenizer = __webpack_require__(9).Tokenizer;

    var BASETOKEN = __webpack_require__(9).TOKEN;

    var Directives = __webpack_require__(13).Directives;

    var acorn = __webpack_require__(4);

    var Pattern = __webpack_require__(12).Pattern;

    var TemplatablePattern = __webpack_require__(14).TemplatablePattern;

    function in_array(what, arr) {
      return arr.indexOf(what) !== -1;
    }

    var TOKEN = {
      START_EXPR: 'TK_START_EXPR',
      END_EXPR: 'TK_END_EXPR',
      START_BLOCK: 'TK_START_BLOCK',
      END_BLOCK: 'TK_END_BLOCK',
      WORD: 'TK_WORD',
      RESERVED: 'TK_RESERVED',
      SEMICOLON: 'TK_SEMICOLON',
      STRING: 'TK_STRING',
      EQUALS: 'TK_EQUALS',
      OPERATOR: 'TK_OPERATOR',
      COMMA: 'TK_COMMA',
      BLOCK_COMMENT: 'TK_BLOCK_COMMENT',
      COMMENT: 'TK_COMMENT',
      DOT: 'TK_DOT',
      UNKNOWN: 'TK_UNKNOWN',
      START: BASETOKEN.START,
      RAW: BASETOKEN.RAW,
      EOF: BASETOKEN.EOF
    };
    var directives_core = new Directives(/\/\*/, /\*\//);
    var number_pattern = /0[xX][0123456789abcdefABCDEF]*|0[oO][01234567]*|0[bB][01]*|\d+n|(?:\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/;
    var digit = /[0-9]/; // Dot "." must be distinguished from "..." and decimal

    var dot_pattern = /[^\d\.]/;
    var positionable_operators = (">>> === !== " + "<< && >= ** != == <= >> || ?? |> " + "< / - + > : & % ? ^ | *").split(' '); // IMPORTANT: this must be sorted longest to shortest or tokenizing many not work.
    // Also, you must update possitionable operators separately from punct

    var punct = ">>>= " + "... >>= <<= === >>> !== **= " + "=> ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> " + "= ! ? > < : / ^ - + * & % ~ |";
    punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // ?. but not if followed by a number 

    punct = '\\?\\.(?!\\d) ' + punct;
    punct = punct.replace(/ /g, '|');
    var punct_pattern = new RegExp(punct); // words which should always start on new line.

    var line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
    var reserved_words = line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);
    var reserved_word_pattern = new RegExp('^(?:' + reserved_words.join('|') + ')$'); // var template_pattern = /(?:(?:<\?php|<\?=)[\s\S]*?\?>)|(?:<%[\s\S]*?%>)/g;

    var in_html_comment;

    var Tokenizer = function Tokenizer(input_string, options) {
      BaseTokenizer.call(this, input_string, options);
      this._patterns.whitespace = this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source, /\u2028\u2029/.source);
      var pattern_reader = new Pattern(this._input);
      var templatable = new TemplatablePattern(this._input).read_options(this._options);
      this.__patterns = {
        template: templatable,
        identifier: templatable.starting_with(acorn.identifier).matching(acorn.identifierMatch),
        number: pattern_reader.matching(number_pattern),
        punct: pattern_reader.matching(punct_pattern),
        // comment ends just before nearest linefeed or end of file
        comment: pattern_reader.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
        //  /* ... */ comment ends with nearest */ or end of file
        block_comment: pattern_reader.starting_with(/\/\*/).until_after(/\*\//),
        html_comment_start: pattern_reader.matching(/<!--/),
        html_comment_end: pattern_reader.matching(/-->/),
        include: pattern_reader.starting_with(/#include/).until_after(acorn.lineBreak),
        shebang: pattern_reader.starting_with(/#!/).until_after(acorn.lineBreak),
        xml: pattern_reader.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/),
        single_quote: templatable.until(/['\\\n\r\u2028\u2029]/),
        double_quote: templatable.until(/["\\\n\r\u2028\u2029]/),
        template_text: templatable.until(/[`\\$]/),
        template_expression: templatable.until(/[`}\\]/)
      };
    };

    Tokenizer.prototype = new BaseTokenizer();

    Tokenizer.prototype._is_comment = function (current_token) {
      return current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.BLOCK_COMMENT || current_token.type === TOKEN.UNKNOWN;
    };

    Tokenizer.prototype._is_opening = function (current_token) {
      return current_token.type === TOKEN.START_BLOCK || current_token.type === TOKEN.START_EXPR;
    };

    Tokenizer.prototype._is_closing = function (current_token, open_token) {
      return (current_token.type === TOKEN.END_BLOCK || current_token.type === TOKEN.END_EXPR) && open_token && (current_token.text === ']' && open_token.text === '[' || current_token.text === ')' && open_token.text === '(' || current_token.text === '}' && open_token.text === '{');
    };

    Tokenizer.prototype._reset = function () {
      in_html_comment = false;
    };

    Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
      // jshint unused:false
      var token = null;

      this._readWhitespace();

      var c = this._input.peek();

      if (c === null) {
        return this._create_token(TOKEN.EOF, '');
      }

      token = token || this._read_non_javascript(c);
      token = token || this._read_string(c);
      token = token || this._read_word(previous_token);
      token = token || this._read_singles(c);
      token = token || this._read_comment(c);
      token = token || this._read_regexp(c, previous_token);
      token = token || this._read_xml(c, previous_token);
      token = token || this._read_punctuation();
      token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
      return token;
    };

    Tokenizer.prototype._read_word = function (previous_token) {
      var resulting_string;
      resulting_string = this.__patterns.identifier.read();

      if (resulting_string !== '') {
        resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');

        if (!(previous_token.type === TOKEN.DOT || previous_token.type === TOKEN.RESERVED && (previous_token.text === 'set' || previous_token.text === 'get')) && reserved_word_pattern.test(resulting_string)) {
          if (resulting_string === 'in' || resulting_string === 'of') {
            // hack for 'in' and 'of' operators
            return this._create_token(TOKEN.OPERATOR, resulting_string);
          }

          return this._create_token(TOKEN.RESERVED, resulting_string);
        }

        return this._create_token(TOKEN.WORD, resulting_string);
      }

      resulting_string = this.__patterns.number.read();

      if (resulting_string !== '') {
        return this._create_token(TOKEN.WORD, resulting_string);
      }
    };

    Tokenizer.prototype._read_singles = function (c) {
      var token = null;

      if (c === '(' || c === '[') {
        token = this._create_token(TOKEN.START_EXPR, c);
      } else if (c === ')' || c === ']') {
        token = this._create_token(TOKEN.END_EXPR, c);
      } else if (c === '{') {
        token = this._create_token(TOKEN.START_BLOCK, c);
      } else if (c === '}') {
        token = this._create_token(TOKEN.END_BLOCK, c);
      } else if (c === ';') {
        token = this._create_token(TOKEN.SEMICOLON, c);
      } else if (c === '.' && dot_pattern.test(this._input.peek(1))) {
        token = this._create_token(TOKEN.DOT, c);
      } else if (c === ',') {
        token = this._create_token(TOKEN.COMMA, c);
      }

      if (token) {
        this._input.next();
      }

      return token;
    };

    Tokenizer.prototype._read_punctuation = function () {
      var resulting_string = this.__patterns.punct.read();

      if (resulting_string !== '') {
        if (resulting_string === '=') {
          return this._create_token(TOKEN.EQUALS, resulting_string);
        } else if (resulting_string === '?.') {
          return this._create_token(TOKEN.DOT, resulting_string);
        } else {
          return this._create_token(TOKEN.OPERATOR, resulting_string);
        }
      }
    };

    Tokenizer.prototype._read_non_javascript = function (c) {
      var resulting_string = '';

      if (c === '#') {
        if (this._is_first_token()) {
          resulting_string = this.__patterns.shebang.read();

          if (resulting_string) {
            return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
          }
        } // handles extendscript #includes


        resulting_string = this.__patterns.include.read();

        if (resulting_string) {
          return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
        }

        c = this._input.next(); // Spidermonkey-specific sharp variables for circular references. Considered obsolete.

        var sharp = '#';

        if (this._input.hasNext() && this._input.testChar(digit)) {
          do {
            c = this._input.next();
            sharp += c;
          } while (this._input.hasNext() && c !== '#' && c !== '=');

          if (c === '#') {//
          } else if (this._input.peek() === '[' && this._input.peek(1) === ']') {
            sharp += '[]';

            this._input.next();

            this._input.next();
          } else if (this._input.peek() === '{' && this._input.peek(1) === '}') {
            sharp += '{}';

            this._input.next();

            this._input.next();
          }

          return this._create_token(TOKEN.WORD, sharp);
        }

        this._input.back();
      } else if (c === '<' && this._is_first_token()) {
        resulting_string = this.__patterns.html_comment_start.read();

        if (resulting_string) {
          while (this._input.hasNext() && !this._input.testChar(acorn.newline)) {
            resulting_string += this._input.next();
          }

          in_html_comment = true;
          return this._create_token(TOKEN.COMMENT, resulting_string);
        }
      } else if (in_html_comment && c === '-') {
        resulting_string = this.__patterns.html_comment_end.read();

        if (resulting_string) {
          in_html_comment = false;
          return this._create_token(TOKEN.COMMENT, resulting_string);
        }
      }

      return null;
    };

    Tokenizer.prototype._read_comment = function (c) {
      var token = null;

      if (c === '/') {
        var comment = '';

        if (this._input.peek(1) === '*') {
          // peek for comment /* ... */
          comment = this.__patterns.block_comment.read();
          var directives = directives_core.get_directives(comment);

          if (directives && directives.ignore === 'start') {
            comment += directives_core.readIgnored(this._input);
          }

          comment = comment.replace(acorn.allLineBreaks, '\n');
          token = this._create_token(TOKEN.BLOCK_COMMENT, comment);
          token.directives = directives;
        } else if (this._input.peek(1) === '/') {
          // peek for comment // ...
          comment = this.__patterns.comment.read();
          token = this._create_token(TOKEN.COMMENT, comment);
        }
      }

      return token;
    };

    Tokenizer.prototype._read_string = function (c) {
      if (c === '`' || c === "'" || c === '"') {
        var resulting_string = this._input.next();

        this.has_char_escapes = false;

        if (c === '`') {
          resulting_string += this._read_string_recursive('`', true, '${');
        } else {
          resulting_string += this._read_string_recursive(c);
        }

        if (this.has_char_escapes && this._options.unescape_strings) {
          resulting_string = unescape_string(resulting_string);
        }

        if (this._input.peek() === c) {
          resulting_string += this._input.next();
        }

        resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
        return this._create_token(TOKEN.STRING, resulting_string);
      }

      return null;
    };

    Tokenizer.prototype._allow_regexp_or_xml = function (previous_token) {
      // regex and xml can only appear in specific locations during parsing
      return previous_token.type === TOKEN.RESERVED && in_array(previous_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield']) || previous_token.type === TOKEN.END_EXPR && previous_token.text === ')' && previous_token.opened.previous.type === TOKEN.RESERVED && in_array(previous_token.opened.previous.text, ['if', 'while', 'for']) || in_array(previous_token.type, [TOKEN.COMMENT, TOKEN.START_EXPR, TOKEN.START_BLOCK, TOKEN.START, TOKEN.END_BLOCK, TOKEN.OPERATOR, TOKEN.EQUALS, TOKEN.EOF, TOKEN.SEMICOLON, TOKEN.COMMA]);
    };

    Tokenizer.prototype._read_regexp = function (c, previous_token) {
      if (c === '/' && this._allow_regexp_or_xml(previous_token)) {
        // handle regexp
        //
        var resulting_string = this._input.next();

        var esc = false;
        var in_char_class = false;

        while (this._input.hasNext() && (esc || in_char_class || this._input.peek() !== c) && !this._input.testChar(acorn.newline)) {
          resulting_string += this._input.peek();

          if (!esc) {
            esc = this._input.peek() === '\\';

            if (this._input.peek() === '[') {
              in_char_class = true;
            } else if (this._input.peek() === ']') {
              in_char_class = false;
            }
          } else {
            esc = false;
          }

          this._input.next();
        }

        if (this._input.peek() === c) {
          resulting_string += this._input.next(); // regexps may have modifiers /regexp/MOD , so fetch those, too
          // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.

          resulting_string += this._input.read(acorn.identifier);
        }

        return this._create_token(TOKEN.STRING, resulting_string);
      }

      return null;
    };

    Tokenizer.prototype._read_xml = function (c, previous_token) {
      if (this._options.e4x && c === "<" && this._allow_regexp_or_xml(previous_token)) {
        var xmlStr = '';

        var match = this.__patterns.xml.read_match(); // handle e4x xml literals
        //


        if (match) {
          // Trim root tag to attempt to
          var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
          var isCurlyRoot = rootTag.indexOf('{') === 0;
          var depth = 0;

          while (match) {
            var isEndTag = !!match[1];
            var tagName = match[2];
            var isSingletonTag = !!match[match.length - 1] || tagName.slice(0, 8) === "![CDATA[";

            if (!isSingletonTag && (tagName === rootTag || isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}'))) {
              if (isEndTag) {
                --depth;
              } else {
                ++depth;
              }
            }

            xmlStr += match[0];

            if (depth <= 0) {
              break;
            }

            match = this.__patterns.xml.read_match();
          } // if we didn't close correctly, keep unformatted.


          if (!match) {
            xmlStr += this._input.match(/[\s\S]*/g)[0];
          }

          xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
          return this._create_token(TOKEN.STRING, xmlStr);
        }
      }

      return null;
    };

    function unescape_string(s) {
      // You think that a regex would work for this
      // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
      //         return String.fromCharCode(parseInt(val, 16));
      //     })
      // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
      var out = '',
          escaped = 0;
      var input_scan = new InputScanner(s);
      var matched = null;

      while (input_scan.hasNext()) {
        // Keep any whitespace, non-slash characters
        // also keep slash pairs.
        matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

        if (matched) {
          out += matched[0];
        }

        if (input_scan.peek() === '\\') {
          input_scan.next();

          if (input_scan.peek() === 'x') {
            matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
          } else if (input_scan.peek() === 'u') {
            matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
          } else {
            out += '\\';

            if (input_scan.hasNext()) {
              out += input_scan.next();
            }

            continue;
          } // If there's some error decoding, return the original string


          if (!matched) {
            return s;
          }

          escaped = parseInt(matched[1], 16);

          if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
            // we bail out on \x7f..\xff,
            // leaving whole string escaped,
            // as it's probably completely binary
            return s;
          } else if (escaped >= 0x00 && escaped < 0x20) {
            // leave 0x00...0x1f escaped
            out += '\\' + matched[0];
            continue;
          } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
            // single-quote, apostrophe, backslash - escape these
            out += '\\' + String.fromCharCode(escaped);
          } else {
            out += String.fromCharCode(escaped);
          }
        }
      }

      return out;
    } // handle string
    //


    Tokenizer.prototype._read_string_recursive = function (delimiter, allow_unescaped_newlines, start_sub) {
      var current_char;
      var pattern;

      if (delimiter === '\'') {
        pattern = this.__patterns.single_quote;
      } else if (delimiter === '"') {
        pattern = this.__patterns.double_quote;
      } else if (delimiter === '`') {
        pattern = this.__patterns.template_text;
      } else if (delimiter === '}') {
        pattern = this.__patterns.template_expression;
      }

      var resulting_string = pattern.read();
      var next = '';

      while (this._input.hasNext()) {
        next = this._input.next();

        if (next === delimiter || !allow_unescaped_newlines && acorn.newline.test(next)) {
          this._input.back();

          break;
        } else if (next === '\\' && this._input.hasNext()) {
          current_char = this._input.peek();

          if (current_char === 'x' || current_char === 'u') {
            this.has_char_escapes = true;
          } else if (current_char === '\r' && this._input.peek(1) === '\n') {
            this._input.next();
          }

          next += this._input.next();
        } else if (start_sub) {
          if (start_sub === '${' && next === '$' && this._input.peek() === '{') {
            next += this._input.next();
          }

          if (start_sub === next) {
            if (delimiter === '`') {
              next += this._read_string_recursive('}', allow_unescaped_newlines, '`');
            } else {
              next += this._read_string_recursive('`', allow_unescaped_newlines, '${');
            }

            if (this._input.hasNext()) {
              next += this._input.next();
            }
          }
        }

        next += pattern.read();
        resulting_string += next;
      }

      return resulting_string;
    };

    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    module.exports.positionable_operators = positionable_operators.slice();
    module.exports.line_starters = line_starters.slice();
    /***/
  },
  /* 8 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');

    function InputScanner(input_string) {
      this.__input = input_string || '';
      this.__input_length = this.__input.length;
      this.__position = 0;
    }

    InputScanner.prototype.restart = function () {
      this.__position = 0;
    };

    InputScanner.prototype.back = function () {
      if (this.__position > 0) {
        this.__position -= 1;
      }
    };

    InputScanner.prototype.hasNext = function () {
      return this.__position < this.__input_length;
    };

    InputScanner.prototype.next = function () {
      var val = null;

      if (this.hasNext()) {
        val = this.__input.charAt(this.__position);
        this.__position += 1;
      }

      return val;
    };

    InputScanner.prototype.peek = function (index) {
      var val = null;
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        val = this.__input.charAt(index);
      }

      return val;
    }; // This is a JavaScript only helper function (not in python)
    // Javascript doesn't have a match method
    // and not all implementation support "sticky" flag.
    // If they do not support sticky then both this.match() and this.test() method
    // must get the match and check the index of the match.
    // If sticky is supported and set, this method will use it.
    // Otherwise it will check that global is set, and fall back to the slower method.


    InputScanner.prototype.__match = function (pattern, index) {
      pattern.lastIndex = index;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
        if (pattern_match.index !== index) {
          pattern_match = null;
        }
      }

      return pattern_match;
    };

    InputScanner.prototype.test = function (pattern, index) {
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        return !!this.__match(pattern, index);
      } else {
        return false;
      }
    };

    InputScanner.prototype.testChar = function (pattern, index) {
      // test one character regex match
      var val = this.peek(index);
      pattern.lastIndex = 0;
      return val !== null && pattern.test(val);
    };

    InputScanner.prototype.match = function (pattern) {
      var pattern_match = this.__match(pattern, this.__position);

      if (pattern_match) {
        this.__position += pattern_match[0].length;
      } else {
        pattern_match = null;
      }

      return pattern_match;
    };

    InputScanner.prototype.read = function (starting_pattern, until_pattern, until_after) {
      var val = '';
      var match;

      if (starting_pattern) {
        match = this.match(starting_pattern);

        if (match) {
          val += match[0];
        }
      }

      if (until_pattern && (match || !starting_pattern)) {
        val += this.readUntil(until_pattern, until_after);
      }

      return val;
    };

    InputScanner.prototype.readUntil = function (pattern, until_after) {
      var val = '';
      var match_index = this.__position;
      pattern.lastIndex = this.__position;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match) {
        match_index = pattern_match.index;

        if (until_after) {
          match_index += pattern_match[0].length;
        }
      } else {
        match_index = this.__input_length;
      }

      val = this.__input.substring(this.__position, match_index);
      this.__position = match_index;
      return val;
    };

    InputScanner.prototype.readUntilAfter = function (pattern) {
      return this.readUntil(pattern, true);
    };

    InputScanner.prototype.get_regexp = function (pattern, match_from) {
      var result = null;
      var flags = 'g';

      if (match_from && regexp_has_sticky) {
        flags = 'y';
      } // strings are converted to regexp


      if (typeof pattern === "string" && pattern !== '') {
        // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
        result = new RegExp(pattern, flags);
      } else if (pattern) {
        result = new RegExp(pattern.source, flags);
      }

      return result;
    };

    InputScanner.prototype.get_literal_regexp = function (literal_string) {
      return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    };
    /* css beautifier legacy helpers */


    InputScanner.prototype.peekUntilAfter = function (pattern) {
      var start = this.__position;
      var val = this.readUntilAfter(pattern);
      this.__position = start;
      return val;
    };

    InputScanner.prototype.lookBack = function (testVal) {
      var start = this.__position - 1;
      return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
    };

    module.exports.InputScanner = InputScanner;
    /***/
  },
  /* 9 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var InputScanner = __webpack_require__(8).InputScanner;

    var Token = __webpack_require__(3).Token;

    var TokenStream = __webpack_require__(10).TokenStream;

    var WhitespacePattern = __webpack_require__(11).WhitespacePattern;

    var TOKEN = {
      START: 'TK_START',
      RAW: 'TK_RAW',
      EOF: 'TK_EOF'
    };

    var Tokenizer = function Tokenizer(input_string, options) {
      this._input = new InputScanner(input_string);
      this._options = options || {};
      this.__tokens = null;
      this._patterns = {};
      this._patterns.whitespace = new WhitespacePattern(this._input);
    };

    Tokenizer.prototype.tokenize = function () {
      this._input.restart();

      this.__tokens = new TokenStream();

      this._reset();

      var current;
      var previous = new Token(TOKEN.START, '');
      var open_token = null;
      var open_stack = [];
      var comments = new TokenStream();

      while (previous.type !== TOKEN.EOF) {
        current = this._get_next_token(previous, open_token);

        while (this._is_comment(current)) {
          comments.add(current);
          current = this._get_next_token(previous, open_token);
        }

        if (!comments.isEmpty()) {
          current.comments_before = comments;
          comments = new TokenStream();
        }

        current.parent = open_token;

        if (this._is_opening(current)) {
          open_stack.push(open_token);
          open_token = current;
        } else if (open_token && this._is_closing(current, open_token)) {
          current.opened = open_token;
          open_token.closed = current;
          open_token = open_stack.pop();
          current.parent = open_token;
        }

        current.previous = previous;
        previous.next = current;

        this.__tokens.add(current);

        previous = current;
      }

      return this.__tokens;
    };

    Tokenizer.prototype._is_first_token = function () {
      return this.__tokens.isEmpty();
    };

    Tokenizer.prototype._reset = function () {};

    Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
      // jshint unused:false
      this._readWhitespace();

      var resulting_string = this._input.read(/.+/g);

      if (resulting_string) {
        return this._create_token(TOKEN.RAW, resulting_string);
      } else {
        return this._create_token(TOKEN.EOF, '');
      }
    };

    Tokenizer.prototype._is_comment = function (current_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._is_opening = function (current_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._is_closing = function (current_token, open_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._create_token = function (type, text) {
      var token = new Token(type, text, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token);
      return token;
    };

    Tokenizer.prototype._readWhitespace = function () {
      return this._patterns.whitespace.read();
    };

    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    /***/
  },
  /* 10 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function TokenStream(parent_token) {
      // private
      this.__tokens = [];
      this.__tokens_length = this.__tokens.length;
      this.__position = 0;
      this.__parent_token = parent_token;
    }

    TokenStream.prototype.restart = function () {
      this.__position = 0;
    };

    TokenStream.prototype.isEmpty = function () {
      return this.__tokens_length === 0;
    };

    TokenStream.prototype.hasNext = function () {
      return this.__position < this.__tokens_length;
    };

    TokenStream.prototype.next = function () {
      var val = null;

      if (this.hasNext()) {
        val = this.__tokens[this.__position];
        this.__position += 1;
      }

      return val;
    };

    TokenStream.prototype.peek = function (index) {
      var val = null;
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__tokens_length) {
        val = this.__tokens[index];
      }

      return val;
    };

    TokenStream.prototype.add = function (token) {
      if (this.__parent_token) {
        token.parent = this.__parent_token;
      }

      this.__tokens.push(token);

      this.__tokens_length += 1;
    };

    module.exports.TokenStream = TokenStream;
    /***/
  },
  /* 11 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Pattern = __webpack_require__(12).Pattern;

    function WhitespacePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);

      if (parent) {
        this._line_regexp = this._input.get_regexp(parent._line_regexp);
      } else {
        this.__set_whitespace_patterns('', '');
      }

      this.newline_count = 0;
      this.whitespace_before_token = '';
    }

    WhitespacePattern.prototype = new Pattern();

    WhitespacePattern.prototype.__set_whitespace_patterns = function (whitespace_chars, newline_chars) {
      whitespace_chars += '\\t ';
      newline_chars += '\\n\\r';
      this._match_pattern = this._input.get_regexp('[' + whitespace_chars + newline_chars + ']+', true);
      this._newline_regexp = this._input.get_regexp('\\r\\n|[' + newline_chars + ']');
    };

    WhitespacePattern.prototype.read = function () {
      this.newline_count = 0;
      this.whitespace_before_token = '';

      var resulting_string = this._input.read(this._match_pattern);

      if (resulting_string === ' ') {
        this.whitespace_before_token = ' ';
      } else if (resulting_string) {
        var matches = this.__split(this._newline_regexp, resulting_string);

        this.newline_count = matches.length - 1;
        this.whitespace_before_token = matches[this.newline_count];
      }

      return resulting_string;
    };

    WhitespacePattern.prototype.matching = function (whitespace_chars, newline_chars) {
      var result = this._create();

      result.__set_whitespace_patterns(whitespace_chars, newline_chars);

      result._update();

      return result;
    };

    WhitespacePattern.prototype._create = function () {
      return new WhitespacePattern(this._input, this);
    };

    WhitespacePattern.prototype.__split = function (regexp, input_string) {
      regexp.lastIndex = 0;
      var start_index = 0;
      var result = [];
      var next_match = regexp.exec(input_string);

      while (next_match) {
        result.push(input_string.substring(start_index, next_match.index));
        start_index = next_match.index + next_match[0].length;
        next_match = regexp.exec(input_string);
      }

      if (start_index < input_string.length) {
        result.push(input_string.substring(start_index, input_string.length));
      } else {
        result.push('');
      }

      return result;
    };

    module.exports.WhitespacePattern = WhitespacePattern;
    /***/
  },
  /* 12 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Pattern(input_scanner, parent) {
      this._input = input_scanner;
      this._starting_pattern = null;
      this._match_pattern = null;
      this._until_pattern = null;
      this._until_after = false;

      if (parent) {
        this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
        this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
        this._until_pattern = this._input.get_regexp(parent._until_pattern);
        this._until_after = parent._until_after;
      }
    }

    Pattern.prototype.read = function () {
      var result = this._input.read(this._starting_pattern);

      if (!this._starting_pattern || result) {
        result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
      }

      return result;
    };

    Pattern.prototype.read_match = function () {
      return this._input.match(this._match_pattern);
    };

    Pattern.prototype.until_after = function (pattern) {
      var result = this._create();

      result._until_after = true;
      result._until_pattern = this._input.get_regexp(pattern);

      result._update();

      return result;
    };

    Pattern.prototype.until = function (pattern) {
      var result = this._create();

      result._until_after = false;
      result._until_pattern = this._input.get_regexp(pattern);

      result._update();

      return result;
    };

    Pattern.prototype.starting_with = function (pattern) {
      var result = this._create();

      result._starting_pattern = this._input.get_regexp(pattern, true);

      result._update();

      return result;
    };

    Pattern.prototype.matching = function (pattern) {
      var result = this._create();

      result._match_pattern = this._input.get_regexp(pattern, true);

      result._update();

      return result;
    };

    Pattern.prototype._create = function () {
      return new Pattern(this._input, this);
    };

    Pattern.prototype._update = function () {};

    module.exports.Pattern = Pattern;
    /***/
  },
  /* 13 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Directives(start_block_pattern, end_block_pattern) {
      start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
      end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
      this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
      this.__directive_pattern = / (\w+)[:](\w+)/g;
      this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
    }

    Directives.prototype.get_directives = function (text) {
      if (!text.match(this.__directives_block_pattern)) {
        return null;
      }

      var directives = {};
      this.__directive_pattern.lastIndex = 0;

      var directive_match = this.__directive_pattern.exec(text);

      while (directive_match) {
        directives[directive_match[1]] = directive_match[2];
        directive_match = this.__directive_pattern.exec(text);
      }

      return directives;
    };

    Directives.prototype.readIgnored = function (input) {
      return input.readUntilAfter(this.__directives_end_ignore_pattern);
    };

    module.exports.Directives = Directives;
    /***/
  },
  /* 14 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Pattern = __webpack_require__(12).Pattern;

    var template_names = {
      django: false,
      erb: false,
      handlebars: false,
      php: false
    }; // This lets templates appear anywhere we would do a readUntil
    // The cost is higher but it is pay to play.

    function TemplatablePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);
      this.__template_pattern = null;
      this._disabled = Object.assign({}, template_names);
      this._excluded = Object.assign({}, template_names);

      if (parent) {
        this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
        this._excluded = Object.assign(this._excluded, parent._excluded);
        this._disabled = Object.assign(this._disabled, parent._disabled);
      }

      var pattern = new Pattern(input_scanner);
      this.__patterns = {
        handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
        handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
        handlebars: pattern.starting_with(/{{/).until_after(/}}/),
        php: pattern.starting_with(/<\?(?:[=]|php)/).until_after(/\?>/),
        erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
        // django coflicts with handlebars a bit.
        django: pattern.starting_with(/{%/).until_after(/%}/),
        django_value: pattern.starting_with(/{{/).until_after(/}}/),
        django_comment: pattern.starting_with(/{#/).until_after(/#}/)
      };
    }

    TemplatablePattern.prototype = new Pattern();

    TemplatablePattern.prototype._create = function () {
      return new TemplatablePattern(this._input, this);
    };

    TemplatablePattern.prototype._update = function () {
      this.__set_templated_pattern();
    };

    TemplatablePattern.prototype.disable = function (language) {
      var result = this._create();

      result._disabled[language] = true;

      result._update();

      return result;
    };

    TemplatablePattern.prototype.read_options = function (options) {
      var result = this._create();

      for (var language in template_names) {
        result._disabled[language] = options.templating.indexOf(language) === -1;
      }

      result._update();

      return result;
    };

    TemplatablePattern.prototype.exclude = function (language) {
      var result = this._create();

      result._excluded[language] = true;

      result._update();

      return result;
    };

    TemplatablePattern.prototype.read = function () {
      var result = '';

      if (this._match_pattern) {
        result = this._input.read(this._starting_pattern);
      } else {
        result = this._input.read(this._starting_pattern, this.__template_pattern);
      }

      var next = this._read_template();

      while (next) {
        if (this._match_pattern) {
          next += this._input.read(this._match_pattern);
        } else {
          next += this._input.readUntil(this.__template_pattern);
        }

        result += next;
        next = this._read_template();
      }

      if (this._until_after) {
        result += this._input.readUntilAfter(this._until_pattern);
      }

      return result;
    };

    TemplatablePattern.prototype.__set_templated_pattern = function () {
      var items = [];

      if (!this._disabled.php) {
        items.push(this.__patterns.php._starting_pattern.source);
      }

      if (!this._disabled.handlebars) {
        items.push(this.__patterns.handlebars._starting_pattern.source);
      }

      if (!this._disabled.erb) {
        items.push(this.__patterns.erb._starting_pattern.source);
      }

      if (!this._disabled.django) {
        items.push(this.__patterns.django._starting_pattern.source);
        items.push(this.__patterns.django_value._starting_pattern.source);
        items.push(this.__patterns.django_comment._starting_pattern.source);
      }

      if (this._until_pattern) {
        items.push(this._until_pattern.source);
      }

      this.__template_pattern = this._input.get_regexp('(?:' + items.join('|') + ')');
    };

    TemplatablePattern.prototype._read_template = function () {
      var resulting_string = '';

      var c = this._input.peek();

      if (c === '<') {
        var peek1 = this._input.peek(1); //if we're in a comment, do something special
        // We treat all comments as literals, even more than preformatted tags
        // we just look for the appropriate close tag


        if (!this._disabled.php && !this._excluded.php && peek1 === '?') {
          resulting_string = resulting_string || this.__patterns.php.read();
        }

        if (!this._disabled.erb && !this._excluded.erb && peek1 === '%') {
          resulting_string = resulting_string || this.__patterns.erb.read();
        }
      } else if (c === '{') {
        if (!this._disabled.handlebars && !this._excluded.handlebars) {
          resulting_string = resulting_string || this.__patterns.handlebars_comment.read();
          resulting_string = resulting_string || this.__patterns.handlebars_unescaped.read();
          resulting_string = resulting_string || this.__patterns.handlebars.read();
        }

        if (!this._disabled.django) {
          // django coflicts with handlebars a bit.
          if (!this._excluded.django && !this._excluded.handlebars) {
            resulting_string = resulting_string || this.__patterns.django_value.read();
          }

          if (!this._excluded.django) {
            resulting_string = resulting_string || this.__patterns.django_comment.read();
            resulting_string = resulting_string || this.__patterns.django.read();
          }
        }
      }

      return resulting_string;
    };

    module.exports.TemplatablePattern = TemplatablePattern;
    /***/
  }
  /******/
  ]);

  var js_beautify = legacy_beautify_js;
  /* Footer */

  if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return {
        js_beautify: js_beautify
      };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* AUTO-GENERATED. DO NOT MODIFY. */

/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@beautifier.io>
        https://beautifier.io/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                         — indentation size,
        indent_char (space)                     — character to indent with,
        selector_separator_newline (true)       - separate selectors with newline or
                                                  not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)                - end with a newline
        newline_between_rules (true)            - add a new line after every css rule
        space_around_selector_separator (false) - ensure space around selector separators:
                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true,
      'space_around_selector_separator': true
    });
*/
// http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/
(function () {
  /* GENERATED_BUILD_OUTPUT */
  var legacy_beautify_css =
  /******/
  function (modules) {
    // webpackBootstrap

    /******/
    // The module cache

    /******/
    var installedModules = {};
    /******/

    /******/
    // The require function

    /******/

    function __webpack_require__(moduleId) {
      /******/

      /******/
      // Check if module is in cache

      /******/
      if (installedModules[moduleId]) {
        /******/
        return installedModules[moduleId].exports;
        /******/
      }
      /******/
      // Create a new module (and put it into the cache)

      /******/


      var module = installedModules[moduleId] = {
        /******/
        i: moduleId,

        /******/
        l: false,

        /******/
        exports: {}
        /******/

      };
      /******/

      /******/
      // Execute the module function

      /******/

      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/

      /******/
      // Flag the module as loaded

      /******/

      module.l = true;
      /******/

      /******/
      // Return the exports of the module

      /******/

      return module.exports;
      /******/
    }
    /******/

    /******/

    /******/
    // expose the modules object (__webpack_modules__)

    /******/


    __webpack_require__.m = modules;
    /******/

    /******/
    // expose the module cache

    /******/

    __webpack_require__.c = installedModules;
    /******/

    /******/
    // define getter function for harmony exports

    /******/

    __webpack_require__.d = function (exports, name, getter) {
      /******/
      if (!__webpack_require__.o(exports, name)) {
        /******/
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/

    };
    /******/

    /******/
    // define __esModule on exports

    /******/


    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

    /******/
    // create a fake namespace object

    /******/
    // mode & 1: value is a module id, require it

    /******/
    // mode & 2: merge all properties of value into the ns

    /******/
    // mode & 4: return value when already ns object

    /******/
    // mode & 8|1: behave like require

    /******/


    __webpack_require__.t = function (value, mode) {
      /******/
      if (mode & 1) value = __webpack_require__(value);
      /******/

      if (mode & 8) return value;
      /******/

      if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/

      var ns = Object.create(null);
      /******/

      __webpack_require__.r(ns);
      /******/


      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });
      /******/

      if (mode & 2 && typeof value != 'string') for (var key in value) {
        __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
      }
      /******/

      return ns;
      /******/
    };
    /******/

    /******/
    // getDefaultExport function for compatibility with non-harmony modules

    /******/


    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
      /******/
      function getDefault() {
        return module['default'];
      } :
      /******/
      function getModuleExports() {
        return module;
      };
      /******/

      __webpack_require__.d(getter, 'a', getter);
      /******/


      return getter;
      /******/
    };
    /******/

    /******/
    // Object.prototype.hasOwnProperty.call

    /******/


    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/

    /******/
    // __webpack_public_path__

    /******/


    __webpack_require__.p = "";
    /******/

    /******/

    /******/
    // Load entry module and return exports

    /******/

    return __webpack_require__(__webpack_require__.s = 15);
    /******/
  }(
  /************************************************************************/

  /******/
  [,,
  /* 0 */

  /* 1 */

  /* 2 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function OutputLine(parent) {
      this.__parent = parent;
      this.__character_count = 0; // use indent_count as a marker for this.__lines that have preserved indentation

      this.__indent_count = -1;
      this.__alignment_count = 0;
      this.__wrap_point_index = 0;
      this.__wrap_point_character_count = 0;
      this.__wrap_point_indent_count = -1;
      this.__wrap_point_alignment_count = 0;
      this.__items = [];
    }

    OutputLine.prototype.clone_empty = function () {
      var line = new OutputLine(this.__parent);
      line.set_indent(this.__indent_count, this.__alignment_count);
      return line;
    };

    OutputLine.prototype.item = function (index) {
      if (index < 0) {
        return this.__items[this.__items.length + index];
      } else {
        return this.__items[index];
      }
    };

    OutputLine.prototype.has_match = function (pattern) {
      for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
        if (this.__items[lastCheckedOutput].match(pattern)) {
          return true;
        }
      }

      return false;
    };

    OutputLine.prototype.set_indent = function (indent, alignment) {
      if (this.is_empty()) {
        this.__indent_count = indent || 0;
        this.__alignment_count = alignment || 0;
        this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
      }
    };

    OutputLine.prototype._set_wrap_point = function () {
      if (this.__parent.wrap_line_length) {
        this.__wrap_point_index = this.__items.length;
        this.__wrap_point_character_count = this.__character_count;
        this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
        this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
      }
    };

    OutputLine.prototype._should_wrap = function () {
      return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
    };

    OutputLine.prototype._allow_wrap = function () {
      if (this._should_wrap()) {
        this.__parent.add_new_line();

        var next = this.__parent.current_line;
        next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
        next.__items = this.__items.slice(this.__wrap_point_index);
        this.__items = this.__items.slice(0, this.__wrap_point_index);
        next.__character_count += this.__character_count - this.__wrap_point_character_count;
        this.__character_count = this.__wrap_point_character_count;

        if (next.__items[0] === " ") {
          next.__items.splice(0, 1);

          next.__character_count -= 1;
        }

        return true;
      }

      return false;
    };

    OutputLine.prototype.is_empty = function () {
      return this.__items.length === 0;
    };

    OutputLine.prototype.last = function () {
      if (!this.is_empty()) {
        return this.__items[this.__items.length - 1];
      } else {
        return null;
      }
    };

    OutputLine.prototype.push = function (item) {
      this.__items.push(item);

      var last_newline_index = item.lastIndexOf('\n');

      if (last_newline_index !== -1) {
        this.__character_count = item.length - last_newline_index;
      } else {
        this.__character_count += item.length;
      }
    };

    OutputLine.prototype.pop = function () {
      var item = null;

      if (!this.is_empty()) {
        item = this.__items.pop();
        this.__character_count -= item.length;
      }

      return item;
    };

    OutputLine.prototype._remove_indent = function () {
      if (this.__indent_count > 0) {
        this.__indent_count -= 1;
        this.__character_count -= this.__parent.indent_size;
      }
    };

    OutputLine.prototype._remove_wrap_indent = function () {
      if (this.__wrap_point_indent_count > 0) {
        this.__wrap_point_indent_count -= 1;
      }
    };

    OutputLine.prototype.trim = function () {
      while (this.last() === ' ') {
        this.__items.pop();

        this.__character_count -= 1;
      }
    };

    OutputLine.prototype.toString = function () {
      var result = '';

      if (this.is_empty()) {
        if (this.__parent.indent_empty_lines) {
          result = this.__parent.get_indent_string(this.__indent_count);
        }
      } else {
        result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
        result += this.__items.join('');
      }

      return result;
    };

    function IndentStringCache(options, baseIndentString) {
      this.__cache = [''];
      this.__indent_size = options.indent_size;
      this.__indent_string = options.indent_char;

      if (!options.indent_with_tabs) {
        this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
      } // Set to null to continue support for auto detection of base indent


      baseIndentString = baseIndentString || '';

      if (options.indent_level > 0) {
        baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
      }

      this.__base_string = baseIndentString;
      this.__base_string_length = baseIndentString.length;
    }

    IndentStringCache.prototype.get_indent_size = function (indent, column) {
      var result = this.__base_string_length;
      column = column || 0;

      if (indent < 0) {
        result = 0;
      }

      result += indent * this.__indent_size;
      result += column;
      return result;
    };

    IndentStringCache.prototype.get_indent_string = function (indent_level, column) {
      var result = this.__base_string;
      column = column || 0;

      if (indent_level < 0) {
        indent_level = 0;
        result = '';
      }

      column += indent_level * this.__indent_size;

      this.__ensure_cache(column);

      result += this.__cache[column];
      return result;
    };

    IndentStringCache.prototype.__ensure_cache = function (column) {
      while (column >= this.__cache.length) {
        this.__add_column();
      }
    };

    IndentStringCache.prototype.__add_column = function () {
      var column = this.__cache.length;
      var indent = 0;
      var result = '';

      if (this.__indent_size && column >= this.__indent_size) {
        indent = Math.floor(column / this.__indent_size);
        column -= indent * this.__indent_size;
        result = new Array(indent + 1).join(this.__indent_string);
      }

      if (column) {
        result += new Array(column + 1).join(' ');
      }

      this.__cache.push(result);
    };

    function Output(options, baseIndentString) {
      this.__indent_cache = new IndentStringCache(options, baseIndentString);
      this.raw = false;
      this._end_with_newline = options.end_with_newline;
      this.indent_size = options.indent_size;
      this.wrap_line_length = options.wrap_line_length;
      this.indent_empty_lines = options.indent_empty_lines;
      this.__lines = [];
      this.previous_line = null;
      this.current_line = null;
      this.next_line = new OutputLine(this);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false; // initialize

      this.__add_outputline();
    }

    Output.prototype.__add_outputline = function () {
      this.previous_line = this.current_line;
      this.current_line = this.next_line.clone_empty();

      this.__lines.push(this.current_line);
    };

    Output.prototype.get_line_number = function () {
      return this.__lines.length;
    };

    Output.prototype.get_indent_string = function (indent, column) {
      return this.__indent_cache.get_indent_string(indent, column);
    };

    Output.prototype.get_indent_size = function (indent, column) {
      return this.__indent_cache.get_indent_size(indent, column);
    };

    Output.prototype.is_empty = function () {
      return !this.previous_line && this.current_line.is_empty();
    };

    Output.prototype.add_new_line = function (force_newline) {
      // never newline at the start of file
      // otherwise, newline only if we didn't just add one or we're forced
      if (this.is_empty() || !force_newline && this.just_added_newline()) {
        return false;
      } // if raw output is enabled, don't print additional newlines,
      // but still return True as though you had


      if (!this.raw) {
        this.__add_outputline();
      }

      return true;
    };

    Output.prototype.get_code = function (eol) {
      this.trim(true); // handle some edge cases where the last tokens
      // has text that ends with newline(s)

      var last_item = this.current_line.pop();

      if (last_item) {
        if (last_item[last_item.length - 1] === '\n') {
          last_item = last_item.replace(/\n+$/g, '');
        }

        this.current_line.push(last_item);
      }

      if (this._end_with_newline) {
        this.__add_outputline();
      }

      var sweet_code = this.__lines.join('\n');

      if (eol !== '\n') {
        sweet_code = sweet_code.replace(/[\n]/g, eol);
      }

      return sweet_code;
    };

    Output.prototype.set_wrap_point = function () {
      this.current_line._set_wrap_point();
    };

    Output.prototype.set_indent = function (indent, alignment) {
      indent = indent || 0;
      alignment = alignment || 0; // Next line stores alignment values

      this.next_line.set_indent(indent, alignment); // Never indent your first output indent at the start of the file

      if (this.__lines.length > 1) {
        this.current_line.set_indent(indent, alignment);
        return true;
      }

      this.current_line.set_indent();
      return false;
    };

    Output.prototype.add_raw_token = function (token) {
      for (var x = 0; x < token.newlines; x++) {
        this.__add_outputline();
      }

      this.current_line.set_indent(-1);
      this.current_line.push(token.whitespace_before);
      this.current_line.push(token.text);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
    };

    Output.prototype.add_token = function (printable_token) {
      this.__add_space_before_token();

      this.current_line.push(printable_token);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = this.current_line._allow_wrap();
    };

    Output.prototype.__add_space_before_token = function () {
      if (this.space_before_token && !this.just_added_newline()) {
        if (!this.non_breaking_space) {
          this.set_wrap_point();
        }

        this.current_line.push(' ');
      }
    };

    Output.prototype.remove_indent = function (index) {
      var output_length = this.__lines.length;

      while (index < output_length) {
        this.__lines[index]._remove_indent();

        index++;
      }

      this.current_line._remove_wrap_indent();
    };

    Output.prototype.trim = function (eat_newlines) {
      eat_newlines = eat_newlines === undefined ? false : eat_newlines;
      this.current_line.trim();

      while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
        this.__lines.pop();

        this.current_line = this.__lines[this.__lines.length - 1];
        this.current_line.trim();
      }

      this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
    };

    Output.prototype.just_added_newline = function () {
      return this.current_line.is_empty();
    };

    Output.prototype.just_added_blankline = function () {
      return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
    };

    Output.prototype.ensure_empty_line_above = function (starts_with, ends_with) {
      var index = this.__lines.length - 2;

      while (index >= 0) {
        var potentialEmptyLine = this.__lines[index];

        if (potentialEmptyLine.is_empty()) {
          break;
        } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
          this.__lines.splice(index + 1, 0, new OutputLine(this));

          this.previous_line = this.__lines[this.__lines.length - 2];
          break;
        }

        index--;
      }
    };

    module.exports.Output = Output;
    /***/
  },,,,
  /* 3 */

  /* 4 */

  /* 5 */

  /* 6 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Options(options, merge_child_field) {
      this.raw_options = _mergeOpts(options, merge_child_field); // Support passing the source text back with no change

      this.disabled = this._get_boolean('disabled');
      this.eol = this._get_characters('eol', 'auto');
      this.end_with_newline = this._get_boolean('end_with_newline');
      this.indent_size = this._get_number('indent_size', 4);
      this.indent_char = this._get_characters('indent_char', ' ');
      this.indent_level = this._get_number('indent_level');
      this.preserve_newlines = this._get_boolean('preserve_newlines', true);
      this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);

      if (!this.preserve_newlines) {
        this.max_preserve_newlines = 0;
      }

      this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');

      if (this.indent_with_tabs) {
        this.indent_char = '\t'; // indent_size behavior changed after 1.8.6
        // It used to be that indent_size would be
        // set to 1 for indent_with_tabs. That is no longer needed and
        // actually doesn't make sense - why not use spaces? Further,
        // that might produce unexpected behavior - tabs being used
        // for single-column alignment. So, when indent_with_tabs is true
        // and indent_size is 1, reset indent_size to 4.

        if (this.indent_size === 1) {
          this.indent_size = 4;
        }
      } // Backwards compat with 1.3.x


      this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
      this.indent_empty_lines = this._get_boolean('indent_empty_lines'); // valid templating languages ['django', 'erb', 'handlebars', 'php']
      // For now, 'auto' = all off for javascript, all on for html (and inline javascript).
      // other values ignored

      this.templating = this._get_selection_list('templating', ['auto', 'none', 'django', 'erb', 'handlebars', 'php'], ['auto']);
    }

    Options.prototype._get_array = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || [];

      if (typeof option_value === 'object') {
        if (option_value !== null && typeof option_value.concat === 'function') {
          result = option_value.concat();
        }
      } else if (typeof option_value === 'string') {
        result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
      }

      return result;
    };

    Options.prototype._get_boolean = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = option_value === undefined ? !!default_value : !!option_value;
      return result;
    };

    Options.prototype._get_characters = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || '';

      if (typeof option_value === 'string') {
        result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
      }

      return result;
    };

    Options.prototype._get_number = function (name, default_value) {
      var option_value = this.raw_options[name];
      default_value = parseInt(default_value, 10);

      if (isNaN(default_value)) {
        default_value = 0;
      }

      var result = parseInt(option_value, 10);

      if (isNaN(result)) {
        result = default_value;
      }

      return result;
    };

    Options.prototype._get_selection = function (name, selection_list, default_value) {
      var result = this._get_selection_list(name, selection_list, default_value);

      if (result.length !== 1) {
        throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result[0];
    };

    Options.prototype._get_selection_list = function (name, selection_list, default_value) {
      if (!selection_list || selection_list.length === 0) {
        throw new Error("Selection list cannot be empty.");
      }

      default_value = default_value || [selection_list[0]];

      if (!this._is_valid_selection(default_value, selection_list)) {
        throw new Error("Invalid Default Value!");
      }

      var result = this._get_array(name, default_value);

      if (!this._is_valid_selection(result, selection_list)) {
        throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result;
    };

    Options.prototype._is_valid_selection = function (result, selection_list) {
      return result.length && selection_list.length && !result.some(function (item) {
        return selection_list.indexOf(item) === -1;
      });
    }; // merges child options up with the parent options object
    // Example: obj = {a: 1, b: {a: 2}}
    //          mergeOpts(obj, 'b')
    //
    //          Returns: {a: 2}


    function _mergeOpts(allOptions, childFieldName) {
      var finalOpts = {};
      allOptions = _normalizeOpts(allOptions);
      var name;

      for (name in allOptions) {
        if (name !== childFieldName) {
          finalOpts[name] = allOptions[name];
        }
      } //merge in the per type settings for the childFieldName


      if (childFieldName && allOptions[childFieldName]) {
        for (name in allOptions[childFieldName]) {
          finalOpts[name] = allOptions[childFieldName][name];
        }
      }

      return finalOpts;
    }

    function _normalizeOpts(options) {
      var convertedOpts = {};
      var key;

      for (key in options) {
        var newKey = key.replace(/-/g, "_");
        convertedOpts[newKey] = options[key];
      }

      return convertedOpts;
    }

    module.exports.Options = Options;
    module.exports.normalizeOpts = _normalizeOpts;
    module.exports.mergeOpts = _mergeOpts;
    /***/
  },,
  /* 7 */

  /* 8 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');

    function InputScanner(input_string) {
      this.__input = input_string || '';
      this.__input_length = this.__input.length;
      this.__position = 0;
    }

    InputScanner.prototype.restart = function () {
      this.__position = 0;
    };

    InputScanner.prototype.back = function () {
      if (this.__position > 0) {
        this.__position -= 1;
      }
    };

    InputScanner.prototype.hasNext = function () {
      return this.__position < this.__input_length;
    };

    InputScanner.prototype.next = function () {
      var val = null;

      if (this.hasNext()) {
        val = this.__input.charAt(this.__position);
        this.__position += 1;
      }

      return val;
    };

    InputScanner.prototype.peek = function (index) {
      var val = null;
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        val = this.__input.charAt(index);
      }

      return val;
    }; // This is a JavaScript only helper function (not in python)
    // Javascript doesn't have a match method
    // and not all implementation support "sticky" flag.
    // If they do not support sticky then both this.match() and this.test() method
    // must get the match and check the index of the match.
    // If sticky is supported and set, this method will use it.
    // Otherwise it will check that global is set, and fall back to the slower method.


    InputScanner.prototype.__match = function (pattern, index) {
      pattern.lastIndex = index;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
        if (pattern_match.index !== index) {
          pattern_match = null;
        }
      }

      return pattern_match;
    };

    InputScanner.prototype.test = function (pattern, index) {
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        return !!this.__match(pattern, index);
      } else {
        return false;
      }
    };

    InputScanner.prototype.testChar = function (pattern, index) {
      // test one character regex match
      var val = this.peek(index);
      pattern.lastIndex = 0;
      return val !== null && pattern.test(val);
    };

    InputScanner.prototype.match = function (pattern) {
      var pattern_match = this.__match(pattern, this.__position);

      if (pattern_match) {
        this.__position += pattern_match[0].length;
      } else {
        pattern_match = null;
      }

      return pattern_match;
    };

    InputScanner.prototype.read = function (starting_pattern, until_pattern, until_after) {
      var val = '';
      var match;

      if (starting_pattern) {
        match = this.match(starting_pattern);

        if (match) {
          val += match[0];
        }
      }

      if (until_pattern && (match || !starting_pattern)) {
        val += this.readUntil(until_pattern, until_after);
      }

      return val;
    };

    InputScanner.prototype.readUntil = function (pattern, until_after) {
      var val = '';
      var match_index = this.__position;
      pattern.lastIndex = this.__position;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match) {
        match_index = pattern_match.index;

        if (until_after) {
          match_index += pattern_match[0].length;
        }
      } else {
        match_index = this.__input_length;
      }

      val = this.__input.substring(this.__position, match_index);
      this.__position = match_index;
      return val;
    };

    InputScanner.prototype.readUntilAfter = function (pattern) {
      return this.readUntil(pattern, true);
    };

    InputScanner.prototype.get_regexp = function (pattern, match_from) {
      var result = null;
      var flags = 'g';

      if (match_from && regexp_has_sticky) {
        flags = 'y';
      } // strings are converted to regexp


      if (typeof pattern === "string" && pattern !== '') {
        // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
        result = new RegExp(pattern, flags);
      } else if (pattern) {
        result = new RegExp(pattern.source, flags);
      }

      return result;
    };

    InputScanner.prototype.get_literal_regexp = function (literal_string) {
      return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    };
    /* css beautifier legacy helpers */


    InputScanner.prototype.peekUntilAfter = function (pattern) {
      var start = this.__position;
      var val = this.readUntilAfter(pattern);
      this.__position = start;
      return val;
    };

    InputScanner.prototype.lookBack = function (testVal) {
      var start = this.__position - 1;
      return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
    };

    module.exports.InputScanner = InputScanner;
    /***/
  },,,,,
  /* 9 */

  /* 10 */

  /* 11 */

  /* 12 */

  /* 13 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Directives(start_block_pattern, end_block_pattern) {
      start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
      end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
      this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
      this.__directive_pattern = / (\w+)[:](\w+)/g;
      this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
    }

    Directives.prototype.get_directives = function (text) {
      if (!text.match(this.__directives_block_pattern)) {
        return null;
      }

      var directives = {};
      this.__directive_pattern.lastIndex = 0;

      var directive_match = this.__directive_pattern.exec(text);

      while (directive_match) {
        directives[directive_match[1]] = directive_match[2];
        directive_match = this.__directive_pattern.exec(text);
      }

      return directives;
    };

    Directives.prototype.readIgnored = function (input) {
      return input.readUntilAfter(this.__directives_end_ignore_pattern);
    };

    module.exports.Directives = Directives;
    /***/
  },,
  /* 14 */

  /* 15 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Beautifier = __webpack_require__(16).Beautifier,
        Options = __webpack_require__(17).Options;

    function css_beautify(source_text, options) {
      var beautifier = new Beautifier(source_text, options);
      return beautifier.beautify();
    }

    module.exports = css_beautify;

    module.exports.defaultOptions = function () {
      return new Options();
    };
    /***/

  },
  /* 16 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Options = __webpack_require__(17).Options;

    var Output = __webpack_require__(2).Output;

    var InputScanner = __webpack_require__(8).InputScanner;

    var Directives = __webpack_require__(13).Directives;

    var directives_core = new Directives(/\/\*/, /\*\//);
    var lineBreak = /\r\n|[\r\n]/;
    var allLineBreaks = /\r\n|[\r\n]/g; // tokenizer

    var whitespaceChar = /\s/;
    var whitespacePattern = /(?:\s|\n)+/g;
    var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
    var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;

    function Beautifier(source_text, options) {
      this._source_text = source_text || ''; // Allow the setting of language/file-type specific options
      // with inheritance of overall settings

      this._options = new Options(options);
      this._ch = null;
      this._input = null; // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule

      this.NESTED_AT_RULE = {
        "@page": true,
        "@font-face": true,
        "@keyframes": true,
        // also in CONDITIONAL_GROUP_RULE below
        "@media": true,
        "@supports": true,
        "@document": true
      };
      this.CONDITIONAL_GROUP_RULE = {
        "@media": true,
        "@supports": true,
        "@document": true
      };
    }

    Beautifier.prototype.eatString = function (endChars) {
      var result = '';
      this._ch = this._input.next();

      while (this._ch) {
        result += this._ch;

        if (this._ch === "\\") {
          result += this._input.next();
        } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
          break;
        }

        this._ch = this._input.next();
      }

      return result;
    }; // Skips any white space in the source text from the current position.
    // When allowAtLeastOneNewLine is true, will output new lines for each
    // newline character found; if the user has preserve_newlines off, only
    // the first newline will be output


    Beautifier.prototype.eatWhitespace = function (allowAtLeastOneNewLine) {
      var result = whitespaceChar.test(this._input.peek());
      var isFirstNewLine = true;

      while (whitespaceChar.test(this._input.peek())) {
        this._ch = this._input.next();

        if (allowAtLeastOneNewLine && this._ch === '\n') {
          if (this._options.preserve_newlines || isFirstNewLine) {
            isFirstNewLine = false;

            this._output.add_new_line(true);
          }
        }
      }

      return result;
    }; // Nested pseudo-class if we are insideRule
    // and the next special character found opens
    // a new block


    Beautifier.prototype.foundNestedPseudoClass = function () {
      var openParen = 0;
      var i = 1;

      var ch = this._input.peek(i);

      while (ch) {
        if (ch === "{") {
          return true;
        } else if (ch === '(') {
          // pseudoclasses can contain ()
          openParen += 1;
        } else if (ch === ')') {
          if (openParen === 0) {
            return false;
          }

          openParen -= 1;
        } else if (ch === ";" || ch === "}") {
          return false;
        }

        i++;
        ch = this._input.peek(i);
      }

      return false;
    };

    Beautifier.prototype.print_string = function (output_string) {
      this._output.set_indent(this._indentLevel);

      this._output.non_breaking_space = true;

      this._output.add_token(output_string);
    };

    Beautifier.prototype.preserveSingleSpace = function (isAfterSpace) {
      if (isAfterSpace) {
        this._output.space_before_token = true;
      }
    };

    Beautifier.prototype.indent = function () {
      this._indentLevel++;
    };

    Beautifier.prototype.outdent = function () {
      if (this._indentLevel > 0) {
        this._indentLevel--;
      }
    };
    /*_____________________--------------------_____________________*/


    Beautifier.prototype.beautify = function () {
      if (this._options.disabled) {
        return this._source_text;
      }

      var source_text = this._source_text;
      var eol = this._options.eol;

      if (eol === 'auto') {
        eol = '\n';

        if (source_text && lineBreak.test(source_text || '')) {
          eol = source_text.match(lineBreak)[0];
        }
      } // HACK: newline parsing inconsistent. This brute force normalizes the this._input.


      source_text = source_text.replace(allLineBreaks, '\n'); // reset

      var baseIndentString = source_text.match(/^[\t ]*/)[0];
      this._output = new Output(this._options, baseIndentString);
      this._input = new InputScanner(source_text);
      this._indentLevel = 0;
      this._nestedLevel = 0;
      this._ch = null;
      var parenLevel = 0;
      var insideRule = false; // This is the value side of a property value pair (blue in the following ex)
      // label { content: blue }

      var insidePropertyValue = false;
      var enteringConditionalGroup = false;
      var insideAtExtend = false;
      var insideAtImport = false;
      var topCharacter = this._ch;
      var whitespace;
      var isAfterSpace;
      var previous_ch;

      while (true) {
        whitespace = this._input.read(whitespacePattern);
        isAfterSpace = whitespace !== '';
        previous_ch = topCharacter;
        this._ch = this._input.next();

        if (this._ch === '\\' && this._input.hasNext()) {
          this._ch += this._input.next();
        }

        topCharacter = this._ch;

        if (!this._ch) {
          break;
        } else if (this._ch === '/' && this._input.peek() === '*') {
          // /* css comment */
          // Always start block comments on a new line.
          // This handles scenarios where a block comment immediately
          // follows a property definition on the same line or where
          // minified code is being beautified.
          this._output.add_new_line();

          this._input.back();

          var comment = this._input.read(block_comment_pattern); // Handle ignore directive


          var directives = directives_core.get_directives(comment);

          if (directives && directives.ignore === 'start') {
            comment += directives_core.readIgnored(this._input);
          }

          this.print_string(comment); // Ensures any new lines following the comment are preserved

          this.eatWhitespace(true); // Block comments are followed by a new line so they don't
          // share a line with other properties

          this._output.add_new_line();
        } else if (this._ch === '/' && this._input.peek() === '/') {
          // // single line comment
          // Preserves the space before a comment
          // on the same line as a rule
          this._output.space_before_token = true;

          this._input.back();

          this.print_string(this._input.read(comment_pattern)); // Ensures any new lines following the comment are preserved

          this.eatWhitespace(true);
        } else if (this._ch === '@') {
          this.preserveSingleSpace(isAfterSpace); // deal with less propery mixins @{...}

          if (this._input.peek() === '{') {
            this.print_string(this._ch + this.eatString('}'));
          } else {
            this.print_string(this._ch); // strip trailing space, if present, for hash property checks

            var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);

            if (variableOrRule.match(/[ :]$/)) {
              // we have a variable or pseudo-class, add it and insert one space before continuing
              variableOrRule = this.eatString(": ").replace(/\s$/, '');
              this.print_string(variableOrRule);
              this._output.space_before_token = true;
            }

            variableOrRule = variableOrRule.replace(/\s$/, '');

            if (variableOrRule === 'extend') {
              insideAtExtend = true;
            } else if (variableOrRule === 'import') {
              insideAtImport = true;
            } // might be a nesting at-rule


            if (variableOrRule in this.NESTED_AT_RULE) {
              this._nestedLevel += 1;

              if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                enteringConditionalGroup = true;
              } // might be less variable

            } else if (!insideRule && parenLevel === 0 && variableOrRule.indexOf(':') !== -1) {
              insidePropertyValue = true;
              this.indent();
            }
          }
        } else if (this._ch === '#' && this._input.peek() === '{') {
          this.preserveSingleSpace(isAfterSpace);
          this.print_string(this._ch + this.eatString('}'));
        } else if (this._ch === '{') {
          if (insidePropertyValue) {
            insidePropertyValue = false;
            this.outdent();
          } // when entering conditional groups, only rulesets are allowed


          if (enteringConditionalGroup) {
            enteringConditionalGroup = false;
            insideRule = this._indentLevel >= this._nestedLevel;
          } else {
            // otherwise, declarations are also allowed
            insideRule = this._indentLevel >= this._nestedLevel - 1;
          }

          if (this._options.newline_between_rules && insideRule) {
            if (this._output.previous_line && this._output.previous_line.item(-1) !== '{') {
              this._output.ensure_empty_line_above('/', ',');
            }
          }

          this._output.space_before_token = true; // The difference in print_string and indent order is necessary to indent the '{' correctly

          if (this._options.brace_style === 'expand') {
            this._output.add_new_line();

            this.print_string(this._ch);
            this.indent();

            this._output.set_indent(this._indentLevel);
          } else {
            this.indent();
            this.print_string(this._ch);
          }

          this.eatWhitespace(true);

          this._output.add_new_line();
        } else if (this._ch === '}') {
          this.outdent();

          this._output.add_new_line();

          if (previous_ch === '{') {
            this._output.trim(true);
          }

          insideAtImport = false;
          insideAtExtend = false;

          if (insidePropertyValue) {
            this.outdent();
            insidePropertyValue = false;
          }

          this.print_string(this._ch);
          insideRule = false;

          if (this._nestedLevel) {
            this._nestedLevel--;
          }

          this.eatWhitespace(true);

          this._output.add_new_line();

          if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
            if (this._input.peek() !== '}') {
              this._output.add_new_line(true);
            }
          }
        } else if (this._ch === ":") {
          if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideAtExtend && parenLevel === 0) {
            // 'property: value' delimiter
            // which could be in a conditional group query
            this.print_string(':');

            if (!insidePropertyValue) {
              insidePropertyValue = true;
              this._output.space_before_token = true;
              this.eatWhitespace(true);
              this.indent();
            }
          } else {
            // sass/less parent reference don't use a space
            // sass nested pseudo-class don't use a space
            // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
            if (this._input.lookBack(" ")) {
              this._output.space_before_token = true;
            }

            if (this._input.peek() === ":") {
              // pseudo-element
              this._ch = this._input.next();
              this.print_string("::");
            } else {
              // pseudo-class
              this.print_string(':');
            }
          }
        } else if (this._ch === '"' || this._ch === '\'') {
          this.preserveSingleSpace(isAfterSpace);
          this.print_string(this._ch + this.eatString(this._ch));
          this.eatWhitespace(true);
        } else if (this._ch === ';') {
          if (parenLevel === 0) {
            if (insidePropertyValue) {
              this.outdent();
              insidePropertyValue = false;
            }

            insideAtExtend = false;
            insideAtImport = false;
            this.print_string(this._ch);
            this.eatWhitespace(true); // This maintains single line comments on the same
            // line. Block comments are also affected, but
            // a new line is always output before one inside
            // that section

            if (this._input.peek() !== '/') {
              this._output.add_new_line();
            }
          } else {
            this.print_string(this._ch);
            this.eatWhitespace(true);
            this._output.space_before_token = true;
          }
        } else if (this._ch === '(') {
          // may be a url
          if (this._input.lookBack("url")) {
            this.print_string(this._ch);
            this.eatWhitespace();
            parenLevel++;
            this.indent();
            this._ch = this._input.next();

            if (this._ch === ')' || this._ch === '"' || this._ch === '\'') {
              this._input.back();
            } else if (this._ch) {
              this.print_string(this._ch + this.eatString(')'));

              if (parenLevel) {
                parenLevel--;
                this.outdent();
              }
            }
          } else {
            this.preserveSingleSpace(isAfterSpace);
            this.print_string(this._ch);
            this.eatWhitespace();
            parenLevel++;
            this.indent();
          }
        } else if (this._ch === ')') {
          if (parenLevel) {
            parenLevel--;
            this.outdent();
          }

          this.print_string(this._ch);
        } else if (this._ch === ',') {
          this.print_string(this._ch);
          this.eatWhitespace(true);

          if (this._options.selector_separator_newline && !insidePropertyValue && parenLevel === 0 && !insideAtImport) {
            this._output.add_new_line();
          } else {
            this._output.space_before_token = true;
          }
        } else if ((this._ch === '>' || this._ch === '+' || this._ch === '~') && !insidePropertyValue && parenLevel === 0) {
          //handle combinator spacing
          if (this._options.space_around_combinator) {
            this._output.space_before_token = true;
            this.print_string(this._ch);
            this._output.space_before_token = true;
          } else {
            this.print_string(this._ch);
            this.eatWhitespace(); // squash extra whitespace

            if (this._ch && whitespaceChar.test(this._ch)) {
              this._ch = '';
            }
          }
        } else if (this._ch === ']') {
          this.print_string(this._ch);
        } else if (this._ch === '[') {
          this.preserveSingleSpace(isAfterSpace);
          this.print_string(this._ch);
        } else if (this._ch === '=') {
          // no whitespace before or after
          this.eatWhitespace();
          this.print_string('=');

          if (whitespaceChar.test(this._ch)) {
            this._ch = '';
          }
        } else if (this._ch === '!' && !this._input.lookBack("\\")) {
          // !important
          this.print_string(' ');
          this.print_string(this._ch);
        } else {
          this.preserveSingleSpace(isAfterSpace);
          this.print_string(this._ch);
        }
      }

      var sweetCode = this._output.get_code(eol);

      return sweetCode;
    };

    module.exports.Beautifier = Beautifier;
    /***/
  },
  /* 17 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var BaseOptions = __webpack_require__(6).Options;

    function Options(options) {
      BaseOptions.call(this, options, 'css');
      this.selector_separator_newline = this._get_boolean('selector_separator_newline', true);
      this.newline_between_rules = this._get_boolean('newline_between_rules', true);

      var space_around_selector_separator = this._get_boolean('space_around_selector_separator');

      this.space_around_combinator = this._get_boolean('space_around_combinator') || space_around_selector_separator;

      var brace_style_split = this._get_selection_list('brace_style', ['collapse', 'expand', 'end-expand', 'none', 'preserve-inline']);

      this.brace_style = 'collapse';

      for (var bs = 0; bs < brace_style_split.length; bs++) {
        if (brace_style_split[bs] !== 'expand') {
          // default to collapse, as only collapse|expand is implemented for now
          this.brace_style = 'collapse';
        } else {
          this.brace_style = brace_style_split[bs];
        }
      }
    }

    Options.prototype = new BaseOptions();
    module.exports.Options = Options;
    /***/
  }
  /******/
  ]);

  var css_beautify = legacy_beautify_css;
  /* Footer */

  if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return {
        css_beautify: css_beautify
      };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(8);
} else {}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.assign;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(16);

module.exports = function extend(o
/*, objects*/
) {
  if (!isObject(o)) {
    o = {};
  }

  var len = arguments.length;

  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject(obj)) {
      assign(o, obj);
    }
  }

  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}
/**
 * Returns true if the given `key` is an own property of `obj`.
 */


function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var WorkerThread = function (e) {
  function t(e) {
    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function i(e, t, n) {
    return t && r(e.prototype, t), n && r(e, n), e;
  }

  function o(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function a(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: !0,
        configurable: !0
      }
    }), t && l(e, t);
  }

  function s(e) {
    return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }

  function l(e, t) {
    return (l = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }

  function u(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function c(e) {
    var t = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }();

    return function () {
      var n = s(e);

      if (t) {
        var r = s(this).constructor;
        n = Reflect.construct(n, arguments, r);
      } else n = n.apply(this, arguments);

      return n = !n || "object" != typeof n && "function" != typeof n ? u(this) : n;
    };
  }

  function h(e, t, n) {
    return (h = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (e, t, n) {
      for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = s(e));) {
        ;
      }

      if (e) return (t = Object.getOwnPropertyDescriptor(e, t)).get ? t.get.call(n) : t.value;
    })(e, t, n || e);
  }

  function f(e, t) {
    var n = Array.isArray(e) ? e : void 0;
    if (!n) if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
      n = [];
      var r = !0,
          i = !1,
          o = void 0;

      try {
        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0) {
          ;
        }
      } catch (e) {
        i = !0, o = e;
      } finally {
        try {
          r || null == s.return || s.return();
        } finally {
          if (i) throw o;
        }
      }
    } else n = void 0;
    if (!(e = n || p(e, t))) throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    return e;
  }

  function d(e) {
    var t = Array.isArray(e) ? y(e) : void 0;
    if (t || (t = "undefined" != typeof Symbol && Symbol.iterator in Object(e) ? Array.from(e) : void 0), !(e = t || p(e))) throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    return e;
  }

  function p(e, t) {
    if (e) {
      if ("string" == typeof e) return y(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      if ("Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return y(e, t);
    }
  }

  function y(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = Array(t); n < t; n++) {
      r[n] = e[n];
    }

    return r;
  }

  function v(e) {
    return !!e && U.get(e) || null;
  }

  function m(e) {
    return q.has(e) ? q.get(e) : (q.set(e, V), _.push(e), V++);
  }

  function g(e, t) {
    0 < G && e[58] && (Y = !0, z = z.concat(t), Promise.resolve().then(function (t) {
      if (Y) {
        var n;
        t = new Uint16Array(function () {
          var e = B;
          return B = [], e;
        }().reduce(function (e, t) {
          return e.concat(t[8]);
        }, [])).buffer;
        var r = new Uint16Array(z).buffer;
        e.postMessage((o(n = {}, 54, G), o(n, 12, 2 === G ? 3 : 2), o(n, 37, t), o(n, 41, function () {
          var e = _;
          return _ = [], e;
        }()), o(n, 36, r), n), [t, r]), z = [], Y = !1, G = 2;
      }
    }));
  }

  function k(e, t, n) {
    g(e, n), W.forEach(function (e) {
      for (var n = t.target; n; n = n.parentNode) {
        var r = e.target;

        if (r && r[7] === n[7]) {
          Q(e, t);
          break;
        }
      }
    });
  }

  function b(e, t) {
    var n = [t.indexOf("["), t.indexOf("]")],
        r = -1 !== n[0] && -1 !== n[1],
        i = r ? t.substring(0, n[0]) : t,
        o = r ? t.substring(n[0], n[1] + 1) : null;
    return n = "[" === t[0] ? function (e) {
      return H(t, e);
    } : "#" === i[0] ? r ? function (e) {
      return e.id === i.substr(1) && H(o, e);
    } : function (e) {
      return e.id === i.substr(1);
    } : "." === i[0] ? r ? function (e) {
      return e.classList.contains(i.substr(1)) && H(o, e);
    } : function (e) {
      return e.classList.contains(i.substr(1));
    } : r ? function (e) {
      return e.localName === i.toLowerCase() && H(o, e);
    } : function (e) {
      return e.localName === i.toLowerCase();
    }, R(e[45], n).filter(function (t) {
      return e !== t && e.contains(t);
    });
  }

  function w(e, t, n) {
    Object.defineProperty(e.prototype, n, {
      enumerable: !0,
      configurable: !0,
      get: function get() {
        return this[t].value;
      },
      set: function set(e) {
        this[t].value = e;
      }
    });
  }

  function A(e) {
    return e.replace(/&(?:(#x?[\da-f]+)|([\w]+));?/gi, function (e, t, n) {
      return t ? (t = "x" === t.charAt(1).toLowerCase() ? parseInt(t.substr(2), 16) : parseInt(t.substr(1), 10), isNaN(t) || 1114111 < t ? e : String.fromCodePoint(t) || e) : n && pe[n.toLowerCase()] || e;
    });
  }

  function T(e, t) {
    var n = Object.create(e[46]);
    e[46] = Object.assign(n, t);
  }

  function E(e) {
    for (var n = [], r = 0; r < e.length; r++) {
      var i = e[r];

      if ("number" == typeof i) {
        var o = i;
        Ie[0] = o, Ie[0] === o ? n.push(1, i) : (De[0] = i, n.push(2, Ie[0], Ie[1]));
      } else if ("string" == typeof i) n.push(3, m(i));else if (Array.isArray(i)) for (n.push(4, i.length), i = E(i), o = 0; o < i.length; o++) {
        n.push(i[o]);
      } else {
        if ("object" !== t(i)) throw Error("Cannot serialize argument.");

        for (i = i[68](), o = 0; o < i.length; o++) {
          n.push(i[o]);
        }
      }
    }

    return n;
  }

  function N(e, t) {
    var n = He++,
        r = t.ownerDocument;
    return new Promise(function (i) {
      if (!r.addGlobalEventListener) throw Error("addGlobalEventListener is not defined.");
      r.addGlobalEventListener("message", function e(t) {
        10 === (t = t.data)[12] && t[73] === n && (r.removeGlobalEventListener("message", e), i(t[38]));
      }), g(t.ownerDocument, [11, e[7], n]);
    });
  }

  function O(e, t, n) {
    n = Object.assign(Object.create(null), n);
    var r = Object.defineProperty;
    return r(n, "length", {
      get: function get() {
        return Object.keys(this).length;
      }
    }), r(n, "key", {
      value: function value(e) {
        var t = Object.keys(this);
        return 0 <= e && e < t.length ? t[e] : null;
      }
    }), r(n, "getItem", {
      value: function value(e) {
        return (e = this[e]) ? e : null;
      }
    }), r(n, "setItem", {
      value: function value(n, r) {
        r = String(r), this[n] = r, g(e, [12, 2, t, m(n), m(r)]);
      }
    }), r(n, "removeItem", {
      value: function value(n) {
        delete this[n], g(e, [12, 2, t, m(n), 0]);
      }
    }), r(n, "clear", {
      value: function value() {
        var n = this;
        Object.keys(this).forEach(function (e) {
          delete n[e];
        }), g(e, [12, 2, t, 0, 0]);
      }
    }), n;
  }

  var L,
      C,
      x,
      S,
      D,
      I = function I(e) {
    return function (t) {
      return e.includes(t.tagName);
    };
  },
      P = function P(e) {
    return 1 === e.nodeType;
  },
      R = function e(t, n) {
    var r = [];
    return t.childNodes.forEach(function (t) {
      P(t) && (n(t) && r.push(t), r.push.apply(r, d(e(t, n))));
    }), r;
  },
      M = function e(t, n) {
    var r = null;
    return t.children.some(function (t) {
      return (n(t) || null !== (t = e(t, n))) && (r = t, !0);
    }), r;
  },
      F = function F(e, t) {
    for (; e = e.parentNode;) {
      if (t(e)) return e;
    }

    return null;
  },
      H = function H(e, t) {
    if (!e) return !1;
    var n = e.indexOf("="),
        r = e.length,
        i = "i" === e.charAt(r - 2),
        o = i ? r - 3 : r - 1;

    if (-1 !== n) {
      r = e.charAt(n - 1);
      var a = ["~", "|", "$", "^", "*"].includes(r) ? e.substring(1, n - 1) : e.substring(1, n);
      if (e = e.substring(n + 1, o), t = t.getAttribute(a)) switch (e = i ? e.toLowerCase() : e, i = i ? t.toLowerCase() : t, r) {
        case "~":
          return -1 !== i.split(" ").indexOf(e);

        case "|":
          return i === e || i === "".concat(e, "-");

        case "^":
          return i.startsWith(e);

        case "$":
          return i.endsWith(e);

        case "*":
          return -1 !== i.indexOf(e);

        default:
          return i === e;
      }
      return !1;
    }

    return t.hasAttribute(e.substring(1, o));
  },
      G = 0,
      j = 0,
      B = [],
      U = new Map(),
      V = 0,
      _ = [],
      q = new Map(),
      Y = !1,
      z = [],
      W = [],
      X = !1,
      Q = function Q(e, t) {
    e.pushRecord(t), X || (X = !0, Promise.resolve().then(function () {
      X = !1, W.forEach(function (e) {
        return e.callback(e.takeRecords());
      });
    }));
  },
      J = function () {
    function e(t) {
      n(this, e), this[K] = [], this.callback = t;
    }

    return i(e, [{
      key: "observe",
      value: function value(e, t) {
        this.disconnect(), this.target = e, this.options = t || {}, W.push(this);
      }
    }, {
      key: "disconnect",
      value: function value() {
        this.target = null;
        var e = W.indexOf(this);
        0 <= e && W.splice(e, 1);
      }
    }, {
      key: "takeRecords",
      value: function value() {
        var e = this[42];
        return e.splice(0, e.length);
      }
    }, {
      key: "pushRecord",
      value: function value(e) {
        this[42].push(e);
      }
    }]), e;
  }(),
      K = 42,
      $ = function e(t, n, r) {
    t[n] = r, t.childNodes.forEach(function (t) {
      return e(t, n, r);
    });
  },
      Z = function () {
    function e(t, r, i, o) {
      n(this, e), this.childNodes = [], this.parentNode = null, this.isConnected = !1, this[L] = {}, this.nodeType = t, this.nodeName = r, this.ownerDocument = i || this, this[45] = this, o ? (0 === G && (U.set(this[7] = o, this), j = Math.max(j, o)), t = o) : void 0 !== this[7] ? t = this[7] : (U.set(this[7] = ++j, this), 0 < G && B.push(this), t = j), this[7] = t, this[9] = [this[7]];
    }

    return i(e, [{
      key: "getTextContent",
      value: function value() {
        var e = "",
            t = this.childNodes;
        return t.length ? (t.forEach(function (t) {
          return e += t.textContent;
        }), e) : "";
      }
    }, {
      key: "hasChildNodes",
      value: function value() {
        return 0 < this.childNodes.length;
      }
    }, {
      key: "contains",
      value: function value(e) {
        return e === this || 0 < this.childNodes.length && (!!this.childNodes.includes(this) || this.childNodes.some(function (t) {
          return t.contains(e);
        }));
      }
    }, {
      key: "insertBefore",
      value: function value(e, t) {
        var n = this;
        if (null === e || e === this) return e;
        if (11 === e.nodeType) e.childNodes.slice().forEach(function (e) {
          return n.insertBefore(e, t);
        });else {
          if (null == t) return this.appendChild(e);
          if (0 <= this.childNodes.indexOf(t)) return e.remove(), this.childNodes.splice(this.childNodes.indexOf(t), 0, e), this[56](e), k(this.ownerDocument, {
            addedNodes: [e],
            nextSibling: t,
            type: 2,
            target: this
          }, [2, this[7], t[7], 0, 1, 0, e[7]]), e;
        }
        return null;
      }
    }, {
      key: (L = 10, 56),
      value: function value(e) {
        e.parentNode = this, $(e, "isConnected", this.isConnected), $(e, 45, this[45]);
      }
    }, {
      key: 57,
      value: function value(e) {
        e.parentNode = null, $(e, "isConnected", !1), $(e, 45, e);
      }
    }, {
      key: "appendChild",
      value: function value(e) {
        if (11 === e.nodeType) e.childNodes.slice().forEach(this.appendChild, this);else {
          e.remove(), this.childNodes.push(e), this[56](e);
          var t = this.childNodes[this.childNodes.length - 2];
          k(this.ownerDocument, {
            addedNodes: [e],
            previousSibling: t,
            type: 2,
            target: this
          }, [2, this[7], 0, t ? t[7] : 0, 1, 0, e[7]]);
        }
        return e;
      }
    }, {
      key: "removeChild",
      value: function value(e) {
        var t = this.childNodes.indexOf(e);
        return 0 <= t ? (this.childNodes.splice(t, 1), this[57](e), k(this.ownerDocument, {
          removedNodes: [e],
          type: 2,
          target: this
        }, [2, this[7], 0, 0, 0, 1, e[7]]), e) : null;
      }
    }, {
      key: "replaceChild",
      value: function value(e, t) {
        if (e === t || t.parentNode !== this || e.contains(this)) return t;
        e.remove();
        var n = this.childNodes.indexOf(t);
        return this.childNodes.splice(n, 1, e), this[57](t), this[56](e), k(this.ownerDocument, {
          addedNodes: [e],
          removedNodes: [t],
          type: 2,
          nextSibling: this.childNodes[n + 1],
          target: this
        }, [2, this[7], this.childNodes[n + 1] ? this.childNodes[n + 1][7] : 0, 0, 1, 1, e[7], t[7]]), t;
      }
    }, {
      key: "remove",
      value: function value() {
        this.parentNode && this.parentNode.removeChild(this);
      }
    }, {
      key: "addEventListener",
      value: function value(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
            r = e.toLowerCase(),
            i = m(r),
            o = this[10][r],
            a = 0;
        o ? a = o.push(t) : this[10][r] = [t], g(this.ownerDocument, [4, this[7], 0, 1, i, a, Number(!!n.capture), Number(!!n.once), Number(!!n.passive), Number(!!n.workerDOMPreventDefault)]);
      }
    }, {
      key: "removeEventListener",
      value: function value(e, t) {
        e = e.toLowerCase();
        var n = this[10][e];
        0 <= (t = n ? n.indexOf(t) : -1) && (n.splice(t, 1), g(this.ownerDocument, [4, this[7], 1, 0, m(e), t]));
      }
    }, {
      key: "dispatchEvent",
      value: function value(e) {
        var t,
            n,
            r = e.currentTarget = this;

        do {
          if (t = r && r[10] && r[10][e.type.toLowerCase()]) for (n = t.length; n-- && (!1 !== t[n].call(r, e) && !e[51] || !e.cancelable);) {
            ;
          }
        } while (e.bubbles && (!e.cancelable || !e[50]) && (r = r && r.parentNode));

        return !e.defaultPrevented;
      }
    }, {
      key: "textContent",
      get: function get() {
        return this.getTextContent();
      }
    }, {
      key: "firstChild",
      get: function get() {
        return this.childNodes[0] || null;
      }
    }, {
      key: "lastChild",
      get: function get() {
        return this.childNodes[this.childNodes.length - 1] || null;
      }
    }, {
      key: "nextSibling",
      get: function get() {
        if (null === this.parentNode) return null;
        var e = this.parentNode.childNodes;
        return e[e.indexOf(this) + 1] || null;
      }
    }, {
      key: "previousSibling",
      get: function get() {
        if (null === this.parentNode) return null;
        var e = this.parentNode.childNodes;
        return e[e.indexOf(this) - 1] || null;
      }
    }]), e;
  }(),
      ee = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "querySelector",
      value: function value(e) {
        return (e = b(this, e)) ? e[0] : null;
      }
    }, {
      key: "querySelectorAll",
      value: function value(e) {
        return b(this, e);
      }
    }, {
      key: "children",
      get: function get() {
        return this.childNodes.filter(P);
      }
    }, {
      key: "childElementCount",
      get: function get() {
        return this.children.length;
      }
    }, {
      key: "firstElementChild",
      get: function get() {
        return this.childNodes.find(P) || null;
      }
    }, {
      key: "lastElementChild",
      get: function get() {
        var e = this.children;
        return e[e.length - 1] || null;
      }
    }]), t;
  }(Z),
      te = /\s/,
      ne = function () {
    function e(t, r) {
      n(this, e), this[C] = [], this[13] = t, this[18] = r, this[44] = t[44].bind(t);
    }

    return i(e, [{
      key: "item",
      value: function value(e) {
        return this[43][e];
      }
    }, {
      key: "contains",
      value: function value(e) {
        return this[43].includes(e);
      }
    }, {
      key: "add",
      value: function value() {
        for (var e, t = this.value, n = arguments.length, r = Array(n), i = 0; i < n; i++) {
          r[i] = arguments[i];
        }

        (e = this[43]).splice.apply(e, [0, this[43].length].concat(d(new Set(this[43].concat(r))))), this[67](t, this.value);
      }
    }, {
      key: "remove",
      value: function value() {
        for (var e, t = arguments.length, n = Array(t), r = 0; r < t; r++) {
          n[r] = arguments[r];
        }

        t = this.value, (e = this[43]).splice.apply(e, [0, this[43].length].concat(d(new Set(this[43].filter(function (e) {
          return !n.includes(e);
        }))))), this[67](t, this.value);
      }
    }, {
      key: "replace",
      value: function value(e, t) {
        var n;

        if (this[43].includes(e)) {
          var r = this.value,
              i = new Set(this[43]);
          e !== t && (i.delete(e), "" !== t && i.add(t)), (n = this[43]).splice.apply(n, [0, this[43].length].concat(d(i))), this[67](r, this.value);
        }
      }
    }, {
      key: "toggle",
      value: function value(e, t) {
        if (te.test(e)) throw new TypeError("Uncaught DOMException");

        if (this[43].includes(e)) {
          if (!t) return this.remove(e), !1;
        } else (void 0 === t || t) && this.add(e);

        return !0;
      }
    }, {
      key: (C = 43, 67),
      value: function value(e, t) {
        this[44](this[13].namespaceURI, this[18], t), k(this[13].ownerDocument, {
          type: 0,
          target: this[13],
          attributeName: this[18],
          value: t,
          oldValue: e
        }, [0, this[13][7], m(this[18]), 0, null !== t ? m(t) + 1 : 0]);
      }
    }, {
      key: "value",
      get: function get() {
        return this[43].join(" ");
      },
      set: function set(e) {
        var t,
            n = this.value;
        e = e.trim(), (t = this[43]).splice.apply(t, [0, this[43].length].concat(d("" !== e ? e.split(/\s+/) : ""))), this[67](n, e);
      }
    }, {
      key: "length",
      get: function get() {
        return this[43].length;
      }
    }]), e;
  }(),
      re = function re(e) {
    return e.map(function (e) {
      var t = e.value;
      return "".concat(e.name, '="').concat(t, '"');
    }).join(" ");
  },
      ie = function ie(e, t) {
    return function (n) {
      return n.namespaceURI === e && n.name === t;
    };
  },
      oe = function () {
    function e(t) {
      n(this, e), this[ae] = {}, this[44] = t[44].bind(t), this[13] = t;
    }

    return i(e, [{
      key: "getPropertyValue",
      value: function value(e) {
        return this[3][e] || "";
      }
    }, {
      key: "removeProperty",
      value: function value(e) {
        var t = this.getPropertyValue(e);
        return this[3][e] = null, this.mutated(this.cssText), t;
      }
    }, {
      key: "setProperty",
      value: function value(e, t) {
        this[3][e] = t, this.mutated(this.cssText);
      }
    }, {
      key: "mutated",
      value: function value(e) {
        var t = this[44](this[13].namespaceURI, "style", e);
        k(this[13].ownerDocument, {
          type: 0,
          target: this[13],
          attributeName: "style",
          value: e,
          oldValue: t
        }, [0, this[13][7], m("style"), 0, null !== e ? m(e) + 1 : 0]);
      }
    }, {
      key: "cssText",
      get: function get() {
        var e,
            t,
            n = "";

        for (t in this[3]) {
          "" !== (e = this.getPropertyValue(t)) && (n += "".concat(t, ": ").concat(e, "; "));
        }

        return n.trim();
      },
      set: function set(e) {
        this[3] = {};

        for (var t = (e = ("string" == typeof e ? e : "").split(/[:;]/)).length, n = 0; n + 1 < t; n += 2) {
          this[3][e[n].trim().toLowerCase()] = e[n + 1].trim();
        }

        this.mutated(this.cssText);
      }
    }]), e;
  }(),
      ae = 3,
      se = function se(e, t) {
    e.forEach(function (e) {
      var n,
          r = function r(n) {
        var r = e[n],
            i = r[0],
            o = r[1],
            a = void 0 === o ? n.toLowerCase() : o,
            s = r[2],
            l = "boolean" == typeof i;
        Object.defineProperty(t.prototype, n, {
          enumerable: !0,
          get: function get() {
            var e = this.getAttribute(a);
            return s ? this.hasAttribute(a) ? e === s[0] : i : l ? this.hasAttribute(a) : (e = e || i, "number" == typeof i ? Number(e) : String(e));
          },
          set: function set(e) {
            s ? this.setAttribute(a, e ? s[0] : s[1]) : l ? e ? this.setAttribute(a, "") : this.removeAttribute(a) : this.setAttribute(a, String(e));
          }
        });
      };

      for (n in e) {
        r(n);
      }
    });
  },
      le = /\x3c!--([^]*)--\x3e|<(\/?)([a-z][-.0-9_a-z]*)([^>]*?)(\/?)>/gi,
      ue = /(^|\s)([^\s"'>\/=]+)\s*=\s*("([^"]+)"|'([^']+)'|(\S+))/gi,
      ce = {
    AREA: !0,
    BASE: !0,
    BR: !0,
    COL: !0,
    HR: !0,
    IMG: !0,
    INPUT: !0,
    LINK: !0,
    META: !0,
    PARAM: !0,
    SOURCE: !0,
    TRACK: !0,
    WBR: !0
  },
      he = {
    LI: {
      LI: !0
    },
    DT: {
      DT: !0,
      DD: !0
    },
    DD: {
      DD: !0,
      DT: !0
    },
    P: {
      ADDRESS: !0,
      ARTICLE: !0,
      ASIDE: !0,
      BLOCKQUOTE: !0,
      DETAILS: !0,
      DIV: !0,
      DL: !0,
      FIELDSET: !0,
      FIGCAPTION: !0,
      FIGURE: !0,
      FOOTER: !0,
      FORM: !0,
      H1: !0,
      H2: !0,
      H3: !0,
      H4: !0,
      H5: !0,
      H6: !0,
      HEADER: !0,
      HR: !0,
      MAIN: !0,
      NAV: !0,
      OL: !0,
      P: !0,
      PRE: !0,
      SECTION: !0,
      TABLE: !0,
      UL: !0
    },
    RT: {
      RT: !0,
      RP: !0
    },
    RP: {
      RT: !0,
      RP: !0
    },
    OPTGROUP: {
      OPTGROUP: !0
    },
    OPTION: {
      OPTION: !0,
      OPTGROUP: !0
    },
    THEAD: {
      TBODY: !0,
      TFOOT: !0
    },
    TBODY: {
      TBODY: !0,
      TFOOT: !0
    },
    TR: {
      TR: !0
    },
    TD: {
      TD: !0,
      TH: !0
    },
    TH: {
      TD: !0,
      TH: !0
    }
  },
      fe = {
    LI: {
      UL: !0,
      OL: !0
    },
    A: {
      DIV: !0
    },
    B: {
      DIV: !0
    },
    I: {
      DIV: !0
    },
    P: {
      DIV: !0
    },
    TD: {
      TR: !0,
      TABLE: !0
    },
    TH: {
      TR: !0,
      TABLE: !0
    }
  },
      de = {
    SCRIPT: !0,
    NOSCRIPT: !0,
    STYLE: !0,
    PRE: !0
  },
      pe = {
    __proto__: null,
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  },
      ye = function () {
    function e(t, r) {
      n(this, e), this[ve] = !1, this[me] = !1, this.type = t, this.bubbles = !!r.bubbles, this.cancelable = !!r.cancelable;
    }

    return i(e, [{
      key: "stopPropagation",
      value: function value() {
        this[50] = !0;
      }
    }, {
      key: "stopImmediatePropagation",
      value: function value() {
        this[51] = this[50] = !0;
      }
    }, {
      key: "preventDefault",
      value: function value() {
        this.defaultPrevented = !0;
      }
    }, {
      key: "initEvent",
      value: function value(e, t, n) {
        this.type = e, this.bubbles = t, this.cancelable = n;
      }
    }]), e;
  }(),
      ve = 50,
      me = 51,
      ge = function ge(e, t) {
    return null !== t[13] ? v(0 !== (t = t[13][0]) ? t : e[7]) : null;
  },
      ke = function ke(e, t, n) {
    if (void 0 !== t[n]) {
      var r = Object.keys(t[n]),
          i = {
        length: r.length,
        item: function item(e) {
          return this[e] || null;
        }
      };
      return r.forEach(function (r) {
        r = Number(r);
        var o = t[n][r];
        i[r] = {
          identifier: o[0],
          screenX: o[1],
          screenY: o[2],
          clientX: o[3],
          clientY: o[4],
          pageX: o[5],
          pageY: o[6],
          target: v(0 !== o[7] ? o[7] : e[7])
        };
      }), i;
    }
  },
      be = {},
      we = function we(e, t) {
    return be["".concat(2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "http://www.w3.org/1999/xhtml", ":").concat(e)] = t;
  };

  (D = S || (S = {}))[D.NORMAL = 0] = "NORMAL", D[D.VOID = 1] = "VOID";

  var Ae = "AREA BASE BR COL EMBED HR IMG INPUT LINK META PARAM SOURCE TRACK WBR".split(" "),
      Te = function (e) {
    function t(e, i, o, a, s) {
      return n(this, t), (e = r.call(this, e, i.toUpperCase(), a, s)).attributes = [], e.style = new oe(u(e)), e.namespaceURI = o || "http://www.w3.org/1999/xhtml", e.localName = i, e.kind = Ae.includes(e.tagName) ? S.VOID : S.NORMAL, e[8] = [e[7], e.nodeType, m(e.localName), 0, null === e.namespaceURI ? 0 : m(e.namespaceURI)], e;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "setAttribute",
      value: function value(e, t) {
        this.setAttributeNS("http://www.w3.org/1999/xhtml", e, t);
      }
    }, {
      key: "getAttribute",
      value: function value(e) {
        return this.getAttributeNS("http://www.w3.org/1999/xhtml", e);
      }
    }, {
      key: "removeAttribute",
      value: function value(e) {
        this.removeAttributeNS("http://www.w3.org/1999/xhtml", e);
      }
    }, {
      key: "hasAttribute",
      value: function value(e) {
        return this.hasAttributeNS("http://www.w3.org/1999/xhtml", e);
      }
    }, {
      key: "hasAttributes",
      value: function value() {
        return 0 < this.attributes.length;
      }
    }, {
      key: "setAttributeNS",
      value: function value(e, t, n) {
        var r = String(n),
            i = this.constructor[46][t];
        void 0 !== i ? (this.attributes.find(ie(e, t)) || this.attributes.push({
          namespaceURI: e,
          name: t,
          value: r
        }), i[1](this, r)) : (i = this[44](e, t, r), k(this.ownerDocument, {
          type: 0,
          target: this,
          attributeName: t,
          attributeNamespace: e,
          value: r,
          oldValue: i
        }, [0, this[7], m(t), m(e), null !== n ? m(r) + 1 : 0]));
      }
    }, {
      key: (x = 46, 44),
      value: function value(e, t, n) {
        var r = this.attributes.find(ie(e, t)),
            i = r && r.value || "";
        return r ? r.value = n : this.attributes.push({
          namespaceURI: e,
          name: t,
          value: n
        }), i;
      }
    }, {
      key: "getAttributeNS",
      value: function value(e, t) {
        return (e = this.attributes.find(ie(e, t))) ? void 0 !== (t = this.constructor[46][t]) ? t[0](this) : e.value : null;
      }
    }, {
      key: "removeAttributeNS",
      value: function value(e, t) {
        var n = this.attributes.findIndex(ie(e, t));

        if (0 <= n) {
          var r = this.attributes[n].value;
          this.attributes.splice(n, 1), k(this.ownerDocument, {
            type: 0,
            target: this,
            attributeName: t,
            attributeNamespace: e,
            oldValue: r
          }, [0, this[7], m(t), m(e), 0]);
        }
      }
    }, {
      key: "hasAttributeNS",
      value: function value(e, t) {
        return this.attributes.some(ie(e, t));
      }
    }, {
      key: "getElementsByClassName",
      value: function value(e) {
        var t = e.split(" ");
        return R(this, function (e) {
          return t.some(function (t) {
            return e.classList.contains(t);
          });
        });
      }
    }, {
      key: "getElementsByTagName",
      value: function value(e) {
        var t = e.toLowerCase();
        return R(this, "*" === e ? function (e) {
          return !0;
        } : function (n) {
          return "http://www.w3.org/1999/xhtml" === n.namespaceURI ? n.localName === t : n.tagName === e;
        });
      }
    }, {
      key: "getElementsByName",
      value: function value(e) {
        var t = "" + e;
        return R(this, function (e) {
          return e.getAttribute("name") === t;
        });
      }
    }, {
      key: "cloneNode",
      value: function value() {
        var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
            t = this.ownerDocument.createElementNS(this.namespaceURI, "http://www.w3.org/1999/xhtml" === this.namespaceURI ? this.tagName.toLowerCase() : this.tagName);
        return this.attributes.forEach(function (e) {
          return t.setAttribute(e.name, e.value);
        }), e && this.childNodes.forEach(function (n) {
          return t.appendChild(n.cloneNode(e));
        }), t;
      }
    }, {
      key: "getBoundingClientRectAsync",
      value: function value() {
        var e = this,
            t = {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
        return new Promise(function (n) {
          e.ownerDocument.addGlobalEventListener && e.isConnected ? (e.ownerDocument.addGlobalEventListener("message", function t(r) {
            6 === (r = r.data)[12] && r[13][0] === e[7] && (e.ownerDocument.removeGlobalEventListener("message", t), r = r[38], n({
              top: r[0],
              right: r[1],
              bottom: r[2],
              left: r[3],
              width: r[4],
              height: r[5],
              x: r[0],
              y: r[3]
            }));
          }), g(e.ownerDocument, [5, e[7]]), setTimeout(n, 500, t)) : n(t);
        });
      }
    }, {
      key: "click",
      value: function value() {
        var e = new ye("click", {});
        e.target = this, this.dispatchEvent(e);
      }
    }, {
      key: "outerHTML",
      get: function get() {
        var e = this.localName || this.tagName,
            t = "<".concat([e, re(this.attributes)].join(" ").trim(), ">"),
            n = this.innerHTML;
        return n || this.kind !== S.VOID ? t + n + "</".concat(e, ">") : t;
      }
    }, {
      key: "innerHTML",
      get: function get() {
        var e = this.childNodes;
        return e.length ? e.map(function (e) {
          switch (e.nodeType) {
            case 3:
              return e.textContent;

            case 8:
              return "\x3c!--".concat(e.textContent, "--\x3e");

            default:
              return e.outerHTML;
          }
        }).join("") : "";
      },
      set: function set(e) {
        var t = this;
        e = function (e, t) {
          var n,
              r = t.ownerDocument,
              i = t = r.createElementNS(t.namespaceURI, t.localName),
              o = t.namespaceURI,
              a = [t],
              s = 0;
          e = "<q>" + e + "</q>";
          var l = [];
          if ("http://www.w3.org/2000/svg" !== o && "http://www.w3.org/1999/xhtml" !== o) throw Error("Namespace not supported: " + o);

          for (; n = le.exec(e);) {
            var u = n[1],
                c = n[2],
                h = n[3],
                f = n[4],
                d = n[5];
            if (s < n.index && (s = e.slice(s, n.index), i.appendChild(r.createTextNode(A(s)))), s = le.lastIndex, void 0 !== u) i.appendChild(r.createComment(u));else {
              if ("SVG" === (u = h.toUpperCase()) && (o = c ? "http://www.w3.org/1999/xhtml" : "http://www.w3.org/2000/svg"), !c) {
                !d && he[i.tagName] && he[i.tagName][u] && (a.pop(), i = a[a.length - 1]), n = r.createElementNS(o, "http://www.w3.org/1999/xhtml" === o ? h.toLowerCase() : h);

                for (var p; p = ue.exec(f);) {
                  n.setAttribute(p[2], p[4] || p[5] || p[6]);
                }

                if (i = i.appendChild(n), a.push(i), de[u]) {
                  if (f = "</" + u.toLowerCase() + ">", -1 == (f = e.indexOf(f, le.lastIndex))) throw Error("Close markup not found.");
                  le.lastIndex = f;
                }
              }

              if ("foreignObject" === h && (o = c ? "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml"), c || d || ce[u]) for (; !(1 >= a.length);) {
                if (i.nodeName.toUpperCase() == u) a.pop(), i = a[a.length - 1];else if (fe[i.tagName] && fe[i.tagName][u]) {
                  a.pop(), i = a[a.length - 1];
                  continue;
                }
                break;
              }
            }
          }

          for (e = 0; e < a.length && l[l.length - 1] == a[e].nodeName; e++) {
            a.pop(), l.pop(), i = a[a.length - 1];
          }

          if (1 !== a.length) throw Error("Attempting to parse invalid HTML content.");
          if (e = t.firstChild) return e.parentNode = null, e.childNodes.forEach(function (e) {
            e.parentNode = null;
          }), e;
          throw Error("Attempting to parse invalid HTML.");
        }(e, this), this.childNodes.forEach(function (e) {
          $(e, "isConnected", !1), $(e, 45, e);
        }), k(this.ownerDocument, {
          removedNodes: this.childNodes,
          type: 2,
          target: this
        }, [2, this[7], 0, 0, 0, this.childNodes.length].concat(d(this.childNodes.map(function (e) {
          return e[7];
        })))), this.childNodes = [], e.childNodes.forEach(function (e) {
          return t.appendChild(e);
        });
      }
    }, {
      key: "textContent",
      set: function set(e) {
        this.childNodes.slice().forEach(function (e) {
          return e.remove();
        }), this.appendChild(this.ownerDocument.createTextNode(e));
      },
      get: function get() {
        return this.getTextContent();
      }
    }, {
      key: "tagName",
      get: function get() {
        return this.nodeName;
      }
    }, {
      key: "classList",
      get: function get() {
        return this._classList || (this._classList = new ne(this, "class"));
      }
    }]), t;
  }(ee);

  Te[x] = {
    class: [function (e) {
      return e.classList.value;
    }, function (e, t) {
      return e.classList.value = t;
    }],
    style: [function (e) {
      return e.cssText;
    }, function (e, t) {
      return e.cssText = t;
    }]
  }, w(Te, "classList", "className"), se([{
    id: [""]
  }], Te);

  var Ee,
      Ne = function (e) {
    function t() {
      n(this, t);
      var e = r.apply(this, arguments);
      return e[Ee] = {}, e;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: (Ee = 76, 68),
      value: function value() {
        return [7, this[7]];
      }
    }, {
      key: "form",
      get: function get() {
        return F(this, I(["FORM"]));
      }
    }]), t;
  }(Te);

  se([{
    accessKey: [""]
  }, {
    contentEditable: ["inherit"]
  }, {
    dir: [""]
  }, {
    lang: [""]
  }, {
    title: [""]
  }, {
    draggable: [!1, void 0, ["true", "false"]]
  }, {
    hidden: [!1, void 0]
  }, {
    noModule: [!1]
  }, {
    spellcheck: [!0, void 0, ["true", "false"]]
  }, {
    translate: [!0, void 0, ["yes", "no"]]
  }], Ne);

  var Oe = function (e) {
    function t(e, i, o, a) {
      return n(this, t), (e = r.call(this, e, i, "http://www.w3.org/2000/svg", a)).nodeName = i, e;
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Te);

  we("svg", Oe, "http://www.w3.org/2000/svg");

  var Le = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "toString",
      value: function value() {
        return this.href;
      }
    }, {
      key: "relList",
      get: function get() {
        return this._relList || (this._relList = new ne(this, "rel"));
      }
    }, {
      key: "text",
      get: function get() {
        return this.textContent;
      },
      set: function set(e) {
        this.textContent = e;
      }
    }]), t;
  }(Ne);

  we("a", Le), T(Le, {
    rel: [function (e) {
      return e.relList.value;
    }, function (e, t) {
      return e.relList.value = t;
    }]
  }), w(Le, "relList", "rel"), se([{
    href: [""]
  }, {
    hreflang: [""]
  }, {
    media: [""]
  }, {
    target: [""]
  }, {
    type: [""]
  }], Le);

  var Ce = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("button", Ce), se([{
    formAction: [""]
  }, {
    formEnctype: [""]
  }, {
    formMethod: [""]
  }, {
    formTarget: [""]
  }, {
    name: [""]
  }, {
    type: ["submit"]
  }, {
    value: [""]
  }, {
    autofocus: [!1]
  }, {
    disabled: [!1]
  }], Ce);

  var xe,
      Se,
      De = new Float32Array(1),
      Ie = new Uint16Array(De.buffer),
      Pe = function () {
    function e(t, r) {
      n(this, e), this.document = r, this.id = t;
    }

    return i(e, [{
      key: "addColorStop",
      value: function value(e, t) {
        g(this.document, [9, m("addColorStop"), 2].concat(d(this[68]()), d(E(Array.prototype.slice.call(arguments)))));
      }
    }, {
      key: 68,
      value: function value() {
        return [5, this.id];
      }
    }]), e;
  }(),
      Re = function () {
    function e(t) {
      n(this, e), this.id = t;
    }

    return i(e, [{
      key: "setTransform",
      value: function value() {}
    }, {
      key: 68,
      value: function value() {
        return [5, this.id];
      }
    }]), e;
  }(),
      Me = function () {
    function e(t) {
      n(this, e), this.canvas = t;
    }

    return i(e, [{
      key: "getContext",
      value: function value(e) {
        if (!this.context) {
          if ("2d" !== e.toLowerCase()) throw Error("Context type not supported.");
          this.context = new Fe(this.canvas);
        }

        return this.context;
      }
    }]), e;
  }(),
      Fe = function () {
    function e(t) {
      n(this, e), this.objectIndex = 0, this.canvasElement = t, this.lineDash = [];
    }

    return i(e, [{
      key: 67,
      value: function value(e, t) {
        g(this.canvasElement.ownerDocument, [9, m(e), t.length].concat(d(this[68]()), d(E(t))));
      }
    }, {
      key: 68,
      value: function value() {
        return [6, this.canvasElement[7]];
      }
    }, {
      key: "createObjectReference",
      value: function value(e, t, n) {
        g(this.canvasElement.ownerDocument, [10, m(t), e, n.length].concat(d(this[68]()), d(E(n))));
      }
    }, {
      key: "clearRect",
      value: function value(e, t, n, r) {
        this[67]("clearRect", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "fillRect",
      value: function value(e, t, n, r) {
        this[67]("fillRect", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "strokeRect",
      value: function value(e, t, n, r) {
        this[67]("strokeRect", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "fillText",
      value: function value(e, t, n, r) {
        this[67]("fillText", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "moveTo",
      value: function value(e, t) {
        this[67]("moveTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "lineTo",
      value: function value(e, t) {
        this[67]("lineTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "closePath",
      value: function value() {
        this[67]("closePath", []);
      }
    }, {
      key: "stroke",
      value: function value() {
        this[67]("stroke", []);
      }
    }, {
      key: "restore",
      value: function value() {
        this[67]("restore", []);
      }
    }, {
      key: "save",
      value: function value() {
        this[67]("save", []);
      }
    }, {
      key: "resetTransform",
      value: function value() {
        this[67]("resetTransform", []);
      }
    }, {
      key: "rotate",
      value: function value(e) {
        this[67]("rotate", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "transform",
      value: function value(e, t, n, r, i, o) {
        this[67]("transform", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "translate",
      value: function value(e, t) {
        this[67]("translate", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "scale",
      value: function value(e, t) {
        this[67]("scale", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "beginPath",
      value: function value() {
        this[67]("beginPath", []);
      }
    }, {
      key: "strokeText",
      value: function value(e, t, n, r) {
        this[67]("strokeText", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "arc",
      value: function value(e, t, n, r, i, o) {
        this[67]("arc", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "arcTo",
      value: function value(e, t, n, r, i) {
        this[67]("arcTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "ellipse",
      value: function value(e, t, n, r, i, o, a, s) {
        this[67]("ellipse", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "bezierCurveTo",
      value: function value(e, t, n, r, i, o) {
        this[67]("bezierCurveTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "rect",
      value: function value(e, t, n, r) {
        this[67]("rect", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "quadraticCurveTo",
      value: function value(e, t, n, r) {
        this[67]("quadraticCurveTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "setLineDash",
      value: function value(e) {
        0 != (e = d(e)).length % 2 && (e = e.concat(e)), this.lineDash = e, this[67]("setLineDash", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "getLineDash",
      value: function value() {
        return d(this.lineDash);
      }
    }, {
      key: "clip",
      value: function value(e, n) {
        if ("object" === t(e)) throw Error("clip(Path2D) is currently not supported!");
        this[67]("clip", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "fill",
      value: function value(e, n) {
        if ("object" === t(e)) throw Error("fill(Path2D) is currently not supported!");
        this[67]("fill", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "setTransform",
      value: function value(e, n, r, i, o, a) {
        if ("object" === t(e)) throw Error("setTransform(DOMMatrix2DInit) is currently not supported!");
        this[67]("setTransform", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "createLinearGradient",
      value: function value(e, t, n, r) {
        var i = this.objectIndex++;
        return this.createObjectReference(i, "createLinearGradient", Array.prototype.slice.call(arguments)), new Pe(i, this.canvasElement.ownerDocument);
      }
    }, {
      key: "createRadialGradient",
      value: function value(e, t, n, r, i, o) {
        var a = this.objectIndex++;
        return this.createObjectReference(a, "createRadialGradient", Array.prototype.slice.call(arguments)), new Pe(a, this.canvasElement.ownerDocument);
      }
    }, {
      key: "createPattern",
      value: function value(e, t) {
        var n = this.objectIndex++;
        return this.createObjectReference(n, "createPattern", Array.prototype.slice.call(arguments)), new Re(n);
      }
    }, {
      key: "drawImage",
      value: function value(e, t, n) {
        this[67]("drawImage", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "createImageData",
      value: function value() {
        return {};
      }
    }, {
      key: "getImageData",
      value: function value() {
        return {};
      }
    }, {
      key: "putImageData",
      value: function value() {}
    }, {
      key: "isPointInPath",
      value: function value() {
        throw Error("isPointInPath is not implemented.");
      }
    }, {
      key: "isPointInStroke",
      value: function value() {
        throw Error("isPointInStroke is not implemented.");
      }
    }, {
      key: "measureText",
      value: function value() {
        throw Error("measureText is not implemented.");
      }
    }, {
      key: "canvas",
      get: function get() {
        return this.canvasElement;
      }
    }, {
      key: "lineWidth",
      set: function set(e) {
        this[67]("lineWidth", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "globalAlpha",
      set: function set(e) {
        this[67]("globalAlpha", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "globalCompositeOperation",
      set: function set(e) {
        this[67]("globalCompositeOperation", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "imageSmoothingQuality",
      set: function set(e) {
        this[67]("imageSmoothingQuality", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "fillStyle",
      set: function set(e) {
        this[67]("fillStyle", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "strokeStyle",
      set: function set(e) {
        this[67]("strokeStyle", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "shadowBlur",
      set: function set(e) {
        this[67]("shadowBlur", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "shadowColor",
      set: function set(e) {
        this[67]("shadowColor", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "shadowOffsetX",
      set: function set(e) {
        this[67]("shadowOffsetX", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "shadowOffsetY",
      set: function set(e) {
        this[67]("shadowOffsetY", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "filter",
      set: function set(e) {
        this[67]("filter", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "textAlign",
      set: function set(e) {
        this[67]("textAlign", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "textBaseline",
      set: function set(e) {
        this[67]("textBaseline", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "lineCap",
      set: function set(e) {
        this[67]("lineCap", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "lineDashOffset",
      set: function set(e) {
        this[67]("lineDashOffset", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "lineJoin",
      set: function set(e) {
        this[67]("lineJoin", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "miterLimit",
      set: function set(e) {
        this[67]("miterLimit", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "direction",
      set: function set(e) {
        this[67]("direction", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "font",
      set: function set(e) {
        this[67]("font", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "imageSmoothingEnabled",
      set: function set(e) {
        this[67]("imageSmoothingEnabled", Array.prototype.slice.call(arguments));
      }
    }]), e;
  }(),
      He = 0,
      Ge = function () {
    function e() {
      n(this, e), this[xe] = {}, this[Se] = !1;
    }

    return i(e, [{
      key: (xe = 70, Se = 71, 69),
      value: function value(e, t, n) {
        var r = this;
        return this[72] = N(t, e).then(function (t) {
          if (!(t = e.getContext("2d").createPattern(t, n))) throw Error("Pattern is null!");
          r[70] = t, r[71] = !0;
        }), this[72];
      }
    }, {
      key: "setTransform",
      value: function value() {}
    }]), e;
  }(),
      je = new WeakMap(),
      Be = function () {
    function e(t) {
      n(this, e), this.queue = [], this.upgraded = !1, this.unresolvedCalls = 0, this.canvasElement = t;
      var r = t.ownerDocument.defaultView.OffscreenCanvas;
      void 0 === r ? (this.implementation = new Me(t).getContext("2d"), this.polyfillUsed = this.upgraded = !0) : (this.implementation = new r(0, 0).getContext("2d"), this.getOffscreenCanvasAsync(this.canvasElement), this.polyfillUsed = !1);
    }

    return i(e, [{
      key: "getOffscreenCanvasAsync",
      value: function value(e) {
        var t = this;
        this.unresolvedCalls++;
        var n = {},
            r = this.canvasElement.ownerDocument,
            i = !r.addGlobalEventListener,
            o = new Promise(function (t) {
          if (r.addGlobalEventListener) r.addGlobalEventListener("message", function n(i) {
            9 === (i = i.data)[12] && i[13][0] === e[7] && (r.removeGlobalEventListener("message", n), t(i[38]));
          }), g(e.ownerDocument, [8, e[7]]);else {
            if (!i) throw Error("addGlobalEventListener is not defined.");
            n.resolve = t;
          }
        }).then(function (e) {
          t.goodImplementation = e.getContext("2d"), t.maybeUpgradeImplementation();
        });
        return i && (n.upgradePromise = o, je.set(e, n)), o;
      }
    }, {
      key: "degradeImplementation",
      value: function value() {
        this.upgraded = !1, this.implementation = new this.canvasElement.ownerDocument.defaultView.OffscreenCanvas(0, 0).getContext("2d"), this.unresolvedCalls++;
      }
    }, {
      key: "maybeUpgradeImplementation",
      value: function value() {
        this.unresolvedCalls--, 0 === this.unresolvedCalls && (this.implementation = this.goodImplementation, this.upgraded = !0, this.flushQueue());
      }
    }, {
      key: "flushQueue",
      value: function value() {
        var e,
            t = function (e, t) {
          var _n;

          if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
            if (Array.isArray(e) || (_n = p(e)) || t && e && "number" == typeof e.length) {
              _n && (e = _n);
              var r = 0;
              return {
                s: t = function t() {},
                n: function n() {
                  return r >= e.length ? {
                    done: !0
                  } : {
                    done: !1,
                    value: e[r++]
                  };
                },
                e: function e(_e2) {
                  throw _e2;
                },
                f: t
              };
            }

            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }

          var i,
              o = !0,
              a = !1;
          return {
            s: function s() {
              _n = e[Symbol.iterator]();
            },
            n: function n() {
              var e = _n.next();

              return o = e.done, e;
            },
            e: function e(_e3) {
              a = !0, i = _e3;
            },
            f: function f() {
              try {
                o || null == _n.return || _n.return();
              } finally {
                if (a) throw i;
              }
            }
          };
        }(this.queue);

        try {
          for (t.s(); !(e = t.n()).done;) {
            var n = e.value;
            n.isSetter ? this[n.fnName] = n.args[0] : this[n.fnName].apply(this, d(n.args));
          }
        } catch (e) {
          t.e(e);
        } finally {
          t.f();
        }

        this.queue.length = 0;
      }
    }, {
      key: "delegateFunc",
      value: function value(e, t) {
        var n,
            r = (n = this.implementation)[e].apply(n, d(t));
        return this.upgraded || this.queue.push({
          fnName: e,
          args: t,
          isSetter: !1
        }), r;
      }
    }, {
      key: "delegateSetter",
      value: function value(e, t) {
        this.implementation[e] = t[0], this.upgraded || this.queue.push({
          fnName: e,
          args: t,
          isSetter: !0
        });
      }
    }, {
      key: "delegateGetter",
      value: function value(e) {
        return this.implementation[e];
      }
    }, {
      key: "clearRect",
      value: function value(e, t, n, r) {
        this.delegateFunc("clearRect", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "fillRect",
      value: function value(e, t, n, r) {
        this.delegateFunc("fillRect", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "strokeRect",
      value: function value(e, t, n, r) {
        this.delegateFunc("strokeRect", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "fillText",
      value: function value(e, t, n, r) {
        this.delegateFunc("fillText", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "strokeText",
      value: function value(e, t, n, r) {
        this.delegateFunc("strokeText", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "measureText",
      value: function value(e) {
        return this.delegateFunc("measureText", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "getLineDash",
      value: function value() {
        return this.delegateFunc("getLineDash", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "setLineDash",
      value: function value(e) {
        this.delegateFunc("setLineDash", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "createLinearGradient",
      value: function value(e, t, n, r) {
        return this.delegateFunc("createLinearGradient", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "createRadialGradient",
      value: function value(e, t, n, r, i, o) {
        return this.delegateFunc("createRadialGradient", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "createPattern",
      value: function value(e, t) {
        var n = this,
            r = this.canvasElement.ownerDocument.defaultView.ImageBitmap;
        return this.polyfillUsed || e instanceof r ? this.delegateFunc("createPattern", Array.prototype.slice.call(arguments)) : (this.degradeImplementation(), (r = new Ge())[69](this.canvas, e, t).then(function () {
          n.maybeUpgradeImplementation();
        }), r);
      }
    }, {
      key: "drawImage",
      value: function value(e, t, n) {
        var r = this,
            i = this.canvasElement.ownerDocument.defaultView.ImageBitmap;
        if (this.polyfillUsed || e instanceof i) this.delegateFunc("drawImage", Array.prototype.slice.call(arguments));else {
          var o = [];
          this.queue.push({
            fnName: "drawImage",
            args: o,
            isSetter: !1
          }), this.degradeImplementation(), N(e, this.canvas).then(function (e) {
            o.push(e, t, n), r.maybeUpgradeImplementation();
          });
        }
      }
    }, {
      key: "beginPath",
      value: function value() {
        this.delegateFunc("beginPath", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "closePath",
      value: function value() {
        this.delegateFunc("closePath", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "moveTo",
      value: function value(e, t) {
        this.delegateFunc("moveTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "lineTo",
      value: function value(e, t) {
        this.delegateFunc("lineTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "bezierCurveTo",
      value: function value(e, t, n, r, i, o) {
        this.delegateFunc("bezierCurveTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "quadraticCurveTo",
      value: function value(e, t, n, r) {
        this.delegateFunc("quadraticCurveTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "arc",
      value: function value(e, t, n, r, i, o) {
        this.delegateFunc("arc", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "arcTo",
      value: function value(e, t, n, r, i) {
        this.delegateFunc("arcTo", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "ellipse",
      value: function value(e, t, n, r, i, o, a, s) {
        this.delegateFunc("ellipse", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "rect",
      value: function value(e, t, n, r) {
        this.delegateFunc("rect", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "fill",
      value: function value(e, t) {
        var n = Array.prototype.slice.call(arguments);
        this.delegateFunc("fill", n);
      }
    }, {
      key: "stroke",
      value: function value(e) {
        var t = Array.prototype.slice.call(arguments);
        this.delegateFunc("stroke", t);
      }
    }, {
      key: "clip",
      value: function value(e, t) {
        var n = Array.prototype.slice.call(arguments);
        this.delegateFunc("clip", n);
      }
    }, {
      key: "isPointInPath",
      value: function value(e, t, n, r) {
        var i = Array.prototype.slice.call(arguments);
        return this.delegateFunc("isPointInPath", i);
      }
    }, {
      key: "isPointInStroke",
      value: function value(e, t, n) {
        var r = Array.prototype.slice.call(arguments);
        return this.delegateFunc("isPointInStroke", r);
      }
    }, {
      key: "rotate",
      value: function value(e) {
        this.delegateFunc("rotate", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "scale",
      value: function value(e, t) {
        this.delegateFunc("scale", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "translate",
      value: function value(e, t) {
        this.delegateFunc("translate", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "transform",
      value: function value(e, t, n, r, i, o) {
        this.delegateFunc("transform", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "setTransform",
      value: function value(e, t, n, r, i, o) {
        var a = Array.prototype.slice.call(arguments);
        this.delegateFunc("setTransform", a);
      }
    }, {
      key: "resetTransform",
      value: function value() {
        this.delegateFunc("resetTransform", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "createImageData",
      value: function value(e, t) {
        var n = Array.prototype.slice.call(arguments);
        return this.delegateFunc("createImageData", n);
      }
    }, {
      key: "getImageData",
      value: function value(e, t, n, r) {
        return this.delegateFunc("getImageData", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "putImageData",
      value: function value(e, t, n, r, i, o, a) {
        this.delegateFunc("putImageData", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "save",
      value: function value() {
        this.delegateFunc("save", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "restore",
      value: function value() {
        this.delegateFunc("restore", Array.prototype.slice.call(arguments));
      }
    }, {
      key: "lineWidth",
      set: function set(e) {
        this.delegateSetter("lineWidth", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("lineWidth");
      }
    }, {
      key: "lineCap",
      set: function set(e) {
        this.delegateSetter("lineCap", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("lineCap");
      }
    }, {
      key: "lineJoin",
      set: function set(e) {
        this.delegateSetter("lineJoin", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("lineJoin");
      }
    }, {
      key: "miterLimit",
      set: function set(e) {
        this.delegateSetter("miterLimit", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("miterLimit");
      }
    }, {
      key: "lineDashOffset",
      set: function set(e) {
        this.delegateSetter("lineDashOffset", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("lineDashOffset");
      }
    }, {
      key: "font",
      set: function set(e) {
        this.delegateSetter("font", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("font");
      }
    }, {
      key: "textAlign",
      set: function set(e) {
        this.delegateSetter("textAlign", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("textAlign");
      }
    }, {
      key: "textBaseline",
      set: function set(e) {
        this.delegateSetter("textBaseline", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("textBaseline");
      }
    }, {
      key: "direction",
      set: function set(e) {
        this.delegateSetter("direction", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("direction");
      }
    }, {
      key: "fillStyle",
      set: function set(e) {
        var t = this;
        e instanceof Ge && this.upgraded ? e[71] ? this.delegateSetter("fillStyle", [e[70]]) : (this.queue.push({
          fnName: "fillStyle",
          args: [e],
          isSetter: !0
        }), this.degradeImplementation(), e[72].then(function () {
          t.maybeUpgradeImplementation();
        })) : this.delegateSetter("fillStyle", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("fillStyle");
      }
    }, {
      key: "strokeStyle",
      set: function set(e) {
        var t = this;
        e instanceof Ge && this.upgraded ? e[71] ? this.delegateSetter("strokeStyle", [e[70]]) : (this.queue.push({
          fnName: "strokeStyle",
          args: [e],
          isSetter: !0
        }), this.degradeImplementation(), e[72].then(function () {
          t.maybeUpgradeImplementation();
        })) : this.delegateSetter("strokeStyle", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("strokeStyle");
      }
    }, {
      key: "shadowBlur",
      set: function set(e) {
        this.delegateSetter("shadowBlur", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("shadowBlur");
      }
    }, {
      key: "shadowColor",
      set: function set(e) {
        this.delegateSetter("shadowColor", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("shadowColor");
      }
    }, {
      key: "shadowOffsetX",
      set: function set(e) {
        this.delegateSetter("shadowOffsetX", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("shadowOffsetX");
      }
    }, {
      key: "shadowOffsetY",
      set: function set(e) {
        this.delegateSetter("shadowOffsetY", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("shadowOffsetY");
      }
    }, {
      key: "globalAlpha",
      set: function set(e) {
        this.delegateSetter("globalAlpha", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("globalAlpha");
      }
    }, {
      key: "globalCompositeOperation",
      set: function set(e) {
        this.delegateSetter("globalCompositeOperation", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("globalCompositeOperation");
      }
    }, {
      key: "imageSmoothingEnabled",
      set: function set(e) {
        this.delegateSetter("imageSmoothingEnabled", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("imageSmoothingEnabled");
      }
    }, {
      key: "imageSmoothingQuality",
      set: function set(e) {
        this.delegateSetter("imageSmoothingQuality", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("imageSmoothingQuality");
      }
    }, {
      key: "canvas",
      get: function get() {
        return this.canvasElement;
      }
    }, {
      key: "filter",
      set: function set(e) {
        this.delegateSetter("filter", Array.prototype.slice.call(arguments));
      },
      get: function get() {
        return this.delegateGetter("filter");
      }
    }]), e;
  }(),
      Ue = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "getContext",
      value: function value(e) {
        if (!this.context) {
          if ("2D" !== e && "2d" !== e) throw Error("Context type not supported.");
          this.context = new Be(this);
        }

        return this.context;
      }
    }]), t;
  }(Ne);

  we("canvas", Ue), se([{
    height: [0]
  }, {
    width: [0]
  }], Ue);

  var Ve = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("data", Ve), se([{
    value: [""]
  }], Ve);

  var _e = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("embed", _e), se([{
    height: [""]
  }, {
    src: [""]
  }, {
    type: [""]
  }, {
    width: [""]
  }], _e);

  var qe = "BUTTON FIELDSET INPUT OBJECT OUTPUT SELECT TEXTAREA".split(" "),
      Ye = function Ye(e) {
    Object.defineProperty(e.prototype, "elements", {
      get: function get() {
        return R(this, I(qe));
      }
    });
  },
      ze = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "type",
      get: function get() {
        return this.tagName.toLowerCase();
      }
    }]), t;
  }(Ne);

  we("fieldset", ze), Ye(ze), se([{
    name: [""]
  }, {
    disabled: [!1]
  }], ze);

  var We = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "length",
      get: function get() {
        return this.elements.length;
      }
    }]), t;
  }(Ne);

  we("form", We), Ye(We), se([{
    name: [""]
  }, {
    method: ["get"]
  }, {
    target: [""]
  }, {
    action: [""]
  }, {
    enctype: ["application/x-www-form-urlencoded"]
  }, {
    acceptCharset: ["", "accept-charset"]
  }, {
    autocomplete: ["on"]
  }, {
    autocapitalize: ["sentences"]
  }], We);

  var Xe = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "sandbox",
      get: function get() {
        return this._sandbox || (this._sandbox = new ne(this, "sandbox"));
      }
    }]), t;
  }(Ne);

  we("iframe", Xe), T(Xe, {
    sandbox: [function (e) {
      return e.sandbox.value;
    }, function (e, t) {
      return e.sandbox.value = t;
    }]
  }), se([{
    allow: [""]
  }, {
    allowFullscreen: [!1]
  }, {
    csp: [""]
  }, {
    height: [""]
  }, {
    name: [""]
  }, {
    referrerPolicy: [""]
  }, {
    src: [""]
  }, {
    srcdoc: [""]
  }, {
    width: [""]
  }], Xe);

  var Qe = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("img", Qe), se([{
    alt: [""]
  }, {
    crossOrigin: [""]
  }, {
    height: [0]
  }, {
    isMap: [!1]
  }, {
    referrerPolicy: [""]
  }, {
    src: [""]
  }, {
    sizes: [""]
  }, {
    srcset: [""]
  }, {
    useMap: [""]
  }, {
    width: [0]
  }], Qe);

  var Je = function Je(e) {
    Object.defineProperty(e.prototype, "labels", {
      get: function get() {
        var e = this;
        return R(this.ownerDocument || this, function (t) {
          return "LABEL" === t.tagName && t.for && t.for === e.id;
        });
      }
    });
  },
      Ke = function (e) {
    function t() {
      n(this, t);
      var e = r.apply(this, arguments);
      return e[$e] = "", e.dirtyValue = !1, e[Ze] = !1, e;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "dateToString",
      value: function value(e) {
        var t = e.getFullYear(),
            n = e.getMonth() + 1;
        return e = e.getDate(), "".concat(t, "-").concat(9 < n ? "" : "0").concat(n, "-").concat(9 < e ? "" : "0").concat(e);
      }
    }, {
      key: "stringToDate",
      value: function value(e) {
        if (3 !== (e = e.split("-")).length) return null;
        var t = (e = f(e, 3))[1],
            n = e[2];
        return new Date(parseInt(e[0], 10), parseInt(t, 10) - 1, parseInt(n, 10));
      }
    }, {
      key: "value",
      get: function get() {
        return this.dirtyValue ? this[21] : this.getAttribute("value") || "";
      },
      set: function set(e) {
        this[21] = String(e), this.dirtyValue = !0, g(this.ownerDocument, [3, this[7], m("value"), 0, m(e)]);
      }
    }, {
      key: "valueAsDate",
      get: function get() {
        var e = this.stringToDate(this.value);
        return !e || isNaN(e.getTime()) ? null : e;
      },
      set: function set(e) {
        if (!(e instanceof Date)) throw new TypeError("The provided value is not a Date.");
        this.value = this.dateToString(e);
      }
    }, {
      key: "valueAsNumber",
      get: function get() {
        return 0 === this.value.length ? NaN : Number(this.value);
      },
      set: function set(e) {
        this.value = "number" == typeof e ? String(e) : "";
      }
    }, {
      key: "checked",
      get: function get() {
        return this[47];
      },
      set: function set(e) {
        this[47] !== e && (this[47] = !!e, g(this.ownerDocument, [3, this[7], m("checked"), 1, !0 === e ? 1 : 0]));
      }
    }]), t;
  }(Ne),
      $e = 21,
      Ze = 47;

  we("input", Ke), Je(Ke), se([{
    accept: [""]
  }, {
    alt: [""]
  }, {
    autocapitalize: [""]
  }, {
    autocomplete: [""]
  }, {
    autofocus: [!1]
  }, {
    defaultChecked: [!1, "checked"]
  }, {
    defaultValue: ["", "value"]
  }, {
    dirName: [""]
  }, {
    disabled: [!1]
  }, {
    formAction: [""]
  }, {
    formEncType: [""]
  }, {
    formMethod: [""]
  }, {
    formTarget: [""]
  }, {
    height: [0]
  }, {
    max: [""]
  }, {
    maxLength: [0]
  }, {
    min: [""]
  }, {
    multiple: [!1]
  }, {
    name: [""]
  }, {
    pattern: [""]
  }, {
    placeholder: [""]
  }, {
    readOnly: [!1]
  }, {
    required: [!1]
  }, {
    size: [0]
  }, {
    src: [""]
  }, {
    step: [""]
  }, {
    type: ["text"]
  }, {
    width: [0]
  }], Ke);

  var et = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "control",
      get: function get() {
        var e = this.getAttribute("for");
        return null !== e ? this.ownerDocument && this.ownerDocument.getElementById(e) : M(this, I(["INPUT"]));
      }
    }]), t;
  }(Ne);

  we("label", et), se([{
    htmlFor: ["", "for"]
  }], et);

  var tt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "relList",
      get: function get() {
        return this._relList || (this._relList = new ne(this, "rel"));
      }
    }]), t;
  }(Ne);

  we("link", tt), T(tt, {
    rel: [function (e) {
      return e.relList.value;
    }, function (e, t) {
      return e.relList.value = t;
    }]
  }), w(tt, "relList", "rel"), se([{
    as: [""]
  }, {
    crossOrigin: [""]
  }, {
    disabled: [!1]
  }, {
    href: [""]
  }, {
    hreflang: [""]
  }, {
    media: [""]
  }, {
    referrerPolicy: [""]
  }, {
    sizes: [""]
  }, {
    type: [""]
  }], tt);

  var nt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "areas",
      get: function get() {
        return R(this, function (e) {
          return "AREA" === e.tagName;
        });
      }
    }]), t;
  }(Ne);

  we("map", nt), se([{
    name: [""]
  }], nt);

  var rt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("meter", rt), Je(rt), se([{
    high: [0]
  }, {
    low: [0]
  }, {
    max: [1]
  }, {
    min: [0]
  }, {
    optimum: [0]
  }, {
    value: [0]
  }], rt);

  var it = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("del", it), we("ins", it), se([{
    cite: [""]
  }, {
    datetime: [""]
  }], it);

  var ot = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("ol", ot), se([{
    reversed: [!1]
  }, {
    start: [1]
  }, {
    type: [""]
  }], ot);

  var at = function (e) {
    function t() {
      n(this, t);
      var e = r.apply(this, arguments);
      return e[st] = !1, e;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "index",
      get: function get() {
        return this.parentNode && this.parentNode.children.indexOf(this) || 0;
      }
    }, {
      key: "label",
      get: function get() {
        return this.getAttribute("label") || this.textContent;
      },
      set: function set(e) {
        this.setAttribute("label", e);
      }
    }, {
      key: "selected",
      get: function get() {
        return this[52];
      },
      set: function set(e) {
        this[52] = !!e, g(this.ownerDocument, [3, this[7], m("selected"), 1, this[52] ? 1 : 0]);
      }
    }, {
      key: "text",
      get: function get() {
        return this.textContent;
      },
      set: function set(e) {
        this.textContent = e;
      }
    }, {
      key: "value",
      get: function get() {
        return this.getAttribute("value") || this.textContent;
      },
      set: function set(e) {
        this.setAttribute("value", e);
      }
    }]), t;
  }(Ne),
      st = 52;

  we("option", at), T(at, {
    selected: [function (e) {
      return String(e[52]);
    }, function (e, t) {
      return e.selected = "true" === t;
    }]
  }), se([{
    defaultSelected: [!1, "selected"]
  }, {
    disabled: [!1]
  }, {
    type: [""]
  }], at);

  var lt = function (e) {
    function t() {
      n(this, t);
      var e = r.apply(this, arguments);
      return e[ut] = !0, e[ct] = 0, e.dirtyValue = !1, e;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "position",
      get: function get() {
        return this[48] ? -1 : this.value / this.max;
      }
    }, {
      key: "value",
      get: function get() {
        return this.dirtyValue ? this[21] : Number(this.getAttribute("value")) || 0;
      },
      set: function set(e) {
        this[48] = !1, this[21] = e, this.dirtyValue = !0;
      }
    }]), t;
  }(Ne),
      ut = 48,
      ct = 21;

  we("progress", lt), Je(lt), se([{
    max: [1]
  }], lt);

  var ht = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("blockquote", ht), we("q", ht), se([{
    cite: [""]
  }], ht);

  var ft = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "text",
      get: function get() {
        return this.textContent;
      },
      set: function set(e) {
        this.textContent = e;
      }
    }]), t;
  }(Ne);

  we("script", ft), se([{
    type: [""]
  }, {
    src: [""]
  }, {
    charset: [""]
  }, {
    async: [!1]
  }, {
    defer: [!1]
  }, {
    crossOrigin: [""]
  }, {
    noModule: [!1]
  }], ft);

  var dt,
      pt = I(["OPTION"]),
      yt = function yt(e) {
    return pt(e) && !0 === e.selected;
  },
      vt = function (e) {
    function t() {
      n(this, t);
      var e = r.apply(this, arguments);
      return e[dt] = -1, e;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: (dt = 49, 56),
      value: function value(e) {
        h(s(t.prototype), 56, this).call(this, e), (!this.multiple && pt(e) && e.selected || "" === this.value) && (this.value = e.value);
      }
    }, {
      key: 57,
      value: function value(e) {
        h(s(t.prototype), 57, this).call(this, e), !this.multiple && e.selected && 0 < (e = this.options).length && (this.value = e[0].value);
      }
    }, {
      key: "length",
      get: function get() {
        return this.options.length;
      }
    }, {
      key: "options",
      get: function get() {
        return this.children.filter(pt);
      }
    }, {
      key: "selectedIndex",
      get: function get() {
        var e = M(this, yt);
        return e ? this.children.indexOf(e) : -1;
      },
      set: function set(e) {
        this.children.forEach(function (t, n) {
          return t.selected = n === e;
        });
      }
    }, {
      key: "selectedOptions",
      get: function get() {
        return R(this, yt);
      }
    }, {
      key: "size",
      get: function get() {
        return -1 === this[49] ? this.multiple ? 4 : 1 : this[49];
      },
      set: function set(e) {
        this[49] = 0 < e ? e : this.multiple ? 4 : 1;
      }
    }, {
      key: "type",
      get: function get() {
        return this.multiple ? "select-one" : "select-multiple";
      }
    }, {
      key: "value",
      get: function get() {
        var e = M(this, yt);
        return e ? e.value : "";
      },
      set: function set(e) {
        var t = String(e);
        this.children.forEach(function (e) {
          return pt(e) && (e.selected = e.value === t);
        });
      }
    }]), t;
  }(Ne);

  we("select", vt), Je(vt), se([{
    multiple: [!1]
  }, {
    name: [""]
  }, {
    required: [!1]
  }], vt);

  var mt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("source", mt), se([{
    media: [""]
  }, {
    sizes: [""]
  }, {
    src: [""]
  }, {
    srcset: [""]
  }, {
    type: [""]
  }], mt);

  var gt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("style", gt), se([{
    media: [""]
  }, {
    type: [""]
  }], gt);

  var kt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "headers",
      get: function get() {
        return this._headers || (this._headers = new ne(this, "headers"));
      }
    }, {
      key: "cellIndex",
      get: function get() {
        var e = F(this, I(["TR"]));
        return null !== e ? R(e, I(["TH", "TD"])).indexOf(this) : -1;
      }
    }]), t;
  }(Ne);

  we("th", kt), we("td", kt), T(kt, {
    headers: [function (e) {
      return e.headers.value;
    }, function (e, t) {
      return e.headers.value = t;
    }]
  }), se([{
    abbr: [""]
  }, {
    colSpan: [1]
  }, {
    rowSpan: [1]
  }, {
    scope: [""]
  }], kt);

  var bt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("col", bt), se([{
    span: [1]
  }], bt);

  var wt = function wt(e) {
    return e && e.remove();
  },
      At = function At(e, t, n) {
    var r = M(e, function (e) {
      return !n.includes(e.tagName);
    });
    r ? e.insertBefore(t, r) : e.appendChild(t);
  },
      Tt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "caption",
      get: function get() {
        return M(this, I(["CAPTION"]));
      },
      set: function set(e) {
        e && "CAPTION" === e.tagName && (wt(this.caption), this.insertBefore(e, this.firstElementChild));
      }
    }, {
      key: "tHead",
      get: function get() {
        return M(this, I(["THEAD"]));
      },
      set: function set(e) {
        e && "THEAD" === e.tagName && (wt(this.tHead), At(this, e, ["CAPTION", "COLGROUP"]));
      }
    }, {
      key: "tFoot",
      get: function get() {
        return M(this, I(["TFOOT"]));
      },
      set: function set(e) {
        e && "TFOOT" === e.tagName && (wt(this.tFoot), At(this, e, ["CAPTION", "COLGROUP", "THEAD"]));
      }
    }, {
      key: "rows",
      get: function get() {
        return R(this, I(["TR"]));
      }
    }, {
      key: "tBodies",
      get: function get() {
        return R(this, I(["TBODY"]));
      }
    }]), t;
  }(Ne);

  we("table", Tt);

  var Et = ["TABLE", "TBODY", "THEAD", "TFOOT"],
      Nt = function Nt(e, t) {
    return null === (t = F(e, t)) ? -1 : t.rows.indexOf(e);
  },
      Ot = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "deleteCell",
      value: function value(e) {
        (e = this.cells[e]) && e.remove();
      }
    }, {
      key: "insertCell",
      value: function value(e) {
        var t = this.cells,
            n = this.ownerDocument.createElement("td");
        return 0 > e || e >= t.length ? this.appendChild(n) : this.insertBefore(n, this.children[e]), n;
      }
    }, {
      key: "cells",
      get: function get() {
        return R(this, I(["TD", "TH"]));
      }
    }, {
      key: "rowIndex",
      get: function get() {
        return Nt(this, I(["TABLE"]));
      }
    }, {
      key: "sectionRowIndex",
      get: function get() {
        return Nt(this, I(Et));
      }
    }]), t;
  }(Ne);

  we("tr", Ot);

  var Lt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "deleteRow",
      value: function value(e) {
        var t = this.rows;
        (0 <= e || e <= t.length) && t[e].remove();
      }
    }, {
      key: "insertRow",
      value: function value(e) {
        var t = this.rows,
            n = this.ownerDocument.createElement("tr");
        return 0 > e || e >= t.length ? this.appendChild(n) : this.insertBefore(n, this.children[e]), n;
      }
    }, {
      key: "rows",
      get: function get() {
        return R(this, I(["TR"]));
      }
    }]), t;
  }(Ne);

  we("thead", Lt), we("tfoot", Lt), we("tbody", Lt);

  var Ct = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return t;
  }(Ne);

  we("time", Ct), se([{
    dateTime: [""]
  }], Ct);

  var xt = function (e) {
    function t() {
      return n(this, t), r.apply(this, arguments);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "options",
      get: function get() {
        return this.childNodes.filter(function (e) {
          return "OPTION" === e.nodeName;
        });
      }
    }]), t;
  }(Ne);

  we("datalist", xt);

  var St,
      Dt = function (e) {
    function t(e, i, o, a, s) {
      return n(this, t), (a = r.call(this, i, o, a, s))[38] = e, a[8] = [a[7], i, m(o), m(e), 0], a;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "data",
      get: function get() {
        return this[38];
      },
      set: function set(e) {
        var t = this.data;
        this[38] = e, k(this.ownerDocument, {
          target: this,
          type: 1,
          value: e,
          oldValue: t
        }, [1, this[7], m(e)]);
      }
    }, {
      key: "length",
      get: function get() {
        return this[38].length;
      }
    }, {
      key: "nodeValue",
      get: function get() {
        return this[38];
      },
      set: function set(e) {
        this.data = e;
      }
    }]), t;
  }(Z),
      It = function (e) {
    function t(e, i, o) {
      return n(this, t), r.call(this, e, 3, "#text", i, o);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "cloneNode",
      value: function value() {
        return this.ownerDocument.createTextNode(this.data);
      }
    }, {
      key: "splitText",
      value: function value(e) {
        var n = new t(this.data.slice(e, this.data.length), this.ownerDocument),
            r = this.parentNode;

        if (this.nodeValue = this.data.slice(0, e), null !== r) {
          var i = (e = r.childNodes).indexOf(this) + 1;
          return r.insertBefore(n, e.length >= i ? e[i] : null);
        }

        return n;
      }
    }, {
      key: "textContent",
      get: function get() {
        return this.data;
      },
      set: function set(e) {
        this.nodeValue = e;
      }
    }]), t;
  }(Dt),
      Pt = function (e) {
    function t(e, i, o) {
      return n(this, t), r.call(this, e, 8, "#comment", i, o);
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "cloneNode",
      value: function value() {
        return this.ownerDocument.createComment(this.data);
      }
    }, {
      key: "textContent",
      get: function get() {
        return this.data;
      },
      set: function set(e) {
        this.nodeValue = e;
      }
    }]), t;
  }(Dt),
      Rt = function (e) {
    function t(e, i) {
      return n(this, t), (e = r.call(this, 11, "#document-fragment", e, i))[8] = [e[7], 11, m(e.nodeName), 0, 0], e;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: "cloneNode",
      value: function value() {
        var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
            t = this.ownerDocument.createDocumentFragment();
        return e && this.childNodes.forEach(function (n) {
          return t.appendChild(n.cloneNode(e));
        }), t;
      }
    }]), t;
  }(ee),
      Mt = function (e) {
    function t(e) {
      n(this, t);
      var i = r.call(this, 9, "#document", "http://www.w3.org/1999/xhtml", null);
      return i[St] = !0, i.nodeName = "#document", i.documentElement = u(i), i.defaultView = Object.assign(e, {
        document: u(i),
        addEventListener: i.addEventListener.bind(u(i)),
        removeEventListener: i.removeEventListener.bind(u(i))
      }), i;
    }

    a(t, e);
    var r = c(t);
    return i(t, [{
      key: (St = 58, 59),
      value: function value() {
        var e, t;
        G = 1, e = this.defaultView, (t = e.document).addGlobalEventListener && t.addGlobalEventListener("message", function (t) {
          if (1 === (t = t.data)[12]) {
            var n = v((t = t[39])[7]);
            null !== n && n.dispatchEvent(Object.assign(new ye(t[12], {
              bubbles: t[25],
              cancelable: t[26]
            }), {
              cancelBubble: t[27],
              defaultPrevented: t[29],
              eventPhase: t[30],
              isTrusted: t[31],
              returnValue: t[32],
              target: ge(e.document, t),
              timeStamp: t[33],
              scoped: t[34],
              keyCode: t[35],
              pageX: t[60],
              pageY: t[61],
              offsetX: t[65],
              offsetY: t[66],
              touches: ke(e.document, t, 62),
              changedTouches: ke(e.document, t, 63)
            }));
          }
        }), function (e) {
          (e = e.document).addGlobalEventListener && e.addGlobalEventListener("message", function (e) {
            if (4 === (e = e.data)[12]) {
              var t = v((e = e[40])[7]);
              t && (t.ownerDocument[58] = !1, t.value = e[21], t.ownerDocument[58] = !0);
            }
          });
        }(this.defaultView), function (e) {
          var t = e.document;
          t.addGlobalEventListener && t.addGlobalEventListener("message", function (t) {
            5 === (t = t.data)[12] && (t = t[40]) && (e.innerWidth = t[0], e.innerHeight = t[1]);
          });
        }(this.defaultView);
      }
    }, {
      key: 64,
      value: function value(e, t) {
        var n = this;

        switch (t[0]) {
          case 3:
            return new It(e[t[5]], this, t[7]);

          case 8:
            return new Pt(e[t[5]], this, t[7]);

          default:
            var r = e[t[6]] || "http://www.w3.org/1999/xhtml",
                i = e[t[1]],
                o = new (be["".concat(r, ":").concat(i)] || Ne)(1, i, r, this, t[7]);
            return (t[2] || []).forEach(function (t) {
              return o.setAttributeNS("null" !== e[t[0]] ? e[t[0]] : "http://www.w3.org/1999/xhtml", e[t[1]], e[t[2]]);
            }), (t[4] || []).forEach(function (t) {
              return o.appendChild(n[64](e, t));
            }), o;
        }
      }
    }, {
      key: "createElement",
      value: function value(e) {
        return this.createElementNS("http://www.w3.org/1999/xhtml", e.toLowerCase());
      }
    }, {
      key: "createElementNS",
      value: function value(e, t) {
        return new (be["".concat(e, ":").concat(t)] || Ne)(1, t, e, this);
      }
    }, {
      key: "createEvent",
      value: function value(e) {
        return new Event(e, {
          bubbles: !1,
          cancelable: !1
        });
      }
    }, {
      key: "createTextNode",
      value: function value(e) {
        return new It(e, this);
      }
    }, {
      key: "createComment",
      value: function value(e) {
        return new Pt(e, this);
      }
    }, {
      key: "createDocumentFragment",
      value: function value() {
        return new Rt(this);
      }
    }, {
      key: "getElementById",
      value: function value(e) {
        return M(this.body, function (t) {
          return t.id === e;
        });
      }
    }]), t;
  }(Te),
      Ft = 1e3 / 60,
      Ht = 0,
      Gt = 0,
      jt = [],
      Bt = {
    innerWidth: 0,
    innerHeight: 0,
    CharacterData: Dt,
    Comment: Pt,
    DOMTokenList: ne,
    Document: Mt,
    DocumentFragment: Rt,
    Element: Te,
    HTMLAnchorElement: Le,
    HTMLButtonElement: Ce,
    HTMLCanvasElement: Ue,
    HTMLDataElement: Ve,
    HTMLDataListElement: xt,
    HTMLElement: Ne,
    HTMLEmbedElement: _e,
    HTMLFieldSetElement: ze,
    HTMLFormElement: We,
    HTMLIFrameElement: Xe,
    HTMLImageElement: Qe,
    HTMLInputElement: Ke,
    HTMLLabelElement: et,
    HTMLLinkElement: tt,
    HTMLMapElement: nt,
    HTMLMeterElement: rt,
    HTMLModElement: it,
    HTMLOListElement: ot,
    HTMLOptionElement: at,
    HTMLProgressElement: lt,
    HTMLQuoteElement: ht,
    HTMLScriptElement: ft,
    HTMLSelectElement: vt,
    HTMLSourceElement: mt,
    HTMLStyleElement: gt,
    HTMLTableCellElement: kt,
    HTMLTableColElement: bt,
    HTMLTableElement: Tt,
    HTMLTableRowElement: Ot,
    HTMLTableSectionElement: Lt,
    HTMLTimeElement: Ct,
    SVGElement: Oe,
    Text: It,
    Event: ye,
    MutationObserver: J,
    requestAnimationFrame: self.requestAnimationFrame || function (e) {
      return 0 === jt.length && function () {
        var e = Date.now(),
            t = Math.round(Math.max(0, Ft - (Date.now() - Ht)));
        Ht = e + t, setTimeout(function () {
          for (var e = jt.slice(0), t = jt.length = 0; t < e.length; t++) {
            if (!e[t].cancelled) try {
              e[t].callback(Ht);
            } catch (e) {
              setTimeout(function () {
                throw e;
              }, 0);
            }
          }
        }, t);
      }(), Gt === Number.MAX_SAFE_INTEGER && (Gt = 0), jt.push({
        handle: ++Gt,
        callback: e,
        cancelled: !1
      }), Gt;
    },
    cancelAnimationFrame: self.cancelAnimationFrame || function (e) {
      for (var t = 0; t < jt.length; t++) {
        if (jt[t].handle === e) {
          jt[t].cancelled = !0;
          break;
        }
      }
    }
  },
      Ut = function Ut() {},
      Vt = function (e, t, n) {
    var r = new Mt(Bt);
    return r.postMessage = e, r.addGlobalEventListener = t, r.removeGlobalEventListener = n, Bt.OffscreenCanvas = self.OffscreenCanvas, Bt.ImageBitmap = self.ImageBitmap, r.isConnected = !0, r.appendChild(r.body = r.createElement("body")), r.defaultView;
  }(postMessage.bind(self) || Ut, addEventListener.bind(self) || Ut, removeEventListener.bind(self) || Ut);

  return e.hydrate = function (e, t, n, r, i, a, s, l) {
    var u = f(a, 2);
    a = u[0], u = u[1], function (e) {
      if (!(0 >= (e = e.filter(function (e) {
        return isNaN(e) && !oe.prototype.hasOwnProperty(e);
      })).length)) {
        var t = oe.prototype.length || 0;
        0 !== t ? oe.prototype.length = t + e.length : Object.defineProperty(oe.prototype, "length", {
          configurable: !0,
          writable: !0,
          value: e.length
        }), e.forEach(function (e, n) {
          var r = e.replace(/(webkit|ms|moz|khtml)/g, "-$1").replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
          oe.prototype[n + t] = r, Object.defineProperties(oe.prototype, o({}, e, {
            get: function get() {
              return this.getPropertyValue(r);
            },
            set: function set(e) {
              this.setProperty(r, e);
            }
          }));
        });
      }
    }(r), function (e) {
      0 >= (e = e.filter(function (e) {
        return !Ne.prototype.hasOwnProperty(e);
      })).length || e.forEach(function (e) {
        var t = e.replace(/on/, "");
        Object.defineProperty(Ne.prototype, e, {
          enumerable: !0,
          get: function get() {
            return this[76][t] || null;
          },
          set: function set(e) {
            var n = this[76][t];
            n && this.removeEventListener(t, n), this.addEventListener(t, e), this[76][t] = e;
          }
        });
      });
    }(i), t.forEach(m), (n[4] || []).forEach(function (n) {
      return e.body.appendChild(e[64](t, n));
    }), (n = e.defaultView).innerWidth = a, n.innerHeight = u, n.localStorage = O(e, 0, s), n.sessionStorage = O(e, 1, l);
  }, e.workerDOM = Vt, e;
}({});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var l=__webpack_require__(5),n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113,z=n?Symbol.for("react.memo"):60115,A=n?Symbol.for("react.lazy"):
60116,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E={};function F(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(C(85));this.updater.enqueueSetState(this,a,b,"setState")};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function G(){}G.prototype=F.prototype;function H(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}var I=H.prototype=new G;I.constructor=H;l(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,c){var e,d={},g=null,k=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,e)&&!L.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var h=Array(f),m=0;m<f;m++)h[m]=arguments[m+2];d.children=h}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return{$$typeof:p,type:a,key:g,ref:k,props:d,_owner:J.current}}
function N(a,b){return{$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,c,e){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return{result:a,keyPrefix:b,func:c,context:e,count:0}}
function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a)}
function T(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0}}if(g)return c(e,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+U(d,k);g+=T(d,f,c,e)}else if(null===a||"object"!==typeof a?f=null:(f=B&&a[B]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),k=
0;!(d=a.next()).done;)d=d.value,f=b+U(d,k++),g+=T(d,f,c,e);else if("object"===d)throw c=""+a,Error(C(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function V(a,b,c){return null==a?0:T(a,"",b,c)}function U(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function W(a,b){a.func.call(a.context,b,a.count++)}
function aa(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?X(a,e,c,function(a){return a}):null!=a&&(O(a)&&(a=N(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+c)),e.push(a))}function X(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(P,"$&/")+"/");b=R(b,g,e,d);V(a,aa,b);S(b)}var Y={current:null};function Z(){var a=Y.current;if(null===a)throw Error(C(321));return a}
var ba={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J,IsSomeRendererActing:{current:!1},assign:l};exports.Children={map:function(a,b,c){if(null==a)return a;var e=[];X(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=R(null,null,b,c);V(a,W,b);S(b)},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];X(a,b,null,function(a){return a});return b},only:function(a){if(!O(a))throw Error(C(143));return a}};
exports.Component=F;exports.Fragment=r;exports.Profiler=u;exports.PureComponent=H;exports.StrictMode=t;exports.Suspense=y;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ba;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(C(267,a));var e=l({},a.props),d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=J.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)K.call(b,h)&&!L.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=c;else if(1<h){f=Array(h);for(var m=0;m<h;m++)f[m]=arguments[m+2];e.children=f}return{$$typeof:p,type:a.type,
key:d,ref:g,props:e,_owner:k}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:x,render:a}};exports.isValidElement=O;
exports.lazy=function(a){return{$$typeof:A,_ctor:a,_status:-1,_result:null}};exports.memo=function(a,b){return{$$typeof:z,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return Z().useCallback(a,b)};exports.useContext=function(a,b){return Z().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return Z().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return Z().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return Z().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return Z().useMemo(a,b)};exports.useReducer=function(a,b,c){return Z().useReducer(a,b,c)};exports.useRef=function(a){return Z().useRef(a)};exports.useState=function(a){return Z().useState(a)};exports.version="16.13.1";


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(10);
} else {}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var k=__webpack_require__(5),l=__webpack_require__(4);function q(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var t="function"===typeof Symbol&&Symbol.for,aa=t?Symbol.for("react.portal"):60106,u=t?Symbol.for("react.fragment"):60107,ba=t?Symbol.for("react.strict_mode"):60108,ca=t?Symbol.for("react.profiler"):60114,v=t?Symbol.for("react.provider"):60109,da=t?Symbol.for("react.context"):60110,ea=t?Symbol.for("react.concurrent_mode"):60111,fa=t?Symbol.for("react.forward_ref"):60112,B=t?Symbol.for("react.suspense"):60113,ha=t?Symbol.for("react.suspense_list"):60120,ia=t?Symbol.for("react.memo"):60115,ja=t?Symbol.for("react.lazy"):
60116,ka=t?Symbol.for("react.block"):60121,la=t?Symbol.for("react.fundamental"):60117,ma=t?Symbol.for("react.scope"):60119;function na(a){if(-1===a._status){a._status=0;var b=a._ctor;b=b();a._result=b;b.then(function(c){0===a._status&&(c=c.default,a._status=1,a._result=c)},function(c){0===a._status&&(a._status=2,a._result=c)})}}
function C(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case u:return"Fragment";case aa:return"Portal";case ca:return"Profiler";case ba:return"StrictMode";case B:return"Suspense";case ha:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case da:return"Context.Consumer";case v:return"Context.Provider";case fa:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");
case ia:return C(a.type);case ka:return C(a.render);case ja:if(a=1===a._status?a._result:null)return C(a)}return null}var D=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;D.hasOwnProperty("ReactCurrentDispatcher")||(D.ReactCurrentDispatcher={current:null});D.hasOwnProperty("ReactCurrentBatchConfig")||(D.ReactCurrentBatchConfig={suspense:null});var oa={};function E(a,b){for(var c=a._threadCount|0;c<=b;c++)a[c]=a._currentValue2,a._threadCount=c+1}
function pa(a,b,c,d){if(d&&(d=a.contextType,"object"===typeof d&&null!==d))return E(d,c),d[c];if(a=a.contextTypes){c={};for(var f in a)c[f]=b[f];b=c}else b=oa;return b}for(var F=new Uint16Array(16),H=0;15>H;H++)F[H]=H+1;F[15]=0;
var qa=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ra=Object.prototype.hasOwnProperty,sa={},ta={};
function ua(a){if(ra.call(ta,a))return!0;if(ra.call(sa,a))return!1;if(qa.test(a))return ta[a]=!0;sa[a]=!0;return!1}function va(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function wa(a,b,c,d){if(null===b||"undefined"===typeof b||va(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function J(a,b,c,d,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=f;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=g}var K={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){K[a]=new J(a,0,!1,a,null,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];K[b]=new J(b,1,!1,a[1],null,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){K[a]=new J(a,2,!1,a.toLowerCase(),null,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){K[a]=new J(a,2,!1,a,null,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){K[a]=new J(a,3,!1,a.toLowerCase(),null,!1)});
["checked","multiple","muted","selected"].forEach(function(a){K[a]=new J(a,3,!0,a,null,!1)});["capture","download"].forEach(function(a){K[a]=new J(a,4,!1,a,null,!1)});["cols","rows","size","span"].forEach(function(a){K[a]=new J(a,6,!1,a,null,!1)});["rowSpan","start"].forEach(function(a){K[a]=new J(a,5,!1,a.toLowerCase(),null,!1)});var L=/[\-:]([a-z])/g;function M(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(L,
M);K[b]=new J(b,1,!1,a,null,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(L,M);K[b]=new J(b,1,!1,a,"http://www.w3.org/1999/xlink",!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(L,M);K[b]=new J(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1)});["tabIndex","crossOrigin"].forEach(function(a){K[a]=new J(a,1,!1,a.toLowerCase(),null,!1)});
K.xlinkHref=new J("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0);["src","href","action","formAction"].forEach(function(a){K[a]=new J(a,1,!1,a.toLowerCase(),null,!0)});var xa=/["'&<>]/;
function N(a){if("boolean"===typeof a||"number"===typeof a)return""+a;a=""+a;var b=xa.exec(a);if(b){var c="",d,f=0;for(d=b.index;d<a.length;d++){switch(a.charCodeAt(d)){case 34:b="&quot;";break;case 38:b="&amp;";break;case 39:b="&#x27;";break;case 60:b="&lt;";break;case 62:b="&gt;";break;default:continue}f!==d&&(c+=a.substring(f,d));f=d+1;c+=b}a=f!==d?c+a.substring(f,d):c}return a}
function ya(a,b){var c=K.hasOwnProperty(a)?K[a]:null;var d;if(d="style"!==a)d=null!==c?0===c.type:!(2<a.length)||"o"!==a[0]&&"O"!==a[0]||"n"!==a[1]&&"N"!==a[1]?!1:!0;if(d||wa(a,b,c,!1))return"";if(null!==c){a=c.attributeName;d=c.type;if(3===d||4===d&&!0===b)return a+'=""';c.sanitizeURL&&(b=""+b);return a+'="'+(N(b)+'"')}return ua(a)?a+'="'+(N(b)+'"'):""}function za(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}
var Aa="function"===typeof Object.is?Object.is:za,O=null,P=null,Q=null,R=!1,S=!1,U=null,V=0;function W(){if(null===O)throw Error(q(321));return O}function Ba(){if(0<V)throw Error(q(312));return{memoizedState:null,queue:null,next:null}}function Ca(){null===Q?null===P?(R=!1,P=Q=Ba()):(R=!0,Q=P):null===Q.next?(R=!1,Q=Q.next=Ba()):(R=!0,Q=Q.next);return Q}function Da(a,b,c,d){for(;S;)S=!1,V+=1,Q=null,c=a(b,d);P=O=null;V=0;Q=U=null;return c}function Ea(a,b){return"function"===typeof b?b(a):b}
function Fa(a,b,c){O=W();Q=Ca();if(R){var d=Q.queue;b=d.dispatch;if(null!==U&&(c=U.get(d),void 0!==c)){U.delete(d);d=Q.memoizedState;do d=a(d,c.action),c=c.next;while(null!==c);Q.memoizedState=d;return[d,b]}return[Q.memoizedState,b]}a=a===Ea?"function"===typeof b?b():b:void 0!==c?c(b):b;Q.memoizedState=a;a=Q.queue={last:null,dispatch:null};a=a.dispatch=Ga.bind(null,O,a);return[Q.memoizedState,a]}
function Ga(a,b,c){if(!(25>V))throw Error(q(301));if(a===O)if(S=!0,a={action:c,next:null},null===U&&(U=new Map),c=U.get(b),void 0===c)U.set(b,a);else{for(b=c;null!==b.next;)b=b.next;b.next=a}}function Ha(){}
var X=0,Ia={readContext:function(a){var b=X;E(a,b);return a[b]},useContext:function(a){W();var b=X;E(a,b);return a[b]},useMemo:function(a,b){O=W();Q=Ca();b=void 0===b?null:b;if(null!==Q){var c=Q.memoizedState;if(null!==c&&null!==b){a:{var d=c[1];if(null===d)d=!1;else{for(var f=0;f<d.length&&f<b.length;f++)if(!Aa(b[f],d[f])){d=!1;break a}d=!0}}if(d)return c[0]}}a=a();Q.memoizedState=[a,b];return a},useReducer:Fa,useRef:function(a){O=W();Q=Ca();var b=Q.memoizedState;return null===b?(a={current:a},Q.memoizedState=
a):b},useState:function(a){return Fa(Ea,a)},useLayoutEffect:function(){},useCallback:function(a){return a},useImperativeHandle:Ha,useEffect:Ha,useDebugValue:Ha,useResponder:function(a,b){return{props:b,responder:a}},useDeferredValue:function(a){W();return a},useTransition:function(){W();return[function(a){a()},!1]}},Ja={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Ka(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
var La={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},Ma=k({menuitem:!0},La),Y={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,
gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Na=["Webkit","ms","Moz","O"];Object.keys(Y).forEach(function(a){Na.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Y[b]=Y[a]})});
var Oa=/([A-Z])/g,Pa=/^ms-/,Z=l.Children.toArray,Qa=D.ReactCurrentDispatcher,Ra={listing:!0,pre:!0,textarea:!0},Sa=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,Ta={},Ua={};function Va(a){if(void 0===a||null===a)return a;var b="";l.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}var Wa=Object.prototype.hasOwnProperty,Xa={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null,suppressHydrationWarning:null};function Ya(a,b){if(void 0===a)throw Error(q(152,C(b)||"Component"));}
function Za(a,b,c){function d(d,g){var e=g.prototype&&g.prototype.isReactComponent,f=pa(g,b,c,e),x=[],h=!1,m={isMounted:function(){return!1},enqueueForceUpdate:function(){if(null===x)return null},enqueueReplaceState:function(a,c){h=!0;x=[c]},enqueueSetState:function(a,c){if(null===x)return null;x.push(c)}};if(e){if(e=new g(d.props,f,m),"function"===typeof g.getDerivedStateFromProps){var w=g.getDerivedStateFromProps.call(null,d.props,e.state);null!=w&&(e.state=k({},e.state,w))}}else if(O={},e=g(d.props,
f,m),e=Da(g,d.props,e,f),null==e||null==e.render){a=e;Ya(a,g);return}e.props=d.props;e.context=f;e.updater=m;m=e.state;void 0===m&&(e.state=m=null);if("function"===typeof e.UNSAFE_componentWillMount||"function"===typeof e.componentWillMount)if("function"===typeof e.componentWillMount&&"function"!==typeof g.getDerivedStateFromProps&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&"function"!==typeof g.getDerivedStateFromProps&&e.UNSAFE_componentWillMount(),x.length){m=x;var r=
h;x=null;h=!1;if(r&&1===m.length)e.state=m[0];else{w=r?m[0]:e.state;var y=!0;for(r=r?1:0;r<m.length;r++){var p=m[r];p="function"===typeof p?p.call(e,w,d.props,f):p;null!=p&&(y?(y=!1,w=k({},w,p)):k(w,p))}e.state=w}}else x=null;a=e.render();Ya(a,g);if("function"===typeof e.getChildContext&&(d=g.childContextTypes,"object"===typeof d)){var A=e.getChildContext();for(var T in A)if(!(T in d))throw Error(q(108,C(g)||"Unknown",T));}A&&(b=k({},b,A))}for(;l.isValidElement(a);){var f=a,g=f.type;if("function"!==
typeof g)break;d(f,g)}return{child:a,context:b}}
var $a=function(){function a(a,b){l.isValidElement(a)?a.type!==u?a=[a]:(a=a.props.children,a=l.isValidElement(a)?[a]:Z(a)):a=Z(a);a={type:null,domNamespace:Ja.html,children:a,childIndex:0,context:oa,footer:""};var c=F[0];if(0===c){var g=F;c=g.length;var d=2*c;if(!(65536>=d))throw Error(q(304));var h=new Uint16Array(d);h.set(g);F=h;F[0]=c+1;for(g=c;g<d-1;g++)F[g]=g+1;F[d-1]=0}else F[0]=F[c];this.threadID=c;this.stack=[a];this.exhausted=!1;this.currentSelectValue=null;this.previousWasTextNode=!1;this.makeStaticMarkup=
b;this.suspenseDepth=0;this.contextIndex=-1;this.contextStack=[];this.contextValueStack=[]}var b=a.prototype;b.destroy=function(){if(!this.exhausted){this.exhausted=!0;this.clearProviders();var a=this.threadID;F[a]=F[0];F[0]=a}};b.pushProvider=function(a){var c=++this.contextIndex,b=a.type._context,g=this.threadID;E(b,g);var x=b[g];this.contextStack[c]=b;this.contextValueStack[c]=x;b[g]=a.props.value};b.popProvider=function(){var a=this.contextIndex,b=this.contextStack[a],f=this.contextValueStack[a];
this.contextStack[a]=null;this.contextValueStack[a]=null;this.contextIndex--;b[this.threadID]=f};b.clearProviders=function(){for(var a=this.contextIndex;0<=a;a--)this.contextStack[a][this.threadID]=this.contextValueStack[a]};b.read=function(a){if(this.exhausted)return null;var b=X;X=this.threadID;var c=Qa.current;Qa.current=Ia;try{for(var g=[""],x=!1;g[0].length<a;){if(0===this.stack.length){this.exhausted=!0;var h=this.threadID;F[h]=F[0];F[0]=h;break}var e=this.stack[this.stack.length-1];if(x||e.childIndex>=
e.children.length){var I=e.footer;""!==I&&(this.previousWasTextNode=!1);this.stack.pop();if("select"===e.type)this.currentSelectValue=null;else if(null!=e.type&&null!=e.type.type&&e.type.type.$$typeof===v)this.popProvider(e.type);else if(e.type===B){this.suspenseDepth--;var G=g.pop();if(x){x=!1;var n=e.fallbackFrame;if(!n)throw Error(q(303));this.stack.push(n);g[this.suspenseDepth]+="\x3c!--$!--\x3e";continue}else g[this.suspenseDepth]+=G}g[this.suspenseDepth]+=I}else{var m=e.children[e.childIndex++],
w="";try{w+=this.render(m,e.context,e.domNamespace)}catch(r){if(null!=r&&"function"===typeof r.then)throw Error(q(294));throw r;}finally{}g.length<=this.suspenseDepth&&g.push("");g[this.suspenseDepth]+=w}}return g[0]}finally{Qa.current=c,X=b}};b.render=function(a,b,f){if("string"===typeof a||"number"===typeof a){f=""+a;if(""===f)return"";if(this.makeStaticMarkup)return N(f);if(this.previousWasTextNode)return"\x3c!-- --\x3e"+N(f);this.previousWasTextNode=!0;return N(f)}b=Za(a,b,this.threadID);a=b.child;
b=b.context;if(null===a||!1===a)return"";if(!l.isValidElement(a)){if(null!=a&&null!=a.$$typeof){f=a.$$typeof;if(f===aa)throw Error(q(257));throw Error(q(258,f.toString()));}a=Z(a);this.stack.push({type:null,domNamespace:f,children:a,childIndex:0,context:b,footer:""});return""}var c=a.type;if("string"===typeof c)return this.renderDOM(a,b,f);switch(c){case ba:case ea:case ca:case ha:case u:return a=Z(a.props.children),this.stack.push({type:null,domNamespace:f,children:a,childIndex:0,context:b,footer:""}),
"";case B:throw Error(q(294));}if("object"===typeof c&&null!==c)switch(c.$$typeof){case fa:O={};var d=c.render(a.props,a.ref);d=Da(c.render,a.props,d,a.ref);d=Z(d);this.stack.push({type:null,domNamespace:f,children:d,childIndex:0,context:b,footer:""});return"";case ia:return a=[l.createElement(c.type,k({ref:a.ref},a.props))],this.stack.push({type:null,domNamespace:f,children:a,childIndex:0,context:b,footer:""}),"";case v:return c=Z(a.props.children),f={type:a,domNamespace:f,children:c,childIndex:0,
context:b,footer:""},this.pushProvider(a),this.stack.push(f),"";case da:c=a.type;d=a.props;var h=this.threadID;E(c,h);c=Z(d.children(c[h]));this.stack.push({type:a,domNamespace:f,children:c,childIndex:0,context:b,footer:""});return"";case la:throw Error(q(338));case ja:switch(c=a.type,na(c),c._status){case 1:return a=[l.createElement(c._result,k({ref:a.ref},a.props))],this.stack.push({type:null,domNamespace:f,children:a,childIndex:0,context:b,footer:""}),"";case 2:throw c._result;default:throw Error(q(295));
}case ma:throw Error(q(343));}throw Error(q(130,null==c?c:typeof c,""));};b.renderDOM=function(a,b,f){var c=a.type.toLowerCase();f===Ja.html&&Ka(c);if(!Ta.hasOwnProperty(c)){if(!Sa.test(c))throw Error(q(65,c));Ta[c]=!0}var d=a.props;if("input"===c)d=k({type:void 0},d,{defaultChecked:void 0,defaultValue:void 0,value:null!=d.value?d.value:d.defaultValue,checked:null!=d.checked?d.checked:d.defaultChecked});else if("textarea"===c){var h=d.value;if(null==h){h=d.defaultValue;var e=d.children;if(null!=e){if(null!=
h)throw Error(q(92));if(Array.isArray(e)){if(!(1>=e.length))throw Error(q(93));e=e[0]}h=""+e}null==h&&(h="")}d=k({},d,{value:void 0,children:""+h})}else if("select"===c)this.currentSelectValue=null!=d.value?d.value:d.defaultValue,d=k({},d,{value:void 0});else if("option"===c){e=this.currentSelectValue;var I=Va(d.children);if(null!=e){var G=null!=d.value?d.value+"":I;h=!1;if(Array.isArray(e))for(var n=0;n<e.length;n++){if(""+e[n]===G){h=!0;break}}else h=""+e===G;d=k({selected:void 0,children:void 0},
d,{selected:h,children:I})}}if(h=d){if(Ma[c]&&(null!=h.children||null!=h.dangerouslySetInnerHTML))throw Error(q(137,c,""));if(null!=h.dangerouslySetInnerHTML){if(null!=h.children)throw Error(q(60));if(!("object"===typeof h.dangerouslySetInnerHTML&&"__html"in h.dangerouslySetInnerHTML))throw Error(q(61));}if(null!=h.style&&"object"!==typeof h.style)throw Error(q(62,""));}h=d;e=this.makeStaticMarkup;I=1===this.stack.length;G="<"+a.type;for(z in h)if(Wa.call(h,z)){var m=h[z];if(null!=m){if("style"===
z){n=void 0;var w="",r="";for(n in m)if(m.hasOwnProperty(n)){var y=0===n.indexOf("--"),p=m[n];if(null!=p){if(y)var A=n;else if(A=n,Ua.hasOwnProperty(A))A=Ua[A];else{var T=A.replace(Oa,"-$1").toLowerCase().replace(Pa,"-ms-");A=Ua[A]=T}w+=r+A+":";r=n;y=null==p||"boolean"===typeof p||""===p?"":y||"number"!==typeof p||0===p||Y.hasOwnProperty(r)&&Y[r]?(""+p).trim():p+"px";w+=y;r=";"}}m=w||null}n=null;b:if(y=c,p=h,-1===y.indexOf("-"))y="string"===typeof p.is;else switch(y){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":y=
!1;break b;default:y=!0}y?Xa.hasOwnProperty(z)||(n=z,n=ua(n)&&null!=m?n+'="'+(N(m)+'"'):""):n=ya(z,m);n&&(G+=" "+n)}}e||I&&(G+=' data-reactroot=""');var z=G;h="";La.hasOwnProperty(c)?z+="/>":(z+=">",h="</"+a.type+">");a:{e=d.dangerouslySetInnerHTML;if(null!=e){if(null!=e.__html){e=e.__html;break a}}else if(e=d.children,"string"===typeof e||"number"===typeof e){e=N(e);break a}e=null}null!=e?(d=[],Ra.hasOwnProperty(c)&&"\n"===e.charAt(0)&&(z+="\n"),z+=e):d=Z(d.children);a=a.type;f=null==f||"http://www.w3.org/1999/xhtml"===
f?Ka(a):"http://www.w3.org/2000/svg"===f&&"foreignObject"===a?"http://www.w3.org/1999/xhtml":f;this.stack.push({domNamespace:f,type:c,children:d,childIndex:0,context:b,footer:h});this.previousWasTextNode=!1;return z};return a}(),ab={renderToString:function(a){a=new $a(a,!1);try{return a.read(Infinity)}finally{a.destroy()}},renderToStaticMarkup:function(a){a=new $a(a,!0);try{return a.read(Infinity)}finally{a.destroy()}},renderToNodeStream:function(){throw Error(q(207));},renderToStaticNodeStream:function(){throw Error(q(208));
},version:"16.13.1"};module.exports=ab.default||ab;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * pretty <https://github.com/jonschlinkert/pretty>
 *
 * Copyright (c) 2013-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */


var beautify = __webpack_require__(12);

var condense = __webpack_require__(14);

var extend = __webpack_require__(6);

var defaults = {
  unformatted: ['code', 'pre', 'em', 'strong', 'span'],
  indent_inner_html: true,
  indent_char: ' ',
  indent_size: 2,
  sep: '\n'
};

module.exports = function pretty(str, options) {
  var opts = extend({}, defaults, options);
  str = beautify.html(str, opts);

  if (opts.ocd === true) {
    if (opts.newlines) opts.sep = opts.newlines;
    return ocd(str, opts);
  }

  return str;
};

function ocd(str, options) {
  // Normalize and condense all newlines
  return condense(str, options) // Remove empty whitespace the top of a file.
  .replace(/^\s+/g, '') // Remove extra whitespace from eof
  .replace(/\s+$/g, '\n') // Add a space above each comment
  .replace(/(\s*<!--)/g, '\n$1') // Bring closing comments up to the same line as closing tag.
  .replace(/>(\s*)(?=<!--\s*\/)/g, '> ');
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint node:true */

/* globals define */

/*
  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

/**
The following batches are equivalent:

var beautify_js = require('js-beautify');
var beautify_js = require('js-beautify').js;
var beautify_js = require('js-beautify').js_beautify;

var beautify_css = require('js-beautify').css;
var beautify_css = require('js-beautify').css_beautify;

var beautify_html = require('js-beautify').html;
var beautify_html = require('js-beautify').html_beautify;

All methods returned accept two arguments, the source string and an options object.
**/

function get_beautify(js_beautify, css_beautify, html_beautify) {
  // the default is js
  var beautify = function beautify(src, config) {
    return js_beautify.js_beautify(src, config);
  }; // short aliases


  beautify.js = js_beautify.js_beautify;
  beautify.css = css_beautify.css_beautify;
  beautify.html = html_beautify.html_beautify; // legacy aliases

  beautify.js_beautify = js_beautify.js_beautify;
  beautify.css_beautify = css_beautify.css_beautify;
  beautify.html_beautify = html_beautify.html_beautify;
  return beautify;
}

if (true) {
  // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (js_beautify, css_beautify, html_beautify) {
    return get_beautify(js_beautify, css_beautify, html_beautify);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* AUTO-GENERATED. DO NOT MODIFY. */

/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@beautifier.io>
    https://beautifier.io/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    inline (defaults to inline tags) - list of tags to be considered inline tags
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    content_unformatted (defaults to ["pre", "textarea"] tags) - list of tags, whose content shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/
(function () {
  /* GENERATED_BUILD_OUTPUT */
  var legacy_beautify_html =
  /******/
  function (modules) {
    // webpackBootstrap

    /******/
    // The module cache

    /******/
    var installedModules = {};
    /******/

    /******/
    // The require function

    /******/

    function __webpack_require__(moduleId) {
      /******/

      /******/
      // Check if module is in cache

      /******/
      if (installedModules[moduleId]) {
        /******/
        return installedModules[moduleId].exports;
        /******/
      }
      /******/
      // Create a new module (and put it into the cache)

      /******/


      var module = installedModules[moduleId] = {
        /******/
        i: moduleId,

        /******/
        l: false,

        /******/
        exports: {}
        /******/

      };
      /******/

      /******/
      // Execute the module function

      /******/

      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/

      /******/
      // Flag the module as loaded

      /******/

      module.l = true;
      /******/

      /******/
      // Return the exports of the module

      /******/

      return module.exports;
      /******/
    }
    /******/

    /******/

    /******/
    // expose the modules object (__webpack_modules__)

    /******/


    __webpack_require__.m = modules;
    /******/

    /******/
    // expose the module cache

    /******/

    __webpack_require__.c = installedModules;
    /******/

    /******/
    // define getter function for harmony exports

    /******/

    __webpack_require__.d = function (exports, name, getter) {
      /******/
      if (!__webpack_require__.o(exports, name)) {
        /******/
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/

    };
    /******/

    /******/
    // define __esModule on exports

    /******/


    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

    /******/
    // create a fake namespace object

    /******/
    // mode & 1: value is a module id, require it

    /******/
    // mode & 2: merge all properties of value into the ns

    /******/
    // mode & 4: return value when already ns object

    /******/
    // mode & 8|1: behave like require

    /******/


    __webpack_require__.t = function (value, mode) {
      /******/
      if (mode & 1) value = __webpack_require__(value);
      /******/

      if (mode & 8) return value;
      /******/

      if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/

      var ns = Object.create(null);
      /******/

      __webpack_require__.r(ns);
      /******/


      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });
      /******/

      if (mode & 2 && typeof value != 'string') for (var key in value) {
        __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
      }
      /******/

      return ns;
      /******/
    };
    /******/

    /******/
    // getDefaultExport function for compatibility with non-harmony modules

    /******/


    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
      /******/
      function getDefault() {
        return module['default'];
      } :
      /******/
      function getModuleExports() {
        return module;
      };
      /******/

      __webpack_require__.d(getter, 'a', getter);
      /******/


      return getter;
      /******/
    };
    /******/

    /******/
    // Object.prototype.hasOwnProperty.call

    /******/


    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/

    /******/
    // __webpack_public_path__

    /******/


    __webpack_require__.p = "";
    /******/

    /******/

    /******/
    // Load entry module and return exports

    /******/

    return __webpack_require__(__webpack_require__.s = 18);
    /******/
  }(
  /************************************************************************/

  /******/
  [,,
  /* 0 */

  /* 1 */

  /* 2 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function OutputLine(parent) {
      this.__parent = parent;
      this.__character_count = 0; // use indent_count as a marker for this.__lines that have preserved indentation

      this.__indent_count = -1;
      this.__alignment_count = 0;
      this.__wrap_point_index = 0;
      this.__wrap_point_character_count = 0;
      this.__wrap_point_indent_count = -1;
      this.__wrap_point_alignment_count = 0;
      this.__items = [];
    }

    OutputLine.prototype.clone_empty = function () {
      var line = new OutputLine(this.__parent);
      line.set_indent(this.__indent_count, this.__alignment_count);
      return line;
    };

    OutputLine.prototype.item = function (index) {
      if (index < 0) {
        return this.__items[this.__items.length + index];
      } else {
        return this.__items[index];
      }
    };

    OutputLine.prototype.has_match = function (pattern) {
      for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
        if (this.__items[lastCheckedOutput].match(pattern)) {
          return true;
        }
      }

      return false;
    };

    OutputLine.prototype.set_indent = function (indent, alignment) {
      if (this.is_empty()) {
        this.__indent_count = indent || 0;
        this.__alignment_count = alignment || 0;
        this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
      }
    };

    OutputLine.prototype._set_wrap_point = function () {
      if (this.__parent.wrap_line_length) {
        this.__wrap_point_index = this.__items.length;
        this.__wrap_point_character_count = this.__character_count;
        this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
        this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
      }
    };

    OutputLine.prototype._should_wrap = function () {
      return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
    };

    OutputLine.prototype._allow_wrap = function () {
      if (this._should_wrap()) {
        this.__parent.add_new_line();

        var next = this.__parent.current_line;
        next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
        next.__items = this.__items.slice(this.__wrap_point_index);
        this.__items = this.__items.slice(0, this.__wrap_point_index);
        next.__character_count += this.__character_count - this.__wrap_point_character_count;
        this.__character_count = this.__wrap_point_character_count;

        if (next.__items[0] === " ") {
          next.__items.splice(0, 1);

          next.__character_count -= 1;
        }

        return true;
      }

      return false;
    };

    OutputLine.prototype.is_empty = function () {
      return this.__items.length === 0;
    };

    OutputLine.prototype.last = function () {
      if (!this.is_empty()) {
        return this.__items[this.__items.length - 1];
      } else {
        return null;
      }
    };

    OutputLine.prototype.push = function (item) {
      this.__items.push(item);

      var last_newline_index = item.lastIndexOf('\n');

      if (last_newline_index !== -1) {
        this.__character_count = item.length - last_newline_index;
      } else {
        this.__character_count += item.length;
      }
    };

    OutputLine.prototype.pop = function () {
      var item = null;

      if (!this.is_empty()) {
        item = this.__items.pop();
        this.__character_count -= item.length;
      }

      return item;
    };

    OutputLine.prototype._remove_indent = function () {
      if (this.__indent_count > 0) {
        this.__indent_count -= 1;
        this.__character_count -= this.__parent.indent_size;
      }
    };

    OutputLine.prototype._remove_wrap_indent = function () {
      if (this.__wrap_point_indent_count > 0) {
        this.__wrap_point_indent_count -= 1;
      }
    };

    OutputLine.prototype.trim = function () {
      while (this.last() === ' ') {
        this.__items.pop();

        this.__character_count -= 1;
      }
    };

    OutputLine.prototype.toString = function () {
      var result = '';

      if (this.is_empty()) {
        if (this.__parent.indent_empty_lines) {
          result = this.__parent.get_indent_string(this.__indent_count);
        }
      } else {
        result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
        result += this.__items.join('');
      }

      return result;
    };

    function IndentStringCache(options, baseIndentString) {
      this.__cache = [''];
      this.__indent_size = options.indent_size;
      this.__indent_string = options.indent_char;

      if (!options.indent_with_tabs) {
        this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
      } // Set to null to continue support for auto detection of base indent


      baseIndentString = baseIndentString || '';

      if (options.indent_level > 0) {
        baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
      }

      this.__base_string = baseIndentString;
      this.__base_string_length = baseIndentString.length;
    }

    IndentStringCache.prototype.get_indent_size = function (indent, column) {
      var result = this.__base_string_length;
      column = column || 0;

      if (indent < 0) {
        result = 0;
      }

      result += indent * this.__indent_size;
      result += column;
      return result;
    };

    IndentStringCache.prototype.get_indent_string = function (indent_level, column) {
      var result = this.__base_string;
      column = column || 0;

      if (indent_level < 0) {
        indent_level = 0;
        result = '';
      }

      column += indent_level * this.__indent_size;

      this.__ensure_cache(column);

      result += this.__cache[column];
      return result;
    };

    IndentStringCache.prototype.__ensure_cache = function (column) {
      while (column >= this.__cache.length) {
        this.__add_column();
      }
    };

    IndentStringCache.prototype.__add_column = function () {
      var column = this.__cache.length;
      var indent = 0;
      var result = '';

      if (this.__indent_size && column >= this.__indent_size) {
        indent = Math.floor(column / this.__indent_size);
        column -= indent * this.__indent_size;
        result = new Array(indent + 1).join(this.__indent_string);
      }

      if (column) {
        result += new Array(column + 1).join(' ');
      }

      this.__cache.push(result);
    };

    function Output(options, baseIndentString) {
      this.__indent_cache = new IndentStringCache(options, baseIndentString);
      this.raw = false;
      this._end_with_newline = options.end_with_newline;
      this.indent_size = options.indent_size;
      this.wrap_line_length = options.wrap_line_length;
      this.indent_empty_lines = options.indent_empty_lines;
      this.__lines = [];
      this.previous_line = null;
      this.current_line = null;
      this.next_line = new OutputLine(this);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false; // initialize

      this.__add_outputline();
    }

    Output.prototype.__add_outputline = function () {
      this.previous_line = this.current_line;
      this.current_line = this.next_line.clone_empty();

      this.__lines.push(this.current_line);
    };

    Output.prototype.get_line_number = function () {
      return this.__lines.length;
    };

    Output.prototype.get_indent_string = function (indent, column) {
      return this.__indent_cache.get_indent_string(indent, column);
    };

    Output.prototype.get_indent_size = function (indent, column) {
      return this.__indent_cache.get_indent_size(indent, column);
    };

    Output.prototype.is_empty = function () {
      return !this.previous_line && this.current_line.is_empty();
    };

    Output.prototype.add_new_line = function (force_newline) {
      // never newline at the start of file
      // otherwise, newline only if we didn't just add one or we're forced
      if (this.is_empty() || !force_newline && this.just_added_newline()) {
        return false;
      } // if raw output is enabled, don't print additional newlines,
      // but still return True as though you had


      if (!this.raw) {
        this.__add_outputline();
      }

      return true;
    };

    Output.prototype.get_code = function (eol) {
      this.trim(true); // handle some edge cases where the last tokens
      // has text that ends with newline(s)

      var last_item = this.current_line.pop();

      if (last_item) {
        if (last_item[last_item.length - 1] === '\n') {
          last_item = last_item.replace(/\n+$/g, '');
        }

        this.current_line.push(last_item);
      }

      if (this._end_with_newline) {
        this.__add_outputline();
      }

      var sweet_code = this.__lines.join('\n');

      if (eol !== '\n') {
        sweet_code = sweet_code.replace(/[\n]/g, eol);
      }

      return sweet_code;
    };

    Output.prototype.set_wrap_point = function () {
      this.current_line._set_wrap_point();
    };

    Output.prototype.set_indent = function (indent, alignment) {
      indent = indent || 0;
      alignment = alignment || 0; // Next line stores alignment values

      this.next_line.set_indent(indent, alignment); // Never indent your first output indent at the start of the file

      if (this.__lines.length > 1) {
        this.current_line.set_indent(indent, alignment);
        return true;
      }

      this.current_line.set_indent();
      return false;
    };

    Output.prototype.add_raw_token = function (token) {
      for (var x = 0; x < token.newlines; x++) {
        this.__add_outputline();
      }

      this.current_line.set_indent(-1);
      this.current_line.push(token.whitespace_before);
      this.current_line.push(token.text);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
    };

    Output.prototype.add_token = function (printable_token) {
      this.__add_space_before_token();

      this.current_line.push(printable_token);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = this.current_line._allow_wrap();
    };

    Output.prototype.__add_space_before_token = function () {
      if (this.space_before_token && !this.just_added_newline()) {
        if (!this.non_breaking_space) {
          this.set_wrap_point();
        }

        this.current_line.push(' ');
      }
    };

    Output.prototype.remove_indent = function (index) {
      var output_length = this.__lines.length;

      while (index < output_length) {
        this.__lines[index]._remove_indent();

        index++;
      }

      this.current_line._remove_wrap_indent();
    };

    Output.prototype.trim = function (eat_newlines) {
      eat_newlines = eat_newlines === undefined ? false : eat_newlines;
      this.current_line.trim();

      while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
        this.__lines.pop();

        this.current_line = this.__lines[this.__lines.length - 1];
        this.current_line.trim();
      }

      this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
    };

    Output.prototype.just_added_newline = function () {
      return this.current_line.is_empty();
    };

    Output.prototype.just_added_blankline = function () {
      return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
    };

    Output.prototype.ensure_empty_line_above = function (starts_with, ends_with) {
      var index = this.__lines.length - 2;

      while (index >= 0) {
        var potentialEmptyLine = this.__lines[index];

        if (potentialEmptyLine.is_empty()) {
          break;
        } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
          this.__lines.splice(index + 1, 0, new OutputLine(this));

          this.previous_line = this.__lines[this.__lines.length - 2];
          break;
        }

        index--;
      }
    };

    module.exports.Output = Output;
    /***/
  },
  /* 3 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Token(type, text, newlines, whitespace_before) {
      this.type = type;
      this.text = text; // comments_before are
      // comments that have a new line before them
      // and may or may not have a newline after
      // this is a set of comments before

      this.comments_before = null;
      /* inline comment*/
      // this.comments_after =  new TokenStream(); // no new line before and newline after

      this.newlines = newlines || 0;
      this.whitespace_before = whitespace_before || '';
      this.parent = null;
      this.next = null;
      this.previous = null;
      this.opened = null;
      this.closed = null;
      this.directives = null;
    }

    module.exports.Token = Token;
    /***/
  },,,
  /* 4 */

  /* 5 */

  /* 6 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Options(options, merge_child_field) {
      this.raw_options = _mergeOpts(options, merge_child_field); // Support passing the source text back with no change

      this.disabled = this._get_boolean('disabled');
      this.eol = this._get_characters('eol', 'auto');
      this.end_with_newline = this._get_boolean('end_with_newline');
      this.indent_size = this._get_number('indent_size', 4);
      this.indent_char = this._get_characters('indent_char', ' ');
      this.indent_level = this._get_number('indent_level');
      this.preserve_newlines = this._get_boolean('preserve_newlines', true);
      this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);

      if (!this.preserve_newlines) {
        this.max_preserve_newlines = 0;
      }

      this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');

      if (this.indent_with_tabs) {
        this.indent_char = '\t'; // indent_size behavior changed after 1.8.6
        // It used to be that indent_size would be
        // set to 1 for indent_with_tabs. That is no longer needed and
        // actually doesn't make sense - why not use spaces? Further,
        // that might produce unexpected behavior - tabs being used
        // for single-column alignment. So, when indent_with_tabs is true
        // and indent_size is 1, reset indent_size to 4.

        if (this.indent_size === 1) {
          this.indent_size = 4;
        }
      } // Backwards compat with 1.3.x


      this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
      this.indent_empty_lines = this._get_boolean('indent_empty_lines'); // valid templating languages ['django', 'erb', 'handlebars', 'php']
      // For now, 'auto' = all off for javascript, all on for html (and inline javascript).
      // other values ignored

      this.templating = this._get_selection_list('templating', ['auto', 'none', 'django', 'erb', 'handlebars', 'php'], ['auto']);
    }

    Options.prototype._get_array = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || [];

      if (typeof option_value === 'object') {
        if (option_value !== null && typeof option_value.concat === 'function') {
          result = option_value.concat();
        }
      } else if (typeof option_value === 'string') {
        result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
      }

      return result;
    };

    Options.prototype._get_boolean = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = option_value === undefined ? !!default_value : !!option_value;
      return result;
    };

    Options.prototype._get_characters = function (name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || '';

      if (typeof option_value === 'string') {
        result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
      }

      return result;
    };

    Options.prototype._get_number = function (name, default_value) {
      var option_value = this.raw_options[name];
      default_value = parseInt(default_value, 10);

      if (isNaN(default_value)) {
        default_value = 0;
      }

      var result = parseInt(option_value, 10);

      if (isNaN(result)) {
        result = default_value;
      }

      return result;
    };

    Options.prototype._get_selection = function (name, selection_list, default_value) {
      var result = this._get_selection_list(name, selection_list, default_value);

      if (result.length !== 1) {
        throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result[0];
    };

    Options.prototype._get_selection_list = function (name, selection_list, default_value) {
      if (!selection_list || selection_list.length === 0) {
        throw new Error("Selection list cannot be empty.");
      }

      default_value = default_value || [selection_list[0]];

      if (!this._is_valid_selection(default_value, selection_list)) {
        throw new Error("Invalid Default Value!");
      }

      var result = this._get_array(name, default_value);

      if (!this._is_valid_selection(result, selection_list)) {
        throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }

      return result;
    };

    Options.prototype._is_valid_selection = function (result, selection_list) {
      return result.length && selection_list.length && !result.some(function (item) {
        return selection_list.indexOf(item) === -1;
      });
    }; // merges child options up with the parent options object
    // Example: obj = {a: 1, b: {a: 2}}
    //          mergeOpts(obj, 'b')
    //
    //          Returns: {a: 2}


    function _mergeOpts(allOptions, childFieldName) {
      var finalOpts = {};
      allOptions = _normalizeOpts(allOptions);
      var name;

      for (name in allOptions) {
        if (name !== childFieldName) {
          finalOpts[name] = allOptions[name];
        }
      } //merge in the per type settings for the childFieldName


      if (childFieldName && allOptions[childFieldName]) {
        for (name in allOptions[childFieldName]) {
          finalOpts[name] = allOptions[childFieldName][name];
        }
      }

      return finalOpts;
    }

    function _normalizeOpts(options) {
      var convertedOpts = {};
      var key;

      for (key in options) {
        var newKey = key.replace(/-/g, "_");
        convertedOpts[newKey] = options[key];
      }

      return convertedOpts;
    }

    module.exports.Options = Options;
    module.exports.normalizeOpts = _normalizeOpts;
    module.exports.mergeOpts = _mergeOpts;
    /***/
  },,
  /* 7 */

  /* 8 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');

    function InputScanner(input_string) {
      this.__input = input_string || '';
      this.__input_length = this.__input.length;
      this.__position = 0;
    }

    InputScanner.prototype.restart = function () {
      this.__position = 0;
    };

    InputScanner.prototype.back = function () {
      if (this.__position > 0) {
        this.__position -= 1;
      }
    };

    InputScanner.prototype.hasNext = function () {
      return this.__position < this.__input_length;
    };

    InputScanner.prototype.next = function () {
      var val = null;

      if (this.hasNext()) {
        val = this.__input.charAt(this.__position);
        this.__position += 1;
      }

      return val;
    };

    InputScanner.prototype.peek = function (index) {
      var val = null;
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        val = this.__input.charAt(index);
      }

      return val;
    }; // This is a JavaScript only helper function (not in python)
    // Javascript doesn't have a match method
    // and not all implementation support "sticky" flag.
    // If they do not support sticky then both this.match() and this.test() method
    // must get the match and check the index of the match.
    // If sticky is supported and set, this method will use it.
    // Otherwise it will check that global is set, and fall back to the slower method.


    InputScanner.prototype.__match = function (pattern, index) {
      pattern.lastIndex = index;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
        if (pattern_match.index !== index) {
          pattern_match = null;
        }
      }

      return pattern_match;
    };

    InputScanner.prototype.test = function (pattern, index) {
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__input_length) {
        return !!this.__match(pattern, index);
      } else {
        return false;
      }
    };

    InputScanner.prototype.testChar = function (pattern, index) {
      // test one character regex match
      var val = this.peek(index);
      pattern.lastIndex = 0;
      return val !== null && pattern.test(val);
    };

    InputScanner.prototype.match = function (pattern) {
      var pattern_match = this.__match(pattern, this.__position);

      if (pattern_match) {
        this.__position += pattern_match[0].length;
      } else {
        pattern_match = null;
      }

      return pattern_match;
    };

    InputScanner.prototype.read = function (starting_pattern, until_pattern, until_after) {
      var val = '';
      var match;

      if (starting_pattern) {
        match = this.match(starting_pattern);

        if (match) {
          val += match[0];
        }
      }

      if (until_pattern && (match || !starting_pattern)) {
        val += this.readUntil(until_pattern, until_after);
      }

      return val;
    };

    InputScanner.prototype.readUntil = function (pattern, until_after) {
      var val = '';
      var match_index = this.__position;
      pattern.lastIndex = this.__position;
      var pattern_match = pattern.exec(this.__input);

      if (pattern_match) {
        match_index = pattern_match.index;

        if (until_after) {
          match_index += pattern_match[0].length;
        }
      } else {
        match_index = this.__input_length;
      }

      val = this.__input.substring(this.__position, match_index);
      this.__position = match_index;
      return val;
    };

    InputScanner.prototype.readUntilAfter = function (pattern) {
      return this.readUntil(pattern, true);
    };

    InputScanner.prototype.get_regexp = function (pattern, match_from) {
      var result = null;
      var flags = 'g';

      if (match_from && regexp_has_sticky) {
        flags = 'y';
      } // strings are converted to regexp


      if (typeof pattern === "string" && pattern !== '') {
        // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
        result = new RegExp(pattern, flags);
      } else if (pattern) {
        result = new RegExp(pattern.source, flags);
      }

      return result;
    };

    InputScanner.prototype.get_literal_regexp = function (literal_string) {
      return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    };
    /* css beautifier legacy helpers */


    InputScanner.prototype.peekUntilAfter = function (pattern) {
      var start = this.__position;
      var val = this.readUntilAfter(pattern);
      this.__position = start;
      return val;
    };

    InputScanner.prototype.lookBack = function (testVal) {
      var start = this.__position - 1;
      return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
    };

    module.exports.InputScanner = InputScanner;
    /***/
  },
  /* 9 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var InputScanner = __webpack_require__(8).InputScanner;

    var Token = __webpack_require__(3).Token;

    var TokenStream = __webpack_require__(10).TokenStream;

    var WhitespacePattern = __webpack_require__(11).WhitespacePattern;

    var TOKEN = {
      START: 'TK_START',
      RAW: 'TK_RAW',
      EOF: 'TK_EOF'
    };

    var Tokenizer = function Tokenizer(input_string, options) {
      this._input = new InputScanner(input_string);
      this._options = options || {};
      this.__tokens = null;
      this._patterns = {};
      this._patterns.whitespace = new WhitespacePattern(this._input);
    };

    Tokenizer.prototype.tokenize = function () {
      this._input.restart();

      this.__tokens = new TokenStream();

      this._reset();

      var current;
      var previous = new Token(TOKEN.START, '');
      var open_token = null;
      var open_stack = [];
      var comments = new TokenStream();

      while (previous.type !== TOKEN.EOF) {
        current = this._get_next_token(previous, open_token);

        while (this._is_comment(current)) {
          comments.add(current);
          current = this._get_next_token(previous, open_token);
        }

        if (!comments.isEmpty()) {
          current.comments_before = comments;
          comments = new TokenStream();
        }

        current.parent = open_token;

        if (this._is_opening(current)) {
          open_stack.push(open_token);
          open_token = current;
        } else if (open_token && this._is_closing(current, open_token)) {
          current.opened = open_token;
          open_token.closed = current;
          open_token = open_stack.pop();
          current.parent = open_token;
        }

        current.previous = previous;
        previous.next = current;

        this.__tokens.add(current);

        previous = current;
      }

      return this.__tokens;
    };

    Tokenizer.prototype._is_first_token = function () {
      return this.__tokens.isEmpty();
    };

    Tokenizer.prototype._reset = function () {};

    Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
      // jshint unused:false
      this._readWhitespace();

      var resulting_string = this._input.read(/.+/g);

      if (resulting_string) {
        return this._create_token(TOKEN.RAW, resulting_string);
      } else {
        return this._create_token(TOKEN.EOF, '');
      }
    };

    Tokenizer.prototype._is_comment = function (current_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._is_opening = function (current_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._is_closing = function (current_token, open_token) {
      // jshint unused:false
      return false;
    };

    Tokenizer.prototype._create_token = function (type, text) {
      var token = new Token(type, text, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token);
      return token;
    };

    Tokenizer.prototype._readWhitespace = function () {
      return this._patterns.whitespace.read();
    };

    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    /***/
  },
  /* 10 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function TokenStream(parent_token) {
      // private
      this.__tokens = [];
      this.__tokens_length = this.__tokens.length;
      this.__position = 0;
      this.__parent_token = parent_token;
    }

    TokenStream.prototype.restart = function () {
      this.__position = 0;
    };

    TokenStream.prototype.isEmpty = function () {
      return this.__tokens_length === 0;
    };

    TokenStream.prototype.hasNext = function () {
      return this.__position < this.__tokens_length;
    };

    TokenStream.prototype.next = function () {
      var val = null;

      if (this.hasNext()) {
        val = this.__tokens[this.__position];
        this.__position += 1;
      }

      return val;
    };

    TokenStream.prototype.peek = function (index) {
      var val = null;
      index = index || 0;
      index += this.__position;

      if (index >= 0 && index < this.__tokens_length) {
        val = this.__tokens[index];
      }

      return val;
    };

    TokenStream.prototype.add = function (token) {
      if (this.__parent_token) {
        token.parent = this.__parent_token;
      }

      this.__tokens.push(token);

      this.__tokens_length += 1;
    };

    module.exports.TokenStream = TokenStream;
    /***/
  },
  /* 11 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Pattern = __webpack_require__(12).Pattern;

    function WhitespacePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);

      if (parent) {
        this._line_regexp = this._input.get_regexp(parent._line_regexp);
      } else {
        this.__set_whitespace_patterns('', '');
      }

      this.newline_count = 0;
      this.whitespace_before_token = '';
    }

    WhitespacePattern.prototype = new Pattern();

    WhitespacePattern.prototype.__set_whitespace_patterns = function (whitespace_chars, newline_chars) {
      whitespace_chars += '\\t ';
      newline_chars += '\\n\\r';
      this._match_pattern = this._input.get_regexp('[' + whitespace_chars + newline_chars + ']+', true);
      this._newline_regexp = this._input.get_regexp('\\r\\n|[' + newline_chars + ']');
    };

    WhitespacePattern.prototype.read = function () {
      this.newline_count = 0;
      this.whitespace_before_token = '';

      var resulting_string = this._input.read(this._match_pattern);

      if (resulting_string === ' ') {
        this.whitespace_before_token = ' ';
      } else if (resulting_string) {
        var matches = this.__split(this._newline_regexp, resulting_string);

        this.newline_count = matches.length - 1;
        this.whitespace_before_token = matches[this.newline_count];
      }

      return resulting_string;
    };

    WhitespacePattern.prototype.matching = function (whitespace_chars, newline_chars) {
      var result = this._create();

      result.__set_whitespace_patterns(whitespace_chars, newline_chars);

      result._update();

      return result;
    };

    WhitespacePattern.prototype._create = function () {
      return new WhitespacePattern(this._input, this);
    };

    WhitespacePattern.prototype.__split = function (regexp, input_string) {
      regexp.lastIndex = 0;
      var start_index = 0;
      var result = [];
      var next_match = regexp.exec(input_string);

      while (next_match) {
        result.push(input_string.substring(start_index, next_match.index));
        start_index = next_match.index + next_match[0].length;
        next_match = regexp.exec(input_string);
      }

      if (start_index < input_string.length) {
        result.push(input_string.substring(start_index, input_string.length));
      } else {
        result.push('');
      }

      return result;
    };

    module.exports.WhitespacePattern = WhitespacePattern;
    /***/
  },
  /* 12 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Pattern(input_scanner, parent) {
      this._input = input_scanner;
      this._starting_pattern = null;
      this._match_pattern = null;
      this._until_pattern = null;
      this._until_after = false;

      if (parent) {
        this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
        this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
        this._until_pattern = this._input.get_regexp(parent._until_pattern);
        this._until_after = parent._until_after;
      }
    }

    Pattern.prototype.read = function () {
      var result = this._input.read(this._starting_pattern);

      if (!this._starting_pattern || result) {
        result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
      }

      return result;
    };

    Pattern.prototype.read_match = function () {
      return this._input.match(this._match_pattern);
    };

    Pattern.prototype.until_after = function (pattern) {
      var result = this._create();

      result._until_after = true;
      result._until_pattern = this._input.get_regexp(pattern);

      result._update();

      return result;
    };

    Pattern.prototype.until = function (pattern) {
      var result = this._create();

      result._until_after = false;
      result._until_pattern = this._input.get_regexp(pattern);

      result._update();

      return result;
    };

    Pattern.prototype.starting_with = function (pattern) {
      var result = this._create();

      result._starting_pattern = this._input.get_regexp(pattern, true);

      result._update();

      return result;
    };

    Pattern.prototype.matching = function (pattern) {
      var result = this._create();

      result._match_pattern = this._input.get_regexp(pattern, true);

      result._update();

      return result;
    };

    Pattern.prototype._create = function () {
      return new Pattern(this._input, this);
    };

    Pattern.prototype._update = function () {};

    module.exports.Pattern = Pattern;
    /***/
  },
  /* 13 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    function Directives(start_block_pattern, end_block_pattern) {
      start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
      end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
      this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
      this.__directive_pattern = / (\w+)[:](\w+)/g;
      this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
    }

    Directives.prototype.get_directives = function (text) {
      if (!text.match(this.__directives_block_pattern)) {
        return null;
      }

      var directives = {};
      this.__directive_pattern.lastIndex = 0;

      var directive_match = this.__directive_pattern.exec(text);

      while (directive_match) {
        directives[directive_match[1]] = directive_match[2];
        directive_match = this.__directive_pattern.exec(text);
      }

      return directives;
    };

    Directives.prototype.readIgnored = function (input) {
      return input.readUntilAfter(this.__directives_end_ignore_pattern);
    };

    module.exports.Directives = Directives;
    /***/
  },
  /* 14 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Pattern = __webpack_require__(12).Pattern;

    var template_names = {
      django: false,
      erb: false,
      handlebars: false,
      php: false
    }; // This lets templates appear anywhere we would do a readUntil
    // The cost is higher but it is pay to play.

    function TemplatablePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);
      this.__template_pattern = null;
      this._disabled = Object.assign({}, template_names);
      this._excluded = Object.assign({}, template_names);

      if (parent) {
        this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
        this._excluded = Object.assign(this._excluded, parent._excluded);
        this._disabled = Object.assign(this._disabled, parent._disabled);
      }

      var pattern = new Pattern(input_scanner);
      this.__patterns = {
        handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
        handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
        handlebars: pattern.starting_with(/{{/).until_after(/}}/),
        php: pattern.starting_with(/<\?(?:[=]|php)/).until_after(/\?>/),
        erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
        // django coflicts with handlebars a bit.
        django: pattern.starting_with(/{%/).until_after(/%}/),
        django_value: pattern.starting_with(/{{/).until_after(/}}/),
        django_comment: pattern.starting_with(/{#/).until_after(/#}/)
      };
    }

    TemplatablePattern.prototype = new Pattern();

    TemplatablePattern.prototype._create = function () {
      return new TemplatablePattern(this._input, this);
    };

    TemplatablePattern.prototype._update = function () {
      this.__set_templated_pattern();
    };

    TemplatablePattern.prototype.disable = function (language) {
      var result = this._create();

      result._disabled[language] = true;

      result._update();

      return result;
    };

    TemplatablePattern.prototype.read_options = function (options) {
      var result = this._create();

      for (var language in template_names) {
        result._disabled[language] = options.templating.indexOf(language) === -1;
      }

      result._update();

      return result;
    };

    TemplatablePattern.prototype.exclude = function (language) {
      var result = this._create();

      result._excluded[language] = true;

      result._update();

      return result;
    };

    TemplatablePattern.prototype.read = function () {
      var result = '';

      if (this._match_pattern) {
        result = this._input.read(this._starting_pattern);
      } else {
        result = this._input.read(this._starting_pattern, this.__template_pattern);
      }

      var next = this._read_template();

      while (next) {
        if (this._match_pattern) {
          next += this._input.read(this._match_pattern);
        } else {
          next += this._input.readUntil(this.__template_pattern);
        }

        result += next;
        next = this._read_template();
      }

      if (this._until_after) {
        result += this._input.readUntilAfter(this._until_pattern);
      }

      return result;
    };

    TemplatablePattern.prototype.__set_templated_pattern = function () {
      var items = [];

      if (!this._disabled.php) {
        items.push(this.__patterns.php._starting_pattern.source);
      }

      if (!this._disabled.handlebars) {
        items.push(this.__patterns.handlebars._starting_pattern.source);
      }

      if (!this._disabled.erb) {
        items.push(this.__patterns.erb._starting_pattern.source);
      }

      if (!this._disabled.django) {
        items.push(this.__patterns.django._starting_pattern.source);
        items.push(this.__patterns.django_value._starting_pattern.source);
        items.push(this.__patterns.django_comment._starting_pattern.source);
      }

      if (this._until_pattern) {
        items.push(this._until_pattern.source);
      }

      this.__template_pattern = this._input.get_regexp('(?:' + items.join('|') + ')');
    };

    TemplatablePattern.prototype._read_template = function () {
      var resulting_string = '';

      var c = this._input.peek();

      if (c === '<') {
        var peek1 = this._input.peek(1); //if we're in a comment, do something special
        // We treat all comments as literals, even more than preformatted tags
        // we just look for the appropriate close tag


        if (!this._disabled.php && !this._excluded.php && peek1 === '?') {
          resulting_string = resulting_string || this.__patterns.php.read();
        }

        if (!this._disabled.erb && !this._excluded.erb && peek1 === '%') {
          resulting_string = resulting_string || this.__patterns.erb.read();
        }
      } else if (c === '{') {
        if (!this._disabled.handlebars && !this._excluded.handlebars) {
          resulting_string = resulting_string || this.__patterns.handlebars_comment.read();
          resulting_string = resulting_string || this.__patterns.handlebars_unescaped.read();
          resulting_string = resulting_string || this.__patterns.handlebars.read();
        }

        if (!this._disabled.django) {
          // django coflicts with handlebars a bit.
          if (!this._excluded.django && !this._excluded.handlebars) {
            resulting_string = resulting_string || this.__patterns.django_value.read();
          }

          if (!this._excluded.django) {
            resulting_string = resulting_string || this.__patterns.django_comment.read();
            resulting_string = resulting_string || this.__patterns.django.read();
          }
        }
      }

      return resulting_string;
    };

    module.exports.TemplatablePattern = TemplatablePattern;
    /***/
  },,,,
  /* 15 */

  /* 16 */

  /* 17 */

  /* 18 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Beautifier = __webpack_require__(19).Beautifier,
        Options = __webpack_require__(20).Options;

    function style_html(html_source, options, js_beautify, css_beautify) {
      var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
      return beautifier.beautify();
    }

    module.exports = style_html;

    module.exports.defaultOptions = function () {
      return new Options();
    };
    /***/

  },
  /* 19 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var Options = __webpack_require__(20).Options;

    var Output = __webpack_require__(2).Output;

    var Tokenizer = __webpack_require__(21).Tokenizer;

    var TOKEN = __webpack_require__(21).TOKEN;

    var lineBreak = /\r\n|[\r\n]/;
    var allLineBreaks = /\r\n|[\r\n]/g;

    var Printer = function Printer(options, base_indent_string) {
      //handles input/output and some other printing functions
      this.indent_level = 0;
      this.alignment_size = 0;
      this.max_preserve_newlines = options.max_preserve_newlines;
      this.preserve_newlines = options.preserve_newlines;
      this._output = new Output(options, base_indent_string);
    };

    Printer.prototype.current_line_has_match = function (pattern) {
      return this._output.current_line.has_match(pattern);
    };

    Printer.prototype.set_space_before_token = function (value, non_breaking) {
      this._output.space_before_token = value;
      this._output.non_breaking_space = non_breaking;
    };

    Printer.prototype.set_wrap_point = function () {
      this._output.set_indent(this.indent_level, this.alignment_size);

      this._output.set_wrap_point();
    };

    Printer.prototype.add_raw_token = function (token) {
      this._output.add_raw_token(token);
    };

    Printer.prototype.print_preserved_newlines = function (raw_token) {
      var newlines = 0;

      if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
        newlines = raw_token.newlines ? 1 : 0;
      }

      if (this.preserve_newlines) {
        newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
      }

      for (var n = 0; n < newlines; n++) {
        this.print_newline(n > 0);
      }

      return newlines !== 0;
    };

    Printer.prototype.traverse_whitespace = function (raw_token) {
      if (raw_token.whitespace_before || raw_token.newlines) {
        if (!this.print_preserved_newlines(raw_token)) {
          this._output.space_before_token = true;
        }

        return true;
      }

      return false;
    };

    Printer.prototype.previous_token_wrapped = function () {
      return this._output.previous_token_wrapped;
    };

    Printer.prototype.print_newline = function (force) {
      this._output.add_new_line(force);
    };

    Printer.prototype.print_token = function (token) {
      if (token.text) {
        this._output.set_indent(this.indent_level, this.alignment_size);

        this._output.add_token(token.text);
      }
    };

    Printer.prototype.indent = function () {
      this.indent_level++;
    };

    Printer.prototype.get_full_indent = function (level) {
      level = this.indent_level + (level || 0);

      if (level < 1) {
        return '';
      }

      return this._output.get_indent_string(level);
    };

    var get_type_attribute = function get_type_attribute(start_token) {
      var result = null;
      var raw_token = start_token.next; // Search attributes for a type attribute

      while (raw_token.type !== TOKEN.EOF && start_token.closed !== raw_token) {
        if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === 'type') {
          if (raw_token.next && raw_token.next.type === TOKEN.EQUALS && raw_token.next.next && raw_token.next.next.type === TOKEN.VALUE) {
            result = raw_token.next.next.text;
          }

          break;
        }

        raw_token = raw_token.next;
      }

      return result;
    };

    var get_custom_beautifier_name = function get_custom_beautifier_name(tag_check, raw_token) {
      var typeAttribute = null;
      var result = null;

      if (!raw_token.closed) {
        return null;
      }

      if (tag_check === 'script') {
        typeAttribute = 'text/javascript';
      } else if (tag_check === 'style') {
        typeAttribute = 'text/css';
      }

      typeAttribute = get_type_attribute(raw_token) || typeAttribute; // For script and style tags that have a type attribute, only enable custom beautifiers for matching values
      // For those without a type attribute use default;

      if (typeAttribute.search('text/css') > -1) {
        result = 'css';
      } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
        result = 'javascript';
      } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
        result = 'html';
      } else if (typeAttribute.search(/test\/null/) > -1) {
        // Test only mime-type for testing the beautifier when null is passed as beautifing function
        result = 'null';
      }

      return result;
    };

    function in_array(what, arr) {
      return arr.indexOf(what) !== -1;
    }

    function TagFrame(parent, parser_token, indent_level) {
      this.parent = parent || null;
      this.tag = parser_token ? parser_token.tag_name : '';
      this.indent_level = indent_level || 0;
      this.parser_token = parser_token || null;
    }

    function TagStack(printer) {
      this._printer = printer;
      this._current_frame = null;
    }

    TagStack.prototype.get_parser_token = function () {
      return this._current_frame ? this._current_frame.parser_token : null;
    };

    TagStack.prototype.record_tag = function (parser_token) {
      //function to record a tag and its parent in this.tags Object
      var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
      this._current_frame = new_frame;
    };

    TagStack.prototype._try_pop_frame = function (frame) {
      //function to retrieve the opening tag to the corresponding closer
      var parser_token = null;

      if (frame) {
        parser_token = frame.parser_token;
        this._printer.indent_level = frame.indent_level;
        this._current_frame = frame.parent;
      }

      return parser_token;
    };

    TagStack.prototype._get_frame = function (tag_list, stop_list) {
      //function to retrieve the opening tag to the corresponding closer
      var frame = this._current_frame;

      while (frame) {
        //till we reach '' (the initial value);
        if (tag_list.indexOf(frame.tag) !== -1) {
          //if this is it use it
          break;
        } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
          frame = null;
          break;
        }

        frame = frame.parent;
      }

      return frame;
    };

    TagStack.prototype.try_pop = function (tag, stop_list) {
      //function to retrieve the opening tag to the corresponding closer
      var frame = this._get_frame([tag], stop_list);

      return this._try_pop_frame(frame);
    };

    TagStack.prototype.indent_to_tag = function (tag_list) {
      var frame = this._get_frame(tag_list);

      if (frame) {
        this._printer.indent_level = frame.indent_level;
      }
    };

    function Beautifier(source_text, options, js_beautify, css_beautify) {
      //Wrapper function to invoke all the necessary constructors and deal with the output.
      this._source_text = source_text || '';
      options = options || {};
      this._js_beautify = js_beautify;
      this._css_beautify = css_beautify;
      this._tag_stack = null; // Allow the setting of language/file-type specific options
      // with inheritance of overall settings

      var optionHtml = new Options(options, 'html');
      this._options = optionHtml;
      this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 'force'.length) === 'force';
      this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === 'force-expand-multiline';
      this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === 'force-aligned';
      this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === 'aligned-multiple';
      this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 'preserve'.length) === 'preserve';
      this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === 'preserve-aligned';
    }

    Beautifier.prototype.beautify = function () {
      // if disabled, return the input unchanged.
      if (this._options.disabled) {
        return this._source_text;
      }

      var source_text = this._source_text;
      var eol = this._options.eol;

      if (this._options.eol === 'auto') {
        eol = '\n';

        if (source_text && lineBreak.test(source_text)) {
          eol = source_text.match(lineBreak)[0];
        }
      } // HACK: newline parsing inconsistent. This brute force normalizes the input.


      source_text = source_text.replace(allLineBreaks, '\n');
      var baseIndentString = source_text.match(/^[\t ]*/)[0];
      var last_token = {
        text: '',
        type: ''
      };
      var last_tag_token = new TagOpenParserToken();
      var printer = new Printer(this._options, baseIndentString);
      var tokens = new Tokenizer(source_text, this._options).tokenize();
      this._tag_stack = new TagStack(printer);
      var parser_token = null;
      var raw_token = tokens.next();

      while (raw_token.type !== TOKEN.EOF) {
        if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
          parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token);
          last_tag_token = parser_token;
        } else if (raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE || raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete) {
          parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, tokens);
        } else if (raw_token.type === TOKEN.TAG_CLOSE) {
          parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
        } else if (raw_token.type === TOKEN.TEXT) {
          parser_token = this._handle_text(printer, raw_token, last_tag_token);
        } else {
          // This should never happen, but if it does. Print the raw token
          printer.add_raw_token(raw_token);
        }

        last_token = parser_token;
        raw_token = tokens.next();
      }

      var sweet_code = printer._output.get_code(eol);

      return sweet_code;
    };

    Beautifier.prototype._handle_tag_close = function (printer, raw_token, last_tag_token) {
      var parser_token = {
        text: raw_token.text,
        type: raw_token.type
      };
      printer.alignment_size = 0;
      last_tag_token.tag_complete = true;
      printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);

      if (last_tag_token.is_unformatted) {
        printer.add_raw_token(raw_token);
      } else {
        if (last_tag_token.tag_start_char === '<') {
          printer.set_space_before_token(raw_token.text[0] === '/', true); // space before />, no space before >

          if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
            printer.print_newline(false);
          }
        }

        printer.print_token(raw_token);
      }

      if (last_tag_token.indent_content && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
        printer.indent(); // only indent once per opened tag

        last_tag_token.indent_content = false;
      }

      if (!last_tag_token.is_inline_element && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
        printer.set_wrap_point();
      }

      return parser_token;
    };

    Beautifier.prototype._handle_inside_tag = function (printer, raw_token, last_tag_token, tokens) {
      var wrapped = last_tag_token.has_wrapped_attrs;
      var parser_token = {
        text: raw_token.text,
        type: raw_token.type
      };
      printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);

      if (last_tag_token.is_unformatted) {
        printer.add_raw_token(raw_token);
      } else if (last_tag_token.tag_start_char === '{' && raw_token.type === TOKEN.TEXT) {
        // For the insides of handlebars allow newlines or a single space between open and contents
        if (printer.print_preserved_newlines(raw_token)) {
          raw_token.newlines = 0;
          printer.add_raw_token(raw_token);
        } else {
          printer.print_token(raw_token);
        }
      } else {
        if (raw_token.type === TOKEN.ATTRIBUTE) {
          printer.set_space_before_token(true);
          last_tag_token.attr_count += 1;
        } else if (raw_token.type === TOKEN.EQUALS) {
          //no space before =
          printer.set_space_before_token(false);
        } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) {
          //no space before value
          printer.set_space_before_token(false);
        }

        if (raw_token.type === TOKEN.ATTRIBUTE && last_tag_token.tag_start_char === '<') {
          if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
            printer.traverse_whitespace(raw_token);
            wrapped = wrapped || raw_token.newlines !== 0;
          }

          if (this._is_wrap_attributes_force) {
            var force_attr_wrap = last_tag_token.attr_count > 1;

            if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.attr_count === 1) {
              var is_only_attribute = true;
              var peek_index = 0;
              var peek_token;

              do {
                peek_token = tokens.peek(peek_index);

                if (peek_token.type === TOKEN.ATTRIBUTE) {
                  is_only_attribute = false;
                  break;
                }

                peek_index += 1;
              } while (peek_index < 4 && peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);

              force_attr_wrap = !is_only_attribute;
            }

            if (force_attr_wrap) {
              printer.print_newline(false);
              wrapped = true;
            }
          }
        }

        printer.print_token(raw_token);
        wrapped = wrapped || printer.previous_token_wrapped();
        last_tag_token.has_wrapped_attrs = wrapped;
      }

      return parser_token;
    };

    Beautifier.prototype._handle_text = function (printer, raw_token, last_tag_token) {
      var parser_token = {
        text: raw_token.text,
        type: 'TK_CONTENT'
      };

      if (last_tag_token.custom_beautifier_name) {
        //check if we need to format javascript
        this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
      } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
        printer.add_raw_token(raw_token);
      } else {
        printer.traverse_whitespace(raw_token);
        printer.print_token(raw_token);
      }

      return parser_token;
    };

    Beautifier.prototype._print_custom_beatifier_text = function (printer, raw_token, last_tag_token) {
      var local = this;

      if (raw_token.text !== '') {
        var text = raw_token.text,
            _beautifier,
            script_indent_level = 1,
            pre = '',
            post = '';

        if (last_tag_token.custom_beautifier_name === 'javascript' && typeof this._js_beautify === 'function') {
          _beautifier = this._js_beautify;
        } else if (last_tag_token.custom_beautifier_name === 'css' && typeof this._css_beautify === 'function') {
          _beautifier = this._css_beautify;
        } else if (last_tag_token.custom_beautifier_name === 'html') {
          _beautifier = function _beautifier(html_source, options) {
            var beautifier = new Beautifier(html_source, options, local._js_beautify, local._css_beautify);
            return beautifier.beautify();
          };
        }

        if (this._options.indent_scripts === "keep") {
          script_indent_level = 0;
        } else if (this._options.indent_scripts === "separate") {
          script_indent_level = -printer.indent_level;
        }

        var indentation = printer.get_full_indent(script_indent_level); // if there is at least one empty line at the end of this text, strip it
        // we'll be adding one back after the text but before the containing tag.

        text = text.replace(/\n[ \t]*$/, ''); // Handle the case where content is wrapped in a comment or cdata.

        if (last_tag_token.custom_beautifier_name !== 'html' && text[0] === '<' && text.match(/^(<!--|<!\[CDATA\[)/)) {
          var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text); // if we start to wrap but don't finish, print raw

          if (!matched) {
            printer.add_raw_token(raw_token);
            return;
          }

          pre = indentation + matched[1] + '\n';
          text = matched[4];

          if (matched[5]) {
            post = indentation + matched[5];
          } // if there is at least one empty line at the end of this text, strip it
          // we'll be adding one back after the text but before the containing tag.


          text = text.replace(/\n[ \t]*$/, '');

          if (matched[2] || matched[3].indexOf('\n') !== -1) {
            // if the first line of the non-comment text has spaces
            // use that as the basis for indenting in null case.
            matched = matched[3].match(/[ \t]+$/);

            if (matched) {
              raw_token.whitespace_before = matched[0];
            }
          }
        }

        if (text) {
          if (_beautifier) {
            // call the Beautifier if avaliable
            var Child_options = function Child_options() {
              this.eol = '\n';
            };

            Child_options.prototype = this._options.raw_options;
            var child_options = new Child_options();
            text = _beautifier(indentation + text, child_options);
          } else {
            // simply indent the string otherwise
            var white = raw_token.whitespace_before;

            if (white) {
              text = text.replace(new RegExp('\n(' + white + ')?', 'g'), '\n');
            }

            text = indentation + text.replace(/\n/g, '\n' + indentation);
          }
        }

        if (pre) {
          if (!text) {
            text = pre + post;
          } else {
            text = pre + text + '\n' + post;
          }
        }

        printer.print_newline(false);

        if (text) {
          raw_token.text = text;
          raw_token.whitespace_before = '';
          raw_token.newlines = 0;
          printer.add_raw_token(raw_token);
          printer.print_newline(true);
        }
      }
    };

    Beautifier.prototype._handle_tag_open = function (printer, raw_token, last_tag_token, last_token) {
      var parser_token = this._get_tag_open_token(raw_token);

      if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) && !last_tag_token.is_empty_element && raw_token.type === TOKEN.TAG_OPEN && raw_token.text.indexOf('</') === 0) {
        // End element tags for unformatted or content_unformatted elements
        // are printed raw to keep any newlines inside them exactly the same.
        printer.add_raw_token(raw_token);
        parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
      } else {
        printer.traverse_whitespace(raw_token);

        this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);

        if (!parser_token.is_inline_element) {
          printer.set_wrap_point();
        }

        printer.print_token(raw_token);
      } //indent attributes an auto, forced, aligned or forced-align line-wrap


      if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
        parser_token.alignment_size = raw_token.text.length + 1;
      }

      if (!parser_token.tag_complete && !parser_token.is_unformatted) {
        printer.alignment_size = parser_token.alignment_size;
      }

      return parser_token;
    };

    var TagOpenParserToken = function TagOpenParserToken(parent, raw_token) {
      this.parent = parent || null;
      this.text = '';
      this.type = 'TK_TAG_OPEN';
      this.tag_name = '';
      this.is_inline_element = false;
      this.is_unformatted = false;
      this.is_content_unformatted = false;
      this.is_empty_element = false;
      this.is_start_tag = false;
      this.is_end_tag = false;
      this.indent_content = false;
      this.multiline_content = false;
      this.custom_beautifier_name = null;
      this.start_tag_token = null;
      this.attr_count = 0;
      this.has_wrapped_attrs = false;
      this.alignment_size = 0;
      this.tag_complete = false;
      this.tag_start_char = '';
      this.tag_check = '';

      if (!raw_token) {
        this.tag_complete = true;
      } else {
        var tag_check_match;
        this.tag_start_char = raw_token.text[0];
        this.text = raw_token.text;

        if (this.tag_start_char === '<') {
          tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
          this.tag_check = tag_check_match ? tag_check_match[1] : '';
        } else {
          tag_check_match = raw_token.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/);
          this.tag_check = tag_check_match ? tag_check_match[1] : ''; // handle "{{#> myPartial}}

          if (raw_token.text === '{{#>' && this.tag_check === '>' && raw_token.next !== null) {
            this.tag_check = raw_token.next.text;
          }
        }

        this.tag_check = this.tag_check.toLowerCase();

        if (raw_token.type === TOKEN.COMMENT) {
          this.tag_complete = true;
        }

        this.is_start_tag = this.tag_check.charAt(0) !== '/';
        this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
        this.is_end_tag = !this.is_start_tag || raw_token.closed && raw_token.closed.text === '/>'; // handlebars tags that don't start with # or ^ are single_tags, and so also start and end.

        this.is_end_tag = this.is_end_tag || this.tag_start_char === '{' && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(2)));
      }
    };

    Beautifier.prototype._get_tag_open_token = function (raw_token) {
      //function to get a full tag and parse its type
      var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);
      parser_token.alignment_size = this._options.wrap_attributes_indent_size;
      parser_token.is_end_tag = parser_token.is_end_tag || in_array(parser_token.tag_check, this._options.void_elements);
      parser_token.is_empty_element = parser_token.tag_complete || parser_token.is_start_tag && parser_token.is_end_tag;
      parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
      parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
      parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || parser_token.tag_start_char === '{';
      return parser_token;
    };

    Beautifier.prototype._set_tag_position = function (printer, raw_token, parser_token, last_tag_token, last_token) {
      if (!parser_token.is_empty_element) {
        if (parser_token.is_end_tag) {
          //this tag is a double tag so check for tag-ending
          parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name); //remove it and all ancestors
        } else {
          // it's a start-tag
          // check if this tag is starting an element that has optional end element
          // and do an ending needed
          if (this._do_optional_end_element(parser_token)) {
            if (!parser_token.is_inline_element) {
              printer.print_newline(false);
            }
          }

          this._tag_stack.record_tag(parser_token); //push it on the tag stack


          if ((parser_token.tag_name === 'script' || parser_token.tag_name === 'style') && !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
            parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
          }
        }
      }

      if (in_array(parser_token.tag_check, this._options.extra_liners)) {
        //check if this double needs an extra line
        printer.print_newline(false);

        if (!printer._output.just_added_blankline()) {
          printer.print_newline(true);
        }
      }

      if (parser_token.is_empty_element) {
        //if this tag name is a single tag type (either in the list or has a closing /)
        // if you hit an else case, reset the indent level if you are inside an:
        // 'if', 'unless', or 'each' block.
        if (parser_token.tag_start_char === '{' && parser_token.tag_check === 'else') {
          this._tag_stack.indent_to_tag(['if', 'unless', 'each']);

          parser_token.indent_content = true; // Don't add a newline if opening {{#if}} tag is on the current line

          var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);

          if (!foundIfOnCurrentLine) {
            printer.print_newline(false);
          }
        } // Don't add a newline before elements that should remain where they are.


        if (parser_token.tag_name === '!--' && last_token.type === TOKEN.TAG_CLOSE && last_tag_token.is_end_tag && parser_token.text.indexOf('\n') === -1) {//Do nothing. Leave comments on same line.
        } else {
          if (!(parser_token.is_inline_element || parser_token.is_unformatted)) {
            printer.print_newline(false);
          }

          this._calcluate_parent_multiline(printer, parser_token);
        }
      } else if (parser_token.is_end_tag) {
        //this tag is a double tag so check for tag-ending
        var do_end_expand = false; // deciding whether a block is multiline should not be this hard

        do_end_expand = parser_token.start_tag_token && parser_token.start_tag_token.multiline_content;
        do_end_expand = do_end_expand || !parser_token.is_inline_element && !(last_tag_token.is_inline_element || last_tag_token.is_unformatted) && !(last_token.type === TOKEN.TAG_CLOSE && parser_token.start_tag_token === last_tag_token) && last_token.type !== 'TK_CONTENT';

        if (parser_token.is_content_unformatted || parser_token.is_unformatted) {
          do_end_expand = false;
        }

        if (do_end_expand) {
          printer.print_newline(false);
        }
      } else {
        // it's a start-tag
        parser_token.indent_content = !parser_token.custom_beautifier_name;

        if (parser_token.tag_start_char === '<') {
          if (parser_token.tag_name === 'html') {
            parser_token.indent_content = this._options.indent_inner_html;
          } else if (parser_token.tag_name === 'head') {
            parser_token.indent_content = this._options.indent_head_inner_html;
          } else if (parser_token.tag_name === 'body') {
            parser_token.indent_content = this._options.indent_body_inner_html;
          }
        }

        if (!(parser_token.is_inline_element || parser_token.is_unformatted) && (last_token.type !== 'TK_CONTENT' || parser_token.is_content_unformatted)) {
          printer.print_newline(false);
        }

        this._calcluate_parent_multiline(printer, parser_token);
      }
    };

    Beautifier.prototype._calcluate_parent_multiline = function (printer, parser_token) {
      if (parser_token.parent && printer._output.just_added_newline() && !((parser_token.is_inline_element || parser_token.is_unformatted) && parser_token.parent.is_inline_element)) {
        parser_token.parent.multiline_content = true;
      }
    }; //To be used for <p> tag special case:


    var p_closers = ['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'];
    var p_parent_excludes = ['a', 'audio', 'del', 'ins', 'map', 'noscript', 'video'];

    Beautifier.prototype._do_optional_end_element = function (parser_token) {
      var result = null; // NOTE: cases of "if there is no more content in the parent element"
      // are handled automatically by the beautifier.
      // It assumes parent or ancestor close tag closes all children.
      // https://www.w3.org/TR/html5/syntax.html#optional-tags

      if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
        return;
      }

      if (parser_token.tag_name === 'body') {
        // A head element’s end tag may be omitted if the head element is not immediately followed by a space character or a comment.
        result = result || this._tag_stack.try_pop('head'); //} else if (parser_token.tag_name === 'body') {
        // DONE: A body element’s end tag may be omitted if the body element is not immediately followed by a comment.
      } else if (parser_token.tag_name === 'li') {
        // An li element’s end tag may be omitted if the li element is immediately followed by another li element or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('li', ['ol', 'ul']);
      } else if (parser_token.tag_name === 'dd' || parser_token.tag_name === 'dt') {
        // A dd element’s end tag may be omitted if the dd element is immediately followed by another dd element or a dt element, or if there is no more content in the parent element.
        // A dt element’s end tag may be omitted if the dt element is immediately followed by another dt element or a dd element.
        result = result || this._tag_stack.try_pop('dt', ['dl']);
        result = result || this._tag_stack.try_pop('dd', ['dl']);
      } else if (parser_token.parent.tag_name === 'p' && p_closers.indexOf(parser_token.tag_name) !== -1) {
        // IMPORTANT: this else-if works because p_closers has no overlap with any other element we look for in this method
        // check for the parent element is an HTML element that is not an <a>, <audio>, <del>, <ins>, <map>, <noscript>, or <video> element,  or an autonomous custom element.
        // To do this right, this needs to be coded as an inclusion of the inverse of the exclusion above.
        // But to start with (if we ignore "autonomous custom elements") the exclusion would be fine.
        var p_parent = parser_token.parent.parent;

        if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
          result = result || this._tag_stack.try_pop('p');
        }
      } else if (parser_token.tag_name === 'rp' || parser_token.tag_name === 'rt') {
        // An rt element’s end tag may be omitted if the rt element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
        // An rp element’s end tag may be omitted if the rp element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('rt', ['ruby', 'rtc']);
        result = result || this._tag_stack.try_pop('rp', ['ruby', 'rtc']);
      } else if (parser_token.tag_name === 'optgroup') {
        // An optgroup element’s end tag may be omitted if the optgroup element is immediately followed by another optgroup element, or if there is no more content in the parent element.
        // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('optgroup', ['select']); //result = result || this._tag_stack.try_pop('option', ['select']);
      } else if (parser_token.tag_name === 'option') {
        // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('option', ['select', 'datalist', 'optgroup']);
      } else if (parser_token.tag_name === 'colgroup') {
        // DONE: A colgroup element’s end tag may be omitted if the colgroup element is not immediately followed by a space character or a comment.
        // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
        result = result || this._tag_stack.try_pop('caption', ['table']);
      } else if (parser_token.tag_name === 'thead') {
        // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
        // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
        result = result || this._tag_stack.try_pop('caption', ['table']);
        result = result || this._tag_stack.try_pop('colgroup', ['table']); //} else if (parser_token.tag_name === 'caption') {
        // DONE: A caption element’s end tag may be omitted if the caption element is not immediately followed by a space character or a comment.
      } else if (parser_token.tag_name === 'tbody' || parser_token.tag_name === 'tfoot') {
        // A thead element’s end tag may be omitted if the thead element is immediately followed by a tbody or tfoot element.
        // A tbody element’s end tag may be omitted if the tbody element is immediately followed by a tbody or tfoot element, or if there is no more content in the parent element.
        // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
        // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
        result = result || this._tag_stack.try_pop('caption', ['table']);
        result = result || this._tag_stack.try_pop('colgroup', ['table']);
        result = result || this._tag_stack.try_pop('thead', ['table']);
        result = result || this._tag_stack.try_pop('tbody', ['table']); //} else if (parser_token.tag_name === 'tfoot') {
        // DONE: A tfoot element’s end tag may be omitted if there is no more content in the parent element.
      } else if (parser_token.tag_name === 'tr') {
        // A tr element’s end tag may be omitted if the tr element is immediately followed by another tr element, or if there is no more content in the parent element.
        // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
        // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
        result = result || this._tag_stack.try_pop('caption', ['table']);
        result = result || this._tag_stack.try_pop('colgroup', ['table']);
        result = result || this._tag_stack.try_pop('tr', ['table', 'thead', 'tbody', 'tfoot']);
      } else if (parser_token.tag_name === 'th' || parser_token.tag_name === 'td') {
        // A td element’s end tag may be omitted if the td element is immediately followed by a td or th element, or if there is no more content in the parent element.
        // A th element’s end tag may be omitted if the th element is immediately followed by a td or th element, or if there is no more content in the parent element.
        result = result || this._tag_stack.try_pop('td', ['table', 'thead', 'tbody', 'tfoot', 'tr']);
        result = result || this._tag_stack.try_pop('th', ['table', 'thead', 'tbody', 'tfoot', 'tr']);
      } // Start element omission not handled currently
      // A head element’s start tag may be omitted if the element is empty, or if the first thing inside the head element is an element.
      // A tbody element’s start tag may be omitted if the first thing inside the tbody element is a tr element, and if the element is not immediately preceded by a tbody, thead, or tfoot element whose end tag has been omitted. (It can’t be omitted if the element is empty.)
      // A colgroup element’s start tag may be omitted if the first thing inside the colgroup element is a col element, and if the element is not immediately preceded by another colgroup element whose end tag has been omitted. (It can’t be omitted if the element is empty.)
      // Fix up the parent of the parser token


      parser_token.parent = this._tag_stack.get_parser_token();
      return result;
    };

    module.exports.Beautifier = Beautifier;
    /***/
  },
  /* 20 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var BaseOptions = __webpack_require__(6).Options;

    function Options(options) {
      BaseOptions.call(this, options, 'html');

      if (this.templating.length === 1 && this.templating[0] === 'auto') {
        this.templating = ['django', 'erb', 'handlebars', 'php'];
      }

      this.indent_inner_html = this._get_boolean('indent_inner_html');
      this.indent_body_inner_html = this._get_boolean('indent_body_inner_html', true);
      this.indent_head_inner_html = this._get_boolean('indent_head_inner_html', true);
      this.indent_handlebars = this._get_boolean('indent_handlebars', true);
      this.wrap_attributes = this._get_selection('wrap_attributes', ['auto', 'force', 'force-aligned', 'force-expand-multiline', 'aligned-multiple', 'preserve', 'preserve-aligned']);
      this.wrap_attributes_indent_size = this._get_number('wrap_attributes_indent_size', this.indent_size);
      this.extra_liners = this._get_array('extra_liners', ['head', 'body', '/html']); // Block vs inline elements
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
      // https://www.w3.org/TR/html5/dom.html#phrasing-content

      this.inline = this._get_array('inline', ['a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 's', 'samp',
      /* 'script', */
      'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var', 'video', 'wbr', 'text', // obsolete inline tags
      'acronym', 'big', 'strike', 'tt']);
      this.void_elements = this._get_array('void_elements', [// HTLM void elements - aka self-closing tags - aka singletons
      // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
      'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr', // NOTE: Optional tags are too complex for a simple list
      // they are hard coded in _do_optional_end_element
      // Doctype and xml elements
      '!doctype', '?xml', // obsolete tags
      // basefont: https://www.computerhope.com/jargon/h/html-basefont-tag.htm
      // isndex: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/isindex
      'basefont', 'isindex']);
      this.unformatted = this._get_array('unformatted', []);
      this.content_unformatted = this._get_array('content_unformatted', ['pre', 'textarea']);
      this.unformatted_content_delimiter = this._get_characters('unformatted_content_delimiter');
      this.indent_scripts = this._get_selection('indent_scripts', ['normal', 'keep', 'separate']);
    }

    Options.prototype = new BaseOptions();
    module.exports.Options = Options;
    /***/
  },
  /* 21 */

  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /*jshint node:true */

    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    var BaseTokenizer = __webpack_require__(9).Tokenizer;

    var BASETOKEN = __webpack_require__(9).TOKEN;

    var Directives = __webpack_require__(13).Directives;

    var TemplatablePattern = __webpack_require__(14).TemplatablePattern;

    var Pattern = __webpack_require__(12).Pattern;

    var TOKEN = {
      TAG_OPEN: 'TK_TAG_OPEN',
      TAG_CLOSE: 'TK_TAG_CLOSE',
      ATTRIBUTE: 'TK_ATTRIBUTE',
      EQUALS: 'TK_EQUALS',
      VALUE: 'TK_VALUE',
      COMMENT: 'TK_COMMENT',
      TEXT: 'TK_TEXT',
      UNKNOWN: 'TK_UNKNOWN',
      START: BASETOKEN.START,
      RAW: BASETOKEN.RAW,
      EOF: BASETOKEN.EOF
    };
    var directives_core = new Directives(/<\!--/, /-->/);

    var Tokenizer = function Tokenizer(input_string, options) {
      BaseTokenizer.call(this, input_string, options);
      this._current_tag_name = ''; // Words end at whitespace or when a tag starts
      // if we are indenting handlebars, they are considered tags

      var templatable_reader = new TemplatablePattern(this._input).read_options(this._options);
      var pattern_reader = new Pattern(this._input);
      this.__patterns = {
        word: templatable_reader.until(/[\n\r\t <]/),
        single_quote: templatable_reader.until_after(/'/),
        double_quote: templatable_reader.until_after(/"/),
        attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
        element_name: templatable_reader.until(/[\n\r\t >\/]/),
        handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
        handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
        handlebars_open: pattern_reader.until(/[\n\r\t }]/),
        handlebars_raw_close: pattern_reader.until(/}}/),
        comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
        cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
        // https://en.wikipedia.org/wiki/Conditional_comment
        conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
        processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
      };

      if (this._options.indent_handlebars) {
        this.__patterns.word = this.__patterns.word.exclude('handlebars');
      }

      this._unformatted_content_delimiter = null;

      if (this._options.unformatted_content_delimiter) {
        var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);

        this.__patterns.unformatted_content_delimiter = pattern_reader.matching(literal_regexp).until_after(literal_regexp);
      }
    };

    Tokenizer.prototype = new BaseTokenizer();

    Tokenizer.prototype._is_comment = function (current_token) {
      // jshint unused:false
      return false; //current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.UNKNOWN;
    };

    Tokenizer.prototype._is_opening = function (current_token) {
      return current_token.type === TOKEN.TAG_OPEN;
    };

    Tokenizer.prototype._is_closing = function (current_token, open_token) {
      return current_token.type === TOKEN.TAG_CLOSE && open_token && ((current_token.text === '>' || current_token.text === '/>') && open_token.text[0] === '<' || current_token.text === '}}' && open_token.text[0] === '{' && open_token.text[1] === '{');
    };

    Tokenizer.prototype._reset = function () {
      this._current_tag_name = '';
    };

    Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
      // jshint unused:false
      var token = null;

      this._readWhitespace();

      var c = this._input.peek();

      if (c === null) {
        return this._create_token(TOKEN.EOF, '');
      }

      token = token || this._read_open_handlebars(c, open_token);
      token = token || this._read_attribute(c, previous_token, open_token);
      token = token || this._read_close(c, open_token);
      token = token || this._read_raw_content(c, previous_token, open_token);
      token = token || this._read_content_word(c);
      token = token || this._read_comment_or_cdata(c);
      token = token || this._read_processing(c);
      token = token || this._read_open(c, open_token);
      token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
      return token;
    };

    Tokenizer.prototype._read_comment_or_cdata = function (c) {
      // jshint unused:false
      var token = null;
      var resulting_string = null;
      var directives = null;

      if (c === '<') {
        var peek1 = this._input.peek(1); // We treat all comments as literals, even more than preformatted tags
        // we only look for the appropriate closing marker


        if (peek1 === '!') {
          resulting_string = this.__patterns.comment.read(); // only process directive on html comments

          if (resulting_string) {
            directives = directives_core.get_directives(resulting_string);

            if (directives && directives.ignore === 'start') {
              resulting_string += directives_core.readIgnored(this._input);
            }
          } else {
            resulting_string = this.__patterns.cdata.read();
          }
        }

        if (resulting_string) {
          token = this._create_token(TOKEN.COMMENT, resulting_string);
          token.directives = directives;
        }
      }

      return token;
    };

    Tokenizer.prototype._read_processing = function (c) {
      // jshint unused:false
      var token = null;
      var resulting_string = null;
      var directives = null;

      if (c === '<') {
        var peek1 = this._input.peek(1);

        if (peek1 === '!' || peek1 === '?') {
          resulting_string = this.__patterns.conditional_comment.read();
          resulting_string = resulting_string || this.__patterns.processing.read();
        }

        if (resulting_string) {
          token = this._create_token(TOKEN.COMMENT, resulting_string);
          token.directives = directives;
        }
      }

      return token;
    };

    Tokenizer.prototype._read_open = function (c, open_token) {
      var resulting_string = null;
      var token = null;

      if (!open_token) {
        if (c === '<') {
          resulting_string = this._input.next();

          if (this._input.peek() === '/') {
            resulting_string += this._input.next();
          }

          resulting_string += this.__patterns.element_name.read();
          token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
        }
      }

      return token;
    };

    Tokenizer.prototype._read_open_handlebars = function (c, open_token) {
      var resulting_string = null;
      var token = null;

      if (!open_token) {
        if (this._options.indent_handlebars && c === '{' && this._input.peek(1) === '{') {
          if (this._input.peek(2) === '!') {
            resulting_string = this.__patterns.handlebars_comment.read();
            resulting_string = resulting_string || this.__patterns.handlebars.read();
            token = this._create_token(TOKEN.COMMENT, resulting_string);
          } else {
            resulting_string = this.__patterns.handlebars_open.read();
            token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
          }
        }
      }

      return token;
    };

    Tokenizer.prototype._read_close = function (c, open_token) {
      var resulting_string = null;
      var token = null;

      if (open_token) {
        if (open_token.text[0] === '<' && (c === '>' || c === '/' && this._input.peek(1) === '>')) {
          resulting_string = this._input.next();

          if (c === '/') {
            //  for close tag "/>"
            resulting_string += this._input.next();
          }

          token = this._create_token(TOKEN.TAG_CLOSE, resulting_string);
        } else if (open_token.text[0] === '{' && c === '}' && this._input.peek(1) === '}') {
          this._input.next();

          this._input.next();

          token = this._create_token(TOKEN.TAG_CLOSE, '}}');
        }
      }

      return token;
    };

    Tokenizer.prototype._read_attribute = function (c, previous_token, open_token) {
      var token = null;
      var resulting_string = '';

      if (open_token && open_token.text[0] === '<') {
        if (c === '=') {
          token = this._create_token(TOKEN.EQUALS, this._input.next());
        } else if (c === '"' || c === "'") {
          var content = this._input.next();

          if (c === '"') {
            content += this.__patterns.double_quote.read();
          } else {
            content += this.__patterns.single_quote.read();
          }

          token = this._create_token(TOKEN.VALUE, content);
        } else {
          resulting_string = this.__patterns.attribute.read();

          if (resulting_string) {
            if (previous_token.type === TOKEN.EQUALS) {
              token = this._create_token(TOKEN.VALUE, resulting_string);
            } else {
              token = this._create_token(TOKEN.ATTRIBUTE, resulting_string);
            }
          }
        }
      }

      return token;
    };

    Tokenizer.prototype._is_content_unformatted = function (tag_name) {
      // void_elements have no content and so cannot have unformatted content
      // script and style tags should always be read as unformatted content
      // finally content_unformatted and unformatted element contents are unformatted
      return this._options.void_elements.indexOf(tag_name) === -1 && (this._options.content_unformatted.indexOf(tag_name) !== -1 || this._options.unformatted.indexOf(tag_name) !== -1);
    };

    Tokenizer.prototype._read_raw_content = function (c, previous_token, open_token) {
      // jshint unused:false
      var resulting_string = '';

      if (open_token && open_token.text[0] === '{') {
        resulting_string = this.__patterns.handlebars_raw_close.read();
      } else if (previous_token.type === TOKEN.TAG_CLOSE && previous_token.opened.text[0] === '<' && previous_token.text[0] !== '/') {
        // ^^ empty tag has no content 
        var tag_name = previous_token.opened.text.substr(1).toLowerCase();

        if (tag_name === 'script' || tag_name === 'style') {
          // Script and style tags are allowed to have comments wrapping their content
          // or just have regular content.
          var token = this._read_comment_or_cdata(c);

          if (token) {
            token.type = TOKEN.TEXT;
            return token;
          }

          resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
        } else if (this._is_content_unformatted(tag_name)) {
          resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
        }
      }

      if (resulting_string) {
        return this._create_token(TOKEN.TEXT, resulting_string);
      }

      return null;
    };

    Tokenizer.prototype._read_content_word = function (c) {
      var resulting_string = '';

      if (this._options.unformatted_content_delimiter) {
        if (c === this._options.unformatted_content_delimiter[0]) {
          resulting_string = this.__patterns.unformatted_content_delimiter.read();
        }
      }

      if (!resulting_string) {
        resulting_string = this.__patterns.word.read();
      }

      if (resulting_string) {
        return this._create_token(TOKEN.TEXT, resulting_string);
      }
    };

    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    /***/
  }
  /******/
  ]);

  var style_html = legacy_beautify_html;
  /* Footer */

  if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (requireamd) {
      var js_beautify = __webpack_require__(1);
      var css_beautify = __webpack_require__(2);
      return {
        html_beautify: function html_beautify(html_source, options) {
          return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
        }
      };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var css_beautify, js_beautify; }
})();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * condense-newlines <https://github.com/jonschlinkert/condense-newlines>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */


var isWhitespace = __webpack_require__(15);

var extend = __webpack_require__(6);

var typeOf = __webpack_require__(17);

module.exports = function (str, options) {
  var opts = extend({}, options);
  var sep = opts.sep || '\n\n';
  var min = opts.min;
  var re;

  if (typeof min === 'number' && min !== 2) {
    re = new RegExp("(\\r\\n|\\n|\\u2424) {" + min + ',}');
  }

  if (typeof re === 'undefined') {
    re = opts.regex || /(\r\n|\n|\u2424){2,}/g;
  } // if a line is 100% whitespace it will be trimmed, so that
  // later we can condense newlines correctly


  if (opts.keepWhitespace !== true) {
    str = str.split('\n').map(function (line) {
      return isWhitespace(line) ? line.trim() : line;
    }).join('\n');
  }

  str = trailingNewline(str, opts);
  return str.replace(re, sep);
};

function trailingNewline(str, options) {
  var val = options.trailingNewline;

  if (val === false) {
    return str;
  }

  switch (typeOf(val)) {
    case 'string':
      str = str.replace(/\s+$/, options.trailingNewline);
      break;

    case 'function':
      str = options.trailingNewline(str);
      break;

    case 'undefined':
    case 'boolean':
    default:
      {
        str = str.replace(/\s+$/, '\n');
        break;
      }
  }

  return str;
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */


var cache;

module.exports = function isWhitespace(str) {
  return typeof str === 'string' && regex().test(str);
};

function regex() {
  // ensure that runtime compilation only happens once
  return cache || (cache = new RegExp("^[\\s\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF\"]+$"));
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */


module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null && (typeof val === 'object' || typeof val === 'function');
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(18);

var toString = Object.prototype.toString;
/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }

  if (val === null) {
    return 'null';
  }

  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }

  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }

  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  } // functions


  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  } // array


  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  } // check for instances of RegExp and Date before calling `toString`


  if (val instanceof RegExp) {
    return 'regexp';
  }

  if (val instanceof Date) {
    return 'date';
  } // other objects


  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }

  if (type === '[object Date]') {
    return 'date';
  }

  if (type === '[object Arguments]') {
    return 'arguments';
  }

  if (type === '[object Error]') {
    return 'error';
  } // buffer


  if (isBuffer(val)) {
    return 'buffer';
  } // es6: Map, WeakMap, Set, WeakSet


  if (type === '[object Set]') {
    return 'set';
  }

  if (type === '[object WeakSet]') {
    return 'weakset';
  }

  if (type === '[object Map]') {
    return 'map';
  }

  if (type === '[object WeakMap]') {
    return 'weakmap';
  }

  if (type === '[object Symbol]') {
    return 'symbol';
  } // typed arrays


  if (type === '[object Int8Array]') {
    return 'int8array';
  }

  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }

  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }

  if (type === '[object Int16Array]') {
    return 'int16array';
  }

  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }

  if (type === '[object Int32Array]') {
    return 'int32array';
  }

  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }

  if (type === '[object Float32Array]') {
    return 'float32array';
  }

  if (type === '[object Float64Array]') {
    return 'float64array';
  } // must be a plain object


  return 'object';
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "RendererWorker", function() { return /* binding */ RendererWorker; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(3);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/@ampproject/worker-dom/dist/worker/worker.js
var worker = __webpack_require__(7);
var worker_default = /*#__PURE__*/__webpack_require__.n(worker);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/react-dom/server.browser.js
var server_browser = __webpack_require__(9);
var server_browser_default = /*#__PURE__*/__webpack_require__.n(server_browser);

// EXTERNAL MODULE: ./node_modules/pretty/index.js
var pretty = __webpack_require__(11);
var pretty_default = /*#__PURE__*/__webpack_require__.n(pretty);

// CONCATENATED MODULE: ./src/components/utils/renderer/renderer.utils.tsx






var RendererModule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", {
              render: function () {
                var _render = _asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee(code, props) {
                  var cf, Component;
                  return regenerator_default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          cf = new Function("props", "React", code + "; return Component(props)");

                          Component = function Component(props) {
                            return cf(props, react);
                          };

                          return _context.abrupt("return", String(pretty_default()(server_browser_default.a.renderToString( /*#__PURE__*/react["createElement"](Component, props)), {
                            ocd: true
                          })).toString());

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function render(_x, _x2) {
                  return _render.apply(this, arguments);
                }

                return render;
              }()
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function RendererModule() {
    return _ref.apply(this, arguments);
  };
}();
// CONCATENATED MODULE: ./node_modules/workerize-loader/dist/rpc-worker-loader.js!./node_modules/gatsby/dist/utils/babel-loader.js??ref--20!./src/components/utils/renderer/renderer.worker.ts





var RendererWorker = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
    var window, document;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("RENDER WORKER");
            window = worker_default.a.workerDOM;
            document = worker_default.a.workerDOM.document;
            console.log("WE are the worker", window, document);
            _context.next = 6;
            return RendererModule();

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function RendererWorker() {
    return _ref.apply(this, arguments);
  };
}();
addEventListener('message', function (e) {var _e$data = e.data,type = _e$data.type,method = _e$data.method,id = _e$data.id,params = _e$data.params,f,p;if (type === 'RPC' && method) {if (f = __webpack_exports__[method]) {p = Promise.resolve().then(function () {return f.apply(__webpack_exports__, params);});} else {p = Promise.reject('No such method');}p.then(function (result) {postMessage({type: 'RPC',id: id,result: result});}).catch(function (e) {var error = {message: e};if (e.stack) {error.message = e.message;error.stack = e.stack;error.name = e.name;}postMessage({type: 'RPC',id: id,error: error});});}});postMessage({type: 'RPC',method: 'ready'});

/***/ })
/******/ ]);
//# sourceMappingURL=built-renderer.a26295.worker.js.map