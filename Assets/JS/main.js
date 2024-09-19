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
    this.color_option_list_box = this.Color_option_list.children[1]
    this.color_view_box
    this.color_view
    this.color_name
    this.color_output = this.Shadow_box_shadow_color_btn.parentNode.nextElementSibling
    this.colorInput = this.Format_btn.nextElementSibling.nextElementSibling.children[1].children[0]
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

  colorUpdateGroup() {
    this.color_format_update()
    this.color_format_changer()
    this.hex_update()
    this.other_color_update()
    this.cmyk_update()
    this.color_alpha_update()
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
    this.ColorListFinal = new ColorList(this.Shadow_box_shadow_color_btn, this.color_option_list_box, this.Color_option_list, "Full", this.colorInput, false, false, "color_view", "color_value", this.color_output, this.Format_btn, this.Shadow_box_shadow_color_btn)
    this.ColorListFinal.create()
    this.ColorListFinal.select()

    this.Color_option_list.children[0].addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        this.hex_value = this.Color_option_list.children[0].value
        this.colorUpdateGroup()
        this.Shadow_box.setAttribute("style", "--shadow_box:" + this.Shadow_css_code + " #" + this.hex_value + this.alpha_value)
      }
    })

    this.ColorListFinal.customInput()

    Array.from(this.Color_option_list.children).forEach(color_view_boxes => {
      color_view_boxes.addEventListener("click", (e) => {
        if (e.target.tagName != 'INPUT') {
          this.hex_value = this.Format_btn.getAttribute("hex_code").substring(1)
          if (this.Color_format === "HEX") {
            this.Shadow_box.children[1].children[0].children[0].children[1].innerHTML = this.hex_value
          }
          this.colorUpdateGroup()
          this.Shadow_box.setAttribute("style", "--shadow_box:" + this.Shadow_css_code + " #" + this.hex_value + this.alpha_value)
        }
      })
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
let Shadow_controller_width = 40
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

let inputUpdateSliderEl = [Horizontal_length, Vertical_length, Blur_radius, Spread_radius, Opacity, Distance, Radius, Shadow_controller_opacity_ring]
let inputUpdateSlider = [Horizontal_length_final, Vertical_length_final, Blur_radius_final, Spread_radius_final, Opacity_final, Distance_final, Radius_final, Shadow_controller_opacity_ring_final]
let inputUpdateToggle = [Inset_toggle_final, Border_toggle_final, Multiple_layers_final]
inputUpdateSlider.forEach(inputUpdateSliders => {
  inputUpdateSliders.update()
})
inputUpdateToggle.forEach(inputUpdateToggles => {
  inputUpdateToggles.update()
})

const ShadowColorBtn = document.getElementById("Shadow_color_btn")
const ShadowColorBtnList = document.getElementById("Shadow_color_btn_list")
const ShadowColorInput = document.getElementById("Shadow_color_input")
const ShadowColorInputPallete = document.getElementById("Shadow_color_input_pallete")
const ShadowColorOutput = document.getElementById("Shadow_color_output")
const Shadow_color_color_option_list_box = document.getElementById("Shadow_color_color_option_list_box")
const ShadowColor = "0,0,0"
const BoxColorBtn = document.getElementById("Box_color_btn")
const BoxColorBtnList = document.getElementById("Box_color_btn_list")
const BoxColorInput = document.getElementById("Box_color_input")
const BoxColorInputPallete = document.getElementById("Box_color_input_pallete")
const BoxColorOutput = document.getElementById("Box_color_output")
const Box_color_color_option_list_box = document.getElementById("Box_color_color_option_list_box")
const CustomShadowCopy = document.getElementById("custom_shadow_copy")
const CustomShadowCodeSnippet = document.getElementById("custom_shadow_code_snippet")


let ShadowColorFinal = new ColorList(ShadowColorBtn, Shadow_color_color_option_list_box, ShadowColorBtnList, "Full", ShadowColorInput, false, false, "color_view", "color_value", ShadowColorOutput, ShadowColorBtn, ShadowColorBtn, ShadowColorInputPallete)
ShadowColorFinal.create()
ShadowColorFinal.select()
ShadowColorFinal.customInput()
let BoxColorFinal = new ColorList(BoxColorBtn, Box_color_color_option_list_box, BoxColorBtnList, "Full", BoxColorInput, false, false, "color_view", "color_value", BoxColorOutput, BoxColorBtn, BoxColorBtn, BoxColorInputPallete)
BoxColorFinal.create()
BoxColorFinal.select()
BoxColorFinal.customInput()
let ShadowCSS
let ShadowCSSOutput

function shadowCSSMaker() {
  if (!Inset_toggle_final.toggle_status) {
    ShadowCSS = `box-shadow: inset ${Horizontal_length_final.slider_value}px ${Vertical_length_final.slider_value}px ${Blur_radius_final.slider_value}px ${Spread_radius_final.slider_value}px rgba(${ShadowColorFinal.colorData.rgb},${convertRange(Opacity_final.slider_value, 0, 100, 0, 1)});`
    ShadowCSSOutput = `box-shadow: inset <span class="val">${Horizontal_length_final.slider_value}</span>px <span class="val">${Vertical_length_final.slider_value}</span>px <span class="val">${Blur_radius_final.slider_value}</span>px <span class="val">${Spread_radius_final.slider_value}</span>px rgba(<span class="val">${ShadowColorFinal.colorData.rgb},${convertRange(Opacity_final.slider_value, 0, 100, 0, 1)}</span>);`
    copyClipboard(CustomShadowCopy, ShadowCSS)
  } else if (Inset_toggle_final.toggle_status) {
    ShadowCSS = `box-shadow: ${Horizontal_length_final.slider_value}px ${Vertical_length_final.slider_value}px ${Blur_radius_final.slider_value}px ${Spread_radius_final.slider_value}px rgba(${ShadowColorFinal.colorData.rgb},${convertRange(Opacity_final.slider_value, 0, 100, 0, 1)});`
    ShadowCSSOutput = `box-shadow: <span class="val">${Horizontal_length_final.slider_value}</span>px <span class="val">${Vertical_length_final.slider_value}</span>px <span class="val">${Blur_radius_final.slider_value}</span>px <span class="val">${Spread_radius_final.slider_value}</span>px rgba(<span class="val">${ShadowColorFinal.colorData.rgb},${convertRange(Opacity_final.slider_value, 0, 100, 0, 1)}</span>);`
    copyClipboard(CustomShadowCopy, ShadowCSS)
  }
}

function shadowCSSOutput() {
  shadowCSSMaker()
  CustomShadowCodeSnippet.innerHTML = ShadowCSSOutput
}


const ShadowColorObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      Custom_shadow_sandbox_box.style.setProperty("--shadow_color", ShadowColorFinal.colorData.rgb)
      shadowCSSOutput()
    }
  });
});
ShadowColorObserver.observe(ShadowColorBtn, { childList: true, subtree: true });

const BoxColorObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      Custom_shadow_sandbox_box.style.setProperty("--box_color", BoxColorFinal.colorData.hex)
    }
  });
});
BoxColorObserver.observe(BoxColorBtn, { childList: true, subtree: true });


const Slider_style = document.getElementsByClassName("slider_style")
const Opacity_ring = document.getElementById("opacity_ring")
let Opacity_ring_val = document.getElementById("opacity_ring_val")
let inset_toggle_status = false
let shadow_distance = 0
let shadow_angle = 0
function calShadowDistance() {
  shadow_distance = calculateDistanceFromCenter(Number(Horizontal_length_final.slider_value) + Custom_shadow_sandbox_box_center_x, Number(Vertical_length_final.slider_value) + Custom_shadow_sandbox_box_center_y, Custom_shadow_sandbox_box_center_x, Custom_shadow_sandbox_box_center_y)
}

function applyShadow() {
  if (Multiple_layers.classList.contains("active")) {
    calculateRealisticShadow(
      Custom_shadow_sandbox_box, 5, shadow_distance, Blur_radius_final.slider_value, Spread_radius_final.slider_value, Opacity_final.slider_value / 100, shadow_angle, inset_toggle_status
    );
  } else {
    Custom_shadow_sandbox_box.style.removeProperty("box-shadow");
    Custom_shadow_sandbox_box.style.setProperty(
      "box-shadow", `inset var(--horizontal_length) var(--vertical_length) var(--blur_radius) var(--spread_radius) rgba(var(--shadow_color), var(--opacity));`
    );
  }
}

