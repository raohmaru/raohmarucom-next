export default function pixelateText(canvas, text, maxSize, style) {
	canvas.resize(text.length * maxSize, maxSize+1);

	return function(size) {
		canvas.clear();
		canvas.text(text, 0, size, {
			...style,
			font: size + style.font
		});
		let h = Math.ceil(size);
		const tm = canvas.getContext().measureText(text);
		if (tm.width) {
			// Find height of text
			const pixels = canvas.getContext().getImageData(0, h, tm.width, 1).data;
			for (let i = 0; i < pixels.length; i += 4) {
				if(pixels[i] + pixels[i+1] + pixels[i+2] + pixels[i+3] > 0) {
					h += 1;
					break;
				}
			}
		}
		return [canvas.getCanvas(), 0, 0, tm.width, h];
	}
}
