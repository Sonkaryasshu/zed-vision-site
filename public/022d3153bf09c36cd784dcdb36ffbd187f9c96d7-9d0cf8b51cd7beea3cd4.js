(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "00yV":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var t = Object.getOwnPropertySymbols,
    e = Object.prototype.hasOwnProperty,
    r = Object.prototype.propertyIsEnumerable;

var n,
    o,
    i = function () {
  try {
    if (!Object.assign) return !1;
    var t = new String("abc");
    if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;

    for (var e = {}, r = 0; r < 10; r++) {
      e["_" + String.fromCharCode(r)] = r;
    }

    if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
      return e[t];
    }).join("")) return !1;
    var n = {};
    return "abcdefghijklmnopqrst".split("").forEach(function (t) {
      n[t] = t;
    }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("");
  } catch (t) {
    return !1;
  }
}() ? Object.assign : function (n, o) {
  for (var i, a, u = function (t) {
    if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(t);
  }(n), c = 1; c < arguments.length; c++) {
    for (var l in i = Object(arguments[c])) {
      e.call(i, l) && (u[l] = i[l]);
    }

    if (t) {
      a = t(i);

      for (var f = 0; f < a.length; f++) {
        r.call(i, a[f]) && (u[a[f]] = i[a[f]]);
      }
    }
  }

  return u;
},
    a = function a(t, e) {
  e || (e = [0, ""]), t = String(t);
  var r = parseFloat(t, 10);
  return e[0] = r, e[1] = t.match(/[\d.\-\+]*\s*(.*)/)[1] || "", e;
},
    u = function u(t) {
  return a(t)[0];
},
    c = function c(t) {
  return null == t && (t = t), function (e, r, n, o) {
    null == n && (n = t), null == o && (o = n);
    var i = a(e)[1];
    if (i === r) return e;
    var c = u(e);
    if ("px" !== i) if ("em" === i) c = u(e) * u(n);else if ("rem" === i) c = u(e) * u(t);else {
      if ("ex" !== i) return e;
      c = u(e) * u(n) * 2;
    }
    var l = c;
    if ("px" !== r) if ("em" === r) l = c / u(o);else if ("rem" === r) l = c / u(t);else {
      if ("ex" !== r) return e;
      l = c / u(o) / 2;
    }
    return parseFloat(l.toFixed(5)) + r;
  };
},
    l = a,
    f = function f(t) {
  return l(t)[1];
},
    s = function s(t) {
  return l(t)[0];
},
    p = {
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  rhythmUnit: "rem",
  defaultRhythmBorderWidth: "1px",
  defaultRhythmBorderStyle: "solid",
  roundToNearestHalfLine: !0,
  minLinePadding: "2px"
},
    v = function v(t, e) {
  var r,
      n = c(e.baseFontSize),
      o = s(n(t, "px")),
      i = s(e.baseLineHeightInPx),
      a = s(n(e.minLinePadding, "px"));
  return (r = e.roundToNearestHalfLine ? Math.ceil(2 * o / i) / 2 : Math.ceil(o / i)) * i - o < 2 * a && (r += e.roundToNearestHalfLine ? .5 : 1), r;
},
    h = function h(t) {
  var e = c(t.baseFontSize);
  return function (r, n, o) {
    null == r && (r = 1), null == n && (n = t.baseFontSize), null == o && (o = 0);
    var i = r * s(t.baseLineHeightInPx) - o + "px",
        a = e(i, t.rhythmUnit, n);
    return "px" === f(a) && (a = Math.floor(s(a)) + f(a)), parseFloat(s(a).toFixed(5)) + f(a);
  };
},
    d = "[object Number]",
    b = Object.prototype.toString;

n = function n(t) {
  return "number" == typeof t || function (t) {
    return !!t && "object" == typeof t;
  }(t) && b.call(t) == d;
}, o = {
  "minor second": 16 / 15,
  "major second": 9 / 8,
  "minor third": 1.2,
  "major third": 4 / 3,
  "diminished fourth": Math.sqrt(2),
  "perfect fifth": 1.5,
  "minor sixth": 1.6,
  golden: 1.61803398875,
  phi: 1.61803398875,
  "major sixth": 5 / 3,
  "minor seventh": 16 / 9,
  "major seventh": 15 / 8,
  octave: 2,
  "major tenth": 2.5,
  "major eleventh": 8 / 3,
  "major twelfth": 3,
  "double octave": 4
};

function g(t) {
  return !isNaN(parseFloat(t)) && isFinite(t);
}

var y = function y(t, e, r) {
  if (void 0 === e && (e = 0), void 0 === r && (r = !1), "cool" === e ? e = 237 : "slate" === e ? e = 122 : "warm" === e && (e = 69), !g(e)) throw new Error("Hue is not a number");
  if (!g(t)) throw new Error("Lightness is not a number");
  t > 100 && (t = 100), t < 0 && (t = 0);
  var n = 0;

  if (0 !== e) {
    n = 19.92978 + -.3651759 * t + .001737214 * Math.pow(t, 2);
  }

  var o = 0;
  return r ? (o = t / 100, t = "100%,") : (o = (100 - t) / 100, t = "0%,"), "hsla(" + e + "," + n + "%," + t + o + ")";
},
    m = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function j(t, e) {
  return t(e = {
    exports: {}
  }, e.exports), e.exports;
}

var _ = "object" == typeof m && m && m.Object === Object && m,
    w = "object" == typeof self && self && self.Object === Object && self,
    O = _ || w || Function("return this")(),
    S = O.Symbol,
    x = Object.prototype,
    z = x.hasOwnProperty,
    F = x.toString,
    k = S ? S.toStringTag : void 0;

var A = function A(t) {
  var e = z.call(t, k),
      r = t[k];

  try {
    t[k] = void 0;
    var n = !0;
  } catch (t) {}

  var o = F.call(t);
  return n && (e ? t[k] = r : delete t[k]), o;
},
    L = Object.prototype.toString;

var B = function B(t) {
  return L.call(t);
},
    P = "[object Null]",
    T = "[object Undefined]",
    M = S ? S.toStringTag : void 0;

var E = function E(t) {
  return null == t ? void 0 === t ? T : P : M && M in Object(t) ? A(t) : B(t);
};

var H = function H(t) {
  var e = typeof t;
  return null != t && ("object" == e || "function" == e);
},
    N = "[object AsyncFunction]",
    W = "[object Function]",
    C = "[object GeneratorFunction]",
    I = "[object Proxy]";

var R,
    $ = function $(t) {
  if (!H(t)) return !1;
  var e = E(t);
  return e == W || e == C || e == N || e == I;
},
    U = O["__core-js_shared__"],
    D = (R = /[^.]+$/.exec(U && U.keys && U.keys.IE_PROTO || "")) ? "Symbol(src)_1." + R : "";

var q = function q(t) {
  return !!D && D in t;
},
    V = Function.prototype.toString;

