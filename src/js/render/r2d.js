const PI = Math.PI;
const PI2 = PI * 2;
const defaults = {
	scale: 1,
	antialias: true
};

export default class r2d {
	constructor(el, options) {
		if(el.getContext) {
			this._canvas = el;
			this._opt = Object.assign({}, defaults, options);
			this._ctx = this._canvas.getContext('2d' /*, { alpha: false }*/);
		}
	}

	get width() { return this.cnvWidth; }
	get height() { return this.cnvHeight; }

	_setStyle(style) {
		style.fillStyle   && (this._ctx.fillStyle = style.fillStyle);
		style.strokeStyle && (this._ctx.strokeStyle = style.strokeStyle);
		style.lineWidth   && (this._ctx.lineWidth = style.lineWidth);
	}

	_applyStyle(style) {
		style.fillStyle   && this._ctx.fill();
		style.strokeStyle && this._ctx.stroke();
	}

	rect(x, y, width, height, style = {}) {
		this._setStyle(style);
		this._ctx.beginPath();
		this._ctx.rect(
			x | 0, y | 0,
			width, height
		);
		this._applyStyle(style);
	}

	circle(x, y, radius, style) {
		this.ellipse(
			x,      y,
			radius, radius,
			0,
			style
		);
	}

	ellipse(x, y, radiusX, radiusY, rotation = 0, style = {}) {
		this._setStyle(style);
		this._ctx.beginPath();
		this._ctx.ellipse(
			x | 0,   y | 0,
			radiusX, radiusY,
			rotation,
			0,   // startAngle
			PI2  // endAngle
		);
		this._applyStyle(style);
	}

	text(text, x, y, style = {}) {
		style.font && (this._ctx.font = style.font);
		style.fillStyle && (this._ctx.fillStyle = style.fillStyle);
		style.textAlign && (this._ctx.textAlign = style.textAlign);
		this._ctx.fillText(text, x, y);
	}

	drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
		this._ctx.drawImage(
			image,
			sx | 0,
			sy | 0,
			sWidth || image.width,
			sHeight || image.height,
			dx | 0,
			dy | 0,
			dWidth || image.width,
			dHeight || image.height
		);
	}

	clear(style) {
		if (style) {
			this.rect(0, 0, this.cnvWidth, this.cnvHeight, style);
			return;
		}
		this._ctx.clearRect(0, 0, this.cnvWidth, this.cnvHeight);
	}

	resize(w, h) {
		this._canvas.width  = this.cnvWidth  = w / this._opt.scale | 0;
		this._canvas.height = this.cnvHeight = h / this._opt.scale | 0;
		if (this._canvas.parentNode) {
			this._canvas.style.width = `${w}px`;
			this._canvas.style.height = `${h}px`;
		}
		this._ctx.imageSmoothingEnabled = this._opt.antialias;
	}

	setOptions(options) {
		Object.assign(this._opt, options);
	}

	getCanvas() {
		return this._canvas;
	}

	getContext() {
		return this._ctx;
	}

	dispose() {
		this._canvas = null;
		this._ctx = null;
	}
}
