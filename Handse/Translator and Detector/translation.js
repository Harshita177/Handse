// ======================
// DOM Elements
// ======================
const modeSelect = document.getElementById("mode");
const languageSelect = document.getElementById("language");
const outputBox = document.querySelector(".output-box");
const outputImage = document.querySelector(".output-image");
const inputText = document.getElementById("input-text");
const inputAudio = document.getElementById("input-audio");
const inputImage = document.getElementById("input-image");
const inputVideo = document.getElementById("input-video");
const inputWebcam = document.getElementById("input-webcam");
const imageUpload = document.getElementById("image-upload");
const videoUpload = document.getElementById("video-upload");

// ======================
// Event Listeners
// ======================

// Update output when mode or language changes
modeSelect.addEventListener("change", updateOutput);
languageSelect.addEventListener("change", updateOutput);

// Handle input method selection
inputAudio.addEventListener("click", () => handleInputMethod("audio"));
inputImage.addEventListener("click", () => imageUpload.click());
inputVideo.addEventListener("click", () => videoUpload.click());
inputWebcam.addEventListener("click", () => handleInputMethod("webcam"));

// Handle file uploads
imageUpload.addEventListener("change", (e) => handleFileUpload(e, "image"));
videoUpload.addEventListener("change", (e) => handleFileUpload(e, "video"));

// ======================
// Functions
// ======================

// Update output based on mode and language selection
function updateOutput() {
    const mode = modeSelect.value;
    const language = languageSelect.value;

    let outputText = "";
    let outputImageSrc = "";

    if (mode === "sign-to-text") {
        outputText = `Translating ${language === "asl-english" ? "ASL to English" : "ISL to Hindi"}`;
        outputImageSrc = "assets/sign-to-text.png"; // Replace with actual image
    } else if (mode === "text-to-sign") {
        outputText = `Translating ${language === "asl-english" ? "English to ASL" : "Hindi to ISL"}`;
        outputImageSrc = "assets/text-to-sign.png"; // Replace with actual image
    }

    outputBox.innerHTML = `<p>${outputText}</p>`;
    outputImage.src = outputImageSrc;
}

// Handle input method selection
function handleInputMethod(method) {
    let inputMessage = "";

    switch (method) {
        case "audio":
            inputMessage = "Click the microphone to record audio.";
            break;
        case "webcam":
            inputMessage = "Allow access to your webcam for real-time translation.";
            break;
        default:
            inputMessage = "Please select an input method.";
    }

    outputBox.innerHTML = `<p>${inputMessage}</p>`;
}

// Handle file uploads
function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (type === "image") {
                outputImage.src = e.target.result;
            } else if (type === "video") {
                outputBox.innerHTML = `<p>Video uploaded: ${file.name}</p>`;
            }
        };
        reader.readAsDataURL(file);
    }
}

// Initialize output on page load
updateOutput();