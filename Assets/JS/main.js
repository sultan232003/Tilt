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

// SHADOW BOX EFFECT CODE STARTS HERE

const shadowColors = [
  { name: "Charcoal", hex: "#36454F" },
  { name: "Cadet gray", hex: "#959da5" },
  { name: "Dim gray", hex: "#64646f" },
  { name: "Black", hex: "#000000" },
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

const Shadow_box = document.getElementsByClassName("shadow_box")

class Shadow {
  constructor(Shadow_box) {
    this.Shadow_box = Shadow_box
    this.Shadow_box_css = this.Shadow_box.getAttribute("style")
    this.Format_btn = this.Shadow_box.children[0].children[0]
    this.Shadow_css_code = this.Format_btn.getAttribute("shadow_code")
    this.Format_list = this.Format_btn.nextElementSibling
    this.Format_btn_child = this.Format_list.children
    this.Color_format = this.Shadow_box.children[0].children[0].innerHTML.slice(1, -1)
    this.Color_format_data = this.Format_btn.parentNode.nextElementSibling.children[0].children[0]
    this.Color_alpha_data = this.Format_btn.parentNode.nextElementSibling.children[0].children[1]
    this.Shadow_box_color_format_value = undefined
    this.hex_value = this.Format_btn.getAttribute("hex_code").substring(1)
    this.alpha_value = this.Format_btn.getAttribute("alpha_value")
    this.Color_option_list = this.Shadow_box.children[0].children[2].children[1]
    this.Shadow_box_shadow_color_btn = this.Shadow_box.children[0].children[2].children[0]
    this.color_view_box
    this.color_view
    this.color_name
  }

  color_format_update() {
    this.rgb_value = hexToRgba(this.hex_value, this.alpha_value)
    this.css_value = this.rgb_value
    this.hsl_value = rgbaToHsla(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], this.rgb_value[3], true)
    this.hsb_value = rgbToHsb(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], true)
    this.xyz_value = rgbToXyz(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], true)
    this.lab_value = xyzToLab(this.xyz_value[0].slice(0, -1), this.xyz_value[1].slice(0, -1), this.xyz_value[2].slice(0, -1), true)
    this.lch_value = labToLch(this.lab_value[0].slice(0, -1), this.lab_value[1].slice(0, -1), this.lab_value[2].slice(0, -1), true)
    this.cmyk_value = rgbToCmyk(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2])
  }

  hex_update() {
    if (this.Color_format === "HEX") {
      this.Color_format_data.classList.add("gap-10", "row-col")
      this.Color_format_data.classList.remove("gap-5")
      this.Color_format_data.innerHTML = `
      <div class="color_format_index_value row space-between align-center text-upper">
      <p>[</p>
      <p>HEX</p>
      <p>]</p>
      </div>
      <h3 class="text-center text-upper">${"#" + this.hex_value}</h3>
      `
    }
  }

  other_color_update() {
    if (this.Color_format === "RGB" || this.Color_format === "HSL" || this.Color_format === "HSB" || this.Color_format === "CSS" || this.Color_format === "LCH" || this.Color_format === "LAB" || this.Color_format === "XYZ") {
      this.Color_format_data.classList.add("gap-5")
      this.Color_format_data.classList.remove("gap-10", "row-col")
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
  }

  color_alpha_update() {
    if (this.Color_format === "HEX" || this.Color_format === "RGB" || this.Color_format === "HSL" || this.Color_format === "HSB" || this.Color_format === "CSS") {
      this.Color_alpha_data.classList.add("col-3")
      this.Color_alpha_data.innerHTML = `
      <div class="color_format_index_value row space-between align-center text-upper">
      <p>[</p>
      <p>alpha</p>
      <p>]</p>
      </div>
      <h3 class="text-center text-upper">${this.Shadow_box_alpha_value}</h3>
      `
    }
  }

  cmyk_update() {
    if (this.Color_format === "CMYK") {

      this.Color_format_data.classList.add("gap-5")
      this.Color_format_data.classList.remove("gap-10", "row-col")
      this.Color_alpha_data.classList.remove("col-3")
      this.Color_alpha_data.innerHTML = ``
      this.Color_format_data.innerHTML = `
      <div class="row row-col gap-10 col-3">
      <div class="color_format_index_value row space-between align-center text-upper">
      <p>[</p>
      <p>${this.Color_format[0]}</p>
      <p>]</p>
      </div>
      <h3 class="text-center text-upper">${this.Shadow_box_color_format_value[0]}</h3>
      </div>
      <div class="row row-col gap-10 col-3">
      <div class="color_format_index_value row space-between align-center text-upper">
      <p>[</p>
        <p>${this.Color_format[1]}</p>
        <p>]</p>
        </div>
      <h3 class="text-center text-upper">${this.Shadow_box_color_format_value[1]}</h3>
      </div>
      <div class="row row-col gap-10 col-3">
      <div class="color_format_index_value row space-between align-center text-upper">
        <p>[</p>
        <p>${this.Color_format[2]}</p>
        <p>]</p>
        </div>
        <h3 class="text-center text-upper">${this.Shadow_box_color_format_value[2]}</h3>
        </div>
    <div class="row row-col gap-10 col-3">
      <div class="color_format_index_value row space-between align-center text-upper">
        <p>[</p>
        <p>${this.Color_format[3]}</p>
        <p>]</p>
        </div>
        <h3 class="text-center text-upper">${this.Shadow_box_color_format_value[3]}</h3>
        </div>`
    }
  }

  color_format_changer() {
    switch (this.Color_format) {
      case "HEX":
        this.Shadow_box_color_format_value = this.hex_value
        this.Shadow_box_alpha_value = this.alpha_value
        break;

      case "RGB":
        this.Shadow_box_color_format_value = this.rgb_value
        this.Shadow_box_alpha_value = this.rgb_value[3]
        break;

      case "HSL":
        this.Shadow_box_color_format_value = this.hsl_value
        this.Shadow_box_alpha_value = this.hsl_value[3]
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
        this.Shadow_box_alpha_value = this.css_value[3]
        break;

      case "CMYK":
        this.Shadow_box_color_format_value = this.cmyk_value
        break;
    }
  }

  Format_list_creator() {
    this.color_format_update()
    this.Format_btn.addEventListener("click", (e) => {
      this.Format_list.classList.toggle("active")
    })
    document.addEventListener("click", (e) => {
      if (e.target !== this.Format_btn) {
        this.Format_list.classList.remove("active")
      }
    })
    Array.from(this.Format_btn_child).forEach(Format_btn_childs => {
      Format_btn_childs.addEventListener("click", (e) => {
        this.Color_format = e.target.innerHTML.slice(1, -1)
        this.Format_btn.innerHTML = e.target.innerHTML
        this.Format_list.classList.remove("active")
        this.color_format_changer()
        this.hex_update()
        this.other_color_update()
        this.color_alpha_update()
        if (this.Color_format === "HSB" || this.Color_format === "LCH" || this.Color_format === "LAB" || this.Color_format === "XYZ") {
          this.Color_alpha_data.classList.remove("col-3")
          this.Color_alpha_data.innerHTML = ``
        }
        this.cmyk_update()
      })
    });
  }

  Color_Update() {
    for (let i = 0; i < shadowColors.length; i++) {
      this.color_view_box = document.createElement("div")
      this.color_view = document.createElement("div")
      this.color_name = document.createElement("p")
      this.Color_option_list.appendChild(this.color_view_box)
      this.color_view_box.appendChild(this.color_view)
      this.color_view_box.appendChild(this.color_name)
      this.color_view.classList.add("color_view")
      this.color_view.setAttribute("style", `--color_view_bg:${shadowColors[i].hex};`)
      this.color_view.setAttribute("hex_value", shadowColors[i].hex)
      this.color_name.classList.add("color_value")
      this.color_name.innerHTML = shadowColors[i].name
    }

    this.Shadow_box_shadow_color_btn.addEventListener("click", () => {
      this.Color_option_list.classList.toggle("active")
    })

    this.Color_option_list.children[0].addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        if (this.Color_option_list.children[0].value.length == 6) {
          this.hex_value = this.Color_option_list.children[0].value
          this.Format_btn.setAttribute("hex_code", this.Color_option_list.children[0].value)
          this.color_format_update()
          this.color_format_changer()
          this.hex_update()
          this.other_color_update()
          this.cmyk_update()
          this.color_alpha_update()
          this.Shadow_box.setAttribute("style", "--shadow_box:" + this.Shadow_css_code + " #" + this.hex_value + this.alpha_value)
          this.Shadow_box_shadow_color_btn.children[0].setAttribute("style", `--color_view_bg:${"#" + this.hex_value};`)
          this.Shadow_box_shadow_color_btn.children[1].innerHTML = "Custom"
          this.Color_option_list.children[0].value = ""
          this.Color_option_list.classList.remove("active")
        } else { console.log("minimum 6") }
      }
      this.input = this.Color_option_list.children[0].value
      console.log(shadowColors.filter(item => item.hex.toLowerCase().includes(this.input)))

      // fix the issue of serch
    })

    Array.from(this.Color_option_list.children).forEach(color_view_boxes => {
      color_view_boxes.addEventListener("click", (e) => {
        if (e.target !== this.Color_option_list.children[0]) {
          this.Shadow_box_shadow_color_btn.children[0].setAttribute("style", `--color_view_bg:${color_view_boxes.children[0].getAttribute("hex_value")};`)
          this.Shadow_box_shadow_color_btn.children[1].innerHTML = color_view_boxes.children[1].innerHTML
          this.Format_btn.setAttribute("hex_code", color_view_boxes.children[0].getAttribute("hex_value"))
          this.hex_value = this.Format_btn.getAttribute("hex_code").substring(1)
          if (this.Color_format === "HEX") {
            this.Shadow_box.children[1].children[0].children[0].children[1].innerHTML = this.hex_value
          }
          this.color_format_update()
          this.color_format_changer()
          this.hex_update()
          this.other_color_update()
          this.cmyk_update()
          this.color_alpha_update()
          this.Shadow_box.setAttribute("style", "--shadow_box:" + this.Shadow_css_code + " #" + this.hex_value + this.alpha_value)
        }
      })
    })

    document.addEventListener("click", (e) => {
      if (e.target !== this.Shadow_box_shadow_color_btn && e.target !== this.Color_option_list.children[0]) {
        this.Color_option_list.classList.remove("active")
        this.Color_option_list.children[0].value = ""
      }
    })
  }
}

