(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[5],{

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AnimateLayoutFeature */
/* unused harmony export AnimatePresence */
/* unused harmony export AnimateSharedLayout */
/* unused harmony export AnimationControls */
/* unused harmony export AnimationFeature */
/* unused harmony export DragControls */
/* unused harmony export DragFeature */
/* unused harmony export ExitFeature */
/* unused harmony export GesturesFeature */
/* unused harmony export HTMLVisualElement */
/* unused harmony export MotionConfig */
/* unused harmony export MotionConfigContext */
/* unused harmony export MotionContext */
/* unused harmony export MotionValue */
/* unused harmony export PresenceContext */
/* unused harmony export ReducedMotion */
/* unused harmony export SharedLayoutContext */
/* unused harmony export VisibilityAction */
/* unused harmony export VisualElementAnimationControls */
/* unused harmony export addScaleCorrection */
/* unused harmony export animationControls */
/* unused harmony export createBatcher */
/* unused harmony export createDomMotionComponent */
/* unused harmony export createMotionComponent */
/* unused harmony export isValidMotionProp */
/* unused harmony export m */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return motion; });
/* unused harmony export motionValue */
/* unused harmony export resolveMotionValue */
/* unused harmony export startAnimation */
/* unused harmony export transform */
/* unused harmony export useAnimatedState */
/* unused harmony export useAnimation */
/* unused harmony export useCycle */
/* unused harmony export useDomEvent */
/* unused harmony export useDragControls */
/* unused harmony export useElementScroll */
/* unused harmony export useExternalRef */
/* unused harmony export useGestures */
/* unused harmony export useInvertedScale */
/* unused harmony export useIsPresent */
/* unused harmony export useMotionTemplate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useMotionValue; });
/* unused harmony export usePanGesture */
/* unused harmony export usePresence */
/* unused harmony export useReducedMotion */
/* unused harmony export useSpring */
/* unused harmony export useTapGesture */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return useTransform; });
/* unused harmony export useViewportScroll */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(215);
/* harmony import */ var framesync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(279);
/* harmony import */ var popmotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(431);
/* harmony import */ var hey_listen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(214);
/* harmony import */ var style_value_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(280);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);







var isRefObject = function isRefObject(ref) {
  return typeof ref === "object" && ref.hasOwnProperty("current");
};
/**
 * A generic subscription manager.
 */


var SubscriptionManager =
/** @class */
function () {
  function SubscriptionManager() {
    this.subscriptions = new Set();
  }

  SubscriptionManager.prototype.add = function (handler) {
    var _this = this;

    this.subscriptions.add(handler);
    return function () {
      return void _this.subscriptions.delete(handler);
    };
  };

  SubscriptionManager.prototype.notify = function (
  /**
   * Using ...args would be preferable but it's array creation and this
   * might be fired every frame.
   */
  a, b, c) {
    var e_1, _a;

    if (!this.subscriptions.size) return;

    try {
      for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __values */ "g"])(this.subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
        var handler = _c.value;
        handler(a, b, c);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  SubscriptionManager.prototype.clear = function () {
    this.subscriptions.clear();
  };

  return SubscriptionManager;
}();

var isFloat = function isFloat(value) {
  return !isNaN(parseFloat(value));
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */


var MotionValue =
/** @class */
function () {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  function MotionValue(init) {
    var _this = this;
    /**
     * Duration, in milliseconds, since last updating frame.
     *
     * @internal
     */


    this.timeDelta = 0;
    /**
     * Timestamp of the last time this `MotionValue` was updated.
     *
     * @internal
     */

    this.lastUpdated = 0;
    /**
     * Functions to notify when the `MotionValue` updates.
     *
     * @internal
     */

    this.updateSubscribers = new SubscriptionManager();
    /**
     * Functions to notify when the `MotionValue` updates and `render` is set to `true`.
     *
     * @internal
     */

    this.renderSubscribers = new SubscriptionManager();
    /**
     * Tracks whether this value can output a velocity. Currently this is only true
     * if the value is numerical, but we might be able to widen the scope here and support
     * other value types.
     *
     * @internal
     */

    this.canTrackVelocity = false;

    this.updateAndNotify = function (v, render) {
      if (render === void 0) {
        render = true;
      }

      _this.prev = _this.current;
      _this.current = v;

      if (_this.prev !== _this.current) {
        _this.updateSubscribers.notify(_this.current);
      }

      if (render) {
        _this.renderSubscribers.notify(_this.current);
      } // Update timestamp


      var _a = Object(framesync__WEBPACK_IMPORTED_MODULE_1__[/* getFrameData */ "c"])(),
          delta = _a.delta,
          timestamp = _a.timestamp;

      if (_this.lastUpdated !== timestamp) {
        _this.timeDelta = delta;
        _this.lastUpdated = timestamp;
        framesync__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].postRender(_this.scheduleVelocityCheck);
      }
    };
    /**
     * Schedule a velocity check for the next frame.
     *
     * This is an instanced and bound function to prevent generating a new
     * function once per frame.
     *
     * @internal
     */


    this.scheduleVelocityCheck = function () {
      return framesync__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].postRender(_this.velocityCheck);
    };
    /**
     * Updates `prev` with `current` if the value hasn't been updated this frame.
     * This ensures velocity calculations return `0`.
     *
     * This is an instanced and bound function to prevent generating a new
     * function once per frame.
     *
     * @internal
     */


    this.velocityCheck = function (_a) {
      var timestamp = _a.timestamp;

      if (timestamp !== _this.lastUpdated) {
        _this.prev = _this.current;
      }
    };

    this.set(init, false);
    this.canTrackVelocity = isFloat(this.current);
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * @library
   *
   * ```jsx
   * function MyComponent() {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.onChange(updateOpacity)
   *     const unsubscribeY = y.onChange(updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <Frame x={x} />
   * }
   * ```
   *
   * @motion
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.onChange(updateOpacity)
   *     const unsubscribeY = y.onChange(updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @internalremarks
   *
   * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
   *
   * ```jsx
   * useOnChange(x, () => {})
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @public
   */


  MotionValue.prototype.onChange = function (subscription) {
    return this.updateSubscribers.add(subscription);
  };

  MotionValue.prototype.clearListeners = function () {
    this.updateSubscribers.clear();
  };
  /**
   * Adds a function that will be notified when the `MotionValue` requests a render.
   *
   * @param subscriber - A function that's provided the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @internal
   */


  MotionValue.prototype.onRenderRequest = function (subscription) {
    // Render immediately
    subscription(this.get());
    return this.renderSubscribers.add(subscription);
  };
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */


  MotionValue.prototype.attach = function (passiveEffect) {
    this.passiveEffect = passiveEffect;
  };
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */


  MotionValue.prototype.set = function (v, render) {
    if (render === void 0) {
      render = true;
    }

    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  };
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */


  MotionValue.prototype.get = function () {
    return this.current;
  };
  /**
   * @public
   */


  MotionValue.prototype.getPrevious = function () {
    return this.prev;
  };
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */


  MotionValue.prototype.getVelocity = function () {
    // This could be isFloat(this.prev) && isFloat(this.current), but that would be wasteful
    return this.canTrackVelocity ? // These casts could be avoided if parseFloat would be typed better
    Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* velocityPerSecond */ "x"])(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  };
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */


  MotionValue.prototype.start = function (animation) {
    var _this = this;

    this.stop();
    return new Promise(function (resolve) {
      _this.stopAnimation = animation(resolve);
    }).then(function () {
      return _this.clearAnimation();
    });
  };
  /**
   * Stop the currently active animation.
   *
   * @public
   */


  MotionValue.prototype.stop = function () {
    if (this.stopAnimation) this.stopAnimation();
    this.clearAnimation();
  };
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */


  MotionValue.prototype.isAnimating = function () {
    return !!this.stopAnimation;
  };

  MotionValue.prototype.clearAnimation = function () {
    this.stopAnimation = null;
  };
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */


  MotionValue.prototype.destroy = function () {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
  };

  return MotionValue;
}();
/**
 * @internal
 */


function motionValue(init) {
  return new MotionValue(init);
}
/**
 * VisualElement is an abstract class that provides a generic animation-optimised interface to the
 * underlying renderer.
 *
 * Currently many features interact directly with HTMLVisualElement/SVGVisualElement
 * but the idea is we can create, for instance, a ThreeVisualElement that extends
 * VisualElement and we can quickly offer all the same features.
 */


var VisualElement =
/** @class */
function () {
  function VisualElement(parent, ref) {
    var _this = this; // An iterable list of current children


    this.children = new Set(); // The latest resolved MotionValues

    this.latest = {}; // A map of MotionValues used to animate this element

    this.values = new Map(); // Unsubscription callbacks for MotionValue subscriptions

    this.valueSubscriptions = new Map(); // A configuration for this VisualElement, each derived class can extend this.

    this.config = {}; // A pre-bound call to the user-provided `onUpdate` callback. This won't
    // be called more than once per frame.

    this.update = function () {
      return _this.config.onUpdate(_this.latest);
    }; // Pre-bound version of render


    this.triggerRender = function () {
      return _this.render();
    }; // This function gets passed to the rendered component's `ref` prop
    // and is used to mount/unmount the VisualElement


    this.ref = function (element) {
      element ? _this.mount(element) : _this.unmount();
      if (!_this.externalRef) return;

      if (typeof _this.externalRef === "function") {
        _this.externalRef(element);
      } else if (isRefObject(_this.externalRef)) {
        _this.externalRef.current = element;
      }
    }; // Create a relationship with the provided parent.


    this.parent = parent;
    this.rootParent = parent ? parent.rootParent : this;
    this.treePath = parent ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(parent.treePath, [parent]) : []; // Calculate the depth of this node in the VisualElement graph

    this.depth = parent ? parent.depth + 1 : 0; // A reference to any externally-defined React ref. This might live better
    // outside the VisualElement and be handled in a hook.

    this.externalRef = ref;
  }

  VisualElement.prototype.subscribe = function (child) {
    var _this = this;

    this.children.add(child);
    return function () {
      return _this.children.delete(child);
    };
  }; // Check whether this element has a MotionValue of the provided key


  VisualElement.prototype.hasValue = function (key) {
    return this.values.has(key);
  }; // Add a MotionValue


  VisualElement.prototype.addValue = function (key, value) {
    if (this.hasValue(key)) this.removeValue(key);
    this.values.set(key, value);
    this.setSingleStaticValue(key, value.get());
    this.subscribeToValue(key, value);
  }; // Remove a MotionValue


  VisualElement.prototype.removeValue = function (key) {
    var _a;

    (_a = this.valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
    this.valueSubscriptions.delete(key);
    this.values.delete(key);
    delete this.latest[key];
  };

  VisualElement.prototype.getValue = function (key, defaultValue) {
    var value = this.values.get(key);

    if (value === undefined && defaultValue !== undefined) {
      value = new MotionValue(defaultValue);
      this.addValue(key, value);
    }

    return value;
  }; // Iterate over all MotionValues


  VisualElement.prototype.forEachValue = function (callback) {
    this.values.forEach(callback);
  }; // Get the underlying rendered instance of this VisualElement. For instance in
  // HTMLVisualElement this will be a HTMLElement.


  VisualElement.prototype.getInstance = function () {
    return this.element;
  };

  VisualElement.prototype.updateConfig = function (config) {
    if (config === void 0) {
      config = {};
    }

    this.config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, config);
  }; // Set a single `latest` value


  VisualElement.prototype.setSingleStaticValue = function (key, value) {
    this.latest[key] = value;
  }; // Statically set values to `latest` without needing a MotionValue


  VisualElement.prototype.setStaticValues = function (values, value) {
    if (typeof values === "string") {
      this.setSingleStaticValue(values, value);
    } else {
      for (var key in values) {
        this.setSingleStaticValue(key, values[key]);
      }
    }
  };

  VisualElement.prototype.scheduleRender = function () {
    framesync__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].render(this.triggerRender, false, true);
  };

  VisualElement.prototype.scheduleUpdateLayoutDelta = function () {
    framesync__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].preRender(this.rootParent.updateLayoutDelta, false, true);
  };

  VisualElement.prototype.subscribeToValue = function (key, value) {
    var _this = this;

    var onChange = function onChange(latest) {
      _this.setSingleStaticValue(key, latest); // Schedule onUpdate if we have an onUpdate listener and the component has mounted


      _this.element && _this.config.onUpdate && framesync__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].update(_this.update, false, true);
    };

    var onRender = function onRender() {
      _this.element && _this.scheduleRender();
    };

    var unsubscribeOnChange = value.onChange(onChange);
    var unsubscribeOnRender = value.onRenderRequest(onRender);
    this.valueSubscriptions.set(key, function () {
      unsubscribeOnChange();
      unsubscribeOnRender();
    });
  }; // Mount the VisualElement with the actual DOM element


  VisualElement.prototype.mount = function (element) {
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(!!element, "No ref found. Ensure components created with motion.custom forward refs using React.forwardRef");

    if (this.parent) {
      this.removeFromParent = this.parent.subscribe(this);
    }
    /**
     * Save the element to this.element as a semantic API, this.current to the VisualElement
     * is compatible with existing RefObject APIs.
     */


    this.element = this.current = element;
  }; // Unmount the VisualElement and cancel any scheduled updates


  VisualElement.prototype.unmount = function () {
    var _this = this;

    this.forEachValue(function (_, key) {
      return _this.removeValue(key);
    });
    framesync__WEBPACK_IMPORTED_MODULE_1__[/* cancelSync */ "a"].update(this.update);
    framesync__WEBPACK_IMPORTED_MODULE_1__[/* cancelSync */ "a"].render(this.render);
    this.removeFromParent && this.removeFromParent();
  };

  return VisualElement;
}();

function noop(any) {
  return any;
}
/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */


function convertBoundingBoxToAxisBox(_a) {
  var top = _a.top,
      left = _a.left,
      right = _a.right,
      bottom = _a.bottom;
  return {
    x: {
      min: left,
      max: right
    },
    y: {
      min: top,
      max: bottom
    }
  };
}

function convertAxisBoxToBoundingBox(_a) {
  var x = _a.x,
      y = _a.y;
  return {
    top: y.min,
    bottom: y.max,
    left: x.min,
    right: x.max
  };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */


function transformBoundingBox(_a, transformPoint) {
  var top = _a.top,
      left = _a.left,
      bottom = _a.bottom,
      right = _a.right;

  if (transformPoint === void 0) {
    transformPoint = noop;
  }

  var topLeft = transformPoint({
    x: left,
    y: top
  });
  var bottomRight = transformPoint({
    x: right,
    y: bottom
  });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
/**
 * Create an empty axis box of zero size
 */


function axisBox() {
  return {
    x: {
      min: 0,
      max: 1
    },
    y: {
      min: 0,
      max: 1
    }
  };
}

function copyAxisBox(box) {
  return {
    x: Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, box.x),
    y: Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, box.y)
  };
}
/**
 * Create an empty box delta
 */


var zeroDelta = {
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
};

function delta() {
  return {
    x: Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, zeroDelta),
    y: Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, zeroDelta)
  };
}
/**
 * ValueType for "auto"
 */


var auto = {
  test: function test(v) {
    return v === "auto";
  },
  parse: function parse(v) {
    return v;
  }
};
/**
 * ValueType for ints
 */

var int = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* number */ "g"]), {
  transform: Math.round
});
/**
 * A map of default value types for common values
 */


var defaultValueTypes = {
  // Color props
  color: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  backgroundColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  outlineColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  fill: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  stroke: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  // Border props
  borderColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  borderTopColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  borderRightColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  borderBottomColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  borderLeftColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"],
  borderWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderTopWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderRightWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderBottomWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderLeftWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  radius: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderTopLeftRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderTopRightRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderBottomRightRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  borderBottomLeftRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  // Positioning props
  width: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  maxWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  height: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  maxHeight: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  size: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  top: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  right: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  bottom: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  left: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  // Spacing props
  padding: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  paddingTop: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  paddingRight: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  paddingBottom: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  paddingLeft: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  margin: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  marginTop: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  marginRight: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  marginBottom: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  marginLeft: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  // Transform props
  rotate: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* degrees */ "d"],
  rotateX: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* degrees */ "d"],
  rotateY: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* degrees */ "d"],
  rotateZ: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* degrees */ "d"],
  scale: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* scale */ "l"],
  scaleX: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* scale */ "l"],
  scaleY: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* scale */ "l"],
  scaleZ: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* scale */ "l"],
  skew: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* degrees */ "d"],
  skewX: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* degrees */ "d"],
  skewY: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* degrees */ "d"],
  distance: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  translateX: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  translateY: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  translateZ: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  x: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  y: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  z: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  perspective: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  transformPerspective: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  opacity: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* alpha */ "a"],
  originX: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* progressPercentage */ "i"],
  originY: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* progressPercentage */ "i"],
  originZ: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"],
  // Misc
  zIndex: int,
  // SVG
  fillOpacity: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* alpha */ "a"],
  strokeOpacity: style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* alpha */ "a"],
  numOctaves: int
};
/**
 * A list of value types commonly used for dimensions
 */

var dimensionValueTypes = [style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* number */ "g"], style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"], style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* percent */ "h"], style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* degrees */ "d"], style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* vw */ "n"], style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* vh */ "m"], auto];
/**
 * Tests a provided value against a ValueType
 */

var testValueType = function testValueType(v) {
  return function (type) {
    return type.test(v);
  };
};
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */


var findDimensionValueType = function findDimensionValueType(v) {
  return dimensionValueTypes.find(testValueType(v));
};
/**
 * A list of all ValueTypes
 */


var valueTypes = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(dimensionValueTypes, [style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* color */ "b"], style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* complex */ "c"]]);
/**
 * Tests a value against the list of ValueTypes
 */


var findValueType = function findValueType(v) {
  return valueTypes.find(testValueType(v));
};
/**
 * Gets the default ValueType for the provided value key
 */


var getDefaultValueType = function getDefaultValueType(key) {
  return defaultValueTypes[key];
};
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */


var getValueAsType = function getValueAsType(value, type) {
  return type && typeof value === "number" ? type.transform(value) : value;
};
/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */


var transformAxes = ["", "X", "Y", "Z"];
/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */

var order = ["perspective", "translate", "scale", "rotate", "skew"];
/**
 * Used to store the keys of all transforms that will distorted a measured bounding box.
 */

var boxDistortingKeys = new Set();
/**
 * Generate a list of every possible transform key.
 */

var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function (operationKey) {
  var isDistorting = new Set(["rotate", "skew"]).has(operationKey);
  transformAxes.forEach(function (axesKey) {
    var key = operationKey + axesKey;
    transformProps.push(key);
    isDistorting && boxDistortingKeys.add(key);
  });
});
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */

function sortTransformProps(a, b) {
  return transformProps.indexOf(a) - transformProps.indexOf(b);
}
/**
 * A quick lookup for transform props.
 */


var transformPropSet = new Set(transformProps);

function isTransformProp(key) {
  return transformPropSet.has(key);
}
/**
 * A quick lookup for transform origin props
 */


var transformOriginProps = new Set(["originX", "originY", "originZ"]);

function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}

var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */

function buildTransform(transform, transformKeys, transformTemplate, transformIsDefault, enableHardwareAcceleration, allowTransformNone) {
  if (enableHardwareAcceleration === void 0) {
    enableHardwareAcceleration = true;
  }

  if (allowTransformNone === void 0) {
    allowTransformNone = true;
  } // The transform string we're going to build into.


  var transformString = ""; // Transform keys into their default order - this will determine the output order.

  transformKeys.sort(sortTransformProps); // Track whether the defined transform has a defined z so we don't add a
  // second to enable hardware acceleration

  var transformHasZ = false; // Loop over each transform and build them into transformString

  var numTransformKeys = transformKeys.length;

  for (var i = 0; i < numTransformKeys; i++) {
    var key = transformKeys[i];
    transformString += (translateAlias[key] || key) + "(" + transform[key] + ") ";
    if (key === "z") transformHasZ = true;
  }

  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  } // If we have a custom `transform` template, pass our transform values and
  // generated transformString to that before returning


  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }

  return transformString;
}
/**
 * Build a transformOrigin style. Uses the same defaults as the browser for
 * undefined origins.
 */


function buildTransformOrigin(_a) {
  var _b = _a.originX,
      originX = _b === void 0 ? "50%" : _b,
      _c = _a.originY,
      originY = _c === void 0 ? "50%" : _c,
      _d = _a.originZ,
      originZ = _d === void 0 ? 0 : _d;
  return originX + " " + originY + " " + originZ;
}
/**
 * Build a transform style that takes a calculated delta between the element's current
 * space on screen and projects it into the desired space.
 */


function buildLayoutProjectionTransform(_a, treeScale) {
  var x = _a.x,
      y = _a.y;
  /**
   * The translations we use to calculate are always relative to the viewport coordinate space.
   * But when we apply scales, we also scale the coordinate space of an element and its children.
   * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
   * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
   */

  var xTranslate = x.translate / treeScale.x;
  var yTranslate = y.translate / treeScale.y;
  return "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) scale(" + x.scale + ", " + y.scale + ")";
}

var identityProjection = buildLayoutProjectionTransform(delta(), {
  x: 1,
  y: 1
});
/**
 * Take the calculated delta origin and apply it as a transform string.
 */

function buildLayoutProjectionTransformOrigin(_a) {
  var x = _a.x,
      y = _a.y;
  return x.origin * 100 + "% " + y.origin * 100 + "% 0";
}
/**
 * Build a transform string only from the properties that distort bounding box measurements
 * (rotate and skew)
 */


function buildBoxDistortingTransforms(transform, transformKeys) {
  var transformString = "";
  transformKeys.sort(sortTransformProps);
  var numTransformKeys = transformKeys.length;

  for (var i = 0; i < numTransformKeys; i++) {
    var key = transformKeys[i];

    if (boxDistortingKeys.has(key)) {
      transformString += key + "(" + transform[key] + ") ";
    }
  }

  return transformString;
}
/**
 * Returns true if the provided key is a CSS variable
 */


function isCSSVariable(key) {
  return key.startsWith("--");
}

function isCSSVariable$1(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */


var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;

function parseCSSVariable(current) {
  var match = cssVariableRegex.exec(current);
  if (!match) return [,];

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(match, 3),
      token = _a[1],
      fallback = _a[2];

  return [token, fallback];
}

var maxDepth = 4;

function getVariableValue(current, element, depth) {
  if (depth === void 0) {
    depth = 1;
  }

  Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(depth <= maxDepth, "Max CSS variable fallback depth detected in property \"" + current + "\". This may indicate a circular fallback dependency.");

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(parseCSSVariable(current), 2),
      token = _a[0],
      fallback = _a[1]; // No CSS variable detected


  if (!token) return; // Attempt to read this CSS variable off the element

  var resolved = window.getComputedStyle(element).getPropertyValue(token);

  if (resolved) {
    return resolved;
  } else if (isCSSVariable$1(fallback)) {
    // The fallback might itself be a CSS variable, in which case we attempt to resolve it too.
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
/**
 * Resolve CSS variables from
 *
 * @internal
 */


function resolveCSSVariables(visualElement, _a, transitionEnd) {
  var _b;

  var target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, []);

  var element = visualElement.getInstance();
  if (!(element instanceof HTMLElement)) return {
    target: target,
    transitionEnd: transitionEnd
  }; // If `transitionEnd` isn't `undefined`, clone it. We could clone `target` and `transitionEnd`
  // only if they change but I think this reads clearer and this isn't a performance-critical path.

  if (transitionEnd) {
    transitionEnd = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, transitionEnd);
  } // Go through existing `MotionValue`s and ensure any existing CSS variables are resolved


  visualElement.forEachValue(function (value) {
    var current = value.get();
    if (!isCSSVariable$1(current)) return;
    var resolved = getVariableValue(current, element);
    if (resolved) value.set(resolved);
  }); // Cycle through every target property and resolve CSS variables. Currently
  // we only read single-var properties like `var(--foo)`, not `calc(var(--foo) + 20px)`

  for (var key in target) {
    var current = target[key];
    if (!isCSSVariable$1(current)) continue;
    var resolved = getVariableValue(current, element);
    if (!resolved) continue; // Clone target if it hasn't already been

    target[key] = resolved; // If the user hasn't already set this key on `transitionEnd`, set it to the unresolved
    // CSS variable. This will ensure that after the animation the component will reflect
    // changes in the value of the CSS variable.

    if (transitionEnd) (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
  }

  return {
    target: target,
    transitionEnd: transitionEnd
  };
}

function pixelsToPercent(pixels, axis) {
  return pixels / (axis.max - axis.min) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */


function correctBorderRadius(latest, viewportBox) {
  /**
   * If latest is a string, if it's a percentage we can return immediately as it's
   * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
   */
  if (typeof latest === "string") {
    if (style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"].test(latest)) {
      latest = parseFloat(latest);
    } else {
      return latest;
    }
  }
  /**
   * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
   * pixel value as a percentage of each axis
   */


  var x = pixelsToPercent(latest, viewportBox.x);
  var y = pixelsToPercent(latest, viewportBox.y);
  return x + "% " + y + "%";
}

var varToken = "_$css";

function correctBoxShadow(latest, _viewportBox, delta, treeScale) {
  var original = latest;
  /**
   * We need to first strip and store CSS variables from the string.
   */

  var containsCSSVariables = latest.includes("var(");
  var cssVariables = [];

  if (containsCSSVariables) {
    latest = latest.replace(cssVariableRegex, function (match) {
      cssVariables.push(match);
      return varToken;
    });
  }

  var shadow = style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* complex */ "c"].parse(latest); // TODO: Doesn't support multiple shadows

  if (shadow.length > 5) return original;
  var template = style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* complex */ "c"].createTransformer(latest);
  var offset = typeof shadow[0] !== "number" ? 1 : 0; // Calculate the overall context scale

  var xScale = delta.x.scale * treeScale.x;
  var yScale = delta.y.scale * treeScale.y;
  shadow[0 + offset] /= xScale;
  shadow[1 + offset] /= yScale;
  /**
   * Ideally we'd correct x and y scales individually, but because blur and
   * spread apply to both we have to take a scale average and apply that instead.
   * We could potentially improve the outcome of this by incorporating the ratio between
   * the two scales.
   */

  var averageScale = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(xScale, yScale, 0.5); // Blur

  if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale; // Spread

  if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
  var output = template(shadow);

  if (containsCSSVariables) {
    var i_1 = 0;
    output = output.replace(varToken, function () {
      var cssVariable = cssVariables[i_1];
      i_1++;
      return cssVariable;
    });
  }

  return output;
}

var borderCorrectionDefinition = {
  process: correctBorderRadius
};
var valueScaleCorrection = {
  borderRadius: Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, borderCorrectionDefinition), {
    applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
  }),
  borderTopLeftRadius: borderCorrectionDefinition,
  borderTopRightRadius: borderCorrectionDefinition,
  borderBottomLeftRadius: borderCorrectionDefinition,
  borderBottomRightRadius: borderCorrectionDefinition,
  boxShadow: {
    process: correctBoxShadow
  }
};
/**
 * @internal
 */

function addScaleCorrection(correctors) {
  for (var key in correctors) {
    valueScaleCorrection[key] = correctors[key];
  }
}
/**
 * Build style and CSS variables
 *
 * This function converts a Motion style prop:
 *
 * { x: 100, width: 100, originX: 0.5 }
 *
 * Into an object with default value types applied and default
 * transform order set:
 *
 * {
 *   transform: 'translateX(100px) translateZ(0)`,
 *   width: '100px',
 *   transformOrigin: '50% 50%'
 * }
 *
 * Styles are saved to `style` and CSS vars to `vars`.
 *
 * This function works with mutative data structures.
 */


function buildHTMLStyles(latest, style, vars, transform, transformOrigin, transformKeys, _a, isLayoutProjectionEnabled, delta, deltaFinal, treeScale, targetBox) {
  var enableHardwareAcceleration = _a.enableHardwareAcceleration,
      transformTemplate = _a.transformTemplate,
      allowTransformNone = _a.allowTransformNone; // Empty the transformKeys array. As we're throwing out refs to its items
  // this might not be as cheap as suspected. Maybe using the array as a buffer
  // with a manual incrementation would be better.

  transformKeys.length = 0; // Track whether we encounter any transform or transformOrigin values.

  var hasTransform = false;
  var hasTransformOrigin = false; // Does the calculated transform essentially equal "none"?

  var transformIsNone = true;
  /**
   * Loop over all our latest animated values and decide whether to handle them
   * as a style or CSS variable. Transforms and transform origins are kept seperately
   * for further processing
   */

  for (var key in latest) {
    var value = latest[key]; // Convert the value to its default value type, ie 0 -> "0px"

    var valueType = getDefaultValueType(key);
    var valueAsType = getValueAsType(value, valueType);

    if (isTransformProp(key)) {
      // If this is a transform, flag and enable further transform processing
      hasTransform = true;
      transform[key] = valueAsType;
      transformKeys.push(key);
      if (!transformIsNone) continue; // If all the transform keys we've so far encountered are their default value
      // then check to see if this one isn't

      var defaultValue = valueType.default !== undefined ? valueType.default : 0;
      if (value !== defaultValue) transformIsNone = false;
    } else if (isTransformOriginProp(key)) {
      // If this is a transform origin, flag and enable further transform-origin processing
      transformOrigin[key] = valueAsType;
      hasTransformOrigin = true;
    } else if (key !== "transform" || typeof value !== "function") {
      // Handle all remaining values. Decide which map to save to depending
      // on whether this is a CSS variable
      var bucket = isCSSVariable(key) ? vars : style; // If we need to perform scale correction, and we have a handler for this
      // value type (ie borderRadius), perform it

      if (isLayoutProjectionEnabled && valueScaleCorrection[key]) {
        var corrected = valueScaleCorrection[key].process(value, targetBox, delta, treeScale);
        /**
         * Scale-correctable values can define a number of other values to break
         * down into. For instance borderRadius needs applying to borderBottomLeftRadius etc
         */

        var applyTo = valueScaleCorrection[key].applyTo;

        if (applyTo) {
          var num = applyTo.length;

          for (var i = 0; i < num; i++) {
            bucket[applyTo[i]] = corrected;
          }
        } else {
          bucket[key] = corrected;
        }
      } else {
        bucket[key] = valueAsType;
      }
    }
  }
  /**
   * Build transform and transformOrigin. If we're performing layout projection these need
   * to be based off the deltaFinal data. Any user-set origins will have been pre-baked
   * into the deltaFinal.
   */


  if (isLayoutProjectionEnabled) {
    style.transform = buildLayoutProjectionTransform(deltaFinal, treeScale);
    if (style.transform === identityProjection) style.transform = "";
    /**
     * If we have transform styles, build only those that distort bounding boxes (rotate/skew)
     * as translations and scales will already have been used to calculate deltaFinal.
     */

    if (hasTransform) {
      style.transform += " " + buildBoxDistortingTransforms(transform, transformKeys);
      style.transform = style.transform.trim();
    }

    if (transformTemplate) {
      style.transform = transformTemplate(transform, style.transform);
    }

    style.transformOrigin = buildLayoutProjectionTransformOrigin(deltaFinal);
  } else {
    if (hasTransform) {
      style.transform = buildTransform(transform, transformKeys, transformTemplate, transformIsNone, enableHardwareAcceleration, allowTransformNone);
    }

    if (hasTransformOrigin) {
      style.transformOrigin = buildTransformOrigin(transformOrigin);
    }
  }
}
/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */


function resetAxis(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */


function resetBox(box, originBox) {
  resetAxis(box.x, originBox.x);
  resetAxis(box.y, originBox.y);
}
/**
 * Scales a point based on a factor and an originPoint
 */


function scalePoint(point, scale, originPoint) {
  var distanceFromOrigin = point - originPoint;
  var scaled = scale * distanceFromOrigin;
  return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */


function applyPointDelta(point, translate, scale, originPoint, boxScale) {
  if (boxScale !== undefined) {
    point = scalePoint(point, boxScale, originPoint);
  }

  return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */


function applyAxisDelta(axis, translate, scale, originPoint, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }

  if (scale === void 0) {
    scale = 1;
  }

  axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */


function applyBoxDelta(box, _a) {
  var x = _a.x,
      y = _a.y;
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */


function applyAxisTransforms(final, axis, transforms, _a) {
  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(_a, 3),
      key = _b[0],
      scaleKey = _b[1],
      originKey = _b[2]; // Copy the current axis to the final axis before mutation


  final.min = axis.min;
  final.max = axis.max;
  var axisOrigin = transforms[originKey] !== undefined ? transforms[originKey] : 0.5;
  var originPoint = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(axis.min, axis.max, axisOrigin); // Apply the axis delta to the final axis

  applyAxisDelta(final, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */


var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
/**
 * Apply a transform to a box from the latest resolved motion values.
 */

function applyBoxTransforms(finalBox, box, transforms) {
  applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
  applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */


function removePointDelta(point, translate, scale, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale, originPoint);

  if (boxScale !== undefined) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }

  return point;
}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */


function removeAxisDelta(axis, translate, scale, origin, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }

  if (scale === void 0) {
    scale = 1;
  }

  if (origin === void 0) {
    origin = 0.5;
  }

  var originPoint = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(axis.min, axis.max, origin) - translate;
  axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */


function removeAxisTransforms(axis, transforms, _a) {
  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(_a, 3),
      key = _b[0],
      scaleKey = _b[1],
      originKey = _b[2];

  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale);
}
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */


function removeBoxTransforms(box, transforms) {
  removeAxisTransforms(box.x, transforms, xKeys);
  removeAxisTransforms(box.y, transforms, yKeys);
}
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within HTMLVisualElement.updateLayoutDelta
 */


function applyTreeDeltas(box, treePath) {
  var treeLength = treePath.length;

  for (var i = 0; i < treeLength; i++) {
    applyBoxDelta(box, treePath[i].delta);
  }
}

var clampProgress = function clampProgress(v) {
  return Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* clamp */ "l"])(0, 1, v);
};
/**
 * Returns true if the provided value is within maxDistance of the provided target
 */


function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }

  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }

  return Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* distance */ "n"])(value, target) < maxDistance;
}
/**
 * Calculate the translate needed to be applied to source to get target
 */


