function print(val) {
    console.log(val)
}

function test(val) {
    print(val || "working")
}

const shadowColors = [
    { name: "White", hex: "#FFFFFF", tag: "Light", text: "Black" },
    { name: "Black", hex: "#000000", tag: "Dark", text: "White" },
    { name: "Charcoal", hex: "#36454F", tag: "Dark", text: "White" },
    { name: "Cadet gray", hex: "#959DA5", tag: "Light", text: "Black" },
    { name: "Dim gray", hex: "#64646F", tag: "Dark", text: "White" },
    { name: "Prussian blue", hex: "#26394d", tag: "Dark", text: "White" },
    { name: "Dark purple", hex: "#110c2e", tag: "Dark", text: "White" },
    { name: "Raisin black", hex: "#1F2632", tag: "Dark", text: "White" },
    { name: "Tea green", hex: "#CBEFBE", tag: "Light", text: "Black" },
    { name: "Majorelle Blue", hex: "#5546FF", tag: "Dark", text: "White" },
    { name: "UCLA Blue", hex: "#50749D", tag: "Dark", text: "White" },
    { name: "Slate Gray", hex: "#708090", tag: "Dark", text: "White" },
    { name: "Lavender (web)", hex: "#EBE9FF", tag: "Light", text: "Black" },
    { name: "Dark Slate Gray", hex: "#2F4F4F", tag: "Dark", text: "White" },
    { name: "Ghost white", hex: "#EEEFF7", tag: "Light", text: "Black" },
    { name: "Gunmetal", hex: "#2A3439", tag: "Dark", text: "White" },
    { name: "Jasmine", hex: "#FFDC7C", tag: "Light", text: "Black" },
    { name: "Dim Gray", hex: "#696969", tag: "Dark", text: "White" },
    { name: "Gray", hex: "#808080", tag: "Dark", text: "White" },
    { name: "Light Slate Gray", hex: "#778899", tag: "Light", text: "Black" },
    { name: "Steel Blue", hex: "#4682B4", tag: "Dark", text: "White" },
    { name: "Jordy Blue", hex: "#90AEF4", tag: "Light", text: "Black" },
    { name: "Royal Blue", hex: "#4169E1", tag: "Dark", text: "White" },
    { name: "Palatinate blue", hex: "#402FFF", tag: "Dark", text: "White" },
    { name: "Medium Slate Blue", hex: "#7B68EE", tag: "Light", text: "Black" },
    { name: "Violet", hex: "#7D23FF", tag: "Dark", text: "White" },
    { name: "Dark Olive Green", hex: "#556B2F", tag: "Dark", text: "White" },
    { name: "Forest Green", hex: "#228B22", tag: "Dark", text: "White" },
    { name: "Red (Crayola)", hex: "#EA495F", tag: "Light", text: "Black" },
    { name: "Dark Green", hex: "#006400", tag: "Dark", text: "White" },
    { name: "Dark Khaki", hex: "#BDB76B", tag: "Light", text: "Black" },
    { name: "Saddle Brown", hex: "#8B4513", tag: "Dark", text: "White" },
    { name: "Sienna", hex: "#A0522D", tag: "Dark", text: "White" },
    { name: "Peru", hex: "#CD853F", tag: "Light", text: "Black" },
    { name: "Chocolate", hex: "#D2691E", tag: "Light", text: "Black" },
    { name: "Rosy Brown", hex: "#BC8F8F", tag: "Light", text: "Black" },
    { name: "Indian Red", hex: "#CD5C5C", tag: "Light", text: "Black" },
    { name: "Firebrick", hex: "#B22222", tag: "Dark", text: "White" },
    { name: "Maroon", hex: "#800000", tag: "Dark", text: "White" },
    { name: "Dark Red", hex: "#8B0000", tag: "Dark", text: "White" },
    { name: "Crimson", hex: "#DC143C", tag: "Light", text: "Black" },
    { name: "Medium Violet Red", hex: "#C71585", tag: "Light", text: "Black" },
    { name: "Deep Pink", hex: "#FF1493", tag: "Light", text: "Black" },
    { name: "Dark Orchid", hex: "#9932CC", tag: "Dark", text: "White" },
    { name: "Purple", hex: "#800080", tag: "Dark", text: "White" },
    { name: "Rebecca Purple", hex: "#663399", tag: "Dark", text: "White" },
    { name: "Medium Purple", hex: "#9370DB", tag: "Light", text: "Black" },
    { name: "Thistle", hex: "#D8BFD8", tag: "Light", text: "Black" },
    { name: "Plum", hex: "#DDA0DD", tag: "Light", text: "Black" },
    { name: "Lavender", hex: "#E6E6FA", tag: "Light", text: "Black" },
    { name: "Lavender Blush", hex: "#FFF0F5", tag: "Light", text: "Black" },
    { name: "Light Pink", hex: "#FFB6C1", tag: "Light", text: "Black" },
    { name: "Hot Pink", hex: "#FF69B4", tag: "Light", text: "Black" },
    { name: "Light Coral", hex: "#F08080", tag: "Light", text: "Black" },
    { name: "Salmon", hex: "#FA8072", tag: "Light", text: "Black" },
    { name: "Coral", hex: "#FF7F50", tag: "Light", text: "Black" },
    { name: "Orange Red", hex: "#FF4500", tag: "Light", text: "Black" },
    { name: "Dark Orange", hex: "#FF8C00", tag: "Light", text: "Black" },
    { name: "Orange", hex: "#FFA500", tag: "Light", text: "Black" },
    { name: "Goldenrod", hex: "#DAA520", tag: "Light", text: "Black" },
    { name: "Dark Goldenrod", hex: "#B8860B", tag: "Dark", text: "White" },
    { name: "Cornsilk", hex: "#FFF8DC", tag: "Light", text: "Black" },
    { name: "Beige", hex: "#F5F5DC", tag: "Light", text: "Black" },
    { name: "Antique White", hex: "#FAEBD7", tag: "Light", text: "Black" },
    { name: "White Smoke", hex: "#F5F5F5", tag: "Light", text: "Black" },
    { name: "Delft Blue", hex: "#323269", tag: "Dark", text: "White" },
    { name: "Hollywood Cerise", hex: "#f02eaa", tag: "Light", text: "Black" },
    { name: "Columbia Blue", hex: "#ccdbe8", tag: "Light", text: "Black" },
    { name: "Celtic Blue", hex: "#0366d6", tag: "Dark", text: "White" },
    { name: "Air Superiority Blue", hex: "#88a5bf", tag: "Light", text: "Black" },
    { name: "Yale Blue", hex: "#0e3f7e", tag: "Dark", text: "White" },
    { name: "Oxford Blue", hex: "#091e42", tag: "Dark", text: "White" },
    { name: "Dim Gray", hex: "#636363", tag: "Dark", text: "White" },
    { name: "Space Cadet", hex: "#32325d", tag: "Dark", text: "White" },
    { name: "Oxford Blue", hex: "#06182c", tag: "Dark", text: "White" },
    { name: "Onyx", hex: "#3c4043", tag: "Dark", text: "White" },
    { name: "Charcoal", hex: "#434755", tag: "Dark", text: "White" },
    { name: "Eerie Black", hex: "#1b1f23", tag: "Dark", text: "White" },
    { name: "Rich Black", hex: "#0e1e25", tag: "Dark", text: "White" },
    { name: "Eerie Black", hex: "#212326", tag: "Dark", text: "White" },
    { name: "Rich Black", hex: "#11111a", tag: "Dark", text: "White" },
    { name: "Gainsboro", hex: "#DCDCDC", tag: "Light", text: "Black" }
];

