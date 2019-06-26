import "bootstrap";

function setMainPadding () {
	const mainWidth = parseFloat(getComputedStyle(document.querySelector(".main-container")).width);
	for(let item of document.querySelectorAll(".mpy")) {
		item.style.paddingLeft = `${0.203125 * mainWidth - 45}px`;
		item.style.paddingRight = `${0.203125 * mainWidth - 45}px`;
	}
}

function setHeaderStyle () {
	const mainWidth = parseFloat(getComputedStyle(document.querySelector(".main-container")).width);
	for (let item of document.querySelectorAll(".carousel-caption")) {
		item.style.left = `${0.015625 * mainWidth + 3}%`;
		item.style.right = `${0.015625 * mainWidth + 3}%`;
		item.style.bottom = `${0.00014 * mainWidth * mainWidth - 0.09151 * mainWidth + 19.52101}px`;
	}
}

function setVideoStyle () {
	const widthVideo = 636;
	const heightVideo = 360;
	const widthVideoBlock = parseFloat(getComputedStyle(document.querySelector(".video")).width);

	document.querySelector(".video").style.paddingTop = `${0.08125 * widthVideoBlock + 44}px`;
	document.querySelector(".video").style.paddingLeft = `${0.409375 * widthVideoBlock - 111}px`;
	document.querySelector(".video").style.paddingRight = `${0.409375 * widthVideoBlock - 111}px`;
	document.querySelector(".video").style.paddingBottom = `${0.08125 * widthVideoBlock + 44}px`;

	if (document.querySelector("#videoPresentation").getAttribute("data-visible") === "true") {
		const ratio = heightVideo / widthVideo;
		const heightVideoBlock = parseFloat(getComputedStyle(document.querySelector(".video")).height);
		let heightPlayer;
		let widthPlayer;

		if (widthVideoBlock * ratio > heightVideoBlock ) {
			heightPlayer = heightVideoBlock;
			widthPlayer = heightVideoBlock / ratio;
		} else {
			heightPlayer = widthVideoBlock * ratio;
			widthPlayer = widthVideoBlock;
		}

		document.querySelector("#videoPresentation").style.cssText = `
			display: block;
			height: ${heightPlayer}px;
			margin: 0;
			outline: none;
			position: absolute;
			top: ${(heightVideoBlock - heightPlayer) / 2}px;
			left: ${(widthVideoBlock - widthPlayer) /2}px;
			width: ${widthPlayer}px;
			z-index: 10000;
		`;

		document.querySelector(".video__close").style.display = "block";
		document.querySelector(".video__close").style.top = `${(heightVideoBlock - heightPlayer) / 2 + 20}px`;
		document.querySelector(".video__close").style.right = `${(widthVideoBlock - widthPlayer) /2 + 20}px`;
	} else {
		document.querySelector("#videoPresentation").style.cssText = `
			display: none;
		`;
	}
}

const hideBtnCloseAnimation = {
	timer: null,
	hideBtnClose () {
		document.querySelector(".video__close").style.opacity = "1";
		clearTimeout(this.timer);
		this.timer = setTimeout(function() {
			document.querySelector(".video__close").style.opacity = "0";
		}, 2500);
	}
};

function startVideo () {
	document.querySelector(".video").style.background = "none";
	document.querySelector(".video__overlay").style.opacity = "0";
	document.querySelector("#videoPresentation").setAttribute("data-visible", "true");
	setVideoStyle ();
	document.querySelector('#videoPresentation').play();
	hideBtnCloseAnimation.hideBtnClose ();
}

function closeVideo () {
	document.querySelector(".video").style.background = null;
	document.querySelector(".video__overlay").style.opacity = null;
	document.querySelector("#videoPresentation").setAttribute("data-visible", "false");
	document.querySelector(".video__close").style.display = "none";
	setVideoStyle ();
	document.querySelector('#videoPresentation').pause();
}


window.onload = function (){
	setMainPadding();
	setHeaderStyle();
	document.querySelector(".video__overlay-img-block").addEventListener("click", startVideo);
	document.querySelector(".video__close").addEventListener("click", closeVideo);
	document.querySelector("#videoPresentation").addEventListener("mousemove", hideBtnCloseAnimation.hideBtnClose);
	document.querySelector("#videoPresentation").addEventListener("touchstart", hideBtnCloseAnimation.hideBtnClose);
	setVideoStyle ()
};

window.onresize =function () {
	setMainPadding();
	setHeaderStyle();
	setVideoStyle ()
};