let Shadow_box_final

Array.from(Shadow_box).forEach(Shadow_boxs => {
  Shadow_box_final = new Shadow(Shadow_boxs)
  Shadow_box_final.Format_list_creator()
  Shadow_box_final.Color_Update()
});

// SHADOW BOX EFFECT CODE ENDS HERE

///////////////////////////////////////////////////////////////////////////////////////////////////////// 

// CUSTOM SHADOW SANDBOX CODE STARTS HERE

const Shadow_controller = document.getElementById("shadow_controller")
const Custom_shadow_sandbox = document.getElementById("custom_shadow_sandbox")
const Custom_shadow_sandbox_inset = document.getElementById("custom_shadow_sandbox_inset")
const Custom_shadow_sandbox_box = document.getElementById("custom_shadow_sandbox_box")
let box_enter = false, drag = false, angle = 0
let Custom_shadow_sandbox_box_center_x = Custom_shadow_sandbox_box.getBoundingClientRect().x + Custom_shadow_sandbox_box.clientWidth / 2
let Custom_shadow_sandbox_box_center_y = Custom_shadow_sandbox_box.getBoundingClientRect().y + Custom_shadow_sandbox_box.clientHeight / 2

let sandbox_inset = Custom_shadow_sandbox_inset.getBoundingClientRect()
document.addEventListener("scroll", (e) => {
  sandbox_inset = Custom_shadow_sandbox_inset.getBoundingClientRect()
  Custom_shadow_sandbox_box_center_y = Custom_shadow_sandbox_box.getBoundingClientRect().y + Custom_shadow_sandbox_box.clientHeight / 2
})