var J = function J(t) {
  if (null != t) {
    try {
      return V.call(t);
    } catch (t) {}

    try {
      return t + "";
    } catch (t) {}
  }

  return "";
},
    Z = /^\[object .+?Constructor\]$/,
    G = Function.prototype,
    K = Object.prototype,
    Y = RegExp("^" + G.toString.call(K.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

var Q = function Q(t) {
  return !(!H(t) || q(t)) && ($(t) ? Y : Z).test(J(t));
};

var X = function X(t, e) {
  return null == t ? void 0 : t[e];
};

var tt = function tt(t, e) {
  var r = X(t, e);
  return Q(r) ? r : void 0;
},
    et = function () {
  try {
    var t = tt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch (t) {}
}();

var rt = function rt(t, e, r) {
  "__proto__" == e && et ? et(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
};

var nt = function nt(t, e) {
  return t === e || t != t && e != e;
},
    ot = Object.prototype.hasOwnProperty;

var it = function it(t, e, r) {
  var n = t[e];
  ot.call(t, e) && nt(n, r) && (void 0 !== r || e in t) || rt(t, e, r);
},
    at = Array.isArray;

var ut = function ut(t) {
  return null != t && "object" == typeof t;
},
    ct = "[object Symbol]";

var lt = function lt(t) {
  return "symbol" == typeof t || ut(t) && E(t) == ct;
},
    ft = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    st = /^\w*$/;

var pt = function pt(t, e) {
  if (at(t)) return !1;
  var r = typeof t;
  return !("number" != r && "symbol" != r && "boolean" != r && null != t && !lt(t)) || st.test(t) || !ft.test(t) || null != e && t in Object(e);
},
    vt = tt(Object, "create");

var ht = function ht(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
},
    dt = "__lodash_hash_undefined__",
    bt = Object.prototype.hasOwnProperty;

var gt = function gt(t) {
  var e = this.__data__;

  if (vt) {
    var r = e[t];
    return r === dt ? void 0 : r;
  }

  return bt.call(e, t) ? e[t] : void 0;
},
    yt = Object.prototype.hasOwnProperty;

var mt = function mt(t) {
  var e = this.__data__;
  return vt ? void 0 !== e[t] : yt.call(e, t);
},
    jt = "__lodash_hash_undefined__";

var _t = function _t(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = vt && void 0 === e ? jt : e, this;
};

function wt(t) {
  var e = -1,
      r = null == t ? 0 : t.length;

  for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}

wt.prototype.clear = function () {
  this.__data__ = vt ? vt(null) : {}, this.size = 0;
}, wt.prototype.delete = ht, wt.prototype.get = gt, wt.prototype.has = mt, wt.prototype.set = _t;
var Ot = wt;

var St = function St(t, e) {
  for (var r = t.length; r--;) {
    if (nt(t[r][0], e)) return r;
  }

  return -1;
},
    xt = Array.prototype.splice;

var zt = function zt(t) {
  var e = this.__data__,
      r = St(e, t);
  return !(r < 0 || (r == e.length - 1 ? e.pop() : xt.call(e, r, 1), --this.size, 0));
};

var Ft = function Ft(t) {
  var e = this.__data__,
      r = St(e, t);
  return r < 0 ? void 0 : e[r][1];
};

var kt = function kt(t) {
  return St(this.__data__, t) > -1;
};

var At = function At(t, e) {
  var r = this.__data__,
      n = St(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
};

function Lt(t) {
  var e = -1,
      r = null == t ? 0 : t.length;

  for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}

Lt.prototype.clear = function () {
  this.__data__ = [], this.size = 0;
}, Lt.prototype.delete = zt, Lt.prototype.get = Ft, Lt.prototype.has = kt, Lt.prototype.set = At;
var Bt = Lt,
    Pt = tt(O, "Map");

var Tt = function Tt(t) {
  var e = typeof t;
  return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t;
};

var Mt = function Mt(t, e) {
  var r = t.__data__;
  return Tt(e) ? r["string" == typeof e ? "string" : "hash"] : r.map;
};

var Et = function Et(t) {
  var e = Mt(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
};

var Ht = function Ht(t) {
  return Mt(this, t).get(t);
};

var Nt = function Nt(t) {
  return Mt(this, t).has(t);
};

var Wt = function Wt(t, e) {
  var r = Mt(this, t),
      n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
};

function Ct(t) {
  var e = -1,
      r = null == t ? 0 : t.length;

  for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}

Ct.prototype.clear = function () {
  this.size = 0, this.__data__ = {
    hash: new Ot(),
    map: new (Pt || Bt)(),
    string: new Ot()
  };
}, Ct.prototype.delete = Et, Ct.prototype.get = Ht, Ct.prototype.has = Nt, Ct.prototype.set = Wt;
var It = Ct,
    Rt = "Expected a function";

function $t(t, e) {
  if ("function" != typeof t || null != e && "function" != typeof e) throw new TypeError(Rt);

  var r = function r() {
    var n = arguments,
        o = e ? e.apply(this, n) : n[0],
        i = r.cache;
    if (i.has(o)) return i.get(o);
    var a = t.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };

  return r.cache = new ($t.Cache || It)(), r;
}

$t.Cache = It;
var Ut = $t,
    Dt = 500;

var qt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    Vt = /\\(\\)?/g,
    Jt = function (t) {
  var e = Ut(t, function (t) {
    return r.size === Dt && r.clear(), t;
  }),
      r = e.cache;
  return e;
}(function (t) {
  var e = [];
  return 46 === t.charCodeAt(0) && e.push(""), t.replace(qt, function (t, r, n, o) {
    e.push(n ? o.replace(Vt, "$1") : r || t);
  }), e;
});

var Zt = function Zt(t, e) {
  for (var r = -1, n = null == t ? 0 : t.length, o = Array(n); ++r < n;) {
    o[r] = e(t[r], r, t);
  }

  return o;
},
    Gt = 1 / 0,
    Kt = S ? S.prototype : void 0,
    Yt = Kt ? Kt.toString : void 0;

var Qt = function t(e) {
  if ("string" == typeof e) return e;
  if (at(e)) return Zt(e, t) + "";
  if (lt(e)) return Yt ? Yt.call(e) : "";
  var r = e + "";
  return "0" == r && 1 / e == -Gt ? "-0" : r;
};

var Xt = function Xt(t) {
  return null == t ? "" : Qt(t);
};

var te = function te(t, e) {
  return at(t) ? t : pt(t, e) ? [t] : Jt(Xt(t));
},
    ee = 9007199254740991,
    re = /^(?:0|[1-9]\d*)$/;

var ne = function ne(t, e) {
  var r = typeof t;
  return !!(e = null == e ? ee : e) && ("number" == r || "symbol" != r && re.test(t)) && t > -1 && t % 1 == 0 && t < e;
},
    oe = 1 / 0;

var ie = function ie(t) {
  if ("string" == typeof t || lt(t)) return t;
  var e = t + "";
  return "0" == e && 1 / t == -oe ? "-0" : e;
};

var ae = function ae(t, e, r, n) {
  if (!H(t)) return t;

  for (var o = -1, i = (e = te(e, t)).length, a = i - 1, u = t; null != u && ++o < i;) {
    var c = ie(e[o]),
        l = r;

    if (o != a) {
      var f = u[c];
      void 0 === (l = n ? n(f, c, u) : void 0) && (l = H(f) ? f : ne(e[o + 1]) ? [] : {});
    }

    it(u, c, l), u = u[c];
  }

  return t;
};

var ue = function ue(t, e, r) {
  return null == t ? t : ae(t, e, r);
};

var ce = function ce(t, e) {
  for (var r = -1, n = null == t ? 0 : t.length; ++r < n && !1 !== e(t[r], r, t);) {
    ;
  }

  return t;
};

var le = function (t) {
  return function (e, r, n) {
    for (var o = -1, i = Object(e), a = n(e), u = a.length; u--;) {
      var c = a[t ? u : ++o];
      if (!1 === r(i[c], c, i)) break;
    }

    return e;
  };
}();

var fe = function fe(t, e) {
  for (var r = -1, n = Array(t); ++r < t;) {
    n[r] = e(r);
  }

  return n;
},
    se = "[object Arguments]";

var pe = function pe(t) {
  return ut(t) && E(t) == se;
},
    ve = Object.prototype,
    he = ve.hasOwnProperty,
    de = ve.propertyIsEnumerable,
    be = pe(function () {
  return arguments;
}()) ? pe : function (t) {
  return ut(t) && he.call(t, "callee") && !de.call(t, "callee");
};

var ge = function ge() {
  return !1;
},
    ye = j(function (t, e) {
  var r = e && !e.nodeType && e,
      n = r && t && !t.nodeType && t,
      o = n && n.exports === r ? O.Buffer : void 0;
  t.exports = (o ? o.isBuffer : void 0) || ge;
}),
    me = 9007199254740991;

var je = function je(t) {
  return "number" == typeof t && t > -1 && t % 1 == 0 && t <= me;
},
    _e = {};

_e["[object Float32Array]"] = _e["[object Float64Array]"] = _e["[object Int8Array]"] = _e["[object Int16Array]"] = _e["[object Int32Array]"] = _e["[object Uint8Array]"] = _e["[object Uint8ClampedArray]"] = _e["[object Uint16Array]"] = _e["[object Uint32Array]"] = !0, _e["[object Arguments]"] = _e["[object Array]"] = _e["[object ArrayBuffer]"] = _e["[object Boolean]"] = _e["[object DataView]"] = _e["[object Date]"] = _e["[object Error]"] = _e["[object Function]"] = _e["[object Map]"] = _e["[object Number]"] = _e["[object Object]"] = _e["[object RegExp]"] = _e["[object Set]"] = _e["[object String]"] = _e["[object WeakMap]"] = !1;

var we = function we(t) {
  return ut(t) && je(t.length) && !!_e[E(t)];
};

var Oe = function Oe(t) {
  return function (e) {
    return t(e);
  };
},
    Se = j(function (t, e) {
  var r = e && !e.nodeType && e,
      n = r && t && !t.nodeType && t,
      o = n && n.exports === r && _.process,
      i = function () {
    try {
      var t = n && n.require && n.require("util").types;

      return t || o && o.binding && o.binding("util");
    } catch (t) {}
  }();

  t.exports = i;
}),
    xe = Se && Se.isTypedArray,
    ze = xe ? Oe(xe) : we,
    Fe = Object.prototype.hasOwnProperty;

var ke = function ke(t, e) {
  var r = at(t),
      n = !r && be(t),
      o = !r && !n && ye(t),
      i = !r && !n && !o && ze(t),
      a = r || n || o || i,
      u = a ? fe(t.length, String) : [],
      c = u.length;

  for (var l in t) {
    !e && !Fe.call(t, l) || a && ("length" == l || o && ("offset" == l || "parent" == l) || i && ("buffer" == l || "byteLength" == l || "byteOffset" == l) || ne(l, c)) || u.push(l);
  }

  return u;
},
    Ae = Object.prototype;

var Le = function Le(t) {
  var e = t && t.constructor;
  return t === ("function" == typeof e && e.prototype || Ae);
};

var Be = function Be(t, e) {
  return function (r) {
    return t(e(r));
  };
},
    Pe = Be(Object.keys, Object),
    Te = Object.prototype.hasOwnProperty;

var Me = function Me(t) {
  if (!Le(t)) return Pe(t);
  var e = [];

  for (var r in Object(t)) {
    Te.call(t, r) && "constructor" != r && e.push(r);
  }

  return e;
};

var Ee = function Ee(t) {
  return null != t && je(t.length) && !$(t);
};

var He = function He(t) {
  return Ee(t) ? ke(t) : Me(t);
};

var Ne = function (t, e) {
  return function (r, n) {
    if (null == r) return r;
    if (!Ee(r)) return t(r, n);

    for (var o = r.length, i = e ? o : -1, a = Object(r); (e ? i-- : ++i < o) && !1 !== n(a[i], i, a);) {
      ;
    }

    return r;
  };
}(function (t, e) {
  return t && le(t, e, He);
});

var We = function We(t) {
  return t;
};

var Ce = function Ce(t) {
  return "function" == typeof t ? t : We;
};

var Ie = function Ie(t, e) {
  return (at(t) ? ce : Ne)(t, Ce(e));
},
    Re = "[object Number]";

var $e = function $e(t) {
  return "number" == typeof t || ut(t) && E(t) == Re;
},
    Ue = "[object String]";

var De = function De(t) {
  return "string" == typeof t || !at(t) && ut(t) && E(t) == Ue;
};

var qe = function qe(t) {
  var e = this.__data__,
      r = e.delete(t);
  return this.size = e.size, r;
};

var Ve = function Ve(t) {
  return this.__data__.get(t);
};

var Je = function Je(t) {
  return this.__data__.has(t);
},
    Ze = 200;

var Ge = function Ge(t, e) {
  var r = this.__data__;

  if (r instanceof Bt) {
    var n = r.__data__;
    if (!Pt || n.length < Ze - 1) return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new It(n);
  }

  return r.set(t, e), this.size = r.size, this;
};

function Ke(t) {
  var e = this.__data__ = new Bt(t);
  this.size = e.size;
}

Ke.prototype.clear = function () {
  this.__data__ = new Bt(), this.size = 0;
}, Ke.prototype.delete = qe, Ke.prototype.get = Ve, Ke.prototype.has = Je, Ke.prototype.set = Ge;
var Ye = Ke;

var Qe = function Qe(t, e, r) {
  (void 0 === r || nt(t[e], r)) && (void 0 !== r || e in t) || rt(t, e, r);
},
    Xe = j(function (t, e) {
  var r = e && !e.nodeType && e,
      n = r && t && !t.nodeType && t,
      o = n && n.exports === r ? O.Buffer : void 0,
      i = o ? o.allocUnsafe : void 0;

  t.exports = function (t, e) {
    if (e) return t.slice();
    var r = t.length,
        n = i ? i(r) : new t.constructor(r);
    return t.copy(n), n;
  };
}),
    tr = O.Uint8Array;

var er = function er(t) {
  var e = new t.constructor(t.byteLength);
  return new tr(e).set(new tr(t)), e;
};

var rr = function rr(t, e) {
  var r = e ? er(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
};

var nr = function nr(t, e) {
  var r = -1,
      n = t.length;

  for (e || (e = Array(n)); ++r < n;) {
    e[r] = t[r];
  }

  return e;
},
    or = Object.create,
    ir = function () {
  function t() {}

  return function (e) {
    if (!H(e)) return {};
    if (or) return or(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}(),
    ar = Be(Object.getPrototypeOf, Object);

var ur = function ur(t) {
  return "function" != typeof t.constructor || Le(t) ? {} : ir(ar(t));
};

var cr = function cr(t) {
  return ut(t) && Ee(t);
},
    lr = "[object Object]",
    fr = Function.prototype,
    sr = Object.prototype,
    pr = fr.toString,
    vr = sr.hasOwnProperty,
    hr = pr.call(Object);

var dr = function dr(t) {
  if (!ut(t) || E(t) != lr) return !1;
  var e = ar(t);
  if (null === e) return !0;
  var r = vr.call(e, "constructor") && e.constructor;
  return "function" == typeof r && r instanceof r && pr.call(r) == hr;
};

var br = function br(t, e) {
  return "__proto__" == e ? void 0 : t[e];
};

var gr = function gr(t, e, r, n) {
  var o = !r;
  r || (r = {});

  for (var i = -1, a = e.length; ++i < a;) {
    var u = e[i],
        c = n ? n(r[u], t[u], u, r, t) : void 0;
    void 0 === c && (c = t[u]), o ? rt(r, u, c) : it(r, u, c);
  }

  return r;
};

var yr = function yr(t) {
  var e = [];
  if (null != t) for (var r in Object(t)) {
    e.push(r);
  }
  return e;
},
    mr = Object.prototype.hasOwnProperty;

var jr = function jr(t) {
  if (!H(t)) return yr(t);
  var e = Le(t),
      r = [];

  for (var n in t) {
    ("constructor" != n || !e && mr.call(t, n)) && r.push(n);
  }

  return r;
};

var _r = function _r(t) {
  return Ee(t) ? ke(t, !0) : jr(t);
};

var wr = function wr(t) {
  return gr(t, _r(t));
};

var Or = function Or(t, e, r, n, o, i, a) {
  var u = br(t, r),
      c = br(e, r),
      l = a.get(c);
  if (l) Qe(t, r, l);else {
    var f = i ? i(u, c, r + "", t, e, a) : void 0,
        s = void 0 === f;

    if (s) {
      var p = at(c),
          v = !p && ye(c),
          h = !p && !v && ze(c);
      f = c, p || v || h ? at(u) ? f = u : cr(u) ? f = nr(u) : v ? (s = !1, f = Xe(c, !0)) : h ? (s = !1, f = rr(c, !0)) : f = [] : dr(c) || be(c) ? (f = u, be(u) ? f = wr(u) : (!H(u) || n && $(u)) && (f = ur(c))) : s = !1;
    }

    s && (a.set(c, f), o(f, c, n, i, a), a.delete(c)), Qe(t, r, f);
  }
};

var Sr = function t(e, r, n, o, i) {
  e !== r && le(r, function (a, u) {
    if (H(a)) i || (i = new Ye()), Or(e, r, u, n, t, o, i);else {
      var c = o ? o(br(e, u), a, u + "", e, r, i) : void 0;
      void 0 === c && (c = a), Qe(e, u, c);
    }
  }, _r);
};

var xr = function xr(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);

    case 1:
      return t.call(e, r[0]);

    case 2:
      return t.call(e, r[0], r[1]);

    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }

  return t.apply(e, r);
},
    zr = Math.max;

var Fr = function Fr(t, e, r) {
  return e = zr(void 0 === e ? t.length - 1 : e, 0), function () {
    for (var n = arguments, o = -1, i = zr(n.length - e, 0), a = Array(i); ++o < i;) {
      a[o] = n[e + o];
    }

    o = -1;

    for (var u = Array(e + 1); ++o < e;) {
      u[o] = n[o];
    }

    return u[e] = r(a), xr(t, this, u);
  };
};

var kr = function kr(t) {
  return function () {
    return t;
  };
},
    Ar = 800,
    Lr = 16,
    Br = Date.now;

var Pr = function (t) {
  var e = 0,
      r = 0;
  return function () {
    var n = Br(),
        o = Lr - (n - r);

    if (r = n, o > 0) {
      if (++e >= Ar) return arguments[0];
    } else e = 0;

    return t.apply(void 0, arguments);
  };
}(et ? function (t, e) {
  return et(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: kr(e),
    writable: !0
  });
} : We);

var Tr = function Tr(t, e) {
  return Pr(Fr(t, e, We), t + "");
};

var Mr = function Mr(t, e, r) {
  if (!H(r)) return !1;
  var n = typeof e;
  return !!("number" == n ? Ee(r) && ne(e, r.length) : "string" == n && e in r) && nt(r[e], t);
};

var Er = function (t) {
  return Tr(function (e, r) {
    var n = -1,
        o = r.length,
        i = o > 1 ? r[o - 1] : void 0,
        a = o > 2 ? r[2] : void 0;

    for (i = t.length > 3 && "function" == typeof i ? (o--, i) : void 0, a && Mr(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++n < o;) {
      var u = r[n];
      u && t(e, u, n, i);
    }

    return e;
  });
}(function (t, e, r) {
  Sr(t, e, r);
});

var Hr = function Hr(t, e, r, n) {
  var o = -1,
      i = null == t ? 0 : t.length;

  for (n && i && (r = t[++o]); ++o < i;) {
    r = e(r, t[o], o, t);
  }

  return r;
},
    Nr = "__lodash_hash_undefined__";

var Wr = function Wr(t) {
  return this.__data__.has(t);
};

function Cr(t) {
  var e = -1,
      r = null == t ? 0 : t.length;

  for (this.__data__ = new It(); ++e < r;) {
    this.add(t[e]);
  }
}

Cr.prototype.add = Cr.prototype.push = function (t) {
  return this.__data__.set(t, Nr), this;
}, Cr.prototype.has = Wr;
var Ir = Cr;

var Rr = function Rr(t, e) {
  for (var r = -1, n = null == t ? 0 : t.length; ++r < n;) {
    if (e(t[r], r, t)) return !0;
  }

  return !1;
};

var $r = function $r(t, e) {
  return t.has(e);
},
    Ur = 1,
    Dr = 2;

var qr = function qr(t, e, r, n, o, i) {
  var a = r & Ur,
      u = t.length,
      c = e.length;
  if (u != c && !(a && c > u)) return !1;
  var l = i.get(t);
  if (l && i.get(e)) return l == e;
  var f = -1,
      s = !0,
      p = r & Dr ? new Ir() : void 0;

  for (i.set(t, e), i.set(e, t); ++f < u;) {
    var v = t[f],
        h = e[f];
    if (n) var d = a ? n(h, v, f, e, t, i) : n(v, h, f, t, e, i);

    if (void 0 !== d) {
      if (d) continue;
      s = !1;
      break;
    }

    if (p) {
      if (!Rr(e, function (t, e) {
        if (!$r(p, e) && (v === t || o(v, t, r, n, i))) return p.push(e);
      })) {
        s = !1;
        break;
      }
    } else if (v !== h && !o(v, h, r, n, i)) {
      s = !1;
      break;
    }
  }

  return i.delete(t), i.delete(e), s;
};

var Vr = function Vr(t) {
  var e = -1,
      r = Array(t.size);
  return t.forEach(function (t, n) {
    r[++e] = [n, t];
  }), r;
};

var Jr = function Jr(t) {
  var e = -1,
      r = Array(t.size);
  return t.forEach(function (t) {
    r[++e] = t;
  }), r;
},
    Zr = 1,
    Gr = 2,
    Kr = "[object Boolean]",
    Yr = "[object Date]",
    Qr = "[object Error]",
    Xr = "[object Map]",
    tn = "[object Number]",
    en = "[object RegExp]",
    rn = "[object Set]",
    nn = "[object String]",
    on = "[object Symbol]",
    an = "[object ArrayBuffer]",
    un = "[object DataView]",
    cn = S ? S.prototype : void 0,
    ln = cn ? cn.valueOf : void 0;

var fn = function fn(t, e, r, n, o, i, a) {
  switch (r) {
    case un:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
      t = t.buffer, e = e.buffer;

    case an:
      return !(t.byteLength != e.byteLength || !i(new tr(t), new tr(e)));

    case Kr:
    case Yr:
    case tn:
      return nt(+t, +e);

    case Qr:
      return t.name == e.name && t.message == e.message;

    case en:
    case nn:
      return t == e + "";

    case Xr:
      var u = Vr;

    case rn:
      if (u || (u = Jr), t.size != e.size && !(n & Zr)) return !1;
      var c = a.get(t);
      if (c) return c == e;
      n |= Gr, a.set(t, e);
      var l = qr(u(t), u(e), n, o, i, a);
      return a.delete(t), l;

    case on:
      if (ln) return ln.call(t) == ln.call(e);
  }

  return !1;
};

var sn = function sn(t, e) {
  for (var r = -1, n = e.length, o = t.length; ++r < n;) {
    t[o + r] = e[r];
  }

  return t;
};

var pn = function pn(t, e, r) {
  var n = e(t);
  return at(t) ? n : sn(n, r(t));
};

var vn = function vn(t, e) {
  for (var r = -1, n = null == t ? 0 : t.length, o = 0, i = []; ++r < n;) {
    var a = t[r];
    e(a, r, t) && (i[o++] = a);
  }

  return i;
};

var hn = Object.prototype.propertyIsEnumerable,
    dn = Object.getOwnPropertySymbols,
    bn = dn ? function (t) {
  return null == t ? [] : (t = Object(t), vn(dn(t), function (e) {
    return hn.call(t, e);
  }));
} : function () {
  return [];
};

var gn = function gn(t) {
  return pn(t, He, bn);
},
    yn = 1,
    mn = Object.prototype.hasOwnProperty;

var jn = function jn(t, e, r, n, o, i) {
  var a = r & yn,
      u = gn(t),
      c = u.length;
  if (c != gn(e).length && !a) return !1;

  for (var l = c; l--;) {
    var f = u[l];
    if (!(a ? f in e : mn.call(e, f))) return !1;
  }

  var s = i.get(t);
  if (s && i.get(e)) return s == e;
  var p = !0;
  i.set(t, e), i.set(e, t);

  for (var v = a; ++l < c;) {
    var h = t[f = u[l]],
        d = e[f];
    if (n) var b = a ? n(d, h, f, e, t, i) : n(h, d, f, t, e, i);

    if (!(void 0 === b ? h === d || o(h, d, r, n, i) : b)) {
      p = !1;
      break;
    }

    v || (v = "constructor" == f);
  }

  if (p && !v) {
    var g = t.constructor,
        y = e.constructor;
    g != y && "constructor" in t && "constructor" in e && !("function" == typeof g && g instanceof g && "function" == typeof y && y instanceof y) && (p = !1);
  }

  return i.delete(t), i.delete(e), p;
},
    _n = tt(O, "DataView"),
    wn = tt(O, "Promise"),
    On = tt(O, "Set"),
    Sn = tt(O, "WeakMap"),
    xn = J(_n),
    zn = J(Pt),
    Fn = J(wn),
    kn = J(On),
    An = J(Sn),
    Ln = E;

(_n && "[object DataView]" != Ln(new _n(new ArrayBuffer(1))) || Pt && "[object Map]" != Ln(new Pt()) || wn && "[object Promise]" != Ln(wn.resolve()) || On && "[object Set]" != Ln(new On()) || Sn && "[object WeakMap]" != Ln(new Sn())) && (Ln = function Ln(t) {
  var e = E(t),
      r = "[object Object]" == e ? t.constructor : void 0,
      n = r ? J(r) : "";
  if (n) switch (n) {
    case xn:
      return "[object DataView]";

    case zn:
      return "[object Map]";

    case Fn:
      return "[object Promise]";

    case kn:
      return "[object Set]";

    case An:
      return "[object WeakMap]";
  }
  return e;
});
var Bn = Ln,
    Pn = 1,
    Tn = "[object Arguments]",
    Mn = "[object Array]",
    En = "[object Object]",
    Hn = Object.prototype.hasOwnProperty;

var Nn = function Nn(t, e, r, n, o, i) {
  var a = at(t),
      u = at(e),
      c = a ? Mn : Bn(t),
      l = u ? Mn : Bn(e),
      f = (c = c == Tn ? En : c) == En,
      s = (l = l == Tn ? En : l) == En,
      p = c == l;

  if (p && ye(t)) {
    if (!ye(e)) return !1;
    a = !0, f = !1;
  }

  if (p && !f) return i || (i = new Ye()), a || ze(t) ? qr(t, e, r, n, o, i) : fn(t, e, c, r, n, o, i);

  if (!(r & Pn)) {
    var v = f && Hn.call(t, "__wrapped__"),
        h = s && Hn.call(e, "__wrapped__");

    if (v || h) {
      var d = v ? t.value() : t,
          b = h ? e.value() : e;
      return i || (i = new Ye()), o(d, b, r, n, i);
    }
  }

  return !!p && (i || (i = new Ye()), jn(t, e, r, n, o, i));
};

var Wn = function t(e, r, n, o, i) {
  return e === r || (null == e || null == r || !ut(e) && !ut(r) ? e != e && r != r : Nn(e, r, n, o, t, i));
},
    Cn = 1,
    In = 2;

var Rn = function Rn(t, e, r, n) {
  var o = r.length,
      i = o,
      a = !n;
  if (null == t) return !i;

  for (t = Object(t); o--;) {
    var u = r[o];
    if (a && u[2] ? u[1] !== t[u[0]] : !(u[0] in t)) return !1;
  }

  for (; ++o < i;) {
    var c = (u = r[o])[0],
        l = t[c],
        f = u[1];

    if (a && u[2]) {
      if (void 0 === l && !(c in t)) return !1;
    } else {
      var s = new Ye();
      if (n) var p = n(l, f, c, t, e, s);
      if (!(void 0 === p ? Wn(f, l, Cn | In, n, s) : p)) return !1;
    }
  }

  return !0;
};

var $n = function $n(t) {
  return t == t && !H(t);
};

var Un = function Un(t) {
  for (var e = He(t), r = e.length; r--;) {
    var n = e[r],
        o = t[n];
    e[r] = [n, o, $n(o)];
  }

  return e;
};

var Dn = function Dn(t, e) {
  return function (r) {
    return null != r && r[t] === e && (void 0 !== e || t in Object(r));
  };
};

var qn = function qn(t) {
  var e = Un(t);
  return 1 == e.length && e[0][2] ? Dn(e[0][0], e[0][1]) : function (r) {
    return r === t || Rn(r, t, e);
  };
};

var Vn = function Vn(t, e) {
  for (var r = 0, n = (e = te(e, t)).length; null != t && r < n;) {
    t = t[ie(e[r++])];
  }

  return r && r == n ? t : void 0;
};

var Jn = function Jn(t, e, r) {
  var n = null == t ? void 0 : Vn(t, e);
  return void 0 === n ? r : n;
};

var Zn = function Zn(t, e) {
  return null != t && e in Object(t);
};

var Gn = function Gn(t, e, r) {
  for (var n = -1, o = (e = te(e, t)).length, i = !1; ++n < o;) {
    var a = ie(e[n]);
    if (!(i = null != t && r(t, a))) break;
    t = t[a];
  }

  return i || ++n != o ? i : !!(o = null == t ? 0 : t.length) && je(o) && ne(a, o) && (at(t) || be(t));
};

var Kn = function Kn(t, e) {
  return null != t && Gn(t, e, Zn);
},
    Yn = 1,
    Qn = 2;

var Xn = function Xn(t, e) {
  return pt(t) && $n(e) ? Dn(ie(t), e) : function (r) {
    var n = Jn(r, t);
    return void 0 === n && n === e ? Kn(r, t) : Wn(e, n, Yn | Qn);
  };
};

var to = function to(t) {
  return function (e) {
    return null == e ? void 0 : e[t];
  };
};

var eo = function eo(t) {
  return function (e) {
    return Vn(e, t);
  };
};

var ro = function ro(t) {
  return pt(t) ? to(ie(t)) : eo(t);
};

var no = function no(t) {
  return "function" == typeof t ? t : null == t ? We : "object" == typeof t ? at(t) ? Xn(t[0], t[1]) : qn(t) : ro(t);
};

var oo = function oo(t, e, r, n, o) {
  return o(t, function (t, o, i) {
    r = n ? (n = !1, t) : e(r, t, o, i);
  }), r;
};

var io = function io(t, e, r) {
  var n = at(t) ? Hr : oo,
      o = arguments.length < 3;
  return n(t, no(e, 4), r, o, Ne);
},
    ao = function ao(t, e, r) {
  var n;
  return void 0 === t && (t = {}), n = at(e) ? e : [e], Ie(n, function (e) {
    Ie(r, function (r, n) {
      ue(t, e + "." + n, r);
    });
  }), t;
},
    uo = ["inherit", "default", "serif", "sans-serif", "monospace", "fantasy", "cursive", "-apple-system"],
    co = function co(t) {
  return -1 !== uo.indexOf(t) ? t : "'" + t + "'";
};

var lo,
    fo = j(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = "html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,optgroup,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}";
}),
    so = (lo = fo) && lo.__esModule && Object.prototype.hasOwnProperty.call(lo, "default") ? lo.default : lo,
    po = function po(t) {
  return io(t, function (t, e, r) {
    return t += r + "{", Ie(e, function (e, r) {
      if (H(e)) {
        var n = {};
        n[r] = e, t += po(n);
      } else {
        var o = function (t, e) {
          if ("string" != typeof t) throw new TypeError("Expected a string");
          return t.replace(/([a-z\d])([A-Z])/g, "$1" + (e = void 0 === e ? "_" : e) + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + e + "$2").toLowerCase();
        }(r, "-") + ":" + e + ";";

        ["Webkit", "ms", "Moz", "O"].forEach(function (t) {
          r.slice(0, t.length) === t && (o = "-" + o);
        }), t += o;
      }
    }), t += "}";
  }, "");
};

module.exports = function (t) {
  var e,
      r,
      a,
      u,
      l = i({}, {
    baseFontSize: "16px",
    baseLineHeight: 1.45,
    headerLineHeight: 1.1,
    scaleRatio: 2,
    googleFonts: [],
    headerFontFamily: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"],
    bodyFontFamily: ["georgia", "serif"],
    headerColor: "inherit",
    bodyColor: "hsla(0,0%,0%,0.8)",
    headerWeight: "bold",
    bodyWeight: "normal",
    boldWeight: "bold",
    includeNormalize: !0,
    blockMarginBottom: 1
  }, t),
      d = (e = l, r = JSON.parse(JSON.stringify(p)), a = Object.assign({}, r, e), u = c(a.baseFontSize), f(a.baseLineHeight) ? (s(u(a.baseFontSize, "px")), a.baseLineHeightInPx = u(a.baseLineHeight, "px")) : a.baseLineHeightInPx = s(a.baseFontSize) * a.baseLineHeight + "px", {
    rhythm: h(a),
    establishBaseline: function establishBaseline() {
      return c((t = a).baseFontSize), {
        fontSize: s(t.baseFontSize) / 16 * 100 + "%",
        lineHeight: t.baseLineHeight.toString()
      };
      var t;
    },
    linesForFontSize: function linesForFontSize(t) {
      return v(t, a);
    },
    adjustFontSizeTo: function adjustFontSizeTo(t, e, r) {
      return null == e && (e = "auto"), function (t, e, r, n) {
        null == r && (r = n.baseFontSize), "%" === f(t) && (t = s(n.baseFontSize) * (s(t) / 100) + "px");
        var o = c(n.baseFontSize);
        t = o(t, "px", r = o(r, "px"));
        var i = h(n);
        return "auto" === e && (e = v(t, n)), {
          fontSize: o(t, n.rhythmUnit, r),
          lineHeight: i(e, r)
        };
      }(t, e, r, a);
    }
  });
  return d.scale = function (t) {
    var e = parseInt(l.baseFontSize, 10),
        r = function (t, e) {
      var r;
      return null == t && (t = 0), null == e && (e = "golden"), r = n(e) ? e : null != o[e] ? o[e] : o.golden, Math.pow(r, t);
    }(t, l.scaleRatio) * e + "px";

    return d.adjustFontSizeTo(r);
  }, Object.assign({}, {
    options: l
  }, d, {
    createStyles: function createStyles() {
      return this.toString();
    },
    toJSON: function toJSON() {
      return function (t, e) {
        var r = {},
            n = t.establishBaseline();
        r = ao(r, "html", {
          font: n.fontSize + "/" + n.lineHeight + " " + e.bodyFontFamily.map(co).join(","),
          boxSizing: "border-box",
          overflowY: "scroll"
        }), r = ao(r, ["*", "*:before", "*:after"], {
          boxSizing: "inherit"
        }), r = ao(r, "body", {
          color: e.bodyColor,
          fontFamily: e.bodyFontFamily.map(co).join(","),
          fontWeight: e.bodyWeight,
          wordWrap: "break-word",
          fontKerning: "normal",
          MozFontFeatureSettings: '"kern", "liga", "clig", "calt"',
          msFontFeatureSettings: '"kern", "liga", "clig", "calt"',
          WebkitFontFeatureSettings: '"kern", "liga", "clig", "calt"',
          fontFeatureSettings: '"kern", "liga", "clig", "calt"'
        }), r = ao(r, "img", {
          maxWidth: "100%"
        });
        var o = "";
        o = $e(e.blockMarginBottom) ? t.rhythm(e.blockMarginBottom) : De(e.blockMarginBottom) ? e.blockMarginBottom : t.rhythm(1), r = ao(r, ["h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "ul", "ol", "dl", "dd", "p", "figure", "pre", "table", "fieldset", "blockquote", "form", "noscript", "iframe", "img", "hr", "address"], {
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          marginBottom: o
        }), r = ao(r, "blockquote", {
          marginRight: t.rhythm(1),
          marginBottom: o,
          marginLeft: t.rhythm(1)
        }), r = ao(r, ["b", "strong", "dt", "th"], {
          fontWeight: e.boldWeight
        }), r = ao(r, "hr", {
          background: y(80),
          border: "none",
          height: "1px",
          marginBottom: "calc(" + o + " - 1px)"
        }), r = ao(r, ["ol", "ul"], {
          listStylePosition: "outside",
          listStyleImage: "none",
          marginLeft: t.rhythm(1)
        }), r = ao(r, "li", {
          marginBottom: "calc(" + o + " / 2)"
        }), r = ao(r, ["ol li", "ul li"], {
          paddingLeft: 0
        }), r = ao(r, ["li > ol", "li > ul"], {
          marginLeft: t.rhythm(1),
          marginBottom: "calc(" + o + " / 2)",
          marginTop: "calc(" + o + " / 2)"
        }), r = ao(r, ["blockquote *:last-child", "li *:last-child", "p *:last-child"], {
          marginBottom: 0
        }), r = ao(r, ["li > p"], {
          marginBottom: "calc(" + o + " / 2)"
        }), r = ao(r, ["code", "kbd", "pre", "samp"], Object.assign({}, t.adjustFontSizeTo("85%"))), (r = ao(r, ["abbr", "acronym"], {
          borderBottom: "1px dotted " + y(50),
          cursor: "help"
        }))["abbr[title]"] = {
          borderBottom: "1px dotted " + y(50),
          cursor: "help",
          textDecoration: "none"
        }, r = ao(r, ["table"], Object.assign({}, t.adjustFontSizeTo(e.baseFontSize), {
          borderCollapse: "collapse",
          width: "100%"
        })), r = ao(r, ["thead"], {
          textAlign: "left"
        }), r = ao(r, ["td,th"], {
          textAlign: "left",
          borderBottom: "1px solid " + y(88),
          fontFeatureSettings: '"tnum"',
          MozFontFeatureSettings: '"tnum"',
          msFontFeatureSettings: '"tnum"',
          WebkitFontFeatureSettings: '"tnum"',
          paddingLeft: t.rhythm(2 / 3),
          paddingRight: t.rhythm(2 / 3),
          paddingTop: t.rhythm(.5),
          paddingBottom: "calc(" + t.rhythm(.5) + " - 1px)"
        }), r = ao(r, "th:first-child,td:first-child", {
          paddingLeft: 0
        }), r = ao(r, "th:last-child,td:last-child", {
          paddingRight: 0
        }), r = ao(r, ["h1", "h2", "h3", "h4", "h5", "h6"], {
          color: e.headerColor,
          fontFamily: e.headerFontFamily.map(co).join(","),
          fontWeight: e.headerWeight,
          textRendering: "optimizeLegibility"
        });
        var i = t.scale(1),
            a = t.scale(.6),
            u = t.scale(.4),
            c = t.scale(0),
            l = t.scale(-.2),
            f = t.scale(-.3);
        return Ie([i, a, u, c, l, f], function (t, n) {
          r = ue(r, "h" + (n + 1) + ".fontSize", t.fontSize), r = ue(r, "h" + (n + 1) + ".lineHeight", e.headerLineHeight);
        }), at(e.plugins) && (r = io(e.plugins, function (r, n) {
          return Er(r, n(t, e, r));
        }, r)), e.overrideStyles && $(e.overrideStyles) && (r = Er(r, e.overrideStyles(t, e, r))), e.overrideThemeStyles && $(e.overrideThemeStyles) && (r = Er(r, e.overrideThemeStyles(t, e, r))), r;
      }(d, l);
    },
    toString: function toString() {
      return function (t, e, r) {
        var n = po(r);
        return e.includeNormalize && (n = "" + so + n), n;
      }(0, l, this.toJSON());
    },
    injectStyles: function injectStyles() {
      if ("undefined" != typeof document) if (document.getElementById("typography.js")) document.getElementById("typography.js").innerHTML = this.toString();else {
        var t = document.createElement("style");
        t.id = "typography.js", t.innerHTML = this.toString();
        var e = document.head;
        e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t);
      }
    }
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("fRV1")))

/***/ }),

/***/ "6c1n":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__("IGGJ");exports.__esModule=true;exports.default=void 0;var _assertThisInitialized2=_interopRequireDefault(__webpack_require__("1Pcy"));var _inheritsLoose2=_interopRequireDefault(__webpack_require__("W/Kd"));var _objectWithoutPropertiesLoose2=_interopRequireDefault(__webpack_require__("LdEA"));var _extends2=_interopRequireDefault(__webpack_require__("97Jx"));var _react=_interopRequireDefault(__webpack_require__("ERkP"));var _propTypes=_interopRequireDefault(__webpack_require__("aWzz"));var logDeprecationNotice=function logDeprecationNotice(prop,replacement){if(true){return;}console.log("\n    The \""+prop+"\" prop is now deprecated and will be removed in the next major version\n    of \"gatsby-image\".\n    ");if(replacement){console.log("Please use "+replacement+" instead of \""+prop+"\".");}};// Handle legacy props during their deprecation phase
var convertProps=function convertProps(props){var convertedProps=(0,_extends2.default)({},props);var resolutions=convertedProps.resolutions,sizes=convertedProps.sizes,critical=convertedProps.critical;if(resolutions){convertedProps.fixed=resolutions;logDeprecationNotice("resolutions","the gatsby-image v2 prop \"fixed\"");delete convertedProps.resolutions;}if(sizes){convertedProps.fluid=sizes;logDeprecationNotice("sizes","the gatsby-image v2 prop \"fluid\"");delete convertedProps.sizes;}if(critical){logDeprecationNotice("critical","the native \"loading\" attribute");convertedProps.loading="eager";}// convert fluid & fixed to arrays so we only have to work with arrays
if(convertedProps.fluid){convertedProps.fluid=groupByMedia([].concat(convertedProps.fluid));}if(convertedProps.fixed){convertedProps.fixed=groupByMedia([].concat(convertedProps.fixed));}return convertedProps;};/**
 * Checks if fluid or fixed are art-direction arrays.
 *
 * @param currentData  {{media?: string}[]}   The props to check for images.
 * @return {boolean}
 */var hasArtDirectionSupport=function hasArtDirectionSupport(currentData){return!!currentData&&Array.isArray(currentData)&&currentData.some(function(image){return typeof image.media!=="undefined";});};/**
 * Tries to detect if a media query matches the current viewport.
 * @property media   {{media?: string}}  A media query string.
 * @return {boolean}
 */var matchesMedia=function matchesMedia(_ref){var media=_ref.media;return media?isBrowser&&!!window.matchMedia(media).matches:false;};/**
 * Find the source of an image to use as a key in the image cache.
 * Use `the first image in either `fixed` or `fluid`
 * @param {{fluid: {src: string, media?: string}[], fixed: {src: string, media?: string}[]}} args
 * @return {string?} Returns image src or undefined it not given.
 */var getImageCacheKey=function getImageCacheKey(_ref2){var fluid=_ref2.fluid,fixed=_ref2.fixed;var srcData=getCurrentSrcData(fluid||fixed||[]);return srcData&&srcData.src;};/**
 * Returns the current src - Preferably with art-direction support.
 * @param currentData  {{media?: string}[], maxWidth?: Number, maxHeight?: Number}   The fluid or fixed image array.
 * @return {{src: string, media?: string, maxWidth?: Number, maxHeight?: Number}}
 */var getCurrentSrcData=function getCurrentSrcData(currentData){if(isBrowser&&hasArtDirectionSupport(currentData)){// Do we have an image for the current Viewport?
var foundMedia=currentData.findIndex(matchesMedia);if(foundMedia!==-1){return currentData[foundMedia];}// No media matches, select first element without a media condition
var noMedia=currentData.findIndex(function(image){return typeof image.media==="undefined";});if(noMedia!==-1){return currentData[noMedia];}}// Else return the first image.
return currentData[0];};// Cache if we've seen an image before so we don't bother with
// lazy-loading & fading in on subsequent mounts.
var imageCache=Object.create({});var inImageCache=function inImageCache(props){var convertedProps=convertProps(props);var cacheKey=getImageCacheKey(convertedProps);return imageCache[cacheKey]||false;};var activateCacheForImage=function activateCacheForImage(props){var convertedProps=convertProps(props);var cacheKey=getImageCacheKey(convertedProps);if(cacheKey){imageCache[cacheKey]=true;}};// Native lazy-loading support: https://addyosmani.com/blog/lazy-loading/
var hasNativeLazyLoadSupport=typeof HTMLImageElement!=="undefined"&&"loading"in HTMLImageElement.prototype;var isBrowser=typeof window!=="undefined";var hasIOSupport=isBrowser&&window.IntersectionObserver;var io;var listeners=new WeakMap();function getIO(){if(typeof io==="undefined"&&typeof window!=="undefined"&&window.IntersectionObserver){io=new window.IntersectionObserver(function(entries){entries.forEach(function(entry){if(listeners.has(entry.target)){var cb=listeners.get(entry.target);// Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
if(entry.isIntersecting||entry.intersectionRatio>0){io.unobserve(entry.target);listeners.delete(entry.target);cb();}}});},{rootMargin:"200px"});}return io;}function generateImageSources(imageVariants){return imageVariants.map(function(_ref3){var src=_ref3.src,srcSet=_ref3.srcSet,srcSetWebp=_ref3.srcSetWebp,media=_ref3.media,sizes=_ref3.sizes;return/*#__PURE__*/_react.default.createElement(_react.default.Fragment,{key:src},srcSetWebp&&/*#__PURE__*/_react.default.createElement("source",{type:"image/webp",media:media,srcSet:srcSetWebp,sizes:sizes}),/*#__PURE__*/_react.default.createElement("source",{media:media,srcSet:srcSet,sizes:sizes}));});}// Return an array ordered by elements having a media prop, does not use
// native sort, as a stable sort is not guaranteed by all browsers/versions
function groupByMedia(imageVariants){var withMedia=[];var without=[];imageVariants.forEach(function(variant){return(variant.media?withMedia:without).push(variant);});if(without.length>1&&"production"!=="production"){console.warn("We've found "+without.length+" sources without a media property. They might be ignored by the browser, see: https://www.gatsbyjs.org/packages/gatsby-image/#art-directing-multiple-images");}return[].concat(withMedia,without);}function generateTracedSVGSources(imageVariants){return imageVariants.map(function(_ref4){var src=_ref4.src,media=_ref4.media,tracedSVG=_ref4.tracedSVG;return/*#__PURE__*/_react.default.createElement("source",{key:src,media:media,srcSet:tracedSVG});});}function generateBase64Sources(imageVariants){return imageVariants.map(function(_ref5){var src=_ref5.src,media=_ref5.media,base64=_ref5.base64;return/*#__PURE__*/_react.default.createElement("source",{key:src,media:media,srcSet:base64});});}function generateNoscriptSource(_ref6,isWebp){var srcSet=_ref6.srcSet,srcSetWebp=_ref6.srcSetWebp,media=_ref6.media,sizes=_ref6.sizes;var src=isWebp?srcSetWebp:srcSet;var mediaAttr=media?"media=\""+media+"\" ":"";var typeAttr=isWebp?"type='image/webp' ":"";var sizesAttr=sizes?"sizes=\""+sizes+"\" ":"";return"<source "+typeAttr+mediaAttr+"srcset=\""+src+"\" "+sizesAttr+"/>";}function generateNoscriptSources(imageVariants){return imageVariants.map(function(variant){return(variant.srcSetWebp?generateNoscriptSource(variant,true):"")+generateNoscriptSource(variant);}).join("");}var listenToIntersections=function listenToIntersections(el,cb){var observer=getIO();if(observer){observer.observe(el);listeners.set(el,cb);}return function(){observer.unobserve(el);listeners.delete(el);};};var noscriptImg=function noscriptImg(props){// Check if prop exists before adding each attribute to the string output below to prevent
// HTML validation issues caused by empty values like width="" and height=""
var src=props.src?"src=\""+props.src+"\" ":"src=\"\" ";// required attribute
var sizes=props.sizes?"sizes=\""+props.sizes+"\" ":"";var srcSet=props.srcSet?"srcset=\""+props.srcSet+"\" ":"";var title=props.title?"title=\""+props.title+"\" ":"";var alt=props.alt?"alt=\""+props.alt+"\" ":"alt=\"\" ";// required attribute
var width=props.width?"width=\""+props.width+"\" ":"";var height=props.height?"height=\""+props.height+"\" ":"";var crossOrigin=props.crossOrigin?"crossorigin=\""+props.crossOrigin+"\" ":"";var loading=props.loading?"loading=\""+props.loading+"\" ":"";var draggable=props.draggable?"draggable=\""+props.draggable+"\" ":"";var sources=generateNoscriptSources(props.imageVariants);return"<picture>"+sources+"<img "+loading+width+height+sizes+srcSet+src+alt+title+crossOrigin+draggable+"style=\"position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center\"/></picture>";};// Earlier versions of gatsby-image during the 2.x cycle did not wrap
// the `Img` component in a `picture` element. This maintains compatibility
// until a breaking change can be introduced in the next major release
var Placeholder=/*#__PURE__*/_react.default.forwardRef(function(props,ref){var src=props.src,imageVariants=props.imageVariants,generateSources=props.generateSources,spreadProps=props.spreadProps,ariaHidden=props.ariaHidden;var baseImage=/*#__PURE__*/_react.default.createElement(Img,(0,_extends2.default)({ref:ref,src:src},spreadProps,{ariaHidden:ariaHidden}));return imageVariants.length>1?/*#__PURE__*/_react.default.createElement("picture",null,generateSources(imageVariants),baseImage):baseImage;});var Img=/*#__PURE__*/_react.default.forwardRef(function(props,ref){var sizes=props.sizes,srcSet=props.srcSet,src=props.src,style=props.style,onLoad=props.onLoad,onError=props.onError,loading=props.loading,draggable=props.draggable,ariaHidden=props.ariaHidden,otherProps=(0,_objectWithoutPropertiesLoose2.default)(props,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return/*#__PURE__*/_react.default.createElement("img",(0,_extends2.default)({"aria-hidden":ariaHidden,sizes:sizes,srcSet:srcSet,src:src},otherProps,{onLoad:onLoad,onError:onError,ref:ref,loading:loading,draggable:draggable,style:(0,_extends2.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},style)}));});Img.propTypes={style:_propTypes.default.object,onError:_propTypes.default.func,onLoad:_propTypes.default.func};var Image=/*#__PURE__*/function(_React$Component){(0,_inheritsLoose2.default)(Image,_React$Component);function Image(props){var _this;_this=_React$Component.call(this,props)||this;// If this image has already been loaded before then we can assume it's
// already in the browser cache so it's cheap to just show directly.
_this.seenBefore=isBrowser&&inImageCache(props);_this.isCritical=props.loading==="eager"||props.critical;_this.addNoScript=!(_this.isCritical&&!props.fadeIn);_this.useIOSupport=!hasNativeLazyLoadSupport&&hasIOSupport&&!_this.isCritical&&!_this.seenBefore;var isVisible=_this.isCritical||isBrowser&&(hasNativeLazyLoadSupport||!_this.useIOSupport);_this.state={isVisible:isVisible,imgLoaded:false,imgCached:false,fadeIn:!_this.seenBefore&&props.fadeIn};_this.imageRef=/*#__PURE__*/_react.default.createRef();_this.placeholderRef=props.placeholderRef||/*#__PURE__*/_react.default.createRef();_this.handleImageLoaded=_this.handleImageLoaded.bind((0,_assertThisInitialized2.default)(_this));_this.handleRef=_this.handleRef.bind((0,_assertThisInitialized2.default)(_this));return _this;}var _proto=Image.prototype;_proto.componentDidMount=function componentDidMount(){if(this.state.isVisible&&typeof this.props.onStartLoad==="function"){this.props.onStartLoad({wasCached:inImageCache(this.props)});}if(this.isCritical){var img=this.imageRef.current;if(img&&img.complete){this.handleImageLoaded();}}};_proto.componentWillUnmount=function componentWillUnmount(){if(this.cleanUpListeners){this.cleanUpListeners();}}// Specific to IntersectionObserver based lazy-load support
;_proto.handleRef=function handleRef(ref){var _this2=this;if(this.useIOSupport&&ref){this.cleanUpListeners=listenToIntersections(ref,function(){var imageInCache=inImageCache(_this2.props);if(!_this2.state.isVisible&&typeof _this2.props.onStartLoad==="function"){_this2.props.onStartLoad({wasCached:imageInCache});}// imgCached and imgLoaded must update after isVisible,
// Once isVisible is true, imageRef becomes accessible, which imgCached needs access to.
// imgLoaded and imgCached are in a 2nd setState call to be changed together,
// avoiding initiating unnecessary animation frames from style changes.
_this2.setState({isVisible:true},function(){_this2.setState({imgLoaded:imageInCache,// `currentSrc` should be a string, but can be `undefined` in IE,
// !! operator validates the value is not undefined/null/""
// for lazyloaded components this might be null
// TODO fix imgCached behaviour as it's now false when it's lazyloaded
imgCached:!!(_this2.imageRef.current&&_this2.imageRef.current.currentSrc)});});});}};_proto.handleImageLoaded=function handleImageLoaded(){activateCacheForImage(this.props);this.setState({imgLoaded:true});if(this.props.onLoad){this.props.onLoad();}};_proto.render=function render(){var _convertProps=convertProps(this.props),title=_convertProps.title,alt=_convertProps.alt,className=_convertProps.className,_convertProps$style=_convertProps.style,style=_convertProps$style===void 0?{}:_convertProps$style,_convertProps$imgStyl=_convertProps.imgStyle,imgStyle=_convertProps$imgStyl===void 0?{}:_convertProps$imgStyl,_convertProps$placeho=_convertProps.placeholderStyle,placeholderStyle=_convertProps$placeho===void 0?{}:_convertProps$placeho,placeholderClassName=_convertProps.placeholderClassName,fluid=_convertProps.fluid,fixed=_convertProps.fixed,backgroundColor=_convertProps.backgroundColor,durationFadeIn=_convertProps.durationFadeIn,Tag=_convertProps.Tag,itemProp=_convertProps.itemProp,loading=_convertProps.loading,draggable=_convertProps.draggable;var shouldReveal=this.state.fadeIn===false||this.state.imgLoaded;var shouldFadeIn=this.state.fadeIn===true&&!this.state.imgCached;var imageStyle=(0,_extends2.default)({opacity:shouldReveal?1:0,transition:shouldFadeIn?"opacity "+durationFadeIn+"ms":"none"},imgStyle);var bgColor=typeof backgroundColor==="boolean"?"lightgray":backgroundColor;var delayHideStyle={transitionDelay:durationFadeIn+"ms"};var imagePlaceholderStyle=(0,_extends2.default)({opacity:this.state.imgLoaded?0:1},shouldFadeIn&&delayHideStyle,imgStyle,placeholderStyle);var placeholderImageProps={title:title,alt:!this.state.isVisible?alt:"",style:imagePlaceholderStyle,className:placeholderClassName,itemProp:itemProp};if(fluid){var imageVariants=fluid;var image=getCurrentSrcData(fluid);return/*#__PURE__*/_react.default.createElement(Tag,{className:(className?className:"")+" gatsby-image-wrapper",style:(0,_extends2.default)({position:"relative",overflow:"hidden",maxWidth:image.maxWidth?image.maxWidth+"px":null,maxHeight:image.maxHeight?image.maxHeight+"px":null},style),ref:this.handleRef,key:"fluid-"+JSON.stringify(image.srcSet)},/*#__PURE__*/_react.default.createElement(Tag,{"aria-hidden":true,style:{width:"100%",paddingBottom:100/image.aspectRatio+"%"}}),bgColor&&/*#__PURE__*/_react.default.createElement(Tag,{"aria-hidden":true,title:title,style:(0,_extends2.default)({backgroundColor:bgColor,position:"absolute",top:0,bottom:0,opacity:!this.state.imgLoaded?1:0,right:0,left:0},shouldFadeIn&&delayHideStyle)}),image.base64&&/*#__PURE__*/_react.default.createElement(Placeholder,{ariaHidden:true,ref:this.placeholderRef,src:image.base64,spreadProps:placeholderImageProps,imageVariants:imageVariants,generateSources:generateBase64Sources}),image.tracedSVG&&/*#__PURE__*/_react.default.createElement(Placeholder,{ariaHidden:true,ref:this.placeholderRef,src:image.tracedSVG,spreadProps:placeholderImageProps,imageVariants:imageVariants,generateSources:generateTracedSVGSources}),this.state.isVisible&&/*#__PURE__*/_react.default.createElement("picture",null,generateImageSources(imageVariants),/*#__PURE__*/_react.default.createElement(Img,{alt:alt,title:title,sizes:image.sizes,src:image.src,crossOrigin:this.props.crossOrigin,srcSet:image.srcSet,style:imageStyle,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:itemProp,loading:loading,draggable:draggable})),this.addNoScript&&/*#__PURE__*/_react.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:noscriptImg((0,_extends2.default)({alt:alt,title:title,loading:loading},image,{imageVariants:imageVariants}))}}));}if(fixed){var _imageVariants=fixed;var _image=getCurrentSrcData(fixed);var divStyle=(0,_extends2.default)({position:"relative",overflow:"hidden",display:"inline-block",width:_image.width,height:_image.height},style);if(style.display==="inherit"){delete divStyle.display;}return/*#__PURE__*/_react.default.createElement(Tag,{className:(className?className:"")+" gatsby-image-wrapper",style:divStyle,ref:this.handleRef,key:"fixed-"+JSON.stringify(_image.srcSet)},bgColor&&/*#__PURE__*/_react.default.createElement(Tag,{"aria-hidden":true,title:title,style:(0,_extends2.default)({backgroundColor:bgColor,width:_image.width,opacity:!this.state.imgLoaded?1:0,height:_image.height},shouldFadeIn&&delayHideStyle)}),_image.base64&&/*#__PURE__*/_react.default.createElement(Placeholder,{ariaHidden:true,ref:this.placeholderRef,src:_image.base64,spreadProps:placeholderImageProps,imageVariants:_imageVariants,generateSources:generateBase64Sources}),_image.tracedSVG&&/*#__PURE__*/_react.default.createElement(Placeholder,{ariaHidden:true,ref:this.placeholderRef,src:_image.tracedSVG,spreadProps:placeholderImageProps,imageVariants:_imageVariants,generateSources:generateTracedSVGSources}),this.state.isVisible&&/*#__PURE__*/_react.default.createElement("picture",null,generateImageSources(_imageVariants),/*#__PURE__*/_react.default.createElement(Img,{alt:alt,title:title,width:_image.width,height:_image.height,sizes:_image.sizes,src:_image.src,crossOrigin:this.props.crossOrigin,srcSet:_image.srcSet,style:imageStyle,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:itemProp,loading:loading,draggable:draggable})),this.addNoScript&&/*#__PURE__*/_react.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:noscriptImg((0,_extends2.default)({alt:alt,title:title,loading:loading},_image,{imageVariants:_imageVariants}))}}));}return null;};return Image;}(_react.default.Component);Image.defaultProps={fadeIn:true,durationFadeIn:500,alt:"",Tag:"div",// We set it to `lazy` by default because it's best to default to a performant
// setting and let the user "opt out" to `eager`
loading:"lazy"};var fixedObject=_propTypes.default.shape({width:_propTypes.default.number.isRequired,height:_propTypes.default.number.isRequired,src:_propTypes.default.string.isRequired,srcSet:_propTypes.default.string.isRequired,base64:_propTypes.default.string,tracedSVG:_propTypes.default.string,srcWebp:_propTypes.default.string,srcSetWebp:_propTypes.default.string,media:_propTypes.default.string});var fluidObject=_propTypes.default.shape({aspectRatio:_propTypes.default.number.isRequired,src:_propTypes.default.string.isRequired,srcSet:_propTypes.default.string.isRequired,sizes:_propTypes.default.string.isRequired,base64:_propTypes.default.string,tracedSVG:_propTypes.default.string,srcWebp:_propTypes.default.string,srcSetWebp:_propTypes.default.string,media:_propTypes.default.string,maxWidth:_propTypes.default.number,maxHeight:_propTypes.default.number});function requireFixedOrFluid(originalPropTypes){return function(props,propName,componentName){var _PropTypes$checkPropT;if(!props.fixed&&!props.fluid){throw new Error("The prop `fluid` or `fixed` is marked as required in `"+componentName+"`, but their values are both `undefined`.");}_propTypes.default.checkPropTypes((_PropTypes$checkPropT={},_PropTypes$checkPropT[propName]=originalPropTypes,_PropTypes$checkPropT),props,"prop",componentName);};}// If you modify these propTypes, please don't forget to update following files as well:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-image/index.d.ts
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-image/README.md#gatsby-image-props
// https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/gatsby-image.md#gatsby-image-props
Image.propTypes={resolutions:fixedObject,sizes:fluidObject,fixed:requireFixedOrFluid(_propTypes.default.oneOfType([fixedObject,_propTypes.default.arrayOf(fixedObject)])),fluid:requireFixedOrFluid(_propTypes.default.oneOfType([fluidObject,_propTypes.default.arrayOf(fluidObject)])),fadeIn:_propTypes.default.bool,durationFadeIn:_propTypes.default.number,title:_propTypes.default.string,alt:_propTypes.default.string,className:_propTypes.default.oneOfType([_propTypes.default.string,_propTypes.default.object]),// Support Glamor's css prop.
critical:_propTypes.default.bool,crossOrigin:_propTypes.default.oneOfType([_propTypes.default.string,_propTypes.default.bool]),style:_propTypes.default.object,imgStyle:_propTypes.default.object,placeholderStyle:_propTypes.default.object,placeholderClassName:_propTypes.default.string,backgroundColor:_propTypes.default.oneOfType([_propTypes.default.string,_propTypes.default.bool]),onLoad:_propTypes.default.func,onError:_propTypes.default.func,onStartLoad:_propTypes.default.func,Tag:_propTypes.default.string,itemProp:_propTypes.default.string,loading:_propTypes.default.oneOf(["auto","lazy","eager"]),draggable:_propTypes.default.bool};var _default=Image;exports.default=_default;

