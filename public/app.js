const { createFFmpeg, fetchFile } = FFmpeg;
const file = document.getElementById("fileUpload");
const preview = document.getElementById("preview");
const trimProgress = document.getElementById("trimProgress");
const downloadButton = document.getElementById("downloadButton");
const startPoint = document.getElementById("startPoint");
const endPoint = document.getElementById("endPoint");
const ffmpeg = createFFmpeg({ log: false });

ffmpeg.setLogger(({ type, message }) => {
	trimProgress.style.display = "block";
	trimProgress.style.color = "khaki";
	trimProgress.textContent = `OUTPUT: ${message}`;
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
	downloadButton.onclick = function() {
		let str = String(vidURL);
		str = str.slice(39); // get's the blob name
		saveAs(vidURL, `${str}.mp4`);
	};
	trimProgress.textContent = "Trim is done!";
};
file.addEventListener("change", transcode);

function ResizeListener() {
	if (window.innerWidth < 700) {
		startPoint.style.width = "80%";
		endPoint.style.width = "80%";
		preview.width = "250";
		preview.height = "250";
	} else {
		startPoint.style.width = "15%";
		endPoint.style.width = "15%";
		preview.width = "450";
		preview.height = "450";
	}
}

window.addEventListener("resize", ResizeListener);
