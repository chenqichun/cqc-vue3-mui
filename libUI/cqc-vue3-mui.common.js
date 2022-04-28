/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 7741:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 2104:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 8340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 6277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(1340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var global = __webpack_require__(7854);
var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var TypeError = global.TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 2626:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(3070).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 1320:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var setGlobal = __webpack_require__(3505);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 3505:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var setGlobal = __webpack_require__(3505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.22.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.22.2/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var requireObjectCoercible = __webpack_require__(4488);

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var classof = __webpack_require__(648);

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 9191:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var isPrototypeOf = __webpack_require__(7976);
var setPrototypeOf = __webpack_require__(7674);
var copyConstructorProperties = __webpack_require__(9920);
var proxyAccessor = __webpack_require__(2626);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var installErrorCause = __webpack_require__(8340);
var clearErrorStack = __webpack_require__(7741);
var ERROR_STACK_INSTALLABLE = __webpack_require__(2914);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 1703:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var apply = __webpack_require__(2104);
var wrapErrorConstructorWithCause = __webpack_require__(9191);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 3744:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.Z = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "LoadMore": function() { return /* reexport */ packages_load_more; },
  "Loading": function() { return /* reexport */ loading_loading; },
  "Progress": function() { return /* reexport */ packages_progress; },
  "Range": function() { return /* reexport */ packages_range; },
  "Scroll": function() { return /* reexport */ packages_scroll; },
  "SignBoard": function() { return /* reexport */ packages_sign_board; },
  "Slide": function() { return /* reexport */ packages_slide; },
  "Switch": function() { return /* reexport */ packages_switch; },
  "Toast": function() { return /* reexport */ toast_toast; },
  "default": function() { return /* binding */ entry_lib; },
  "infiniteScroll": function() { return /* reexport */ infinite_scroll; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./src/packages/base/index.js

/* harmony default export */ var base = ({});
;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/toast/toast.vue?vue&type=template&id=842bd742

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Transition, {
    name: "cqc-toast"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(["cqc-toast", $setup.customClass]),
      style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)({
        padding: _ctx.icon ? '14px' : '10px'
      })
    }, [_ctx.icon ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("i", {
      key: 0,
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(['cqc-icon', 'cqc-icon-' + _ctx.icon])
    }, null, 2)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
      class: "cqc-toast-text",
      style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)({
        padding: _ctx.icon ? '10px' : '0px'
      })
    }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(_ctx.message), 5)], 6), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $setup.visible]])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./src/packages/toast/toast.vue?vue&type=template&id=842bd742

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/toast/toast.vue?vue&type=script&lang=js

/* harmony default export */ var toastvue_type_script_lang_js = ({
  name: 'CqcToast',

  setup() {
    const state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      message: '',
      icon: '',
      className: '',
      position: 'middle'
    });
    const customClass = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      let classess = [];

      if (['top', 'middle', 'bottom'].includes(state.position)) {
        classess.push(`cqc-toast-${state.position}`);
      }

      if (state.className) classess.push(state.className);
      return classess;
    });
    const visible = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(false);
    return {
      customClass,
      visible,
      ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state)
    };
  }

});
;// CONCATENATED MODULE: ./src/packages/toast/toast.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(3744);
;// CONCATENATED MODULE: ./src/packages/toast/toast.vue




;
const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(toastvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var toast = (__exports__);
;// CONCATENATED MODULE: ./src/packages/toast/toast.js


let currentInstance;

let getInstance = () => {
  let vm;
  if (currentInstance) return currentInstance;
  const wrapper = document.createElement('div');
  vm = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createApp)(toast);
  currentInstance = vm.mount(wrapper);
  currentInstance.unmount = vm.unmount.bind(vm);
  currentInstance.wrapper = wrapper;
  return currentInstance;
};

let destory = function () {
  if (this.wrapper && this.wrapper.parentNode) {
    this.wrapper.parentNode.removeChild(this.wrapper);
  }

  this.unmount();
  currentInstance = null;
};

let toast_close = function () {
  this.visible = false;
  this.$el.addEventListener('transitionend', () => {
    this.closed = true;

    this._destory();
  });
};

const Toast = (options = {}) => {
  const instance = getInstance();
  instance.closed = false;
  instance._destory = destory.bind(instance);
  instance.close = toast_close.bind(instance);
  clearTimeout(instance.timer);
  instance.message = typeof options === 'object' ? options.message : options;
  instance.position = options.position || 'middle';
  instance.icon = options.icon || '';
  instance.className = options.className || '';
  const duration = options.duration || 2500;
  document.body.appendChild(instance.wrapper);
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
    instance.visible = true;
    instance.timer = setTimeout(() => {
      if (instance.closed) return;
      instance.close();
    }, duration);
  });
  return instance;
};

/* harmony default export */ var toast_toast = (Toast);
;// CONCATENATED MODULE: ./src/packages/toast/index.js


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/loading/loading.vue?vue&type=template&id=fe462920

const _hoisted_1 = {
  class: "cqc-loading"
};
const _hoisted_2 = {
  class: "cqc-loading-wrapper"
};

const _hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("i", {
  class: "cqc-icon cqc-icon-loading"
}, null, -1);

