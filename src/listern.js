toggleFullscreen.addEventListener("change", () => {
    container3d.classList.toggle("fullscreen3d", toggleFullscreen.checked);
});

document.getElementById("gridSlider").addEventListener("input", e => GRID_SIZE = parseInt(e.target.value));
document.getElementById("cubeSlider").addEventListener("input", e => CUBE_SIZE = parseInt(e.target.value));
document.getElementById("depthSlider").addEventListener("input", e => objState.depth = parseFloat(e.target.value));
document.getElementById("rotXSlider").addEventListener("input", e => objState.rotX = parseFloat(e.target.value));
document.getElementById("rotYSlider").addEventListener("input", e => objState.rotY = parseFloat(e.target.value));
document.getElementById("rotZSlider").addEventListener("input", e => objState.rotZ = parseFloat(e.target.value));
document.getElementById("brightSlider").addEventListener("input", e => BRIGHTNESS = parseFloat(e.target.value));
document.getElementById("camDistSlider").addEventListener("input", e => camState.pos[2] = parseFloat(e.target.value));

document.getElementById("saveBtn").addEventListener("click", () => {
    const config = {
        GRID_SIZE,
        CUBE_SIZE,
        objStateDepth: objState.depth,
        rotX: objState.rotX,
        rotY: objState.rotY,
        rotZ: objState.rotZ,
        BRIGHTNESS,
        camPos: camState.pos.slice(),
        camYaw: camState.yaw,
        camPitch: camState.pitch
    };
    localStorage.setItem("voxelConfig", JSON.stringify(config));
});

window.addEventListener("load", () => {
    const saved = localStorage.getItem("voxelConfig");
    if (saved) {
        const config = JSON.parse(saved);
        GRID_SIZE = config.GRID_SIZE;
        CUBE_SIZE = config.CUBE_SIZE;
        objState.depth = config.objStateDepth;
        objState.rotX = config.rotX;
        objState.rotY = config.rotY;
        objState.rotZ = config.rotZ;
        BRIGHTNESS = config.BRIGHTNESS;
        camState.pos = config.camPos.slice();
        camState.yaw = config.camYaw;
        camState.pitch = config.camPitch;

        document.getElementById("gridSlider").value = GRID_SIZE;
        document.getElementById("cubeSlider").value = CUBE_SIZE;
        document.getElementById("depthSlider").value = objState.depth;
        document.getElementById("rotXSlider").value = objState.rotX;
        document.getElementById("rotYSlider").value = objState.rotY;
        document.getElementById("rotZSlider").value = objState.rotZ;
        document.getElementById("brightSlider").value = BRIGHTNESS;
        document.getElementById("camDistSlider").value = camState.pos[2];
    }
});

window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

document.body.addEventListener("mousedown", e => {
    isMouseDown = true;
    lastX = e.clientX;
    lastY = e.clientY;
});
document.body.addEventListener("mouseup", () => isMouseDown = false);
document.body.addEventListener("mousemove", e => {
    if (!isMouseDown) return;
    let dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    camState.yaw -= dx * camState.sensitivity;
    camState.pitch -= dy * camState.sensitivity;
    camState.pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, camState.pitch));
});

toggleMode.addEventListener("change", () => {
    if (toggleMode.checked) {
        isPhotoMode = true;
        isVideoMode = false;
        currentPhotoData = null;

        photoBtn.style.display = "block";
        videoBtn.style.display = "block";
    } else {
        isPhotoMode = false;
        isVideoMode = false;
        currentPhotoData = null;

        photoBtn.style.display = "none";
        videoBtn.style.display = "none";

        if (tempCanvas) {
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        }

        video.pause();
        video.src = "";
        video.srcObject = null;
    }
});

photoBtn.addEventListener("click", () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = ev => {
            const img = new Image();
            img.onload = () => {
                currentPhotoData = { img };
                sendTo3DFromPhoto(img);
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
});

videoBtn.addEventListener("click", () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'video/*';

    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        if (videoUrl) URL.revokeObjectURL(videoUrl);
        videoUrl = URL.createObjectURL(file);
        video.srcObject = null;
        video.src = videoUrl;
        video.loop = true;
        video.play();
        isVideoMode = true;
        isPhotoMode = false;
    };
    fileInput.click();
});

function sendTo3DFromVideo(mesh) {
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
    const frame = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    mesh.updateFromCamera(frame.data, tempCanvas.width, tempCanvas.height);
}

function sendTo3DFromPhoto(img) {
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
    const frame = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    if (window.mesh) {
        window.mesh.updateFromCamera(frame.data, tempCanvas.width, tempCanvas.height);
    }
}

function sendTo3DFromCamera(mesh) {
    if (!videoStream || video.readyState !== 4) return;

    const c2 = document.getElementById("canvas2d");
    const ctx = c2.getContext("2d");
    c2.width = c2.clientWidth;
    c2.height = c2.clientHeight;
    ctx.clearRect(0, 0, c2.width, c2.height);
    ctx.drawImage(video, 0, 0, c2.width, c2.height);

    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
    const frame = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    mesh.updateFromCamera(frame.data, tempCanvas.width, tempCanvas.height);
}
