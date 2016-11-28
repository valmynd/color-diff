import {ciede2000} from './diff'
import {rgb_to_lab, rgba_to_lab, lab_to_rgb} from './convert'
import {map_palette, palette_map_key} from './palette'


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

let dist = ciede2000(rgb_to_lab({R: 255, G: 255, B: 255}), rgb_to_lab({R: 255, G: 255, B: 255}))

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
print = console.log

window.rgbRange = function (begin = red, radius = 256 / 2, step = 32) {
  let {R, G, B} = begin, ret = [], hr = radius / 2,
    [lowerR, upperR] = overflow256(R, hr),
    [lowerG, upperG] = overflow256(G, hr),
    [lowerB, upperB] = overflow256(B, hr),
    rRG = max(1, min(R, G)) / max(1, R, G),
    rRB = max(1, min(G, B)) / max(1, G, B),
    rGB = max(1, min(R, G)) / max(1, R, G)
  //print({rRG, rRB, rGB})
  let ratioBetween = (iR, iG, iB, tolerance = 0.7) => {
    let vRG = max(1, min(iR, iG)) / max(1, iR, iG),
      vRB = max(1, min(iG, iB)) / max(1, iG, iB),
      vGB = max(1, min(iR, iG)) / max(1, iR, iG)
    //print({vRG, vRB, vGB, _inRG: abs(vRG - rRG), inRB: abs(vRB - rRB), inGB: abs(vGB - rGB)})
    return abs(vRG - rRG) < tolerance && abs(vRB - rRB) < tolerance && abs(vGB - rGB) < tolerance
  }
  for (let iR = lowerR; iR <= upperR; iR += step) {
    for (let iG = lowerG; iG <= upperG; iG += step) {
      for (let iB = lowerB; iB <= upperB; iB += step) {
        //if (ratioBetween(iR, iG, R, G) && ratioBetween(iR, iB, R, B) && ratioBetween(iG, iB, G, B))
        if (ratioBetween(iR, iG, iB))
          ret.push({R: iR, G: iG, B: iB})
      }
    }
  }
  return ret
}

window.makePalette = function (begin = red, n = 60) {
  let colors = rgbRange(begin, 256 / 2, 8)
  let ret = [begin], results = [rgb_to_lab(begin)], remaining = []
  for (let c of colors) remaining.push(rgb_to_lab(c))
  for (let k = 0; k < n; k++) {
    let best_sum = 0, best_index = 0
    for (let i = 0; i < remaining.length; i++) {
      if(remaining[i] === undefined) continue
      let sum = 0
      for (let j = 0; j < results.length; j++) {
        sum += ciede2000(remaining[i], results[j])
      }
      if(sum > best_sum) {
        best_sum = sum
        best_index = i
      }
    }
    results.push(remaining[best_index])
    ret.push(colors[best_index])
    delete remaining[best_index]
  }
  return ret
}

window.onload = function () {
  console.log("LOAD")
  for (let c of [red, blue, yellow, green]) {
    let palette = makePalette(c)
    let div = document.createElement("div")
    document.body.appendChild(div)
    for (let i = 0; i < palette.length; i++) {
      let {R, G, B} = palette[i]
      let span = document.createElement("span")
      div.appendChild(span)
      span.style.backgroundColor = "rgb(" + [R, G, B].join(",") + ")"
      span.style.width = "100px"
      span.style.height = "100px"
    }
    div.style.display = "flex"
  }
  //document.body.style.display = "flex"
  //document.body.style.flexWrap = true
}