Multiple_layers.addEventListener("click", applyShadow);

function slider_upadte() {
  calShadowDistance()
  applyShadow()
  newX = (Custom_shadow_sandbox.offsetWidth / 2 - Shadow_controller_width / 2) - Horizontal_length_final.slider_value
  newY = (Custom_shadow_sandbox.offsetHeight / 2 - Shadow_controller_width / 2) - Vertical_length_final.slider_value
  update_controller(newX, newY)
  Opacity_ring_val.innerHTML = Opacity_final.slider_value
  shadowCSSOutput()
}

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
  shadowCSSOutput()
});

// CODE FOR CONTROLLER MOVE HERE

let offset_x = 0, offset_y = 0, shadow_X_distance = 0, shadow_Y_distance = 0, newX = 0, newY = 0, distance_controller_pos, snapnewX, snapnewY

Shadow_controller.addEventListener('mousedown', mouseDown)

function shadowOffsetX() {
  return Math.round(Custom_shadow_sandbox_box_center_x - (Shadow_controller.getBoundingClientRect().x + (Shadow_controller_width / 2)))
}
function shadowOffsetY() {
  return Math.round(Custom_shadow_sandbox_box_center_y - (Shadow_controller.getBoundingClientRect().y + (Shadow_controller_width / 2)))
}

function updateShadowRangeBox(X_val, Y_val) {
  Custom_shadow_sandbox_box.style.setProperty("--horizontal_length", X_val + "px")
  Custom_shadow_sandbox_box.style.setProperty("--vertical_length", Y_val + "px")
}

function boxControlGapX() {
  if (Custom_shadow_sandbox.offsetWidth / 2 === Shadow_controller.offsetLeft + Shadow_controller_width / 2) {
    return false
  } else { return true }
}

function boxControlGapY() {
  if (Custom_shadow_sandbox.offsetHeight / 2 === Shadow_controller.offsetTop + Shadow_controller_width / 2) {
    return false
  } else { return true }
}

function calShadowAngle() {
  return calculateAngle(Custom_shadow_sandbox_box_center_x, Custom_shadow_sandbox_box_center_y, Number(Horizontal_length_final.slider_value) + Custom_shadow_sandbox_box_center_x, Number(Vertical_length_final.slider_value) + Custom_shadow_sandbox_box_center_y)
}

function mouseDown(e) {
  offset_x = e.clientX - Shadow_controller.getBoundingClientRect().x
  offset_y = e.clientY - Shadow_controller.getBoundingClientRect().y
  if (Shadow_controller.classList.contains("show_ui")) {
    Shadow_controller.classList.add("grab")
    document.addEventListener('mousemove', mouseMove)
  }
  document.addEventListener('mouseup', mouseUp)
}

function update_controller(x, y) {
  Shadow_controller.style.left = `${x}px`;
  Shadow_controller.style.top = `${y}px`;
}

function center_controller() {
  update_controller(Custom_shadow_sandbox_box.offsetLeft - Shadow_controller_width / 2, Custom_shadow_sandbox_box.offsetTop - Shadow_controller_width / 2)
}

