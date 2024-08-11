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

// SHADOW EFFECT COLOR FORMAT CODE STARTS HERE

const Shadow_box_color_format_btn = document.getElementsByClassName("shadow_box_color_format_btn")
const Color_format_box = document.getElementsByClassName("color_format")

class Format {
  constructor(format_btn) {
    this.Format_btn = format_btn
    this.Format_list = this.Format_btn.nextElementSibling
    this.Format_btn_child = this.Format_list.children
    this.Color_format
    this.Color_format_data = this.Format_btn.parentNode.nextElementSibling.children[0].children[0]
    this.Color_alpha_data = this.Format_btn.parentNode.nextElementSibling.children[0].children[1]
    this.Shadow_box_color_format_value = undefined
    this.hex_value = this.Format_btn.getAttribute("hex_code").substring(1)
    this.alpha_value = this.Format_btn.getAttribute("alpha_value")
    this.rgb_value = hexToRgba(this.hex_value, this.alpha_value)
    this.css_value = this.rgb_value
    this.hsl_value = rgbaToHsla(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], this.rgb_value[3], true)
    this.hsb_value = rgbToHsb(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], true)
    this.xyz_value = rgbToXyz(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2], true)
    this.lab_value = xyzToLab(this.xyz_value[0].slice(0, -1), this.xyz_value[1].slice(0, -1), this.xyz_value[2].slice(0, -1), true)
    this.lch_value = labToLch(this.lab_value[0].slice(0, -1), this.lab_value[1].slice(0, -1), this.lab_value[2].slice(0, -1), true)
    this.cmyk_value = rgbToCmyk(this.rgb_value[0], this.rgb_value[1], this.rgb_value[2])
  }

  Format_list_creator() {
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

        if (this.Color_format === "HSB" || this.Color_format === "LCH" || this.Color_format === "LAB" || this.Color_format === "XYZ") {
          this.Color_alpha_data.classList.remove("col-3")
          this.Color_alpha_data.innerHTML = ``
        }

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
      })
    });
  }
}

let Shadow_box_color_format_btn_final

Array.from(Shadow_box_color_format_btn).forEach(Shadow_box_color_format_btns => {
  Shadow_box_color_format_btn_final = new Format(Shadow_box_color_format_btns)
  Shadow_box_color_format_btn_final.Format_list_creator()
});

// SHADOW EFFECT COLOR FORMAT CODE ENDS HERE

// SHADOW EFFECT SHADOW COLOR CODE STARTS HERE

const Color_option_list = document.getElementsByClassName("color_option_list")
const shadowColors = [
  { name: "Charcoal", hex: "#36454F" },
  { name: "Majorelle Blue", hex: "#5546FF" },
  { name: "Cadet gray", hex: "#959DA5" },
  { name: "Dim gray", hex: "#64646F" },
  { name: "UCLA Blue", hex: "#50749D" },
  { name: "Slate Gray", hex: "#708090" },
  { name: "Lavender (web)", hex: "#EBE9FF" },
  { name: "Dark Slate Gray", hex: "#2F4F4F" },
  { name: "Ghost white", hex: "#EEEFF7" },
  { name: "Gunmetal", hex: "#2A3439" },
  { name: "Dim Gray", hex: "#696969" },
  { name: "Gray", hex: "#808080" },
  { name: "Light Slate Gray", hex: "#778899" },
  { name: "Steel Blue", hex: "#4682B4" },
  { name: "Jordy Blue", hex: "#90AEF4" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Medium Slate Blue", hex: "#7B68EE" },
  { name: "Dark Olive Green", hex: "#556B2F" },
  { name: "Forest Green", hex: "#228B22" },
  { name: "Dark Green", hex: "#006400" },
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

class Shadow_color {
  constructor(Color_option_list) {
    this.Color_option_list = Color_option_list
    this.Shadow_box_shadow_color_btn = this.Color_option_list.previousElementSibling
    this.color_view_box
    this.color_view
    this.color_name
  }
  
  Color_Update(){
    for(let i = 0; i < shadowColors.length; i++){
      this.color_view_box = document.createElement("div")
      this.color_view = document.createElement("div")
      this.color_name = document.createElement("p")
      this.Color_option_list.appendChild(this.color_view_box)
      this.color_view_box.appendChild(this.color_view)
      this.color_view_box.appendChild(this.color_name)
      this.color_view.classList.add("color_view")
      this.color_view.setAttribute("style",`--color_view_bg:${shadowColors[i].hex};`)
      this.color_name.classList.add("color_value")
      this.color_name.innerHTML = shadowColors[i].name
    }

    this.Shadow_box_shadow_color_btn.addEventListener("click",()=>{
      this.Color_option_list.classList.toggle("active")
    })

    document.addEventListener("click", (e) => {
      if (e.target !== this.Shadow_box_shadow_color_btn) {
        this.Color_option_list.classList.remove("active")
      }
    })

    console.log(this.Shadow_box_shadow_color_btn)
  }
}

let Final_Shadow_Color

Array.from(Color_option_list).forEach(Color_option_lists => {
  Final_Shadow_Color = new Shadow_color(Color_option_lists)
  Final_Shadow_Color.Color_Update()
});

// SHADOW EFFECT SHADOW COLOR CODE ENDS HERE
