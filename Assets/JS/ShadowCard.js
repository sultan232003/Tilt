class ShadowCard {
    constructor({ shadowCode: shadowCode, hexCode: hexCode, alphaValue: alphaValue, bgColor: bgColor, hasMultipleShadows: hasMultipleShadows, colorName: colorName }) {
        this.shadowCode = shadowCode || '0px 0px 0px 0px';
        this.mainShadow = shadowCode
        this.hexCode = hexCode || '#000000';
        this.alphaValue = alphaValue || 'FF';
        this.bgColor = bgColor || '#ffffff';
        this.HasMultipleShadows = hasMultipleShadows
        this.ColorName = colorName
        this.mainShadowData = this.extractShadowPosition(this.shadowCode)
        this.count = 0
        this.maxCount = this.mainShadowData.length
    }

    createCard() {
        this.Wrapper = createTag("div");
        this.ShadowBox = createTag("div", "shadow_box", {}, this.Wrapper);
        this.ShadowBox.style.setProperty("--shadow_box", this.shadowCode);
        this.ShadowBox.style.setProperty("--color_view_bg", "#ffffff");
        this.ShadowBox.setAttribute("hasMultipleShadows", this.HasMultipleShadows)
        this.ShadowBox.setAttribute("main_shadow", this.mainShadow);
        this.ButtonRowTop = createTag("div", "button_row_top", {}, this.ShadowBox);
        this.ShadowBoxColorFormatBtn = createTag("button", "shadow_box_color_format_btn mac_3D_btn text-upper", {}, this.ButtonRowTop);
        this.extractHex()
        this.ShadowBoxColorFormatBtn.setAttribute("shadow_code", this.shadowCode);
        this.ShadowBoxColorFormatBtn.setAttribute("hex_code", this.hexCode);
        this.ShadowBoxColorFormatBtn.setAttribute("alpha_value", this.alphaValue);
        this.ShadowBoxColorFormatBtn.innerHTML = "(HEX)"
        this.FormatList = createTag("div", "format_list", {}, this.ButtonRowTop);
        ["(HEX)", "(RGB)", "(HSL)", "(HSB)", "(CSS)", "(LCH)", "(LAB)", "(XYZ)", "(CMYK)"].forEach(FormatOptions => {
            let FormatOptionsDiv = document.createElement("div")
            FormatOptionsDiv.innerHTML = FormatOptions
            this.FormatList.appendChild(FormatOptionsDiv)
        });
        this.TempDiv1 = createTag("div", "width-100 pos-rel", {}, this.ButtonRowTop);
        this.ShadowBoxShadowColorBtn = createTag("button", "shadow_box_shadow_color_btn mac_3D_btn text-caps", {}, this.TempDiv1);
        this.ShadowBoxShadowColorBtn.innerHTML = this.ColorName;
        this.ColorOptionList = createTag("div", "color_option_list width-100", {}, this.TempDiv1);
        this.ColorOptionListInput = createTag("input", "custom_color_input", {}, this.ColorOptionList);
        this.ColorOptionListInput.type = "text";
        this.ColorOptionListInput.placeholder = "Custom";
        this.ColorOptionListInput.maxLength = 6;
        this.ColorOptionListBox = createTag("div", "color_option_list_box", {}, this.ColorOptionList);
        this.BtnColorView = createTag("div", "btn_color_view", {}, this.ButtonRowTop);
        this.BtnColorView.style.setProperty("--color_view_bg", this.hexCode);
        this.ColorValue = createTag("div", "color_value row row-col", {}, this.ShadowBox);
        this.ColorFormat = createTag("div", "color_format row width-100 gap-5", {}, this.ColorValue);
        this.ColorFormatData = createTag("div", "color_format_data row row-col width-100 gap-10", {}, this.ColorFormat);
        this.ColorFormatIndexValue = createTag("div", "color_format_index_value row space-between align-center text-upper", {}, this.ColorFormatData);
        ["[", "HEX", "]"].forEach(text => {
            const p = document.createElement("p");
            p.textContent = text;
            this.ColorFormatIndexValue.appendChild(p);
        });
        this.TempH3 = createTag("h3", "text-center text-upper", {}, this.ColorFormatData)
        this.TempH3.innerHTML = this.hexCode
        this.ColorAlpha = createTag("div", "color_alpha row row-col col-3 gap-10", {}, this.ColorFormat)
        this.ColorFormatIndexValue2 = createTag("div", "color_format_index_value row space-between align-center text-upper", {}, this.ColorAlpha);
        ["[", "alpha", "]"].forEach(text => {
            const p = document.createElement("p");
            p.textContent = text;
            this.ColorFormatIndexValue2.appendChild(p);
        });
        this.TempH3_2 = createTag("h3", "text-center text-upper", {}, this.ColorAlpha)
        this.TempH3_2.innerHTML = this.alphaValue
        this.TempDiv2 = createTag("div", "", {}, this.ColorValue);
        this.Line = createTag("hr", "", {}, this.TempDiv2);
        this.ShadowValue = createTag("div", "shadow_value row gap-5", {}, this.ColorValue)
        const shadow = this.mainShadowData[0];
        let shadowData = [
            { value: `${shadow.xOffset}px`, label: "X" },
            { value: `${shadow.yOffset}px`, label: "Y" },
            { value: `${shadow.blurRadius}px`, label: "BLUR" },
            { value: `${shadow.spreadRadius}px`, label: "SPREAD" }
        ];
        this.shadowCode = `${shadow.inset ? 'inset ' : ''}${shadowData.map(d => d.value).join(' ')}`;
        this.ShadowBoxColorFormatBtn.setAttribute("shadow_code", this.shadowCode);
        this.shadowFormatDataList = [];
        shadowData.forEach(({ value, label }, index) => {
            const ShadowFormatData = createTag("div", "shadow_format_data row row-col col-9 gap-10", {}, this.ShadowValue);
            const h3 = createTag("h3", "text-center", {}, ShadowFormatData);
            h3.innerHTML = value;
            const labelDiv = createTag("div", "color_format_index_value row space-between align-center text-upper", {}, ShadowFormatData);
            ["[", label, "]"].forEach(text => {
                const p = document.createElement("p");
                p.textContent = text;
                labelDiv.appendChild(p);
            });
            this.shadowFormatDataList.push({ ShadowFormatData, h3, labelDiv });
        });
        this.ButtonRowBottom = createTag("div", "button_row_bottom row gap-5", {}, this.ShadowBox)
        this.TempDiv3 = createTag("div", "width-100 row pos-rel", {}, this.ButtonRowBottom)
        this.ShadowBoxBGButton = createTag("button", "shadow_box_bg_btn mac_3D_btn", {}, this.TempDiv3)
        this.ShadowBoxBGButton.innerHTML = "White"
        this.ShadowBoxBGListBox = createTag("div", "shadow_box_bg_list_box width-100 pos-rel", {}, this.TempDiv3)
        this.TempDiv4 = createTag("div", "width-100 row gap-5", {}, this.ShadowBoxBGListBox)
        this.BgColorInput = createTag("input", "width-100 bg_color_input", {}, this.TempDiv4);
        this.BgColorInput.setAttribute("type", "text");
        this.BgColorInput.setAttribute("placeholder", "Custom");
        this.BgColorInput.setAttribute("maxlength", "6");
        this.BGColorPallete = createTag("input", "bg_color_pallete", { type: "color", value: "#000000", name: "" }, this.TempDiv4);
        this.BGColorPallete.setAttribute("type", "color");
        this.BGColorPallete.setAttribute("value", "#000000");
        this.BGColorPallete.setAttribute("name", " ");
        this.ShadowBoxBGList = createTag("div", "shadow_box_bg_list", {}, this.ShadowBoxBGListBox);
        this.ShadowBoxCopyBtn = createTag("button", "shadow_box_copy_btn mac_3D_btn white", {}, this.ButtonRowBottom)
        this.ShadowBoxCopyBtn.innerHTML = "Copy"
        if (this.HasMultipleShadows) {
            this.createController();
            this.controllerFunction();
        }

        return this.Wrapper
    }

    createController() {
        this.ShadowValueChangeControl = createTag("div", "shadow_value_change_control", {}, this.ShadowBox)
        this.Prev = createTag("div", "prev", {}, this.ShadowValueChangeControl)
        this.PrevIcon = createTag("i", "fa-solid fa-caret-left", {}, this.Prev)
        this.PrevIcon.style.opacity = "0.5";
        this.Next = createTag("div", "next", {}, this.ShadowValueChangeControl)
        this.NextIcon = createTag("i", "fa-solid fa-caret-right", {}, this.Next)
    }

    extractHex() {
        if (!this.HasMultipleShadows) {
            this.hexCode = this.mainShadowData[0].color.slice(0, 7);
            this.alphaValue = this.mainShadowData[0].color.slice(7, 9);
        } else {
            this.hexCode = this.mainShadowData[0].color.slice(0, 7);
            this.alphaValue = this.mainShadowData[0].color.slice(7, 9);
        }
    }

    updateVisualShadowData(count) {
        this.TempH3.innerHTML = this.mainShadowData[count].color.slice(0, 7)
        this.TempH3_2.innerHTML = this.mainShadowData[count].color.slice(7, 9)
        const keys = ["xOffset", "yOffset", "blurRadius", "spreadRadius"];
        keys.forEach((key, i) => {
            this.shadowFormatDataList[i].h3.innerHTML = `${this.mainShadowData[count][key]}px`;
        });
    }

    controllerFunction() {
        this.Prev.addEventListener("click", (e) => {
            this.count > 0 ? this.count-- : null;
            this.PrevIcon.style.opacity = this.count === 0 ? "0.5" : "1";
            this.NextIcon.style.opacity = this.count < this.maxCount - 1 ? "1" : "0.5";
            this.updateVisualShadowData(this.count);
        })
        this.Next.addEventListener("click", (e) => {
            this.count < this.maxCount - 1 ? this.count++ : null;
            this.NextIcon.style.opacity = this.count === this.maxCount - 1 ? "0.5" : "1";
            this.PrevIcon.style.opacity = this.count > 0 ? "1" : "0.5";
            this.updateVisualShadowData(this.count);
        })
    }

    extractShadowPosition(shadowCode) {
        const shadows = shadowCode.split(/\s*,\s*/);
        return shadows.map(shadow => {
            const result = {
                xOffset: 0,
                yOffset: 0,
                blurRadius: 0,
                spreadRadius: 0,
                inset: false,
                color: "#000000ff"
            };
            if (shadow.includes('inset')) {
                result.inset = true;
                shadow = shadow.replace(/\binset\b/, '').trim();
            }
            const colorMatch = shadow.match(/#[0-9a-fA-F]{3,8}/);
            if (colorMatch) {
                result.color = colorMatch[0];
                shadow = shadow.replace(result.color, '').trim();
            }
            const lengths = shadow.match(/-?\d+(\.\d+)?px/g) || [];
            const [x, y, blur, spread] = lengths.map(v => parseFloat(v));
            result.xOffset = x || 0;
            result.yOffset = y || 0;
            result.blurRadius = blur || 0;
            result.spreadRadius = spread || 0;
            return result;
        });
    }

    mount(target) {
        target.appendChild(this.Wrapper)
    }
}

const inputShadow = "5px 5px #f02eaa66, 10px 10px #f02eaa4d, 15px 15px #f02eaa33, 20px 20px #f02eaa1a, 25px 25px #f02eaa0d";
const newBaseColor = "#228B22";

const newShadow = recolorShadow(inputShadow, newBaseColor);
console.log(newShadow);

const shadowList = [{ box_shadow: "0px 8px 24px #959da533", hasMultipleShadows: false, colorName: "Cadet Gray" },
{ box_shadow: "0px 7px 29px 0px #64646f33", hasMultipleShadows: false, colorName: "Dim Gray" },
{ box_shadow: "2px 2px 2.6px #00000026", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 5px 15px #00000059", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 1px 4px #00000029", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 3px 8px #0000003d", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 2px 8px 0px #63636333", hasMultipleShadows: false, colorName: "Dim Gray" },
{ box_shadow: "0px 1px 4px #00000029, 0px 0px 0px 3px #333333ff", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 3px 0px #00000005, 0px 0px 0px 1px #1b1f2326", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 4px 12px #0000001a", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 54px 55px #00000040, 0px -12px 30px #0000001f, 0px 4px 6px #0000001f, 0px 12px 13px #0000002b, 0px -3px 5px #00000017", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 6px 24px 0px #00000008, 0px 0px 0px 1px #00000014", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 10px 36px 0px #00000029, 0px 0px 0px 1px #0000000F", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 48px 100px 0px #110c2e26", hasMultipleShadows: false, colorName: "Dark Purple" },
{ box_shadow: "0px 50px 100px -20px #32325d40, 0px 30px 60px -30px #0000004c, inset 0px -2px 6px 0px #0a25403d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "inset 0px 1px 1px 0px #FFFFFF1A, 0px 50px 100px -20px #32325D40, 0px 30px 60px -30px #0000004C", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 2px 5px -1px #32325d40, 0px 1px 3px -1px #0000004d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 20px 30px -10px #26394dff", hasMultipleShadows: false, colorName: "Prussian Blue" },
{ box_shadow: "0px 0px 0px 2px #06182c66, 0px 4px 6px -1px #06182ca6, inset 0px 1px 0px #ffffff14", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 6px 12px -2px #32325d40, 0px 3px 7px -3px #0000004d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 13px 27px -5px #32325d40, 0px 8px 16px -8px #0000004d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 30px 60px -12px #32325d40, 0px 18px 36px -18px #0000004d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "inset 0px 30px 60px -12px #32325d40, inset 0px 18px 36px -18px #0000004d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 50px 100px -20px #32325d40, 0px 30px 60px -30px #0000004d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 3px #0000001f, 0px 1px 2px #0000003d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 3px 6px #00000029, 0px 3px 6px #0000003b", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 10px 20px #00000030, 0px 6px 6px #0000003b", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 14px 28px #00000040, 0px 10px 10px #00000038", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 19px 38px #0000004d, 0px 15px 12px #00000038", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 2px 0px #3c40434d, 0px 2px 6px 2px #3c404326", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 2px 0px #3c40434d, 0px 1px 3px 1px #3c404326", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 0px 0px 1px #0000000d", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 1px 2px 0px #0000000d", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 1px 3px 0px #0000001a, 0px 1px 2px 0px #0000000f", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 4px 6px -1px #0000001a, 0px 2px 4px -1px #0000000f", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 10px 15px -3px #0000001a, 0px 4px 6px -2px #0000000d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 20px 25px -5px #0000001a, 0px 10px 10px -5px #0000000a", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 25px 50px -12px #00000040", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "inset 0px 2px 4px 0px #0000000f", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 0px 5px 0px #0000001a, 0px 0px 1px 0px #0000001a", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 2px #00000012, 0px 2px 4px #00000012,0px 4px 8px #00000012, 0px 8px 16px #00000012, 0px 16px 32px #00000012, 0px 32px 64px #00000012", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 2px 1px #00000017, 0px 4px 2px #00000017, 0px 8px 4px #00000017, 0px 16px 8px #00000017, 0px 32px 16px #00000017", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 18px 50px -10px #00000033", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 10px 50px #0000001a", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 3px 5px #0000000a", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "-5px 5px #f02eaa66, -10px 10px #f02eaa4d, -15px 15px #f02eaa33, -20px 20px #f02eaa1a, -25px 25px #f02eaa0d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 5px #f02eaa66, 0px 10px #f02eaa4d, 0px 15px #f02eaa33, 0px 20px #f02eaa1a, 0px 25px #f02eaa0d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "5px 5px #f02eaa66, 10px 10px #f02eaa4d, 15px 15px #f02eaa33, 20px 20px #f02eaa1a, 25px 25px #f02eaa0d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 1px #00000012, 0px 2px 2px #00000012, 0px 4px 4px #00000012, 0px 8px 8px #00000012, 0px 16px 16px #00000012", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 0px 0.25em #43475545, 0px 0.25em 1em #5a7dbc0d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 2px 0px #0000001a", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 1px 0px #1b1f230a, inset 0px 1px 0px  #ffffff40", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 0px 0px 3px #0366d64d", hasMultipleShadows: false, colorName: "Celtic Blue" },
{ box_shadow: "0px 2px 4px 0px #0e1e251f, 0px 2px 16px 0px #0e1e2552", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 12px 28px 0px #00000033, 0px 2px 4px 0px #0000001a, inset 0px 0px 0px 1px #ffffff0d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 5px 15px 0px #00000026", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 10px 10px -10px #2123261a", hasMultipleShadows: false, colorName: "Eerie Black" },
{ box_shadow: "inset 3px 3px 6px 0px #ccdbe8ff, inset -3px -3px 6px 1px #ffffff80", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "6px 2px 16px 0px #88a5bf7a, -6px -2px 16px 0px #ffffffcc", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 0px #11111a1a", hasMultipleShadows: false, colorName: "Rich Black" },
{ box_shadow: "0px 1px 0px #11111a0d, 0px 0px 8px #11111a1a", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 0px 16px #11111a1a", hasMultipleShadows: false, colorName: "Rich Black" },
{ box_shadow: "0px 4px 16px #11111a0d, 0px 8px 32px #11111a0d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 4px 16px #11111a1a, 0px 8px 32px #11111a0d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 0px #11111a1a, 0px 8px 24px #11111a1a, 0px 16px 48px #11111a1a", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 4px 16px #11111a1a, 0px 8px 24px #11111a1a, 0px 16px 56px #11111a1a", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 8px 24px #11111a1a, 0px 16px 56px #11111a1a, 0px 24px 80px #11111a1a", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 2px 5px 0px #32326926, 0px 1px 1px 0px #0000000d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 15px 25px #00000026, 0px 5px 10px #0000000d", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "2.4px 2.4px 3.2px #00000026", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 3px 3px 0px #00000026", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 4px 12px #00000014", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 2px 8px #00000026", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 2px 4px #0000002e", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "-4px 9px 25px -6px #0000001a", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 60px 40px -7px #00000033", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 30px 90px #00000066", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 22px 70px 4px #0000008f", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 20px 30px #00000033", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "inset 0px 0px 0px 1px #ffffff33, 0px 0px 0px 1px #000000e6", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 1px 1px #00000040, 0px 2px 8px #00000040, inset 0px 0px 0px 1px #ffffff1a", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 3px 12px #00000017", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "inset 0px -23px 25px 0px #0000002b, inset 0px -36px 30px 0px #00000026, inset 0px -79px 40px 0px #0000001a, 0px 2px 1px #0000000f, 0px 4px 2px #00000017, 0px 8px 4px #00000017, 0px 16px 8px #00000017, 0px 32px 16px #00000017", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 25px 20px -20px #00000073", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 2px 4px #00000066, 0px 7px 13px -3px #0000004d, inset 0px -3px 0px #00000033", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 0px 0px 1px #0000000d, inset 0px 0px 0px 1px #d1d5dbff", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "inset 0px -50px 36px -28px #00000059", hasMultipleShadows: false, colorName: "Black" },
{ box_shadow: "0px 1px 1px #091e4240, 0px 0px 1px 1px #091e4221", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 4px 8px -2px #091e4240, 0px 0px 0px 1px #091e4214", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 0px 0px 1px #0e3f7e0a, 0px 1px 1px -0.5px #2a33450a, 0px 3px 3px -1.5px #2a33460a, 0px 6px 6px -3px #2a33460a, 0px 12px 12px -6px #0e3f7e0a, 0px 24px 24px -12px #0e3f7e0a", hasMultipleShadows: true, colorName: "Multi" },
{ box_shadow: "0px 0px 0px 1px #0e3f7e0f, 0px 1px 1px -0.5px #2a334608, 0px 2px 2px -1px #2a33460a, 0px 3px 3px -1.5px #2a33460a, 0px 5px 5px -2.5px #2a334608, 0px 10px 10px -5px #2a334608, 0px 24px 24px -8px #2a334608", hasMultipleShadows: true, colorName: "Multi" }
]

const shadow_area_test = document.getElementsByClassName("shadow_area_test")[0]
let shadowCard
const shadowCards = [];

shadowList.forEach(shadow => {
    shadowCard = new ShadowCard({ shadowCode: shadow.box_shadow, hasMultipleShadows: shadow.hasMultipleShadows, colorName: shadow.colorName });
    shadowCard.createCard();
    shadowCard.extractHex()
    shadowCard.mount(shadow_area_test);
    shadowCards.push(shadowCard);
});
print(shadowCards)
