/* Base:
 * Hue to RGB
 *
 * To RGB:
 * HSL  to RGB
 * HSV  to RGB
 * HWB  to RGB
 * CMYK to RGB
 *
 * From RGB:
 * RGB to HEX
 * RGB to HSL
 * RGB to HSV
 * RGB to HWB
 * RGB to CMYK
 *
 * Other:
 * getHue
 */

// ####
// BASE
// ####

function hueToRgb(t1, t2, hue) {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;
    else if (hue < 3) return t2;
    else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
    else return t1;
}

// ######
// TO RGB
// ######

function hslToRgb(hue, saturation, light) {
    var t1, t2, r, g, b;
    hue = hue / 60;
    if (light <= 0.5) {
        t2 = light * (saturation + 1);
    } else {
        t2 = light + saturation - (light * saturation);
    }
    t1 = light * 2 - t2;
    r = hueToRgb(t1, t2, hue + 2) * 255;
    g = hueToRgb(t1, t2, hue) * 255;
    b = hueToRgb(t1, t2, hue - 2) * 255;
    return {r: r, g: g, b: b};
}

function hsvToRgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function hwbToRgb(hue, white, black) {
    var i, rgb, rgbArr = [], tot;
    rgb = hslToRgb(hue, 1, 0.50);
    rgbArr[0] = rgb.r / 255;
    rgbArr[1] = rgb.g / 255;
    rgbArr[2] = rgb.b / 255;
    tot = white + black;
    if (tot > 1) {
        white = Number((white / tot).toFixed(2));
        black = Number((black / tot).toFixed(2));
    }
    for (i = 0; i < 3; i++) {
        rgbArr[i] *= (1 - (white) - (black));
        rgbArr[i] += (white);
        rgbArr[i] = Number(rgbArr[i] * 255);
    }
    return {r: rgbArr[0], g: rgbArr[1], b: rgbArr[2]};
}

function cmykToRgb(c, m, y, k) {
    var r, g, b;
    r = 255 - ((Math.min(1, c * (1 - k) + k)) * 255);
    g = 255 - ((Math.min(1, m * (1 - k) + k)) * 255);
    b = 255 - ((Math.min(1, y * (1 - k) + k)) * 255);
    return {r: r, g: g, b: b};
}

// ########
// FROM RGB
// ########

function rgbToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length === 1)
        r = "0" + r;
    if (g.length === 1)
        g = "0" + g;
    if (b.length === 1)
        b = "0" + b;
    return r + g + b;
}

function rgbToHsl(r, g, b) {
    var min, max, i, l, s, maxcolor, h, rgb = [];
    rgb[0] = r / 255;
    rgb[1] = g / 255;
    rgb[2] = b / 255;
    min = rgb[0];
    max = rgb[0];
    maxcolor = 0;
    for (i = 0; i < rgb.length - 1; i++) {
        if (rgb[i + 1] <= min) {
            min = rgb[i + 1];
        }
        if (rgb[i + 1] >= max) {
            max = rgb[i + 1];
            maxcolor = i + 1;
        }
    }
    if (maxcolor == 0) {
        h = (rgb[1] - rgb[2]) / (max - min);
    }
    if (maxcolor == 1) {
        h = 2 + (rgb[2] - rgb[0]) / (max - min);
    }
    if (maxcolor == 2) {
        h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }
    if (isNaN(h)) {
        h = 0;
    }
    h = h * 60;
    if (h < 0) {
        h = h + 360;
    }
    l = (min + max) / 2;
    if (min == max) {
        s = 0;
    } else {
        if (l < 0.5) {
            s = (max - min) / (max + min);
        } else {
            s = (max - min) / (2 - max - min);
        }
    }
    s = s;
    return {h: h, s: s, l: l};
}

function rgbToHsv(r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
        diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: h * 360,
        s: s,
        v: v
    };
}

function rgbToHwb(r, g, b) {
    var h, w, bl;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    chroma = max - min;
    if (chroma == 0) {
        h = 0;
    } else if (r == max) {
        h = (((g - b) / chroma) % 6) * 360;
    } else if (g == max) {
        h = ((((b - r) / chroma) + 2) % 6) * 360;
    } else {
        h = ((((r - g) / chroma) + 4) % 6) * 360;
    }
    w = min;
    bl = 1 - max;
    return {h: h, w: w, b: bl};
}

function rgbToCmyk(r, g, b) {
    var c, m, y, k;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    k = 1 - max;
    if (k == 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        c = (1 - r - k) / (1 - k);
        m = (1 - g - k) / (1 - k);
        y = (1 - b - k) / (1 - k);
    }
    return {c: c, m: m, y: y, k: k};
}

// #####
// OTHER
// #####

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



