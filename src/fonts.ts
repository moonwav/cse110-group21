import Konva from 'konva';

const loadedFonts = {};

function measureFont(fontName: string, fallbackFont, fontStyle = 'normal', fontWeight = '400') {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
  	const sampleText = 'The quick brown fox 0123456789';
  	ctx.font = `${fontStyle} ${fontWeight} 16px '${fontName}', ${fallbackFont}`;
  	return ctx.measureText(sampleText).width;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadFont(fontName: string, fontStyle = 'normal', fontWeight = '400') {
  	if (loadedFonts[fontName]) return;

  	const hasFontsLoadSupport = !!(document.fonts && document.fonts.load);
  	const arialWidth = measureFont('Arial', 'Arial', fontStyle, fontWeight);

  	if (hasFontsLoadSupport) {
    	try {
      	await document.fonts.load(`${fontStyle} ${fontWeight} 16px '${fontName}'`);
      	const newWidth = measureFont(fontName, 'Arial', fontStyle, fontWeight);
      	const shouldTrustChanges = arialWidth !== newWidth;
      	if (shouldTrustChanges) {
     		await delay(60);
        	loadedFonts[fontName] = true;
        	return;
      	}
    	} 	catch (e) {}
  	}

  	const timesWidth = measureFont('Times', 'Times', fontStyle, fontWeight);
  	const lastWidth = measureFont(fontName, 'Arial', fontStyle, fontWeight);
  	const waitTime = 60;
  	const timeout = 6000;
  	const attemptsNumber = Math.ceil(timeout / waitTime);
  	for (let i = 0; i < attemptsNumber; i++) {
		const newWidthArial = measureFont(fontName, 'Arial', fontStyle, fontWeight);
    	const newWidthTimes = measureFont(fontName, 'Times', fontStyle, fontWeight);
    	const somethingChanged =
      	newWidthArial !== lastWidth ||
      	newWidthArial !== arialWidth ||
      	newWidthTimes !== timesWidth;
    	if (somethingChanged) {
      		await delay(60);
      		loadedFonts[fontName] = true;
      		return;
    	}
    	await delay(waitTime);
  	}
  	console.warn(`Timeout for loading font "${fontName}".`);
}

// Load the font using a stylesheet link
const fontLink = document.createElement('link');
fontLink.href = "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Silkscreen:wght@400;700&display=swap";
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export{loadFont};