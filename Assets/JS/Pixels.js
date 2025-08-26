const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
const CanvasXOffset = canvas.getBoundingClientRect().x;
const CanvasYOffset = canvas.getBoundingClientRect().y;
const CellSize_Slider = document.getElementById("Cell_Size");
const Gradient_Type = document.getElementById("Gradient_Type")
const Download_SVG = document.getElementById("Download_SVG")
//const Handle_Start = document.getElementById("Handle_Start")
//const Handle_End = document.getElementById("Handle_End")
const Ramdomness_Intensity = document.getElementById("Ramdomness_Intensity")
const Pattern_Radios = document.querySelectorAll('.Pattern_Radios');
const Gradient_Pattern_Radios = document.querySelectorAll('.Gradient_Pattern');
const Pattern_Type_Radios = document.querySelectorAll('.Pattern_Type');
const Canvas_Size_Radios = document.querySelectorAll('.Canvas_Size_Radios');
const Fill_Type_Wrapper = document.getElementById("Fill_Type_Wrapper");
const Randomness_Wrapper = document.getElementById("Randomness_Wrapper")
const Pixels_Canvas_Wrapper = document.getElementById("Pixels_Canvas_Wrapper")
const Color_Box = document.getElementById("Color_Box")
let Pattern_Radios_SelectedValue = "Flat";
let Gradient_Pattern_Radios_SelectedValue = "Circles";
let Pattern_Type_Radios_SelectedValue = "Resize";
let Canvas_Size_Radios_SelectedValue = "Minimize";
let Color_Radios_SelectedValue = "Black";
const Scale_Bar = document.getElementById("Scale_Bar");
const Scale_Bar_Markings = document.getElementById("Scale_Bar_Markings");
let Gradient_Type_State
let cellSize = CellSize_Slider.value;
let cols = Math.floor(canvas.width / cellSize);
let rows = Math.floor(canvas.height / cellSize);

CellSize_Slider.addEventListener("input", (e) => {
    cellSize = e.target.value;
    cols = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);
    DrawPixels()
})

Gradient_Type.addEventListener("input", (e) => {
    Gradient_Type_State = e.target.checked
    DrawPixels()
})

let Randomness_Intensity_Value = 5
Ramdomness_Intensity.addEventListener("input", (e) => {
    Randomness_Intensity_Value = e.target.value;
    DrawPixels()
})

Fill_Type_Wrapper.classList.add("Hide_Element")
Randomness_Wrapper.classList.add("Hide_Element")
Randomness_Wrapper.previousElementSibling.classList.add("Hide_Element")

const Fill_Type_Handler = () => {
    if (Pattern_Radios_SelectedValue === "Random") {
        Randomness_Wrapper.classList.remove("Hide_Element")
        Randomness_Wrapper.previousElementSibling.classList.remove("Hide_Element")
        if (Gradient_Pattern_Radios_SelectedValue === "Circles") {
            Fill_Type_Wrapper.classList.remove("Hide_Element")
        } else {
            Fill_Type_Wrapper.classList.add("Hide_Element")
        }
    } else {
        Fill_Type_Wrapper.classList.add("Hide_Element")
        Randomness_Wrapper.classList.add("Hide_Element")
        Randomness_Wrapper.previousElementSibling.classList.add("Hide_Element")
    }
}

Pattern_Radios.forEach(radio => {
    radio.addEventListener('change', () => {
        Pattern_Radios_SelectedValue = document.querySelector('.Pattern_Radios:checked').value;
        DrawPixels()
        Fill_Type_Handler()
    });
});

Gradient_Pattern_Radios.forEach(radio => {
    radio.addEventListener('change', () => {
        Gradient_Pattern_Radios_SelectedValue = document.querySelector('.Gradient_Pattern:checked').value;
        DrawPixels()
        Fill_Type_Handler()
    });
});

Pattern_Type_Radios.forEach(radio => {
    radio.addEventListener('change', () => {
        Pattern_Type_Radios_SelectedValue = document.querySelector('.Pattern_Type:checked').value;
        DrawPixels()
    });
});

