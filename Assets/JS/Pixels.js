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
const Gradient_Pattern_Radios = document.querySelectorAll('.Gradient_Pattern');
let Pattern_Radios_SelectedValue = "Flat";
let Gradient_Pattern_Radios_SelectedValue = "Circles";
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

Gradient_Pattern_Radios.forEach(radio => {
    radio.addEventListener('change', () => {
        Gradient_Pattern_Radios_SelectedValue = document.querySelector('.Gradient_Pattern:checked').value;
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

let gradient, radial_gradient, Final_Gradient_Start_Handle_X, Final_Gradient_Start_Handle_Y, Final_Gradient_End_Handle_X, Final_Gradient_End_Handle_Y, Gradient_Handle_Distance_X, Gradient_Handle_Distance_Y, maxDX, maxDY, Radial_Gradient_MaxRadius, Collected_Ones_SVG
let Collected_Ones = []
let Dithered_Collection = []
let Dithered_Collection_Final = []

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
        radial_gradient = generateRadialGradient(rows, cols, { x: Final_Gradient_Start_Handle_X, y: Final_Gradient_Start_Handle_Y }, { x: Final_Gradient_End_Handle_X, y: Final_Gradient_End_Handle_Y });
    }
    const isRandom = Pattern_Radios_SelectedValue === "Random";
    const isJoined = Pattern_Radios_SelectedValue === "Joined";
    if (isRandom || isJoined) {
        const matrix = Gradient_Type_State ? radial_gradient : gradient;
        for (let y = 0; y < rows; y++) {
            if (Math.random() < 0.5) {
                for (let x = 0; x < cols; x++) {
                    if (Math.floor(Math.random() * Randomness_Intensity_Value) === 1) {
                        if (isRandom) {
                            matrix[y][x] = 0;
                        } else if (isJoined && matrix[y][x] === 1) {
                            matrix[y][x] = 2;
                            if (x > 0 && x !== 2) matrix[y][x - 1] = 2;
                        }
                    }
                }
                if (isJoined && matrix[y].includes(2)) {
                    Collected_Ones.push(collectOnes(matrix[y], 2, y));
                }
            }
        }
    }
    const getGradientValue = (y, x) => Gradient_Type_State ? radial_gradient[y][x] : gradient[y][x];
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const value = getGradientValue(y, x);
            if (value > 0 && value < 2) {
                if (Gradient_Pattern_Radios_SelectedValue === "Circles") {
                    ctx.beginPath();
                    ctx.arc(x * cellSize + (cellSize / 2), y * cellSize + (cellSize / 2), value * (cellSize / 2), 0, 2 * Math.PI, true);
                    ctx.fill();
                } else if (Gradient_Pattern_Radios_SelectedValue === "Dithered") {
                    const baseX = x * cellSize;
                    const baseY = y * cellSize;
                    const q = cellSize / 4;
                    const tq = q * 3;
                    const partSize = 1 / 12;
                    const index = Math.ceil(value / partSize) - 1;
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

                }
            }
            if (Gradient_Pattern_Radios_SelectedValue === "Squares") {
                drawRoundedRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1, Math.abs(value - 1) * (cellSize / 2))
            }
        }
    }
    Collected_Ones.forEach(rowData => {
        rowData.forEach(cell => {
            const { row, indices } = cell;
            const col = indices[0];
            const value = getGradientValue(row, col);
            drawCustomRoundedRect(col * cellSize, row * cellSize, value * cellSize * 0.5 * indices.length, value * cellSize * 0.5, value * 0.5 * (cellSize / 2), ["tr", "br", "tl", "bl"]);
        });
    });
    Collected_Ones_SVG = Collected_Ones;
    Collected_Ones = [];
    Dithered_Collection_Final = Dithered_Collection
    Dithered_Collection = []
}

DrawPixels();

function downloadSVG() {
    let Circles = []
    let Rects = []
    const getGradientValue = (y, x) => Gradient_Type_State ? radial_gradient[y][x] : gradient[y][x];
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const value = getGradientValue(y, x);
            if (value > 0 && value < 2) {
                Circles.push({ cx: x * cellSize + (cellSize / 2), cy: y * cellSize + (cellSize / 2), r: value * (cellSize / 2) });
            }
        }
    }
    Collected_Ones_SVG.forEach(rowData => {
        rowData.forEach(cell => {
            const { row, indices } = cell;
            const x = indices[0] * cellSize;
            const y = row * cellSize;
            const width = getGradientValue(row, indices[0]) * cellSize * 0.5 * indices.length;
            Rects.push({
                x, y, rx: cellSize / 2, ry: cellSize / 2, width, height: cellSize
            });
        });
    });
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "800");
    svg.setAttribute("height", "800");
    svg.setAttribute("viewBox", "0 0 800 800");
    if (Gradient_Pattern_Radios_SelectedValue === "Circles") {
        Circles.forEach(attrs => {
            const circle = document.createElementNS(svgNS, "circle");
            ["cx", "cy", "r"].forEach(attr => {
                if (attrs[attr] != null) circle.setAttribute(attr, attrs[attr]);
            });
            circle.setAttribute("fill", "black");
            svg.appendChild(circle);
        });
    }
    if (Pattern_Radios_SelectedValue === "Joined") {
        Rects.forEach(attrs => {
            const rect = document.createElementNS(svgNS, "rect");
            ["x", "y", "rx", "ry", "width", "height"].forEach(attr => {
                if (attrs[attr] != null) rect.setAttribute(attr, attrs[attr]);
            });
            rect.setAttribute("fill", "black");
            svg.appendChild(rect);
        });
    }
    if (Gradient_Pattern_Radios_SelectedValue === "Dithered") {
        Dithered_Collection_Final.forEach(Dithered => {
            const rect = document.createElementNS(svgNS, "rect");
            rect.setAttribute("x", Dithered.x)
            rect.setAttribute("y", Dithered.y)
            rect.setAttribute("width", Dithered.width)
            rect.setAttribute("height", Dithered.height)
            rect.setAttribute("fill", "black");
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
            // Only return if not white and not fully transparent
            const isNotWhite = r !== 255 || g !== 255 || b !== 255;
            const isOpaque = a !== 0;
            if (isNotWhite && isOpaque) {
                results.push({ x, y, r, g, b, a });
            }
        }
    }
    console.log(results);
    return results; // You can return or use this array as needed
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
