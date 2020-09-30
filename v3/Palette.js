/**
 * Palette.
 *
 * Sets up and builds a new color palette element.
 */
class Palette {

    /**
     * Sets up the palette's attributes.
     *
     * @param {object|boolean} data:
     * - {DOMString} canvas - DOM element selector string.
     * - {string} [type=classic] - "classic" or "hue".
     * - {int} [width=300] - palette's width in pixel.
     * - {int} [height=300] - palettes's height in pixel.
     * - {int} [widthResolution=2] - palette's width's resolution in pixel.
     * - {int} [heightResolution=2] - palette's width's resolution in pixel.
     * - {array[number]} colorTopLeft - top left color in RGB [R, G, B] format.
     * - {array[number]} colorTopRight - top right color in RGB [R, G, B] format.
     * - {array[number]} colorBottomLeft - bottom left color in RGB [R, G, B] format.
     * - {array[number]} colorBottomRight - bottom right color in RGB [R, G, B] format.
     */
    constructor(data = false) {

        if (data === false) {
            throw "Palette: no data given.";
        }

        this.type = data.type ? data.type : "classic";
        this.width = data.width ? data.width : 300;
        this.height = data.height ? data.height : 300;
        this.width_resolution = data.widthResolution ? data.widthResolution : 2;
        this.height_resolution = data.heightResolution ? data.heightResolution : 2;

        if (data.canvas && typeof data.canvas === "string") {
            var canvas = document.querySelector(data.canvas);
            if (canvas !== null && canvas.tagName === "CANVAS") {
                this.canvas = document.querySelector(data.canvas);
            } else {
                throw "Palette: canvas element specified not found.";
            }
        } else {
            throw "Palette: no canvas element specified.";
        }

        if (this.type === "classic") {
            this.color_top_left = data.colorTopLeft ? data.colorTopLeft : [255, 255, 255];
            this.color_top_right = data.colorTopRight ? data.colorTopRight : [255, 0, 0];
            this.color_bottom_left = data.colorBottomLeft ? data.colorBottomLeft : [0, 0, 0];
            this.color_bottom_right = data.colorBottomRight ? data.colorBottomRight : [0, 0, 0];
        } else if (this.type === "hue") {
            this.colorBottom = data.colorBottom ? data.colorBottom : [255, 255, 255];
        } else {
            throw "Palette: type specified does not exist";
        }

        this.draw();
    }

    /**
     * Draws the palette.
     */
    draw() {

        var ctx = this.canvas.getContext("2d"),
            columns = Math.round(this.width / this.width_resolution),
            rows = Math.round(this.height / this.height_resolution);

        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        // If the selected palette type if "hue".
        if (this.type === "hue") {

            var hue_values = getHue(columns),
                fade_r = this.colorBottom[0], // The bottom fading color.
                fade_g = this.colorBottom[1],
                fade_b = this.colorBottom[2];

            // For each rows (in/decrement the hue row).
            for (let i = 0; i < rows; i++) {

                // For each columns (each column is a hue value, being decreased every row iteration).
                for (let j = 0; j < columns; j++) {

                    // Sets the hue color.
                    var r = hue_values[j][0],
                        g = hue_values[j][1],
                        b = hue_values[j][2];

                    // Adds the bottom color fade to it.
                    r += (fade_r - r) / ((rows - 1) / i);
                    g += (fade_g - g) / ((rows - 1) / i);
                    b += (fade_b - b) / ((rows - 1) / i);

                    ctx.fillStyle = "#" + rgbToHex(Math.round(r), Math.round(g), Math.round(b));
                    ctx.fillRect(j * this.width_resolution, i * this.height_resolution, this.width_resolution, this.height_resolution);
                }
            }
        }
        // If the selected palette type if "classic".
        else if (this.type === "classic") {

            var top_left_r = this.color_top_left[0], // Color on the bottom left.
                top_left_g = this.color_top_left[1],
                top_left_b = this.color_top_left[2],
                top_right_r = this.color_top_right[0], // Color on the top right.
                top_right_g = this.color_top_right[1],
                top_right_b = this.color_top_right[2],
                bottom_left_r = this.color_bottom_left[0], // Color on the bottom left.
                bottom_left_g = this.color_bottom_left[1],
                bottom_left_b = this.color_bottom_left[2],
                bottom_right_r = this.color_bottom_right[0], // Color on the bottom right.
                bottom_right_g = this.color_bottom_right[1],
                bottom_right_b = this.color_bottom_right[2];

            // For each rows.
            for (let i = 0; i < rows; i++) {

                var red = top_left_r,
                    green = top_left_g,
                    blue = top_left_b;

                // For each columns (individual cells).
                for (let j = 0; j < columns; j++) {

                    ctx.fillStyle = "#" + rgbToHex(Math.round(red), Math.round(green), Math.round(blue));
                    ctx.fillRect(j * this.width_resolution, i * this.height_resolution, this.width_resolution, this.height_resolution);

                    // Calculates the needed color from top left right to the top right color.
                    red -= (top_left_r - top_right_r) / (columns - 1);
                    green -= (top_left_g - top_right_g) / (columns - 1);
                    blue -= (top_left_b - top_right_b) / (columns - 1);
                }

                // In/decrement top left to bottom left colors.
                top_left_r -= (this.color_top_left[0] - bottom_left_r) / (rows - 1);
                top_left_g -= (this.color_top_left[1] - bottom_left_g) / (rows - 1);
                top_left_b -= (this.color_top_left[2] - bottom_left_b) / (rows - 1);

                // In/decrement top right to bottom right colors.
                top_right_r -= (this.color_top_right[0] - bottom_right_r) / (rows - 1);
                top_right_g -= (this.color_top_right[1] - bottom_right_g) / (rows - 1);
                top_right_b -= (this.color_top_right[2] - bottom_right_b) / (rows - 1);
            }
        }

    }
}