class ShadowCard {
    constructor(options = {}) {
        this.shadowCode = options.shadowCode || '0px 0px 0px 0px';
        this.hexCode = options.hexCode || '#000000';
        this.alphaValue = options.alphaValue || 'FF';
        this.bgColor = options.bgColor || '#ffffff';
    }

    createCard() {
        this.Wrapper = createTag("div");
        this.ShadowBox = createTag("div", "shadow_box2", {}, this.Wrapper);
        this.ButtonRowTop = createTag("div", "button_row_top", {}, this.ShadowBox);
        this.ShadowBoxColorFormatBtn = createTag("button", "shadow_box_color_format_btn mac_3D_btn text-upper", {}, this.ButtonRowTop);
        this.ShadowBoxColorFormatBtn.innerHTML = "(HEX)"
        this.FormatList = createTag("div", "format_list", {}, this.ButtonRowTop);
        ["(HEX)", "(RGB)", "(HSL)", "(HSB)", "(CSS)", "(LCH)", "(LAB)", "(XYZ)", "(CMYK)"].forEach(FormatOptions => {
            let FormatOptionsDiv = document.createElement("div")
            FormatOptionsDiv.innerHTML = FormatOptions
            this.FormatList.appendChild(FormatOptionsDiv)
        });
        this.TempDiv1 = createTag("div", "width-100 pos-rel", {}, this.ButtonRowTop);
        this.ShadowBoxShadowColorBtn = createTag("button", "shadow_box_shadow_color_btn mac_3D_btn text-caps", {}, this.TempDiv1);
        this.ShadowBoxShadowColorBtn.innerHTML = "Black";
        this.ColorOptionList = createTag("div", "color_option_list width-100", {}, this.TempDiv1);
        this.ColorOptionListInput = createTag("input", "", {}, this.ColorOptionList);
        this.ColorOptionListInput.type = "text";
        this.ColorOptionListInput.placeholder = "Custom";
        this.ColorOptionListInput.maxLength = 6;
        this.ColorOptionListBox = createTag("div", "color_option_list_box", {}, this.ColorOptionList);
        this.BtnColorView = createTag("div", "btn_color_view", {}, this.ButtonRowTop);
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
        this.TempH3.innerHTML = "#000000"
        this.ColorAlpha = createTag("div", "color_alpha row row-col col-3 gap-10", {}, this.ColorFormat)
        this.ColorFormatIndexValue2 = createTag("div", "color_format_index_value row space-between align-center text-upper", {}, this.ColorAlpha);
        ["[", "alpha", "]"].forEach(text => {
            const p = document.createElement("p");
            p.textContent = text;
            this.ColorFormatIndexValue2.appendChild(p);
        });
        this.TempH3_2 = createTag("h3", "text-center text-upper", {}, this.ColorAlpha)
        this.TempH3_2.innerHTML = "40"
        this.TempDiv2 = createTag("div", "", {}, this.ColorValue);
        this.Line = createTag("hr", "", {}, this.TempDiv2);
        this.ShadowValue = createTag("div", "shadow_value row gap-5", {}, this.ColorValue)

        const shadowData = [
            { value: "0px", label: "X" },
            { value: "25px", label: "Y" },
            { value: "50px", label: "BLUR" },
            { value: "-12px", label: "SPREAD" }
        ];
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
        this.ShadowBoxCopyBtn = createTag("button","shadow_box_copy_btn mac_3D_btn white",{},this.ButtonRowBottom)
        this.ShadowBoxCopyBtn.innerHTML = "Copy"


        return this.Wrapper
    }

    mount(target) {
        document.body.appendChild(this.Wrapper)
    }
}


const shadow_test = new ShadowCard()
shadow_test.createCard()
console.log(shadow_test.shadowFormatDataList[0].ShadowFormatData)
shadow_test.mount()