const _hoisted_4 = {
  key: 0,
  class: "cqc-loading-text"
};
function loadingvue_type_template_id_fe462920_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Transition, {
    name: "cqc-loading"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_2, [_hoisted_3, _ctx.text ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(_ctx.text), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), _ctx.mask ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
      key: 0,
      class: "cqc-loading-mask",
      onTouchmove: _cache[0] || (_cache[0] = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withModifiers)(() => {}, ["stop", "prevent"]))
    }, null, 32)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, _ctx.visible]])]),
    _: 1
  });
}
;// CONCATENATED MODULE: ./src/packages/loading/loading.vue?vue&type=template&id=fe462920

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/loading/loading.vue?vue&type=script&lang=js

/* harmony default export */ var loadingvue_type_script_lang_js = ({
  setup() {
    const state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      text: '',
      mask: true,
      visible: false
    });
    return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state)
    };
  }

});
;// CONCATENATED MODULE: ./src/packages/loading/loading.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/packages/loading/loading.vue




;
const loading_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(loadingvue_type_script_lang_js, [['render',loadingvue_type_template_id_fe462920_render]])

/* harmony default export */ var loading = (loading_exports_);
;// CONCATENATED MODULE: ./src/packages/loading/loading.js


let instance;
/* harmony default export */ var loading_loading = ({
  open(options = {}) {
    if (!instance) {
      const wrapper = document.createElement('div');
      const vm = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createApp)(loading);
      instance = vm.mount(wrapper);
      instance.wrapper = wrapper;
    }

    if (instance.visible) return;
    instance.text = options.text || "";
    instance.mask = options.mask || true;

    if (instance.wrapper) {
      document.body.appendChild(instance.wrapper);
    }

    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
      instance.visible = true;
    });
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  }

});
;// CONCATENATED MODULE: ./src/packages/loading/index.js


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/load-more/load-more.vue?vue&type=template&id=7f021474

const load_morevue_type_template_id_7f021474_hoisted_1 = {
  class: "cqc-load-more",
  ref: "loadMore"
};
const load_morevue_type_template_id_7f021474_hoisted_2 = {
  key: 0,
  class: "cqc-load-more-top"
};
const load_morevue_type_template_id_7f021474_hoisted_3 = {
  class: "cqc-icon cqc-icon-loading"
};
const load_morevue_type_template_id_7f021474_hoisted_4 = {
  key: 1,
  class: "cqc-load-more-bottom"
};
const _hoisted_5 = {
  key: 0,
  class: "cqc-icon cqc-icon-loading"
};
function load_morevue_type_template_id_7f021474_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", load_morevue_type_template_id_7f021474_hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(["cqc-load-more-content", {
      'isdropped': _ctx.topDropped || _ctx.bottomDropped
    }]),
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)({
      transform: $setup.transform
    })
  }, [$props.topMethod ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", load_morevue_type_template_id_7f021474_hoisted_2, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", {
    class: "cqc-load-more-text"
  }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($setup.topText), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, _ctx.topStatus !== 'loading']]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("i", load_morevue_type_template_id_7f021474_hoisted_3, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, _ctx.topStatus === 'loading']])])) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "default"), $props.bottomMethod ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", load_morevue_type_template_id_7f021474_hoisted_4, [_ctx.bottomDropped ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("i", _hoisted_5)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)])) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)], 6)], 512);
}
;// CONCATENATED MODULE: ./src/packages/load-more/load-more.vue?vue&type=template&id=7f021474

;// CONCATENATED MODULE: ./src/packages/load-more/loadUtils.js
function getScrollEventTarget(element) {
  let currentNode = element;

  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    let overflowY = window.getComputedStyle(currentNode).overflowY;

    if (overflowY === 'auto' || overflowY === 'scroll') {
      return currentNode;
    }

    currentNode = currentNode.parentNode;
  }

  return window;
}
function getScrollTop(element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
  }

  return element.scrollTop;
}
function throttle(func, delay = 50) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      func.apply(this, args);
      timer = 0;
      return;
    }

    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = 0;
    }, delay);
  };
}
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/load-more/load-more.vue?vue&type=script&lang=js