const Color_Tool_Option_List = [{ Theme_Name: "Sunset Glow", Theme_Colors: [{ Color_Tab_Number: "9", Color_Value: "#FF6B6B" }, { Color_Tab_Number: "10", Color_Value: "#FFD93D" }, { Color_Tab_Number: "11", Color_Value: "#FF9F1C" }, { Color_Tab_Number: "12", Color_Value: "#FF8FAB" }] },
{ Theme_Name: "Forest Calm", Theme_Colors: [{ Color_Tab_Number: "13", Color_Value: "#35524A" }, { Color_Tab_Number: "14", Color_Value: "#627C68" }, { Color_Tab_Number: "15", Color_Value: "#A3B18A" }, { Color_Tab_Number: "16", Color_Value: "#E6E8E6" }] },
{ Theme_Name: "Ocean Breeze", Theme_Colors: [{ Color_Tab_Number: "17", Color_Value: "#00A8E8" }, { Color_Tab_Number: "18", Color_Value: "#007EA7" }, { Color_Tab_Number: "19", Color_Value: "#003459" }, { Color_Tab_Number: "20", Color_Value: "#003459" }] },
{ Theme_Name: "Retro Pop", Theme_Colors: [{ Color_Tab_Number: "21", Color_Value: "#F94144" }, { Color_Tab_Number: "22", Color_Value: "#F94144" }, { Color_Tab_Number: "23", Color_Value: "#F9C74F" }, { Color_Tab_Number: "24", Color_Value: "#43AA8B" }] },
{ Theme_Name: "Muted Vintage", Theme_Colors: [{ Color_Tab_Number: "25", Color_Value: "#A26769" }, { Color_Tab_Number: "26", Color_Value: "#A26769" }, { Color_Tab_Number: "27", Color_Value: "#A26769" }, { Color_Tab_Number: "28", Color_Value: "#A26769" }] },
{ Theme_Name: "Cyberpunk", Theme_Colors: [{ Color_Tab_Number: "29", Color_Value: "#0F0F0F" }, { Color_Tab_Number: "30", Color_Value: "#FF00FF" }, { Color_Tab_Number: "31", Color_Value: "#00FFFF" }, { Color_Tab_Number: "32", Color_Value: "#FFEA00" }] },
{ Theme_Name: "Dark UI", Theme_Colors: [{ Color_Tab_Number: "33", Color_Value: "#1F1F1F" }, { Color_Tab_Number: "34", Color_Value: "#3F3F3F" }, { Color_Tab_Number: "35", Color_Value: "#A6A6A6" }, { Color_Tab_Number: "36", Color_Value: "#00ADB5" }] },
{ Theme_Name: "Pastel Dreams", Theme_Colors: [{ Color_Tab_Number: "37", Color_Value: "#FFB6B9" }, { Color_Tab_Number: "38", Color_Value: "#FAE3D9" }, { Color_Tab_Number: "39", Color_Value: "#BBDED6" }, { Color_Tab_Number: "40", Color_Value: "#61C0BF" }] },
{ Theme_Name: "Beige & Sand", Theme_Colors: [{ Color_Tab_Number: "41", Color_Value: "#F5F5DC" }, { Color_Tab_Number: "42", Color_Value: "#EED6C4" }, { Color_Tab_Number: "43", Color_Value: "#C7B198" }, { Color_Tab_Number: "44", Color_Value: "#A68A64" }] },
{ Theme_Name: "Gradient Sky", Theme_Colors: [{ Color_Tab_Number: "45", Color_Value: "#3A1C71" }, { Color_Tab_Number: "46", Color_Value: "#D76D77" }, { Color_Tab_Number: "47", Color_Value: "#FFAF7B" }, { Color_Tab_Number: "48", Color_Value: "#F88F70" }] }]

Color_Tool_Option_List.forEach(theme => {
    const Color_Theme_Box = createTag("div", "row row-col gap-10", "", Color_Box)
    const Color_Theme_Name = createTag("p", "Color_Theme_Name", "", Color_Theme_Box)
    Color_Theme_Name.innerHTML = theme.Theme_Name
    const Color_Theme_Options_Wrapper = createTag("div", "row gap-6", "", Color_Theme_Box)
    theme.Theme_Colors.forEach(colors => {
        const Color_Radios_Element = createTag("input", "Color_Radios", "", Color_Theme_Options_Wrapper)
        Color_Radios_Element.setAttribute("type", "radio")
        Color_Radios_Element.setAttribute("id", `Colors_Radios_Tab_${colors.Color_Tab_Number}`)
        Color_Radios_Element.setAttribute("name", "Colors")
        Color_Radios_Element.setAttribute("value", colors.Color_Value)
        const Color_Radios_Label = createTag("label", "Color_Options", "", Color_Theme_Options_Wrapper)
        Color_Radios_Label.setAttribute("for", `Colors_Radios_Tab_${colors.Color_Tab_Number}`)
        Color_Radios_Label.setAttribute("style", `--Color_Option: ${colors.Color_Value}`)
    })
})