{/* <div>
    <div class="shadow_box" style="--shadow_box: 0px 0px 0px 1px #0e3f7e0f, 0px 1px 1px -0.5px #2a334608, 0px 2px 2px -1px #2a33460a, 0px 3px 3px -1.5px #2a33460a, 0px 5px 5px -2.5px #2a334608, 0px 10px 10px -5px #2a334608, 0px 24px 24px -8px #2a334608; --color_view_bg:#ffffff;">
        <div class="button_row_top">
            <button class="shadow_box_color_format_btn mac_3D_btn text-upper" shadow_code="0px 25px 50px -12px"
                hex_code="#000000" alpha_value="40">(HEX)</button>
            <div class="format_list">
                <div>(HEX)</div>
                <div>(RGB)</div>
                <div>(HSL)</div>
                <div>(HSB)</div>
                <div>(CSS)</div>
                <div>(LCH)</div>
                <div>(LAB)</div>
                <div>(XYZ)</div>
                <div>(CMYK)</div>
            </div>
            <div class="width-100 pos-rel">
                <button class="shadow_box_shadow_color_btn mac_3D_btn text-caps">Black</button>
                <div class="color_option_list width-100">
                    <input type="text" placeholder="Custom" maxlength="6">
                        <div class="color_option_list_box"></div>
                </div>
            </div>
            <div class="btn_color_view" style="--color_view_bg:#000000;"></div>
        </div>
        <div class="color_value row row-col">
            <div class="color_format row width-100 gap-5">
                <div class="color_format_data row row-col width-100 gap-10">
                    <div class="color_format_index_value row space-between align-center text-upper">
                        <p>[</p>
                        <p>HEX</p>
                        <p>]</p>
                    </div>
                    <h3 class="text-center text-upper">#000000</h3>
                </div>
                <div class="color_alpha row row-col col-3 gap-10">
                    <div class="color_format_index_value row space-between align-center text-upper">
                        <p>[</p>
                        <p>alpha</p>
                        <p>]</p>
                    </div>
                    <h3 class="text-center text-upper">40</h3>
                </div>
            </div>
            <div>
                <hr>
            </div>
            <div class="shadow_value row gap-5">
                <div class="shadow_format_data row row-col col-9 gap-10">
                    <h3 class="text-center">0px</h3>
                    <div class="color_format_index_value row space-between align-center text-upper">
                        <p>[</p>
                        <p>X</p>
                        <p>]</p>
                    </div>
                </div>
                <div class="shadow_format_data row row-col col-9 gap-10">
                    <h3 class="text-center">25px</h3>
                    <div class="color_format_index_value row space-between align-center text-upper">
                        <p>[</p>
                        <p>Y</p>
                        <p>]</p>
                    </div>
                </div>
                <div class="shadow_format_data row row-col col-9 gap-10">
                    <h3 class="text-center">50px</h3>
                    <div class="color_format_index_value row space-between align-center text-upper">
                        <p>[</p>
                        <p>BLUR</p>
                        <p>]</p>
                    </div>
                </div>
                <div class="shadow_format_data row row-col col-9 gap-10">
                    <h3 class="text-center">-12px</h3>
                    <div class="color_format_index_value row space-between align-center text-upper">
                        <p>[</p>
                        <p>SPREaD</p>
                        <p>]</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div> */}



function hexToRgba(hex) {
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

function rgbaToHex(r, g, b, a = 255) {
    return '#' + [r, g, b, a].map(x => x.toString(16).padStart(2, '0')).join('');
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

function hslToRgb(h, s, l) {
    h /= 360;
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
    return [r, g, b];
}

function recolorShadow(shadowStr, newBaseHex) {
    const baseRgb = hexToRgba(newBaseHex);
    const [baseH, baseS] = rgbToHsl(...baseRgb.slice(0, 3));

    return shadowStr.replace(/#([0-9a-fA-F]{6,8})/g, (fullMatch, hex) => {
        const rgba = hexToRgba('#' + hex);
        const [r, g, b, a] = rgba;

        const isPureBlack = (r === 0 && g === 0 && b === 0);

        if (isPureBlack) {
            // Directly apply the new base RGB and preserve original alpha
            return rgbaToHex(...baseRgb.slice(0, 3), a);
        }

        // Otherwise, map tone via lightness
        const [, , lightness] = rgbToHsl(r, g, b);
        const newRgb = hslToRgb(baseH, baseS, lightness);
        return rgbaToHex(...newRgb, a);
    });
}







const inputShadow = "0px 10px 20px #00000030, 0px 6px 6px #0000003b";
const newBaseColor = "#228B22";

const newShadow = recolorShadow(inputShadow, newBaseColor);
console.log(newShadow);