function calcTranslate(source, target, origin) {
  var sourcePoint = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(source.min, source.max, origin);
  var targetPoint = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(target.min, target.max, origin);
  return targetPoint - sourcePoint;
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */


function calcOrigin(source, target) {
  var origin = 0.5;
  var sourceLength = source.max - source.min;
  var targetLength = target.max - target.min;

  if (targetLength > sourceLength) {
    origin = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* progress */ "w"])(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* progress */ "w"])(source.min, source.max - targetLength, target.min);
  }

  return clampProgress(origin);
}
/**
 * Update the AxisDelta with a transform that projects source into target.
 *
 * The transform `origin` is optional. If not provided, it'll be automatically
 * calculated based on the relative positions of the two bounding boxes.
 */


function updateAxisDelta(delta, source, target, origin) {
  var sourceLength = source.max - source.min;
  var targetLength = target.max - target.min;
  delta.origin = origin === undefined ? calcOrigin(source, target) : origin;
  delta.originPoint = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(source.min, source.max, delta.origin);
  delta.scale = targetLength / sourceLength;
  if (isNear(delta.scale, 1, 0.0001)) delta.scale = 1;
  delta.translate = calcTranslate(source, target, delta.origin);
  if (isNear(delta.translate)) delta.translate = 0;
}
/**
 * Update the BoxDelta with a transform that projects the source into the target.
 *
 * The transform `origin` is optional. If not provided, it'll be automatically
 * calculated based on the relative positions of the two bounding boxes.
 */


function updateBoxDelta(delta, source, target, origin) {
  updateAxisDelta(delta.x, source.x, target.x, origin);
  updateAxisDelta(delta.y, source.y, target.y, origin);
}
/**
 * Update the treeScale by incorporating the parent's latest scale into its treeScale.
 */


function updateTreeScale(treeScale, parentTreeScale, parentDelta) {
  treeScale.x = parentTreeScale.x * parentDelta.x.scale;
  treeScale.y = parentTreeScale.y * parentDelta.y.scale;
} // Call a handler once for each axis


function eachAxis(handler) {
  return [handler("x"), handler("y")];
}
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */


var secondsToMilliseconds = function secondsToMilliseconds(seconds) {
  return seconds * 1000;
};

var easingLookup = {
  linear: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* linear */ "t"],
  easeIn: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* easeIn */ "o"],
  easeInOut: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* easeInOut */ "p"],
  easeOut: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* easeOut */ "q"],
  circIn: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* circIn */ "i"],
  circInOut: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* circInOut */ "j"],
  circOut: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* circOut */ "k"],
  backIn: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* backIn */ "c"],
  backInOut: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* backInOut */ "d"],
  backOut: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* backOut */ "e"],
  anticipate: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* anticipate */ "b"],
  bounceIn: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* bounceIn */ "f"],
  bounceInOut: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* bounceInOut */ "g"],
  bounceOut: popmotion__WEBPACK_IMPORTED_MODULE_2__[/* bounceOut */ "h"]
};

var easingDefinitionToFunction = function easingDefinitionToFunction(definition) {
  if (Array.isArray(definition)) {
    // If cubic bezier definition, create bezier curve
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(definition.length === 4, "Cubic bezier arrays must contain four numerical values.");

    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(definition, 4),
        x1 = _a[0],
        y1 = _a[1],
        x2 = _a[2],
        y2 = _a[3];

    return Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* cubicBezier */ "m"])(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    // Else lookup from table
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(easingLookup[definition] !== undefined, "Invalid easing type '" + definition + "'");
    return easingLookup[definition];
  }

  return definition;
};

var isEasingArray = function isEasingArray(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};
/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */


var isAnimatable = function isAnimatable(key, value) {
  // If the list of keys tat might be non-animatable grows, replace with Set
  if (key === "zIndex") return false; // If it's a number or a keyframes array, we can animate it. We might at some point
  // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
  // but for now lets leave it like this for performance reasons

  if (typeof value === "number" || Array.isArray(value)) return true;

  if (typeof value === "string" && // It's animatable if we have a string
  style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* complex */ "c"].test(value) && // And it contains numbers and/or colors
  !value.startsWith("url(") // Unless it starts with "url("
  ) {
      return true;
    }

  return false;
};

var isKeyframesTarget = function isKeyframesTarget(v) {
  return Array.isArray(v);
};

var underDampedSpring = function underDampedSpring() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  };
};

var overDampedSpring = function overDampedSpring(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 100 : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
};

var linearTween = function linearTween() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 0.3
  };
};

var keyframes = function keyframes(values) {
  return {
    type: "keyframes",
    duration: 0.8,
    values: values
  };
};

var defaultTransitions = {
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: overDampedSpring,
  scaleY: overDampedSpring,
  scale: overDampedSpring,
  opacity: linearTween,
  backgroundColor: linearTween,
  color: linearTween,
  default: overDampedSpring
};

var getDefaultTransition = function getDefaultTransition(valueKey, to) {
  var transitionFactory;

  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }

  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
    to: to
  }, transitionFactory(to));
};
/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */


function isTransitionDefined(_a) {
  var when = _a.when,
      delay = _a.delay,
      delayChildren = _a.delayChildren,
      staggerChildren = _a.staggerChildren,
      staggerDirection = _a.staggerDirection,
      repeat = _a.repeat,
      repeatType = _a.repeatType,
      repeatDelay = _a.repeatDelay,
      from = _a.from,
      transition = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);

  return !!Object.keys(transition).length;
}
/**
 * Convert Framer Motion's Transition type into Popmotion-compatible options.
 */


function convertTransitionToAnimationOptions(_a) {
  var yoyo = _a.yoyo,
      loop = _a.loop,
      flip = _a.flip,
      ease = _a.ease,
      times = _a.times,
      transition = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["yoyo", "loop", "flip", "ease", "times"]);

  var options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, transition);

  if (times) {
    options.offset = times;
  }
  /**
   * Convert any existing durations from seconds to milliseconds
   */


  if (transition.duration) options["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay) options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  /**
   * Map easing names to Popmotion's easing functions
   */

  if (ease) {
    options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  /**
   * Support legacy transition API
   */


  if (transition.type === "tween") options.type = "keyframes";

  if (yoyo) {
    options.repeatType = "reverse";
  } else if (loop) {
    options.repeatType = "loop";
  } else if (flip) {
    options.repeatType = "mirror";
  }

  options.repeat = loop || yoyo || flip || transition.repeat;
  /**
   * TODO: Popmotion 9 has the ability to automatically detect whether to use
   * a keyframes or spring animation, but does so by detecting velocity and other spring options.
   * It'd be good to introduce a similar thing here.
   */

  if (transition.type !== "spring") options.type = "keyframes";
  return options;
}
/**
 * Get the delay for a value by checking Transition with decreasing specificity.
 */


function getDelayFromTransition(transition, key) {
  var _a, _b, _c, _d, _e;

  return (_e = (_d = (_b = (_a = transition[key]) === null || _a === void 0 ? void 0 : _a.delay) !== null && _b !== void 0 ? _b : (_c = transition["default"]) === null || _c === void 0 ? void 0 : _c.delay) !== null && _d !== void 0 ? _d : transition.delay) !== null && _e !== void 0 ? _e : 0;
}

function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(options.to);
    options.to[0] = options.from;
  }

  return options;
}

function getPopmotionAnimationOptions(transition, options, key) {
  var _a;

  if (Array.isArray(options.to)) {
    (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
  }

  hydrateKeyframes(options);
  /**
   * Get a default transition if none is determined to be defined.
   */

  if (!isTransitionDefined(transition)) {
    transition = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, transition), getDefaultTransition(key, options.to));
  }

  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, options), convertTransitionToAnimationOptions(transition));
}
/**
 *
 */


function getAnimation(key, value, target, transition, onComplete) {
  var _a;

  var valueTransition = transition[key] || transition["default"] || transition;
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key, target);
  /**
   * If we're trying to animate from "none", try and get an animatable version
   * of the target. This could be improved to work both ways.
   */

  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* complex */ "c"].getAnimatableNone(target);
  }

  var isOriginAnimatable = isAnimatable(key, origin);
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* warning */ "b"])(isOriginAnimatable === isTargetAnimatable, "You are trying to animate " + key + " from \"" + origin + "\" to \"" + target + "\". " + origin + " is not an animatable value - to enable this animation set " + origin + " to a value animatable to " + target + " via the `style` property.");

  function start() {
    var options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete: onComplete,
      onUpdate: function onUpdate(v) {
        return value.set(v);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* inertia */ "r"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, options), valueTransition)) : Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* animate */ "a"])(getPopmotionAnimationOptions(valueTransition, options, key));
  }

  function set() {
    value.set(target);
    onComplete();
    return {
      stop: function stop() {}
    };
  }

  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
/**
 * Start animation on a MotionValue. This function is an interface between
 * Framer Motion and Popmotion
 *
 * @internal
 */


function startAnimation(key, value, target, transition) {
  if (transition === void 0) {
    transition = {};
  }

  return value.start(function (onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key, value, target, transition, onComplete);
    var delay = getDelayFromTransition(transition, key);

    var start = function start() {
      return controls = animation();
    };

    if (delay) {
      delayTimer = setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }

    return function () {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}
/**
 * Measure and return the element bounding box.
 *
 * We convert the box into an AxisBox2D to make it easier to work with each axis
 * individually and programmatically.
 *
 * This function optionally accepts a transformPagePoint function which allows us to compensate
 * for, for instance, measuring the element within a scaled plane like a Framer devivce preview component.
 */


function getBoundingBox(element, transformPagePoint) {
  var box = element.getBoundingClientRect();
  return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}
/**
 * A VisualElement for HTMLElements
 */


var HTMLVisualElement =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(HTMLVisualElement, _super);

  function HTMLVisualElement() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     *
     */


    _this.defaultConfig = {
      enableHardwareAcceleration: true,
      allowTransformNone: true
    };
    /**
     * A mutable record of styles we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */

    _this.style = {};
    /**
     * A record of styles we only want to apply via React. This gets set in useMotionValues
     * and applied in the render function. I'd prefer this to live somewhere else to decouple
     * VisualElement from React but works for now.
     */

    _this.reactStyle = {};
    /**
     * A mutable record of CSS variables we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */

    _this.vars = {};
    /**
     * A mutable record of transforms we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */

    _this.transform = {};
    /**
     * A mutable record of transform origins we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */

    _this.transformOrigin = {};
    /**
     * A mutable record of transform keys we want to apply to the rendered Element. We order
     * this to order transforms in the desired order. We use a mutable data structure to reduce GC during animations.
     */

    _this.transformKeys = [];
    _this.config = _this.defaultConfig;
    /**
     * ========================================
     * Layout
     * ========================================
     */

    _this.isLayoutProjectionEnabled = false;
    /**
     * A set of layout update event handlers. These are only called once all layouts have been read,
     * making it safe to perform DOM write operations.
     */

    _this.layoutUpdateListeners = new SubscriptionManager();
    _this.layoutMeasureListeners = new SubscriptionManager();
    _this.viewportBoxUpdateListeners = new SubscriptionManager();
    /**
     * Keep track of whether the viewport box has been updated since the last render.
     * If it has, we want to fire the onViewportBoxUpdate listener.
     */

    _this.hasViewportBoxUpdated = false;
    /**
     * The visual target we want to project our component into on a given frame
     * before applying transforms defined in `animate` or `style`.
     *
     * This is considered mutable to avoid object creation on each frame.
     */

    _this.targetBoxFinal = axisBox();
    /**
     * The overall scale of the local coordinate system as transformed by all parents
     * of this component. We use this for scale correction on our calculated layouts
     * and scale-affected values like `boxShadow`.
     *
     * This is considered mutable to avoid object creation on each frame.
     */

    _this.treeScale = {
      x: 1,
      y: 1
    };
    _this.prevTreeScale = {
      x: 1,
      y: 1
    };
    /**
     * The delta between the boxCorrected and the desired
     * targetBox (before user-set transforms are applied). The calculated output will be
     * handed to the renderer and used as part of the style correction calculations, for
     * instance calculating how to display the desired border-radius correctly.
     *
     * This is considered mutable to avoid object creation on each frame.
     */

    _this.delta = delta();
    /**
     * The delta between the boxCorrected and the desired targetBoxFinal. The calculated
     * output will be handed to the renderer and used to project the boxCorrected into
     * the targetBoxFinal.
     *
     * This is considered mutable to avoid object creation on each frame.
     */

    _this.deltaFinal = delta();
    /**
     * The computed transform string to apply deltaFinal to the element. Currently this is only
     * being used to diff and decide whether to render on the current frame, but a minor optimisation
     * could be to provide this to the buildHTMLStyle function.
     */

    _this.deltaTransform = identityProjection;
    /**
     *
     */

    _this.stopLayoutAxisAnimation = {
      x: function x() {},
      y: function y() {}
    };
    _this.isTargetBoxLocked = false;
    /**
     *
     */

    _this.axisProgress = {
      x: motionValue(0),
      y: motionValue(0)
    };

    _this.updateLayoutDelta = function () {
      _this.isLayoutProjectionEnabled && _this.box && _this.updateLayoutDeltas();
      /**
       * Ensure all children layouts are also updated.
       *
       * This uses a pre-bound function executor rather than a lamda to avoid creating a new function
       * multiple times per frame (source of mid-animation GC)
       */

      _this.children.forEach(fireUpdateLayoutDelta);
    };

    return _this;
  }
  /**
   * When a value is removed, we want to make sure it's removed from all rendered data structures.
   */


  HTMLVisualElement.prototype.removeValue = function (key) {
    _super.prototype.removeValue.call(this, key);

    delete this.vars[key];
    delete this.style[key];
  };
  /**
   * Empty the mutable data structures by re-creating them. We can do this every React render
   * as the comparative workload to the rest of the render is very low and this is also when
   * we want to reflect values that might have been removed by the render.
   */


  HTMLVisualElement.prototype.clean = function () {
    this.style = {};
    this.vars = {};
    this.transform = {};
  };

  HTMLVisualElement.prototype.updateConfig = function (config) {
    if (config === void 0) {
      config = {};
    }

    this.config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, this.defaultConfig), config);
  };
  /**
   * Read a value directly from the HTMLElement style.
   */


  HTMLVisualElement.prototype.read = function (key) {
    return this.getComputedStyle()[key] || 0;
  };

  HTMLVisualElement.prototype.addValue = function (key, value) {
    _super.prototype.addValue.call(this, key, value); // If we have rotate values we want to foce the layoutOrigin used in layout projection
    // to the center of the element.


    if (key.startsWith("rotate")) this.layoutOrigin = 0.5;
  };
  /**
   * Read a value directly from the HTMLElement in case it's not defined by a Motion
   * prop. If it's a transform, we just return a pre-defined default value as reading these
   * out of a matrix is either error-prone or can incur a big payload for little benefit.
   */


  HTMLVisualElement.prototype.readNativeValue = function (key) {
    if (isTransformProp(key)) {
      var defaultValueType = getDefaultValueType(key);
      return defaultValueType ? defaultValueType.default || 0 : 0;
    } else {
      return this.read(key);
    }
  };

  HTMLVisualElement.prototype.enableLayoutProjection = function () {
    this.isLayoutProjectionEnabled = true;
  };

  HTMLVisualElement.prototype.hide = function () {
    if (this.isVisible === false) return;
    this.isVisible = false;
    this.scheduleRender();
  };

  HTMLVisualElement.prototype.show = function () {
    if (this.isVisible === true) return;
    this.isVisible = true;
    this.scheduleRender();
  };
  /**
   * Register an event listener to fire when the layout is updated. We might want to expose support
   * for this via a `motion` prop.
   */


  HTMLVisualElement.prototype.onLayoutUpdate = function (callback) {
    return this.layoutUpdateListeners.add(callback);
  };

  HTMLVisualElement.prototype.onLayoutMeasure = function (callback) {
    return this.layoutMeasureListeners.add(callback);
  };

  HTMLVisualElement.prototype.onViewportBoxUpdate = function (callback) {
    return this.viewportBoxUpdateListeners.add(callback);
  };
  /**
   * To be called when all layouts are successfully updated. In turn we can notify layoutUpdate
   * subscribers.
   */


  HTMLVisualElement.prototype.layoutReady = function (config) {
    this.layoutUpdateListeners.notify(this.box, this.prevViewportBox || this.box, config);
  };
  /**
   * Measure and return the Element's bounding box. We convert it to a AxisBox2D
   * structure to make it easier to work on each individual axis generically.
   */


  HTMLVisualElement.prototype.getBoundingBox = function () {
    var transformPagePoint = this.config.transformPagePoint;
    return getBoundingBox(this.element, transformPagePoint);
  };

  HTMLVisualElement.prototype.getBoundingBoxWithoutTransforms = function () {
    var bbox = this.getBoundingBox();
    removeBoxTransforms(bbox, this.latest);
    return bbox;
  };
  /**
   * Return the computed style after a render.
   */


  HTMLVisualElement.prototype.getComputedStyle = function () {
    return window.getComputedStyle(this.element);
  };
  /**
   * Record the bounding box as it exists before a re-render.
   */


  HTMLVisualElement.prototype.snapshotBoundingBox = function () {
    this.prevViewportBox = this.getBoundingBoxWithoutTransforms();
    /**
     * Update targetBox to match the prevViewportBox. This is just to ensure
     * that targetBox is affected by scroll in the same way as the measured box
     */

    this.rebaseTargetBox(false, this.prevViewportBox);
  };

  HTMLVisualElement.prototype.rebaseTargetBox = function (force, box) {
    var _this = this;

    if (force === void 0) {
      force = false;
    }

    if (box === void 0) {
      box = this.box;
    }

    var _a = this.axisProgress,
        x = _a.x,
        y = _a.y;
    var shouldRebase = this.box && !this.isTargetBoxLocked && !x.isAnimating() && !y.isAnimating();

    if (force || shouldRebase) {
      eachAxis(function (axis) {
        var _a = box[axis],
            min = _a.min,
            max = _a.max;

        _this.setAxisTarget(axis, min, max);
      });
    }
  };

  HTMLVisualElement.prototype.measureLayout = function () {
    var _this = this;

    this.box = this.getBoundingBox();
    this.boxCorrected = copyAxisBox(this.box);
    if (!this.targetBox) this.targetBox = copyAxisBox(this.box);
    this.layoutMeasureListeners.notify(this.box, this.prevViewportBox || this.box);
    framesync__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].update(function () {
      return _this.rebaseTargetBox();
    });
  };

  HTMLVisualElement.prototype.lockTargetBox = function () {
    this.isTargetBoxLocked = true;
  };

  HTMLVisualElement.prototype.unlockTargetBox = function () {
    this.stopLayoutAnimation();
    this.isTargetBoxLocked = false;
  };
  /**
   * Reset the transform on the current Element. This is called as part
   * of a batched process across the entire layout tree. To remove this write
   * cycle it'd be interesting to see if it's possible to "undo" all the current
   * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
   * works
   */


  HTMLVisualElement.prototype.resetTransform = function () {
    var transformTemplate = this.config.transformTemplate;
    this.element.style.transform = transformTemplate ? transformTemplate({}, "") : "none"; // Ensure that whatever happens next, we restore our transform

    this.scheduleRender();
  };
  /**
   * Set new min/max boundaries to project an axis into
   */


  HTMLVisualElement.prototype.setAxisTarget = function (axis, min, max) {
    var targetAxis = this.targetBox[axis];
    targetAxis.min = min;
    targetAxis.max = max; // Flag that we want to fire the onViewportBoxUpdate event handler

    this.hasViewportBoxUpdated = true;
    this.rootParent.scheduleUpdateLayoutDelta();
  };
  /**
   *
   */


  HTMLVisualElement.prototype.startLayoutAxisAnimation = function (axis, transition) {
    var _this = this;

    var progress = this.axisProgress[axis];
    var _a = this.targetBox[axis],
        min = _a.min,
        max = _a.max;
    var length = max - min;
    progress.clearListeners();
    progress.set(min);
    progress.set(min); // Set twice to hard-reset velocity

    progress.onChange(function (v) {
      return _this.setAxisTarget(axis, v, v + length);
    });
    return startAnimation(axis, progress, 0, transition);
  };

  HTMLVisualElement.prototype.stopLayoutAnimation = function () {
    var _this = this;

    eachAxis(function (axis) {
      return _this.axisProgress[axis].stop();
    });
  };
  /**
   * Update the layout deltas to reflect the relative positions of the layout
   * and the desired target box
   */


  HTMLVisualElement.prototype.updateLayoutDeltas = function () {
    /**
     * Reset the corrected box with the latest values from box, as we're then going
     * to perform mutative operations on it.
     */
    resetBox(this.boxCorrected, this.box);
    /**
     * If this component has a parent, update this treeScale by incorporating the parent's
     * delta into its treeScale.
     */

    if (this.parent) {
      this.prevTreeScale.x = this.treeScale.x;
      this.prevTreeScale.y = this.treeScale.y;
      updateTreeScale(this.treeScale, this.parent.treeScale, this.parent.delta);
    }
    /**
     * Apply all the parent deltas to this box to produce the corrected box. This
     * is the layout box, as it will appear on screen as a result of the transforms of its parents.
     */


    applyTreeDeltas(this.boxCorrected, this.treePath);
    /**
     * Update the delta between the corrected box and the target box before user-set transforms were applied.
     * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
     * for our layout reprojection, but still allow them to be scaled correctly by the user.
     * It might be that to simplify this we may want to accept that user-set scale is also corrected
     * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
     * to allow people to choose whether these styles are corrected based on just the
     * layout reprojection or the final bounding box.
     */

    updateBoxDelta(this.delta, this.boxCorrected, this.targetBox, this.layoutOrigin);
    /**
     * If we have a listener for the viewport box, fire it.
     */

    this.hasViewportBoxUpdated && this.viewportBoxUpdateListeners.notify(this.targetBox, this.delta);
    this.hasViewportBoxUpdated = false;
    /**
     * Ensure this element renders on the next frame if the projection transform has changed.
     */

    var deltaTransform = buildLayoutProjectionTransform(this.delta, this.treeScale);

    if (deltaTransform !== this.deltaTransform || // Also compare calculated treeScale, for values that rely on only this for scale correction.
    this.prevTreeScale.x !== this.treeScale.x || this.prevTreeScale.y !== this.treeScale.y) {
      this.scheduleRender();
    }

    this.deltaTransform = deltaTransform;
  };

  HTMLVisualElement.prototype.updateTransformDeltas = function () {
    if (!this.isLayoutProjectionEnabled || !this.box) return;
    /**
     * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
     * This is the final box that we will then project into by calculating a transform delta and
     * applying it to the corrected box.
     */

    applyBoxTransforms(this.targetBoxFinal, this.targetBox, this.latest);
    /**
     * Update the delta between the corrected box and the final target box, after
     * user-set transforms are applied to it. This will be used by the renderer to
     * create a transform style that will reproject the element from its actual layout
     * into the desired bounding box.
     */

    updateBoxDelta(this.deltaFinal, this.boxCorrected, this.targetBoxFinal, this.layoutOrigin);
  };
  /**
   * ========================================
   * Build & render
   * ========================================
   */

  /**
   * Build a style prop using the latest resolved MotionValues
   */


  HTMLVisualElement.prototype.build = function () {
    this.updateTransformDeltas();

    if (this.isVisible !== undefined) {
      this.style.visibility = this.isVisible ? "visible" : "hidden";
    }

    buildHTMLStyles(this.latest, this.style, this.vars, this.transform, this.transformOrigin, this.transformKeys, this.config, this.isLayoutProjectionEnabled && !!this.box, this.delta, this.deltaFinal, this.treeScale, this.targetBoxFinal);
  };
  /**
   * Render the Element by rebuilding and applying the latest styles and vars.
   */


  HTMLVisualElement.prototype.render = function () {
    // Rebuild the latest animated values into style and vars caches.
    this.build(); // Directly assign style into the Element's style prop. In tests Object.assign is the
    // fastest way to assign styles.

    Object.assign(this.element.style, this.style); // Loop over any CSS variables and assign those.

    for (var key in this.vars) {
      this.element.style.setProperty(key, this.vars[key]);
    }
  };

  return HTMLVisualElement;
}(VisualElement);
/**
 * Pre-bound version of updateLayoutDelta so we're not creating a new function multiple
 * times per frame.
 */