/***/ }),

/***/ "H8eV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ERkP");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Vgyk");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Wbzz");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("l1C2");
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */





var SEO = function SEO(_ref) {
  var description = _ref.description,
      lang = _ref.lang,
      meta = _ref.meta,
      title = _ref.title;

  var _useStaticQuery = Object(gatsby__WEBPACK_IMPORTED_MODULE_2__["useStaticQuery"])("2841359383"),
      site = _useStaticQuery.site;

  var metaDescription = description || site.siteMetadata.description;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_3__[/* jsx */ "a"])(react_helmet__WEBPACK_IMPORTED_MODULE_1__[/* Helmet */ "a"], {
    htmlAttributes: {
      lang: lang
    },
    title: title,
    titleTemplate: "%s | " + site.siteMetadata.title,
    meta: [{
      name: "description",
      content: metaDescription
    }, {
      property: "og:title",
      content: title
    }, {
      property: "og:description",
      content: metaDescription
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }, {
      name: "twitter:creator",
      content: site.siteMetadata.social.twitter
    }, {
      name: "twitter:title",
      content: title
    }, {
      name: "twitter:description",
      content: metaDescription
    }].concat(meta)
  });
};

SEO.defaultProps = {
  lang: "en",
  meta: [],
  description: ""
};
/* harmony default export */ __webpack_exports__["a"] = (SEO);