/* harmony default export */ var load_morevue_type_script_lang_js = ({
  name: 'CqcLoadMore',
  props: {
    topMethod: Function,
    bottomMethod: Function,
    finished: {
      type: Boolean,
      default: false
    },
    bottomDistance: {
      type: Number,
      default: 100
    }
  },

  setup(props) {
    const loadMore = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    const radio = 0.5;
    let direcition; // 是上拉还是下拉

    const conditionDistance = 50; // 

    let startScrollTop = 0;
    let canmove = false;
    const state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      topDropped: false,
      bottomDropped: false,
      translate: 0,
      topStatus: ''
    });
    let loadNode, scrollEventTarget;
    let starty;
    const transform = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      return `translate3d(0, ${state.translate}px, 0)`;
    });
    const topText = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      switch (state.topStatus) {
        case 'pull':
          return '下拉刷新';

        case 'drop':
          return '释放更新';

        case 'loading':
          return '加载中...';
      }
    }); // 重置上拉

    const onTopLoaded = () => {
      state.translate = 0;
      setTimeout(() => {
        state.topStatus = 'pull';
        state.topDropped = false;
      }, 200);
    };

    const onBottomLoaded = () => {
      state.bottomDropped = false;
    };

    const touchstart = e => {
      canmove = true;
      starty = e.touches ? e.touches[0].clientY : e.clientY;
      startScrollTop = getScrollTop(scrollEventTarget);

      if (state.topStatus !== 'loading') {
        state.topStatus = 'pull';
        state.topDropped = false;
      }

      if (state.bottomStatus !== 'loading') {
        state.bottomStatus = 'pull';
        state.bottomDropped = false;
      }
    };

    const touchmove = e => {
      if (!canmove) return;
      if (starty < loadNode.getBoundingClientRect().top || starty > loadNode.getBoundingClientRect().bottom) return;
      let clientY = e.touches ? e.touches[0].clientY : e.clientY;
      let distance = (clientY - starty) * radio;
      direcition = distance > 0 ? 'down' : 'up';

      if (typeof props.topMethod === 'function' && direcition === 'down' && getScrollTop(scrollEventTarget) === 0 && state.topStatus !== 'loading') {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        state.translate = distance - startScrollTop;
        if (state.translate < 0) state.translate = 0;
        state.topStatus = distance > conditionDistance ? 'drop' : 'pull';
      }
    };

    const touchend = e => {
      canmove = false;

      if (direcition === 'down' && props.topMethod && getScrollTop(scrollEventTarget) === 0 && state.translate > 0) {
        state.topDropped = true;

        if (state.topStatus === 'drop') {
          state.translate = 50;
          state.topStatus = 'loading';
          props.topMethod();
        } else {
          state.topStatus = 'pull';
          state.translate = 0;
        }
      }
    };

    const scroll = throttle(e => {
      if (!props.finished && typeof props.bottomMethod === 'function' && !state.bottomDropped) {
        e.stopPropagation();

        if (scrollEventTarget.scrollHeight - getScrollTop(scrollEventTarget) - scrollEventTarget.clientHeight < props.bottomDistance) {
          state.bottomDropped = true;
          props.bottomMethod();
        }
      }
    });
    const eventMap = {
      touchstart,
      touchmove,
      touchend,
      mousedown: touchstart,
      mousemove: touchmove,
      mouseup: touchend
    };

    const bindTouchEvents = () => {
      Object.entries(eventMap).forEach(([key, event]) => {
        loadNode.addEventListener(key, event);
      });
      scrollEventTarget.addEventListener('scroll', scroll);
    };

    const init = () => {
      loadNode = loadMore.value;
      scrollEventTarget = getScrollEventTarget(loadNode);
      bindTouchEvents();
    };

    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
        init();
      });
    });
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
      Object.entries(eventMap).forEach(([key, event]) => {
        loadNode.removeEventListener(key, event);
      });
      scrollEventTarget.removeEventListener('scroll', scroll);
      window.removeEventListener('mouseup', touchend);
    });
    return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
      loadMore,
      transform,
      onTopLoaded,
      onBottomLoaded,
      topText
    };
  }

});
;// CONCATENATED MODULE: ./src/packages/load-more/load-more.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/packages/load-more/load-more.vue




;
const load_more_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(load_morevue_type_script_lang_js, [['render',load_morevue_type_template_id_7f021474_render]])

/* harmony default export */ var load_more = (load_more_exports_);
;// CONCATENATED MODULE: ./src/packages/load-more/index.js



load_more.install = app => app.component(load_more.name, load_more);

/* harmony default export */ var packages_load_more = (load_more);
;// CONCATENATED MODULE: ./src/packages/infinite-scroll/infinite-scroll.js
const attributes = {
  delay: {
    default: 100
  },
  immediate: {
    default: true
  },
  disabled: {
    default: false
  },
  distance: {
    default: 10
  }
};
const scoped = 'infinite-scroll';

var getScrollOptions = function (el, vm) {
  return Object.entries(attributes).reduce((map, [key, option]) => {
    let defaultValue = option.default;
    let value = el.getAttribute(`infinite-scroll-${key}`);

    if (value) {
      value = vm[value] !== undefined ? vm[value] : value;
    } else {
      value = defaultValue;
    }

    map[key] = ['delay', 'distance'].includes(key) ? +value : value;
    return map;
  }, {});
};

var getScrollContainer = function (element) {
  let currentNode = element;

  while (document.documentElement !== currentNode) {
    let overflowY = window.getComputedStyle(currentNode).overflowY;

    if (overflowY === 'auto' || overflowY === 'scroll') {
      return currentNode;
    }

    currentNode = currentNode.parentNode;
  }

  return window;
};

var scrollEvent = function (cb) {
  const {
    container,
    el,
    vm,
    options,
    observer
  } = this[scoped];
  let {
    disabled
  } = getScrollOptions(el, vm);
  if (disabled) return;

  if (container.scrollHeight - container.scrollTop - container.clientHeight < options.distance) {
    cb();
  } else {
    if (observer) {
      observer.disconnect();
      this[scoped].observer = null;
    }
  }
};

function infinite_scroll_throttle(func, delay = 50) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      func.apply(this, args);
      timer = 0;
      return;
    }

    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = 0;
    }, delay);
  };
}

/* harmony default export */ var infinite_scroll = ({
  name: 'infinite-scroll',

  mounted(el, bingding, vnode) {
    const cb = bingding.value;
    const vm = bingding.instance;
    const container = getScrollContainer(el);

    if (container !== window) {
      let options = getScrollOptions(el, vm);
      const onscorll = infinite_scroll_throttle(scrollEvent.bind(el, cb), options.delay);
      container.addEventListener('scroll', onscorll);
      el[scoped] = {
        onscorll,
        container,
        options,
        el,
        vm
      };

      if (options.immediate) {
        const observer = el[scoped].observer = new MutationObserver(onscorll);
        observer.observe(container, {
          childList: true,
          subtree: true
        });
        onscorll();
      }
    }
  },

  unmounted(el) {
    const {
      container,
      onscorll
    } = el[scoped];
    container.removeEventListener('scroll', onscorll);
    el[scoped] = null;
  }

});
;// CONCATENATED MODULE: ./src/packages/infinite-scroll/index.js

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/range/range.vue?vue&type=template&id=b99b92d6

