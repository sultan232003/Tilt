const canvas = document.getElementById("gridCanvas");
const uploadFile = document.getElementById("uploadFile")
const ctx = canvas.getContext("2d");
let img = new Image();
let data, width, height, imageData, gray, edges, bin, contour, roughCorners, FinalCorners, FinalCornersSorted










function toGray(data) {
    const gray = new Uint8ClampedArray(data.length / 4);
    for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    return gray;
}

function sobel(gray, w, h) {
    const Gx = new Int16Array(w * h);
    const Gy = new Int16Array(w * h);
    const out = new Float32Array(w * h);

    const kernelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const kernelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            let px = 0, py = 0;
            let idx = 0;

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const val = gray[(y + ky) * w + (x + kx)];
                    px += val * kernelX[idx];
                    py += val * kernelY[idx];
                    idx++;
                }
            }

            const i = y * w + x;
            Gx[i] = px;
            Gy[i] = py;
            out[i] = Math.hypot(px, py); // edge strength
        }
    }
    return out;
}

function threshold(edges, t) {
    const bin = [];
    for (let i = 0; i < edges.length; i++) {
        bin[i] = edges[i] > t ? 1 : 0;
    }
    return bin;
}

function traceContour(bin, w, h) {
    const pts = [];
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (bin[y * w + x] === 1) pts.push({ x, y });
        }
    }
    return pts;
}

function detectCorners(points, angleThreshold = 25) {
    const corners = [];

    for (let i = 1; i < points.length - 1; i++) {
        const p = points[i];
        const p0 = points[i - 1];
        const p1 = points[i + 1];

        const a = Math.atan2(p0.y - p.y, p0.x - p.x);
        const b = Math.atan2(p1.y - p.y, p1.x - p.x);

        let diff = Math.abs(a - b);
        if (diff > Math.PI) diff = 2 * Math.PI - diff;

        const deg = diff * (180 / Math.PI);

        if (deg > angleThreshold) {
            corners.push(p);
        }
    }

    return corners;
}

function clusterCorners(points, clusterDistance = 15) {
    const clusters = [];

    for (const p of points) {
        let placed = false;
        for (const c of clusters) {
            const dx = c.x - p.x;
            const dy = c.y - p.y;
            if (dx * dx + dy * dy < clusterDistance * clusterDistance) {
                c.count++;
                c.x = (c.x * (c.count - 1) + p.x) / c.count;
                c.y = (c.y * (c.count - 1) + p.y) / c.count;
                placed = true;
                break;
            }
        }
        if (!placed) clusters.push({ x: p.x, y: p.y, count: 1 });
    }

    return clusters;
}

function computeCentroid(points) {
    let cx = 0, cy = 0;
    for (const p of points) {
        cx += p.x;
        cy += p.y;
    }
    return {
        x: cx / points.length,
        y: cy / points.length
    };
}

function sortCorners(points) {
    const center = computeCentroid(points);

    return points.slice().sort((a, b) => {
        const angleA = Math.atan2(a.y - center.y, a.x - center.x);
        const angleB = Math.atan2(b.y - center.y, b.x - center.x);
        return angleA - angleB; // clockwise order
    });
}


uploadFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = imageData.data;
        width = imageData.width;
        height = imageData.height;
        gray = toGray(data);
        edges = sobel(gray, width, height);
        bin = threshold(edges, 80); // adjust threshold
        contour = traceContour(bin, width, height);
        roughCorners = detectCorners(contour);
        FinalCorners = clusterCorners(roughCorners);



        FinalCornersSorted = sortCorners(FinalCorners);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < FinalCornersSorted.length; i++) {
            const p = FinalCornersSorted[i];
            const next = FinalCornersSorted[(i + 1) % FinalCornersSorted.length];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(next.x, next.y);
            ctx.fillRect(FinalCornersSorted[i].x, FinalCornersSorted[i].y, 1, 1)
            ctx.stroke()
        }
        URL.revokeObjectURL(url);
    };
    img.src = url;
});