/***/ }),

/***/ "IgZc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fhSp");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ERkP");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Wbzz");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("j/s1");
/* harmony import */ var gatsby_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("6c1n");
/* harmony import */ var gatsby_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(gatsby_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("rB5o");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("l1C2");


function _templateObject2() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n  margin-right: ", ";\n  margin-bottom: 0;\n  min-width: 50;\n  border-radius: \"100%\";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n  display: flex;\n  margin-bottom: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}







var Container = styled_components__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].div(_templateObject(), Object(_utils_typography__WEBPACK_IMPORTED_MODULE_5__[/* rhythm */ "a"])(2.5));
var StyledImage = Object(styled_components__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(gatsby_image__WEBPACK_IMPORTED_MODULE_4___default.a)(_templateObject2(), Object(_utils_typography__WEBPACK_IMPORTED_MODULE_5__[/* rhythm */ "a"])(1 / 2));

var Bio = function Bio() {
  var data = Object(gatsby__WEBPACK_IMPORTED_MODULE_2__["useStaticQuery"])("1809740707");
  var _data$site$siteMetada = data.site.siteMetadata,
      author = _data$site$siteMetada.author,
      social = _data$site$siteMetada.social;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__[/* jsx */ "a"])(Container, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__[/* jsx */ "a"])(StyledImage, {
    alt: author.name //@ts-ignore
    ,
    fixed: data.avatar.childImageSharp.fixed,
    imgStyle: {
      borderRadius: "50%"
    }
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__[/* jsx */ "a"])("p", null, "Written by ", Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__[/* jsx */ "a"])("strong", null, author.name), " ", author.summary, " ", Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__[/* jsx */ "a"])("a", {
    href: "https://twitter.com/" + social.twitter
  }, "You should follow him on Twitter")));
};