var fireUpdateLayoutDelta = function fireUpdateLayoutDelta(child) {
  return child.updateLayoutDelta();
};
/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */


function useConstant(init) {
  var ref = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);

  if (ref.current === null) {
    ref.current = init();
  }

  return ref.current;
}

function calcOrigin$1(origin, offset, size) {
  return typeof origin === "string" ? origin : style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"].transform(offset + size * origin);
}
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */


function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
  return pxOriginX + " " + pxOriginY;
} // Convert a progress 0-1 to a pixels value based on the provided length


var progressToPixels = function progressToPixels(progress, length) {
  return style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"].transform(progress * length);
};

var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */

function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
  if (spacing === void 0) {
    spacing = 1;
  }

  if (offset === void 0) {
    offset = 0;
  }

  if (useDashCase === void 0) {
    useDashCase = true;
  } // We use dash case when setting attributes directly to the DOM node and camel case
  // when defining props on a React component.


  var keys = useDashCase ? dashKeys : camelKeys; // Build the dash offset

  attrs[keys.offset] = progressToPixels(-offset, totalLength); // Build the dash array

  var pathLength = progressToPixels(length, totalLength);
  var pathSpacing = progressToPixels(spacing, totalLength);
  attrs[keys.array] = pathLength + " " + pathSpacing;
}

var unmeasured = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
/**
 * Build SVG visual attrbutes, like cx and style.transform
 */

function buildSVGAttrs(_a, style, vars, attrs, transform, transformOrigin, transformKeys, config, dimensions, totalPathLength, isLayoutProjectionEnabled, delta, deltaFinal, treeScale, targetBox) {
  var attrX = _a.attrX,
      attrY = _a.attrY,
      originX = _a.originX,
      originY = _a.originY,
      pathLength = _a.pathLength,
      _b = _a.pathSpacing,
      pathSpacing = _b === void 0 ? 1 : _b,
      _c = _a.pathOffset,
      pathOffset = _c === void 0 ? 0 : _c,
      // This is object creation, which we try to avoid per-frame.
  latest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  /**
   * With SVG we treat all animated values as attributes rather than CSS, so we build into attrs
   */


  buildHTMLStyles(latest, attrs, vars, transform, transformOrigin, transformKeys, config, isLayoutProjectionEnabled, delta, deltaFinal, treeScale, targetBox);
  /**
   * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
   * and copy it into style.
   */

  if (attrs.transform) {
    style.transform = attrs.transform;
    delete attrs.transform;
  } // Parse transformOrigin


  if (originX !== undefined || originY !== undefined || style.transform) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions || unmeasured, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
  } // Treat x/y not as shortcuts but as actual attributes


  if (attrX !== undefined) attrs.x = attrX;
  if (attrY !== undefined) attrs.y = attrY; // Build SVG path if one has been measured

  if (totalPathLength !== undefined && pathLength !== undefined) {
    buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset, false);
  }

  return attrs;
}
/**
 * A set of attribute names that are always read/written as camel case.
 */


var camelCaseAttributes = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox"]);
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
/**
 * Convert camelCase to dash-case properties.
 */

var camelToDash = function camelToDash(str) {
  return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};
/**
 * A VisualElement for SVGElements. Inherits from and extends HTMLVisualElement as the two
 * share data structures.
 */


var SVGVisualElement =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(SVGVisualElement, _super);

  function SVGVisualElement() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * A mutable record of attributes we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */


    _this.attrs = {};
    /**
     * We disable hardware acceleration for SVG transforms as they're not currently able to be accelerated.
     */

    _this.defaultConfig = {
      enableHardwareAcceleration: false
    };
    /**
     * Without duplicating this call from HTMLVisualElement we end up with HTMLVisualElement.defaultConfig
     * being assigned to config
     */

    _this.config = _this.defaultConfig;
    return _this;
  }
  /**
   * Measure the SVG element on mount. This can affect page rendering so there might be a
   * better time to perform this - for instance dynamically only if there's a transform-origin dependent
   * transform being set (like rotate)
   */


  SVGVisualElement.prototype.mount = function (element) {
    _super.prototype.mount.call(this, element);

    this.measure();
  };
  /**
   * Update the SVG dimensions and path length
   */


  SVGVisualElement.prototype.measure = function () {
    try {
      this.dimensions = typeof this.element.getBBox === "function" ? this.element.getBBox() : this.element.getBoundingClientRect();
    } catch (e) {
      // Most likely trying to measure an unrendered element under Firefox
      this.dimensions = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }

    if (isPath(this.element)) {
      this.totalPathLength = this.element.getTotalLength();
    }
  };
  /**
   * Empty the mutable data structures in case attrs have been removed between renders.
   */


  SVGVisualElement.prototype.clean = function () {
    _super.prototype.clean.call(this);

    this.attrs = {};
  };
  /**
   * Read an attribute directly from the SVGElement
   */


  SVGVisualElement.prototype.read = function (key) {
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return this.element.getAttribute(key);
  };

  SVGVisualElement.prototype.build = function () {
    this.updateTransformDeltas();
    buildSVGAttrs(this.latest, this.style, this.vars, this.attrs, this.transform, this.transformOrigin, this.transformKeys, this.config, this.dimensions, this.totalPathLength, this.isLayoutProjectionEnabled && !!this.box, this.delta, this.deltaFinal, this.treeScale, this.targetBoxFinal);
  };

  SVGVisualElement.prototype.render = function () {
    // Update HTML styles and CSS variables
    _super.prototype.render.call(this); // Loop through attributes and apply them to the SVGElement


    for (var key in this.attrs) {
      this.element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, this.attrs[key]);
    }
  };

  return SVGVisualElement;
}(HTMLVisualElement);

function isPath(element) {
  return element.tagName === "path";
}
/**
 * @internal
 */

/**
 * @internal
 */


var svgElements = ["animate", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use", "view"];
var svgTagNames = new Set(svgElements);
/**
 * Determine whether this is a HTML or SVG component based on if the provided
 * Component is a string and a recognised SVG tag. A potentially better way to
 * do this would be to offer a `motion.customSVG` function and determine this
 * when we generate the `motion.circle` etc components.
 */

function isSVGComponent(Component) {
  return typeof Component === "string" && svgTagNames.has(Component);
}
/**
 * @public
 */


var PresenceContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])(null);
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */

function usePresence() {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
  if (context === null) return [true, null];
  var isPresent = context.isPresent,
      onExitComplete = context.onExitComplete,
      register = context.register; // It's safe to call the following hooks conditionally (after an early return) because the context will always
  // either be null or non-null for the lifespan of the component.
  // Replace with useOpaqueId when released in React

  var id = useUniqueId();
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return register(id);
  }, []);

  var safeToRemove = function safeToRemove() {
    return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id);
  };

  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */


function useIsPresent() {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
  return context === null ? true : context.isPresent;
}

var counter = 0;

var incrementId = function incrementId() {
  return counter++;
};

var useUniqueId = function useUniqueId() {
  return useConstant(incrementId);
};
/**
 * DOM-flavoured variation of the useVisualElement hook. Used to create either a HTMLVisualElement
 * or SVGVisualElement for the component.
 *
 */


var useDomVisualElement = function useDomVisualElement(Component, props, parent, isStatic, ref) {
  var visualElement = useConstant(function () {
    var DOMVisualElement = isSVGComponent(Component) ? SVGVisualElement : HTMLVisualElement;
    return new DOMVisualElement(parent, ref);
  });
  visualElement.updateConfig(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, visualElement.config), {
    enableHardwareAcceleration: !isStatic
  }), props));
  visualElement.layoutId = props.layoutId;
  var isPresent = useIsPresent();
  visualElement.isPresent = props.isPresent !== undefined ? props.isPresent : isPresent;
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (props.onViewportBoxUpdate) {
      return visualElement.onViewportBoxUpdate(props.onViewportBoxUpdate);
    }
  }, [props.onViewportBoxUpdate]);
  return visualElement;
};
/**
 * A list of all valid MotionProps.
 *
 * @internalremarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */


var validMotionProps = new Set(["initial", "animate", "exit", "style", "variants", "transition", "transformTemplate", "transformValues", "custom", "inherit", "static", "layout", "layoutId", "onLayoutAnimationComplete", "onViewportBoxUpdate", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "drag", "dragControls", "dragListener", "dragConstraints", "dragDirectionLock", "_dragX", "_dragY", "dragElastic", "dragMomentum", "dragPropagation", "dragTransition", "onPan", "onPanStart", "onPanEnd", "onPanSessionStart", "onTap", "onTapStart", "onTapCancel", "whileHover", "whileTap", "onHoverEnd", "onHoverStart"]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */

function isValidMotionProp(key) {
  return validMotionProps.has(key);
}

var isPropValid = function isPropValid(key) {
  return !isValidMotionProp(key);
};
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */


try {
  var emotionIsPropValid_1 = __webpack_require__(276).default;

  isPropValid = function isPropValid(key) {
    // Handle events explicitly as Emotion validates them all as true
    if (key.startsWith("on")) {
      return !isValidMotionProp(key);
    } else {
      return emotionIsPropValid_1(key);
    }
  };
} catch (_a) {// We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}

function filterProps(props) {
  var domProps = {};

  for (var key in props) {
    if (isPropValid(key)) domProps[key] = props[key];
  }

  return domProps;
}

function buildHTMLProps(visualElement, _a) {
  var drag = _a.drag; // The `any` isn't ideal but it is the type of createElement props argument

  var htmlProps = {
    style: Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, visualElement.reactStyle), visualElement.style), visualElement.vars)
  };

  if (!!drag) {
    // Disable the ghost element when a user drags
    htmlProps.draggable = false; // Disable text selection

    htmlProps.style.userSelect = "none"; // Disable scrolling on the draggable direction

    htmlProps.style.touchAction = drag === true ? "none" : "pan-" + (drag === "x" ? "y" : "x");
  }

  return htmlProps;
}
/**
 * Build React props for SVG elements
 */


function buildSVGProps(visualElement) {
  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, visualElement.attrs), {
    style: Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, visualElement.reactStyle)
  });
}

function render(Component, props, visualElement) {
  // Only filter props from components we control, ie `motion.div`. If this
  // is a custom component pass along everything provided to it.
  var forwardedProps = typeof Component === "string" ? filterProps(props) : props;
  /**
   * Every render, empty and rebuild the animated values to be applied to our Element.
   * During animation these data structures are used in a mutable fashion to reduce
   * garbage collection, but between renders we can flush them to remove values
   * that might have been taken out of the provided props.
   */

  visualElement.clean();
  visualElement.build(); // Generate props to visually render this component

  var visualProps = isSVGComponent(Component) ? buildSVGProps(visualElement) : buildHTMLProps(visualElement, props);
  return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(Component, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, forwardedProps), {
    ref: visualElement.ref
  }), visualProps));
}

var positionalKeys = new Set(["width", "height", "top", "left", "right", "bottom", "x", "y"]);

var isPositionalKey = function isPositionalKey(key) {
  return positionalKeys.has(key);
};

var hasPositionalKey = function hasPositionalKey(target) {
  return Object.keys(target).some(isPositionalKey);
};

var setAndResetVelocity = function setAndResetVelocity(value, to) {
  // Looks odd but setting it twice doesn't render, it'll just
  // set both prev and current to the latest value
  value.set(to, false);
  value.set(to);
};

var isNumOrPxType = function isNumOrPxType(v) {
  return v === style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* number */ "g"] || v === style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"];
};

var BoundingBoxDimension;

(function (BoundingBoxDimension) {
  BoundingBoxDimension["width"] = "width";
  BoundingBoxDimension["height"] = "height";
  BoundingBoxDimension["left"] = "left";
  BoundingBoxDimension["right"] = "right";
  BoundingBoxDimension["top"] = "top";
  BoundingBoxDimension["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));

var getPosFromMatrix = function getPosFromMatrix(matrix, pos) {
  return parseFloat(matrix.split(", ")[pos]);
};

var getTranslateFromMatrix = function getTranslateFromMatrix(pos2, pos3) {
  return function (_bbox, _a) {
    var transform = _a.transform;
    if (transform === "none" || !transform) return 0;
    var matrix3d = transform.match(/^matrix3d\((.+)\)$/);

    if (matrix3d) {
      return getPosFromMatrix(matrix3d[1], pos3);
    } else {
      var matrix = transform.match(/^matrix\((.+)\)$/);

      if (matrix) {
        return getPosFromMatrix(matrix[1], pos2);
      } else {
        return 0;
      }
    }
  };
};

var transformKeys = new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function (key) {
  return !transformKeys.has(key);
});

function removeNonTranslationalTransform(visualElement) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function (key) {
    var value = visualElement.getValue(key);

    if (value !== undefined) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  }); // Apply changes to element before measurement

  if (removedTransforms.length) visualElement.render();
  return removedTransforms;
}

var positionalValues = {
  // Dimensions
  width: function width(_a) {
    var x = _a.x;
    return x.max - x.min;
  },
  height: function height(_a) {
    var y = _a.y;
    return y.max - y.min;
  },
  top: function top(_bbox, _a) {
    var top = _a.top;
    return parseFloat(top);
  },
  left: function left(_bbox, _a) {
    var left = _a.left;
    return parseFloat(left);
  },
  bottom: function bottom(_a, _b) {
    var y = _a.y;
    var top = _b.top;
    return parseFloat(top) + (y.max - y.min);
  },
  right: function right(_a, _b) {
    var x = _a.x;
    var left = _b.left;
    return parseFloat(left) + (x.max - x.min);
  },
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};

var convertChangedValueTypes = function convertChangedValueTypes(target, visualElement, changedKeys) {
  var originBbox = visualElement.getBoundingBox();
  var elementComputedStyle = visualElement.getComputedStyle();
  var display = elementComputedStyle.display,
      top = elementComputedStyle.top,
      left = elementComputedStyle.left,
      bottom = elementComputedStyle.bottom,
      right = elementComputedStyle.right,
      transform = elementComputedStyle.transform;
  var originComputedStyle = {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    transform: transform
  }; // If the element is currently set to display: "none", make it visible before
  // measuring the target bounding box

  if (display === "none") {
    visualElement.setStaticValues("display", target.display || "block");
  } // Apply the latest values (as set in checkAndConvertChangedValueTypes)


  visualElement.render();
  var targetBbox = visualElement.getBoundingBox();
  changedKeys.forEach(function (key) {
    // Restore styles to their **calculated computed style**, not their actual
    // originally set style. This allows us to animate between equivalent pixel units.
    var value = visualElement.getValue(key);
    setAndResetVelocity(value, positionalValues[key](originBbox, originComputedStyle));
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};

var checkAndConvertChangedValueTypes = function checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) {
  if (origin === void 0) {
    origin = {};
  }

  if (transitionEnd === void 0) {
    transitionEnd = {};
  }

  target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, target);
  transitionEnd = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, transitionEnd);
  var targetPositionalKeys = Object.keys(target).filter(isPositionalKey); // We want to remove any transform values that could affect the element's bounding box before
  // it's measured. We'll reapply these later.

  var removedTransformValues = [];
  var hasAttemptedToRemoveTransformValues = false;
  var changedValueTypeKeys = [];
  targetPositionalKeys.forEach(function (key) {
    var value = visualElement.getValue(key);
    if (!visualElement.hasValue(key)) return;
    var from = origin[key];
    var to = target[key];
    var fromType = findDimensionValueType(from);
    var toType; // TODO: The current implementation of this basically throws an error
    // if you try and do value conversion via keyframes. There's probably
    // a way of doing this but the performance implications would need greater scrutiny,
    // as it'd be doing multiple resize-remeasure operations.

    if (isKeyframesTarget(to)) {
      var numKeyframes = to.length;

      for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
          Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
        } else {
          Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }

    if (fromType !== toType) {
      // If they're both just number or px, convert them both to numbers rather than
      // relying on resize/remeasure to convert (which is wasteful in this situation)
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        var current = value.get();

        if (typeof current === "string") {
          value.set(parseFloat(current));
        }

        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* px */ "j"]) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        // If one or the other value is 0, it's safe to coerce it to the
        // type of the other without measurement
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        // If we're going to do value conversion via DOM measurements, we first
        // need to remove non-positional transform values that could affect the bbox measurements.
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement);
          hasAttemptedToRemoveTransformValues = true;
        }

        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== undefined ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });

  if (changedValueTypeKeys.length) {
    var convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys); // If we removed transform values, reapply them before the next render

    if (removedTransformValues.length) {
      removedTransformValues.forEach(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(_a, 2),
            key = _b[0],
            value = _b[1];

        visualElement.getValue(key).set(value);
      });
    } // Reapply original values


    visualElement.render();
    return {
      target: convertedTarget,
      transitionEnd: transitionEnd
    };
  } else {
    return {
      target: target,
      transitionEnd: transitionEnd
    };
  }
};
/**
 * Convert value types for x/y/width/height/top/left/bottom/right
 *
 * Allows animation between `'auto'` -> `'100%'` or `0` -> `'calc(50% - 10vw)'`
 *
 * @internal
 */


function unitConversion(visualElement, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : {
    target: target,
    transitionEnd: transitionEnd
  };
}
/**
 * Parse a DOM variant to make it animatable. This involves resolving CSS variables
 * and ensuring animations like "20%" => "calc(50vw)" are performed in pixels.
 */


var parseDomVariant = function parseDomVariant(visualElement, target, origin, transitionEnd) {
  var resolved = resolveCSSVariables(visualElement, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement, target, origin, transitionEnd);
};
/**
 * Use callback either only on the initial render or on all renders. In concurrent mode
 * the "initial" render might run multiple times
 *
 * @param callback - Callback to run
 * @param isInitialOnly - Set to `true` to only run on initial render, or `false` for all renders. Defaults to `false`.
 *
 * @public
 */


function useInitialOrEveryRender(callback, isInitialOnly) {
  if (isInitialOnly === void 0) {
    isInitialOnly = false;
  }

  var isInitialRender = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(true);

  if (!isInitialOnly || isInitialOnly && isInitialRender.current) {
    callback();
  }

  isInitialRender.current = false;
}
/**
 * Control animations on one or more components.
 *
 * @public
 */


