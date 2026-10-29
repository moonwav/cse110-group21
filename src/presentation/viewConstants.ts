//the games color pallete
export const PRIMARY_COLOR = '#4A5A9A';
export const SECONDARY_COLOR = '#C2CAE9';
export const BUTTON_COLOR = '#92A1DF';

export async function loadFonts() {
  		await document.fonts.ready;
  		await Promise.all([
   			document.fonts.load("700 48px Silkscreen"),
    		document.fonts.load("400 36px Silkscreen"),
    		document.fonts.load("400 40px Roboto"),
    		document.fonts.load("400 36px Roboto"),
    		document.fonts.load("400 24px Roboto"),
    		document.fonts.load("400 22px Roboto"),
  		]);
	}