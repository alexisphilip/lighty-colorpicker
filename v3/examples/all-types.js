// Complete color picker.
// Palettes:
let paletteClassic = new Palette({
        canvas: "#paletteClassic",
        widthResolution: 5,
        heightResolution: 5,
        colorTopRight: [255, 99, 71]
    }),
    paletteClassicCustom = new Palette({
        canvas: "#paletteClassicCustom",
        widthResolution: 5,
        heightResolution: 5,
        colorTopLeft: [255, 0, 0],
        colorTopRight: [0, 255, 0],
        colorBottomLeft: [255, 255, 255],
        colorBottomRight: [0, 0, 255]
    }),
    paletteHue = new Palette({
        canvas: "#paletteHue",
        type: "hue",
        widthResolution: 5,
        heightResolution: 5
    });
// Sliders:
let sliderRed = new Slider({
        canvas: "#sliderRed",
        colorEnd: [255, 0, 0]
    }),
    sliderGreen = new Slider({
        canvas: "#sliderGreen",
        colorEnd: [0, 255, 0]
    }),
    sliderBlue = new Slider({
        canvas: "#sliderBlue",
        colorEnd: [0, 0, 255]
    }),
    sliderHue = new Slider({
        canvas: "#sliderHue",
        type: "hue"
    }),
    sliderSaturation = new Slider({
        canvas: "#sliderSaturation",
        colorStart: [127, 127, 127],
        colorEnd: [255, 0, 0]
    }),
    sliderLightness = new Slider({
        canvas: "#sliderLightness",
        colorEnd: [255, 0, 0]
    }),
    sliderValue = new Slider({
        canvas: "#sliderValue",
        colorEnd: [0, 0, 0]
    }),
    sliderCyan = new Slider({
        canvas: "#sliderCyan",
        colorEnd: [0, 255, 255]
    }),
    sliderMagenta = new Slider({
        canvas: "#sliderMagenta",
        colorEnd: [255, 0, 255]
    }),
    sliderYellow = new Slider({
        canvas: "#sliderYellow",
        colorEnd: [255, 255, 0]
    }),
    sliderKey = new Slider({
        canvas: "#sliderKey",
        colorEnd: [0, 0, 0]
    });
// Color picker:
let colorPicker = new ColorPicker({});
colorPicker.addPalette([
    paletteClassic,
    paletteClassicCustom,
    paletteHue
]);
colorPicker.addSlider([
    sliderRed,
    sliderGreen,
    sliderBlue,
    sliderHue,
    sliderSaturation,
    sliderLightness,
    sliderValue,
    sliderCyan,
    sliderMagenta,
    sliderYellow,
    sliderKey
]);