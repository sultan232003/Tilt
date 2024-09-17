function print(val) {
    console.log(val)
}

const shadowColors = [
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Cadet gray", hex: "#959da5" },
    { name: "Dim gray", hex: "#64646f" },
    { name: "Dark purple", hex: "#110c2e" },
    { name: "Dim gray", hex: "#636363" },
    { name: "Raisin black", hex: "#1F2632" },
    { name: "Tea green", hex: "#CBEFBE" },
    { name: "Majorelle Blue", hex: "#5546FF" },
    { name: "Cadet gray", hex: "#959DA5" },
    { name: "Dim gray", hex: "#64646F" },
    { name: "UCLA Blue", hex: "#50749D" },
    { name: "Slate Gray", hex: "#708090" },
    { name: "Lavender (web)", hex: "#EBE9FF" },
    { name: "Dark Slate Gray", hex: "#2F4F4F" },
    { name: "Ghost white", hex: "#EEEFF7" },
    { name: "Gunmetal", hex: "#2A3439" },
    { name: "Jasmine", hex: "#FFDC7C" },
    { name: "Dim Gray", hex: "#696969" },
    { name: "Gray", hex: "#808080" },
    { name: "Light Slate Gray", hex: "#778899" },
    { name: "Steel Blue", hex: "#4682B4" },
    { name: "Jordy Blue", hex: "#90AEF4" },
    { name: "Royal Blue", hex: "#4169E1" },
    { name: "Palatinate blue", hex: "#402FFF" },
    { name: "Medium Slate Blue", hex: "#7B68EE" },
    { name: "Violet", hex: "#7D23FF" },
    { name: "Dark Olive Green", hex: "#556B2F" },
    { name: "Forest Green", hex: "#228B22" },
    { name: "Red (Crayola)", hex: "#EA495F" },
    { name: "Dark Green", hex: "#006400" },
    { name: "Jordy Blue", hex: "#88BEF4" },
    { name: "Dark Khaki", hex: "#BDB76B" },
    { name: "Saddle Brown", hex: "#8B4513" },
    { name: "Sienna", hex: "#A0522D" },
    { name: "Peru", hex: "#CD853F" },
    { name: "Chocolate", hex: "#D2691E" },
    { name: "Rosy Brown", hex: "#BC8F8F" },
    { name: "Indian Red", hex: "#CD5C5C" },
    { name: "Firebrick", hex: "#B22222" },
    { name: "Maroon", hex: "#800000" },
    { name: "Dark Red", hex: "#8B0000" },
    { name: "Crimson", hex: "#DC143C" },
    { name: "Medium Violet Red", hex: "#C71585" },
    { name: "Deep Pink", hex: "#FF1493" },
    { name: "Dark Orchid", hex: "#9932CC" },
    { name: "Purple", hex: "#800080" },
    { name: "Rebecca Purple", hex: "#663399" },
    { name: "Medium Purple", hex: "#9370DB" },
    { name: "Thistle", hex: "#D8BFD8" },
    { name: "Plum", hex: "#DDA0DD" },
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Lavender Blush", hex: "#FFF0F5" },
    { name: "Light Pink", hex: "#FFB6C1" },
    { name: "Hot Pink", hex: "#FF69B4" },
    { name: "Light Coral", hex: "#F08080" },
    { name: "Salmon", hex: "#FA8072" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Orange Red", hex: "#FF4500" },
    { name: "Dark Orange", hex: "#FF8C00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Goldenrod", hex: "#DAA520" },
    { name: "Dark Goldenrod", hex: "#B8860B" },
    { name: "Cornsilk", hex: "#FFF8DC" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Antique White", hex: "#FAEBD7" },
    { name: "White Smoke", hex: "#F5F5F5" },
    { name: "Gainsboro", hex: "#DCDCDC" }
];


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

function rgbToHsb(r, g, b, percentage) {
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
    if (percentage) {
        return [Math.round(h * 360) + "%", Math.round(s * 100) + "%", Math.round(v * 100) + "%"];
    } else {
        return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
    }
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

function copyClipboard (copy_button, toCopy){
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
    constructor(controller, listbox, activeTo, colorAmt, colorBoxStyle, colorViewStyle, colorViewClass, colorNameClass, colorOutput, hexCodeTo) {
        this.controller = controller
        this.listbox = listbox
        this.activeTo = activeTo
        this.colorAmt = colorAmt
        this.color_view_box
        this.color_view
        this.color_name
        this.colorBoxStyle = colorBoxStyle
        this.colorViewStyle = colorViewStyle
        this.colorViewClass = colorViewClass
        this.colorNameClass = colorNameClass
        this.colorOutput = colorOutput
        this.hexCodeTo = hexCodeTo
        this.colorData = { hex: "000000", colorName: "black", rgb: "0,0,0" }
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
                this.color_view.setAttribute("style", `--color_view_bg:${shadowColors[i].hex}; width: 12px; height: 12px; background: var(--color_view_bg);`)
            }
            this.color_view.setAttribute("hex_value", shadowColors[i].hex)
            this.color_name.classList.add(this.colorNameClass)
            this.color_name.innerHTML = shadowColors[i].name
        }
    }

    removeHide() {
        Array.from(this.listbox.children).forEach(color_view_boxes => {
            color_view_boxes.classList.remove("hide")
        })
    }

    customizeColor(hex, name, rgb) {
        this.colorData.hex = hex
        this.colorData.colorName = name
        this.colorData.rgb = rgb
        this.controller.innerHTML = this.colorData.colorName
        this.colorOutput.style.setProperty(`--color_view_bg`, "#" + this.colorData.hex)
    }

    select() {
        Array.from(this.listbox.children).forEach(color_view_boxes => {
            color_view_boxes.addEventListener("click", (e) => {
                this.customizeColor(color_view_boxes.children[0].getAttribute("hex_value"), color_view_boxes.children[1].innerHTML, hexToRgba(color_view_boxes.children[0].getAttribute("hex_value")).toString())
                if (this.colorOutput != undefined) {
                    this.colorOutput.setAttribute("style", `--color_view_bg:${this.colorData.hex};`)
                }
                this.hexCodeTo.setAttribute("hex_code", this.colorData.hex)
                this.removeHide()
                return this.colorData
            })
        })
        this.controller.addEventListener("click", () => {
            this.activeTo.classList.toggle("active")
        })
        document.addEventListener("click", (e) => {
            if (e.target !== this.controller && e.target !== this.activeTo.children[0]) {
                this.activeTo.classList.remove("active")
                this.activeTo.children[0].value = ""
                this.removeHide()
            }
        })
    }

    customInput() {
        if (this.activeTo.children[0].tagName === 'INPUT') {
            this.activeTo.children[0].addEventListener("keydown", (e) => {
                if (e.key === 'Enter') {
                    this.hexCodeTo.setAttribute("hex_code", this.activeTo.children[0].value)
                    this.customizeColor(this.activeTo.children[0].value, "Custom", hexToRgba(this.activeTo.children[0].value).toString())
                    this.colorOutput.style.setProperty(`--color_view_bg`, "#" + this.activeTo.children[0].value)
                    this.activeTo.children[0].value = ""
                    this.activeTo.classList.remove("active")
                    this.removeHide()
                }
            })
            this.activeTo.children[0].addEventListener("input", (e) => {
                this.input = e.target.value.toLowerCase()
                shadowColors.forEach((shadowColor, index) => {
                    const isVisible = shadowColor.hex.toLowerCase().includes(this.input)
                    this.listbox.children[index].classList.toggle("hide", !isVisible)
                })
            })
        }
    }
}
