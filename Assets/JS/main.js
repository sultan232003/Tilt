// TLIT EFFECT CODE STARTS HERE

const tilt = document.getElementsByClassName("tilt")

function nest(parent, depth) {
  if (depth === 0) return
  const newdiv = document.createElement("div")
  newdiv.classList.add("tilt_infinity_child")
  parent.appendChild(newdiv)
  nest(newdiv, depth - 1)
}

class Tilt {
  constructor(tilt_card, tilt_strength, tilt_x, tilt_y, float, scale, startX, startY, reverse, page, reset, infinity) {
    this.tilt_card = tilt_card
    this.tilt_strength = tilt_strength || 5
    this.tilt_x = tilt_x || 'true'
    this.tilt_y = tilt_y || 'true'
    this.float = float || 0
    this.scale = scale || 1
    this.startX = startX || 0
    this.startY = startY || 0
    this.reverse = reverse || 'false'
    this.page = page || 'false'
    this.reset = reset || 'true'
    this.infinity = infinity || 'false'
    this.infinity_data = this.infinity.split(/\s+/).map(Number)
    this.card_data = tilt_card.getBoundingClientRect()
    this.tilt_card_half_width = this.card_data.width / 2
    this.tilt_card_half_height = this.card_data.height / 2
    this.tilt_infinity_child
  }

  update() {
    document.addEventListener("scrollend", (e) => {
      this.card_data = this.tilt_card.getBoundingClientRect()
    })

    if (this.float <= 360 && this.float > 0) {
      this.final_float = this.float
    }

    if (this.scale <= 2 && this.scale >= 0.5) {
      this.final_scale = this.scale
    } else { this.final_scale = 1 }

    if (this.startX != 90 && this.startX != 180) {
      this.final_startX = this.startX
    }

    if (this.startY != 90 && this.startY != 180) {
      this.final_startY = this.startY
    }

    this.tilt_card.style.cssText = `transform-style: preserve-3d; transition: all 200ms ease ; transform: perspective(500px) rotateY(${this.final_startY}deg) rotateX(${this.final_startX}deg);`

    if (this.infinity_data[0] > 0) {
      nest(this.tilt_card, this.infinity_data[0])
    }

    this.tilt_infinity_child = document.getElementsByClassName("tilt_infinity_child")
    this.tilt_infinity_child_size = Math.pow(this.infinity_data[2], 1 / this.infinity_data[0]) * 100;

    this.child = this.tilt_card.children
    Array.from(this.child).forEach(childs => {
      childs.style.cssText = `transform: translateZ(${this.final_float}px);`
    });

    this.tilt = (e) => {
      if (this.tilt_x === "true") {
        if (this.page === "true") {
          this.rotateX = (e.clientY - (window.innerHeight / 2)) / this.tilt_strength
        } else {
          this.rotateX = ((e.clientY - this.card_data.y) - this.card_data.height / 2) / this.tilt_strength
        }
      } else {
        this.rotateX = 0
      }

      if (this.tilt_y === "true") {
        if (this.page === "true") {
          this.rotateY = ((e.clientX - (window.innerWidth / 2)) / this.tilt_strength)
        } else {
          this.rotateY = (((e.clientX - this.card_data.x) - this.card_data.width / 2) / this.tilt_strength)
        }
      } else { this.rotateY = 0 }

      if (this.reverse === "true") {
        this.final_rotateX = -this.rotateX
        this.final_rotateY = this.rotateY
      } else {
        this.final_rotateX = this.rotateX
        this.final_rotateY = -this.rotateY
      }

      if (this.infinity_data[0] > 0) {
        this.overflow = "hidden"
        this.infinity_moveY = ((e.clientY - this.card_data.y) - this.card_data.height / 2) / ((this.card_data.height / 2) / this.infinity_data[1])
        this.infinity_moveX = ((e.clientX - this.card_data.x) - this.card_data.width / 2) / ((this.card_data.width / 2) / this.infinity_data[1])
      } else {
        this.overflow = "visible"
      }

      this.tilt_card.style.cssText = `overflow:${this.overflow}; transform-style: preserve-3d; transform: scale(${this.final_scale})perspective(500px) rotateY(${this.final_rotateY}deg) rotateX(${this.final_rotateX}deg);`

      if (this.infinity_data[0] > 0) {
        Array.from(this.tilt_infinity_child).forEach(tilt_infinity_childs => {
          tilt_infinity_childs.style.cssText = `width:${this.tilt_infinity_child_size}% ; height:${this.tilt_infinity_child_size}% ; transform: perspective(500px) translateY(${this.infinity_moveY}%) translateX(${this.infinity_moveX}%);`
        })
      }
    }

    if (this.page === "true") {
      document.addEventListener("mousemove", (e) => {
        this.tilt(e)
      })
    } else {
      this.tilt_card.addEventListener("mousemove", (e) => {
        this.tilt(e)
      })
    }

    this.tilt_card.addEventListener("mouseleave", () => {
      if (this.infinity_data[0] > 0) {
        Array.from(this.tilt_infinity_child).forEach(tilt_infinity_childs => {
          tilt_infinity_childs.style.cssText = `width:${this.tilt_infinity_child_size}% ; height:${this.tilt_infinity_child_size}% ; transition: all 200ms ease ;transform: perspective(500px) translateY(0%) translateX(0%);`
        })
      }

      if (this.reset === "true") {
        this.tilt_card.style.cssText = `overflow:${this.overflow}; transform-style: preserve-3d; transition: all 200ms ease ; transform: perspective(500px) rotateY(${this.final_startY}deg) rotateX(${this.final_startX}deg);`
      }
    })
  }
}