function updateHorVerDist() {
  newX = (Custom_shadow_sandbox.offsetWidth / 2 - Shadow_controller_width / 2) - Horizontal_length_final.slider_value
  newY = (Custom_shadow_sandbox.offsetHeight / 2 - Shadow_controller_width / 2) - Vertical_length_final.slider_value
  update_controller(newX, newY)
  calShadowDistance()
  Distance_final.slider_customize(shadow_distance)
  shadow_angle = calShadowAngle()
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
  if (keypressed_code == undefined) {
    snapnewX = newX
    snapnewY = newY
    update_controller(newX, newY)
  }
  if (keypressed_code == 16) {
    if ((e.clientX - Custom_shadow_sandbox_box.getBoundingClientRect().x - Custom_shadow_sandbox_box.offsetWidth / 2) % 10 == 0) {
      snapnewX = (e.clientX - Custom_shadow_sandbox.getBoundingClientRect().x) - Shadow_controller_width / 2
      if (left_touch) snapnewX = 0;
      if (right_touch) snapnewX = width;
      update_controller(snapnewX, snapnewY)
    }
    if (Math.round(((e.clientY - Custom_shadow_sandbox_box.getBoundingClientRect().y) - Custom_shadow_sandbox_box.offsetWidth / 2)) % 10 == 0) {
      snapnewY = (e.clientY - Custom_shadow_sandbox.getBoundingClientRect().y) - Shadow_controller_width / 2
      if (top_touch) snapnewY = 0;
      if (bottom_touch) snapnewY = height;
      update_controller(snapnewX, snapnewY)
    }
  }
  updateShadowRangeBox(shadowOffsetX(), shadowOffsetY())
  shadow_angle = calShadowAngle()
  calShadowDistance()
  applyShadow()
  Horizontal_length_final.slider_customize(shadowOffsetX())
  Vertical_length_final.slider_customize(shadowOffsetY())
  Distance_final.slider_customize(shadow_distance)
  callInputUpdate(5); callInputUpdate(0); callInputUpdate(1);
  shadowCSSOutput()
}

function mouseUp(e) {
  Shadow_controller.classList.remove("grab")
  document.removeEventListener('mousemove', mouseMove)
}

// BLUR RING CODE STARTS HERE ///////////////////////////////////////////////////////////////////////////////////////

let blur_ring_offset_x = 0, blur_ring_offset_y = 0, blur_drag = false, blur_ring_width_min = 230, blur_ring_width_max = 430, blur_ring_width = 230, blur_ring_radius = 20, percentage, spread_stretch_steps, blur_ring_steps
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

function blurRingUpdate(width) {
  Blur_ring.style.cssText = `width: clamp(${blur_ring_width_min}px, ${width}px, ${blur_ring_width_max}px); height: clamp(${blur_ring_width_min}px, ${width}px, ${blur_ring_width_max}px); border-radius: clamp(20px, 20px, 110px);`
  percentage = Math.round(convertRange(width, blur_ring_width_min, blur_ring_width_max, 0, 250))
}

function blurSlideRingUpdate() {
  blur_ring_width = Math.round(convertRange(Blur_radius_final.slider_value, 0, 250, blur_ring_width_min, blur_ring_width_max))
  Blur_ring.style.cssText = `width: clamp(${blur_ring_width_min}px, ${blur_ring_width}px, ${blur_ring_width_max}px); height: clamp(${blur_ring_width_min}px, ${blur_ring_width}px, ${blur_ring_width_max}px); border-radius: clamp(20px, 20px, 110px);`
}

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
    if (keypressed_code == 16) {
      blur_ring_steps = Math.round(getNearestStepVal(blur_ring_width, blur_ring_width_min, blur_ring_width_max, 25))
      blurRingUpdate(blur_ring_steps)
      Blur_radius_final.slider_customize(closestDivisible(percentage, 10))
      applyShadow()
    } else if (keypressed_code == undefined) {
      blurRingUpdate(blur_ring_width)
      Blur_radius_final.slider_customize(percentage)
      applyShadow()
    }
  }
  callInputUpdate(2)
  shadowCSSOutput()
}

function blur_ring_reset() {
  Blur_ring.style.cssText = `width: clamp(${blur_ring_width_min}px, 238px, ${blur_ring_width_max}px); height: clamp(${blur_ring_width_min}px, 238px, ${blur_ring_width_max}px); border-radius: clamp(20px, 20px, 110px);`
}