var AnimationControls =
/** @class */
function () {
  function AnimationControls() {
    /**
     * Track whether the host component has mounted.
     *
     * @internal
     */
    this.hasMounted = false;
    /**
     * Pending animations that are started before a component is mounted.
     *
     * @internal
     */

    this.pendingAnimations = [];
    /**
     * A collection of linked component animation controls.
     *
     * @internal
     */

    this.componentControls = new Set();
  }
  /**
   * Set variants on this and all child components.
   *
   * @param variants - The variants to set
   *
   * @internal
   */


  AnimationControls.prototype.setVariants = function (variants) {
    this.variants = variants;
    this.componentControls.forEach(function (controls) {
      return controls.setVariants(variants);
    });
  };
  /**
   * Set a default transition on this and all child components
   *
   * @param transition - The default transition to set
   *
   * @internal
   */


  AnimationControls.prototype.setDefaultTransition = function (transition) {
    this.defaultTransition = transition;
    this.componentControls.forEach(function (controls) {
      return controls.setDefaultTransition(transition);
    });
  };
  /**
   * Subscribes a component's animation controls to this.
   *
   * @param controls - The controls to subscribe
   * @returns An unsubscribe function.
   *
   * @internal
   */


  AnimationControls.prototype.subscribe = function (controls) {
    var _this = this;

    this.componentControls.add(controls);
    if (this.variants) controls.setVariants(this.variants);
    if (this.defaultTransition) controls.setDefaultTransition(this.defaultTransition);
    return function () {
      return _this.componentControls.delete(controls);
    };
  };
  /**
   * Starts an animation on all linked components.
   *
   * @remarks
   *
   * ```jsx
   * controls.start("variantLabel")
   * controls.start({
   *   x: 0,
   *   transition: { duration: 1 }
   * })
   * ```
   *
   * @param definition - Properties or variant label to animate to
   * @param transition - Optional `transtion` to apply to a variant
   * @returns - A `Promise` that resolves when all animations have completed.
   *
   * @public
   */


  AnimationControls.prototype.start = function (definition, transitionOverride) {
    var _this = this;

    if (this.hasMounted) {
      var animations_1 = [];
      this.componentControls.forEach(function (controls) {
        var animation = controls.start(definition, {
          transitionOverride: transitionOverride
        });
        animations_1.push(animation);
      });
      return Promise.all(animations_1);
    } else {
      return new Promise(function (resolve) {
        _this.pendingAnimations.push({
          animation: [definition, transitionOverride],
          resolve: resolve
        });
      });
    }
  };
  /**
   * Instantly set to a set of properties or a variant.
   *
   * ```jsx
   * // With properties
   * controls.set({ opacity: 0 })
   *
   * // With variants
   * controls.set("hidden")
   * ```
   *
   * @internalremarks
   * We could perform a similar trick to `.start` where this can be called before mount
   * and we maintain a list of of pending actions that get applied on mount. But the
   * expectation of `set` is that it happens synchronously and this would be difficult
   * to do before any children have even attached themselves. It's also poor practise
   * and we should discourage render-synchronous `.start` calls rather than lean into this.
   *
   * @public
   */


  AnimationControls.prototype.set = function (definition) {
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(this.hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
    return this.componentControls.forEach(function (controls) {
      return controls.apply(definition);
    });
  };
  /**
   * Stops animations on all linked components.
   *
   * ```jsx
   * controls.stop()
   * ```
   *
   * @public
   */


  AnimationControls.prototype.stop = function () {
    this.componentControls.forEach(function (controls) {
      return controls.stop();
    });
  };
  /**
   * Initialises the animation controls.
   *
   * @internal
   */


  AnimationControls.prototype.mount = function () {
    var _this = this;

    this.hasMounted = true;
    this.pendingAnimations.forEach(function (_a) {
      var animation = _a.animation,
          resolve = _a.resolve;
      return _this.start.apply(_this, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(animation)).then(resolve);
    });
  };
  /**
   * Stops all child animations when the host component unmounts.
   *
   * @internal
   */


  AnimationControls.prototype.unmount = function () {
    this.hasMounted = false;
    this.stop();
  };

  return AnimationControls;
}();
/**
 * @internal
 */


var animationControls = function animationControls() {
  return new AnimationControls();
};
/**
 * @internal
 */


var MotionContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])({
  static: false
});

var isVariantLabel = function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
};

var isAnimationControls = function isAnimationControls(v) {
  return v instanceof AnimationControls;
};
/**
 * Set up the context for children motion components.
 *
 * We also use this opportunity to apply `initial` values
 */


var useMotionContext = function useMotionContext(parentContext, controls, visualElement, isStatic, _a) {
  if (isStatic === void 0) {
    isStatic = false;
  }

  var initial = _a.initial,
      animate = _a.animate,
      variants = _a.variants,
      whileTap = _a.whileTap,
      whileHover = _a.whileHover,
      layoutId = _a.layoutId; // Determine whether this is a root element of an AnimatePresence component

  var presenceContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
  var presenceId = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id;
  visualElement.isPresenceRoot = parentContext.presenceId !== presenceId; // Override initial with that from a parent context, if defined

  if ((presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) !== undefined) {
    initial = presenceContext.initial;
  }

  var initialState;

  if (initial === false && !isAnimationControls(animate)) {
    initialState = animate;
  } else if (typeof initial !== "boolean") {
    initialState = initial;
  } // Track mounted status so children can detect whether they were present during their
  // parent's first render


  var hasMounted = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false); // We propagate this component's VisualElementAnimationControls *if* we're being provided variants,
  // if we're being used to control variants, or if we're being passed animation controls.
  // Otherwise this component should be "invisible" to variant propagation. This is a slight concession
  // to Framer X where every `Frame` is a `motion` component and it might be if we change that in the future
  // that this restriction is removed.

  var shouldPropagateControls = variants || isVariantLabel(animate) || isVariantLabel(whileTap) || isVariantLabel(whileHover) || isAnimationControls(animate); // If this component's `initial` prop is a variant label, propagate it. Otherwise pass the parent's.

  var targetInitial = isVariantLabel(initialState) ? initialState : parentContext.initial; // If this is a variant tree we need to propagate the `animate` prop in case new children are added after
  // the tree initially animates.

  var targetAnimate = isVariantLabel(animate) ? animate : parentContext.animate; // Only allow `initial` to trigger context re-renders if this is a `static` component (ie we're on the Framer canvas)
  // or in another non-animation/interaction environment.

  var initialDependency = isStatic ? targetInitial : null; // Only allow `animate` to trigger context re-renders if it's a variant label. If this is an array of
  // variant labels there's probably an optimisation to deep-compare but it might be an over-optimisation.
  // We want to do this as we rely on React's component rendering order each render cycle to determine
  // the new order of any child components for the `staggerChildren` functionality.

  var animateDependency = shouldPropagateControls && isVariantLabel(targetAnimate) ? targetAnimate : null; // The context to provide to the child. We `useMemo` because although `controls` and `initial` are
  // unlikely to change, by making the context an object it'll be considered a new value every render.
  // So all child motion components will re-render as a result.

  var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    return {
      controls: shouldPropagateControls ? controls : parentContext.controls,
      initial: targetInitial,
      animate: targetAnimate,
      visualElement: visualElement,
      hasMounted: hasMounted,
      isReducedMotion: parentContext.isReducedMotion,
      presenceId: presenceId
    };
  }, [initialDependency, animateDependency, parentContext.isReducedMotion, animate, layoutId, presenceId]); // Update the `static` property every render. This is unlikely to change but also essentially free.

  context.static = isStatic; // Set initial state. If this is a static component (ie in Framer canvas), respond to updates
  // in `initial`.

  useInitialOrEveryRender(function () {
    var initialToApply = initialState || parentContext.initial;
    initialToApply && controls.apply(initialToApply);
  }, !isStatic);
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    hasMounted.current = true;
  }, []);
  return context;
};

function checkShouldInheritVariant(_a) {
  var animate = _a.animate,
      variants = _a.variants,
      inherit = _a.inherit;
  return inherit === undefined ? !!variants && !animate : inherit;
}

var isMotionValue = function isMotionValue(value) {
  return value instanceof MotionValue;
};

function isForcedMotionValue(key, _a) {
  var layout = _a.layout,
      layoutId = _a.layoutId;
  return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== undefined) && !!valueScaleCorrection[key];
}
/**
 * Scrape props for MotionValues and add/remove them to this component's
 * VisualElement
 */


function useMotionValues(visualElement, props) {
  var prev = useConstant(empty);
  /**
   * Remove MotionValues that are no longer present
   */

  for (var key in prev) {
    var isForced = isForcedMotionValue(key, props);
    var existsAsProp = props[key] !== undefined;
    var existsAsStyle = props.style && props.style[key] !== undefined;
    var propIsMotionValue = existsAsProp && isMotionValue(props[key]);
    var styleIsMotionValue = existsAsStyle && isMotionValue(props.style[key]);
    var transformRemoved = isForced && !existsAsProp && !existsAsStyle;
    var motionValueRemoved = !isForced && !propIsMotionValue && !styleIsMotionValue;

    if (transformRemoved || motionValueRemoved) {
      visualElement.removeValue(key);
      delete prev[key];
    }
  }
  /**
   * Add incoming MotionValues
   */


  addMotionValues(visualElement, prev, props, false, props);
  if (props.style) addMotionValues(visualElement, prev, props.style, true, props);
  /**
   * Transform custom values if provided a handler, ie size -> width/height
   * Ideally we'd ditch this by removing support for size and other custom values from Framer.
   */

  if (props.transformValues) {
    visualElement.reactStyle = props.transformValues(visualElement.reactStyle);
  }
}
/**
 * Add incoming MotionValues
 *
 * TODO: Type the VisualElements properly
 */


function addMotionValues(visualElement, prev, source, isStyle, props) {
  if (isStyle === void 0) {
    isStyle = false;
  }

  if (isStyle) visualElement.reactStyle = {};

  for (var key in source) {
    var value = source[key];
    var foundMotionValue = false;

    if (isMotionValue(value)) {
      // If this is a MotionValue, add it if it isn't a reserved key
      if (!reservedNames.has(key)) {
        visualElement.addValue(key, value);
        foundMotionValue = true;
      }
    } else if (isForcedMotionValue(key, props)) {
      // If this is a transform prop, always create a MotionValue
      // to ensure we can reconcile them all together.
      if (!visualElement.hasValue(key)) {
        visualElement.addValue(key, motionValue(value));
      } else if (value !== prev[key]) {
        // If the MotionValue already exists, update it with the
        // latest incoming value
        var motion = visualElement.getValue(key);
        motion.set(value);
      }

      foundMotionValue = true;
    } else if (isStyle) {
      visualElement.reactStyle[key] = value;
    }

    if (foundMotionValue) prev[key] = value;
  }
}
/**
 * These are props we accept as MotionValues but don't want to add
 * to the VisualElement
 */


var reservedNames = new Set([]);

var empty = function empty() {
  return {};
};

var isCustomValue = function isCustomValue(v) {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};

var resolveFinalValueInKeyframes = function resolveFinalValueInKeyframes(v) {
  // TODO maybe throw if v.length - 1 is placeholder token?
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */


var isNumericalString = function isNumericalString(v) {
  return /^\-?\d*\.?\d+$/.test(v);
};
/**
 * Get the current value of every `MotionValue` in a `VisualElement`
 */


var getCurrent = function getCurrent(visualElement) {
  var current = {};
  visualElement.forEachValue(function (value, key) {
    return current[key] = value.get();
  });
  return current;
};
/**
 * Get the current velocity of every `MotionValue` in a `VisualElement`
 */


var getVelocity = function getVelocity(visualElement) {
  var velocity = {};
  visualElement.forEachValue(function (value, key) {
    return velocity[key] = value.getVelocity();
  });
  return velocity;
};
/**
 * Check if value is a function that returns a `Target`. A generic typeof === 'function'
 * check, just helps with typing.
 */


var isTargetResolver = function isTargetResolver(p) {
  return typeof p === "function";
};
/**
 * Check if value is a list of variant labels
 */


var isVariantLabels = function isVariantLabels(v) {
  return Array.isArray(v);
};
/**
 * Control animations for a single component
 *
 * @internal
 */


var VisualElementAnimationControls =
/** @class */
function () {
  function VisualElementAnimationControls(visualElement, _a) {
    var _this = this;

    var makeTargetAnimatable = _a.makeTargetAnimatable;
    /**
     * A reference to the component's latest props. We could probably ditch this in
     * favour to a reference to the `custom` prop now we don't send all props through
     * to target resolvers.
     */

    this.props = {};
    /**
     * The component's variants, as provided by `variants`
     */

    this.variants = {};
    /**
     * A set of values that we animate back to when a value is cleared of all overrides.
     */

    this.baseTarget = {};
    /**
     * A series of target overrides that we can animate to/from when overrides are set/cleared.
     */

    this.overrides = [];
    /**
     * A series of target overrides as they were originally resolved.
     */

    this.resolvedOverrides = [];
    /**
     * A Set of currently active override indexes
     */

    this.activeOverrides = new Set();
    /**
     * A Set of value keys that are currently animating.
     */

    this.isAnimating = new Set();
    /**
     * Check if the associated `VisualElement` has a key with the provided string.
     * Pre-bound to the class so we can provide directly to the `filter` in `checkForNewValues`.
     */

    this.hasValue = function (key) {
      return !_this.visualElement.hasValue(key);
    };

    this.visualElement = visualElement;
    this.makeTargetAnimatable = makeTargetAnimatable;
    this.visualElement.forEachValue(function (value, key) {
      return _this.baseTarget[key] = value.get();
    });
  }
  /**
   * Set the reference to the component's props.
   * @param props -
   */


  VisualElementAnimationControls.prototype.setProps = function (props) {
    this.props = props;
  };
  /**
   * Set the reference to the component's variants
   * @param variants -
   */


  VisualElementAnimationControls.prototype.setVariants = function (variants) {
    if (variants) this.variants = variants;
  };
  /**
   * Set the component's default transition
   * @param transition -
   */


  VisualElementAnimationControls.prototype.setDefaultTransition = function (transition) {
    if (transition) this.defaultTransition = transition;
  };
  /**
   * Set motion values without animation.
   *
   * @param definition -
   * @param isActive -
   */


  VisualElementAnimationControls.prototype.setValues = function (definition, _a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.isActive,
        isActive = _c === void 0 ? new Set() : _c,
        priority = _b.priority;

    var _d = this.resolveVariant(definition),
        target = _d.target,
        transitionEnd = _d.transitionEnd;

    target = this.transformValues(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, target), transitionEnd));

    for (var key in target) {
      if (isActive.has(key)) return;
      isActive.add(key);

      if (target) {
        var targetValue = resolveFinalValueInKeyframes(target[key]);

        if (this.visualElement.hasValue(key)) {
          var value = this.visualElement.getValue(key);
          value && value.set(targetValue);
        } else {
          this.visualElement.addValue(key, motionValue(targetValue));
        }

        if (!priority) this.baseTarget[key] = targetValue;
      }
    }
  };
  /**
   * Allows `transformValues` to be set by a component that allows us to
   * transform the values in a given `Target`. This allows Framer Library
   * to extend Framer Motion to animate `Color` variables etc. Currently we have
   * to manually support these extended types here in Framer Motion.
   *
   * @param values -
   */


  VisualElementAnimationControls.prototype.transformValues = function (values) {
    var transformValues = this.props.transformValues;
    return transformValues ? transformValues(values) : values;
  };
  /**
   * Check a `Target` for new values we haven't animated yet, and add them
   * to the `MotionValueMap`.
   *
   * Currently there's functionality here that is DOM-specific, we should allow
   * this functionality to be injected by the factory that creates DOM-specific
   * components.
   *
   * @param target -
   */


  VisualElementAnimationControls.prototype.checkForNewValues = function (target) {
    var newValueKeys = Object.keys(target).filter(this.hasValue);
    var numNewValues = newValueKeys.length;
    if (!numNewValues) return;

    for (var i = 0; i < numNewValues; i++) {
      var key = newValueKeys[i];
      var targetValue = target[key];
      var value = null; // If this is a keyframes value, we can attempt to use the first value in the
      // array as that's going to be the first value of the animation anyway

      if (Array.isArray(targetValue)) {
        value = targetValue[0];
      } // If it isn't a keyframes or the first keyframes value was set as `null`, read the
      // value from the DOM. It might be worth investigating whether to check props (for SVG)
      // or props.style (for HTML) if the value exists there before attempting to read.


      if (value === null) {
        var readValue = this.visualElement.readNativeValue(key);
        value = readValue !== undefined ? readValue : target[key];
        Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(value !== null, "No initial value for \"" + key + "\" can be inferred. Ensure an initial value for \"" + key + "\" is defined on the component.");
      }

      if (typeof value === "string" && isNumericalString(value)) {
        // If this is a number read as a string, ie "0" or "200", convert it to a number
        value = parseFloat(value);
      } else if (!findValueType(value) && style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* complex */ "c"].test(targetValue)) {
        // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
        value = style_value_types__WEBPACK_IMPORTED_MODULE_4__[/* complex */ "c"].getAnimatableNone(targetValue);
      }

      this.visualElement.addValue(key, motionValue(value));
      this.baseTarget[key] = value;
    }
  };
  /**
   * Resolve a variant from its label or resolver into an actual `Target` we can animate to.
   * @param variant -
   */


  VisualElementAnimationControls.prototype.resolveVariant = function (variant, _a) {
    var custom = (_a === void 0 ? {} : _a).custom;

    if (!variant) {
      return {
        target: undefined,
        transition: undefined,
        transitionEnd: undefined
      };
    }

    if (isTargetResolver(variant)) {
      // resolve current and velocity
      variant = variant(custom !== null && custom !== void 0 ? custom : this.props.custom, getCurrent(this.visualElement), getVelocity(this.visualElement));
    }

    var _b = variant.transition,
        transition = _b === void 0 ? this.defaultTransition : _b,
        transitionEnd = variant.transitionEnd,
        target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(variant, ["transition", "transitionEnd"]);

    return {
      transition: transition,
      transitionEnd: transitionEnd,
      target: target
    };
  };
  /**
   * Get the highest active override priority index
   */


  VisualElementAnimationControls.prototype.getHighestPriority = function () {
    if (!this.activeOverrides.size) return 0;
    return Math.max.apply(Math, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(Array.from(this.activeOverrides)));
  };
  /**
   * Set an override. We add this layer of indirection so if, for instance, a tap gesture
   * starts and overrides a hover gesture, when we clear the tap gesture and fallback to the
   * hover gesture, if that hover gesture has changed in the meantime we can go to that rather
   * than the one that was resolved when the hover gesture animation started.
   *
   * @param definition -
   * @param overrideIndex -
   */


  VisualElementAnimationControls.prototype.setOverride = function (definition, overrideIndex) {
    this.overrides[overrideIndex] = definition;

    if (this.children) {
      this.children.forEach(function (child) {
        return child.setOverride(definition, overrideIndex);
      });
    }
  };
  /**
   * Start an override animation.
   * @param overrideIndex -
   */


  VisualElementAnimationControls.prototype.startOverride = function (overrideIndex) {
    var override = this.overrides[overrideIndex];

    if (override) {
      return this.start(override, {
        priority: overrideIndex
      });
    }
  };
  /**
   * Clear an override. We check every value we animated to in this override to see if
   * its present on any lower-priority overrides. If not, we animate it back to its base target.
   * @param overrideIndex -
   */


  VisualElementAnimationControls.prototype.clearOverride = function (overrideIndex) {
    var _this = this;

    if (this.children) {
      this.children.forEach(function (child) {
        return child.clearOverride(overrideIndex);
      });
    }

    var override = this.overrides[overrideIndex];
    if (!override) return;
    this.activeOverrides.delete(overrideIndex);
    var highest = this.getHighestPriority();
    this.resetIsAnimating();

    if (highest) {
      var highestOverride = this.overrides[highest];
      highestOverride && this.startOverride(highest);
    } // Figure out which remaining values were affected by the override and animate those


    var overrideTarget = this.resolvedOverrides[overrideIndex];
    if (!overrideTarget) return;
    var remainingValues = {};

    for (var key in this.baseTarget) {
      if (overrideTarget[key] !== undefined) {
        remainingValues[key] = this.baseTarget[key];
      }
    }

    this.onStart();
    this.animate(remainingValues).then(function () {
      return _this.onComplete();
    });
  };
  /**
   * Apply a target/variant without any animation
   */


  VisualElementAnimationControls.prototype.apply = function (definition) {
    if (Array.isArray(definition)) {
      return this.applyVariantLabels(definition);
    } else if (typeof definition === "string") {
      return this.applyVariantLabels([definition]);
    } else {
      this.setValues(definition);
    }
  };
  /**
   * Apply variant labels without animation
   */


  VisualElementAnimationControls.prototype.applyVariantLabels = function (variantLabelList) {
    var _this = this;

    var isActive = new Set();

    var reversedList = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(variantLabelList).reverse();

    reversedList.forEach(function (key) {
      var _a = _this.resolveVariant(_this.variants[key]),
          target = _a.target,
          transitionEnd = _a.transitionEnd;

      target && _this.setValues(target, {
        isActive: isActive
      });
      transitionEnd && _this.setValues(transitionEnd, {
        isActive: isActive
      });

      if (_this.children && _this.children.size) {
        _this.children.forEach(function (child) {
          return child.applyVariantLabels(variantLabelList);
        });
      }
    });
  };

  VisualElementAnimationControls.prototype.start = function (definition, opts) {
    var _this = this;

    if (opts === void 0) {
      opts = {};
    }

    if (opts.priority) {
      this.activeOverrides.add(opts.priority);
    }

    this.resetIsAnimating(opts.priority);
    var animation;

    if (isVariantLabels(definition)) {
      animation = this.animateVariantLabels(definition, opts);
    } else if (typeof definition === "string") {
      animation = this.animateVariant(definition, opts);
    } else {
      animation = this.animate(definition, opts);
    }

    this.onStart();
    return animation.then(function () {
      return _this.onComplete();
    });
  };

  VisualElementAnimationControls.prototype.animate = function (animationDefinition, _a) {
    var _this = this;

    if (_a === void 0) {
      _a = {};
    }

    var _b = _a.delay,
        delay = _b === void 0 ? 0 : _b,
        _c = _a.priority,
        priority = _c === void 0 ? 0 : _c,
        transitionOverride = _a.transitionOverride,
        opts = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["delay", "priority", "transitionOverride"]);

    var _d = this.resolveVariant(animationDefinition, opts),
        target = _d.target,
        transition = _d.transition,
        transitionEnd = _d.transitionEnd;

    if (transitionOverride) {
      transition = transitionOverride;
    }

    if (!target) return Promise.resolve();
    target = this.transformValues(target);

    if (transitionEnd) {
      transitionEnd = this.transformValues(transitionEnd);
    }

    this.checkForNewValues(target);
    var origin = this.transformValues(getOrigin(target, transition, this.visualElement));

    if (this.makeTargetAnimatable) {
      var animatable = this.makeTargetAnimatable(this.visualElement, target, origin, transitionEnd);
      target = animatable.target;
      transitionEnd = animatable.transitionEnd;
    }

    if (priority) {
      this.resolvedOverrides[priority] = target;
    }

    this.checkForNewValues(target);
    var animations = [];

    for (var key in target) {
      var value = this.visualElement.getValue(key);
      if (!value || !target || target[key] === undefined) continue;
      var valueTarget = target[key];

      if (!priority) {
        this.baseTarget[key] = resolveFinalValueInKeyframes(valueTarget);
      }

      if (this.isAnimating.has(key)) continue;
      this.isAnimating.add(key);
      animations.push(startAnimation(key, value, valueTarget, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
        delay: delay
      }, transition)));
    }

    var allAnimations = Promise.all(animations);
    return transitionEnd ? allAnimations.then(function () {
      _this.setValues(transitionEnd, {
        priority: priority
      });
    }) : allAnimations;
  };

  VisualElementAnimationControls.prototype.animateVariantLabels = function (variantLabels, opts) {
    var _this = this;

    var animations = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(variantLabels).reverse().map(function (label) {
      return _this.animateVariant(label, opts);
    });

    return Promise.all(animations);
  };

  VisualElementAnimationControls.prototype.animateVariant = function (variantLabel, opts) {
    var _this = this;

    var priority = opts && opts.priority || 0;
    var variant = this.variants[variantLabel];
    var transition = variant ? this.resolveVariant(variant, opts).transition || {} : {};
    /**
     * If we have a variant, create a callback that runs it as an animation.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */

    var getAnimation = variant ? function () {
      return _this.animate(variant, opts);
    } : function () {
      return Promise.resolve();
    };
    /**
     * If we have children, create a callback that runs all their animations.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */

    var getChildrenAnimations = this.children ? function (forwardDelay) {
      if (forwardDelay === void 0) {
        forwardDelay = 0;
      }

      var _a = transition.delayChildren,
          delayChildren = _a === void 0 ? 0 : _a;
      return _this.animateChildren(variantLabel, delayChildren + forwardDelay, transition.staggerChildren, transition.staggerDirection, priority, opts === null || opts === void 0 ? void 0 : opts.custom);
    } : function () {
      return Promise.resolve();
    };
    /**
     * If the transition explicitly defines a "when" option, we need to resolve either
     * this animation or all children animations before playing the other.
     */

    var when = transition.when;

    if (when) {
      var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(when === "beforeChildren" ? [getAnimation, getChildrenAnimations] : [getChildrenAnimations, getAnimation], 2),
          first = _a[0],
          last = _a[1];

      return first().then(last);
    } else {
      return Promise.all([getAnimation(), getChildrenAnimations(opts === null || opts === void 0 ? void 0 : opts.delay)]);
    }
  };

  VisualElementAnimationControls.prototype.animateChildren = function (variantLabel, delayChildren, staggerChildren, staggerDirection, priority, custom) {
    if (delayChildren === void 0) {
      delayChildren = 0;
    }

    if (staggerChildren === void 0) {
      staggerChildren = 0;
    }

    if (staggerDirection === void 0) {
      staggerDirection = 1;
    }

    if (priority === void 0) {
      priority = 0;
    }

    if (!this.children) {
      return Promise.resolve();
    }

    var animations = [];
    var maxStaggerDuration = (this.children.size - 1) * staggerChildren;
    var generateStaggerDuration = staggerDirection === 1 ? function (i) {
      return i * staggerChildren;
    } : function (i) {
      return maxStaggerDuration - i * staggerChildren;
    };
    Array.from(this.children).forEach(function (childControls, i) {
      var animation = childControls.animateVariant(variantLabel, {
        priority: priority,
        delay: delayChildren + generateStaggerDuration(i),
        custom: custom
      });
      animations.push(animation);
    });
    return Promise.all(animations);
  };

  VisualElementAnimationControls.prototype.onStart = function () {
    var onAnimationStart = this.props.onAnimationStart;
    onAnimationStart && onAnimationStart();
  };

  VisualElementAnimationControls.prototype.onComplete = function () {
    var onAnimationComplete = this.props.onAnimationComplete;
    onAnimationComplete && onAnimationComplete();
  };

  VisualElementAnimationControls.prototype.checkOverrideIsAnimating = function (priority) {
    var numOverrides = this.overrides.length;

    for (var i = priority + 1; i < numOverrides; i++) {
      var resolvedOverride = this.resolvedOverrides[i];

      if (resolvedOverride) {
        for (var key in resolvedOverride) {
          this.isAnimating.add(key);
        }
      }
    }
  };

  VisualElementAnimationControls.prototype.resetIsAnimating = function (priority) {
    if (priority === void 0) {
      priority = 0;
    }

    this.isAnimating.clear(); // If this isn't the highest priority gesture, block the animation
    // of anything that's currently being animated

    if (priority < this.getHighestPriority()) {
      this.checkOverrideIsAnimating(priority);
    }

    if (this.children) {
      this.children.forEach(function (child) {
        return child.resetIsAnimating(priority);
      });
    }
  };

  VisualElementAnimationControls.prototype.stop = function () {
    this.visualElement.forEachValue(function (value) {
      return value.stop();
    });
  };
  /**
   * Add the controls of a child component.
   * @param controls -
   */


  VisualElementAnimationControls.prototype.addChild = function (controls) {
    if (!this.children) {
      this.children = new Set();
    }

    this.children.add(controls); // We set child overrides when `setOverride` is called, but also have to do it here
    // as the first time `setOverride` is called all the children might not have been added yet.

    this.overrides.forEach(function (override, i) {
      override && controls.setOverride(override, i);
    });
  };

  VisualElementAnimationControls.prototype.removeChild = function (controls) {
    if (!this.children) {
      return;
    }

    this.children.delete(controls);
  };

  VisualElementAnimationControls.prototype.resetChildren = function () {
    if (this.children) this.children.clear();
  };

  return VisualElementAnimationControls;
}();

