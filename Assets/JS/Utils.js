function hexToRgba(hex, alpha = 'FF') {
    hex = hex.replace(/^#/, '');
    let r, g, b, a = 1;
    if (hex.length === 6 || hex.length === 8) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        a = parseInt(alpha, 16) / 255;
    } else {
        throw new Error('Invalid HEX color.');
    }
    return [r, g, b, a.toFixed(2)];
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
    constructor(slider) {
        this.slider = slider
        this.slider_max = slider.getAttribute("max")
        this.slider_min = slider.getAttribute("min")
    }

    update() {
        this.slider_width = (this.slider.value / this.slider_max) * 100
        this.slider.setAttribute("style", "--slide_width:" + this.slider_width + "%")
        this.slider.addEventListener("mousedown", () => {
            this.slider.addEventListener("mousemove", (e) => {
                this.slider_width = (this.slider.value / this.slider_max) * 100
                this.slider.setAttribute("style", "--slide_width:" + this.slider_width + "%")
            })
        })
    }
}


class Toggle {
    constructor(toggle_btn) {
        this.Toggle_btn = toggle_btn
    }

    update() {
        this.Toggle_btn.addEventListener("click", (e) => {
            this.Toggle_btn.classList.toggle("active")
        })
    }
}