const Horizontal_length = document.getElementById("horizontal_length")
let Horizontal_length_final = new Slider(Horizontal_length, "horizontal_length", Custom_shadow_sandbox_box, "px")

const Vertical_length = document.getElementById("vertical_length")
let Vertical_length_final = new Slider(Vertical_length, "vertical_length", Custom_shadow_sandbox_box, "px")

const Blur_radius = document.getElementById("blur_radius")
let Blur_radius_final = new Slider(Blur_radius, "blur_radius", Custom_shadow_sandbox_box, "px")

const Spread_radius = document.getElementById("spread_radius")
let Spread_radius_final = new Slider(Spread_radius, "spread_radius", Custom_shadow_sandbox_box, "px")

const Radius = document.getElementById("Radius")
let Radius_final = new Slider(Radius, "radius", Custom_shadow_sandbox_box, "px")

const Opacity = document.getElementById("opacity")
let Opacity_final = new Slider(Opacity, "opacity", Custom_shadow_sandbox_box, "%")

const Distance = document.getElementById("distance")
let Distance_final = new Slider(Distance, "distance", Custom_shadow_sandbox_box, "px")

const Shadow_controller_opacity_ring = document.getElementById("shadow_controller_opacity_ring")
let Shadow_controller_opacity_ring_final = new Slider(Shadow_controller_opacity_ring, "opacity", Custom_shadow_sandbox_box, "%")

