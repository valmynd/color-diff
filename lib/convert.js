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
let pow = Math.pow

/**
 * Returns c converted to CIE-Lab
 * Uses bc as background color.
 * Defaults to using white as background color.
 * @param {{R,G,B,A}} c
 * @param {{R,G,B}} [bc]
 * @return {{L,a,b}}
 */
export function rgba_to_lab(c, bc = {R: 255, G: 255, B: 255}) {
  return rgb_to_lab({
    R: bc.R + (c.R - bc.R) * c.A,
    G: bc.G + (c.G - bc.G) * c.A,
    B: bc.B + (c.B - bc.B) * c.A
  })
}

/**
 * Returns c converted to CIE-Lab
 * @param {{R,G,B}} c
 * @return {{L,a,b}}
 */
export function rgb_to_lab(c) {
  return xyz_to_lab(rgb_to_xyz(c))
}

/**
 * Returns c converted to RGB
 * @param {{L,a,b}} c
 * @return {{R,G,B}}
 */
export function lab_to_rgb(c) {
  return xyz_to_rgb(lab_to_xyz(c))
}

/**
 * Returns c converted to XYZ
 * @param {{R,G,B}} c
 * @return {{X,Y,Z}}
 */
function rgb_to_xyz(c) {
  // Based on http://www.easyrgb.com/index.php?X=MATH&H=02
  let R = (c.R / 255),
    G = (c.G / 255),
    B = (c.B / 255)
  if (R > 0.04045)
    R = pow(((R + 0.055) / 1.055), 2.4)
  else
    R = R / 12.92
  if (G > 0.04045)
    G = pow(((G + 0.055) / 1.055), 2.4)
  else
    G = G / 12.92
  if (B > 0.04045)
    B = pow(((B + 0.055) / 1.055), 2.4)
  else
    B = B / 12.92
  R *= 100
  G *= 100
  B *= 100
  // Observer. = 2°, Illuminant = D65
  let X = R * 0.4124 + G * 0.3576 + B * 0.1805
  let Y = R * 0.2126 + G * 0.7152 + B * 0.0722
  let Z = R * 0.0193 + G * 0.1192 + B * 0.9505
  return {X, Y, Z}
}

/**
 * Returns c converted to CIE-Lab
 * @param {{X,Y,Z}} c
 * @return {{L,a,b}}
 */
function xyz_to_lab(c) {
  // Based on http://www.easyrgb.com/index.php?X=MATH&H=07
  let ref_Y = 100.000
  let ref_Z = 108.883
  let ref_X = 95.047 // Observer= 2°, Illuminant= D65
  let Y = c.Y / ref_Y
  let Z = c.Z / ref_Z
  let X = c.X / ref_X
  if (X > 0.008856)
    X = pow(X, 1 / 3)
  else
    X = (7.787 * X) + (16 / 116)
  if (Y > 0.008856)
    Y = pow(Y, 1 / 3)
  else
    Y = (7.787 * Y) + (16 / 116)
  if (Z > 0.008856)
    Z = pow(Z, 1 / 3)
  else
    Z = (7.787 * Z) + (16 / 116)
  let L = (116 * Y) - 16
  let a = 500 * (X - Y)
  let b = 200 * (Y - Z)
  return {L, a, b}
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
  let x = c.X / 100, // X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
    y = c.Y / 100,   // Y from 0 to 100.000
    z = c.Z / 100    // Z from 0 to 108.883
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415
  let b = x * 0.0557 + y * -0.2040 + z * 1.0570
  if (r > 0.0031308)
    r = 1.055 * ( r ^ ( 1 / 2.4 ) ) - 0.055
  else
    r = 12.92 * r
  if (g > 0.0031308)
    g = 1.055 * ( g ^ ( 1 / 2.4 ) ) - 0.055
  else
    g = 12.92 * g
  if (b > 0.0031308)
    b = 1.055 * ( b ^ ( 1 / 2.4 ) ) - 0.055
  else
    b = 12.92 * b
  return {R: r * 255, G: g * 255, B: b * 255}
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
  let var_Y = ( c.L + 16 ) / 116,
    var_X = c.a / 500 + var_Y,
    var_Z = var_Y - c.b / 200

  if (var_Y ^ 3 > 0.008856)
    var_Y = var_Y ^ 3
  else
    var_Y = ( var_Y - 16 / 116 ) / 7.787
  if (var_X ^ 3 > 0.008856)
    var_X = var_X ^ 3
  else
    var_X = ( var_X - 16 / 116 ) / 7.787
  if (var_Z ^ 3 > 0.008856)
    var_Z = var_Z ^ 3
  else
    var_Z = ( var_Z - 16 / 116 ) / 7.787

  let X = 95.047 * var_X     //ref_X =  95.047     Observer= 2°, Illuminant= D65
  let Y = 100.000 * var_Y    //ref_Y = 100.000
  let Z = 108.883 * var_Z    //ref_Z = 108.883
  return {X, Y, Z}
}
