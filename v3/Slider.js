/**
 * Slider.
 *
 * Sets up and builds a new slider element.
 */
class Slider {

    /**
     * Sets up the slider's attributes.
     *
     * @param {object|boolean} data:
     * - {DOMString} canvas - DOM element selector string.
     * - {string} [type=classic] - "classic" or "hue".
     * - {string} [orientation=vertical] - "vertical" or "horizontal".
     * - {int} [width=30]  - slider's width in pixel.
     * - {int} [height=300] - slider's height in pixel.
     * - {int} [resolution=2] - slider's resolution in pixel.
     * - {array[number]} colorStart - start color in RGB [R, G, B] format.
     * - {array[number]} colorEnd - end color in RGB [R, G, B] format.
     */
    constructor(data = false) {

        if (data === false) {
            throw "Palette: no data given.";
        }

        this.type = data.type ? data.type : "classic";
        this.orientation = data.orientation ? data.orientation : "vertical";
        if (this.orientation === "vertical") {
            this.width = data.width ? data.width : 30;
            this.height = data.height ? data.height : 300;
        } else {
            this.width = data.width ? data.width : 300;
            this.height = data.height ? data.height : 30;
        }
        this.resolution = data.resolution ? data.resolution : 2;
        this.color_start = data.colorStart ? data.colorStart : [255, 255, 255];
        this.color_end = data.colorEnd ? data.colorEnd : [0, 0, 0];

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

        this.draw();
    }

    /**
     * Draws the slider.
     */
    draw() {

        var ctx = this.canvas.getContext("2d"),
            // Sets the hue values if type = "hue".
            hue_values = [],
            // Sets the starting color, which will be in/decremented.
            start_r = this.color_start[0],
            start_g = this.color_start[1],
            start_b = this.color_start[2],
            // Sets the ending color, which serves as a reference for the start color.
            end_r = this.color_end[0],
            end_g = this.color_end[1],
            end_b = this.color_end[2],
            // Number of iterations (400px width with 10px block = 40 iterations).
            iterations,
            // The block's position and size.
            block_x,
            block_y,
            block_w,
            block_h;

        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        // If the slider has horizontal orientation.
        if (this.orientation === "horizontal") {
            iterations = Math.round(this.width / this.resolution); // Columns
            block_x = this.resolution;
            block_y = 0;
            block_w = this.resolution;
            block_h = this.width;
        } // If the slider has vertical orientation.
        else {
            iterations = Math.round(this.height / this.resolution); // Rows.
            block_x = 0;
            block_y = this.resolution;
            block_w = this.width;
            block_h = this.resolution;
        }

        if (this.type === "hue") {
            hue_values = getHue(iterations);
        } else {
            // Sets the starting color, which will be in/decremented.
            start_r = this.color_start[0];
            start_g = this.color_start[1];
            start_b = this.color_start[2];
            // Sets the ending color, which serves as a reference for the start color.
            end_r = this.color_end[0];
            end_g = this.color_end[1];
            end_b = this.color_end[2];
        }

        for (let i = 0; i < iterations; i++) {

            if (this.type === "hue") {
                start_r = hue_values[i][0];
                start_g = hue_values[i][1];
                start_b = hue_values[i][2];
            }

            ctx.fillStyle = "#" + rgbToHex(Math.round(start_r), Math.round(start_g), Math.round(start_b));
            ctx.fillRect(i * block_x, i * block_y, block_w, block_h);

            if (this.type === "classic") {
                start_r -= (this.color_start[0] - end_r) / (iterations - 1);
                start_g -= (this.color_start[1] - end_g) / (iterations - 1);
                start_b -= (this.color_start[2] - end_b) / (iterations - 1);
            }
        }
    }
}