// CUSTOM SHADOW SANDBOX CODE ENDS HERE

const Inset_toggle = document.getElementById("inset_toggle")
let Inset_toggle_final = new Toggle(Inset_toggle, "box_outline", Custom_shadow_sandbox_box, true)

const Border_toggle = document.getElementById("border_toggle")
let Border_toggle_final = new Toggle(Border_toggle, "box_border", Custom_shadow_sandbox_box, true)

const Multiple_layers = document.getElementById("multiple_layers")
let Multiple_layers_final = new Toggle(Multiple_layers, "box_multiple", Custom_shadow_sandbox_box, false)

let inputUpdateSlider = [Horizontal_length_final,Vertical_length_final,Blur_radius_final,Spread_radius_final,Radius_final,Opacity_final,Distance_final,Shadow_controller_opacity_ring_final]
let inputUpdateToggle = [Inset_toggle_final,Border_toggle_final,Multiple_layers_final]
inputUpdateSlider.forEach(inputUpdateSliders=>{
  inputUpdateSliders.update()
})
inputUpdateToggle.forEach(inputUpdateToggles=>{
  inputUpdateToggles.update()
})
// function calculateRealisticShadow(element, layers, baseDistance, baseBlur, baseSpread, baseOpacity, angle, inset = false) {
//   let shadows = [];
//   let radianAngle = angle * (Math.PI / 180);
//   for (let i = 1; i <= layers; i++) {
//     let distance = baseDistance * i;
//     let offsetX = Math.round(distance * Math.cos(radianAngle));
//     let offsetY = Math.round(distance * Math.sin(radianAngle));
//     let blur = baseBlur * i;
//     let spread = baseSpread * i;
//     let opacity = baseOpacity / (i * 0.8);
//     let shadow = `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(0, 0, 0, ${opacity})`;
//     shadows.push(shadow);
//   }
//   element.style.boxShadow = shadows.join(', ');
// }

const Slider_style = document.getElementsByClassName("slider_style")
const Opacity_ring = document.getElementById("opacity_ring")
let Opacity_ring_val = document.getElementById("opacity_ring_val")
let inset_toggle_status = false
let shadow_distance = 0
let shadow_angle = 0

function applyShadow() {
  if (Multiple_layers.classList.contains("active")) {
    calculateRealisticShadow(
      Custom_shadow_sandbox_box, 5, shadow_distance, Blur_radius_final.slider_value, Spread_radius_final.slider_value, Opacity_final.slider_value / 100, shadow_angle, inset_toggle_status
    );
  } else {
    Custom_shadow_sandbox_box.style.removeProperty("box-shadow");
    Custom_shadow_sandbox_box.style.setProperty(
      "box-shadow", `inset var(--horizontal_length) var(--vertical_length) var(--blur_radius) var(--spread_radius) rgba(64, 47, 255, var(--opacity));`
    );
  }
}

Multiple_layers.addEventListener("click", applyShadow);

function slider_upadte() {
  shadow_distance = calculateDistanceFromCenter(Number(Horizontal_length_final.slider_value) + Custom_shadow_sandbox_box_center_x, Number(Vertical_length_final.slider_value) + Custom_shadow_sandbox_box_center_y, Custom_shadow_sandbox_box_center_x, Custom_shadow_sandbox_box_center_y)
  applyShadow()
  newX = (Custom_shadow_sandbox.offsetWidth / 2 - Shadow_controller.offsetWidth / 2) - Horizontal_length_final.slider_value
  newY = (Custom_shadow_sandbox.offsetHeight / 2 - Shadow_controller.offsetHeight / 2) - Vertical_length_final.slider_value
  update_controller(newX, newY)
  Opacity_ring_val.innerHTML = Opacity_final.slider_value
}

