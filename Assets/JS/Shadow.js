class Shadow {
    constructor(Shadow_box, shadowCard) {
        this.Shadow_box = Shadow_box
        this.ShadowCard = shadowCard
        this.HasMultipleShadows = this.Shadow_box.getAttribute("hasMultipleShadows")
        this.MainShadow = this.Shadow_box.getAttribute("main_shadow")
        this.Shadow_box_css = this.Shadow_box.getAttribute("style")
        this.Format_btn = this.Shadow_box.querySelector('.shadow_box_color_format_btn')
        this.Shadow_css_code = this.Format_btn.getAttribute("shadow_code")
        this.Format_list = this.Shadow_box.querySelector('.format_list')
        this.Format_btn_child = this.Format_list.children
        this.Color_format = this.Format_btn.innerHTML.slice(1, -1)
        this.Color_format_data = this.Shadow_box.querySelector('.color_format_data')
        this.Color_alpha_data = this.Shadow_box.querySelector('.color_alpha')
        this.Shadow_box_color_format_value = undefined
        this.hex_value = this.Format_btn.getAttribute("hex_code").substring(1)
        this.alpha_value = this.Format_btn.getAttribute("alpha_value")
        this.Shadow_box_alpha_value = this.alpha_value
        this.Color_option_list = this.Shadow_box.querySelector('.color_option_list')
        this.Shadow_box_shadow_color_btn = this.Shadow_box.querySelector('.shadow_box_shadow_color_btn')
        this.color_option_list_box = this.Shadow_box.querySelector('.color_option_list_box')
        this.color_view_box
        this.color_view
        this.color_name
        this.color_output = this.Shadow_box.querySelector('.btn_color_view')
        this.colorInput = this.Shadow_box.querySelector('.custom_color_input')
        this.Bg_color_btn = this.Shadow_box.querySelector('.shadow_box_bg_btn')
        this.Bg_color_list_box = this.Shadow_box.querySelector('.shadow_box_bg_list_box')
        this.Bg_color_input = this.Shadow_box.querySelector('.bg_color_input')
        this.Bg_color_input_pallete = this.Shadow_box.querySelector('.bg_color_pallete')
        this.Bg_color_list = this.Shadow_box.querySelector('.shadow_box_bg_list')
        this.Shadow_value = this.Shadow_box.querySelector('.shadow_value')
        this.UpdatedShadow
        this.copy_btn = this.Shadow_box.querySelector('.shadow_box_copy_btn')
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
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
        <p>[</p>
        <p>HEX</p>
        <p>]</p>
        </div>
        <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${"#" + this.hex_value}</h3>
        `
        }
    }

    other_color_update() {
        if (this.Color_format === "RGB" || this.Color_format === "HSL" || this.Color_format === "HSB" || this.Color_format === "CSS" || this.Color_format === "LCH" || this.Color_format === "LAB" || this.Color_format === "XYZ") {
            this.Color_format_data.classList.add("gap-5")
            this.Color_format_data.classList.remove("gap-10", "row-col")
            this.Color_format_data.innerHTML = `
      <div class="row row-col gap-10 col-4">
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
          <p>[</p>
          <p>${this.Color_format[0]}</p>
          <p>]</p>
        </div>
        <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${this.Shadow_box_color_format_value[0]}</h3>
      </div>
      <div class="row row-col gap-10 col-4">
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
          <p>[</p>
          <p>${this.Color_format[1]}</p>
          <p>]</p>
        </div>
        <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${this.Shadow_box_color_format_value[1]}</h3>
      </div>
      <div class="row row-col gap-10 col-4">
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
          <p>[</p>
          <p>${this.Color_format[2]}</p>
          <p>]</p>
        </div>
        <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${this.Shadow_box_color_format_value[2]}</h3>
      </div>`
        }
    }

    color_alpha_update() {
        if (this.Color_format === "HEX" || this.Color_format === "RGB" || this.Color_format === "HSL" || this.Color_format === "HSB" || this.Color_format === "CSS") {
            this.Color_alpha_data.classList.add("col-3")
            this.Color_alpha_data.innerHTML = `
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
        <p>[</p>
        <p>alpha</p>
        <p>]</p>
        </div>
        <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${this.Shadow_box_alpha_value}</h3>
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
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
        <p>[</p>
        <p>${this.Color_format[0]}</p>
        <p>]</p>
        </div>
        <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${this.Shadow_box_color_format_value[0]}</h3>
        </div>
        <div class="row row-col gap-10 col-3">
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
        <p>[</p>
          <p>${this.Color_format[1]}</p>
          <p>]</p>
          </div>
        <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${this.Shadow_box_color_format_value[1]}</h3>
        </div>
        <div class="row row-col gap-10 col-3">
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
          <p>[</p>
          <p>${this.Color_format[2]}</p>
          <p>]</p>
          </div>
          <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${this.Shadow_box_color_format_value[2]}</h3>
          </div>
      <div class="row row-col gap-10 col-3">
        <div class="color_format_index_value row space-between align-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">
          <p>[</p>
          <p>${this.Color_format[3]}</p>
          <p>]</p>
          </div>
          <h3 class="text-center text-upper ${this.BgColorFinal.colorData.tag === "Light" ? 'black' : 'white'}">${this.Shadow_box_color_format_value[3]}</h3>
          </div>`
        }
    }

    Shadow_value_update() {
        this.isLight = this.BgColorFinal.colorData.tag === "Light";
        Array.from(this.Shadow_value.children).forEach(shadowValueChild => {
            shadowValueChild.children[0].classList.toggle("black", this.isLight);
            shadowValueChild.children[0].classList.toggle("white", !this.isLight);
            shadowValueChild.children[1].classList.toggle("black", this.isLight);
            shadowValueChild.children[1].classList.toggle("white", !this.isLight);
        })
        this.copy_btn.classList.toggle("white", this.isLight)
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

        this.BgColorFinal = new ColorList(this.Bg_color_btn, this.Bg_color_list, this.Bg_color_list_box, "Full", this.Bg_color_input, false, false, "color_view", "color_value", this.Shadow_box, this.Bg_color_btn, this.Bg_color_btn, this.Bg_color_input_pallete)
        this.BgColorFinal.customizeColor("#ffffff", "White", "255,255,255", "Light", "Black")
        this.BgColorFinal.create()
        this.BgColorFinal.select()
        this.BgColorFinal.customInput()

        this.Color_option_list.children[0].addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.hex_value = this.Color_option_list.children[0].value
                this.colorUpdateGroup()
                this.Shadow_box.style.setProperty("--shadow_box", this.Shadow_css_code + " #" + this.hex_value + this.alpha_value)
            }
        })
        this.ColorListFinal.customInput()

        this.BgColorObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.hex_update()
                    this.other_color_update()
                    this.color_alpha_update()
                    this.cmyk_update()
                    this.Shadow_value_update()
                }
            });
        });
        this.BgColorObserver.observe(this.Bg_color_btn, { childList: true, subtree: true });

        Array.from(this.Color_option_list.children).forEach(color_view_boxes => {
            color_view_boxes.addEventListener("click", (e) => {
                this.hex_value = this.Format_btn.getAttribute("hex_code").substring(1)
                if (this.Color_format === "HEX") {
                    this.Shadow_box.children[1].children[0].children[0].children[1].innerHTML = this.hex_value
                }
                this.UpdatedShadow = recolorShadow(this.MainShadow, this.hex_value)
                this.colorUpdateGroup()

                this.ShadowCard.mainShadowData = this.ShadowCard.extractShadowPosition(this.UpdatedShadow)
                print(this.ShadowCard.mainShadowData)
                print(this.ShadowCard.count)
                this.ShadowCard.updateVisualShadowData(this.ShadowCard.count)   
                // the above updateVisualShadowData doesn't work fix it 

                this.Shadow_box.style.setProperty("--shadow_box", this.UpdatedShadow)
                copyClipboard(this.copy_btn, `box-shadow: ${this.Shadow_css_code} #${this.hex_value}${this.alpha_value};`)
            })
        })
        
        copyClipboard(this.copy_btn, `box-shadow: ${this.Shadow_css_code} #${this.hex_value}${this.alpha_value};`)
    }
}