// function colorObject(rgb, a, h, s) {
//     var hsl, hwb, cmyk, ncol, color, hue, sat;
//     if (!rgb) {
//         return emptyObject();
//     }
//     if (a === null) {
//         a = 1;
//     }
//     hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
//     hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
//     cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
//     hue = (h || hsl.h);
//     sat = (s || hsl.s);
//     ncol = hueToNcol(hue);
//     color = {
//         red: rgb.r,
//         green: rgb.g,
//         blue: rgb.b,
//         hue: hue,
//         sat: sat,
//         lightness: hsl.l,
//         whiteness: hwb.w,
//         blackness: hwb.b,
//         cyan: cmyk.c,
//         magenta: cmyk.m,
//         yellow: cmyk.y,
//         black: cmyk.k,
//         ncol: ncol,
//         opacity: a,
//         valid: true
//     };
//     color = roundDecimals(color);
//     return color;
// }

// function emptyObject() {
//     return {
//         red: 0,
//         green: 0,
//         blue: 0,
//         hue: 0,
//         sat: 0,
//         lightness: 0,
//         whiteness: 0,
//         blackness: 0,
//         cyan: 0,
//         magenta: 0,
//         yellow: 0,
//         black: 0,
//         ncol: "R",
//         opacity: 1,
//         valid: false
//     };
// }

// function getColorArr(x) {
//     if (x == "names") {
//         return ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
//     }
//     if (x == "hexs") {
//         return ['f0f8ff', 'faebd7', '00ffff', '7fffd4', 'f0ffff', 'f5f5dc', 'ffe4c4', '000000', 'ffebcd', '0000ff', '8a2be2', 'a52a2a', 'deb887', '5f9ea0', '7fff00', 'd2691e', 'ff7f50', '6495ed', 'fff8dc', 'dc143c', '00ffff', '00008b', '008b8b', 'b8860b', 'a9a9a9', 'a9a9a9', '006400', 'bdb76b', '8b008b', '556b2f', 'ff8c00', '9932cc', '8b0000', 'e9967a', '8fbc8f', '483d8b', '2f4f4f', '2f4f4f', '00ced1', '9400d3', 'ff1493', '00bfff', '696969', '696969', '1e90ff', 'b22222', 'fffaf0', '228b22', 'ff00ff', 'dcdcdc', 'f8f8ff', 'ffd700', 'daa520', '808080', '808080', '008000', 'adff2f', 'f0fff0', 'ff69b4', 'cd5c5c', '4b0082', 'fffff0', 'f0e68c', 'e6e6fa', 'fff0f5', '7cfc00', 'fffacd', 'add8e6', 'f08080', 'e0ffff', 'fafad2', 'd3d3d3', 'd3d3d3', '90ee90', 'ffb6c1', 'ffa07a', '20b2aa', '87cefa', '778899', '778899', 'b0c4de', 'ffffe0', '00ff00', '32cd32', 'faf0e6', 'ff00ff', '800000', '66cdaa', '0000cd', 'ba55d3', '9370db', '3cb371', '7b68ee', '00fa9a', '48d1cc', 'c71585', '191970', 'f5fffa', 'ffe4e1', 'ffe4b5', 'ffdead', '000080', 'fdf5e6', '808000', '6b8e23', 'ffa500', 'ff4500', 'da70d6', 'eee8aa', '98fb98', 'afeeee', 'db7093', 'ffefd5', 'ffdab9', 'cd853f', 'ffc0cb', 'dda0dd', 'b0e0e6', '800080', '663399', 'ff0000', 'bc8f8f', '4169e1', '8b4513', 'fa8072', 'f4a460', '2e8b57', 'fff5ee', 'a0522d', 'c0c0c0', '87ceeb', '6a5acd', '708090', '708090', 'fffafa', '00ff7f', '4682b4', 'd2b48c', '008080', 'd8bfd8', 'ff6347', '40e0d0', 'ee82ee', 'f5deb3', 'ffffff', 'f5f5f5', 'ffff00', '9acd32'];
//     }
// }

// function roundDecimals(c) {
//     c.red = Number(c.red.toFixed(0));
//     c.green = Number(c.green.toFixed(0));
//     c.blue = Number(c.blue.toFixed(0));
//     c.hue = Number(c.hue.toFixed(0));
//     c.sat = Number(c.sat.toFixed(2));
//     c.lightness = Number(c.lightness.toFixed(2));
//     c.whiteness = Number(c.whiteness.toFixed(2));
//     c.blackness = Number(c.blackness.toFixed(2));
//     c.cyan = Number(c.cyan.toFixed(2));
//     c.magenta = Number(c.magenta.toFixed(2));
//     c.yellow = Number(c.yellow.toFixed(2));
//     c.black = Number(c.black.toFixed(2));
//     c.ncol = c.ncol.substr(0, 1) + Math.round(Number(c.ncol.substr(1)));
//     c.opacity = Number(c.opacity.toFixed(2));
//     return c;
// }