function nest(parent, depth) {
    if (depth === 0) return
    const newdiv = document.createElement("div")
    newdiv.classList.add("tilt_infinity_child")
    parent.appendChild(newdiv)
    nest(newdiv, depth - 1)
}

function isLightColor(hex) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
    return luminance > 186 ? "Light" : "Dark";
}

function hexToRgba(hex, alpha) {
    hex = hex.replace(/^#/, '');
    let r, g, b, a = 1;
    if (hex.length === 6 || hex.length === 8) {
        if (alpha) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
            a = parseInt(alpha, 16) / 255;
            return [r, g, b, a.toFixed(2)];
        } else if (alpha === undefined) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
            return [r, g, b];
        }
    } else {
        throw new Error('Invalid HEX color.');
    }
}

function hexToRgba2(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 6) hex += 'ff'; // add full alpha if missing
    const bigint = parseInt(hex, 16);
    return [
        (bigint >> 24) & 255,
        (bigint >> 16) & 255,
        (bigint >> 8) & 255,
        bigint & 255
    ];
}

function convertBoxShadowHexToRgba(boxShadow) {
    return boxShadow.replace(/#([0-9a-fA-F]{8})(?!\w)/g, (match, hex) => {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const a = parseInt(hex.slice(6, 8), 16) / 255;
        return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    });
}