Blur_ring.addEventListener("mousedown", (e) => {
  blur_drag = true
  blur_ring_offset_x = e.clientX
  blur_ring_offset_y = e.clientY
  Blur_ring.classList.add("show")
  document.addEventListener('mousemove', (e) => blur_ring_update(e));
})

const Spread_level_box = document.getElementById("spread_level_box")
const Spread_level = document.getElementById("spread_level")
const Spread_level_stretch = document.getElementById("spread_level_stretch")
let Spread_level_resize = false, Spread_level_height = 207, Spread_level_height_min = 3, Spread_level_height_max = 207

function spread_level_reset() {
  Spread_level.style.cssText = `height: clamp(${Spread_level_height_min}px, 105px, ${Spread_level_height_max}px);`
}

function spread_level_update(height) {
  Spread_level.style.cssText = `height: clamp(${Spread_level_height_min}px, ${height}px, ${Spread_level_height_max}px);`
  let Spread_level_height_val = Math.round(convertRange(height, Spread_level_height_min, Spread_level_height_max, -50, 50))
  Spread_radius_final.slider_customize(Spread_level_height_val)
  applyShadow()
  shadowCSSOutput()
}

function spreadSlideRingUpdate() {
  Spread_level_height = Math.round(convertRange(Spread_radius_final.slider_value, -50, 50, Spread_level_height_min, Spread_level_height_max))
  Spread_level.style.cssText = `height: clamp(${Spread_level_height_min}px, ${Spread_level_height}px, ${Spread_level_height_max}px);`
}

function opacitySlideRingUpdate() {
  Shadow_controller_opacity_ring_final.slider_customize(Number(Opacity_final.slider_value))
  Opacity_ring_val.innerHTML = Opacity_final.slider_value
}

function distaneSlideUpdate() {
  let distance_controller_pos = getCoordinates(shadow_angle, Custom_shadow_sandbox_box_center_x, Custom_shadow_sandbox_box_center_y, Distance_final.slider_value)
  newX = distance_controller_pos.x - Custom_shadow_sandbox.getBoundingClientRect().x - Shadow_controller_width / 2
  newY = distance_controller_pos.y - Custom_shadow_sandbox.getBoundingClientRect().y - Shadow_controller_width / 2
  update_controller(newX, newY)
  updateShadowRangeBox(shadowOffsetX(), shadowOffsetY())
  Horizontal_length_final.slider_customize(shadowOffsetX())
  Vertical_length_final.slider_customize(shadowOffsetY())
}

document.addEventListener("mousedown", (e) => {
  switch (e.target) {
    case Horizontal_length:
      Horizontal_length.addEventListener("input", () => {
        Distance_final.slider_customize(shadow_distance)
        shadow_angle = calShadowAngle()
        callInputUpdate(0); callInputUpdate(5);
      })
      break;
    case Vertical_length:
      Vertical_length.addEventListener("input", () => {
        Distance_final.slider_customize(shadow_distance)
        shadow_angle = calShadowAngle()
        callInputUpdate(1); callInputUpdate(5);
      })
      break;
    case Blur_radius:
      Blur_ring.classList.add("show")
      Blur_radius.addEventListener("input", () => {
        blurSlideRingUpdate()
        callInputUpdate(2)
      })
      break;
    case Shadow_controller_opacity_ring:
      Shadow_controller_opacity_ring.addEventListener("input", () => {
        Shadow_controller_opacity_ring_final.update()
        Opacity_final.slider_customize(Number(Shadow_controller_opacity_ring.value))
        Opacity_ring_val.innerHTML = Shadow_controller_opacity_ring.value
        applyShadow()
        callInputUpdate(4)
        shadowCSSOutput()
      })
      break;
    case Opacity:
      Opacity_ring.classList.add("show")
      Opacity_ring_val.classList.add("show")
      Opacity.addEventListener("input", () => {
        opacitySlideRingUpdate()
        callInputUpdate(4)
      })
      break;
    case Spread_radius:
      Spread_level_box.classList.add("show")
      Spread_radius.addEventListener("input", () => {
        spreadSlideRingUpdate()
        callInputUpdate(3)
      })
      break;
    case Distance:
      Distance.addEventListener("input", () => {
        distaneSlideUpdate()
        callInputUpdate(5); callInputUpdate(0); callInputUpdate(1)
      })
      break;
    case Spread_level_stretch:
      Spread_level_resize = true
      Spread_level_stretch.classList.add("show")
      Spread_level_box.classList.add("show")
      document.addEventListener("mousemove", (e) => {
        if (Spread_level_resize) {
          Spread_level_height = Math.round(Spread_level.getBoundingClientRect().bottom - e.clientY)
          if (keypressed_code == undefined) {
            spread_level_update(Spread_level_height)
          }
          if (keypressed_code == 16) {
            spread_stretch_steps = getNearestStepVal(Spread_level_height, 3, 207, 11)
            spread_level_update(spread_stretch_steps)
          }
        }
        callInputUpdate(3)
      })
      break;
    case Radius:
      document.addEventListener("input", (e) => {
        callInputUpdate(6)
      })
      break;
  }
})