const Color_Radios = document.querySelectorAll('.Color_Radios');

Color_Radios.forEach(radio => {
    radio.addEventListener('change', () => {
        Color_Radios_SelectedValue = document.querySelector('.Color_Radios:checked').value;
        print(Color_Radios_SelectedValue)
        DrawPixels()
    });
});

const Scale_Bar_Creator = () => {
    Scale_Bar_Markings.innerHTML = "";
    for (let i = 0; i <= Scale_Bar.getBoundingClientRect().width / 100; i++) {
        let Scale_Bar_Measurement_Wrapper = createTag("div", "Scale_Bar_Measurement_Wrapper", {}, Scale_Bar_Markings)
        createTag("div", "Scale_Bar_Measurement", {}, Scale_Bar_Measurement_Wrapper)
        let Scale_Bar_Measurement_Value = createTag("span", "Scale_Bar_Measurement_Value", {}, Scale_Bar_Measurement_Wrapper)
        Scale_Bar_Measurement_Value.innerHTML = i * 100
        if ((Scale_Bar.getBoundingClientRect().width - (i * 100)) > 9) {
            for (let j = 0; j < 9; j++) {
                createTag("div", "Scale_Bar_Measurement_Short", {}, Scale_Bar_Markings)
            }
        }
    }
}
Scale_Bar.style.cssText = `width: ${canvas.width}px;`
Scale_Bar_Creator()

Canvas_Size_Radios.forEach(radio => {
    radio.addEventListener('change', () => {
        Canvas_Size_Radios_SelectedValue = document.querySelector('.Canvas_Size_Radios:checked').value;
        if (Canvas_Size_Radios_SelectedValue === "Maximize") {
            Pixels_Canvas_Wrapper.style.cssText = `width: 100%; height: 800px`
            canvas.width = Pixels_Canvas_Wrapper.getBoundingClientRect().width
            Scale_Bar.style.cssText = `width: ${canvas.width}px;`
        } else {
            Pixels_Canvas_Wrapper.style.cssText = `width: 800px; height: 800px`
            canvas.width = Pixels_Canvas_Wrapper.getBoundingClientRect().width
            Scale_Bar.style.cssText = `width: ${canvas.width}px;`
        }
        width = canvas.width;
        cols = Math.floor(canvas.width / cellSize);
        rows = Math.floor(canvas.height / cellSize);
        DrawPixels()
        Scale_Bar_Creator()
    });
});

let GradientStartHandle = { x: 100, y: 100 };
let GradientEndHandle = { x: 500, y: 500 };
let clickPoint;

document.body.addEventListener("mousedown", onMouseDown);
function onMouseDown(e) {
    clickPoint = getClickPoint(e.clientX - CanvasXOffset, e.clientY - CanvasYOffset);
    if (clickPoint) {
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
    }
}
function onMouseMove(e) {
    clickPoint.x = e.clientX - CanvasXOffset;
    clickPoint.y = e.clientY - CanvasYOffset;
    // Handle_Start.style.cssText = `top: ${clickPoint.y - 10}px; left: ${clickPoint.x + CanvasXOffset - 10}px;`
    DrawPixels();
}
function onMouseUp(e) {
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("mouseup", onMouseUp);
}
function getClickPoint(x, y) {
    let points = [GradientStartHandle, GradientEndHandle];
    for (let i = 0; i < points.length; i++) {
        let p = points[i],
            DistantX = p.x - x,
            DistantY = p.y - y,
            dist = Math.sqrt(DistantX * DistantX + DistantY * DistantY);
        if (dist < 10) {
            return p;
        }
    }
}

