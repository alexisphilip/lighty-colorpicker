/**
 * Slider
 *
 * Sets up and builds a new slider element.
 */
class Slider extends ColorPickerElement {
    resolution;
    colorStart;
    colorEnd;
    orientation;

    /**
     * Sets up the slider's attributes.
     *
     * @param data {object|boolean} - See parent class for details.
     */
    constructor(data = false) {
        super(data, "slider");

        // TODO: find a way to make that part lighter.
        data.orientation = data.orientation ? data.orientation : "vertical";
        this.orientation = data.orientation;
        if (this.orientation === "vertical") {
            this.width = data.width ? data.width : 30;
            this.height = data.height ? data.height : 200;
        } else {
            this.width = data.width ? data.width : 200;
            this.height = data.height ? data.height : 30;
        }
        this.resolution = data.resolution ? data.resolution : 2;
        this.colorStart = data.colorStart ? data.colorStart : [255, 255, 255];
        this.colorEnd = data.colorEnd ? data.colorEnd : [0, 0, 0];

        this.init(data);
        this.draw();
    }

    /**
     * Draws the slider.
     */
    draw() {
        // TODO:
        //  Split code in two parts:
        //    if (classic) (default)
        //      if (vertical) (default)
        //      else (horizontal)
        //    else (hue)
        //  Then add same condition in the constructor

        var ctx = this.elementCanvas.getContext("2d"),
            // Sets the hue values if type = "hue".
            hue_values = [],
            // Sets the starting color, which will be in/decremented.
            start_r = this.colorStart[0],
            start_g = this.colorStart[1],
            start_b = this.colorStart[2],
            // Sets the ending color, which serves as a reference for the start color.
            end_r = this.colorEnd[0],
            end_g = this.colorEnd[1],
            end_b = this.colorEnd[2],
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
            start_r = this.colorStart[0];
            start_g = this.colorStart[1];
            start_b = this.colorStart[2];
            // Sets the ending color, which serves as a reference for the start color.
            end_r = this.colorEnd[0];
            end_g = this.colorEnd[1];
            end_b = this.colorEnd[2];
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
                start_r -= (this.colorStart[0] - end_r) / (iterations - 1);
                start_g -= (this.colorStart[1] - end_g) / (iterations - 1);
                start_b -= (this.colorStart[2] - end_b) / (iterations - 1);
            }
        }
    }
}