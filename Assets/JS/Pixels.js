const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const CanvasXOffset = canvas.getBoundingClientRect().x;
const CanvasYOffset = canvas.getBoundingClientRect().y;
const CellSize_Slider = document.getElementById("Cell_Size");
const Gradient_Type = document.getElementById("Gradient_Type")
const Download_SVG = document.getElementById("Download_SVG")
const Handle_Start = document.getElementById("Handle_Start")
const Handle_End = document.getElementById("Handle_End")
const Ramdomness_Intensity = document.getElementById("Ramdomness_Intensity")
const Pattern_Radios = document.querySelectorAll('.Pattern_Radios');
let Pattern_Radios_SelectedValue = "Flat";
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

Pattern_Radios.forEach(radio => {
    radio.addEventListener('change', () => {
        Pattern_Radios_SelectedValue = document.querySelector('.Pattern_Radios:checked').value;
        DrawPixels()
    });
});

let GradientStartHandle = { x: 100, y: 100 };
let GradientEndHandle = { x: 500, y: 500 };
let clickPoint;

document.body.addEventListener("mousedown", onMouseDown);
function onMouseDown(e) {
    clickPoint = getClickPoint(e.clientX - CanvasXOffset, e.clientY);
    if (clickPoint) {
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
    }
}
function onMouseMove(e) {
    clickPoint.x = e.clientX - CanvasXOffset;
    clickPoint.y = e.clientY;
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

let gradient, radial_gradient, Final_Gradient_Start_Handle_X, Final_Gradient_Start_Handle_Y, Final_Gradient_End_Handle_X, Final_Gradient_End_Handle_Y, Gradient_Handle_Distance_X, Gradient_Handle_Distance_Y, maxDX, maxDY, Radial_Gradient_MaxRadius
let Collected_Ones = []

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

        // RAMDOMIZER
        if (Pattern_Radios_SelectedValue === "Random" || Pattern_Radios_SelectedValue === "Joined") {
            const isRandom = Pattern_Radios_SelectedValue === "Random";
            const isJoined = Pattern_Radios_SelectedValue === "Joined";
            for (let y = 0; y < rows; y++) {
                if (Math.random() < 0.5) {
                    for (let x = 0; x < cols; x++) {
                        if (Math.floor(Math.random() * Randomness_Intensity_Value) === 1) {
                            if (isRandom) {
                                gradient[y][x] = 0;
                            } else if (isJoined && gradient[y][x] === 1) {
                                gradient[y][x] = 2;
                                if (x > 0 && x !== 2) gradient[y][x - 1] = 2;
                            }
                        }
                    }
                    if (isJoined && gradient[y].includes(2)) {
                        Collected_Ones.push(collectOnes(gradient[y], 2, y));
                    }
                }
            }
        }

        /////////////

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (gradient[y][x] > 0 && gradient[y][x] < 2) {
                    ctx.beginPath();
                    ctx.arc(x * cellSize + (cellSize / 2), y * cellSize + (cellSize / 2), gradient[y][x] * (cellSize / 2), 0, 2 * Math.PI, true);
                    ctx.fill();
                } else if (gradient[x][y] == 2) {
                    let i = 0
                    while (i < Collected_Ones.length) {
                        let j = 0
                        while (j < Collected_Ones[i].length) {
                            drawCustomRoundedRect(Collected_Ones[i][j].indices[0] * cellSize, Collected_Ones[i][j].row * cellSize, gradient[y][x] * (cellSize) * 0.5 * Collected_Ones[i][j].indices.length, gradient[y][x] * (cellSize) * 0.5, (gradient[y][x] * 0.5) * (cellSize / 2), ["tr", "br", "tl", "bl"]);
                            j++
                        }
                        i++
                    }
                }
            }
        }
        Collected_Ones = []
    } else {
        radial_gradient = generateRadialGradient(rows, cols, { x: Final_Gradient_Start_Handle_X, y: Final_Gradient_Start_Handle_Y }, { x: Final_Gradient_End_Handle_X, y: Final_Gradient_End_Handle_Y });

        // RAMDOMIZER
        if (Pattern_Radios_SelectedValue === "Random" || Pattern_Radios_SelectedValue === "Joined") {
            const isRandom = Pattern_Radios_SelectedValue === "Random";
            const isJoined = Pattern_Radios_SelectedValue === "Joined";
            for (let y = 0; y < rows; y++) {
                if (Math.random() < 0.5) {
                    for (let x = 0; x < cols; x++) {
                        if (Math.floor(Math.random() * Randomness_Intensity_Value) === 1) {
                            if (isRandom) {
                                radial_gradient[y][x] = 0;
                            } else if (isJoined && radial_gradient[y][x] === 1) {
                                radial_gradient[y][x] = 2;
                                if (x > 0 && x !== 2) radial_gradient[y][x - 1] = 2;
                            }
                        }
                    }
                    if (isJoined && radial_gradient[y].includes(2)) {
                        Collected_Ones.push(collectOnes(radial_gradient[y], 2, y));
                    }
                }
            }
        }

        ////////////

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (radial_gradient[y][x] > 0 && radial_gradient[y][x] < 2) {
                    ctx.beginPath();
                    ctx.arc(x * cellSize + (cellSize / 2), y * cellSize + (cellSize / 2), radial_gradient[y][x] * (cellSize / 2), 0, 2 * Math.PI, true);
                    ctx.fill();
                } else if (radial_gradient[x][y] == 2) {
                    let i = 0
                    while (i < Collected_Ones.length) {
                        let j = 0
                        while (j < Collected_Ones[i].length) {
                            drawCustomRoundedRect(Collected_Ones[i][j].indices[0] * cellSize, Collected_Ones[i][j].row * cellSize, radial_gradient[y][x] * (cellSize) * 0.5 * Collected_Ones[i][j].indices.length, radial_gradient[y][x] * (cellSize) * 0.5, (radial_gradient[y][x] * 0.5) * (cellSize / 2), ["tr", "br", "tl", "bl"]);
                            j++
                        }
                        i++
                    }
                }
            }
        }
        Collected_Ones = []
    }
}

DrawPixels();

function downloadSVG() {
    let Circles = []
    if (!Gradient_Type_State) {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (gradient[y][x] > 0) {
                    Circles.push({ cx: x * cellSize + (cellSize / 2), cy: y * cellSize + (cellSize / 2), r: gradient[y][x] * (cellSize / 2) })
                }
            }
        }
    } else {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                Circles.push({ cx: x * cellSize + (cellSize / 2), cy: y * cellSize + (cellSize / 2), r: radial_gradient[y][x] * (cellSize / 2) })
            }
        }
    }
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "800");
    svg.setAttribute("height", "800");
    svg.setAttribute("viewBox", "0 0 800 800");
    Circles.forEach(({ cx, cy, r }) => {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", r);
        circle.setAttribute("fill", "black");
        svg.appendChild(circle);
    });
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