const rangevue_type_template_id_b99b92d6_hoisted_1 = {
  class: "cqc-range-text"
};
const rangevue_type_template_id_b99b92d6_hoisted_2 = {
  key: 1
};
const rangevue_type_template_id_b99b92d6_hoisted_3 = {
  class: "cqc-range-wrapper",
  ref: "range"
};
const rangevue_type_template_id_b99b92d6_hoisted_4 = {
  class: "cqc-range-text"
};
const rangevue_type_template_id_b99b92d6_hoisted_5 = {
  key: 1
};
function rangevue_type_template_id_b99b92d6_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
    class: "cqc-range",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)({
      height: $props.thumbWidth + 'px'
    })
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", rangevue_type_template_id_b99b92d6_hoisted_1, [_ctx.$slots.startText ? (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "startText", {
    key: 0
  }) : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("span", rangevue_type_template_id_b99b92d6_hoisted_2, "0"))]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", rangevue_type_template_id_b99b92d6_hoisted_3, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
    class: "cqc-range-way",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)($setup.wayStyle)
  }, null, 4), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
    class: "cqc-range-progress",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)($setup.progressStyle)
  }, null, 4), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
    class: "cqc-range-thumb",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)({ ...$setup.thumbStyle,
      transform: $setup.transform
    })
  }, null, 4)], 512), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", rangevue_type_template_id_b99b92d6_hoisted_4, [_ctx.$slots.endText ? (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "endText", {
    key: 0
  }) : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("span", rangevue_type_template_id_b99b92d6_hoisted_5, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($setup.percentage) + "\\100", 1))])], 4);
}
;// CONCATENATED MODULE: ./src/packages/range/range.vue?vue&type=template&id=b99b92d6

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/range/range.vue?vue&type=script&lang=js

/* harmony default export */ var rangevue_type_script_lang_js = ({
  name: 'CqcRange',
  props: {
    thumbWidth: {
      type: Number,
      default: 30
    },
    thumbColor: {
      type: String,
      default: '#fff'
    },
    height: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '#26a2ff'
    },
    bgColor: {
      type: String,
      default: '#a9acb1'
    },
    current: {
      type: Number,
      default: 0
    }
  },

  setup(props, {
    emit
  }) {
    let range = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    let rangeWidth = 1;
    let touchStartx = 0;
    let oleOffsetX = 0;
    let offsetX = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    let canMove = false;
    const transform = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      return `translate3D(${offsetX.value}px, -50%, 0)`;
    });
    const thumbStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      return {
        width: props.thumbWidth + 'px',
        height: props.thumbWidth + 'px',
        background: props.thumbColor
      };
    });
    const wayStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      return {
        right: 0,
        background: props.bgColor,
        height: props.height + 'px'
      };
    });
    const progressStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      return {
        background: props.color,
        width: offsetX.value + 'px',
        height: props.height + 'px'
      };
    });
    const percentage = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      return Math.round(offsetX.value / rangeWidth * 100);
    });

    const touchstart = e => {
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      touchStartx = clientX;
      let x = clientX - range.getBoundingClientRect().left;
      x = x - props.thumbWidth / 2;
      offsetX.value = x > rangeWidth ? rangeWidth : x < 0 ? 0 : x;
      oleOffsetX = offsetX.value;
      canMove = true;
    };

    const touchmove = e => {
      if (!canMove) return;
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let newOffsetX = clientX - touchStartx + oleOffsetX;
      offsetX.value = newOffsetX > rangeWidth ? rangeWidth : newOffsetX < 0 ? 0 : newOffsetX;
      emit('change', Math.round(offsetX.value / rangeWidth * 100), offsetX.value / rangeWidth * 100);
    };

    const touchend = e => {
      canMove = false;
    };

    const events = {
      touchstart,
      touchmove,
      touchend,
      mousedown: touchstart,
      mousemove: touchmove,
      mouseup: touchend
    };

    const touchEvents = () => {
      Object.entries(events).forEach(([key, fn]) => {
        range.addEventListener(key, fn);
      });
      window.addEventListener('touchend', touchend);
    };

    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => props.current, val => {
      offsetX.value = Math.round(val / 100 * rangeWidth);
    }, {
      immediate: true
    });

    const init = () => {
      range = range.value;
      rangeWidth = range.clientWidth - props.thumbWidth;
      offsetX.value = Math.round(props.current / 100 * rangeWidth);
      touchEvents();
    };

    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
      Object.entries(events).forEach(([key, fn]) => {
        range.removeEventListener(key, fn);
      });
      window.removeEventListener('touchend', touchend);
    });
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
        init();
      });
    });
    return {
      wayStyle,
      thumbStyle,
      transform,
      range,
      offsetX,
      progressStyle,
      percentage
    };
  }

});
;// CONCATENATED MODULE: ./src/packages/range/range.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/packages/range/range.vue




;
const range_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(rangevue_type_script_lang_js, [['render',rangevue_type_template_id_b99b92d6_render]])

/* harmony default export */ var range = (range_exports_);
;// CONCATENATED MODULE: ./src/packages/range/index.js



range.install = app => app.component(range.name, range);

/* harmony default export */ var packages_range = (range);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/switch/switch.vue?vue&type=template&id=b4614680

