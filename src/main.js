const moveSpeed = 0.15;

async function main() {
    const c3 = document.getElementById("canvas3d");
    const c2 = document.getElementById("canvas2d");
    const gl = c3.getContext("webgl");
    const ctx = c2.getContext("2d");
    const toggleCamera = document.getElementById("toggleCamera");

    const mesh = new ScannerMesh(gl);
    window.mesh = mesh;

    async function startCamera() {
        if (!videoStream) {
            try {
                videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = videoStream;
                video.play();
            } catch (err) {
                console.error(err);
                toggleCamera.checked = false;
            }
        }
    }

    function stopCamera() {
        if (videoStream) {
            videoStream.getTracks().forEach(t => t.stop());
            video.srcObject = null;
            videoStream = null;
        }
    }

    toggleCamera.addEventListener("change", () => {
        toggleCamera.checked ? startCamera() : stopCamera();
    });

    function loop() {
        c3.width = c3.clientWidth;
        c3.height = c3.clientHeight;
        c2.width = c2.clientWidth;
        c2.height = c2.clientHeight;
        gl.viewport(0, 0, c3.width, c3.height);

        let forward = [Math.sin(camState.yaw), 0, Math.cos(camState.yaw)];
        let right = [Math.sin(camState.yaw + Math.PI/2), 0, Math.cos(camState.yaw + Math.PI/2)];

        if (keys["KeyW"]) {
            camState.pos[0] -= forward[0] * moveSpeed;
            camState.pos[2] -= forward[2] * moveSpeed;
        }
        if (keys["KeyS"]) {
            camState.pos[0] += forward[0] * moveSpeed;
            camState.pos[2] += forward[2] * moveSpeed;
        }
        if (keys["KeyA"]) {
            camState.pos[0] -= right[0] * moveSpeed;
            camState.pos[2] -= right[2] * moveSpeed;
        }
        if (keys["KeyD"]) {
            camState.pos[0] += right[0] * moveSpeed;
            camState.pos[2] += right[2] * moveSpeed;
        }
        if (keys["Space"]) camState.pos[1] += moveSpeed;
        if (keys["ShiftLeft"]) camState.pos[1] -= moveSpeed;

        if (!isPhotoMode && !isVideoMode && videoStream && video.readyState === 4) {
            sendTo3DFromCamera(mesh);
        } else if (isVideoMode && video.readyState === 4) {
            sendTo3DFromVideo(mesh);
        } else if (isPhotoMode && currentPhotoData) {
            sendTo3DFromPhoto(currentPhotoData.img);
        }

        let view = matIdent();
        view = matRot(view, camState.pitch, [1, 0, 0]);
        view = matRot(view, camState.yaw, [0, 1, 0]);
        view = matTrans(view, -camState.pos[0], -camState.pos[1], -camState.pos[2]);

        let model = matIdent();
        model = matRot(model, objState.rotY, [0, 1, 0]);
        model = matRot(model, objState.rotX, [1, 0, 0]);
        model = matRot(model, objState.rotZ, [0, 0, 1]);

        mesh.render(view, matPersp(Math.PI/4, c3.width/c3.height, 0.1, 100), model);

        fpsTick();

        console.clear();
        requestAnimationFrame(loop);
    }

    loop();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