/* harmony default export */ __webpack_exports__["a"] = (Bio);

/***/ }),

/***/ "rB5o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rhythm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return scale; });
/* harmony import */ var typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("00yV");
/* harmony import */ var typography__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typography__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vykP");
/* harmony import */ var typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1__);


var typography = new typography__WEBPACK_IMPORTED_MODULE_0___default.a(typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1___default.a); // // Hot reload typography in development.
// if (process.env.NODE_ENV !== `production`) {
//   typography.injectStyles()
// }

var rhythm = typography.rhythm;
var scale = typography.scale;
/* unused harmony default export */ var _unused_webpack_default_export = (typography);

/***/ }),

/***/ "u88y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LARGER_DISPLAY_WIDTH = exports.LARGER_DISPLAY_WIDTH = "1600px";
var LARGE_DISPLAY_WIDTH = exports.LARGE_DISPLAY_WIDTH = "1280px";
var DEFAULT_WIDTH = exports.DEFAULT_WIDTH = "980px";
var TABLET_WIDTH = exports.TABLET_WIDTH = "768px";
var MOBILE_WIDTH = exports.MOBILE_WIDTH = "480px";
var LARGER_DISPLAY_MEDIA_QUERY = exports.LARGER_DISPLAY_MEDIA_QUERY = "@media only screen and (max-width:1600px)";
var LARGE_DISPLAY_MEDIA_QUERY = exports.LARGE_DISPLAY_MEDIA_QUERY = "@media only screen and (max-width:1280px)";
var DEFAULT_MEDIA_QUERY = exports.DEFAULT_MEDIA_QUERY = "@media only screen and (max-width:980px)";
var TABLET_MEDIA_QUERY = exports.TABLET_MEDIA_QUERY = "@media only screen and (max-width:768px)";
var MOBILE_MEDIA_QUERY = exports.MOBILE_MEDIA_QUERY = "@media only screen and (max-width:480px)";
var MIN_LARGER_DISPLAY_MEDIA_QUERY = exports.MIN_LARGER_DISPLAY_MEDIA_QUERY = "@media (min-width:1600px)";
var MIN_LARGE_DISPLAY_MEDIA_QUERY = exports.MIN_LARGE_DISPLAY_MEDIA_QUERY = "@media (min-width:1280px)";
var MIN_DEFAULT_MEDIA_QUERY = exports.MIN_DEFAULT_MEDIA_QUERY = "@media (min-width:980px)";
var MIN_TABLET_MEDIA_QUERY = exports.MIN_TABLET_MEDIA_QUERY = "@media (min-width:768px)";
var MIN_MOBILE_MEDIA_QUERY = exports.MIN_MOBILE_MEDIA_QUERY = "@media (min-width:480px)";