let remove_show_array = [Left_stretch, Top_stretch, Right_stretch, Bottom_stretch, Blur_ring, Spread_level_stretch, Spread_level_box, Opacity_ring, Opacity_ring_val]
document.addEventListener("mouseup", () => {
  blur_drag = false, Spread_level_resize = false, Resize_left = false, Resize_top = false, Resize_right = false, Resize_bottom = false
  remove_show_array.forEach(Remove_shows => {
    Remove_shows.classList.remove("show")
  })
})


const BgColorBox = document.getElementById("bg_color_box")
const BgColorListBox = document.getElementById("bg_color_list_box")
const BgColorInput = document.getElementById("bg_color_input")
const BgColorInputPallete = document.getElementById("bg_color_input_pallete")
const BG_Color = document.getElementById("bg_color")
const BgColorFinal = new ColorList(BG_Color, BgColorListBox, BgColorBox, "Full", BgColorInput, false, false, "color_view", "color_value", Custom_shadow_sandbox, Custom_shadow_sandbox, undefined, BgColorInputPallete)
BgColorFinal.create()
BgColorFinal.select()
BgColorFinal.customInput()

let reset_val_slider = [{ forSlider: "Horizontal_length", val: 0 }, { forSlider: "Vertical_length", val: 0 }, { forSlider: "Blur_radius", val: 10 }, { forSlider: "Spread_radius", val: 0 }, { forSlider: "Opacity", val: 10 }, { forSlider: "Distance", val: 0 }, { forSlider: "Radius", val: 10 }, { forSlider: "Opacity_ring", val: 10 }];
let reset_val_toggle = [{ forToggle: "Inset_toggle", val: true }, { forToggle: "Border_toggle", val: true }, { forToggle: "Multiple_layers", val: false }]
let reset_val_input = [{ forInput: "Horizontal_length_input", val: 0 }, { forInput: "vertical_length_input", val: 0 }, { forInput: "blur_radius_input", val: 10 }, { forInput: "spread_radius_input", val: 0 }, { forInput: "opacity_input", val: 10 }, { forInput: "distance_input", val: 0 }, { forInput: "Radius_input", val: 10 }]
const Reset_custom_shadow = document.getElementById("reset")

Reset_custom_shadow.addEventListener("click", () => {
  inputUpdateToggle.forEach((inputUpdateToggles, index) => {
    inputUpdateToggles.toggleCustomize(reset_val_toggle[index].val)
  })
  inputUpdateSlider.forEach((inputUpdateSliders, index) => {
    inputUpdateSliders.slider_customize(reset_val_slider[index].val)
  })
  input_name.forEach((input_names, index) => {
    input_names.value = reset_val_input[index].val
  })
  blur_ring_reset()
  spread_level_reset()
  center_controller()
  ShadowColorFinal.customizeColor("#000000", "Black", "0,0,0")
  Custom_shadow_sandbox_box.style.setProperty("--shadow_color", ShadowColorFinal.colorData.rgb)
  BoxColorFinal.customizeColor("#ffffff", "White", "255,255,255")
  Custom_shadow_sandbox_box.style.setProperty("--box_color", BoxColorFinal.colorData.hex)
  BgColorFinal.customizeColor("#fafafb", "White", "255,255,255")
  shadow_distance = 0
  BgColorFinal.resetPallete('#fafafb')
  applyShadow()
  shadowCSSOutput()
})