function getOriginFromTransition(key, transition) {
  if (!transition) return;
  var valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}

function getOrigin(target, transition, visualElement) {
  var _a, _b;

  var origin = {};

  for (var key in target) {
    origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
  }

  return origin;
}
/**
 * Creates an imperative set of controls to trigger animations.
 *
 * This allows a consolidated, uniform API for animations, to be triggered by other APIs like the `animate` prop, or the gesture handlers.
 *
 * @internal
 */


function useVisualElementAnimation(visualElement, props, config, subscribeToParentControls) {
  var variants = props.variants,
      transition = props.transition;
  var parentControls = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionContext).controls;
  var presenceContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
  var controls = useConstant(function () {
    return new VisualElementAnimationControls(visualElement, config);
  }); // Reset and resubscribe children every render to ensure stagger order is correct

  if (!presenceContext || presenceContext.isPresent) {
    controls.resetChildren();
    controls.setProps(props);
    controls.setVariants(variants);
    controls.setDefaultTransition(transition);
  } // We have to subscribe to the parent controls within a useEffect rather than during render,
  // as


  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (subscribeToParentControls && parentControls) {
      parentControls.addChild(controls);
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return function () {
      // Remove reference to onAnimationComplete from controls. All the MotionValues
      // are unsubscribed from this component separately. We let animations run out
      // as they might be animating other components.
      var onAnimationComplete = props.onAnimationComplete,
          unmountProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(props, ["onAnimationComplete"]);

      controls.setProps(unmountProps);
      parentControls && parentControls.removeChild(controls);
    };
  }, []);
  return controls;
}
/**
 * @public
 */


var MotionConfigContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])({
  transformPagePoint: function transformPagePoint(p) {
    return p;
  },
  features: []
});
/**
 * MotionConfig can be used in combination with the `m` component to cut bundle size
 * and dynamically load only the features you use.
 *
 * ```jsx
 * import {
 *   m as motion,
 *   AnimationFeature,
 *   MotionConfig
 * } from "framer-motion"
 *
 * export function App() {
 *   return (
 *     <MotionConfig features={[AnimationFeature]}>
 *       <motion.div animate={{ x: 100 }} />
 *     </MotionConfig>
 *   )
 * }
 * ```
 *
 * @public
 */

function MotionConfig(_a) {
  var children = _a.children,
      _b = _a.features,
      features = _b === void 0 ? [] : _b,
      props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["children", "features"]);

  var pluginContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext);

  var loadedFeatures = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(pluginContext.features, features); // We do want to rerender children when the number of loaded features changes


  var value = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    return {
      features: loadedFeatures
    };
  }, [loadedFeatures.length]); // Mutative to prevent triggering rerenders in all listening
  // components every time this component renders

  for (var key in props) {
    value[key] = props[key];
  }

  return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(MotionConfigContext.Provider, {
    value: value
  }, children);
}
/**
 * Load features via renderless components based on the provided MotionProps
 */


function useFeatures(defaultFeatures, isStatic, visualElement, controls, props, context, parentContext, shouldInheritVariant) {
  var plugins = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext); // If this is a static component, or we're rendering on the server, we don't load
  // any feature components

  if (isStatic || typeof window === "undefined") return null;

  var allFeatures = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(defaultFeatures, plugins.features);

  var numFeatures = allFeatures.length;
  var features = []; // Decide which features we should render and add them to the returned array

  for (var i = 0; i < numFeatures; i++) {
    var _a = allFeatures[i],
        shouldRender = _a.shouldRender,
        key = _a.key,
        getComponent = _a.getComponent;

    if (shouldRender(props, parentContext)) {
      var Component = getComponent(props);
      Component && features.push(Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(Component, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
        key: key
      }, props, {
        localContext: context,
        parentContext: parentContext,
        visualElement: visualElement,
        controls: controls,
        inherit: shouldInheritVariant
      })));
    }
  }

  return features;
}

var Presence;

(function (Presence) {
  Presence[Presence["Entering"] = 0] = "Entering";
  Presence[Presence["Present"] = 1] = "Present";
  Presence[Presence["Exiting"] = 2] = "Exiting";
})(Presence || (Presence = {}));

var VisibilityAction;

(function (VisibilityAction) {
  VisibilityAction[VisibilityAction["Hide"] = 0] = "Hide";
  VisibilityAction[VisibilityAction["Show"] = 1] = "Show";
})(VisibilityAction || (VisibilityAction = {}));
/**
 * Default handlers for batching VisualElements
 */


var defaultHandler = {
  measureLayout: function measureLayout(child) {
    return child.measureLayout();
  },
  layoutReady: function layoutReady(child) {
    return child.layoutReady();
  }
};
/**
 * Sort VisualElements by tree depth, so we process the highest elements first.
 */

var sortByDepth = function sortByDepth(a, b) {
  return a.depth - b.depth;
};
/**
 * Create a batcher to process VisualElements
 */


function createBatcher() {
  var queue = new Set();

  var add = function add(child) {
    return queue.add(child);
  };

  var flush = function flush(_a) {
    var _b = _a === void 0 ? defaultHandler : _a,
        measureLayout = _b.measureLayout,
        layoutReady = _b.layoutReady;

    var order = Array.from(queue).sort(sortByDepth);
    /**
     * Write: Reset any transforms on children elements so we can read their actual layout
     */

    order.forEach(function (child) {
      return child.resetTransform();
    });
    /**
     * Read: Measure the actual layout
     */

    order.forEach(measureLayout);
    /**
     * Write: Notify the VisualElements they're ready for further write operations.
     */

    order.forEach(layoutReady);
    /**
     * After all children have started animating, ensure any Entering components are set to Present.
     * If we add deferred animations (set up all animations and then start them in two loops) this
     * could be moved to the start loop. But it needs to happen after all the animations configs
     * are generated in AnimateSharedLayout as this relies on presence data
     */

    order.forEach(function (child) {
      if (child.isPresent) child.presence = Presence.Present;
    });
    queue.clear();
  };

  return {
    add: add,
    flush: flush
  };
}

function isSharedLayout(context) {
  return !!context.forceUpdate;
}

var SharedLayoutContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])(createBatcher());
var isBrowser = typeof window !== "undefined";
var useIsomorphicLayoutEffect = isBrowser ? react__WEBPACK_IMPORTED_MODULE_5__["useLayoutEffect"] : react__WEBPACK_IMPORTED_MODULE_5__["useEffect"];

function useSnapshotOnUnmount(visualElement) {
  var syncLayout = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(SharedLayoutContext);
  useIsomorphicLayoutEffect(function () {
    return function () {
      if (isSharedLayout(syncLayout)) {
        syncLayout.remove(visualElement);
      }
    };
  }, []);
}
/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 *
 * @internal
 */


function createMotionComponent(Component, _a) {
  var defaultFeatures = _a.defaultFeatures,
      useVisualElement = _a.useVisualElement,
      render = _a.render,
      animationControlsConfig = _a.animationControlsConfig;

  function MotionComponent(props, externalRef) {
    var parentContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionContext);
    var shouldInheritVariant = checkShouldInheritVariant(props);
    /**
     * If a component isStatic, we only visually update it as a
     * result of a React re-render, rather than any interactions or animations.
     * If this component or any ancestor isStatic, we disable hardware acceleration
     * and don't load any additional functionality.
     */

    var isStatic = parentContext.static || props.static || false;
    /**
     * Create a VisualElement for this component. A VisualElement provides a common
     * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
     * providing a way of rendering to these APIs outside of the React render loop
     * for more performant animations and interactions
     */

    var visualElement = useVisualElement(Component, props, parentContext.visualElement, isStatic, externalRef);
    /**
     * Scrape MotionValues from props and add/remove them to/from
     * the VisualElement as necessary.
     */

    useMotionValues(visualElement, props);
    /**
     * Create animation controls for the VisualElement. It might be
     * interesting to try and combine this with VisualElement itself in a further refactor.
     */

    var controls = useVisualElementAnimation(visualElement, props, animationControlsConfig, shouldInheritVariant);
    /**
     * Build the MotionContext to pass on to the next `motion` component.
     */

    var context = useMotionContext(parentContext, controls, visualElement, isStatic, props);
    /**
     * Load features as renderless components unless the component isStatic
     */

    var features = useFeatures(defaultFeatures, isStatic, visualElement, controls, props, context, parentContext, shouldInheritVariant);
    var component = render(Component, props, visualElement);
    /**
     * If this component is a child of AnimateSharedLayout, we need to snapshot the component
     * before it's unmounted. This lives here rather than in features/layout/Measure because
     * as a child component its unmount effect runs after this component has been unmounted.
     */

    useSnapshotOnUnmount(visualElement); // The mount order and hierarchy is specific to ensure our element ref is hydrated by the time
    // all plugins and features has to execute.

    return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null, Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(MotionContext.Provider, {
      value: context
    }, component), features);
  }

  return Object(react__WEBPACK_IMPORTED_MODULE_5__["forwardRef"])(MotionComponent);
}

function createLock(name) {
  var lock = null;
  return function () {
    var openLock = function openLock() {
      lock = null;
    };

    if (lock === null) {
      lock = name;
      return openLock;
    }

    return false;
  };
}

var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");

function getGlobalLock(drag) {
  var lock = false;

  if (drag === "y") {
    lock = globalVerticalLock();
  } else if (drag === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();

    if (openHorizontal_1 && openVertical_1) {
      lock = function lock() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      // Release the locks because we don't use them
      if (openHorizontal_1) openHorizontal_1();
      if (openVertical_1) openVertical_1();
    }
  }

  return lock;
}

function addDomEvent(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return function () {
    return target.removeEventListener(eventName, handler, options);
  };
}
/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */


function useDomEvent(ref, eventName, handler, options) {
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    var element = ref.current;

    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
  }, [ref, eventName, handler, options]);
}

function isMouseEvent(event) {
  // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }

  return event instanceof MouseEvent;
}

function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}
/**
 * Filters out events not attached to the primary pointer (currently left mouse button)
 * @param eventHandler
 */


function filterPrimaryPointer(eventHandler) {
  return function (event) {
    var isMouseEvent = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent || isMouseEvent && event.button === 0;

    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}

var defaultPagePoint = {
  pageX: 0,
  pageY: 0
};

function pointFromTouch(e, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }

  var primaryTouch = e.touches[0] || e.changedTouches[0];
  var point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}

function pointFromMouse(point, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }

  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}

function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }

  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}

function getViewportPointFromEvent(event) {
  return extractEventInfo(event, "client");
}

var wrapHandler = function wrapHandler(handler, shouldFilterPrimaryPointer) {
  if (shouldFilterPrimaryPointer === void 0) {
    shouldFilterPrimaryPointer = false;
  }

  var listener = function listener(event) {
    return handler(event, extractEventInfo(event));
  };

  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};

var isBrowser$1 = typeof window !== "undefined"; // We check for event support via functions in case they've been mocked by a testing suite.

var supportsPointerEvents = function supportsPointerEvents() {
  return isBrowser$1 && window.onpointerdown === null;
};

var supportsTouchEvents = function supportsTouchEvents() {
  return isBrowser$1 && window.ontouchstart === null;
};

var supportsMouseEvents = function supportsMouseEvents() {
  return isBrowser$1 && window.onmousedown === null;
};

var mouseEventNames = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave"
};
var touchEventNames = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel"
};

function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }

  return name;
}

function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}

function usePointerEvent(ref, eventName, handler, options) {
  return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}
/** @public */


var Point;

(function (Point) {
  /** @beta */
  Point.subtract = function (a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  };
  /** @beta */


  Point.relativeTo = function (idOrElem) {
    var elem;

    var getElem = function getElem() {
      // Caching element here could be leaky because of React lifecycle
      if (elem !== undefined) return elem;

      if (typeof idOrElem === "string") {
        elem = document.getElementById(idOrElem);
      } else {
        elem = idOrElem;
      }

      return elem;
    };

    return function (_a) {
      var x = _a.x,
          y = _a.y;
      var localElem = getElem();
      if (!localElem) return undefined;
      var rect = localElem.getBoundingClientRect();
      return {
        x: x - rect.left - window.scrollX,
        y: y - rect.top - window.scrollY
      };
    };
  };
})(Point || (Point = {}));
/**
 * @internal
 */


var PanSession =
/** @class */
function () {
  function PanSession(event, handlers, _a) {
    var _this = this;

    var transformPagePoint = (_a === void 0 ? {} : _a).transformPagePoint;
    /**
     * @internal
     */

    this.startEvent = null;
    /**
     * @internal
     */

    this.lastMoveEvent = null;
    /**
     * @internal
     */

    this.lastMoveEventInfo = null;
    /**
     * @internal
     */

    this.handlers = {};

    this.updatePoint = function () {
      if (!(_this.lastMoveEvent && _this.lastMoveEventInfo)) return;
      var info = getPanInfo(_this.lastMoveEventInfo, _this.history);
      var isPanStarted = _this.startEvent !== null; // Only start panning if the offset is larger than 3 pixels. If we make it
      // any larger than this we'll want to reset the pointer history
      // on the first update to avoid visual snapping to the cursoe.

      var isDistancePastThreshold = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* distance */ "n"])(info.offset, {
        x: 0,
        y: 0
      }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold) return;
      var point = info.point;
      var timestamp = Object(framesync__WEBPACK_IMPORTED_MODULE_1__[/* getFrameData */ "c"])().timestamp;

      _this.history.push(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, point), {
        timestamp: timestamp
      }));

      var _a = _this.handlers,
          onStart = _a.onStart,
          onMove = _a.onMove;

      if (!isPanStarted) {
        onStart && onStart(_this.lastMoveEvent, info);
        _this.startEvent = _this.lastMoveEvent;
      }

      onMove && onMove(_this.lastMoveEvent, info);
    };

    this.handlePointerMove = function (event, info) {
      _this.lastMoveEvent = event;
      _this.lastMoveEventInfo = transformPoint(info, _this.transformPagePoint); // Because Safari doesn't trigger mouseup events when it's above a `<select>`

      if (isMouseEvent(event) && event.buttons === 0) {
        _this.handlePointerUp(event, info);

        return;
      } // Throttle mouse move event to once per frame


      framesync__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].update(_this.updatePoint, true);
    };

    this.handlePointerUp = function (event, info) {
      _this.end();

      var onEnd = _this.handlers.onEnd;
      if (!onEnd) return;
      var panInfo = getPanInfo(transformPoint(info, _this.transformPagePoint), _this.history);
      onEnd && onEnd(event, panInfo);
    }; // If we have more than one touch, don't start detecting this gesture


    if (isTouchEvent(event) && event.touches.length > 1) return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    var info = extractEventInfo(event);
    var initialInfo = transformPoint(info, this.transformPagePoint);
    var point = initialInfo.point;
    var timestamp = Object(framesync__WEBPACK_IMPORTED_MODULE_1__[/* getFrameData */ "c"])().timestamp;
    this.history = [Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, point), {
      timestamp: timestamp
    })];
    var onSessionStart = handlers.onSessionStart;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* pipe */ "v"])(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }

  PanSession.prototype.updateHandlers = function (handlers) {
    this.handlers = handlers;
  };

  PanSession.prototype.end = function () {
    this.removeListeners && this.removeListeners();
    framesync__WEBPACK_IMPORTED_MODULE_1__[/* cancelSync */ "a"].update(this.updatePoint);
  };

  return PanSession;
}();

function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? {
    point: transformPagePoint(info.point)
  } : info;
}

function getPanInfo(_a, history) {
  var point = _a.point;
  return {
    point: point,
    delta: Point.subtract(point, lastDevicePoint(history)),
    offset: Point.subtract(point, startDevicePoint(history)),
    velocity: getVelocity$1(history, 0.1)
  };
}

function startDevicePoint(history) {
  return history[0];
}

function lastDevicePoint(history) {
  return history[history.length - 1];
}

function getVelocity$1(history, timeDelta) {
  if (history.length < 2) {
    return {
      x: 0,
      y: 0
    };
  }

  var i = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);

  while (i >= 0) {
    timestampedPoint = history[i];

    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }

    i--;
  }

  if (!timestampedPoint) {
    return {
      x: 0,
      y: 0
    };
  }

  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;

  if (time === 0) {
    return {
      x: 0,
      y: 0
    };
  }

  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };

  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }

  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }

  return currentVelocity;
}
/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */


function applyConstraints(point, _a, elastic) {
  var min = _a.min,
      max = _a.max;

  if (min !== undefined && point < min) {
    // If we have a min point defined, and this is outside of that, constrain
    point = elastic ? Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(min, point, elastic) : Math.max(point, min);
  } else if (max !== undefined && point > max) {
    // If we have a max point defined, and this is outside of that, constrain
    point = elastic ? Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(max, point, elastic) : Math.min(point, max);
  }

  return point;
}
/**
 * Calculates a min projection point based on a pointer, pointer progress
 * within the drag target, and constraints.
 *
 * For instance if an element was 100px width, we were dragging from 0.25
 * along this axis, the pointer is at 200px, and there were no constraints,
 * we would calculate a min projection point of 175px.
 */


function calcConstrainedMinPoint(point, length, progress, constraints, elastic) {
  // Calculate a min point for this axis and apply it to the current pointer
  var min = point - length * progress;
  return constraints ? applyConstraints(min, constraints, elastic) : min;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */


function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== undefined ? axis.min + min : undefined,
    max: max !== undefined ? axis.max + max - (axis.max - axis.min) : undefined
  };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */


function calcRelativeConstraints(layoutBox, _a) {
  var top = _a.top,
      left = _a.left,
      bottom = _a.bottom,
      right = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */


function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;

  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max; // If the constraints axis is actually smaller than the layout axis then we can
  // flip the constraints

  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])([max, min], 2), min = _a[0], max = _a[1];
  }

  return {
    min: layoutAxis.min + min,
    max: layoutAxis.min + max
  };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */


function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
/**
 * Calculate the an axis position based on two axes and a progress value.
 */


