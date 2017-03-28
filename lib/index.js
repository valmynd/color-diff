import {ciede2000} from './diff'
import {rgb_to_lab, rgba_to_lab, lab_to_rgb} from './convert'
import {map_palette, palette_map_key} from './palette'

print = console.log

function closest(target, relative, bc = {R: 255, G: 255, B: 255}) {
  let key = palette_map_key(target)
  let result = map_palette([target], relative, 'closest', bc)
  return result[key]
}

function furthest(target, relative, bc = {R: 255, G: 255, B: 255}) {
  let key = palette_map_key(target)
  let result = map_palette([target], relative, 'furthest', bc)
  return result[key]
}

export {
  ciede2000,
  rgb_to_lab,
  rgba_to_lab,
  closest,
  furthest
}

////////////////////

function rgb2hex(r, g, b) {
  return '#' + [r, g, b].map(x => {
      let hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
}

////////////////////

let round = Math.round, max = Math.max, min = Math.min, abs = Math.abs

let yellow = {R: 255, G: 255, B: 0},
  red = {R: 255, G: 0, B: 0},
  green = {R: 0, G: 255, B: 0},
  blue = {R: 0, G: 0, B: 255},
  smpl = {R: 255, G: 128, B: 0}

Object.assign(window, {
  ciede2000,
  rgb_to_lab,
  rgba_to_lab,
  lab_to_rgb,
  closest,
  furthest,
  map_palette,
  palette_map_key,
  yellow,
  red,
  green,
  blue
})

let overflow256 = (value, plusminus) => {
  let d0 = value - plusminus,
    d255 = value + plusminus
  if (d0 < 0) {
    return [0, d255 + abs(d0)]
  } else if (d255 > 255) {
    return [d0 - (d255 - 255), 255]
  } else {
    return [d0, d255]
  }
}

window.rgbRange = function (begin = red, radiusR = 128, radiusG = 128, radiusB = 128, step = 32, tolerance = 0.7) {
  let {R, G, B} = begin, ret = [],
    [lowerR, upperR] = overflow256(R, radiusR / 2),
    [lowerG, upperG] = overflow256(G, radiusG / 2),
    [lowerB, upperB] = overflow256(B, radiusB / 2),
    rRG = max(1, min(R, G)) / max(1, R, G),
    rRB = max(1, min(G, B)) / max(1, G, B),
    rGB = max(1, min(R, G)) / max(1, R, G)
  let ratioBetween = (iR, iG, iB) => {
    let vRG = max(1, min(iR, iG)) / max(1, iR, iG),
      vRB = max(1, min(iG, iB)) / max(1, iG, iB),
      vGB = max(1, min(iR, iG)) / max(1, iR, iG)
    //print({vRG, vRB, vGB, _inRG: abs(vRG - rRG), inRB: abs(vRB - rRB), inGB: abs(vGB - rGB)})
    return abs(vRG - rRG) < tolerance && abs(vRB - rRB) < tolerance && abs(vGB - rGB) < tolerance
  }
  for (let iR = lowerR; iR <= upperR; iR += step) {
    for (let iG = lowerG; iG <= upperG; iG += step) {
      for (let iB = lowerB; iB <= upperB; iB += step) {
        if (ratioBetween(iR, iG, iB))
          ret.push({R: iR, G: iG, B: iB})
      }
    }
  }
  return ret
}

window.makePalette = function (begin = red, n = 60, radiusR = 128, radiusG = 128, radiusB = 128, step = 32, tolerance = 0.7) {
  let colors = rgbRange(begin, radiusR, radiusG, radiusB, step, tolerance)
  let ret = [begin], results = [rgb_to_lab(begin)], remaining = colors.map(c => rgb_to_lab(c))
  for (let k = 0; k < n; k++) {
    let best_min_dist = 0, best_index = 0
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i] === undefined) continue
      let dist, min_dist = Infinity
      for (let j = 0; j < results.length; j++) {
        dist = ciede2000(remaining[i], results[j])
        if(min_dist > dist) {
          min_dist = dist
        }
      }
      if (min_dist > best_min_dist) {
        best_min_dist = min_dist
        best_index = i
      }
    }
    results.push(remaining[best_index])
    ret.push(colors[best_index])
    delete remaining[best_index]
  }
  return ret
}

function renderPalette(step, radiusR, radiusG, radiusB, n) {
  let target = document.getElementById("target")
  while (target.firstChild) target.removeChild(target.firstChild)
  for (let c of [red, blue, yellow, green]) {
    let palette = makePalette(c, parseInt(n), parseInt(radiusR), parseInt(radiusG), parseInt(radiusB), parseInt(step))
    let div = document.createElement("div")
    target.appendChild(div)
    for (let i = 0; i < palette.length; i++) {
      let {R, G, B} = palette[i]
      let span = document.createElement("span")
      div.appendChild(span)
      span.style.backgroundColor = "rgb(" + [R, G, B].join(",") + ")"
      //span.style.backgroundColor = rgb2hex(R, G, B)
      span.style.width = "100px"
      span.style.height = "100px"
      span.textContent = rgb2hex(R, G, B)
      if(c===red) print(rgb2hex(R, G, B))
      span.onclick = function () {
        div.removeChild(span)
      }
    }
    div.style.display = "flex"
  }
}

window.onload = function () {
  let form = document.forms[0],
    step1 = form.step1,
    step2 = form.step2,
    radiusR1 = form.radiusR1,
    radiusR2 = form.radiusR2,
    radiusG1 = form.radiusG1,
    radiusG2 = form.radiusG2,
    radiusB1 = form.radiusB1,
    radiusB2 = form.radiusB2,
    n1 = form.n1,
    n2 = form.n2
  step1.onchange = step2.onchange
    = radiusR1.onchange = radiusR2.onchange
    = radiusG1.onchange = radiusG2.onchange
    = radiusB1.onchange = radiusB2.onchange
    = n1.onchange = n2.onchange
    = function (e) {
    renderPalette(step2.value, radiusR2.value, radiusG2.value, radiusB2.value, n2.value)
  }
  renderPalette(step2.value, radiusR2.value, radiusG2.value, radiusB2.value, n2.value)
}

