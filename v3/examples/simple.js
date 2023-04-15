/**
 * Red        (percentage of red)         0-255
 * Green      (percentage of green)       0-255
 * Blue       (percentage of blue)        0-255
 *
 * Hue        (0° (red) to 359° (red))    0-359°
 * Saturation (percentage of pure color (hue)
 *   from grey (127, 127, 127)            0-100%
 * Lightness  (percentage of white)       0-100%
 * Value      (percentage of black)       0-100%
 * https://www.w3schools.com/colors/colors_hsl.asp
 *
 * Whiteness  (percentage of white)       0-100%
 * Blackness  (percentage of black)       0-100%
 */

// TODO: see if this helps for color conversion
//   https://jonneal.dev/convert-colors/global.html#hex2hsv
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
//   See https://colorpicker.me for drag & drop

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

document.addEventListener("DOMContentLoaded", (e) => {

    const paletteClassic = new Palette({
        selector: "#paletteClassic",
        colorTopRight: [255, 160, 0],
        width: 500,
        height: 300,
        widthResolution: 50,
        heightResolution: 30,
    });
    
    // const sliderDynamic = new Slider({
    //     selector: "#sliderDynamic",
    //     colorType: "lightness",
    //     colorEnd: [255, 160, 0],
    //     height: 300,
    //     resolution: 30,
    // });
    
    // const sliderValue = new Slider({
    //     selector: "#sliderValue",
    //     colorType: "value",
    //     colorEnd: [0, 0, 0],
    //     height: 300,
    //     resolution: 30,
    
    // });

    const sliderHue = new Slider({
        selector: "#sliderHue",
        colorType: "hue",
        // type: "hue",
        height: 300,
        resolution: 30,
    });

    const sliderRed = new Slider({
        selector: "#sliderRed",
        colorType: "red",
        // colorEnd: [255, 0, 0],
        height: 300,
        resolution: 30,
    });

    const sliderGreen = new Slider({
        selector: "#sliderGreen",
        colorType: "green",
        // colorEnd: [0, 255, 0],
        height: 300,
        resolution: 30,
    });
    
    const sliderBlue = new Slider({
        selector: "#sliderBlue",
        colorType: "blue",
        // colorEnd: [0, 0, 255],
        height: 300,
        resolution: 30,
    });

    // paletteClassic.onChange = () => {
    //     sliderDynamic.setCursor();
    //     sliderValue.setCursor();
    // };

    // sliderDynamic.onChange = () => {
    //     paletteClassic.setCursor();
    //     sliderValue.setCursor();
    // };

    // sliderHue.onChange = () => {
    //     // Changes palette's color.
    //     paletteClassic.colorTopRight = sliderHue.getRgb();
    //     paletteClassic.draw();
    //     // Changes dynamic slider's color.
    //     sliderDynamic.colorEnd = sliderHue.getRgb();
    //     sliderDynamic.draw();
    //     sliderRed.setCursor();
    //     sliderGreen.setCursor();
    //     sliderBlue.setCursor();
    // };

    // const sliderRgbOnChange = () => {
    //     // Changes palette's color.
    //     paletteClassic.colorTopRight = sliderHue.getRgb();
    //     paletteClassic.draw();
    //     // Changes dynamic slider's color.
    //     sliderDynamic.colorEnd = sliderHue.getRgb();
    //     sliderDynamic.draw();
    //     sliderValue.setCursor();
    // };
    
    // sliderRed.onChange = sliderRgbOnChange;
    // sliderGreen.onChange = sliderRgbOnChange;
    // sliderBlue.onChange = sliderRgbOnChange;
    
    const colorPicker = new ColorPicker({});

    // colorPicker.addPalette(paletteClassic);
    // colorPicker.addSlider(sliderHue);
});


// var dragDrop = new DragDrop({
//     canvas: "#huePalette",
//     pointer: "#huePalettePointer",
//     pointerX: 0,
//     pointerY: 0
// });

// let myColorPicker = new ColorPicker({
//     onChange: function() {
//         console.log("hi");
//     }
// });
// myColorPicker.addPalette(classicPalette2);
// myColorPicker.addSlider(hueSliderVertical);