function calcPositionFromProgress(axis, constraints, progress) {
  var axisLength = axis.max - axis.min;
  var min = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(constraints.min, constraints.max - axisLength, progress);
  return {
    min: min,
    max: min + axisLength
  };
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */


function rebaseAxisConstraints(layout, constraints) {
  var relativeConstraints = {};

  if (constraints.min !== undefined) {
    relativeConstraints.min = constraints.min - layout.min;
  }

  if (constraints.max !== undefined) {
    relativeConstraints.max = constraints.max - layout.min;
  }

  return relativeConstraints;
}

var elementDragControls = new WeakMap();
/**
 *
 */

var lastPointerEvent;

var VisualElementDragControls =
/** @class */
function () {
  function VisualElementDragControls(_a) {
    var visualElement = _a.visualElement;
    /**
     * Track whether we're currently dragging.
     *
     * @internal
     */

    this.isDragging = false;
    /**
     * The current direction of drag, or `null` if both.
     *
     * @internal
     */

    this.currentDirection = null;
    /**
     * The permitted boundaries of travel, in pixels.
     *
     * @internal
     */

    this.constraints = false;
    /**
     * A reference to the host component's latest props.
     *
     * @internal
     */

    this.props = {};
    /**
     * @internal
     */

    this.hasMutatedConstraints = false;
    /**
     * Track the initial position of the cursor relative to the dragging element
     * when dragging starts as a value of 0-1 on each axis. We then use this to calculate
     * an ideal bounding box for the VisualElement renderer to project into every frame.
     *
     * @internal
     */

    this.cursorProgress = {
      x: 0.5,
      y: 0.5
    }; // When updating _dragX, or _dragY instead of the VisualElement,
    // persist their values between drag gestures.

    this.originPoint = {}; // This is a reference to the global drag gesture lock, ensuring only one component
    // can "capture" the drag of one or both axes.
    // TODO: Look into moving this into pansession?

    this.openGlobalLock = null;
    /**
     * @internal
     */

    this.panSession = null;
    this.visualElement = visualElement;
    this.visualElement.enableLayoutProjection();
    elementDragControls.set(visualElement, this);
  }
  /**
   * Instantiate a PanSession for the drag gesture
   *
   * @public
   */


  VisualElementDragControls.prototype.start = function (originEvent, _a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.snapToCursor,
        snapToCursor = _c === void 0 ? false : _c,
        cursorProgress = _b.cursorProgress;
    /**
     * If this drag session has been manually triggered by the user, it might be from an event
     * outside the draggable element. If snapToCursor is set to true, we need to measure the position
     * of the element and snap it to the cursor.
     */


    snapToCursor && this.snapToCursor(originEvent);

    var onSessionStart = function onSessionStart() {
      // Stop any animations on both axis values immediately. This allows the user to throw and catch
      // the component.
      _this.stopMotion();
    };

    var onStart = function onStart(event, info) {
      var _a, _b; // Attempt to grab the global drag gesture lock - maybe make this part of PanSession


      var _c = _this.props,
          drag = _c.drag,
          dragPropagation = _c.dragPropagation;

      if (drag && !dragPropagation) {
        if (_this.openGlobalLock) _this.openGlobalLock();
        _this.openGlobalLock = getGlobalLock(drag); // If we don 't have the lock, don't start dragging

        if (!_this.openGlobalLock) return;
      }
      /**
       * Record the progress of the mouse within the draggable element on each axis.
       * onPan, we're going to use this to calculate a new bounding box for the element to
       * project into. This will ensure that even if the DOM element moves via a relayout, it'll
       * stick to the correct place under the pointer.
       */


      _this.prepareBoundingBox();

      _this.visualElement.lockTargetBox();
      /**
       * Resolve the drag constraints. These are either set as top/right/bottom/left constraints
       * relative to the element's layout, or a ref to another element. Both need converting to
       * viewport coordinates.
       */


      _this.resolveDragConstraints();
      /**
       * When dragging starts, we want to find where the cursor is relative to the bounding box
       * of the element. Every frame, we calculate a new bounding box using this relative position
       * and let the visualElement renderer figure out how to reproject the element into this bounding
       * box.
       *
       * By doing it this way, rather than applying an x/y transform directly to the element,
       * we can ensure the component always visually sticks to the cursor as we'd expect, even
       * if the DOM element itself changes layout as a result of React updates the user might
       * make based on the drag position.
       */


      var point = getViewportPointFromEvent(event).point;
      eachAxis(function (axis) {
        var _a = _this.visualElement.targetBox[axis],
            min = _a.min,
            max = _a.max;
        _this.cursorProgress[axis] = cursorProgress ? cursorProgress[axis] : Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* progress */ "w"])(min, max, point[axis]);
        /**
         * If we have external drag MotionValues, record their origin point. On pointermove
         * we'll apply the pan gesture offset directly to this value.
         */

        var axisValue = _this.getAxisMotionValue(axis);

        if (axisValue) {
          _this.originPoint[axis] = axisValue.get();
        }
      }); // Set current drag status

      _this.isDragging = true;
      _this.currentDirection = null; // Fire onDragStart event

      (_b = (_a = _this.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, event, info);
    };

    var onMove = function onMove(event, info) {
      var _a, _b, _c, _d;

      var _e = _this.props,
          dragPropagation = _e.dragPropagation,
          dragDirectionLock = _e.dragDirectionLock; // If we didn't successfully receive the gesture lock, early return.

      if (!dragPropagation && !_this.openGlobalLock) return;
      var offset = info.offset; // Attempt to detect drag direction if directionLock is true

      if (dragDirectionLock && _this.currentDirection === null) {
        _this.currentDirection = getCurrentDirection(offset); // If we've successfully set a direction, notify listener

        if (_this.currentDirection !== null) {
          (_b = (_a = _this.props).onDirectionLock) === null || _b === void 0 ? void 0 : _b.call(_a, _this.currentDirection);
        }

        return;
      } // Update each point with the latest position


      _this.updateAxis("x", event, offset);

      _this.updateAxis("y", event, offset); // Fire onDrag event


      (_d = (_c = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c, event, info); // Update the last pointer event

      lastPointerEvent = event;
    };

    var onEnd = function onEnd(event, info) {
      return _this.stop(event, info);
    };

    var transformPagePoint = this.props.transformPagePoint;
    this.panSession = new PanSession(originEvent, {
      onSessionStart: onSessionStart,
      onStart: onStart,
      onMove: onMove,
      onEnd: onEnd
    }, {
      transformPagePoint: transformPagePoint
    });
  };
  /**
   * Ensure the component's layout and target bounding boxes are up-to-date.
   */


  VisualElementDragControls.prototype.prepareBoundingBox = function () {
    var element = this.visualElement.getInstance();
    var transform = element.style.transform;
    this.visualElement.resetTransform();
    this.visualElement.measureLayout();
    element.style.transform = transform;
    this.visualElement.rebaseTargetBox(true, this.visualElement.getBoundingBoxWithoutTransforms());
  };

  VisualElementDragControls.prototype.resolveDragConstraints = function () {
    var _this = this;

    var dragConstraints = this.props.dragConstraints;

    if (dragConstraints) {
      this.constraints = isRefObject(dragConstraints) ? this.resolveRefConstraints(this.visualElement.box, dragConstraints) : calcRelativeConstraints(this.visualElement.box, dragConstraints);
    } else {
      this.constraints = false;
    }
    /**
     * If we're outputting to external MotionValues, we want to rebase the measured constraints
     * from viewport-relative to component-relative.
     */


    if (this.constraints && !this.hasMutatedConstraints) {
      eachAxis(function (axis) {
        if (_this.getAxisMotionValue(axis)) {
          _this.constraints[axis] = rebaseAxisConstraints(_this.visualElement.box[axis], _this.constraints[axis]);
        }
      });
    }
  };

  VisualElementDragControls.prototype.resolveRefConstraints = function (layoutBox, constraints) {
    var _a = this.props,
        onMeasureDragConstraints = _a.onMeasureDragConstraints,
        transformPagePoint = _a.transformPagePoint;
    var constraintsElement = constraints.current;
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
    var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
    /**
     * If there's an onMeasureDragConstraints listener we call it and
     * if different constraints are returned, set constraints to that
     */

    if (onMeasureDragConstraints) {
      var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;

      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
      }
    }

    return measuredConstraints;
  };

  VisualElementDragControls.prototype.cancelDrag = function () {
    this.isDragging = false;
    this.panSession && this.panSession.end();
    this.panSession = null;

    if (!this.props.dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
  };

  VisualElementDragControls.prototype.stop = function (event, info) {
    var _a;

    this.visualElement.unlockTargetBox();
    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = null;
    var isDragging = this.isDragging;
    this.cancelDrag();
    if (!isDragging) return;
    var _b = this.props,
        dragMomentum = _b.dragMomentum,
        dragElastic = _b.dragElastic,
        onDragEnd = _b.onDragEnd;

    if (dragMomentum || dragElastic) {
      var velocity = info.velocity;
      this.animateDragEnd(velocity);
    }

    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
  };

  VisualElementDragControls.prototype.snapToCursor = function (event) {
    var _this = this;

    this.prepareBoundingBox();
    eachAxis(function (axis) {
      var axisValue = _this.getAxisMotionValue(axis);

      if (axisValue) {
        var point = getViewportPointFromEvent(event).point;
        var box = _this.visualElement.box;
        var length_1 = box[axis].max - box[axis].min;
        var center = box[axis].min + length_1 / 2;
        var offset = point[axis] - center;
        _this.originPoint[axis] = point[axis];
        axisValue.set(offset);
      } else {
        _this.cursorProgress[axis] = 0.5;

        _this.updateVisualElementAxis(axis, event);
      }
    });
  };
  /**
   * Update the specified axis with the latest pointer information.
   */


  VisualElementDragControls.prototype.updateAxis = function (axis, event, offset) {
    var drag = this.props.drag; // If we're not dragging this axis, do an early return.

    if (!shouldDrag(axis, drag, this.currentDirection)) return;
    return this.getAxisMotionValue(axis) ? this.updateAxisMotionValue(axis, offset) : this.updateVisualElementAxis(axis, event);
  };

  VisualElementDragControls.prototype.updateAxisMotionValue = function (axis, offset) {
    var axisValue = this.getAxisMotionValue(axis);
    if (!offset || !axisValue) return;
    var dragElastic = this.props.dragElastic;
    var nextValue = this.originPoint[axis] + offset[axis];
    var update = this.constraints ? applyConstraints(nextValue, this.constraints[axis], dragElastic) : nextValue;
    axisValue.set(update);
  };

  VisualElementDragControls.prototype.updateVisualElementAxis = function (axis, event) {
    var _a;

    var dragElastic = this.props.dragElastic; // Get the actual layout bounding box of the element

    var axisLayout = this.visualElement.box[axis]; // Calculate its current length. In the future we might want to lerp this to animate
    // between lengths if the layout changes as we change the DOM

    var axisLength = axisLayout.max - axisLayout.min; // Get the initial progress that the pointer sat on this axis on gesture start.

    var axisProgress = this.cursorProgress[axis];
    var point = getViewportPointFromEvent(event).point; // Calculate a new min point based on the latest pointer position, constraints and elastic

    var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], dragElastic); // Update the axis viewport target with this new min and the length

    this.visualElement.setAxisTarget(axis, min, min + axisLength);
  };

  VisualElementDragControls.prototype.updateProps = function (_a) {
    var _b = _a.drag,
        drag = _b === void 0 ? false : _b,
        _c = _a.dragDirectionLock,
        dragDirectionLock = _c === void 0 ? false : _c,
        _d = _a.dragPropagation,
        dragPropagation = _d === void 0 ? false : _d,
        _e = _a.dragConstraints,
        dragConstraints = _e === void 0 ? false : _e,
        _f = _a.dragElastic,
        dragElastic = _f === void 0 ? 0.35 : _f,
        _g = _a.dragMomentum,
        dragMomentum = _g === void 0 ? true : _g,
        remainingProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);

    this.props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
      drag: drag,
      dragDirectionLock: dragDirectionLock,
      dragPropagation: dragPropagation,
      dragConstraints: dragConstraints,
      dragElastic: dragElastic,
      dragMomentum: dragMomentum
    }, remainingProps);
  };
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - If the component will perform layout animations, we output the gesture to the component's
   *      visual bounding box
   * - Otherwise, we apply the delta to the x/y motion values.
   */


  VisualElementDragControls.prototype.getAxisMotionValue = function (axis) {
    var _a = this.props,
        layout = _a.layout,
        layoutId = _a.layoutId;
    var dragKey = "_drag" + axis.toUpperCase();

    if (this.props[dragKey]) {
      return this.props[dragKey];
    } else if (!layout && layoutId === undefined) {
      return this.visualElement.getValue(axis, 0);
    }
  };

  VisualElementDragControls.prototype.animateDragEnd = function (velocity) {
    var _this = this;

    var _a = this.props,
        drag = _a.drag,
        dragMomentum = _a.dragMomentum,
        dragElastic = _a.dragElastic,
        dragTransition = _a.dragTransition;
    var momentumAnimations = eachAxis(function (axis) {
      if (!shouldDrag(axis, drag, _this.currentDirection)) {
        return;
      }

      var transition = _this.constraints ? _this.constraints[axis] : {};
      /**
       * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
       * of spring animations so we should look into adding a disable spring option to `inertia`.
       * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
       * using the value of `dragElastic`.
       */

      var bounceStiffness = dragElastic ? 200 : 1000000;
      var bounceDamping = dragElastic ? 40 : 10000000;

      var inertia = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness: bounceStiffness,
        bounceDamping: bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10
      }, dragTransition), transition); // If we're not animating on an externally-provided `MotionValue` we can use the
      // component's animation controls which will handle interactions with whileHover (etc),
      // otherwise we just have to animate the `MotionValue` itself.


      return _this.getAxisMotionValue(axis) ? _this.startAxisValueAnimation(axis, inertia) : _this.visualElement.startLayoutAxisAnimation(axis, inertia);
    }); // Run all animations and then resolve the new drag constraints.

    return Promise.all(momentumAnimations).then(function () {
      var _a, _b;

      (_b = (_a = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
    });
  };

  VisualElementDragControls.prototype.stopMotion = function () {
    var _this = this;

    eachAxis(function (axis) {
      var axisValue = _this.getAxisMotionValue(axis);

      axisValue ? axisValue.stop() : _this.visualElement.stopLayoutAnimation();
    });
  };

  VisualElementDragControls.prototype.startAxisValueAnimation = function (axis, transition) {
    var axisValue = this.getAxisMotionValue(axis);
    if (!axisValue) return;
    var currentValue = axisValue.get();
    axisValue.set(currentValue);
    axisValue.set(currentValue); // Set twice to hard-reset velocity

    return startAnimation(axis, axisValue, 0, transition);
  };

  VisualElementDragControls.prototype.scalePoint = function () {
    var _this = this;

    var _a = this.props,
        drag = _a.drag,
        dragConstraints = _a.dragConstraints;
    if (!isRefObject(dragConstraints) || !this.constraintsBox) return; // Stop any current animations as there can be some visual glitching if we resize mid animation

    this.stopMotion(); // Record the relative progress of the targetBox relative to the constraintsBox

    var boxProgress = {
      x: 0,
      y: 0
    };
    eachAxis(function (axis) {
      boxProgress[axis] = calcOrigin(_this.visualElement.targetBox[axis], _this.constraintsBox[axis]);
    });
    /**
     * For each axis, calculate the current progress of the layout axis within the constraints.
     * Then, using the latest layout and constraints measurements, reposition the new layout axis
     * proportionally within the constraints.
     */

    this.prepareBoundingBox();
    this.resolveDragConstraints();
    eachAxis(function (axis) {
      if (!shouldDrag(axis, drag, null)) return; // Calculate the position of the targetBox relative to the constraintsBox using the
      // previously calculated progress

      var _a = calcPositionFromProgress(_this.visualElement.targetBox[axis], _this.constraintsBox[axis], boxProgress[axis]),
          min = _a.min,
          max = _a.max;

      _this.visualElement.setAxisTarget(axis, min, max);
    });
  };

  VisualElementDragControls.prototype.mount = function (visualElement) {
    var _this = this;

    var element = visualElement.getInstance();
    /**
     * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
     */

    var stopPointerListener = addPointerEvent(element, "pointerdown", function (event) {
      var _a = _this.props,
          drag = _a.drag,
          _b = _a.dragListener,
          dragListener = _b === void 0 ? true : _b;
      drag && dragListener && _this.start(event);
    });
    /**
     * Attach a window resize listener to scale the draggable target within its defined
     * constraints as the window resizes.
     */

    var stopResizeListener = addDomEvent(window, "resize", function () {
      _this.scalePoint();
    });
    /**
     * Ensure drag constraints are resolved correctly relative to the dragging element
     * whenever its layout changes.
     */

    var stopLayoutUpdateListener = visualElement.onLayoutUpdate(function () {
      if (_this.isDragging) _this.resolveDragConstraints();
    });
    /**
     * If the previous component with this same layoutId was dragging at the time
     * it was unmounted, we want to continue the same gesture on this component.
     */

    var prevSnapshot = visualElement.prevSnapshot;
    (prevSnapshot === null || prevSnapshot === void 0 ? void 0 : prevSnapshot.isDragging) && this.start(lastPointerEvent, {
      cursorProgress: prevSnapshot.cursorProgress
    });
    /**
     * Return a function that will teardown the drag gesture
     */

    return function () {
      stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
      stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
      stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();

      _this.cancelDrag();
    };
  };

  return VisualElementDragControls;
}();

function shouldDrag(direction, drag, currentDirection) {
  return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */


function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }

  var direction = null;

  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }

  return direction;
}
/**
 * A hook that allows an element to be dragged.
 *
 * @internal
 */


function useDrag(props, visualElement) {
  var groupDragControls = props.dragControls;
  var transformPagePoint = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext).transformPagePoint;
  var dragControls = useConstant(function () {
    return new VisualElementDragControls({
      visualElement: visualElement
    });
  });
  dragControls.updateProps(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, props), {
    transformPagePoint: transformPagePoint
  })); // If we've been provided a DragControls for manual control over the drag gesture,
  // subscribe this component to it on mount.

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return groupDragControls && groupDragControls.subscribe(dragControls);
  }, [dragControls]); // Mount the drag controls with the visualElement

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return dragControls.mount(visualElement);
  }, []);
}

var makeRenderlessComponent = function makeRenderlessComponent(hook) {
  return function (props) {
    hook(props);
    return null;
  };
};

var Component = makeRenderlessComponent(function (_a) {
  var visualElement = _a.visualElement,
      props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["visualElement"]);

  return useDrag(props, visualElement);
});
/**
 * @public
 */

var Drag = {
  key: "drag",
  shouldRender: function shouldRender(props) {
    return !!props.drag;
  },
  getComponent: function getComponent() {
    return Component;
  }
};

function useUnmountEffect(callback) {
  return Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return function () {
      return callback();
    };
  }, []);
}
/**
 *
 * @param handlers -
 * @param ref -
 *
 * @internalremarks
 * Currently this sets new pan gesture functions every render. The memo route has been explored
 * in the past but ultimately we're still creating new functions every render. An optimisation
 * to explore is creating the pan gestures and loading them into a `ref`.
 *
 * @internal
 */


function usePanGesture(_a, ref) {
  var onPan = _a.onPan,
      onPanStart = _a.onPanStart,
      onPanEnd = _a.onPanEnd,
      onPanSessionStart = _a.onPanSessionStart;
  var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  var panSession = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
  var transformPagePoint = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext).transformPagePoint;
  var handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: function onEnd(event, info) {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (panSession.current !== null) {
      panSession.current.updateHandlers(handlers);
    }
  });

  function onPointerDown(event) {
    panSession.current = new PanSession(event, handlers, {
      transformPagePoint: transformPagePoint
    });
  }

  usePointerEvent(ref, "pointerdown", hasPanEvents && onPointerDown);
  useUnmountEffect(function () {
    return panSession.current && panSession.current.end();
  });
}
/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */


var isNodeOrChild = function isNodeOrChild(parent, child) {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

var order$1 = ["whileHover", "whileTap", "whileDrag"];

var getGesturePriority = function getGesturePriority(gesture) {
  return order$1.indexOf(gesture) + 1;
};

var tapGesturePriority = getGesturePriority("whileTap");
/**
 * @param handlers -
 * @internal
 */

function useTapGesture(_a, ref) {
  var onTap = _a.onTap,
      onTapStart = _a.onTapStart,
      onTapCancel = _a.onTapCancel,
      whileTap = _a.whileTap,
      controls = _a.controls;
  var hasTapListeners = onTap || onTapStart || onTapCancel || whileTap;
  var isTapping = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);
  var cancelPointerEventListener = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);

  function removePointerUp() {
    var _a;

    (_a = cancelPointerEventListener.current) === null || _a === void 0 ? void 0 : _a.call(cancelPointerEventListener);
    cancelPointerEventListener.current = null;
  }

  if (whileTap && controls) {
    controls.setOverride(whileTap, tapGesturePriority);
  } // We load this event handler into a ref so we can later refer to
  // onPointerUp.current which will always have reference to the latest props


  var onPointerUp = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);

  onPointerUp.current = function (event, info) {
    var element = ref.current;
    removePointerUp();
    if (!isTapping.current || !element) return;
    isTapping.current = false;

    if (controls && whileTap) {
      controls.clearOverride(tapGesturePriority);
    } // Check the gesture lock - if we get it, it means no drag gesture is active
    // and we can safely fire the tap gesture.


    var openGestureLock = getGlobalLock(true);
    if (!openGestureLock) return;
    openGestureLock();

    if (!isNodeOrChild(element, event.target)) {
      onTapCancel && onTapCancel(event, info);
    } else {
      onTap && onTap(event, info);
    }
  };

  function onPointerDown(event, info) {
    removePointerUp();
    cancelPointerEventListener.current = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* pipe */ "v"])(addPointerEvent(window, "pointerup", function (event, info) {
      var _a;

      return (_a = onPointerUp.current) === null || _a === void 0 ? void 0 : _a.call(onPointerUp, event, info);
    }), addPointerEvent(window, "pointercancel", function (event, info) {
      var _a;

      return (_a = onPointerUp.current) === null || _a === void 0 ? void 0 : _a.call(onPointerUp, event, info);
    }));
    var element = ref.current;
    if (!element || isTapping.current) return;
    isTapping.current = true;
    onTapStart && onTapStart(event, info);

    if (controls && whileTap) {
      controls.startOverride(tapGesturePriority);
    }
  }

  usePointerEvent(ref, "pointerdown", hasTapListeners ? onPointerDown : undefined);
  useUnmountEffect(removePointerUp);
}

var hoverPriority = getGesturePriority("whileHover");

var filterTouch = function filterTouch(listener) {
  return function (event, info) {
    if (isMouseEvent(event)) listener(event, info);
  };
};
/**
 *
 * @param props
 * @param ref
 * @internal
 */


function useHoverGesture(_a, ref) {
  var whileHover = _a.whileHover,
      onHoverStart = _a.onHoverStart,
      onHoverEnd = _a.onHoverEnd,
      controls = _a.controls;

  if (whileHover && controls) {
    controls.setOverride(whileHover, hoverPriority);
  }

  usePointerEvent(ref, "pointerenter", filterTouch(function (event, info) {
    if (onHoverStart) onHoverStart(event, info);

    if (whileHover && controls) {
      controls.startOverride(hoverPriority);
    }
  }));
  usePointerEvent(ref, "pointerleave", filterTouch(function (event, info) {
    if (onHoverEnd) onHoverEnd(event, info);

    if (whileHover && controls) {
      controls.clearOverride(hoverPriority);
    }
  }));
}
/**
 * Add pan and tap gesture recognition to an element.
 *
 * @param props - Gesture event handlers
 * @param ref - React `ref` containing a DOM `Element`
 * @public
 */


function useGestures(props, ref) {
  usePanGesture(props, ref);
  useTapGesture(props, ref);
  useHoverGesture(props, ref);
}

var gestureProps = ["onPan", "onPanStart", "onPanEnd", "onPanSessionStart", "onTap", "onTapStart", "onTapCancel", "whileTap", "whileHover", "onHoverStart", "onHoverEnd"];
var GestureComponent = makeRenderlessComponent(function (_a) {
  var visualElement = _a.visualElement,
      props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["visualElement"]);

  useGestures(props, visualElement);
});
/**
 * @public
 */

var Gestures = {
  key: "gestures",
  shouldRender: function shouldRender(props) {
    return gestureProps.some(function (key) {
      return props.hasOwnProperty(key);
    });
  },
  getComponent: function getComponent() {
    return GestureComponent;
  }
};
var ExitComponent = makeRenderlessComponent(function (props) {
  var animate = props.animate,
      controls = props.controls,
      exit = props.exit;

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(usePresence(), 2),
      isPresent = _a[0],
      onExitComplete = _a[1];

  var presenceContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
  var isPlayingExitAnimation = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);
  var custom = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== undefined ? presenceContext.custom : props.custom;
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (!isPresent) {
      if (!isPlayingExitAnimation.current && exit) {
        controls.start(exit, {
          custom: custom
        }).then(onExitComplete);
      }

      isPlayingExitAnimation.current = true;
    } else if (isPlayingExitAnimation.current && animate && typeof animate !== "boolean" && !(animate instanceof AnimationControls)) {
      controls.start(animate);
    }

    if (isPresent) {
      isPlayingExitAnimation.current = false;
    }
  }, [animate, controls, custom, exit, isPresent, onExitComplete, props]);
});
/**
 * @public
 */

var Exit = {
  key: "exit",
  shouldRender: function shouldRender(props) {
    return !!props.exit && !checkShouldInheritVariant(props);
  },
  getComponent: function getComponent() {
    return ExitComponent;
  }
};
var AnimatePropType;

(function (AnimatePropType) {
  AnimatePropType["Target"] = "Target";
  AnimatePropType["VariantLabel"] = "VariantLabel";
  AnimatePropType["AnimationSubscription"] = "AnimationSubscription";
})(AnimatePropType || (AnimatePropType = {}));

function shallowCompare(next, prev) {
  if (prev === null) return false;
  var prevLength = prev.length;
  if (prevLength !== next.length) return false;

  for (var i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i]) return false;
  }

  return true;
}

var hasUpdated = function hasUpdated(prev, next) {
  return next !== undefined && (Array.isArray(prev) && Array.isArray(next) ? !shallowCompare(next, prev) : prev !== next);
};

function targetWithoutTransition(_a, mergeTransitionEnd) {
  if (mergeTransitionEnd === void 0) {
    mergeTransitionEnd = false;
  }

  var transition = _a.transition,
      transitionEnd = _a.transitionEnd,
      target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["transition", "transitionEnd"]);

  return mergeTransitionEnd ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, target), transitionEnd) : target;
}
/**
 * Handle the `animate` prop when its an object of values, ie:
 *
 * ```jsx
 * <motion.div animate={{ opacity: 1 }} />
 * ```
 *
 * @internalremarks
 * It might be worth consolidating this with `use-variants`
 *
 * ```jsx
 * <motion.div animate="visible" />
 * ```
 *
 * @param target
 * @param controls
 * @param values
 * @param transition
 *
 * @internal
 */


function useAnimateProp(targetAndTransition, controls, visualElement, defaultTransition) {
  var isInitialRender = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(true);
  var prevValues = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);

  if (!prevValues.current) {
    prevValues.current = targetWithoutTransition(targetAndTransition, true);
  }

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    var targetToAnimate = {}; // These are the values we're actually animating

    var animatingTarget = targetWithoutTransition(targetAndTransition); // This is the target as it'll be once transitionEnd values are applied

    var finalTarget = targetWithoutTransition(targetAndTransition, true); // Detect which values have changed between renders

    for (var key in animatingTarget) {
      // This value should animate on mount if this value doesn't already exist (wasn't
      // defined in `style` or `initial`) or if it does exist and it's already changed.
      var shouldAnimateOnMount = isInitialRender.current && (!visualElement.hasValue(key) || visualElement.getValue(key).get() !== finalTarget[key]); // If this value has updated between renders or it's we're animating this value on mount,
      // add it to the animate target.

      var isValidValue = finalTarget[key] !== null;
      var valueHasUpdated = hasUpdated(prevValues.current[key], finalTarget[key]);

      if (isValidValue && (valueHasUpdated || shouldAnimateOnMount)) {
        targetToAnimate[key] = animatingTarget[key];
      }
    }

    isInitialRender.current = false;
    prevValues.current = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, prevValues.current), finalTarget);

    if (Object.keys(targetToAnimate).length) {
      controls.start(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, targetToAnimate), {
        transition: targetAndTransition.transition || defaultTransition,
        transitionEnd: targetAndTransition.transitionEnd
      }));
    }
  }, [targetAndTransition]);
}

var labelsToArray = function labelsToArray(label) {
  if (!label) {
    return [];
  }

  if (Array.isArray(label)) {
    return label;
  }

  return [label];
};

var resolveVariantLabels = function resolveVariantLabels(variant) {
  var unresolvedVariant = variant instanceof MotionValue ? variant.get() : variant;
  return Array.from(new Set(labelsToArray(unresolvedVariant)));
};
/**
 * Hooks in React sometimes accept a dependency array as their final argument. (ie useEffect/useMemo)
 * When values in this array change, React re-runs the dependency. However if the array
 * contains a variable number of items, React throws an error.
 */


var asDependencyList = function asDependencyList(list) {
  return [list.join(",")];
};

var hasVariantChanged = function hasVariantChanged(oldVariant, newVariant) {
  return oldVariant.join(",") !== newVariant.join(",");
};
/**
 * Handle variants and the `animate` prop when its set as variant labels.
 *
 * @param initial - Initial variant(s)
 * @param animate - Variant(s) to animate to
 * @param inherit - `true` is inheriting animations from parent
 * @param controls - Animation controls
 *
 * @internal
 */


function useVariants(initial, animate, inherit, controls) {
  var targetVariants = resolveVariantLabels(animate);
  var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionContext);
  var parentAlreadyMounted = context.hasMounted && context.hasMounted.current;
  var hasMounted = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    var shouldAnimate = false;

    if (inherit) {
      // If we're inheriting variant changes and the parent has already
      // mounted when this component loads, we need to manually trigger
      // this animation.
      shouldAnimate = !!parentAlreadyMounted;
      targetVariants = resolveVariantLabels(context.animate);
    } else {
      shouldAnimate = hasMounted.current || hasVariantChanged(resolveVariantLabels(initial), targetVariants);
    }

    shouldAnimate && controls.start(targetVariants);
    hasMounted.current = true;
  }, asDependencyList(targetVariants));
}
/**
 * `useAnimationGroupSubscription` allows a component to subscribe to an
 * externally-created `AnimationControls`, created by the `useAnimation` hook.
 *
 * @param animation
 * @param controls
 *
 * @internal
 */


function useAnimationGroupSubscription(animation, controls) {
  var unsubscribe = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    return animation.subscribe(controls);
  }, [animation]);
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return function () {
      unsubscribe && unsubscribe();
    };
  }, [unsubscribe]);
}

var _a, _b;

var AnimatePropComponents = (_a = {}, _a[AnimatePropType.Target] = makeRenderlessComponent(function (_a) {
  var animate = _a.animate,
      controls = _a.controls,
      visualElement = _a.visualElement,
      transition = _a.transition;
  return useAnimateProp(animate, controls, visualElement, transition);
}), _a[AnimatePropType.VariantLabel] = makeRenderlessComponent(function (_a) {
  var animate = _a.animate,
      _b = _a.inherit,
      inherit = _b === void 0 ? true : _b,
      controls = _a.controls,
      initial = _a.initial;
  return useVariants(initial, animate, inherit, controls);
}), _a[AnimatePropType.AnimationSubscription] = makeRenderlessComponent(function (_a) {
  var animate = _a.animate,
      controls = _a.controls;
  return useAnimationGroupSubscription(animate, controls);
}), _a);

var isVariantLabel$1 = function isVariantLabel$1(prop) {
  return Array.isArray(prop) || typeof prop === "string";
};

var isAnimationSubscription = function isAnimationSubscription(_a) {
  var animate = _a.animate;
  return animate instanceof AnimationControls;
};

var animationProps = ["initial", "animate", "whileTap", "whileHover"];
var animatePropTypeTests = (_b = {}, _b[AnimatePropType.Target] = function (props) {
  return props.animate !== undefined && !isVariantLabel$1(props.animate) && !isAnimationSubscription(props);
}, _b[AnimatePropType.VariantLabel] = function (props) {
  return props.variants !== undefined || animationProps.some(function (key) {
    return typeof props[key] === "string";
  });
}, _b[AnimatePropType.AnimationSubscription] = isAnimationSubscription, _b);