/***/ }),

/***/ "vykP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _grayPercentage = __webpack_require__("xRce");

var _grayPercentage2 = _interopRequireDefault(_grayPercentage);

var _typographyBreakpointConstants = __webpack_require__("u88y");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var theme = {
  title: "Wordpress Theme 2016",
  baseFontSize: "16px",
  baseLineHeight: 1.75,
  scaleRatio: 5 / 2,
  googleFonts: [{
    name: "Montserrat",
    styles: ["700"]
  }, {
    name: "Merriweather",
    styles: ["400", "400i", "700", "700i", "900", "900i"]
  }],
  headerFontFamily: ["Merriweather", "Georgia", "serif"],
  bodyFontFamily: ["Merriweather", "Georgia", "serif"],
  bodyColor: "hsla(0,0%,0%,0.9)",
  headerWeight: 900,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: function overrideStyles(_ref, options) {
    var _ref2;

    var adjustFontSizeTo = _ref.adjustFontSizeTo,
        scale = _ref.scale,
        rhythm = _ref.rhythm;
    return _ref2 = {
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(",")
      },
      blockquote: _extends({}, scale(1 / 5), {
        color: (0, _grayPercentage2.default)(41),
        fontStyle: "italic",
        paddingLeft: rhythm(13 / 16),
        marginLeft: rhythm(-1),
        borderLeft: rhythm(3 / 16) + " solid " + (0, _grayPercentage2.default)(10)
      }),
      "blockquote > :last-child": {
        marginBottom: 0
      },
      "blockquote cite": _extends({}, adjustFontSizeTo(options.baseFontSize), {
        color: options.bodyColor,
        fontWeight: options.bodyWeight
      }),
      "blockquote cite:before": {
        content: '"— "'
      },
      ul: {
        listStyle: "disc"
      },
      "ul,ol": {
        marginLeft: 0
      }
    }, _defineProperty(_ref2, _typographyBreakpointConstants.MOBILE_MEDIA_QUERY, {
      "ul,ol": {
        marginLeft: rhythm(1)
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16)
      }
    }), _defineProperty(_ref2, "h1,h2,h3,h4,h5,h6", {
      marginTop: rhythm(2)
    }), _defineProperty(_ref2, "h4", {
      letterSpacing: "0.140625em",
      textTransform: "uppercase"
    }), _defineProperty(_ref2, "h6", {
      fontStyle: "italic"
    }), _defineProperty(_ref2, "a", {
      boxShadow: "0 1px 0 0 currentColor",
      color: "#007acc",
      textDecoration: "none"
    }), _defineProperty(_ref2, "a:hover,a:active", {
      boxShadow: "none"
    }), _defineProperty(_ref2, "mark,ins", {
      background: "#007acc",
      color: "white",
      padding: rhythm(1 / 16) + " " + rhythm(1 / 8),
      textDecoration: "none"
    }), _ref2;
  }
};
exports.default = theme;