const Circles_Effect_Creator = (x, y, gradient) => {
    ctx.beginPath();
    ctx.arc(x * cellSize + (cellSize / 2), y * cellSize + (cellSize / 2), gradient[y][x] * (cellSize / 2), 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.fillStyle = Color_Radios_SelectedValue
    Circles_Collection.push({ cx: x * cellSize + (cellSize / 2), cy: y * cellSize + (cellSize / 2), r: gradient[y][x] * (cellSize / 2) })
}

const Dithered_Effect_Creator = (x, y, value) => {
    const baseX = x * cellSize;
    const baseY = y * cellSize;
    const q = cellSize / 4;
    const tq = q * 3;
    const partSize = 1 / 12;
    const index = Math.ceil(value[y][x] / partSize) - 1;
    if (index < 0 || index >= 12) return;
    switch (index) {
        case 0:
            ctx.fillRect(baseX + q, baseY + tq, q, q);
            Dithered_Collection.push({ x: baseX + q, y: baseY + tq, width: q, height: q })
            break;
        case 1:
            ctx.fillRect(baseX + q, baseY + tq, q, q);
            ctx.fillRect(baseX + tq, baseY + q, q, q);
            Dithered_Collection.push(
                { x: baseX + q, y: baseY + tq, width: q, height: q },
                { x: baseX + tq, y: baseY + q, width: q, height: q })
            break;
        case 2:
            ctx.fillRect(baseX + q, baseY + tq, q, q);
            ctx.fillRect(baseX + tq, baseY + q, q, q);
            ctx.fillRect(baseX + tq, baseY + tq, q, q);
            Dithered_Collection.push(
                { x: baseX + q, y: baseY + tq, width: q, height: q },
                { x: baseX + tq, y: baseY + q, width: q, height: q },
                { x: baseX + tq, y: baseY + tq, width: q, height: q })
            break;
        case 3:
            ctx.fillRect(baseX + q, baseY + tq, q, q);
            ctx.fillRect(baseX + tq, baseY + q, q, q);
            ctx.fillRect(baseX + tq, baseY + tq, q, q);
            ctx.fillRect(baseX + q, baseY + q, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 2 * q, q, q);
            Dithered_Collection.push(
                { x: baseX + q, y: baseY + tq, width: q, height: q },
                { x: baseX + tq, y: baseY + q, width: q, height: q },
                { x: baseX + tq, y: baseY + tq, width: q, height: q },
                { x: baseX + q, y: baseY + q, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 2 * q, width: q, height: q })
            break;
        case 4:
            ctx.fillRect(baseX + q, baseY + tq, q, q);
            ctx.fillRect(baseX + tq, baseY + q, q, q);
            ctx.fillRect(baseX + tq, baseY + tq, q, q);
            ctx.fillRect(baseX + q, baseY + q, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 2 * q, q, q);
            ctx.fillRect(baseX + 0, baseY + 0, q, q);
            Dithered_Collection.push(
                { x: baseX + q, y: baseY + tq, width: q, height: q },
                { x: baseX + tq, y: baseY + q, width: q, height: q },
                { x: baseX + tq, y: baseY + tq, width: q, height: q },
                { x: baseX + q, y: baseY + q, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 2 * q, width: q, height: q },
                { x: baseX + 0, y: baseY + 0, width: q, height: q }
            );
            break;
        case 5:
            ctx.fillRect(baseX + q, baseY + tq, q, q);
            ctx.fillRect(baseX + tq, baseY + q, q, q);
            ctx.fillRect(baseX + tq, baseY + tq, q, q);
            ctx.fillRect(baseX + q, baseY + q, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 2 * q, q, q);
            ctx.fillRect(baseX + 0, baseY + 0, q, q);
            ctx.fillRect(baseX + 0, baseY + 2 * q, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 0, q, q);
            Dithered_Collection.push(
                { x: baseX + q, y: baseY + tq, width: q, height: q },
                { x: baseX + tq, y: baseY + q, width: q, height: q },
                { x: baseX + tq, y: baseY + tq, width: q, height: q },
                { x: baseX + q, y: baseY + q, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 2 * q, width: q, height: q },
                { x: baseX + 0, y: baseY + 0, width: q, height: q },
                { x: baseX + 0, y: baseY + 2 * q, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 0, width: q, height: q }
            );
            break;
        case 6:
            ctx.fillRect(baseX + 0, baseY + 0, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 0, q, q);
            ctx.fillRect(baseX + q, baseY + q, q, q);
            ctx.fillRect(baseX + tq, baseY + q, q, q);
            ctx.fillRect(baseX + 0, baseY + 2 * q, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 2 * q, q, q);
            ctx.fillRect(baseX + q, baseY + tq, 3 * q, q);
            Dithered_Collection.push(
                { x: baseX + 0, y: baseY + 0, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 0, width: q, height: q },
                { x: baseX + q, y: baseY + q, width: q, height: q },
                { x: baseX + tq, y: baseY + q, width: q, height: q },
                { x: baseX + 0, y: baseY + 2 * q, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 2 * q, width: q, height: q },
                { x: baseX + q, y: baseY + tq, width: 3 * q, height: q }
            );
            break;
        case 7:
            ctx.fillRect(baseX + 2 * q, baseY + 0, q, q);
            ctx.fillRect(baseX + q, baseY + q, q, q);
            ctx.fillRect(baseX + tq, baseY + q, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 2 * q, q, q);
            ctx.fillRect(baseX + q, baseY + tq, 3 * q, q);
            ctx.fillRect(baseX + 0, baseY + 0, q, 3 * q);
            Dithered_Collection.push(
                { x: baseX + 2 * q, y: baseY + 0, width: q, height: q },
                { x: baseX + q, y: baseY + q, width: q, height: q },
                { x: baseX + tq, y: baseY + q, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 2 * q, width: q, height: q },
                { x: baseX + q, y: baseY + tq, width: 3 * q, height: q },
                { x: baseX + 0, y: baseY + 0, width: q, height: 3 * q }
            );
            break;
        case 8:
            ctx.fillRect(baseX + 0, baseY + 0, q, 3 * q);
            ctx.fillRect(baseX + 0, baseY + tq, cellSize, q);
            ctx.fillRect(baseX + q, baseY + q, 3 * q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 0, q, 3 * q);
            Dithered_Collection.push(
                { x: baseX + 0, y: baseY + 0, width: q, height: 3 * q },
                { x: baseX + 0, y: baseY + tq, width: cellSize, height: q },
                { x: baseX + q, y: baseY + q, width: 3 * q, height: q },
                { x: baseX + 2 * q, y: baseY + 0, width: q, height: 3 * q }
            )
            break;
        case 9:
            ctx.fillRect(baseX + 0, baseY + 0, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 0, q, q);
            ctx.fillRect(baseX + tq, baseY + q, q, q);
            ctx.fillRect(baseX + tq, baseY + tq, q, q);
            ctx.fillRect(baseX + 0, baseY + q, 3 * q, 3 * q);
            Dithered_Collection.push(
                { x: baseX + 0, y: baseY + 0, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 0, width: q, height: q },
                { x: baseX + tq, y: baseY + q, width: q, height: q },
                { x: baseX + tq, y: baseY + tq, width: q, height: q },
                { x: baseX + 0, y: baseY + q, width: 3 * q, height: 3 * q }
            )
            break;
        case 10:
            ctx.fillRect(baseX + 0, baseY + 0, q, q);
            ctx.fillRect(baseX + 2 * q, baseY + 0, 2 * q, 2 * q);
            ctx.fillRect(baseX + tq, baseY + tq, q, q);
            ctx.fillRect(baseX + 0, baseY + q, 3 * q, 3 * q);
            Dithered_Collection.push(
                { x: baseX + 0, y: baseY + 0, width: q, height: q },
                { x: baseX + 2 * q, y: baseY + 0, width: 2 * q, height: 2 * q },
                { x: baseX + tq, y: baseY + tq, width: q, height: q },
                { x: baseX + 0, y: baseY + q, width: 3 * q, height: 3 * q }
            )
            break;
        case 11:
            ctx.fillRect(baseX + 0, baseY + 0, cellSize, cellSize);
            Dithered_Collection.push({ x: baseX + 0, y: baseY + 0, width: cellSize, height: cellSize })
            break;
        default:
            break;
    }
    ctx.fillStyle = Color_Radios_SelectedValue
}

const Square_Effect_Creator = (x, y, gradient) => {
    drawRoundedRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1, Math.abs(gradient[y][x] - 1) * (cellSize / 2))
    Squared_Collection.push({ x: x * cellSize, y: y * cellSize, size: cellSize - 1, radius: Math.abs(gradient[y][x] - 1) * (cellSize / 2) })
}

