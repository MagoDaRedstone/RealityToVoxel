class ScannerMesh {
    constructor(gl) {
        this.gl = gl;
        this.program = this._shader();
        this.posBuffer = gl.createBuffer();
        this.colBuffer = gl.createBuffer();
        this.vertCount = 0;
    }

    _shader() {
        const gl = this.gl;
        const vs = `
            attribute vec3 aPos;
            attribute vec4 aCol;
            uniform mat4 uProj, uView, uModel;
            varying vec4 vCol;
            void main() {
                gl_Position = uProj * uView * uModel * vec4(aPos, 1.0);
                vCol = aCol;
            }
        `;
        const fs = `
            precision mediump float;
            varying vec4 vCol;
            void main() {
                gl_FragColor = vCol;
            }
        `;

        const sh = (t, s) => {
            let x = gl.createShader(t);
            gl.shaderSource(x, s);
            gl.compileShader(x);
            return x;
        }

        let p = gl.createProgram();
        gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
        gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(p);
        return p;
    }

    updateFromCamera(pixels, w, h) {
        const size = (CUBE_SIZE / GRID_SIZE) * CUBE_SCALE;
        const pos = [];
        const col = [];

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const px = (x / GRID_SIZE * (w - 1)) | 0;
                const py = ((1 - y / GRID_SIZE) * (h - 1)) | 0;
                const i = (py * w + px) * 4;

                const r = (pixels[i] / 255) * BRIGHTNESS;
                const g = (pixels[i + 1] / 255) * BRIGHTNESS;
                const b = (pixels[i + 2] / 255) * BRIGHTNESS;

                const z = (0.2126 * r + 0.7152 * g + 0.0722 * b) * objState.depth;

                const cx = x / GRID_SIZE * 4 - 2;
                const cy = y / GRID_SIZE * 4 - 2;

                const voxel = new VoxelCube(
                    cx,
                    cy,
                    z,
                    size,
                    [r, g, b, 1]
                );

                voxel.pushToBuffers(pos, col);
            }
        }

        this.vertCount = pos.length / 3;
        const gl = this.gl;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.DYNAMIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(col), gl.DYNAMIC_DRAW);
    }

    render(view, proj, model) {
        const gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(this.program);

        const ap = gl.getAttribLocation(this.program, "aPos");
        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.vertexAttribPointer(ap, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(ap);

        const ac = gl.getAttribLocation(this.program, "aCol");
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colBuffer);
        gl.vertexAttribPointer(ac, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(ac);

        gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "uProj"), false, proj);
        gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "uView"), false, view);
        gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "uModel"), false, model);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertCount);
    }
}