function switchvue_type_template_id_b4614680_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)(['cqc-switch', {
      isDisabled: $props.disabled
    }]),
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)($setup.switchStyle)
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
    class: "cqc-switch-thumb",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)($setup.thumbStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => $setup.handleChange && $setup.handleChange(...args))
  }, null, 4)], 6);
}
;// CONCATENATED MODULE: ./src/packages/switch/switch.vue?vue&type=template&id=b4614680

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/switch/switch.vue?vue&type=script&lang=js

/* harmony default export */ var switchvue_type_script_lang_js = ({
  name: "CqcSwitch",
  props: {
    thumbWidth: {
      type: Number,
      default: 30
    },
    width: {
      type: Number,
      default: 50
    },
    activeColor: {
      type: String,
      default: "#04BE02"
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    checked: {
      type: Boolean,
      default: false
    },
    trueValue: {
      type: [Number, String, Boolean],
      default: true
    },
    falseValue: {
      type: [Number, String, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props, {
    emit
  }) {
    const checked = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(props.checked);
    const diff = props.width - props.thumbWidth;
    const switchStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      borderRadius: props.thumbWidth + 1 + "px",
      height: props.thumbWidth + 1 + "px",
      width: props.width + 1 + "px",
      background: checked.value ? props.activeColor : props.bgColor
    });
    const thumbStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      height: props.thumbWidth + "px",
      width: props.thumbWidth + "px",
      transform: `translateX(${props.checked ? diff : 1}px)`
    });

    const handleChange = () => {
      if (props.disabled) return;
      checked.value = !checked.value;
      switchStyle.background = checked.value ? props.activeColor : props.bgColor;
      thumbStyle.transform = `translateX(${checked.value ? diff : 1}px)`;
      emit('change', checked.value ? props.trueValue : props.falseValue);
    };

    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => props.checked, val => {
      if (props.disabled) return;
      checked.value = val;
      switchStyle.background = checked.value ? props.activeColor : props.bgColor;
      thumbStyle.transform = `translateX(${checked.value ? diff : 1}px)`;
    });
    return {
      switchStyle,
      thumbStyle,
      handleChange
    };
  }

});
;// CONCATENATED MODULE: ./src/packages/switch/switch.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/packages/switch/switch.vue




;
const switch_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(switchvue_type_script_lang_js, [['render',switchvue_type_template_id_b4614680_render]])

/* harmony default export */ var switch_switch = (switch_exports_);
;// CONCATENATED MODULE: ./src/packages/switch/index.js



switch_switch.install = app => app.component(switch_switch.name, switch_switch);

/* harmony default export */ var packages_switch = (switch_switch);
;// CONCATENATED MODULE: ./src/packages/progress/compute.js