Opacity.addEventListener("mousedown", () => {
  Opacity_ring.classList.add("show")
  Opacity_ring_val.classList.add("show")
})

Array.from(Slider_style).forEach((Slider_styles) => {
  Slider_styles.addEventListener("mousedown", () => {
    Slider_styles.addEventListener("mousemove", slider_upadte)
  });
  document.addEventListener("mouseup", () => {
    Slider_styles.removeEventListener("mousemove", slider_upadte)
  })
});

Inset_toggle.addEventListener("click", () => {
  inset_toggle_status = !Inset_toggle_final.toggle_status;
  applyShadow();
});

// CODE FOR CONTROLLER MOVE HERE

let offset_x = 0, offset_y = 0, shadow_X_distance = 0, shadow_Y_distance = 0, newX = 0, newY = 0, distance_controller_pos;

Shadow_controller.addEventListener('mousedown', mouseDown)

function shadowOffsetX() {
  return Math.round(Custom_shadow_sandbox_box_center_x - (Shadow_controller.getBoundingClientRect().x + (Shadow_controller.offsetWidth / 2)))
}
function shadowOffsetY() {
  return Math.round(Custom_shadow_sandbox_box_center_y - (Shadow_controller.getBoundingClientRect().y + (Shadow_controller.offsetHeight / 2)))
}

function updateShadowRangeBox(X_val, Y_val) {
  Custom_shadow_sandbox_box.style.setProperty("--horizontal_length", X_val + "px")
  Custom_shadow_sandbox_box.style.setProperty("--vertical_length", Y_val + "px")
}

function boxControlGapX() {
  if (Custom_shadow_sandbox.offsetWidth / 2 === Shadow_controller.offsetLeft + Shadow_controller.offsetWidth / 2) {
    return false
  } else { return true }
}

function boxControlGapY() {
  if (Custom_shadow_sandbox.offsetHeight / 2 === Shadow_controller.offsetTop + Shadow_controller.offsetHeight / 2) {
    return false
  } else { return true }
}

function calShadowAngle() {
  return calculateAngle(Custom_shadow_sandbox_box_center_x, Custom_shadow_sandbox_box_center_y, Number(Horizontal_length_final.slider_value) + Custom_shadow_sandbox_box_center_x, Number(Vertical_length_final.slider_value) + Custom_shadow_sandbox_box_center_y)
}

function mouseDown(e) {
  offset_x = e.clientX - Shadow_controller.getBoundingClientRect().x
  offset_y = e.clientY - Shadow_controller.getBoundingClientRect().y
  Shadow_controller.classList.add("grab")
  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
}

function update_controller(x, y) {
  Shadow_controller.style.left = `${x}px`;
  Shadow_controller.style.top = `${y}px`;
}

function mouseMove(e) {
  const { left, right, top, bottom, width, height } = sandbox_inset;
  const sandboxRect = Custom_shadow_sandbox.getBoundingClientRect();
  const x = e.clientX - sandboxRect.x;
  const y = e.clientY - sandboxRect.y;
  newX = x - offset_x;
  newY = y - offset_y;
  const left_touch = e.clientX <= left;
  const right_touch = e.clientX >= right;
  const top_touch = e.clientY <= top;
  const bottom_touch = e.clientY >= bottom;
  if (left_touch) newX = 0;
  if (right_touch) newX = width;
  if (top_touch) newY = 0;
  if (bottom_touch) newY = height;
  update_controller(newX, newY)
  updateShadowRangeBox(shadowOffsetX(), shadowOffsetY())
  shadow_angle = calShadowAngle()
  shadow_distance = calculateDistanceFromCenter(Number(Horizontal_length_final.slider_value) + Custom_shadow_sandbox_box_center_x, Number(Vertical_length_final.slider_value) + Custom_shadow_sandbox_box_center_y, Custom_shadow_sandbox_box_center_x, Custom_shadow_sandbox_box_center_y)
  applyShadow()
  Horizontal_length_final.slider_customize(shadowOffsetX())
  Vertical_length_final.slider_customize(shadowOffsetY())
  Distance_final.slider_customize(shadow_distance)
  print("check")
}