function rgbaToHex(r, g, b, a = 255) {
    return '#' + [r, g, b, a].map(x => x.toString(16).padStart(2, '0')).join('');
}

function rgbaToHsla(r, g, b, a, percentage) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let l = (max + min) / 2;
    let h, s;
    if (delta === 0) {
        h = 0;
        s = 0;
    } else {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
            case r:
                h = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }
        h *= 60;
    }
    a = Math.max(0, Math.min(1, a));
    if (percentage) {
        return [Math.round(h) + "%", Math.round(s * 100) + "%", Math.round(l * 100) + "%", a.toFixed(2)];
    } else {
        return [Math.round(h).toFixed(2), Math.round(s * 100).toFixed(2), Math.round(l * 100).toFixed(2), a.toFixed(2)];
    }
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
            case g: h = ((b - r) / d + 2); break;
            case b: h = ((r - g) / d + 4); break;
        }
        h *= 60;
    }

    return [h, s, l];
}

function rgbToHsb(r, g, b, percentage, alpha = null) {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let delta = max - min;
    let h, s, v;
    v = max;
    s = max === 0 ? 0 : delta / max;
    if (delta === 0) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }
        h /= 6;
    }
    const hValue = percentage ? Math.round(h * 360) + "%" : Math.round(h * 360);
    const sValue = percentage ? Math.round(s * 100) + "%" : Math.round(s * 100);
    const vValue = percentage ? Math.round(v * 100) + "%" : Math.round(v * 100);
    const result = [hValue, sValue, vValue];
    if (alpha !== null) {
        result.push(parseFloat(alpha.toFixed(2)));
    }
    return result;
}

function rgbToXyz(r, g, b, percentage) {
    function linearize(value) {
        return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    }
    r = linearize(r / 255);
    g = linearize(g / 255);
    b = linearize(b / 255);
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
    const z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;
    if (percentage) {
        return [(x * 100).toFixed(1) + "%", (y * 100).toFixed(1) + "%", (z * 100).toFixed(1) + "%"];
    } else {
        return [x, y, z];
    }
}

function xyzToLab(x, y, z, percentage) {
    const Xn = 95.047;
    const Yn = 100.000;
    const Zn = 108.883;
    const xNorm = x / Xn;
    const yNorm = y / Yn;
    const zNorm = z / Zn;
    function f(t) {
        return t > 0.008856 ? Math.pow(t, 1 / 3) : (t * 7.787) + (16 / 116);
    }
    const L = 116 * f(yNorm) - 16;
    const a = 500 * (f(xNorm) - f(yNorm));
    const b = 200 * (f(yNorm) - f(zNorm));
    if (percentage) {
        return [L.toFixed(0) + "%", a.toFixed(0) + "%", b.toFixed(0) + "%"];
    } else {
        return [L.toFixed(0), a.toFixed(0), b.toFixed(0)];
    }
}

function labToLch(L, a, b, percentage) {
    const C = Math.sqrt(a * a + b * b);
    const H = Math.atan2(b, a) * (180 / Math.PI);
    const hue = (H + 360) % 360;
    if (percentage) {
        return [L + "%", C.toFixed(0) + "%", hue.toFixed(0) + "%"];
    } else {
        return [L, C.toFixed(0), hue.toFixed(0)];
    }
}

function rgbToCmyk(r, g, b) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);
    if (k === 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
    }
    return [(c * 100).toFixed(1), (m * 100).toFixed(1), (y * 100).toFixed(1), (k * 100).toFixed(1)];
}