/***/ }),

/***/ "xRce":
/***/ (function(module, exports) {

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function (lightness, hue, darkBackground) {
  if (typeof hue === "undefined") {
    hue = 0;
  }

  if (typeof darkBackground === "undefined") {
    darkBackground = false;
  } // Convert named hues into numeric lightness value.


  if (hue === "cool") {
    hue = 237;
  } else if (hue === "slate") {
    hue = 122;
  } else if (hue === "warm") {
    hue = 69;
  }

  if (!isNumeric(hue)) {
    throw new Error("Hue is not a number");
  }

  if (!isNumeric(lightness)) {
    throw new Error("Lightness is not a number");
  }

  if (lightness > 100) {
    lightness = 100;
  }

  if (lightness < 0) {
    lightness = 0;
  }

  var saturation = 0;

  if (hue !== 0) {
    var a = 19.92978;
    var b = -0.3651759;
    var c = 0.001737214;
    saturation = a + b * lightness + c * Math.pow(lightness, 2);
  }

  var opacity = 0;

  if (darkBackground) {
    opacity = lightness / 100;
    lightness = '100%,';
  } else {
    opacity = (100 - lightness) / 100;
    lightness = '0%,';
  }

  return "hsla(" + hue + "," + saturation + "%," + lightness + opacity + ")";
};

/***/ })

}]);