const Randomizer = () => {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    const chance = 1 / Randomness_Intensity_Value;
    if (Math.random() < chance) {
        return { x, y };
    }
    return null;
}

const Reducer = (gradient, value, x, y) => {
    if (gradient[y][x] > value) {
        gradient[y][x] = Number((gradient[y][x] - value).toFixed(2));
    }
}

const Multiplier = (gradient, value, x, y) => {
    gradient[y][x] = gradient[y][x] * value;
}

let gradient, radial_gradient, Final_Gradient_Start_Handle_X, Final_Gradient_Start_Handle_Y, Final_Gradient_End_Handle_X, Final_Gradient_End_Handle_Y, Gradient_Handle_Distance_X, Gradient_Handle_Distance_Y, maxDX, maxDY, Radial_Gradient_MaxRadius, Collected_Ones_SVG
let Collected_Ones = []
let Circles_Collection = []
let Circles_Collection_Final = []
let Dithered_Collection = []
let Dithered_Collection_Final = []
let Squared_Collection = []
let Squared_Collection_Final = []
let Corners_Collection = []
let Corners_Collection_Final = []
const asciiChars = [" ", ".", "-", ":", "+", "c", "o", "e", "K", "Q", "D", "H", "B", "&", "8", "M", "W", "#", "%", "@"];