function hslToRgb(h, s, l) {
    h /= 360;
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    return [r, g, b];
}

class Slider {
    constructor(slider, custom_attr, set_to_custom_attr, output_unit) {
        this.slider = slider
        this.slider_max = slider.getAttribute("max")
        this.slider_min = slider.getAttribute("min")
        this.slider_value = this.slider.getAttribute("value")
        this.Custom_attr = custom_attr
        this.Set_to_custom_attr = set_to_custom_attr
        this.output_unit = output_unit
    }

    slider_calc(val) {
        this.slider_width = Math.round(convertRange(val, this.slider_min, this.slider_max, 0, 100))
        this.slider_value = val
        this.slider.setAttribute("style", "--slide_width:" + this.slider_width + "%;")
        this.Set_to_custom_attr.style.setProperty("--" + this.Custom_attr, this.slider_value + this.output_unit)
    }

    slider_drag(val) {
        if (val >= this.slider_min && val <= this.slider_max) {
            this.slider_width = Math.round(convertRange(val, this.slider_min, this.slider_max, 0, 100))
        } else if (val > this.slider_max) {
            this.slider_width = 100
        } else if (val < this.slider_min) {
            this.slider_width = 0
        }
        this.slider_value = val
        this.slider.setAttribute("style", "--slide_width:" + this.slider_width + "%;")
        this.Set_to_custom_attr.style.setProperty("--" + this.Custom_attr, this.slider_value + this.output_unit)
    }

    slider_customize(val) {
        this.slider.value = val
        this.slider_value = val
        this.slider_drag(val)
    }

    update() {
        this.slider_width = Math.round(convertRange(this.slider.value, this.slider_min, this.slider_max, 0, 100))
        this.slider.setAttribute("style", "--slide_width:" + this.slider_width + "%")
        this.slider.addEventListener("input", (e) => {
            this.slider_calc(this.slider.value)
        })
    }
}

class Toggle {
    constructor(toggle_btn, custom_attr, set_to_custom_attr, status) {
        this.Toggle_btn = toggle_btn
        this.Custom_attr = custom_attr
        this.Set_to_custom_attr = set_to_custom_attr
        this.toggle_status = false || status
    }

    toggle_change() {
        if (this.Toggle_btn.classList.contains("active")) {
            this.Set_to_custom_attr.classList.add(this.Custom_attr)
            this.toggle_status = true
        } else {
            this.Set_to_custom_attr.classList.remove(this.Custom_attr)
            this.toggle_status = false
        }
    }

    update() {
        if (this.toggle_status) {
            this.Toggle_btn.classList.toggle("active")
            this.toggle_change()
        }
        this.Toggle_btn.addEventListener("click", (e) => {
            this.Toggle_btn.classList.toggle("active")
            this.toggle_change()
        })
    }

    toggleCustomize(val) {
        if (this.toggle_status != val) {
            this.toggle_status = val
            this.Toggle_btn.classList.toggle("active")
            this.toggle_change()
        }
    }
}

const radsToDegrees = (radians) => {
    return radians * 180 / Math.PI;
}

const degreesToRads = (angle) => {
    return angle * (Math.PI / 180);
}

let centerX = document.clientWidth / 2
let centerY = document.clientHeight / 2
let mouseX
let mouseY
let mouse_down = false
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

let revolution_degree = 0
const revolution = (fromX, fromY, toX, toY, want_degree) => {
    let b = (toX - centerX) - fromX
    let p = (toY - centerY) - fromY
    if ((mouseX - centerX) < 0 && (mouseY - centerY) < 0) {
        revolution_degree = radsToDegrees(Math.abs(Math.atan(p / b)))
    } else if ((mouseX - centerX) > 0 && (mouseY - centerY) < 0) {
        revolution_degree = 90 + (90 - radsToDegrees(Math.abs(Math.atan(p / b))))
    } else if ((mouseX - centerX) > 0 && (mouseY - centerY) > 0) {
        revolution_degree = radsToDegrees(Math.abs(Math.atan(p / b))) + 180
    } else if ((mouseX - centerX) < 0 && (mouseY - centerY) > 0) {
        revolution_degree = 270 + (90 - radsToDegrees(Math.abs(Math.atan(p / b))))
    }
    if (want_degree == true) {
        return revolution_degree
    } else {
        return degreesToRads(revolution_degree);
    }
}

