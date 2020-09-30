/**
 * ColorPicker
 *
 * Creates a new ColorPicker instance, in which can be assigned
 * multiple options, palettes, and sliders.
 */
class ColorPicker {

    palettes; // ?
    sliders; // ?
    rgb;
    hex;
    hsl;
    hsv;
    hwb;
    cmyk;

    constructor(data = false) {

        if (data === false) {
            throw "ColorPicker: no data given.";
        }

        this.rgb = data.rgb ? data.rgb : [128, 128, 128];

        // Converts default color to all color formats.
        this.updateColorFormats(this.rgb[0], this.rgb[1], this.rgb[2]);
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
}