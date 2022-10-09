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

const transcode = async ({ target: { files } }) => {
  const { name } = files[0];
  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }
  ffmpeg.FS("writeFile", name, await fetchFile(files[0]));
  await ffmpeg.run(
    "-i",
    name,
    "-ss",
    startPoint.value,
    "-to",
    endPoint.value,
    "output.mp4"
  );
  const data = ffmpeg.FS("readFile", "output.mp4");
  const vidURL = URL.createObjectURL(
    new Blob([data.buffer], {
      type: "video/mp4",
    })
  );
  console.log(vidURL);
  preview.src = vidURL;
  downloadButton.disabled = false;
  downloadButton.onclick = function () {
    let str = String(vidURL);
    str = str.slice(42); // get's the blob name
    saveAs(vidURL, `${str}.mp4`);
  };
  conversionProgess.textContent = "Conversion is done!";
};
file.addEventListener("change", transcode);
