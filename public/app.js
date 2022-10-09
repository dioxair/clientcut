const { createFFmpeg, fetchFile } = FFmpeg;
const file = document.getElementById("fileUpload");
const preview = document.getElementById("preview");
const conversionProgess = document.getElementById("conversionProgess");
const downloadButton = document.getElementById("downloadButton");
const startPoint = document.getElementById("startPoint");
const endPoint = document.getElementById("endPoint");
const ffmpeg = createFFmpeg({ log: false });

ffmpeg.setLogger(({ type, message }) => {
  conversionProgess.style.display = "block";
  conversionProgess.style.color = "khaki";
  conversionProgess.textContent = `OUTPUT: ${message}`;
});