function calculateAngle(from_x, from_y, to_x, to_y) {
    const diffX = to_x - from_x;
    const diffY = to_y - from_y;
    const angleRadians = Math.atan2(diffY, diffX);
    let angleDegrees = angleRadians * (180 / Math.PI);
    if (angleDegrees < 0) {
        angleDegrees += 360;
    }
    return angleDegrees;
}

function calculateDistanceFromCenter(x, y, from_x, from_y) {
    const deltaX = x - from_x;
    const deltaY = y - from_y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function convertToPercentage(value, min, max) {
    if (min === max) {
        throw new Error("Minimum and maximum values must be different.");
    }
    value = Math.max(min, Math.min(max, value));
    const percentage = ((value - min) / (max - min)) * 100;
    return percentage;
}

function convertRange(value, minIn, maxIn, minOut, maxOut) {
    if (minIn === maxIn) {
        throw new Error("Input minimum and maximum values must be different.");
    }
    const convertedValue = ((value - minIn) / (maxIn - minIn)) * (maxOut - minOut) + minOut;
    return Math.max(minOut, Math.min(maxOut, convertedValue));
}

function getCoordinates(angle, originX, originY, distance) {
    let radians = degreesToRads(angle)
    let x = originX - distance * Math.cos(radians);
    let y = originY - distance * Math.sin(radians);
    return { x: x, y: y };
}

function calculateRealisticShadow(element, layers, baseDistance, baseBlur, baseSpread, baseOpacity, angle, inset = false) {
    let shadows = [];
    let radianAngle = angle * (Math.PI / 180);
    for (let i = 1; i <= layers; i++) {
        baseDistance /= 3;
        baseDistance *= 2;
        let offsetX = Math.round(baseDistance * Math.cos(radianAngle));
        let offsetY = Math.round(baseDistance * Math.sin(radianAngle));
        baseBlur *= 3;
        let blur = baseBlur /= 2;
        let spread = baseSpread * i;
        let opacity = baseOpacity - (baseOpacity / (i * 0.6));
        opacity = Math.max(opacity, 0);
        let shadow = `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(4, 47, 255, ${opacity})`;
        shadows.push(shadow);
    }
    element.style.boxShadow = shadows.join(', ');
}

let keypressed
let keypressed_code
document.addEventListener("keydown", (e) => {
    keypressed = e.key
    keypressed_code = e.keyCode
})
document.addEventListener("keyup", (e) => {
    keypressed = undefined
    keypressed_code = undefined
})

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        keypressed = undefined;
        keypressed_code = undefined;
    }
});

function getNearestStepVal(val, minval, maxval, steps) {
    let stepSize = (maxval - minval) / (steps - 1);
    if (val <= minval) return minval;
    if (val >= maxval) return maxval;
    let stepIndex = Math.round((val - minval) / stepSize);
    return minval + stepIndex * stepSize;
}

function closestDivisible(number, divisible) {
    if (number % divisible === 0) {
        return number;
    } else {
        return number - (number % divisible);
    }
}

function copyClipboard(copy_button, toCopy) {
    copy_button.addEventListener("click", () => {
        navigator.clipboard.writeText(toCopy)
    })
}

class InputBox {
    constructor(input, value_to) {
        this.input = input
        this.value_to = value_to
        this.input_value = this.input.getAttribute("value")
    }

    customizeInput(val) {
        this.input_value = val
        this.input.value = val
    }

    update() {
        this.input.addEventListener("change", (e) => {
            this.input_value = parseFloat(e.target.value)
            this.value_to.slider_customize(this.input_value)
        })
    }
}