function mouseUp(e) {
  Shadow_controller.classList.remove("grab")
  document.removeEventListener('mousemove', mouseMove)
}

// BLUR RING CODE STARTS HERE ///////////////////////////////////////////////////////////////////////////////////////

let blur_ring_offset_x = 0, blur_ring_offset_y = 0, blur_drag = false, blur_ring_width_min = 230, blur_ring_width_max = 430, blur_ring_width = 230, blur_ring_radius = 20
let Resize_left = false, Resize_top = false, Resize_right = false, Resize_bottom = false, gap_X = false, gap_Y = false;
const Left_stretch = document.getElementById("left_stretch")
const Top_stretch = document.getElementById("top_stretch")
const Right_stretch = document.getElementById("right_stretch")
const Bottom_stretch = document.getElementById("bottom_stretch")
const Blur_ring = document.getElementById("blur_ring")

document.addEventListener("mousedown", (e) => {
  if (e.target == Left_stretch) {
    Resize_left = true;
    Left_stretch.classList.add("show")
  }
  if (e.target == Right_stretch) {
    Resize_right = true
    Right_stretch.classList.add("show")
  }
  if (e.target == Top_stretch) {
    Resize_top = true
    Top_stretch.classList.add("show")
  }
  if (e.target == Bottom_stretch) {
    Resize_bottom = true
    Bottom_stretch.classList.add("show")
  }
})

function blur_ring_update(e) {
  if (blur_drag) {
    if (Resize_right) {
      blur_ring_width = Math.round(e.clientX - Blur_ring.getBoundingClientRect().x)
    }
    if (Resize_bottom) {
      blur_ring_width = Math.round(e.clientY - Blur_ring.getBoundingClientRect().y)
    }
    if (Resize_left) {
      blur_ring_width = Math.round(Blur_ring.getBoundingClientRect().right - e.clientX)
    }
    if (Resize_top) {
      blur_ring_width = Math.round(Blur_ring.getBoundingClientRect().bottom - e.clientY)
    }
    Blur_ring.style.cssText = `width: clamp(${blur_ring_width_min}px, ${blur_ring_width}px, ${blur_ring_width_max}px); height: clamp(${blur_ring_width_min}px, ${blur_ring_width}px, ${blur_ring_width_max}px); border-radius: clamp(20px, 20px, 110px);`
    const percentage = Math.round(convertRange(blur_ring_width, blur_ring_width_min, blur_ring_width_max, 0, 250));
    Blur_radius_final.slider_customize(percentage)
    applyShadow()
  }
}

Blur_ring.addEventListener("mousedown", (e) => {
  blur_drag = true
  blur_ring_offset_x = e.clientX
  blur_ring_offset_y = e.clientY
  Blur_ring.classList.add("show")
  document.addEventListener('mousemove', (e) => blur_ring_update(e));
})

// BLUR RING CODE ENDS HERE ///////////////////////////////////////////////////////////////////////////////////////

// SPREAD LEVEL CODE STARTS HERE ///////////////////////////////////////////////////////////////////////////////////

const Spread_level_box = document.getElementById("spread_level_box")
const Spread_level = document.getElementById("spread_level")
const Spread_level_stretch = document.getElementById("spread_level_stretch")
let Spread_level_resize = false, Spread_level_height = 207, Spread_level_height_min = 3, Spread_level_height_max = 207

Spread_level_stretch.addEventListener("mousedown", () => {
  Spread_level_resize = true
  Spread_level_stretch.classList.add("show")
  Spread_level_box.classList.add("show")
  document.addEventListener("mousemove", (e) => {
    if (Spread_level_resize) {
      Spread_level_height = Math.round(Spread_level.getBoundingClientRect().bottom - e.clientY)
      Spread_level.style.cssText = `height: clamp(${Spread_level_height_min}px, ${Spread_level_height}px, ${Spread_level_height_max}px);`
      let Spread_level_height_val = Math.round(convertRange(Spread_level_height, Spread_level_height_min, Spread_level_height_max, -50, 50))
      Spread_radius_final.slider_customize(Spread_level_height_val)
      applyShadow()
    }
  })
})

