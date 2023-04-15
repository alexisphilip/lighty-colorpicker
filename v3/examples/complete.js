// Complete color picker.
// Palettes:
let paletteClassic = new Palette({
        selector: "#paletteClassic",
        widthResolution: 5,
        heightResolution: 5,
        colorTopRight: [255, 99, 71]
    }),
    paletteClassicCustom = new Palette({
        selector: "#paletteClassicCustom",
        widthResolution: 5,
        heightResolution: 5,
        colorTopLeft: [255, 0, 0],
        colorTopRight: [0, 255, 0],
        colorBottomLeft: [255, 255, 255],
        colorBottomRight: [0, 0, 255]
    }),
    paletteHue = new Palette({
        selector: "#paletteHue",
        type: "hue",
        widthResolution: 5,
        heightResolution: 5
    });
// Sliders:
let sliderRed = new Slider({
        selector: "#sliderRed",
        colorEnd: [255, 0, 0]
    }),
    sliderGreen = new Slider({
        selector: "#sliderGreen",
        colorEnd: [0, 255, 0]
    }),
    sliderBlue = new Slider({
        selector: "#sliderBlue",
        colorEnd: [0, 0, 255]
    }),
    sliderHue = new Slider({
        selector: "#sliderHue",
        type: "hue"
    }),
    sliderSaturation = new Slider({
        selector: "#sliderSaturation",
        colorStart: [127, 127, 127],
        colorEnd: [255, 0, 0]
    }),
    sliderLightness = new Slider({
        selector: "#sliderLightness",
        colorEnd: [255, 0, 0]
    }),
    sliderValue = new Slider({
        selector: "#sliderValue",
        colorEnd: [0, 0, 0]
    }),
    sliderCyan = new Slider({
        selector: "#sliderCyan",
        colorEnd: [0, 255, 255]
    }),
    sliderMagenta = new Slider({
        selector: "#sliderMagenta",
        colorEnd: [255, 0, 255]
    }),
    sliderYellow = new Slider({
        selector: "#sliderYellow",
        colorEnd: [255, 255, 0]
    }),
    sliderKey = new Slider({
        selector: "#sliderKey",
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