var getAnimationComponent = function getAnimationComponent(props) {
  var animatePropType = undefined;

  for (var key in AnimatePropType) {
    if (animatePropTypeTests[key](props)) {
      animatePropType = key;
    }
  }

  return animatePropType ? AnimatePropComponents[animatePropType] : undefined;
};
/**
 * @public
 */


var Animation = {
  key: "animation",
  shouldRender: function shouldRender() {
    return true;
  },
  getComponent: getAnimationComponent
};

function tweenAxis(target, prev, next, p) {
  target.min = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(prev.min, next.min, p);
  target.max = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(prev.max, next.max, p);
}

var progressTarget = 1000;

var Animate =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(Animate, _super);

  function Animate() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.frameTarget = {
      x: {
        min: 0,
        max: 0
      },
      y: {
        min: 0,
        max: 0
      }
    };
    _this.stopAxisAnimation = {
      x: undefined,
      y: undefined
    };

    _this.animate = function (target, origin, _a) {
      if (_a === void 0) {
        _a = {};
      }

      var originBox = _a.originBox,
          targetBox = _a.targetBox,
          visibilityAction = _a.visibilityAction,
          shouldStackAnimate = _a.shouldStackAnimate,
          config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "d"])(_a, ["originBox", "targetBox", "visibilityAction", "shouldStackAnimate"]);

      var _b = _this.props,
          visualElement = _b.visualElement,
          layout = _b.layout;
      /**
       * Early return if we've been instructed not to animate this render.
       */

      if (shouldStackAnimate === false) return _this.safeToRemove();
      /**
       * Allow the measured origin (prev bounding box) and target (actual layout) to be
       * overridden by the provided config.
       */

      origin = originBox || origin;
      target = targetBox || target;
      var boxHasMoved = hasMoved(origin, target);
      var animations = eachAxis(function (axis) {
        /**
         * If layout is set to "position", we can resize the origin box based on the target
         * box and only animate its position.
         */
        if (layout === "position") {
          var targetLength = target[axis].max - target[axis].min;
          origin[axis].max = origin[axis].min + targetLength;
        }

        if (visualElement.isTargetBoxLocked) {
          return;
        } else if (visibilityAction !== undefined) {
          // If we're meant to show/hide the visualElement, do so
          visibilityAction === VisibilityAction.Hide ? visualElement.hide() : visualElement.show();
        } else if (boxHasMoved) {
          // If the box has moved, animate between it's current visual state and its
          // final state
          return _this.animateAxis(axis, target[axis], origin[axis], config);
        } else {
          // If the box has remained in the same place, immediately set the axis target
          // to the final desired state
          return visualElement.setAxisTarget(axis, target[axis].min, target[axis].max);
        }
      }); // Force a render to ensure there's no flash of uncorrected bounding box.

      visualElement.render();
      /**
       * If this visualElement isn't present (ie it's been removed from the tree by the user but
       * kept in by the tree by AnimatePresence) then call safeToRemove when all axis animations
       * have successfully finished.
       */

      return Promise.all(animations).then(function () {
        var _a, _b;

        (_b = (_a = _this.props).onLayoutAnimationComplete) === null || _b === void 0 ? void 0 : _b.call(_a);

        if (visualElement.isPresent) {
          visualElement.presence = Presence.Present;
        } else {
          _this.safeToRemove();
        }
      });
    };

    return _this;
  }

  Animate.prototype.componentDidMount = function () {
    var _this = this;

    var visualElement = this.props.visualElement;
    visualElement.enableLayoutProjection();
    this.unsubLayoutReady = visualElement.onLayoutUpdate(this.animate);
    visualElement.updateConfig(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, visualElement.config), {
      safeToRemove: function safeToRemove() {
        return _this.safeToRemove();
      }
    }));
  };

  Animate.prototype.componentWillUnmount = function () {
    var _this = this;

    this.unsubLayoutReady();
    eachAxis(function (axis) {
      var _a, _b;

      return (_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 ? void 0 : _b.call(_a);
    });
  };
  /**
   * TODO: This manually performs animations on the visualElement's layout progress
   * values. It'd be preferable to amend the HTMLVisualElement.startLayoutAxisAnimation
   * API to accept more custom animations like this.
   */


  Animate.prototype.animateAxis = function (axis, target, origin, _a) {
    var _b, _c;

    var _d = _a === void 0 ? {} : _a,
        transition = _d.transition,
        crossfadeOpacity = _d.crossfadeOpacity;

    (_c = (_b = this.stopAxisAnimation)[axis]) === null || _c === void 0 ? void 0 : _c.call(_b);
    var visualElement = this.props.visualElement;
    var frameTarget = this.frameTarget[axis];
    var layoutProgress = visualElement.axisProgress[axis];
    /**
     * Set layout progress back to 0. We set it twice to hard-reset any velocity that might
     * be re-incoporated into a subsequent spring animation.
     */

    layoutProgress.clearListeners();
    layoutProgress.set(0);
    layoutProgress.set(0);
    /**
     * If this is a crossfade animation, create a function that updates both the opacity of this component
     * and the one being crossfaded out.
     */

    var crossfade;

    if (crossfadeOpacity) {
      crossfade = this.createCrossfadeAnimation(crossfadeOpacity);
      visualElement.show();
    }
    /**
     * Create an animation function to run once per frame. This will tween the visual bounding box from
     * origin to target using the latest progress value.
     */


    var frame = function frame() {
      // Convert the latest layoutProgress, which is a value from 0-1000, into a 0-1 progress
      var p = layoutProgress.get() / progressTarget; // Tween the axis and update the visualElement with the latest values

      tweenAxis(frameTarget, origin, target, p);
      visualElement.setAxisTarget(axis, frameTarget.min, frameTarget.max); // If this is a crossfade animation, update both elements.

      crossfade === null || crossfade === void 0 ? void 0 : crossfade(p);
    }; // Synchronously run a frame to ensure there's no flash of the uncorrected bounding box.


    frame(); // Ensure that the layout delta is updated for this frame.

    visualElement.updateLayoutDelta(); // Create a function to stop animation on this specific axis

    var unsubscribeProgress = layoutProgress.onChange(frame); // Start the animation on this axis

    var animation = startAnimation(axis === "x" ? "layoutX" : "layoutY", layoutProgress, progressTarget, transition || this.props.transition || defaultTransition).then(unsubscribeProgress);

    this.stopAxisAnimation[axis] = function () {
      layoutProgress.stop();
      unsubscribeProgress();
    };

    return animation;
  };

  Animate.prototype.createCrossfadeAnimation = function (crossfadeOpacity) {
    var visualElement = this.props.visualElement;
    var opacity = visualElement.getValue("opacity", 0);
    return function (p) {
      opacity.set(easeCrossfadeIn(Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(0, 1, p)));
      crossfadeOpacity.set(easeCrossfadeOut(Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* mix */ "u"])(1, 0, p)));
    };
  };

  Animate.prototype.safeToRemove = function () {
    var _a, _b;

    (_b = (_a = this.props).safeToRemove) === null || _b === void 0 ? void 0 : _b.call(_a);
  };

  Animate.prototype.render = function () {
    return null;
  };

  return Animate;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

function AnimateLayoutContextProvider(props) {
  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(usePresence(), 2),
      safeToRemove = _a[1];

  return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(Animate, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, props, {
    safeToRemove: safeToRemove
  }));
}

function hasMoved(a, b) {
  return hasAxisMoved(a.x, b.x) || hasAxisMoved(a.y, b.y);
}

function hasAxisMoved(a, b) {
  return a.min !== b.min || a.max !== b.max;
}

var defaultTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};

function compress(min, max, easing) {
  return function (p) {
    // Could replace ifs with clamp
    if (p < min) return 0;
    if (p > max) return 1;
    return easing(Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* progress */ "w"])(min, max, p));
  };
}

var easeCrossfadeIn = compress(0, 0.5, popmotion__WEBPACK_IMPORTED_MODULE_2__[/* circOut */ "k"]);
var easeCrossfadeOut = compress(0.5, 0.95, popmotion__WEBPACK_IMPORTED_MODULE_2__[/* linear */ "t"]);
/**
 * @public
 */

var AnimateLayout = {
  key: "animate-layout",
  shouldRender: function shouldRender(props) {
    return !!props.layout || !!props.layoutId;
  },
  getComponent: function getComponent() {
    return AnimateLayoutContextProvider;
  }
};
/**
 * This component is responsible for scheduling the measuring of the motion component
 */

var Measure =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(Measure, _super);

  function Measure() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * If this is a child of a SyncContext, register the VisualElement with it on mount.
   */


  Measure.prototype.componentDidMount = function () {
    var _a = this.props,
        syncLayout = _a.syncLayout,
        visualElement = _a.visualElement;
    isSharedLayout(syncLayout) && syncLayout.register(visualElement);
  };
  /**
   * If this is a child of a SyncContext, notify it that it needs to re-render. It will then
   * handle the snapshotting.
   *
   * If it is stand-alone component, add it to the batcher.
   */


  Measure.prototype.getSnapshotBeforeUpdate = function () {
    var _a = this.props,
        syncLayout = _a.syncLayout,
        visualElement = _a.visualElement;

    if (isSharedLayout(syncLayout)) {
      syncLayout.syncUpdate();
    } else {
      visualElement.snapshotBoundingBox();
      syncLayout.add(visualElement);
    }

    return null;
  };

  Measure.prototype.componentDidUpdate = function () {
    var _a = this.props,
        syncLayout = _a.syncLayout,
        visualElement = _a.visualElement;
    if (!isSharedLayout(syncLayout)) syncLayout.flush();
    /**
     * If this axis isn't animating as a result of this render we want to reset the targetBox
     * to the measured box
     */

    visualElement.rebaseTargetBox();
  };

  Measure.prototype.render = function () {
    return null;
  };

  return Measure;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

function MeasureContextProvider(props) {
  var syncLayout = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(SharedLayoutContext);
  return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Measure, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, props, {
    syncLayout: syncLayout
  }));
}

var MeasureLayout = {
  key: "measure-layout",
  shouldRender: function shouldRender(props) {
    return !!props.drag || !!props.layout || !!props.layoutId;
  },
  getComponent: function getComponent() {
    return MeasureContextProvider;
  }
};
var allMotionFeatures = [MeasureLayout, Animation, Drag, Gestures, Exit, AnimateLayout];
var domBaseConfig = {
  useVisualElement: useDomVisualElement,
  render: render,
  animationControlsConfig: {
    makeTargetAnimatable: parseDomVariant
  }
};
/**
 * Convert any React component into a `motion` component. The provided component
 * **must** use `React.forwardRef` to the underlying DOM component you want to animate.
 *
 * ```jsx
 * const Component = React.forwardRef((props, ref) => {
 *   return <div ref={ref} />
 * })
 *
 * const MotionComponent = motion.custom(Component)
 * ```
 *
 * @public
 */

function createMotionProxy(defaultFeatures) {
  var config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, domBaseConfig), {
    defaultFeatures: defaultFeatures
  });

  function custom(Component) {
    return createMotionComponent(Component, config);
  }

  var componentCache = new Map();

  function get(target, key) {
    if (key === "custom") return target.custom;

    if (!componentCache.has(key)) {
      componentCache.set(key, createMotionComponent(key, config));
    }

    return componentCache.get(key);
  }

  return new Proxy({
    custom: custom
  }, {
    get: get
  });
}
/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */


var motion = /*@__PURE__*/createMotionProxy(allMotionFeatures);
/**
 * Create a DOM `motion` component with the provided string. This is primarily intended
 * as a full alternative to `motion` for consumers who have to support environments that don't
 * support `Proxy`.
 *
 * ```javascript
 * import { createDomMotionComponent } from "framer-motion"
 *
 * const motion = {
 *   div: createDomMotionComponent('div')
 * }
 * ```
 *
 * @public
 */

function createDomMotionComponent(key) {
  return createMotionComponent(key, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, domBaseConfig), {
    defaultFeatures: allMotionFeatures
  }));
}
/**
 * @public
 */


var m = /*@__PURE__*/createMotionProxy([MeasureLayout]);

function useForceUpdate() {
  var unloadingRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0), 2),
      forcedRenderCount = _a[0],
      setForcedRenderCount = _a[1];

  useUnmountEffect(function () {
    return unloadingRef.current = true;
  });
  return Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])(function () {
    !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
}

var presenceId = 0;

function getPresenceId() {
  var id = presenceId;
  presenceId++;
  return id;
}

var PresenceChild = function PresenceChild(_a) {
  var children = _a.children,
      initial = _a.initial,
      isPresent = _a.isPresent,
      _onExitComplete = _a.onExitComplete,
      custom = _a.custom,
      presenceAffectsLayout = _a.presenceAffectsLayout;
  var presenceChildren = useConstant(newChildrenMap);
  var id = useConstant(getPresenceId);
  var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    return {
      id: id,
      initial: initial,
      isPresent: isPresent,
      custom: custom,
      onExitComplete: function onExitComplete(childId) {
        presenceChildren.set(childId, true);
        var allComplete = true;
        presenceChildren.forEach(function (isComplete) {
          if (!isComplete) allComplete = false;
        });
        allComplete && (_onExitComplete === null || _onExitComplete === void 0 ? void 0 : _onExitComplete());
      },
      register: function register(childId) {
        presenceChildren.set(childId, false);
        return function () {
          return presenceChildren.delete(childId);
        };
      }
    };
  },
  /**
   * If the presence of a child affects the layout of the components around it,
   * we want to make a new context value to ensure they get re-rendered
   * so they can detect that layout change.
   */
  presenceAffectsLayout ? undefined : [isPresent]);
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    presenceChildren.forEach(function (_, key) {
      return presenceChildren.set(key, false);
    });
  }, [isPresent]);
  return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(PresenceContext.Provider, {
    value: context
  }, children);
};

function newChildrenMap() {
  return new Map();
}

function getChildKey(child) {
  return child.key || "";
}

function updateChildLookup(children, allChildren) {
  var seenChildren =  false ? undefined : null;
  children.forEach(function (child) {
    var key = getChildKey(child);

    if (false) {}

    allChildren.set(key, child);
  });
}

function onlyElements(children) {
  var filtered = []; // We use forEach here instead of map as map mutates the component key by preprending `.$`

  react__WEBPACK_IMPORTED_MODULE_5__["Children"].forEach(children, function (child) {
    if (Object(react__WEBPACK_IMPORTED_MODULE_5__["isValidElement"])(child)) filtered.push(child);
  });
  return filtered;
}
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * @library
 *
 * Any `Frame` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { Frame, AnimatePresence } from 'framer'
 *
 * // As items are added and removed from `items`
 * export function Items({ items }) {
 *   return (
 *     <AnimatePresence>
 *       {items.map(item => (
 *         <Frame
 *           key={item.id}
 *           initial={{ opacity: 0 }}
 *           animate={{ opacity: 1 }}
 *           exit={{ opacity: 0 }}
 *         />
 *       ))}
 *     </AnimatePresence>
 *   )
 * }
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * @motion
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */


var AnimatePresence = function AnimatePresence(_a) {
  var children = _a.children,
      custom = _a.custom,
      _b = _a.initial,
      initial = _b === void 0 ? true : _b,
      onExitComplete = _a.onExitComplete,
      exitBeforeEnter = _a.exitBeforeEnter,
      _c = _a.presenceAffectsLayout,
      presenceAffectsLayout = _c === void 0 ? true : _c; // We want to force a re-render once all exiting animations have finished. We
  // either use a local forceRender function, or one from a parent context if it exists.

  var forceRender = useForceUpdate();
  var layoutContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(SharedLayoutContext);

  if (isSharedLayout(layoutContext)) {
    forceRender = layoutContext.forceUpdate;
  }

  var isInitialRender = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(true); // Filter out any children that aren't ReactElements. We can only track ReactElements with a props.key

  var filteredChildren = onlyElements(children); // Keep a living record of the children we're actually rendering so we
  // can diff to figure out which are entering and exiting

  var presentChildren = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(filteredChildren); // A lookup table to quickly reference components by key

  var allChildren = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(new Map()).current; // A living record of all currently exiting components.

  var exiting = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(new Set()).current;
  updateChildLookup(filteredChildren, allChildren); // If this is the initial component render, just deal with logic surrounding whether
  // we play onMount animations or not.

  if (isInitialRender.current) {
    isInitialRender.current = false;
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null, filteredChildren.map(function (child) {
      return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(PresenceChild, {
        key: getChildKey(child),
        isPresent: true,
        initial: initial ? undefined : false,
        presenceAffectsLayout: presenceAffectsLayout
      }, child);
    }));
  } // If this is a subsequent render, deal with entering and exiting children


  var childrenToRender = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spread */ "e"])(filteredChildren); // Diff the keys of the currently-present and target children to update our
  // exiting list.


  var presentKeys = presentChildren.current.map(getChildKey);
  var targetKeys = filteredChildren.map(getChildKey); // Diff the present children with our target children and mark those that are exiting

  var numPresent = presentKeys.length;

  for (var i = 0; i < numPresent; i++) {
    var key = presentKeys[i];

    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    } else {
      // In case this key has re-entered, remove from the exiting list
      exiting.delete(key);
    }
  } // If we currently have exiting children, and we're deferring rendering incoming children
  // until after all current children have exiting, empty the childrenToRender array


  if (exitBeforeEnter && exiting.size) {
    childrenToRender = [];
  } // Loop through all currently exiting components and clone them to overwrite `animate`
  // with any `exit` prop they might have defined.


  exiting.forEach(function (key) {
    // If this component is actually entering again, early return
    if (targetKeys.indexOf(key) !== -1) return;
    var child = allChildren.get(key);
    if (!child) return;
    var insertionIndex = presentKeys.indexOf(key);

    var onExit = function onExit() {
      allChildren.delete(key);
      exiting.delete(key); // Remove this child from the present children

      var removeIndex = presentChildren.current.findIndex(function (presentChild) {
        return presentChild.key === key;
      });
      presentChildren.current.splice(removeIndex, 1); // Defer re-rendering until all exiting children have indeed left

      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        forceRender();
        onExitComplete && onExitComplete();
      }
    };

    childrenToRender.splice(insertionIndex, 0, Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(PresenceChild, {
      key: getChildKey(child),
      isPresent: false,
      onExitComplete: onExit,
      custom: custom,
      presenceAffectsLayout: presenceAffectsLayout
    }, child));
  }); // Add `MotionContext` even to children that don't need it to ensure we're rendering
  // the same tree between renders

  childrenToRender = childrenToRender.map(function (child) {
    var key = child.key;
    return exiting.has(key) ? child : Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(PresenceChild, {
      key: getChildKey(child),
      isPresent: true,
      presenceAffectsLayout: presenceAffectsLayout
    }, child);
  });
  presentChildren.current = childrenToRender;

  if (false) {}

  return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null, exiting.size ? childrenToRender : childrenToRender.map(function (child) {
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["cloneElement"])(child);
  }));
};

function createSwitchAnimation(child, stack) {
  if (stack && child !== stack.lead) {
    return {
      visibilityAction: VisibilityAction.Hide
    };
  } else if (stack && child.presence !== Presence.Entering && child === stack.lead && stack.lead !== stack.prevLead) {
    return {
      visibilityAction: VisibilityAction.Show
    };
  }

  var originBox;
  var targetBox;

  if (child.presence === Presence.Entering) {
    originBox = stack === null || stack === void 0 ? void 0 : stack.getFollowOrigin();
  } else if (child.presence === Presence.Exiting) {
    targetBox = stack === null || stack === void 0 ? void 0 : stack.getFollowTarget();
  }

  return {
    originBox: originBox,
    targetBox: targetBox
  };
}

function createCrossfadeAnimation(child, stack) {
  var _a, _b, _c;

  var config = {};
  var stackLead = stack && stack.lead;
  var stackLeadPresence = stackLead === null || stackLead === void 0 ? void 0 : stackLead.presence;

  if (stack && child === stackLead) {
    if (child.presence === Presence.Entering) {
      config.originBox = stack.getFollowOrigin();
    } else if (child.presence === Presence.Exiting) {
      config.targetBox = stack.getFollowTarget();
    }
  } else if (stack && child === stack.follow) {
    config.transition = stack.getLeadTransition();

    if (stackLeadPresence === Presence.Entering) {
      config.targetBox = stack.getLeadTarget();
    } else if (stackLeadPresence === Presence.Exiting) {
      config.originBox = stack.getLeadOrigin();
    }
  } // If neither the lead or follow component is the root child of AnimatePresence,
  // don't handle crossfade animations


  if (!((_a = stack === null || stack === void 0 ? void 0 : stack.follow) === null || _a === void 0 ? void 0 : _a.isPresenceRoot) && !(stackLead === null || stackLead === void 0 ? void 0 : stackLead.isPresenceRoot)) {
    return config;
  }

  if (!stack || child === stackLead) {
    if (child.presence === Presence.Entering) {
      config.crossfadeOpacity = (_b = stack === null || stack === void 0 ? void 0 : stack.follow) === null || _b === void 0 ? void 0 : _b.getValue("opacity", 0);
    }
  } else if (stack && child === stack.follow) {
    if (!stackLead || stackLeadPresence === Presence.Entering) ;else if (stackLeadPresence === Presence.Exiting) {
      config.crossfadeOpacity = (_c = stack === null || stack === void 0 ? void 0 : stack.lead) === null || _c === void 0 ? void 0 : _c.getValue("opacity", 1);
    }
  } else {
    config.visibilityAction = VisibilityAction.Hide;
  }

  return config;
}
/**
 * For each layout animation, we want to identify two components
 * within a stack that will serve as the "lead" and "follow" components.
 *
 * In the switch animation, the lead component performs the entire animation.
 * It uses the follow bounding box to animate out from and back to. The follow
 * component is hidden.
 *
 * In the crossfade animation, both the lead and follow components perform
 * the entire animation, animating from the follow origin bounding box to the lead
 * target bounding box.
 *
 * Generalising a stack as First In Last Out, *searching from the end* we can
 * generally consider the lead component to be:
 *  - If the last child is present, the last child
 *  - If the last child is exiting, the last *encountered* exiting component
 */


function findLeadAndFollow(stack, _a) {
  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(_a, 2),
      prevLead = _b[0],
      prevFollow = _b[1];

  var lead = undefined;
  var leadIndex = 0;
  var follow = undefined; // Find the lead child first

  var numInStack = stack.length;
  var lastIsPresent = false;

  for (var i = numInStack - 1; i >= 0; i--) {
    var child = stack[i];
    var isLastInStack = i === numInStack - 1;
    if (isLastInStack) lastIsPresent = child.isPresent;

    if (lastIsPresent) {
      lead = child;
    } else {
      // If the child before this will be present, make this the
      // lead.
      var prev = stack[i - 1];
      if (prev && prev.isPresent) lead = child;
    }

    if (lead) {
      leadIndex = i;
      break;
    }
  }

  if (!lead) lead = stack[0]; // Find the follow child

  follow = stack[leadIndex - 1]; // If the lead component is exiting, find the closest follow
  // present component

  if (lead) {
    for (var i = leadIndex - 1; i >= 0; i--) {
      var child = stack[i];

      if (child.isPresent) {
        follow = child;
        break;
      }
    }
  } // If the lead has changed and the previous lead still exists in the
  // stack, set it to the previous lead. This allows us to differentiate between
  // a, b, c(exit) -> a, b(exit), c(exit)
  // and
  // a, b(exit), c -> a, b(exit), c(exit)


  if (lead !== prevLead && !lastIsPresent && follow === prevFollow && stack.find(function (stackChild) {
    return stackChild === prevLead;
  })) {
    lead = prevLead;
  }

  return [lead, follow];
}

var LayoutStack =
/** @class */
function () {
  function LayoutStack() {
    this.order = []; // Track whether we've ever had a child

    this.hasChildren = false;
  }

  LayoutStack.prototype.add = function (child) {
    var _a;

    this.order.push(child); // Load previous values from snapshot into this child
    // TODO Neaten up
    // TODO Double check when reimplementing move
    // TODO Add isDragging status and

    if (this.snapshot) {
      child.prevSnapshot = this.snapshot; // TODO Remove in favour of above

      child.prevViewportBox = this.snapshot.boundingBox;
      var latest = this.snapshot.latestMotionValues;

      for (var key in latest) {
        if (!child.hasValue(key)) {
          child.addValue(key, motionValue(latest[key]));
        } else {
          (_a = child.getValue(key)) === null || _a === void 0 ? void 0 : _a.set(latest[key]);
        }
      }
    }

    this.hasChildren = true;
  };

  LayoutStack.prototype.remove = function (child) {
    var index = this.order.findIndex(function (stackChild) {
      return child === stackChild;
    });
    if (index !== -1) this.order.splice(index, 1);
  };

  LayoutStack.prototype.updateLeadAndFollow = function () {
    this.prevLead = this.lead;
    this.prevFollow = this.follow;

    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(findLeadAndFollow(this.order, [this.lead, this.follow]), 2),
        lead = _a[0],
        follow = _a[1];

    this.lead = lead;
    this.follow = follow;
  };

  LayoutStack.prototype.updateSnapshot = function () {
    if (!this.lead) return;
    var snapshot = {
      boundingBox: this.lead.prevViewportBox,
      latestMotionValues: {}
    };
    this.lead.forEachValue(function (value, key) {
      var latest = value.get();

      if (!isTransformProp(latest)) {
        snapshot.latestMotionValues[key] = latest;
      }
    });
    var dragControls = elementDragControls.get(this.lead);

    if (dragControls && dragControls.isDragging) {
      snapshot.isDragging = true;
      snapshot.cursorProgress = dragControls.cursorProgress;
    }

    this.snapshot = snapshot;
  };

  LayoutStack.prototype.isLeadPresent = function () {
    var _a;

    return this.lead && ((_a = this.lead) === null || _a === void 0 ? void 0 : _a.presence) !== Presence.Exiting;
  };

  LayoutStack.prototype.getFollowOrigin = function () {
    var _a;

    return this.follow ? this.follow.prevViewportBox : (_a = this.snapshot) === null || _a === void 0 ? void 0 : _a.boundingBox;
  };

  LayoutStack.prototype.getFollowTarget = function () {
    var _a;

    return (_a = this.follow) === null || _a === void 0 ? void 0 : _a.box;
  };

  LayoutStack.prototype.getLeadOrigin = function () {
    var _a;

    return (_a = this.lead) === null || _a === void 0 ? void 0 : _a.prevViewportBox;
  };

  LayoutStack.prototype.getLeadTarget = function () {
    var _a;

    return (_a = this.lead) === null || _a === void 0 ? void 0 : _a.box;
  };

  LayoutStack.prototype.getLeadTransition = function () {
    var _a;

    return (_a = this.lead) === null || _a === void 0 ? void 0 : _a.config.transition;
  };

  return LayoutStack;
}();
/**
 * @public
 */


