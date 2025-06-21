const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const CanvasXOffset = canvas.getBoundingClientRect().x;
const CanvasYOffset = canvas.getBoundingClientRect().y;
const CellSize_Slider = document.getElementById("Cell_Size");
const Grid_Visibility = document.getElementById("Grid");
let cellSize = CellSize_Slider.value;
let cols = Math.floor(canvas.width / cellSize);
let rows = Math.floor(canvas.height / cellSize);

function DrawGrid() {
    ctx.clearRect(0, 0, width, height);
    // ctx.strokeStyle = '#ccc';
    if(Grid_Visibility.checked){
        ctx.lineWidth = 1;
        for (let x = 0; x <= width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }
}

DrawGrid()

CellSize_Slider.addEventListener("input", (e) => {
    cellSize = e.target.value;
    cols = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);
    DrawGrid()
    DrawPixels()
})

Grid_Visibility.addEventListener("input", (e) => {
    DrawGrid()
    DrawPixels()
})

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

function DrawPixels() {
    ctx.clearRect(0, 0, width, height);
    drawPoint(GradientStartHandle);
    drawPoint(GradientEndHandle);
    const gradient = interpolate2DGrid(rows, cols, [Math.floor(GradientStartHandle.x / cellSize), Math.floor(GradientStartHandle.y / cellSize)], [Math.floor(GradientEndHandle.x / cellSize), Math.floor(GradientEndHandle.y / cellSize)]);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if(gradient[y][x] > 0){
                ctx.beginPath();
                ctx.arc(x * cellSize + 25, y * cellSize + 25, gradient[y][x] * (cellSize / 2), 0, 2 * Math.PI, true);
                ctx.fill();
            }
        }
    }
    test()
}

DrawPixels();