class VoxelCube {
    constructor(x, y, z, size, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.r = color[0];
        this.g = color[1];
        this.b = color[2];
        this.a = color[3];
    }

    pushToBuffers(pos, col) {
        const x = this.x, y = this.y, z = this.z, s = this.size;
        const r = this.r, g = this.g, b = this.b, a = this.a;

        const v = [
            0,0,0, 1,0,0, 1,1,0,  0,0,0, 1,1,0, 0,1,0,
            0,0,1, 1,1,1, 1,0,1,  0,0,1, 0,1,1, 1,1,1,
            0,0,0, 1,0,1, 1,0,0,  0,0,0, 0,0,1, 1,0,1,
            0,1,0, 1,1,0, 1,1,1,  0,1,0, 1,1,1, 0,1,1,
            0,0,0, 0,1,1, 0,0,1,  0,0,0, 0,1,0, 0,1,1,
            1,0,0, 1,0,1, 1,1,1,  1,0,0, 1,1,1, 1,1,0
        ];

        for (let i = 0; i < 108; i += 3) {
            pos.push(
                x + v[i]     * s,
                y + v[i + 1] * s,
                z + v[i + 2] * s
            );

            col.push(r, g, b, a);
        }
    }
}

function matIdent() {
    return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
}

function matPersp(f, a, n, z) {
    const s = 1 / Math.tan(f / 2);
    const r = 1 / (n - z);
    return new Float32Array([
        s/a, 0, 0, 0,
        0, s, 0, 0,
        0, 0, (z+n)*r, -1,
        0, 0, 2*z*n*r, 0
    ]);
}

function matRot(m, a, [x, y, z]) {
    const s = Math.sin(a);
    const c = Math.cos(a);
    const t = 1 - c;

    const r = [
        x*x*t + c,     x*y*t - z*s, x*z*t + y*s, 0,
        y*x*t + z*s,   y*y*t + c,   y*z*t - x*s, 0,
        z*x*t - y*s,   z*y*t + x*s, z*z*t + c,   0,
        0,             0,           0,           1
    ];

    const o = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += r[i*4 + k] * m[k*4 + j];
            }
            o[i*4 + j] = sum;
        }
    }
    return o;
}

function matTrans(m, x, y, z) {
    const o = new Float32Array(m);
    o[12] += x;
    o[13] += y;
    o[14] += z;
    return o;
}

let GRID_SIZE = 54, CUBE_SIZE = 9, CUBE_SCALE = 1, BRIGHTNESS = 1;
let camState = { pos: [0, 0, 6], yaw: 0, pitch: 0, speed: 0.15, sensitivity: 0.005 };
let objState = { rotX: 0.3, rotY: 0, rotZ: 0, depth: 2 };
const keys = {};
let isMouseDown = false, lastX, lastY;
let isPhotoMode = false, isVideoMode = false, currentPhotoData = null, videoUrl = null;
let videoStream = null;

const toggleFullscreen = document.getElementById("toggleFullscreen");
const container3d = document.getElementById("container3d");
const toggleMode = document.getElementById("toggleMode");
const photoBtn = document.getElementById("photoBtn");
const videoBtn = document.getElementById("videoBtn");
const video = document.getElementById("video");
const tempCanvas = document.getElementById("temp");
const tempCtx = tempCanvas.getContext("2d");

const fpsLabel = document.getElementById("fpsCounter");
let fpsLast = performance.now();
let fpsFrames = 0;

function fpsTick() {
    fpsFrames++;
    const now = performance.now();
    if (now - fpsLast >= 500) {
        const fps = Math.round((fpsFrames * 1000) / (now - fpsLast));
        fpsLabel.textContent = "FPS: " + fps;
        fpsFrames = 0;
        fpsLast = now;
    }
}
