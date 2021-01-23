/**
 * ColorPicker
 *
 * Creates a new ColorPicker instance, in which can be assigned
 * multiple options, palettes, and sliders.
 */
class ColorPicker {

    palettes = []; // ?
    sliders = []; // ?
    /* TODO
     *  Instead of processing all of formats, try calculating
     *  only the different types (r, g, b, h, s, l, b, c, m, y, k...)
     */
    rgb;
    hex;
    hsl;
    hsv;
    hwb;
    cmyk;
    /* TODO: think if this is the right way
     *  Everytime a Palette()/Slider() is instantiated, they instantiate a DragDrop().
     *  Each DragDrop() add two new EventListener (one on the element, one on the the element's HTML pointer)
     *  Now, each listener will be told to execute the ColorPicker()'s "onChange" function.
     *  /!\
     */
    onChange;

    constructor(data = false) {

        // if (data === false) {
        //     throw "ColorPicker: no data given.";
        // }
        //
        // this.rgb = data.rgb ? data.rgb : [128, 128, 128];
        //
        // // Converts default color to all color formats.
        // this.updateColorFormats(this.rgb[0], this.rgb[1], this.rgb[2]);

        DragDrop.init();
    }

    /**
     * Converts an RGB color to HEX, HSL, HSV, HWB and CMYK
     * color formats and updates the corresponding class attributes.
     *
     * @param {number} r - RGB red byte
     * @param {number} g - RGB blue t=byte
     * @param {number} b - RGB blue
     */
    updateColorFormats(r, g, b) {
        this.rgb = [r, g, b];
        this.hex = rgbToHex(r, g, b);
        this.hsl = rgbToHsl(r, g, b);
        this.hsv = rgbToHsv(r, g, b);
        this.hwb = rgbToHwb(r, g, b);
        this.cmyk = rgbToCmyk(r, g, b);
    }

    /**
     * Adds one or multiple palettes to the color picker.
     * @param {(object|object[])} palettes - One palette or an array of palettes.
     */
    addPalette(palettes) {
        if (palettes instanceof Array) {
            for (let i = 0; i < palettes.length; i++) {
                this.palettes.push(palettes[i]);
                palettes[i].draw();
            }
        } else {
            this.palettes.push(palettes);
            palettes.draw();
        }
    }

    /**
     * Adds one or multiple sliders to the color picker.
     * @param {(object|object[])} sliders - One slide or an array of sliders.
     */
    addSlider(sliders) {
        if (sliders instanceof Array) {
            for (let i = 0; i < sliders.length; i++) {
                this.sliders.push(sliders[i]);
                sliders[i].draw();
            }
        } else {
            this.sliders.push(sliders);
            sliders.draw();
        }
    }
}