/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.furthest = exports.closest = exports.rgba_to_lab = exports.rgb_to_lab = exports.ciede2000 = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _diff = __webpack_require__(2);
	
	var _convert = __webpack_require__(3);
	
	var _palette = __webpack_require__(4);
	
	print = console.log;
	
	function closest(target, relative) {
	  var bc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { R: 255, G: 255, B: 255 };
	
	  var key = (0, _palette.palette_map_key)(target);
	  var result = (0, _palette.map_palette)([target], relative, 'closest', bc);
	  return result[key];
	}
	
	function furthest(target, relative) {
	  var bc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { R: 255, G: 255, B: 255 };
	
	  var key = (0, _palette.palette_map_key)(target);
	  var result = (0, _palette.map_palette)([target], relative, 'furthest', bc);
	  return result[key];
	}
	
	exports.ciede2000 = _diff.ciede2000;
	exports.rgb_to_lab = _convert.rgb_to_lab;
	exports.rgba_to_lab = _convert.rgba_to_lab;
	exports.closest = closest;
	exports.furthest = furthest;
	
	////////////////////
	
	function rgb2hex(r, g, b) {
	  return '#' + [r, g, b].map(function (x) {
	    var hex = x.toString(16);
	    return hex.length === 1 ? '0' + hex : hex;
	  }).join('');
	}
	
	////////////////////
	
	var round = Math.round,
	    max = Math.max,
	    min = Math.min,
	    abs = Math.abs;
	
	var yellow = { R: 255, G: 255, B: 0 },
	    red = { R: 255, G: 0, B: 0 },
	    green = { R: 0, G: 255, B: 0 },
	    blue = { R: 0, G: 0, B: 255 },
	    smpl = { R: 255, G: 128, B: 0 };
	
	Object.assign(window, {
	  ciede2000: _diff.ciede2000,
	  rgb_to_lab: _convert.rgb_to_lab,
	  rgba_to_lab: _convert.rgba_to_lab,
	  lab_to_rgb: _convert.lab_to_rgb,
	  closest: closest,
	  furthest: furthest,
	  map_palette: _palette.map_palette,
	  palette_map_key: _palette.palette_map_key,
	  yellow: yellow,
	  red: red,
	  green: green,
	  blue: blue
	});
	
	var overflow256 = function overflow256(value, plusminus) {
	  var d0 = value - plusminus,
	      d255 = value + plusminus;
	  if (d0 < 0) {
	    return [0, d255 + abs(d0)];
	  } else if (d255 > 255) {
	    return [d0 - (d255 - 255), 255];
	  } else {
	    return [d0, d255];
	  }
	};
	
	window.rgbRange = function () {
	  var begin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : red;
	  var radiusR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 128;
	  var radiusG = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 128;
	  var radiusB = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 128;
	  var step = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 32;
	  var tolerance = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.7;
	
	  var R = begin.R,
	      G = begin.G,
	      B = begin.B,
	      ret = [],
	      _overflow = overflow256(R, radiusR / 2),
	      _overflow2 = _slicedToArray(_overflow, 2),
	      lowerR = _overflow2[0],
	      upperR = _overflow2[1],
	      _overflow3 = overflow256(G, radiusG / 2),
	      _overflow4 = _slicedToArray(_overflow3, 2),
	      lowerG = _overflow4[0],
	      upperG = _overflow4[1],
	      _overflow5 = overflow256(B, radiusB / 2),
	      _overflow6 = _slicedToArray(_overflow5, 2),
	      lowerB = _overflow6[0],
	      upperB = _overflow6[1],
	      rRG = max(1, min(R, G)) / max(1, R, G),
	      rRB = max(1, min(G, B)) / max(1, G, B),
	      rGB = max(1, min(R, G)) / max(1, R, G);
	
	  var ratioBetween = function ratioBetween(iR, iG, iB) {
	    var vRG = max(1, min(iR, iG)) / max(1, iR, iG),
	        vRB = max(1, min(iG, iB)) / max(1, iG, iB),
	        vGB = max(1, min(iR, iG)) / max(1, iR, iG);
	    //print({vRG, vRB, vGB, _inRG: abs(vRG - rRG), inRB: abs(vRB - rRB), inGB: abs(vGB - rGB)})
	    return abs(vRG - rRG) < tolerance && abs(vRB - rRB) < tolerance && abs(vGB - rGB) < tolerance;
	  };
	  for (var iR = lowerR; iR <= upperR; iR += step) {
	    for (var iG = lowerG; iG <= upperG; iG += step) {
	      for (var iB = lowerB; iB <= upperB; iB += step) {
	        if (ratioBetween(iR, iG, iB)) ret.push({ R: iR, G: iG, B: iB });
	      }
	    }
	  }
	  return ret;
	};
	
	window.makePalette = function () {
	  var begin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : red;
	  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
	  var radiusR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 128;
	  var radiusG = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 128;
	  var radiusB = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 128;
	  var step = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 32;
	  var tolerance = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.7;
	
	  var colors = rgbRange(begin, radiusR, radiusG, radiusB, step, tolerance);
	  var ret = [begin],
	      results = [(0, _convert.rgb_to_lab)(begin)],
	      remaining = colors.map(function (c) {
	    return (0, _convert.rgb_to_lab)(c);
	  });
	  for (var k = 0; k < n; k++) {
	    var best_min_dist = 0,
	        best_index = 0;
	    for (var i = 0; i < remaining.length; i++) {
	      if (remaining[i] === undefined) continue;
	      var dist = void 0,
	          min_dist = Infinity;
	      for (var j = 0; j < results.length; j++) {
	        dist = (0, _diff.ciede2000)(remaining[i], results[j]);
	        if (min_dist > dist) {
	          min_dist = dist;
	        }
	      }
	      if (min_dist > best_min_dist) {
	        best_min_dist = min_dist;
	        best_index = i;
	      }
	    }
	    results.push(remaining[best_index]);
	    ret.push(colors[best_index]);
	    delete remaining[best_index];
	  }
	  return ret;
	};
	
	function renderPalette(step, radiusR, radiusG, radiusB, n) {
	  var target = document.getElementById("target");
	  while (target.firstChild) {
	    target.removeChild(target.firstChild);
	  }var _arr = [red, blue, yellow, green];
	
	  var _loop = function _loop() {
	    var c = _arr[_i];
	    var palette = makePalette(c, parseInt(n), parseInt(radiusR), parseInt(radiusG), parseInt(radiusB), parseInt(step));
	    var div = document.createElement("div");
	    target.appendChild(div);
	
	    var _loop2 = function _loop2(i) {
	      var _palette$i = palette[i],
	          R = _palette$i.R,
	          G = _palette$i.G,
	          B = _palette$i.B;
	
	      var span = document.createElement("span");
	      div.appendChild(span);
	      span.style.backgroundColor = "rgb(" + [R, G, B].join(",") + ")";
	      //span.style.backgroundColor = rgb2hex(R, G, B)
	      span.style.width = "100px";
	      span.style.height = "100px";
	      span.textContent = rgb2hex(R, G, B);
	      if (c === red) print(rgb2hex(R, G, B));
	      span.onclick = function () {
	        div.removeChild(span);
	      };
	    };
	
	    for (var i = 0; i < palette.length; i++) {
	      _loop2(i);
	    }
	    div.style.display = "flex";
	  };
	
	  for (var _i = 0; _i < _arr.length; _i++) {
	    _loop();
	  }
	}
	
	window.onload = function () {
	  var form = document.forms[0],
	      step1 = form.step1,
	      step2 = form.step2,
	      radiusR1 = form.radiusR1,
	      radiusR2 = form.radiusR2,
	      radiusG1 = form.radiusG1,
	      radiusG2 = form.radiusG2,
	      radiusB1 = form.radiusB1,
	      radiusB2 = form.radiusB2,
	      n1 = form.n1,
	      n2 = form.n2;
	  step1.onchange = step2.onchange = radiusR1.onchange = radiusR2.onchange = radiusG1.onchange = radiusG2.onchange = radiusB1.onchange = radiusB2.onchange = n1.onchange = n2.onchange = function (e) {
	    renderPalette(step2.value, radiusR2.value, radiusG2.value, radiusB2.value, n2.value);
	  };
	  renderPalette(step2.value, radiusR2.value, radiusG2.value, radiusB2.value, n2.value);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ciede2000 = ciede2000;
	/**
	 * @author Markus Ekholm
	 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
	 * @license Copyright (c) 2012-2016, Markus Ekholm
	 * All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are met:
	 *    * Redistributions of source code must retain the above copyright
	 *      notice, this list of conditions and the following disclaimer.
	 *    * Redistributions in binary form must reproduce the above copyright
	 *      notice, this list of conditions and the following disclaimer in the
	 *      documentation and/or other materials provided with the distribution.
	 *    * Neither the name of the author nor the
	 *      names of its contributors may be used to endorse or promote products
	 *      derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
	 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var sqrt = Math.sqrt,
	    pow = Math.pow,
	    cos = Math.cos,
	    atan2 = Math.atan2,
	    sin = Math.sin,
	    abs = Math.abs,
	    exp = Math.exp,
	    PI = Math.PI;
	var degrees = function degrees(n) {
	  return n * (180 / PI);
	};
	var radians = function radians(n) {
	  return n * (PI / 180);
	};
	
	/**
	 * Returns diff between color1 and color2 using the CIEDE2000 algorithm
	 *
	 * Implemented as in "The CIEDE2000 Color-Difference Formula:
	 * Implementation Notes, Supplementary Test Data, and Mathematical Observations"
	 * by Gaurav Sharma, Wencheng Wu and Edul N. Dalal.
	 * @param {{L,a,b}} color1
	 * @param {{L,a,b}} color2
	 * @return {float}
	 */
	function ciede2000(color1, color2) {
	  var L1 = color1.L,
	      a1 = color1.a,
	      b1 = color1.b;
	  var L2 = color2.L,
	      a2 = color2.a,
	      b2 = color2.b;
	
	  var kL = 1,
	      kC = 1,
	      kH = 1; // Weight factors
	  // Step 1: Calculate C1p, C2p, h1p, h2p
	  var C1 = sqrt(pow(a1, 2) + pow(b1, 2)); //(2)
	  var C2 = sqrt(pow(a2, 2) + pow(b2, 2)); //(2)
	  var a_C1_C2 = (C1 + C2) / 2.0; //(3)
	  var G = 0.5 * (1 - sqrt(pow(a_C1_C2, 7.0) / (pow(a_C1_C2, 7.0) + pow(25.0, 7.0)))); //(4)
	  var a1p = (1.0 + G) * a1; //(5)
	  var a2p = (1.0 + G) * a2; //(5)
	  var C1p = sqrt(pow(a1p, 2) + pow(b1, 2)); //(6)
	  var C2p = sqrt(pow(a2p, 2) + pow(b2, 2)); //(6)
	  var hp_f = function hp_f(x, y) {
	    //(7)
	    if (x == 0 && y == 0) return 0;else {
	      var tmphp = degrees(atan2(x, y));
	      if (tmphp >= 0) return tmphp;else return tmphp + 360;
	    }
	  };
	  var h1p = hp_f(b1, a1p); //(7)
	  var h2p = hp_f(b2, a2p); //(7)
	  // Step 2: Calculate dLp, dCp, dHp
	  var dLp = L2 - L1; //(8)
	  var dCp = C2p - C1p; //(9)
	  var dhp_f = function dhp_f(C1, C2, h1p, h2p) {
	    //(10)
	    if (C1 * C2 == 0) return 0;else if (abs(h2p - h1p) <= 180) return h2p - h1p;else if (h2p - h1p > 180) return h2p - h1p - 360;else if (h2p - h1p < -180) return h2p - h1p + 360;else throw new Error();
	  };
	  var dhp = dhp_f(C1, C2, h1p, h2p); //(10)
	  var dHp = 2 * sqrt(C1p * C2p) * sin(radians(dhp) / 2.0); //(11)
	  // Step 3: Calculate CIEDE2000 Color-Difference
	  var a_L = (L1 + L2) / 2.0; //(12)
	  var a_Cp = (C1p + C2p) / 2.0; //(13)
	  var a_hp_f = function a_hp_f(C1, C2, h1p, h2p) {
	    //(14)
	    if (C1 * C2 == 0) return h1p + h2p;else if (abs(h1p - h2p) <= 180) return (h1p + h2p) / 2.0;else if (abs(h1p - h2p) > 180 && h1p + h2p < 360) return (h1p + h2p + 360) / 2.0;else if (abs(h1p - h2p) > 180 && h1p + h2p >= 360) return (h1p + h2p - 360) / 2.0;else throw new Error();
	  };
	  var a_hp = a_hp_f(C1, C2, h1p, h2p); //(14)
	  var T = 1 - 0.17 * cos(radians(a_hp - 30)) + 0.24 * cos(radians(2 * a_hp)) + 0.32 * cos(radians(3 * a_hp + 6)) - 0.20 * cos(radians(4 * a_hp - 63)); //(15)
	  var d_ro = 30 * exp(-pow((a_hp - 275) / 25, 2)); //(16)
	  var RC = sqrt(pow(a_Cp, 7.0) / (pow(a_Cp, 7.0) + pow(25.0, 7.0))); //(17)
	  var SL = 1 + 0.015 * pow(a_L - 50, 2) / sqrt(20 + pow(a_L - 50, 2.0)); //(18)
	  var SC = 1 + 0.045 * a_Cp; //(19)
	  var SH = 1 + 0.015 * a_Cp * T; //(20)
	  var RT = -2 * RC * sin(radians(2 * d_ro)); //(21)
	  return sqrt(pow(dLp / (SL * kL), 2) + pow(dCp / (SC * kC), 2) + pow(dHp / (SH * kH), 2) + RT * (dCp / (SC * kC)) * (dHp / (SH * kH))); //(22)
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rgba_to_lab = rgba_to_lab;
	exports.rgb_to_lab = rgb_to_lab;
	exports.lab_to_rgb = lab_to_rgb;
	/**
	 * @author Markus Ekholm
	 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
	 * @license Copyright (c) 2012-2016, Markus Ekholm
	 * All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are met:
	 *    * Redistributions of source code must retain the above copyright
	 *      notice, this list of conditions and the following disclaimer.
	 *    * Redistributions in binary form must reproduce the above copyright
	 *      notice, this list of conditions and the following disclaimer in the
	 *      documentation and/or other materials provided with the distribution.
	 *    * Neither the name of the author nor the
	 *      names of its contributors may be used to endorse or promote products
	 *      derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
	 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var pow = Math.pow;
	
	/**
	 * Returns c converted to CIE-Lab
	 * Uses bc as background color.
	 * Defaults to using white as background color.
	 * @param {{R,G,B,A}} c
	 * @param {{R,G,B}} [bc]
	 * @return {{L,a,b}}
	 */
	function rgba_to_lab(c) {
	  var bc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { R: 255, G: 255, B: 255 };
	
	  return rgb_to_lab({
	    R: bc.R + (c.R - bc.R) * c.A,
	    G: bc.G + (c.G - bc.G) * c.A,
	    B: bc.B + (c.B - bc.B) * c.A
	  });
	}
	
	/**
	 * Returns c converted to CIE-Lab
	 * @param {{R,G,B}} c
	 * @return {{L,a,b}}
	 */
	function rgb_to_lab(c) {
	  return xyz_to_lab(rgb_to_xyz(c));
	}
	
	/**
	 * Returns c converted to RGB
	 * @param {{L,a,b}} c
	 * @return {{R,G,B}}
	 */
	function lab_to_rgb(c) {
	  return xyz_to_rgb(lab_to_xyz(c));
	}
	
	/**
	 * Returns c converted to XYZ
	 * @param {{R,G,B}} c
	 * @return {{X,Y,Z}}
	 */
	function rgb_to_xyz(c) {
	  // Based on http://www.easyrgb.com/index.php?X=MATH&H=02
	  var R = c.R / 255,
	      G = c.G / 255,
	      B = c.B / 255;
	  if (R > 0.04045) R = pow((R + 0.055) / 1.055, 2.4);else R = R / 12.92;
	  if (G > 0.04045) G = pow((G + 0.055) / 1.055, 2.4);else G = G / 12.92;
	  if (B > 0.04045) B = pow((B + 0.055) / 1.055, 2.4);else B = B / 12.92;
	  R *= 100;
	  G *= 100;
	  B *= 100;
	  // Observer. = 2°, Illuminant = D65
	  var X = R * 0.4124 + G * 0.3576 + B * 0.1805;
	  var Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
	  var Z = R * 0.0193 + G * 0.1192 + B * 0.9505;
	  return { X: X, Y: Y, Z: Z };
	}
	
	/**
	 * Returns c converted to CIE-Lab
	 * @param {{X,Y,Z}} c
	 * @return {{L,a,b}}
	 */
	function xyz_to_lab(c) {
	  // Based on http://www.easyrgb.com/index.php?X=MATH&H=07
	  var ref_Y = 100.000;
	  var ref_Z = 108.883;
	  var ref_X = 95.047; // Observer= 2°, Illuminant= D65
	  var Y = c.Y / ref_Y;
	  var Z = c.Z / ref_Z;
	  var X = c.X / ref_X;
	  if (X > 0.008856) X = pow(X, 1 / 3);else X = 7.787 * X + 16 / 116;
	  if (Y > 0.008856) Y = pow(Y, 1 / 3);else Y = 7.787 * Y + 16 / 116;
	  if (Z > 0.008856) Z = pow(Z, 1 / 3);else Z = 7.787 * Z + 16 / 116;
	  var L = 116 * Y - 16;
	  var a = 500 * (X - Y);
	  var b = 200 * (Y - Z);
	  return { L: L, a: a, b: b };
	}
	
	/**
	 * Returns c converted to RGB
	 *
	 * FIXME: doesn't work quite right yet
	 *
	 * @param {{X,Y,Z}} c
	 * @return {{R,G,B}}
	 */
	function xyz_to_rgb(c) {
	  // based on http://www.easyrgb.com/index.php?X=MATH&H=01
	  var x = c.X / 100,
	      // X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
	  y = c.Y / 100,
	      // Y from 0 to 100.000
	  z = c.Z / 100; // Z from 0 to 108.883
	  var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	  var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	  var b = x * 0.0557 + y * -0.2040 + z * 1.0570;
	  if (r > 0.0031308) r = 1.055 * (r ^ 1 / 2.4) - 0.055;else r = 12.92 * r;
	  if (g > 0.0031308) g = 1.055 * (g ^ 1 / 2.4) - 0.055;else g = 12.92 * g;
	  if (b > 0.0031308) b = 1.055 * (b ^ 1 / 2.4) - 0.055;else b = 12.92 * b;
	  return { R: r * 255, G: g * 255, B: b * 255 };
	}
	
	/**
	 * Returns c converted to XYZ
	 *
	 * FIXME: doesn't work quite right yet
	 *
	 * @param {{L,a,b}} c
	 * @return {{X,Y,Z}}
	 */
	function lab_to_xyz(c) {
	  // Based on http://www.easyrgb.com/index.php?X=MATH&H=08
	  var var_Y = (c.L + 16) / 116,
	      var_X = c.a / 500 + var_Y,
	      var_Z = var_Y - c.b / 200;
	
	  if (var_Y ^ 3 > 0.008856) var_Y = var_Y ^ 3;else var_Y = (var_Y - 16 / 116) / 7.787;
	  if (var_X ^ 3 > 0.008856) var_X = var_X ^ 3;else var_X = (var_X - 16 / 116) / 7.787;
	  if (var_Z ^ 3 > 0.008856) var_Z = var_Z ^ 3;else var_Z = (var_Z - 16 / 116) / 7.787;
	
	  var X = 95.047 * var_X; //ref_X =  95.047     Observer= 2°, Illuminant= D65
	  var Y = 100.000 * var_Y; //ref_Y = 100.000
	  var Z = 108.883 * var_Z; //ref_Z = 108.883
	  return { X: X, Y: Y, Z: Z };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.palette_map_key = palette_map_key;
	exports.map_palette = map_palette;
	
	var _diff2 = __webpack_require__(2);
	
	var _convert = __webpack_require__(3);
	
	/**
	 * @author Markus Ekholm
	 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
	 * @license Copyright (c) 2012-2016, Markus Ekholm
	 * All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are met:
	 *    * Redistributions of source code must retain the above copyright
	 *      notice, this list of conditions and the following disclaimer.
	 *    * Redistributions in binary form must reproduce the above copyright
	 *      notice, this list of conditions and the following disclaimer in the
	 *      documentation and/or other materials provided with the distribution.
	 *    * Neither the name of the author nor the
	 *      names of its contributors may be used to endorse or promote products
	 *      derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
	 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	
	function _diff(c1, c2, bc) {
	  // internal
	  var conv_c1 = _convert.rgb_to_lab;
	  var conv_c2 = _convert.rgb_to_lab;
	  var rgba_conv = function rgba_conv(x) {
	    return (0, _convert.rgba_to_lab)(x, bc);
	  };
	  if ("A" in c1) conv_c1 = rgba_conv;
	  if ("A" in c2) conv_c2 = rgba_conv;
	  c1 = conv_c1(c1);
	  c2 = conv_c2(c2);
	  return (0, _diff2.ciede2000)(c1, c2);
	}
	
	/**
	 * Returns the hash key used for a {rgbcolor} in a {palettemap}
	 * @param {{R,G,B,[A]}} c
	 * @return {string}
	 */
	function palette_map_key(c) {
	  var s = "R" + c.R + "B" + c.B + "G" + c.G;
	  if ("A" in c) s = s + "A" + c.A;
	  return s;
	}
	
	/**
	 * Returns a mapping from each color in a to the closest color in b
	 * @param {{R,G,B}[]} a each element should have fields R,G,B
	 * @param {{R,G,B}[]} b each element should have fields R,G,B
	 * @param {{R,G,B}} [bc] background color when using alpha channels
	 * @param {string} type should be the string 'closest' or 'furthest'
	 * @return {Object} palettemap
	 */
	function map_palette(a, b) {
	  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'closest';
	  var bc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { R: 255, G: 255, B: 255 };
	
	  var c = {};
	  for (var idx1 = 0; idx1 < a.length; idx1 += 1) {
	    var color1 = a[idx1];
	    var best_color = undefined;
	    var best_color_diff = undefined;
	    for (var idx2 = 0; idx2 < b.length; idx2 += 1) {
	      var color2 = b[idx2];
	      var current_color_diff = _diff(color1, color2, bc);
	
	      if (best_color == undefined || type === 'closest' && current_color_diff < best_color_diff) {
	        best_color = color2;
	        best_color_diff = current_color_diff;
	        continue;
	      }
	      if (type === 'furthest' && current_color_diff > best_color_diff) {
	        best_color = color2;
	        best_color_diff = current_color_diff;
	        continue;
	      }
	    }
	    c[palette_map_key(color1)] = best_color;
	  }
	  return c;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map