let final_tilt

Array.from(tilt).forEach(tilts => {
  cards_tilt_strength = tilts.getAttribute("tilt_strength")
  cards_tilt_x = tilts.getAttribute("tilt_x")
  cards_tilt_y = tilts.getAttribute("tilt_y")
  cards_tilt_float = tilts.getAttribute("tilt_float")
  cards_tilt_scale = tilts.getAttribute("tilt_scale")
  cards_tilt_StartX = tilts.getAttribute("tilt_StartX")
  cards_tilt_StartY = tilts.getAttribute("tilt_StartY")
  cards_tilt_reverse = tilts.getAttribute("tilt_reverse")
  cards_tilt_page = tilts.getAttribute("tilt_page")
  cards_tilt_reset = tilts.getAttribute("tilt_reset")
  cards_tilt_infinity = tilts.getAttribute("tilt_infinity")
  final_tilt = new Tilt(tilts, cards_tilt_strength, cards_tilt_x, cards_tilt_y, cards_tilt_float, cards_tilt_scale, cards_tilt_StartX, cards_tilt_StartY, cards_tilt_reverse, cards_tilt_page, cards_tilt_reset, cards_tilt_infinity)
  final_tilt.update()
});

Array.from(final_tilt.tilt_infinity_child).forEach(tilt_infinity_childs => {
  tilt_infinity_childs.style.cssText = `width:${final_tilt.tilt_infinity_child_size}% ; height:${final_tilt.tilt_infinity_child_size}% ;`
})

const Copy_btn = document.getElementsByClassName("copy_btn")
Array.from(Copy_btn).forEach(Copy_btns => {
  Copy_btns.addEventListener("click", (e) => {
    default_tilt_data = Copy_btns.getAttribute("default_tilt_data")
    second_tilt_data = Copy_btns.getAttribute("second_tilt_data")
    navigator.clipboard.writeText(default_tilt_data + " " + second_tilt_data)
  })
})

// TLIT EFFECT CODE ENDS HERE

// SHADOW EFFECT CODE STARTS HERE