document.addEventListener("mousedown", (e) => {
  switch (e.target) {
    case Horizontal_length:
      Horizontal_length.addEventListener("mousemove", () => {
        Distance_final.slider_customize(shadow_distance)
        shadow_angle = calShadowAngle()
      })
      break;
    case Vertical_length:
      Vertical_length.addEventListener("mousemove", () => {
        Distance_final.slider_customize(shadow_distance)
        shadow_angle = calShadowAngle()
      })
      break;
    case Blur_radius:
      Blur_ring.classList.add("show")
      Blur_radius.addEventListener("mousemove", () => {
        blur_ring_width = Math.round(convertRange(Blur_radius_final.slider_value, 0, 250, blur_ring_width_min, blur_ring_width_max))
        Blur_ring.style.cssText = `width: clamp(${blur_ring_width_min}px, ${blur_ring_width}px, ${blur_ring_width_max}px); height: clamp(${blur_ring_width_min}px, ${blur_ring_width}px, ${blur_ring_width_max}px); border-radius: clamp(20px, 20px, 110px);`
      })
      break;
    case Shadow_controller_opacity_ring:
      Shadow_controller_opacity_ring.addEventListener("mousemove", () => {
        Opacity_final.slider_customize(Number(Shadow_controller_opacity_ring.value))
        Opacity_ring_val.innerHTML = Shadow_controller_opacity_ring.value
        applyShadow()
      })
      break;
    case Opacity:
      Opacity.addEventListener("mousemove", () => {
        Shadow_controller_opacity_ring_final.slider_customize(Number(Opacity_final.slider_value))
      })
      break;
    case Spread_radius:
      Spread_level_box.classList.add("show")
      Spread_radius.addEventListener("mousemove", () => {
        Spread_level_height = Math.round(convertRange(Spread_radius_final.slider_value, -50, 50, Spread_level_height_min, Spread_level_height_max))
        Spread_level.style.cssText = `height: clamp(${Spread_level_height_min}px, ${Spread_level_height}px, ${Spread_level_height_max}px);`
      })
      break;
    case Distance:
      Distance.addEventListener("mousemove", () => {
        let distance_controller_pos = getCoordinates(shadow_angle, Custom_shadow_sandbox_box_center_x, Custom_shadow_sandbox_box_center_y, Distance_final.slider_value)
        newX = distance_controller_pos.x - Custom_shadow_sandbox.getBoundingClientRect().x - Shadow_controller.offsetWidth / 2
        newY = distance_controller_pos.y - Custom_shadow_sandbox.getBoundingClientRect().y - Shadow_controller.offsetHeight / 2
        update_controller(newX, newY)
        updateShadowRangeBox(shadowOffsetX(), shadowOffsetY())
        Horizontal_length_final.slider_customize(shadowOffsetX())
        Vertical_length_final.slider_customize(shadowOffsetY())
      })
      break;
  }
})

let remove_show_array = [Left_stretch, Top_stretch, Right_stretch, Bottom_stretch, Blur_ring, Spread_level_stretch, Spread_level_box, Opacity_ring, Opacity_ring_val]
document.addEventListener("mouseup", () => {
  blur_drag = false
  Spread_level_resize = false
  Resize_left = false, Resize_top = false, Resize_right = false, Resize_bottom = false
  remove_show_array.forEach(Remove_shows => {
    Remove_shows.classList.remove("show")
  })
})

let reset_val_slider = [{ forSlider: "Horizontal_length", val: 0 },{ forSlider: "Vertical_length", val: 0 },{ forSlider: "Blur_radius", val: 10 },{ forSlider: "Spread_radius", val: 0 },{ forSlider: "Radius", val: 10 },{ forSlider: "Opacity", val: 10 },{ forSlider: "Distance", val: 0 },{ forSlider: "Opacity_ring", val: 10 }];
let reset_val_toggle = [{forToggle: "Inset_toggle",val:true},{forToggle: "Border_toggle",val:true},{forToggle: "Multiple_layers",val:false}]
const Reset_custom_shadow = document.getElementById("reset")

Reset_custom_shadow.addEventListener("click", () => {
  inputUpdateToggle.forEach((inputUpdateToggles,index)=>{
    inputUpdateToggles.toggleCustomize(reset_val_toggle[index].val)
  })

  inputUpdateSlider.forEach((inputUpdateSliders,index)=>{
    inputUpdateSliders.slider_customize(reset_val_slider[index].val)
  })
})

// CODE FOR CONTROLLER MOVE HERE
