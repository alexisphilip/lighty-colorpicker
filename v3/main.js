/**
 * Red        (percentage of red)         0-255
 * Green      (percentage of green)       0-255
 * Blue       (percentage of blue)        0-255
 *
 * Hue        (0° (red) to 359° (red))    0-359°
 * Saturation (percentage of pure color)  0-100%
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

var classicPaletteCanvas = document.querySelector("#classicPalette"),
    huePaletteCanvas = document.querySelector("#huePalette"),
    classicPaletteCtx = classicPaletteCanvas.getContext("2d"),
    huePaletteCtx = huePaletteCanvas.getContext("2d");

// Color picker set up.
var classicPalette = {
        hue: [255, 0, 0],
        width: 400,
        height: 300,
        resolution_width: 8,
        resolution_height: 6
    },
    huePalette = {
        fade: {
            r: 255,
            g: 255,
            b: 255
        },
        width: 400,
        height: 300,
        resolution_width: 8,
        resolution_height: 6
    };

drawClassicPalette();
drawHuePalette();

function drawHuePalette() {

    var columns = Math.round(huePalette.width / huePalette.resolution_width),
        rows = Math.round(huePalette.height / huePalette.resolution_height);

    huePaletteCtx.canvas.width = huePalette.width;
    huePaletteCtx.canvas.height = huePalette.height;

    var hue_values = getHue(columns),
        fade_r = huePalette.fade.r, // The bottom fading color.
        fade_g = huePalette.fade.g,
        fade_b = huePalette.fade.b;

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < columns; j++) {

            // Sets the hue color.
            var r = hue_values[j][0],
                g = hue_values[j][1],
                b = hue_values[j][2];

            // Adds the bottom color fade to it.
            r += (fade_r - r) / ((rows - 1) / i);
            g += (fade_g - g) / ((rows - 1) / i);
            b += (fade_b - b) / ((rows - 1) / i);

            huePaletteCtx.fillStyle = "#" + rgbToHex(Math.round(r), Math.round(g), Math.round(b));
            huePaletteCtx.fillRect(j * huePalette.resolution_width, i * huePalette.resolution_height, huePalette.resolution_width, huePalette.resolution_height);
        }
    }
}

function drawClassicPalette() {

    var columns = Math.round(classicPalette.width / classicPalette.resolution_width),
        rows = Math.round(classicPalette.height / classicPalette.resolution_height),
        white_r = 255, // White color (color on the left).
        white_g = 255,
        white_b = 255,
        hue_r = classicPalette.hue[0], // Hue color (color on the right).
        hue_g = classicPalette.hue[1],
        hue_b = classicPalette.hue[2];

    classicPaletteCtx.canvas.width = classicPalette.width;
    classicPaletteCtx.canvas.height = classicPalette.height;

    // For each rows.
    for (let i = 0; i < rows; i++) {

        var red = white_r,
            green = white_g,
            blue = white_b;

        // For each columns (individual cells).
        for (let j = 0; j < columns; j++) {

            classicPaletteCtx.fillStyle = "#" + rgbToHex(Math.round(red), Math.round(green), Math.round(blue));
            classicPaletteCtx.fillRect(j * classicPalette.resolution_width, i * classicPalette.resolution_height, classicPalette.resolution_width, classicPalette.resolution_height);

            // Calculates the needed color from white (color on the left) and the hue (color on the right).
            red -= (white_r - hue_r) / (columns - 1);
            green -= (white_g - hue_g) / (columns - 1);
            blue -= (white_b - hue_b) / (columns - 1);

            // If values are smaller than 0 (is this a JS float bug?).
            // if (red < 0) red = 0;
            // if (green < 0) green = 0;
            // if (blue < 0) blue = 0;
        }

        // console.log(r_y, g_y, b_y);
        // console.log(hue_r, hue_g, hue_b);

        // Subtracts white color (color on the left).
        white_r -= 255 / (rows - 1);
        white_g -= 255 / (rows - 1);
        white_b -= 255 / (rows - 1);

        // Subtracts hue color (color on the right).
        hue_r -= classicPalette.hue[0] / (rows - 1);
        hue_g -= classicPalette.hue[1] / (rows - 1);
        hue_b -= classicPalette.hue[2] / (rows - 1);

        // If values are smaller than 0 (is this a JS float bug?).
        // if (white_r < 0) white_r = 0;
        // if (white_g < 0) white_g = 0;
        // if (white_b < 0) white_b = 0;
        // if (hue_r < 0) hue_r = 0;
        // if (hue_g < 0) hue_g = 0;
        // if (hue_b < 0) hue_b = 0;
    }
}


function getHue(steps) {
    var r = 255,
        g = 0,
        b = 0,
        values = [[r, g, b]];

    var total_bits = 1530,
        bits = total_bits / (steps - 1);

    var round_steps = 1;

    for (let i = 0; i < steps - 1; i++) {
        var remaining = 0;
        if (round_steps === 1) {
            g += bits;
            if (g > 255) {
                remaining = g - 255;
                g = 255;
                round_steps++;
            } else {
                remaining = 0;
                values.push([r, g, b]);
            }
        }
        if (round_steps === 2) {
            if (remaining) r -= remaining;
            else r -= bits;
            if (r < 0) {
                remaining = Math.abs(r);
                r = 0;
                round_steps++;
            } else {
                remaining = 0;
                values.push([r, g, b]);
            }
        }
        if (round_steps === 3) {
            if (remaining) b += remaining;
            else b += bits;
            if (b > 255) {
                remaining = b - 255;
                b = 255;
                round_steps++;
            } else {
                remaining = 0;
                values.push([r, g, b]);
            }
        }
        if (round_steps === 4) {
            if (remaining) g -= remaining;
            else g -= bits;
            if (g < 0) {
                remaining = Math.abs(g);
                g = 0;
                round_steps++;
            } else {
                remaining = 0;
                values.push([r, g, b]);
            }
        }
        if (round_steps === 5) {
            if (remaining) r += remaining;
            else r += bits;
            if (r > 255) {
                remaining = r - 255;
                r = 255;
                round_steps++;
            } else {
                remaining = 0;
                values.push([r, g, b]);
            }
        }
        if (round_steps === 6) {
            if (remaining) b -= remaining;
            else b -= bits;
            if (b < 0) {
                remaining = Math.abs(b);
                b = 0;
                round_steps++;
            } else {
                remaining = 0;
                values.push([r, g, b]);
            }
        }
        // console.log(Math.round(r), Math.round(g), Math.round(b));

        // Essayer avec des while() et remaining :
        // var remaining = 0;
        // while (g < 255);
        // while (r > 0);
    }

    // TODO: when asking for 100 steps, returns only 99
    if (values.length !== steps) {
        values.push([255, 0, 0]);
    }

    return values;
}