function getComputed(props) {
  const relativeStrokeWidth = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
    return (props.strokeWidth / props.width * 100).toFixed(1);
  });
  const radius = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
    if (props.type === 'circle' || props.type === 'dashboard') {
      return parseInt(50 - parseFloat(relativeStrokeWidth.value) / 2, 10);
    } else {
      return 0;
    }
  });
  const trackPath = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
    const _radius = radius.value;
    const isDashboard = props.type === 'dashboard';
    return `
      M 50 50
      m 0 ${isDashboard ? '' : '-'}${_radius}
      a ${_radius} ${_radius} 0 1 1 0 ${isDashboard ? '-' : ''}${_radius * 2}
      a ${_radius} ${_radius} 0 1 1 0 ${isDashboard ? '' : '-'}${_radius * 2}
      `;
  });
  const perimeter = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
    return 2 * Math.PI * radius.value;
  });
  const rate = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
    return props.type === 'dashboard' ? 0.75 : 1;
  });
  const strokeDashoffset = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
    const offset = -1 * perimeter.value * (1 - rate.value) / 2;
    return `${offset}px`;
  });
  const trailPathStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
    return {
      strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value
    };
  });
  const circlePathStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
    let percentage = props.percentage;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    return {
      strokeDasharray: `${perimeter.value * rate.value * (percentage / 100)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
    };
  });
  return {
    trackPath,
    trailPathStyle,
    circlePathStyle,
    relativeStrokeWidth
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(1703);
;// CONCATENATED MODULE: ./src/packages/progress/props.js

/* harmony default export */ var props = ({
  type: {
    type: String,
    default: 'line',

    validator(val) {
      const types = ['line', 'circle', 'dashboard'];

      if (val && !types.includes(val)) {
        throw new Error(`cqc-button的type属性必须为:${types.join(',')}中的一个`);
      }

      return true;
    }

  },
  percentage: {
    type: Number,
    default: 0
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  width: {
    type: Number,
    default: 50
  },
  color: {
    type: String,
    default: '#409EFF'
  },
  bgColor: {
    type: String,
    default: '#ebeef5'
  },
  radius: {
    type: Boolean,
    default: true
  },
  showText: {
    type: Boolean,
    default: true
  },
  textPosition: {
    type: String,
    default: 'center'
  },
  strokeLinecap: {
    type: String,
    default: 'round'
  }
});
;// CONCATENATED MODULE: ./src/packages/progress/progress.jsx




/* harmony default export */ var progress = ({
  name: 'CqcProgress',
  props: props,

  setup(props, {
    slots
  }) {
    const instanceRef = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    const {
      percentage
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    let _width = 0;
    const styles = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      height: props.strokeWidth + 'px',
      backgroundColor: props.bgColor,
      borderRadius: props.radius ? props.strokeWidth + 'px' : 0
    });
    const barStyles = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      backgroundColor: props.color,
      borderRadius: props.radius ? props.strokeWidth + 'px' : 0
    });
    const textClass = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      return ['cqc-progress-text', 'cqc-progress-text-' + props.textPosition];
    });

    const changeWidth = percentage => {
      if (percentage > 100) percentage = 100;
      if (percentage < 0) percentage = 0;
      barStyles.width = parseInt(percentage / 100 * _width) + 'px';
    };

    const {
      trackPath,
      trailPathStyle,
      circlePathStyle,
      relativeStrokeWidth
    } = getComputed(props);
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(percentage, val => changeWidth(val));
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
        if (instanceRef.value) {
          _width = instanceRef.value.clientWidth;
          changeWidth(percentage.value);
        }
      });
    });
    return () => {
      if (props.type === 'line') {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
          "class": "cqc-progress",
          "style": styles,
          "ref": instanceRef
        }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
          "class": "cqc-progress-bar",
          "style": barStyles
        }, [props.showText && (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
          "class": textClass.value
        }, [slots.default ? slots.default() : props.percentage + '%'])])]);
      } else {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
          "class": "cqc-progress",
          "style": {
            height: props.width + 'px',
            width: props.width + 'px'
          }
        }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("svg", {
          "width": '100%',
          "height": '100%',
          "viewBox": "0 0 100 100"
        }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("path", {
          "d": trackPath.value,
          "stroke": props.bgColor,
          "stroke-width": props.strokeWidth,
          "fill": "none",
          "style": trailPathStyle.value
        }, null), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("path", {
          "d": trackPath.value,
          "stroke": props.color,
          "fill": "none",
          "stroke-linecap": props.strokeLinecap,
          "stroke-width": props.percentage ? relativeStrokeWidth.value : 0,
          "style": circlePathStyle.value
        }, null)]), props.showText && (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
          "class": "cqc-track-text"
        }, [slots.default ? slots.default() : props.percentage + '%'])]);
      }
    };
  }

});
;// CONCATENATED MODULE: ./src/packages/progress/index.js



progress.install = app => app.component(progress.name, progress);

/* harmony default export */ var packages_progress = (progress);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/scroll/scroll.vue?vue&type=template&id=d4ede81e

const scrollvue_type_template_id_d4ede81e_hoisted_1 = {
  class: "cqc-scroll"
};
function scrollvue_type_template_id_d4ede81e_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", scrollvue_type_template_id_d4ede81e_hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
    class: "cqc-scroll-content",
    ref: "scrollContent",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)($setup.contentStyle)
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "default")], 4)]);
}
;// CONCATENATED MODULE: ./src/packages/scroll/scroll.vue?vue&type=template&id=d4ede81e

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/scroll/scroll.vue?vue&type=script&lang=js


/* harmony default export */ var scrollvue_type_script_lang_js = ({
  name: "CqcScroll",
  props: {
    direction: {
      type: String,
      default: "horizontal",

      validator(val) {
        const types = ["horizontal", "vertical"];

        if (!types.includes(val)) {
          throw new Error(`<cqc-scroll>的direction值只能为:${types.join(",")}`);
        }

        return true;
      }

    },
    prevent: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    let scrollContent = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    let scrollWidth = 0;
    let scrollHeight = 0;
    let translateX = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    let animationFn = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)("cubic-bezier(0.165, 0.84, 0.44, 1)");
    let duration = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)("0.8s");
    let canMove = false;
    let start = {
      cx: 0,
      tx: 0,
      t: 0
    };
    const flag = props.direction === "horizontal" ? true : false;
    const contentStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      let transform = flag ? `translate3D(${translateX.value}px, 0, 0)` : `translate3D(0, ${translateX.value}px, 0)`;
      return {
        "display": flag ? 'inline-block' : 'block',
        transform,
        "transition-timing-function": animationFn.value,
        "transition-duration": duration.value
      };
    });

    const touchstart = e => {
      canMove = true;

      if (flag) {
        start.cx = e.touches ? e.touches[0].clientX : e.clientX;
      } else {
        start.cx = e.touches ? e.touches[0].clientY : e.clientY;
      }

      start.tx = translateX.value;
      start.t = Date.now();
    };

    const touchmove = e => {
      if (!canMove) return;
      if (props.prevent) e.preventDefault();
      let clientX = 0;

      if (flag) {
        clientX = e.touches ? e.touches[0].clientX : e.clientX;
      } else {
        clientX = e.touches ? e.touches[0].clientY : e.clientY;
      }

      let diff = clientX - start.cx;

      if (start.tx === 0 && diff > 0 || start.tx <= -scrollWidth && diff < 0) {
        translateX.value = start.tx + diff * 0.5;
      } else {
        translateX.value = start.tx + diff * 2;
      }
    };

    const touchend = e => {
      canMove = false;
      scrollWidth = flag ? scrollWidth : scrollHeight;

      if (translateX.value > 0 || translateX.value < -scrollWidth) {
        animationFn.value = "cubic-bezier(0.165, 0.84, 0.44, 1)";
        translateX.value = translateX.value > 0 ? 0 : -scrollWidth;
        duration.value = "0.8s";
      } else {
        let clienX = 0;

        if (flag) {
          clienX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        } else {
          clienX = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        }

        let diffTime = Date.now() - start.t;

        if (diffTime < 300 && Math.abs(clienX - start.cx) > 30) {
          animationFn.value = "cubic-bezier(0.23, 1, 0.32, 1);";
          duration.value = "2.5s";
        }
      }

      scrollContent.addEventListener("transitionend", () => {
        duration.value = "0s";
      });
    };

    const eventMap = {
      touchstart,
      touchmove,
      touchend,
      mousedown: touchstart,
      mousemove: touchmove,
      mouseup: touchend
    };

    const touchEvents = () => {
      Object.entries(eventMap).forEach(([key, event]) => {
        scrollContent.addEventListener(key, event);
      });
      window.addEventListener("mouseup", touchend);
    };

    const init = () => {
      scrollContent = scrollContent.value;
      scrollWidth = scrollContent.offsetWidth - scrollContent.parentNode.clientWidth;
      scrollHeight = scrollContent.offsetHeight - scrollContent.parentNode.clientHeight;
      touchEvents();
    };

    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
        init();
      });
    });
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
      Object.entries(eventMap).forEach(([key, event]) => {
        scrollContent.removeEventListener(key, event);
      });
      window.removeEventListener("mouseup", touchend);
    });
    return {
      contentStyle,
      scrollContent
    };
  }

});
;// CONCATENATED MODULE: ./src/packages/scroll/scroll.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/packages/scroll/scroll.vue




;
const scroll_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(scrollvue_type_script_lang_js, [['render',scrollvue_type_template_id_d4ede81e_render]])

/* harmony default export */ var scroll_scroll = (scroll_exports_);
;// CONCATENATED MODULE: ./src/packages/scroll/index.js



scroll_scroll.install = app => app.component(scroll_scroll.name, scroll_scroll);

/* harmony default export */ var packages_scroll = (scroll_scroll);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/slide/slide.vue?vue&type=template&id=90995d5e

const slidevue_type_template_id_90995d5e_hoisted_1 = {
  class: "cqc-slide"
};
const slidevue_type_template_id_90995d5e_hoisted_2 = {
  key: 1,
  class: "cqc-slide-right",
  ref: "right"
};
function slidevue_type_template_id_90995d5e_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", slidevue_type_template_id_90995d5e_hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
    class: "cqc-slide-content",
    ref: "slide",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)($setup.styles)
  }, [_ctx.$slots.left ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
    key: 0,
    class: "cqc-slide-left",
    ref: "left",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)({
      'margin-left': -_ctx.leftW + 'px'
    })
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "left")], 4)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
    class: "cqc-slide-center",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)({
      width: _ctx.centerW + 'px'
    })
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "default")], 4), _ctx.$slots.right ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", slidevue_type_template_id_90995d5e_hoisted_2, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "right")], 512)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)], 4)]);
}
;// CONCATENATED MODULE: ./src/packages/slide/slide.vue?vue&type=template&id=90995d5e

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/packages/slide/slide.vue?vue&type=script&lang=js

/* harmony default export */ var slidevue_type_script_lang_js = ({
  name: 'CqcSlide',
  props: {
    prevent: {
      type: Boolean,
      default: true
    },
    rightDistance: {
      type: Number,
      default: 30
    },
    leftDistance: {
      type: Number,
      default: 30
    }
  },

  setup(props, {
    slots
  }) {
    let slide = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    let right = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    let left = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    let startx = 0;
    let offsetx = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    let oleOffsetx = 0;
    let canMove = false;
    const state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      centerW: 0,
      leftW: 0,
      rightW: 0
    });
    const styles = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      return {
        "transform": `translateX(${offsetx.value}px)`,
        "transition-timing-function": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "transition-duration": '0.8s'
      };
    });

    const touchstart = e => {
      canMove = true;
      startx = e.touches ? e.touches[0].clientX : e.clientX;
      oleOffsetx = offsetx.value;
    };

    const touchmove = e => {
      if (!canMove) return;
      if (props.prevent) e.preventDefault();
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let diff = clientX - startx;
      offsetx.value = oleOffsetx + diff * 2;

      if (diff > 0 && offsetx.value > state.leftW) {
        offsetx.value = state.leftW;
      }

      if (diff < 0 && offsetx.value < -state.rightW) {
        offsetx.value = -state.rightW;
      }
    };

    const touchend = e => {
      canMove = false;

      if (offsetx.value > 0) {
        if (offsetx.value > props.leftDistance) {
          offsetx.value = state.leftW;
        } else {
          offsetx.value = 0;
        }
      } else {
        if (-offsetx.value > props.rightDistance) {
          offsetx.value = -state.rightW;
        } else {
          offsetx.value = 0;
        }
      }
    };

    const eventMap = {
      touchstart,
      touchmove,
      touchend,
      mousedown: touchstart,
      mousemove: touchmove,
      mouseup: touchend
    };

    const touchEvents = () => {
      Object.entries(eventMap).forEach(([key, event]) => {
        slide.addEventListener(key, event);
      });
      window.addEventListener("mouseup", touchend);
    };

    const init = () => {
      slide = slide.value;
      left = left.value;
      right = right.value;
      state.centerW = slide.parentNode.clientWidth;
      if (slots.left) state.leftW = left.offsetWidth;
      if (slots.right) state.rightW = right.offsetWidth;
      touchEvents();
    };

    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
        init();
      });
    });
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
      Object.entries(eventMap).forEach(([key, event]) => {
        slide.removeEventListener(key, event);
      });
      window.removeEventListener("mouseup", touchend);
    });
    return { ...(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(state),
      left,
      right,
      styles,
      slide
    };
  }

});
;// CONCATENATED MODULE: ./src/packages/slide/slide.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/packages/slide/slide.vue




;
const slide_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(slidevue_type_script_lang_js, [['render',slidevue_type_template_id_90995d5e_render]])

/* harmony default export */ var slide = (slide_exports_);
;// CONCATENATED MODULE: ./src/packages/slide/index.js



slide.install = app => app.component(slide.name, slide);

/* harmony default export */ var packages_slide = (slide);
;// CONCATENATED MODULE: ./src/packages/sign-board/props.js
/* harmony default export */ var sign_board_props = ({
  width: {
    type: String,
    default: '100vw'
  },
  height: {
    type: String,
    default: '100vh'
  },
  lineWidth: {
    type: Number,
    default: 2
  },
  strokeStyle: {
    type: String,
    default: '#000'
  },
  lineCap: {
    type: String,
    default: 'round' // butt，round，square

  },
  lineDash: {
    type: Array,
    default: () => [0, 0] // 实线长度, 虚线长度

  },
  doubleLine: {
    type: Boolean,
    default: false
  },
  previewBtn: {
    type: Boolean,
    default: true
  },
  miniType: {
    type: String,
    default: 'image/png'
  },
  canvasBg: {
    type: [String, Boolean],
    default: false
  }
});
;// CONCATENATED MODULE: ./src/packages/sign-board/drawEvent.js

function drawEvents(props, canvasRef, width, height) {
  let canMove = false;
  let cavClientLeft, cavClientTop, canvas, ctx;
  const {
    lineWidth,
    strokeStyle,
    lineCap,
    lineDash,
    doubleLine,
    miniType,
    canvasBg
  } = props;

  function setCanvasStyle(ctx) {
    if (canvasBg) {
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, width.value, height.value);
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = lineCap;

    if (lineDash[0] > 0 || lineDash[1] > 0) {
      ctx.setLineDash(lineDash);
    }
  }

  function draw(ctx, x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function drawStart(ctx, x, y) {
    doubleLine && ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function drawEnd(ctx) {
    canMove = false;

    if (doubleLine) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = parseInt(lineWidth / 3);
      ctx.stroke();
      ctx.restore();
    }
  }

  function clear() {
    ctx.clearRect(0, 0, width.value, height.value);
  }

  function preview() {
    const baseImg = canvasRef.value.toDataURL(miniType);
  }

  function getData() {
    return canvasRef.value.toDataURL(miniType);
  }

  const touchstart = e => {
    canMove = true;
    cavClientLeft = canvas.getBoundingClientRect().left;
    cavClientTop = canvas.getBoundingClientRect().top;
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    drawStart(ctx, clientX - cavClientLeft, clientY - cavClientTop);
  };

  const touchmove = e => {
    if (!canMove) return;
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    draw(ctx, clientX - cavClientLeft, clientY - cavClientTop);
  };

  const touchend = () => {
    drawEnd(ctx);
  };

  const eventMap = {
    touchstart,
    touchmove,
    touchend,
    mousedown: touchstart,
    mousemove: touchmove,
    mouseup: touchend
  };

  function init() {
    canvas = canvasRef.value;
    ctx = canvas.getContext('2d');
    setCanvasStyle(ctx);
    Object.entries(eventMap).forEach(([key, event]) => {
      canvas.addEventListener(key, event);
    });
    window.addEventListener("mouseup", touchend);
  }

  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onBeforeUnmount)(() => {
    Object.entries(eventMap).forEach(([key, event]) => {
      canvas.removeEventListener(key, event);
    });
    window.removeEventListener("mouseup", touchend);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
      setTimeout(() => {
        init();
      }, 200);
    });
  });
  return {
    clear,
    preview,
    getData
  };
}
;// CONCATENATED MODULE: ./src/packages/sign-board/sign-board.jsx




/* harmony default export */ var sign_board = ({
  name: 'CqcSignBoard',
  props: sign_board_props,

  setup(props, {
    emit
  }) {
    const canvasRef = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    let canvasW = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    let canvasH = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    let signBoard = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    let control = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    const {
      clear,
      getData
    } = drawEvents(props, canvasRef, canvasW, canvasH);

    const handleConfirm = () => {
      emit('getData', getData());
    };

    const style = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
      width: props.width,
      height: props.height
    });
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.nextTick)(() => {
        canvasW.value = signBoard.value.clientWidth - 20;
        canvasH.value = signBoard.value.clientHeight - control.value.offsetHeight - 20;
      });
    });
    return () => (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
      "class": "cqc-sign-board",
      "style": style,
      "ref": signBoard
    }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("canvas", {
      "ref": canvasRef,
      "width": canvasW.value,
      "height": canvasH.value,
      "class": "cqc-sign-board-canvas"
    }, null), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("div", {
      "class": "cqc-sign-board-control",
      "ref": control
    }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("button", {
      "onclick": clear
    }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("\u6E05\u7A7A")]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("span", {
      "style": 'padding:4px'
    }, null), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createVNode)("button", {
      "class": "primary",
      "onclick": handleConfirm
    }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)("\u786E\u5B9A")])])]);
  }

});
;// CONCATENATED MODULE: ./src/packages/sign-board/index.js



sign_board.install = app => app.component(sign_board.name, sign_board);

/* harmony default export */ var packages_sign_board = (sign_board);
;// CONCATENATED MODULE: ./src/packages/index.js











const plugins = [packages_load_more, packages_range, packages_switch, packages_progress, packages_scroll, packages_slide, packages_sign_board];

const install = app => {
  plugins.forEach(plugin => app.use(plugin));
};

/* harmony default export */ var src_packages = (install);

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_packages);


}();
module.exports = __webpack_exports__;
/******/ })()
;