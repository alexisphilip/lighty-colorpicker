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

var canvas = document.querySelector('#cp');
var ctx = canvas.getContext('2d');

// Color picker set up.
var hue = [255, 0, 0],
    width = 400,
    height = 300,
    resolution_width = 40,
    resolution_height = 30,
    columns = Math.round(width / resolution_width),
    rows = Math.round(height / resolution_height);

// White color.
var white_r = 255,
    white_g = 255,
    white_b = 255,
    hue_r = hue[0],
    hue_g = hue[1],
    hue_b = hue[2];

ctx.canvas.width = width;
ctx.canvas.height = height;

for (let i = 0; i < rows; i++) {

    var red = white_r,
        green = white_g,
        blue = white_b;

    for (let j = 0; j < columns; j++) {

        ctx.fillStyle = "#" + rgbToHex(Math.round(red), Math.round(green), Math.round(blue));
        ctx.fillRect(j * resolution_width, i * resolution_height, resolution_width, resolution_height);

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
    hue_r -= hue[0] / (rows - 1);
    hue_g -= hue[1] / (rows - 1);
    hue_b -= hue[2] / (rows - 1);

    // If values are smaller than 0 (is this a JS float bug?).
    // if (white_r < 0) white_r = 0;
    // if (white_g < 0) white_g = 0;
    // if (white_b < 0) white_b = 0;
    // if (hue_r < 0) hue_r = 0;
    // if (hue_g < 0) hue_g = 0;
    // if (hue_b < 0) hue_b = 0;
}