function DrawPixels() {
    ctx.clearRect(0, 0, width, height);
    drawPoint(GradientStartHandle);
    drawPoint(GradientEndHandle);

    Final_Gradient_Start_Handle_X = Math.floor(GradientStartHandle.x / cellSize);
    Final_Gradient_Start_Handle_Y = Math.floor(GradientStartHandle.y / cellSize);
    Final_Gradient_End_Handle_X = Math.floor(GradientEndHandle.x / cellSize);
    Final_Gradient_End_Handle_Y = Math.floor(GradientEndHandle.y / cellSize);
    Gradient_Handle_Distance_X = Final_Gradient_End_Handle_X - Final_Gradient_Start_Handle_X;
    Gradient_Handle_Distance_Y = Final_Gradient_End_Handle_Y - Final_Gradient_Start_Handle_Y;
    maxDX = Math.max(Final_Gradient_Start_Handle_X, cols - Final_Gradient_Start_Handle_X);
    maxDY = Math.max(Final_Gradient_Start_Handle_Y, rows - Final_Gradient_Start_Handle_Y);
    Radial_Gradient_MaxRadius = Math.sqrt(maxDX * maxDX + maxDY * maxDY);
    if (!Gradient_Type_State) {
        gradient = interpolate2DGrid(rows, cols, [Final_Gradient_Start_Handle_X, Final_Gradient_Start_Handle_Y], [Final_Gradient_End_Handle_X, Final_Gradient_End_Handle_Y]);
    } else {
        gradient = generateRadialGradient(rows, cols, { x: Final_Gradient_Start_Handle_X, y: Final_Gradient_Start_Handle_Y }, { x: Final_Gradient_End_Handle_X, y: Final_Gradient_End_Handle_Y });
    }

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (gradient[y][x] > 0 && gradient[y][x] < 2) {
                if (Gradient_Pattern_Radios_SelectedValue === "Circles" && Pattern_Radios_SelectedValue === "Random" && Pattern_Type_Radios_SelectedValue === "Joined") {
                    let random_val = Randomizer()
                    if (random_val && gradient[random_val.y][random_val.x] === 1) {
                        gradient[random_val.y][random_val.x] = 2;
                        if (random_val.x > 0 && random_val.x !== 2) gradient[random_val.y][random_val.x - 1] = 2;
                    }
                    Circles_Effect_Creator(x, y, gradient)
                } else if (Gradient_Pattern_Radios_SelectedValue === "Circles" && Pattern_Radios_SelectedValue === "Random" && Pattern_Type_Radios_SelectedValue === "Corners") {
                    gradient[y][x] = { size: gradient[y][x], corner: "CIRCLE" }
                    Corners_Collection.push({ cx: x * cellSize + (cellSize / 2), cy: y * cellSize + (cellSize / 2), r: gradient[y][x].size * (cellSize / 2), corner: "CIRCLE" })
                    let random_val = Randomizer()
                    if (random_val && gradient[random_val.y][random_val.x] === 1) {
                        const corners = ["TR", "TL", "BR", "BL"];
                        gradient[random_val.y][random_val.x] = { size: gradient[random_val.y][random_val.x], corner: corners[Math.floor(Math.random() * 4)] }
                        Corners_Collection.push({ x: random_val.x * cellSize, y: random_val.y * cellSize, size: gradient[random_val.y][random_val.x].size, corner: gradient[random_val.y][random_val.x].corner })
                        drawQuarterCircle(ctx, random_val.x * cellSize, random_val.y * cellSize, gradient[random_val.y][random_val.x].size * cellSize, gradient[random_val.y][random_val.x].corner, cellSize)
                    }
                    if (gradient[y][x].corner === "CIRCLE") {
                        ctx.beginPath();
                        ctx.arc(x * cellSize + (cellSize / 2), y * cellSize + (cellSize / 2), gradient[y][x].size * (cellSize / 2), 0, 2 * Math.PI, true);
                        ctx.fill();
                        ctx.fillStyle = Color_Radios_SelectedValue
                    }
                } else if (Gradient_Pattern_Radios_SelectedValue === "Circles" && Pattern_Radios_SelectedValue === "Random") {
                    let random_val = Randomizer()
                    if (random_val && Pattern_Type_Radios_SelectedValue === "Resize") {
                        Reducer(gradient, 1 / 2, random_val.x, random_val.y)
                    } else if (random_val && Pattern_Type_Radios_SelectedValue === "Blank") {
                        Multiplier(gradient, 0, random_val.x, random_val.y)
                    }
                    Circles_Effect_Creator(x, y, gradient)
                } else if (Gradient_Pattern_Radios_SelectedValue === "Circles") {
                    Circles_Effect_Creator(x, y, gradient)
                } else if (Gradient_Pattern_Radios_SelectedValue === "Dithered" && Pattern_Radios_SelectedValue === "Random") {
                    let random_val = Randomizer()
                    if (random_val) {
                        Reducer(gradient, 1 / 12, random_val.x, random_val.y)
                    }
                    Dithered_Effect_Creator(x, y, gradient)
                } else if (Gradient_Pattern_Radios_SelectedValue === "Dithered") {
                    Dithered_Effect_Creator(x, y, gradient)
                } else if (Gradient_Pattern_Radios_SelectedValue === "Text") {
                    //ctx.font = `${cellSize}px monospace`;
                    //ctx.fillStyle = 'black';
                    //ctx.textAlign = 'left';
                    //ctx.textBaseline = 'top';
                    //const index = Math.min(Math.floor(value * asciiChars.length), asciiChars.length - 1);
                    //ctx.fillText(asciiChars[index], x * cellSize, y * cellSize);
                }
            }
            if (Gradient_Pattern_Radios_SelectedValue === "Squares" && Pattern_Radios_SelectedValue === "Random") {
                let random_val = Randomizer()
                if (random_val) {
                    Reducer(gradient, 1 / 3, random_val.x, random_val.y)
                }
                Square_Effect_Creator(x, y, gradient)
            } else if (Gradient_Pattern_Radios_SelectedValue === "Squares") {
                Square_Effect_Creator(x, y, gradient)
            }
        }
        if (Pattern_Type_Radios_SelectedValue === "Joined" && gradient[y].includes(2)) {
            Collected_Ones.push(collectOnes(gradient[y], 2, y));
        }
    }
    Collected_Ones.forEach(rowData => {
        rowData.forEach(cell => {
            const { row, indices } = cell;
            const col = indices[0];
            const value = gradient[row][col];
            drawCustomRoundedRect(col * cellSize, row * cellSize, value * cellSize * 0.5 * indices.length, value * cellSize * 0.5, value * 0.5 * (cellSize / 2), ["tr", "br", "tl", "bl"]);
        });
    });
    Collected_Ones_SVG = Collected_Ones;
    Collected_Ones = [];
    Circles_Collection_Final = Circles_Collection
    Circles_Collection = []
    Dithered_Collection_Final = Dithered_Collection
    Dithered_Collection = []
    Squared_Collection_Final = Squared_Collection
    Squared_Collection = []
    Corners_Collection_Final = Corners_Collection
    Corners_Collection = []
}