var AnimateSharedLayout =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(AnimateSharedLayout, _super);

  function AnimateSharedLayout() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * A list of all the children in the shared layout
     */


    _this.children = new Set();
    /**
     * As animate components with a defined `layoutId` are added/removed to the tree,
     * we store them in order. When one is added, it will animate out from the
     * previous one, and when it's removed, it'll animate to the previous one.
     */

    _this.stacks = new Map();
    /**
     * Track whether the component has mounted. If it hasn't, the presence of added children
     * are set to Present, whereas if it has they're considered Entering
     */

    _this.hasMounted = false;
    /**
     * Track whether we already have an update scheduled. If we don't, we'll run snapshots
     * and schedule one.
     */

    _this.updateScheduled = false;
    /**
     * Tracks whether we already have a render scheduled. If we don't, we'll force one with this.forceRender
     */

    _this.renderScheduled = false;
    /**
     * The methods provided to all children in the shared layout tree.
     */

    _this.syncContext = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, createBatcher()), {
      syncUpdate: function syncUpdate(force) {
        return _this.scheduleUpdate(force);
      },
      forceUpdate: function forceUpdate() {
        // By copying syncContext to itself, when this component re-renders it'll also re-render
        // all children subscribed to the SharedLayout context.
        _this.syncContext = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, _this.syncContext);

        _this.scheduleUpdate(true);
      },
      register: function register(child) {
        return _this.addChild(child);
      },
      remove: function remove(child) {
        return _this.removeChild(child);
      }
    });
    return _this;
  }

  AnimateSharedLayout.prototype.componentDidMount = function () {
    this.hasMounted = true;
    this.updateStacks();
  };

  AnimateSharedLayout.prototype.componentDidUpdate = function () {
    this.startLayoutAnimation();
  };

  AnimateSharedLayout.prototype.shouldComponentUpdate = function () {
    this.renderScheduled = true;
    return true;
  };

  AnimateSharedLayout.prototype.startLayoutAnimation = function () {
    var _this = this;
    /**
     * Reset update and render scheduled status
     */


    this.renderScheduled = this.updateScheduled = false;
    var type = this.props.type;
    /**
     * Update presence metadata based on the latest AnimatePresence status.
     * This is a kind of goofy way of dealing with this, perhaps there's a better model to find.
     */

    this.children.forEach(function (child) {
      if (!child.isPresent) {
        child.presence = Presence.Exiting;
      } else if (child.presence !== Presence.Entering) {
        child.presence = child.presence === Presence.Exiting ? Presence.Entering : Presence.Present;
      }
    });
    /**
     * In every layoutId stack, nominate a component to lead the animation and another
     * to follow
     */

    this.updateStacks();
    /**
     * Decide which animation to use between shared layoutId components
     */

    var createAnimation = type === "crossfade" ? createCrossfadeAnimation : createSwitchAnimation;
    /**
     * Create a handler which we can use to flush the children animations
     */

    var handler = {
      measureLayout: function measureLayout(child) {
        return child.measureLayout();
      },
      layoutReady: function layoutReady(child) {
        var layoutId = child.layoutId;
        child.layoutReady(createAnimation(child, _this.getStack(layoutId)));
      }
    };
    /**
     * Shared layout animations can be used without the AnimateSharedLayout wrapping component.
     * This requires some co-ordination across components to stop layout thrashing
     * and ensure measurements are taken at the correct time.
     *
     * Here we use that same mechanism of schedule/flush.
     */

    this.children.forEach(function (child) {
      return _this.syncContext.add(child);
    });
    this.syncContext.flush(handler);
    /**
     * Clear snapshots so subsequent rerenders don't retain memory of outgoing components
     */

    this.stacks.forEach(function (stack) {
      return stack.snapshot = undefined;
    });
  };

  AnimateSharedLayout.prototype.updateStacks = function () {
    this.stacks.forEach(function (stack) {
      return stack.updateLeadAndFollow();
    });
  };

  AnimateSharedLayout.prototype.scheduleUpdate = function (force) {
    if (force === void 0) {
      force = false;
    }

    if (!(force || !this.updateScheduled)) return;
    /**
     * Flag we've scheduled an update
     */

    this.updateScheduled = true;
    /**
     * Read: Snapshot children
     */

    this.children.forEach(function (child) {
      return child.snapshotBoundingBox();
    });
    /**
     * Every child keeps a local snapshot, but we also want to record
     * snapshots of the visible children as, if they're are being removed
     * in this render, we can still access them.
     */

    this.stacks.forEach(function (stack) {
      return stack.updateSnapshot();
    });
    /**
     * Force a rerender by setting state if we aren't already going to render.
     */

    if (force || !this.renderScheduled) {
      this.renderScheduled = true;
      this.forceUpdate();
    }
  };

  AnimateSharedLayout.prototype.addChild = function (child) {
    this.children.add(child);
    this.addToStack(child);
    child.presence = this.hasMounted ? Presence.Entering : Presence.Present;
  };

  AnimateSharedLayout.prototype.removeChild = function (child) {
    this.scheduleUpdate();
    this.children.delete(child);
    this.removeFromStack(child);
  };

  AnimateSharedLayout.prototype.addToStack = function (child) {
    var stack = this.getStack(child.layoutId);
    stack === null || stack === void 0 ? void 0 : stack.add(child);
  };

  AnimateSharedLayout.prototype.removeFromStack = function (child) {
    var stack = this.getStack(child.layoutId);
    stack === null || stack === void 0 ? void 0 : stack.remove(child);
  };
  /**
   * Return a stack of animate children based on the provided layoutId.
   * Will create a stack if none currently exists with that layoutId.
   */


  AnimateSharedLayout.prototype.getStack = function (id) {
    if (id === undefined) return; // Create stack if it doesn't already exist

    !this.stacks.has(id) && this.stacks.set(id, new LayoutStack());
    return this.stacks.get(id);
  };

  AnimateSharedLayout.prototype.render = function () {
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(SharedLayoutContext.Provider, {
      value: this.syncContext
    }, this.props.children);
  };

  return AnimateSharedLayout;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
/**
 * Creates a `MotionValue` to track the state and velocity of a value.
 *
 * Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
 *
 * @library
 *
 * ```jsx
 * export function MyComponent() {
 *   const scale = useMotionValue(1)
 *
 *   return <Frame scale={scale} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const scale = useMotionValue(1)
 *
 *   return <motion.div style={{ scale }} />
 * }
 * ```
 *
 * @param initial - The initial state.
 *
 * @public
 */


function useMotionValue(initial) {
  return useConstant(function () {
    return motionValue(initial);
  });
}

function useOnChange(value, callback) {
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return isMotionValue(value) ? value.onChange(callback) : undefined;
  });
}

function useMultiOnChange(values, handler) {
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    var subscriptions = values.map(function (value) {
      return value.onChange(handler);
    });
    return function () {
      return subscriptions.forEach(function (unsubscribe) {
        return unsubscribe();
      });
    };
  });
}

function useCombineMotionValues(values, combineValues) {
  /**
   * Initialise the returned motion value. This remains the same between renders.
   */
  var value = useMotionValue(combineValues());
  /**
   * Create a function that will update the template motion value with the latest values.
   * This is pre-bound so whenever a motion value updates it can schedule its
   * execution in Framesync. If it's already been scheduled it won't be fired twice
   * in a single frame.
   */

  var updateValue = function updateValue() {
    return value.set(combineValues());
  };
  /**
   * Synchronously update the motion value with the latest values during the render.
   * This ensures that within a React render, the styles applied to the DOM are up-to-date.
   */


  updateValue();
  /**
   * Subscribe to all motion values found within the template. Whenever any of them change,
   * schedule an update.
   */

  useMultiOnChange(values, function () {
    return framesync__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].update(updateValue, false, true);
  });
  return value;
}
/**
 * Combine multiple motion values into a new one using a string template literal.
 *
 * ```jsx
 * import {
 *   motion,
 *   useSpring,
 *   useMotionValue,
 *   useMotionTemplate
 * } from "framer-motion"
 *
 * function Component() {
 *   const shadowX = useSpring(0)
 *   const shadowY = useMotionValue(0)
 *   const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
 *
 *   return <motion.div style={{ filter: shadow }} />
 * }
 * ```
 *
 * @public
 */


function useMotionTemplate(fragments) {
  var values = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    values[_i - 1] = arguments[_i];
  }
  /**
   * Create a function that will build a string from the latest motion values.
   */


  var numFragments = fragments.length;

  function buildValue() {
    var output = "";

    for (var i = 0; i < numFragments; i++) {
      output += fragments[i];
      var value = values[i];
      if (value) output += values[i].get();
    }

    return output;
  }

  return useCombineMotionValues(values, buildValue);
}
/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 *
 * @internal
 */


function resolveMotionValue(value) {
  var unwrappedValue = value instanceof MotionValue ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

var isCustomValueType = function isCustomValueType(v) {
  return typeof v === "object" && v.mix;
};

var getMixer = function getMixer(v) {
  return isCustomValueType(v) ? v.mix : undefined;
};

function transform() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var useImmediate = !Array.isArray(args[0]);
  var argOffset = useImmediate ? 0 : -1;
  var inputValue = args[0 + argOffset];
  var inputRange = args[1 + argOffset];
  var outputRange = args[2 + argOffset];
  var options = args[3 + argOffset];
  var interpolator = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* interpolate */ "s"])(inputRange, outputRange, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
    mixer: getMixer(outputRange[0])
  }, options));
  return useImmediate ? interpolator(inputValue) : interpolator;
}

function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  var transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], function (_a) {
    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(_a, 1),
        latest = _b[0];

    return transformer(latest);
  });
}

function useListTransform(values, transformer) {
  var latest = useConstant(function () {
    return [];
  });
  return useCombineMotionValues(values, function () {
    latest.length = 0;
    var numValues = values.length;

    for (var i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }

    return transformer(latest);
  });
} // Keep things reasonable and avoid scale: Infinity. In practise we might need
// to add another value, opacity, that could interpolate scaleX/Y [0,0.01] => [0,1]
// to simply hide content at unreasonable scales.


var maxScale = 100000;

var invertScale = function invertScale(scale) {
  return scale > 0.001 ? 1 / scale : maxScale;
};
/**
 * Returns a `MotionValue` each for `scaleX` and `scaleY` that update with the inverse
 * of their respective parent scales.
 *
 * This is useful for undoing the distortion of content when scaling a parent component.
 *
 * By default, `useInvertedScale` will automatically fetch `scaleX` and `scaleY` from the nearest parent.
 * By passing other `MotionValue`s in as `useInvertedScale({ scaleX, scaleY })`, it will invert the output
 * of those instead.
 *
 * @motion
 *
 * ```jsx
 * const MyComponent = () => {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <motion.div style={{ scaleX, scaleY }} />
 * }
 * ```
 *
 * @library
 *
 * ```jsx
 * function MyComponent() {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <Frame scaleX={scaleX} scaleY={scaleY} />
 * }
 * ```
 *
 * @deprecated
 */


var hasWarned = false;

function useInvertedScale(scale) {
  var parentScaleX = useMotionValue(1);
  var parentScaleY = useMotionValue(1);
  var visualElement = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionContext).visualElement;
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(!!(scale || visualElement), "If no scale values are provided, useInvertedScale must be used within a child of another motion component.");
  Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* warning */ "b"])(hasWarned, "useInvertedScale is deprecated and will be removed in 3.0. Use the layout prop instead.");
  hasWarned = true;

  if (scale) {
    parentScaleX = scale.scaleX || parentScaleX;
    parentScaleY = scale.scaleY || parentScaleY;
  } else if (visualElement) {
    parentScaleX = visualElement.getValue("scaleX", 1);
    parentScaleY = visualElement.getValue("scaleY", 1);
  }

  var scaleX = useTransform(parentScaleX, invertScale);
  var scaleY = useTransform(parentScaleY, invertScale);
  return {
    scaleX: scaleX,
    scaleY: scaleY
  };
}
/**
 * Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
 *
 * It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
 * to another `MotionValue`.
 *
 * @remarks
 *
 * ```jsx
 * const x = useSpring(0, { stiffness: 300 })
 * const y = useSpring(x, { damping: 10 })
 * ```
 *
 * @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
 * @param springConfig - Configuration options for the spring.
 * @returns `MotionValue`
 *
 * @public
 */


function useSpring(source, config) {
  if (config === void 0) {
    config = {};
  }

  var activeSpringAnimation = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
  var value = useMotionValue(isMotionValue(source) ? source.get() : source);
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    return value.attach(function (v, set) {
      if (activeSpringAnimation.current) {
        activeSpringAnimation.current.stop();
      }

      activeSpringAnimation.current = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* animate */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
        from: value.get(),
        to: v,
        velocity: value.getVelocity()
      }, config), {
        onUpdate: set
      }));
      return value.get();
    });
  }, Object.values(config));
  useOnChange(source, function (v) {
    return value.set(parseFloat(v));
  });
  return value;
}

function createScrollMotionValues() {
  return {
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0)
  };
}

function setProgress(offset, maxOffset, value) {
  value.set(!offset || !maxOffset ? 0 : offset / maxOffset);
}

function createScrollUpdater(values, getOffsets) {
  var update = function update() {
    var _a = getOffsets(),
        xOffset = _a.xOffset,
        yOffset = _a.yOffset,
        xMaxOffset = _a.xMaxOffset,
        yMaxOffset = _a.yMaxOffset; // Set absolute positions


    values.scrollX.set(xOffset);
    values.scrollY.set(yOffset); // Set 0-1 progress

    setProgress(xOffset, xMaxOffset, values.scrollXProgress);
    setProgress(yOffset, yMaxOffset, values.scrollYProgress);
  };

  update();
  return update;
}

var getElementScrollOffsets = function getElementScrollOffsets(element) {
  return function () {
    return {
      xOffset: element.scrollLeft,
      yOffset: element.scrollTop,
      xMaxOffset: element.scrollWidth - element.offsetWidth,
      yMaxOffset: element.scrollHeight - element.offsetHeight
    };
  };
};
/**
 * Returns MotionValues that update when the provided element scrolls:
 *
 * - `scrollX` — Horizontal scroll distance in pixels.
 * - `scrollY` — Vertical scroll distance in pixels.
 * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
 * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
 *
 * This element must be set to `overflow: scroll` on either or both axes to report scroll offset.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import {
 *   Frame,
 *   useElementScroll,
 *   useTransform
 * } from "framer"
 *
 * export function MyComponent() {
 *   const ref = React.useRef()
 *   const { scrollYProgress } = useElementScroll(ref)
 *
 *   return (
 *     <Frame ref={ref}>
 *       <Frame scaleX={scrollYProgress} />
 *     </Frame>
 *   )
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const ref = useRef()
 *   const { scrollYProgress } = useElementScroll(ref)
 *
 *   return (
 *     <div ref={ref}>
 *       <motion.div style={{ scaleX: scrollYProgress }} />
 *     </div>
 *   )
 * }
 * ```
 *
 * @public
 */


function useElementScroll(ref) {
  var values = useConstant(createScrollMotionValues);
  useIsomorphicLayoutEffect(function () {
    var element = ref.current;
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* invariant */ "a"])(!!element, "ref provided to useScroll must be passed into a HTML element.");
    if (!element) return;
    var updateScrollValues = createScrollUpdater(values, getElementScrollOffsets(element));
    var scrollListener = addDomEvent(element, "scroll", updateScrollValues, {
      passive: true
    });
    var resizeListener = addDomEvent(element, "resize", updateScrollValues);
    return function () {
      scrollListener && scrollListener();
      resizeListener && resizeListener();
    };
  }, []);
  return values;
}

var viewportScrollValues = createScrollMotionValues();

function getViewportScrollOffsets() {
  return {
    xOffset: window.pageXOffset,
    yOffset: window.pageYOffset,
    xMaxOffset: document.body.clientWidth - window.innerWidth,
    yMaxOffset: document.body.clientHeight - window.innerHeight
  };
}

var hasListeners = false;

function addEventListeners() {
  hasListeners = true;
  if (typeof window === "undefined") return;
  var updateScrollValues = createScrollUpdater(viewportScrollValues, getViewportScrollOffsets);
  addDomEvent(window, "scroll", updateScrollValues, {
    passive: true
  });
  addDomEvent(window, "resize", updateScrollValues);
}
/**
 * Returns MotionValues that update when the viewport scrolls:
 *
 * - `scrollX` — Horizontal scroll distance in pixels.
 * - `scrollY` — Vertical scroll distance in pixels.
 * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
 * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import {
 *   Frame,
 *   useViewportScroll,
 *   useTransform
 * } from "framer"
 *
 * export function MyComponent() {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <Frame scaleX={scrollYProgress} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <motion.div style={{ scaleX: scrollYProgress }} />
 * }
 * ```
 *
 * @public
 */


function useViewportScroll() {
  useIsomorphicLayoutEffect(function () {
    !hasListeners && addEventListeners();
  }, []);
  return viewportScrollValues;
} // Does this device prefer reduced motion? Returns `null` server-side.


var prefersReducedMotion = motionValue(null);

if (typeof window !== "undefined") {
  if (window.matchMedia) {
    var motionMediaQuery_1 = window.matchMedia("(prefers-reduced-motion)");

    var setReducedMotionPreferences = function setReducedMotionPreferences() {
      return prefersReducedMotion.set(motionMediaQuery_1.matches);
    };

    motionMediaQuery_1.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.set(false);
  }
}

function determineShouldReduceMotion(prefersReduced, isReducedMotion) {
  return typeof isReducedMotion === "boolean" ? isReducedMotion : Boolean(prefersReduced);
}
/**
 * A hook that returns `true` if we should be using reduced motion based on the current device's Reduced Motion setting.
 *
 * This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing motion-sickness inducing
 * `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.
 *
 * It will actively respond to changes and re-render your components with the latest setting.
 *
 * ```jsx
 * export function Sidebar({ isOpen }) {
 *   const shouldReduceMotion = useReducedMotion()
 *   const closedX = shouldReduceMotion ? 0 : "-100%"
 *
 *   return (
 *     <motion.div animate={{
 *       opacity: isOpen ? 1 : 0,
 *       x: isOpen ? 0 : closedX
 *     }} />
 *   )
 * }
 * ```
 *
 * @return boolean
 *
 * @public
 */


function useReducedMotion() {
  var isReducedMotion = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionContext).isReducedMotion;

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(determineShouldReduceMotion(prefersReducedMotion.get(), isReducedMotion)), 2),
      shouldReduceMotion = _a[0],
      setShouldReduceMotion = _a[1];

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return prefersReducedMotion.onChange(function (v) {
      setShouldReduceMotion(determineShouldReduceMotion(v, isReducedMotion));
    });
  }, [setShouldReduceMotion, isReducedMotion]);
  return shouldReduceMotion;
}
/**
 * Define accessibility options for a tree. Can be used to force the tree into Reduced Motion mode,
 * or disable device detection.
 *
 * @internal
 */


function ReducedMotion(_a) {
  var children = _a.children,
      enabled = _a.enabled;
  var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionContext);
  context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, context), {
      isReducedMotion: enabled
    });
  }, [enabled]);
  return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(MotionContext.Provider, {
    value: context
  }, children);
}
/**
 * Creates `AnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `AnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * @library
 *
 * ```jsx
 * import * as React from 'react'
 * import { Frame, useAnimation } from 'framer'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <Frame animate={controls} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * import * as React from 'react'
 * import { motion, useAnimation } from 'framer-motion'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <motion.div animate={controls} />
 * }
 * ```
 *
 * @returns Animation controller with `start` and `stop` methods
 *
 * @public
 */


function useAnimation() {
  var animationControls = useConstant(function () {
    return new AnimationControls();
  });
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    animationControls.mount();
    return function () {
      return animationControls.unmount();
    };
  }, []);
  return animationControls;
}
/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It works similar to `useState` in React. It is provided an initial array of possible states, and returns an array of two arguments.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, useCycle } from "framer"
 *
 * export function MyComponent() {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <Frame
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @motion
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * import * as React from "react"
 * import { motion, useCycle } from "framer-motion"
 *
 * export const MyComponent = () => {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @param items - items to cycle through
 * @returns [currentState, cycleState]
 *
 * @public
 */


function useCycle() {
  var items = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    items[_i] = arguments[_i];
  } // TODO: After Framer X beta, remove this warning


  Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__[/* warning */ "b"])(items.length > 1, "useCycle syntax has changed. `useCycle([0, 1, 2])` becomes `useCycle(0, 1, 2)`");
  var index = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(0);

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(items[index.current]), 2),
      item = _a[0],
      setItem = _a[1];

  return [item, function (next) {
    index.current = typeof next !== "number" ? Object(popmotion__WEBPACK_IMPORTED_MODULE_2__[/* wrap */ "y"])(0, items.length, index.current + 1) : next;
    setItem(items[index.current]);
  }];
}
/**
 * Can manually trigger a drag gesture on one or more `drag`-enabled `motion` components.
 *
 * @library
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <Frame onTapStart={startDrag} />
 *     <Frame drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @motion
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */


var DragControls =
/** @class */
function () {
  function DragControls() {
    this.componentControls = new Set();
  }
  /**
   * Subscribe a component's internal `VisualElementDragControls` to the user-facing API.
   *
   * @internal
   */


  DragControls.prototype.subscribe = function (controls) {
    var _this = this;

    this.componentControls.add(controls);
    return function () {
      return _this.componentControls.delete(controls);
    };
  };
  /**
   * Start a drag gesture on every `motion` component that has this set of drag controls
   * passed into it via the `dragControls` prop.
   *
   * ```jsx
   * dragControls.start(e, {
   *   snapToCursor: true
   * })
   * ```
   *
   * @param event - PointerEvent
   * @param options - Options
   *
   * @public
   */


  DragControls.prototype.start = function (event, options) {
    this.componentControls.forEach(function (controls) {
      controls.start(event.nativeEvent || event, options);
    });
  };

  return DragControls;
}();

var createDragControls = function createDragControls() {
  return new DragControls();
};
/**
 * Usually, dragging is initiated by pressing down on a `motion` component with a `drag` prop
 * and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we
 * might want to initiate that dragging from a different component than the draggable one.
 *
 * By creating a `dragControls` using the `useDragControls` hook, we can pass this into
 * the draggable component's `dragControls` prop. It exposes a `start` method
 * that can start dragging from pointer events on other components.
 *
 * @library
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <Frame onTapStart={startDrag} />
 *     <Frame drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @motion
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */


function useDragControls() {
  return useConstant(createDragControls);
}
/**
 * Uses the ref that is passed in, or creates a new one
 * @param external - External ref
 * @internal
 */


function useExternalRef(externalRef) {
  // We're conditionally calling `useRef` here which is sort of naughty as hooks
  // shouldn't be called conditionally. However, Framer Motion will break if this
  // condition changes anyway. It might be possible to use an invariant here to
  // make it explicit, but I expect changing `ref` is not normal behaviour.
  var ref = !externalRef || typeof externalRef === "function" ? Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null) : externalRef; // Handle `ref` functions. Again, calling the hook conditionally is kind of naughty
  // but `ref` types changing between renders would break Motion anyway. If we receive
  // bug reports about this, we should track the provided ref and throw an invariant
  // rather than move the conditional to inside the useEffect as this will be fired
  // for every Frame component within Framer.

  if (externalRef && typeof externalRef === "function") {
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
      externalRef(ref.current);
      return function () {
        return externalRef(null);
      };
    }, []);
  }

  return ref;
}
/**
 * This is just a very basic VisualElement, more of a hack to keep supporting useAnimatedState with
 * the latest APIs.
 */


var StateVisualElement =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(StateVisualElement, _super);

  function StateVisualElement() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.initialState = {};
    return _this;
  }

  StateVisualElement.prototype.updateLayoutDelta = function () {};

  StateVisualElement.prototype.build = function () {};

  StateVisualElement.prototype.clean = function () {};

  StateVisualElement.prototype.getBoundingBox = function () {
    return {
      x: {
        min: 0,
        max: 0
      },
      y: {
        min: 0,
        max: 0
      }
    };
  };

  StateVisualElement.prototype.readNativeValue = function (key) {
    return this.initialState[key] || 0;
  };

  StateVisualElement.prototype.render = function () {
    this.build();
  };

  return StateVisualElement;
}(VisualElement);
/**
 * This is not an officially supported API and may be removed
 * on any version.
 * @internal
 */


function useAnimatedState(initialState) {
  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __read */ "c"])(Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(initialState), 2),
      animationState = _a[0],
      setAnimationState = _a[1];

  var visualElement = useConstant(function () {
    return new StateVisualElement();
  });
  visualElement.updateConfig({
    onUpdate: function onUpdate(v) {
      return setAnimationState(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, v));
    }
  });
  visualElement.initialState = initialState;
  var controls = useVisualElementAnimation(visualElement, {}, {}, false);
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    visualElement.mount({});
    return function () {
      return visualElement.unmount();
    };
  }, []);
  var startAnimation = useConstant(function () {
    return function (animationDefinition) {
      return controls.start(animationDefinition);
    };
  });
  return [animationState, startAnimation];
}



/***/ })

}]);
//# sourceMappingURL=05d954cf-3d069a12d053958622a5.js.map