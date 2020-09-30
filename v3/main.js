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
 */


// TODO: see if this helps https://jonneal.dev/convert-colors/global.html#hex2hsv
//   https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
//   https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
// TODO:
//   /!\ make it responsive! maybe change height and width by percentage? or "auto" mode?
//   /!\ when resolution changes, not all the canvas if filled with color squares: need to fix that!
//     change width_resolution, color_top_left to widthResolution, colorTopLeft...
//   ColorPicker class: color conversions in common
//   disable() enable() methods for palettes, slider and ColorPicker?
//   optimize Palette algo:
//    see Slider algo: (if precision 10x10, generate row and column block 10x10 instead of 10 iterations do 1)

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


var classicSliderHorizontal1 = new Slider({
    canvas: "#classicSliderHorizontal1",
    type: "classic",
    orientation: "horizontal",
    height: 50,
    colorStart: [225, 255, 0],
    colorEnd: [255, 0, 0]
});

var classicSliderHorizontal2 = new Slider({
    canvas: "#classicSliderHorizontal2",
    type: "classic",
    width: 250,
    orientation: "horizontal"
});

var classicSliderVertical1 = new Slider({
    canvas: "#classicSliderVertical1",
    type: "classic",
    orientation: "vertical",
    resolution: 30
});

var classicSliderVertical2 = new Slider({
    canvas: "#classicSliderVertical2",
    type: "classic",
    orientation: "vertical",
    width: 50,
    colorStart: [225, 255, 0],
    colorEnd: [255, 0, 0]
});


var hueSliderHorizontal = new Slider({
    canvas: "#hueSliderHorizontal",
    type: "hue",
    orientation: "horizontal",
    resolution: 30
});

var hueSliderVertical = new Slider({
    canvas: "#hueSliderVertical",
    type: "hue",
    orientation: "vertical"
});


var classicPalette1 = new Palette({
    canvas: "#classicPalette1",
    type: "classic",
    width: 200,
    height: 250,
    widthResolution: 20,
    heightResolution: 10,
    colorTopLeft: [255, 255, 255],
    colorTopRight: [225, 0, 0],
    colorBottomLeft: [0, 225, 0],
    colorBottomRight: [0, 0, 255]
});

var classicPalette2 = new Palette({
    canvas: "#classicPalette2",
    type: "classic",
    width: 160,
    height: 250,
    widthResolution: 5,
    heightResolution: 5
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

document.querySelector("#huePaletteResolution").addEventListener("input", (e) => {
    const res = parseInt(e.target.value);
    huePalette.width_resolution = res;
    huePalette.height_resolution = res;
    huePalette.draw();
});

// var dragDrop = new DragDrop({
//     canvas: "#huePalette",
//     pointer: "#huePalettePointer",
//     pointerX: 0,
//     pointerY: 0
// });