const Shadow_box_color_format_btn = document.getElementsByClassName("shadow_box_color_format_btn")
const Color_format_box = document.getElementsByClassName("color_format")

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function rgbToHsl(r, g, b, percentage) {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let delta = max - min;
  let l = (max + min) / 2;
  let h, s;
  if (delta === 0) {
    s = 0;
    h = 0;
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
    h /= 6;
  }
  if (percentage) {
    return [Math.round(h * 360) + "%", Math.round(s * 100) + "%", Math.round(l * 100) + "%"];
  } else {
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
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





class Format {
  constructor(format_btn) {
    this.Format_btn = format_btn
    this.Format_list = this.Format_btn.nextElementSibling
    this.Format_btn_child = this.Format_list.children
    this.Color_format
    this.Color_format_data = this.Format_btn.parentNode.nextElementSibling.children[0].children[0]
    this.Shadow_box_color_format_value = undefined
    this.hex_value = this.Format_btn.getAttribute("hex_code").substring(1)
    this.alpha_value = this.Format_btn.getAttribute("hex_code")
    this.rgb_value = hexToRgb(this.hex_value)
    this.css_value = this.rgb_value
    this.hsl_value = rgbToHsl(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], true)
    this.hsb_value = rgbToHsb(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], true)
    this.xyz_value = rgbToXyz(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], true)
    this.lab_value = xyzToLab(this.xyz_value[0].slice(0, -1), this.xyz_value[1].slice(0, -1), this.xyz_value[2].slice(0, -1), true)
    this.lch_value = labToLch(this.lab_value[0].slice(0, -1), this.lab_value[1].slice(0, -1), this.lab_value[2].slice(0, -1), true)
  }

  Format_list_creator() {
    // console.log(this.rgb_value)
    this.Format_btn.addEventListener("click", (e) => {
      this.Format_list.classList.toggle("active")
    })
    Array.from(this.Format_btn_child).forEach(Format_btn_childs => {
      Format_btn_childs.addEventListener("click", (e) => {
        this.Color_format = e.target.innerHTML.slice(1, -1)
        this.Format_btn.innerHTML = e.target.innerHTML
        this.Format_list.classList.remove("active")

        if (this.Color_format === "HEX") {
          this.Color_format_data.classList.add("gap-10", "row-col")
          this.Color_format_data.classList.remove("gap-5")
          this.Color_format_data.innerHTML = `
          <div class="color_format_index_value row space-between align-center text-upper">
            <p>[</p>
            <p>HEX</p>
            <p>]</p>
          </div>
          <h3 class="text-center text-upper">#959da5</h3>
          `
        }

        switch (this.Color_format) {
          case "RGB":
            this.Shadow_box_color_format_value = this.rgb_value
            break;

          case "HSL":
            this.Shadow_box_color_format_value = this.hsl_value
            break;

          case "HSB":
            this.Shadow_box_color_format_value = this.hsb_value
            break;

          case "XYZ":
            this.Shadow_box_color_format_value = this.xyz_value
            break;

          case "LAB":
            this.Shadow_box_color_format_value = this.lab_value
            break;

          case "LCH":
            this.Shadow_box_color_format_value = this.lch_value
            break;

          case "CSS":
            this.Shadow_box_color_format_value = this.css_value
            break;
        }

        if (this.Color_format === "RGB" || this.Color_format === "HSL" || this.Color_format === "HSB" || this.Color_format === "CSS" || this.Color_format === "LCH" || this.Color_format === "LAB" || this.Color_format === "XYZ") {
          this.Color_format_data.classList.add("gap-5")
          this.Color_format_data.classList.remove("gap-10", "row-col")



          console.log(this.Shadow_box_color_format_value)








          this.Color_format_data.innerHTML = `
          <div class="row row-col gap-10 col-4">
            <div class="color_format_index_value row space-between align-center text-upper">
              <p>[</p>
              <p>${this.Color_format[0]}</p>
              <p>]</p>
            </div>
            <h3 class="text-center text-upper">${this.Shadow_box_color_format_value[0]}</h3>
          </div>
          <div class="row row-col gap-10 col-4">
            <div class="color_format_index_value row space-between align-center text-upper">
              <p>[</p>
              <p>${this.Color_format[1]}</p>
              <p>]</p>
            </div>
            <h3 class="text-center text-upper">${this.Shadow_box_color_format_value[1]}</h3>
          </div>
          <div class="row row-col gap-10 col-4">
            <div class="color_format_index_value row space-between align-center text-upper">
              <p>[</p>
              <p>${this.Color_format[2]}</p>
              <p>]</p>
            </div>
            <h3 class="text-center text-upper">${this.Shadow_box_color_format_value[2]}</h3>
          </div>`
        }

      })
    });

    // console.log(this.Format_btn.parentNode.nextElementSibling.children[0].children[0])
    // <div class="color_format_data row row-col col-9 gap-10">
    //               <div class="color_format_index_value row space-between align-center text-upper">
    //                 <p>[</p>
    //                 <p>HEX</p>
    //                 <p>]</p>
    //               </div>
    //               <h3 class="text-center text-upper">#959da5</h3>
    //             </div>
    //             <div class="color_alpha row row-col col-3 gap-10">
    //               <div class="color_format_index_value row space-between align-center text-upper">
    //                 <p>[</p>
    //                 <p>alpha</p>
    //                 <p>]</p>
    //               </div>
    //               <h3 class="text-center text-upper">33</h3>
    //             </div>
  }
}

let Shadow_box_color_format_btn_final

Array.from(Shadow_box_color_format_btn).forEach(Shadow_box_color_format_btns => {

  // console.log(Shadow_box_color_format_btns.nextElementSibling)

  Shadow_box_color_format_btn_final = new Format(Shadow_box_color_format_btns)
  Shadow_box_color_format_btn_final.Format_list_creator()
});

// SHADOW EFFECT CODE ENDS HERE