document.addEventListener("keydown", (e) => {
  if (keypressed_code == 16) {
    inputUpdateSliderEl.forEach((inputUpdateSliderEls) => {
      inputUpdateSliderEls.setAttribute("step", 10)
    })
  }
})

document.addEventListener("keyup", (e) => {
  inputUpdateSliderEl.forEach((inputUpdateSliderEls) => {
    inputUpdateSliderEls.removeAttribute("step")
  })
})

const Hide_controller = document.getElementById("hide_controller")
let show_ui_toggle = [Hide_controller, Blur_ring, Spread_level_box, Shadow_controller, Opacity_ring]
Hide_controller.addEventListener("click", () => {
  show_ui_toggle.forEach(show_ui_toggles => {
    show_ui_toggles.classList.toggle("show_ui")
  })
})

// CODE FOR CONTROLLER MOVE HERE

const shadow_panel_custom_input = document.getElementsByClassName("shadow_panel_custom_input")
let Horizontal_length_input, vertical_length_input, blur_radius_input, spread_radius_input, opacity_input, distance_input, Radius_input, Horizontal_length_input_final, vertical_length_input_final, blur_radius_input_final, spread_radius_input_final, opacity_input_final, distance_input_final, Radius_input_final
let input_name = [Horizontal_length_input, vertical_length_input, blur_radius_input, spread_radius_input, opacity_input, distance_input, Radius_input]
let input_name_final = [Horizontal_length_input_final, vertical_length_input_final, blur_radius_input_final, spread_radius_input_final, opacity_input_final, distance_input_final, Radius_input_final]
Array.from(shadow_panel_custom_input).forEach((shadow_panel_custom_inputs, index) => {
  input_name[index] = shadow_panel_custom_inputs
  input_name_final[index] = new InputBox(input_name[index], inputUpdateSlider[index])
  input_name_final[index].update()
})
document.addEventListener("change", (e) => {
  switch (e.target) {
    case input_name[0]:
      updateHorVerDist()
      callInputUpdate(5)
      break;
    case input_name[1]:
      updateHorVerDist()
      callInputUpdate(5)
      break;
    case input_name[2]:
      Blur_ring.classList.add("show")
      blurSlideRingUpdate()
      break;
    case input_name[3]:
      Spread_level_box.classList.add("show")
      spreadSlideRingUpdate()
      break;
    case input_name[4]:
      Opacity_ring.classList.add("show")
      Opacity_ring_val.classList.add("show")
      opacitySlideRingUpdate()
      break;
    case input_name[5]:
      callInputUpdate(0)
      callInputUpdate(1)
      distaneSlideUpdate()
      break;
  }
})

function callInputUpdate(index) {
  switch (index) {
    case 0:
      input_name_final[0].customizeInput(Number(Horizontal_length_final.slider_value))
      break;
    case 1:
      input_name_final[1].customizeInput(Number(Vertical_length_final.slider_value))
      break;
    case 2:
      input_name_final[2].customizeInput(Number(Blur_radius_final.slider_value))
      break;
    case 3:
      input_name_final[3].customizeInput(Number(Spread_radius_final.slider_value))
      break;
    case 4:
      input_name_final[4].customizeInput(Number(Opacity_final.slider_value))
      break;
    case 5:
      input_name_final[5].customizeInput(Number(Distance_final.slider_value).toFixed(2))
      break;
    case 6:
      input_name_final[6].customizeInput(Number(Radius_final.slider_value))
      break;
  }
}