class ColorList {
    constructor(controller, listbox, activeTo, colorAmt, colorInput, colorBoxStyle, colorViewStyle, colorViewClass, colorNameClass, colorOutput, hexCodeTo, nameTo, Palette) {
        this.controller = controller
        this.listbox = listbox
        this.activeTo = activeTo
        this.colorAmt = colorAmt
        this.colorInput = colorInput
        this.color_view_box
        this.color_view
        this.color_name
        this.colorBoxStyle = colorBoxStyle
        this.colorViewStyle = colorViewStyle
        this.colorViewClass = colorViewClass
        this.colorNameClass = colorNameClass
        this.colorOutput = colorOutput
        this.hexCodeTo = hexCodeTo
        this.nameTo = nameTo
        this.Palette = Palette
        this.colorData = { hex: "000000", colorName: "black", rgb: "0,0,0", tag: "Dark", text: "White" }
    }

    create() {
        if (this.colorAmt == "Full") {
            this.colorAmt = shadowColors.length
        }
        for (let i = 0; i < this.colorAmt; i++) {
            this.color_view_box = document.createElement("div")
            if (this.colorBoxStyle) {
                this.color_view_box.setAttribute("style", `display: flex; align-items: center; gap: 5px;`)
            }
            this.color_view = document.createElement("div")
            this.color_name = document.createElement("p")
            this.listbox.appendChild(this.color_view_box)
            this.color_view_box.appendChild(this.color_view)
            this.color_view_box.appendChild(this.color_name)
            this.color_view.classList.add(this.colorViewClass)
            this.color_view.setAttribute("style", `--color_view_bg:${shadowColors[i].hex};`)
            if (this.colorViewStyle) {
                this.color_view.setProperty("style", `--color_view_bg:${shadowColors[i].hex}; width: 12px; height: 12px; background: var(--color_view_bg);`)
            }
            this.color_view.setAttribute("hex_value", shadowColors[i].hex)
            this.color_view.setAttribute("tag", shadowColors[i].tag)
            this.color_view.setAttribute("text", shadowColors[i].text)
            this.color_name.classList.add(this.colorNameClass)
            this.color_name.innerHTML = shadowColors[i].name
        }
    }

    removeHide() {
        Array.from(this.listbox.children).forEach(color_view_boxes => {
            color_view_boxes.classList.remove("hide")
        })
    }

    resetPallete(val) {
        this.Palette.value = val
    }

    customizeColor(hex, name, rgb, tag, text) {
        this.colorData.hex = hex
        this.colorData.colorName = name
        this.colorData.rgb = rgb
        this.colorData.tag = tag
        this.colorData.text = text
        if (this.nameTo != undefined) {
            this.nameTo.innerHTML = this.colorData.colorName
        }
        if (this.colorOutput != undefined) {
            this.colorOutput.style.setProperty(`--color_view_bg`, this.colorData.hex)
        }
    }

    select() {
        Array.from(this.listbox.children).forEach(color_view_boxes => {
            color_view_boxes.addEventListener("click", (e) => {
                this.customizeColor(color_view_boxes.children[0].getAttribute("hex_value"), color_view_boxes.children[1].innerHTML, hexToRgba(color_view_boxes.children[0].getAttribute("hex_value")).toString(), color_view_boxes.children[0].getAttribute("tag"), color_view_boxes.children[0].getAttribute("text"))
                if (this.colorOutput != undefined) {
                    this.colorOutput.style.setProperty(`--color_view_bg`, this.colorData.hex)
                }
                this.hexCodeTo.setAttribute("hex_code", this.colorData.hex)
                if (this.Palette != undefined) {
                    this.resetPallete(this.colorData.hex)
                }
                this.removeHide()
                return this.colorData
            })
        })
        this.controller.addEventListener("click", () => {
            this.activeTo.classList.toggle("active")
        })
        document.addEventListener("click", (e) => {
            if (e.target !== this.controller && e.target !== this.colorInput && e.target !== this.Palette && e.target !== this.controller.children[0]) {
                this.activeTo.classList.remove("active")
                this.colorInput.value = ""
                this.removeHide()
            }
        })
    }

