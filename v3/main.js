/**
 * Red        (percentage of red)         0-255
 * Green      (percentage of green)       0-255
 * Blue       (percentage of blue)        0-255
 *
 * Hue        (0° (red) to 359° (red))    0-359°
 * Saturation (percentage of)             0-100%
 * Lightness  (percentage of white)       0-100%
 * Value      (percentage of black)       0-100%
 *
 * Whiteness  (percentage of white)       0-100%
 * Blackness  (percentage of black)       0-100%
 *
 * TODO: see if this helps https://jonneal.dev/convert-colors/global.html#hex2hsv
 * https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 * https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 */

// var rgb = [85,114,156];
//
// console.log("To HSL");
// console.log(rgbToHsl(rgb[0], rgb[1], rgb[2]));
//
// console.log("To HSV");
// console.log(rgbToHsv(rgb[0], rgb[1], rgb[2]));
//
// console.log("To HWB");
// console.log(rgbToHwb(rgb[0], rgb[1], rgb[2]));
//
// console.log("To CMYK");
// console.log(rgbToCmyk(rgb[0], rgb[1], rgb[2]));


var classicPalette = new Palette({
    canvas: "#classicPalette",
    type: "classic",
    width: 400,
    height: 250,
    widthResolution: 5,
    heightResolution: 5,
    colorTopLeft: [255, 255, 255],
    colorTopRight: [225, 0, 0],
    colorBottomLeft: [0, 225, 0],
    colorBottomRight: [0, 0, 255]
});

var huePalette = new Palette({
    canvas: "#huePalette",
    type: "hue",
    width: 400,
    height: 250,
    widthResolution: 5,
    heightResolution: 5,
    colorBottom: [255, 255, 255]
});

