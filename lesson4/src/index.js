import "bootstrap";

function setHeaderStyle () {
	let widthHeader = getComputedStyle(document.querySelector(".header")).width;
	document.querySelector(".header__book-cab").style.marginTop = `${50+(1600-parseFloat(widthHeader))/5}px`;
	if (parseFloat(widthHeader) < 768) {
		document.querySelector(".header").style.height = `${735-(768-parseFloat(widthHeader))/2}px`;
	} else {
		document.querySelector(".header").style.height = `735px`;
	}
}

function setAboutStyle () {
	let paddingLeftAbout = getComputedStyle(document.querySelector(".about")).paddingLeft;
	document.querySelector(".about__car").style.cssText =
		`object-fit: contain;
    object-position: bottom;
    left: calc(10% + ${paddingLeftAbout});
    position: absolute;
    width: calc(80% - 2 * ${paddingLeftAbout});
    `;
		let carWidth = getComputedStyle(document.querySelector(".about__car")).width;
	document.querySelector(".about__car").style.top = `${-parseFloat(carWidth) / 1.71 * 0.75}px`;
}

function setTariffsStyle () {
	let tariffsBlock = document.querySelector(".tariffs-block");
	for (let item of tariffsBlock.childNodes) {
		if (item.nodeType === 1) {
			const childArr = [].filter.call(item.childNodes, function(child) {
				return child.nodeType === 1;
			});
			const whiteBlock = childArr[0];
			const imgBlock = childArr[1];
			const headerBlock = childArr[2];

			const imgBlockHeight = parseFloat(getComputedStyle(imgBlock).height);
			whiteBlock.style.height = `${0.6 * imgBlockHeight}px`;
			headerBlock.style.paddingTop = `${imgBlockHeight}px`
		}
	}
}

window.onload = function () {
	setHeaderStyle ();
	setAboutStyle();
	setTariffsStyle ();
};

window.onresize = function () {
	setHeaderStyle ();
	setAboutStyle();
	setTariffsStyle ();
};