    customInput() {
        if (this.colorInput.tagName === 'INPUT') {
            this.colorInput.addEventListener("keydown", (e) => {
                if (e.key === 'Enter') {
                    this.hexCodeTo.setAttribute("hex_code", this.colorInput.value)
                    // this.customizeColor("#" + this.colorInput.value, "Custom", hexToRgba(this.colorInput.value).toString(), this.listbox.children.children[0].getAttribute("tag"), this.listbox.children.children[0].getAttribute("text"))
                    this.customizeColor("#" + this.colorInput.value, "Custom", hexToRgba(this.colorInput.value).toString(), "Light", "Black")
                    if (this.colorOutput != undefined) {
                        this.colorOutput.style.setProperty(`--color_view_bg`, "#" + this.colorInput.value)
                    }
                    if (this.Palette != undefined) {
                        this.resetPallete("#" + this.colorInput.value)
                    }
                    this.colorInput.value = ""
                    this.activeTo.classList.remove("active")
                    this.removeHide()
                }
            })
            this.colorInput.addEventListener("input", (e) => {
                this.input = e.target.value.toLowerCase()
                shadowColors.forEach((shadowColor, index) => {
                    const isVisible = shadowColor.hex.toLowerCase().includes(this.input)
                    this.listbox.children[index].classList.toggle("hide", !isVisible)
                })
            })
        }
        if (this.Palette != undefined) {
            this.Palette.addEventListener("input", (e) => {
                this.customizeColor(this.Palette.value, "Custom", hexToRgba(this.Palette.value).toString())
                this.hexCodeTo.setAttribute("hex_code", this.Palette.value)
                this.input = this.Palette.value.toLowerCase()
                shadowColors.forEach((shadowColor, index) => {
                    const isVisible = shadowColor.hex.toLowerCase().includes(this.input)
                    this.listbox.children[index].classList.toggle("hide", !isVisible)
                })
            })
        }
    }
}

const createTag = (tag, className = '', styles = {}, appendTo) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    Object.assign(el.style, styles);
    if (appendTo) {
        appendTo.appendChild(el)
    }
    return el;
}

function recolorShadow(shadowStr, newBaseHex) {
    const baseRgb = hexToRgba2(newBaseHex);
    const [baseH, baseS] = rgbToHsl(...baseRgb.slice(0, 3));

    const colorMatches = shadowStr.match(/#([0-9a-fA-F]{6,8})/g) || [];

    if (colorMatches.length === 1) {
        const [r, g, b, a] = hexToRgba2(colorMatches[0]);
        return shadowStr.replace(/#([0-9a-fA-F]{6,8})/g, rgbaToHex(...baseRgb.slice(0, 3), a));
    }

    const baseRgbList = colorMatches.map(hex => {
        const [r, g, b] = hexToRgba2(hex).slice(0, 3);
        return `${r},${g},${b}`;
    });

    const allSameBase = baseRgbList.every(rgb => rgb === baseRgbList[0]);

    if (allSameBase) {
        return shadowStr.replace(/#([0-9a-fA-F]{6,8})/g, (match, hex) => {
            const [, , , a] = hexToRgba2('#' + hex);
            return rgbaToHex(...baseRgb.slice(0, 3), a);
        });
    }

    let matchIndex = 0;
    return shadowStr.replace(/#([0-9a-fA-F]{6,8})/g, (match, hex) => {
        const [r, g, b, a] = hexToRgba2('#' + hex);

        if (matchIndex === 0) {
            matchIndex++;
            return rgbaToHex(...baseRgb.slice(0, 3), a);
        }

        const [, , lightness] = rgbToHsl(r, g, b);
        const newRgb = hslToRgb(baseH, baseS, lightness);
        matchIndex++;
        return rgbaToHex(...newRgb, a);
    });
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function interpolate2DGrid(rows, cols, start, end) {
    const [x0, y0] = start;
    const [x1, y1] = end;
    const gx = x1 - x0;
    const gy = y1 - y0;
    const gLenSq = gx * gx + gy * gy;
    const grid = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
            const dx = x - x0;
            const dy = y - y0;
            let t = (dx * gx + dy * gy) / gLenSq;
            t = Math.max(0, Math.min(1, t));
            row.push(Number(t.toFixed(2)));
        }
        grid.push(row);
    }
    return grid;
}

function drawPoint(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
    ctx.fill();
    // ctx.closePath()
}
