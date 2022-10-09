const { createFFmpeg, fetchFile } = FFmpeg;
const file = document.getElementById("fileUpload");
const preview = document.getElementById("preview");
const conversionProgess = document.getElementById("conversionProgess");
const downloadButton = document.getElementById("downloadButton");
const ffmpeg = createFFmpeg({ log: false });