DrawPixels();

function downloadSVG() {
    let Rects = []
    Collected_Ones_SVG.forEach(rowData => {
        rowData.forEach(cell => {
            const { row, indices } = cell;
            const x = indices[0] * cellSize;
            const y = row * cellSize;
            const width = gradient[row][indices[0]] * cellSize * 0.5 * indices.length
            Rects.push({
                x, y, rx: cellSize / 2, ry: cellSize / 2, width, height: cellSize
            });
        });
    });
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", canvas.width);
    svg.setAttribute("height", canvas.height);
    svg.setAttribute("viewBox", `0 0 ${canvas.width} ${canvas.height}`);
    if (Gradient_Pattern_Radios_SelectedValue === "Circles") {
        Circles_Collection_Final.forEach(Circles => {
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", Circles.cx);
            circle.setAttribute("cy", Circles.cy);
            circle.setAttribute("r", Circles.r);
            circle.setAttribute("fill", Color_Radios_SelectedValue);
            svg.appendChild(circle);
        });
    }
    if (Pattern_Type_Radios_SelectedValue === "Joined") {
        Rects.forEach(attrs => {
            const rect = document.createElementNS(svgNS, "rect");
            ["x", "y", "rx", "ry", "width", "height"].forEach(attr => {
                if (attrs[attr] != null) rect.setAttribute(attr, attrs[attr]);
            });
            rect.setAttribute("fill", Color_Radios_SelectedValue);
            svg.appendChild(rect);
        });
    }
    if (Pattern_Type_Radios_SelectedValue === "Corners") {
        Corners_Collection_Final.forEach(Corner => {
            if (Corner.corner === "CIRCLE") {
                const circle = document.createElementNS(svgNS, "circle");
                circle.setAttribute("cx", Corner.cx);
                circle.setAttribute("cy", Corner.cy);
                circle.setAttribute("r", Corner.r);
                circle.setAttribute("fill", Color_Radios_SelectedValue);
                svg.appendChild(circle);
            } else {
                test()
                const path = document.createElementNS(svgNS, "path");
                if (Corner.corner === "TL") {
                    path.setAttribute("d", `M ${parseInt(Corner.x)} ${parseInt(Corner.y) + parseInt(cellSize)} A ${parseInt(cellSize)} ${parseInt(cellSize)} 0 0 1 ${parseInt(Corner.x) + parseInt(cellSize)} ${parseInt(Corner.y)} L ${parseInt(Corner.x) + parseInt(cellSize)} ${parseInt(Corner.y) + parseInt(cellSize)} Z`)
                } else if (Corner.corner === "TR") {
                    path.setAttribute("d", `M ${parseInt(Corner.x)} ${parseInt(Corner.y)} A ${parseInt(cellSize)} ${parseInt(cellSize)} 0 0 1 ${parseInt(Corner.x) + parseInt(cellSize)} ${parseInt(Corner.y) + parseInt(cellSize)} L ${parseInt(Corner.x)} ${parseInt(Corner.y) + parseInt(cellSize)} Z`)
                } else if (Corner.corner === "BR") {
                    path.setAttribute("d", `M ${parseInt(Corner.x) + parseInt(cellSize)} ${parseInt(Corner.y)} A ${parseInt(cellSize)} ${parseInt(cellSize)} 0 0 1 ${parseInt(Corner.x)} ${parseInt(Corner.y) + parseInt(cellSize)} L ${parseInt(Corner.x)} ${parseInt(Corner.y)} Z`)
                } else {
                    path.setAttribute("d", `M ${parseInt(Corner.x)} ${parseInt(Corner.y)} A ${parseInt(cellSize)} ${parseInt(cellSize)} 0 0 0 ${parseInt(Corner.x) + parseInt(cellSize)} ${parseInt(Corner.y) + parseInt(cellSize)} L ${parseInt(Corner.x) + parseInt(cellSize)} ${parseInt(Corner.y)} Z`)
                }
                path.setAttribute("fill", Color_Radios_SelectedValue);
                svg.appendChild(path);
            }
        })
    }
    if (Gradient_Pattern_Radios_SelectedValue === "Dithered") {
        Dithered_Collection_Final.forEach(Dithered => {
            const rect = document.createElementNS(svgNS, "rect");
            rect.setAttribute("x", Dithered.x)
            rect.setAttribute("y", Dithered.y)
            rect.setAttribute("width", Dithered.width)
            rect.setAttribute("height", Dithered.height)
            rect.setAttribute("fill", Color_Radios_SelectedValue);
            svg.appendChild(rect);
        })
    }
    if (Gradient_Pattern_Radios_SelectedValue === "Squares") {
        Squared_Collection_Final.forEach(Squares => {
            const rect = document.createElementNS(svgNS, "rect");
            rect.setAttribute("x", Squares.x)
            rect.setAttribute("y", Squares.y)
            rect.setAttribute("rx", Squares.radius)
            rect.setAttribute("ry", Squares.radius)
            rect.setAttribute("width", Squares.size)
            rect.setAttribute("height", Squares.size)
            rect.setAttribute("fill", Color_Radios_SelectedValue);
            svg.appendChild(rect);
        })
    }
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Pixel.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

Download_SVG.addEventListener("click", () => {
    downloadSVG()
})

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');
function scanCanvas(interval = 25) {
    const width = canvas2.width;
    const height = canvas2.height;
    const imageData = ctx2.getImageData(0, 0, width, height);
    const data = imageData.data;
    const results = [];
    for (let y = 0; y < height; y += interval) {
        for (let x = 0; x < width; x += interval) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];
            const isNotWhite = r !== 255 || g !== 255 || b !== 255;
            const isOpaque = a !== 0;
            if (isNotWhite && isOpaque) {
                results.push({ x, y, r, g, b, a });
            }
        }
    }
    console.log(results);
    return results;
}

document.getElementById('uploadSVG').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith('.svg')) {
        alert('Please upload a valid .svg file');
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const svgText = e.target.result;
        const img = new Image();
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        img.onload = function () {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx2.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };
    reader.readAsText(file);
    scanCanvas(cellSize)
});
