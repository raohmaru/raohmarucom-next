import cfg from '../cfg.js';
import Scene from './scene.js';
import pixelateText from '../render/effects/pixelate.js';
import { create, drop } from '../render/index.js';

const texts = [
	['Hello.',                 500, 1500],
	['If you want to',           0, 1300],
	['know who I am,',           0, 1300],
	['you need to',              0, 1200],
	['play a game.',             0, 2000],
	['Ready?',                1000, 0],
	['press [space] to play', 2000, 0, 1, 40],
	[],
	['3', 0, 500, 6],
	['2', 0, 500, 6],
	['1', 0, 500, 6]
];
const txtStyle = {
	font: 'px press_start_kregular, sans-serif',
	fillStyle: cfg.bgcolor
};
const bgcolor = {
	fillStyle: '#ffffff'
};

export default class extends Scene {
	constructor() {
		super();
		this.init();
	}

	init() {
		this._txtIdx = -1;
		this.canvas = create();
		this.nextText();
		Game.input.keys.on('Space', this.keyPress.bind(this));
	}

	nextText() {
		if (++this._txtIdx >= texts.length) {
			Game.scene.next();
			return;
		}
		const item = texts[this._txtIdx];
		if (!item.length) {
			return;
		}
		const [text, delay, dur, scale, offsetY] = item;
		this.prepareText(text, scale, offsetY);
		const tl = Game.motion.timeline(this.nextText.bind(this));
		tl.add( this.createMotion(0, 8, delay) );
		if (dur) {
			tl.add( this.createMotion(8, 0, dur) );
		}
		Game.motion.add(tl);
	}

	prepareText(text, scale = 3, offsetY = 0) {
		this.pixelText = pixelateText(this.canvas, text, 8, txtStyle);
		const w = this.canvas.width * scale;
		const h = w * (this.canvas.height / this.canvas.width);
		this._destRect = [
			Game.stage.width / 2 - w / 2,
			Game.stage.height / 2 - h / 2 + offsetY,
			w,
			h
		];
	}

	createMotion(startSize, endSize, delay) {
		return Game.motion.create({
			from: { size: startSize },
			to: { size: endSize },
			duration: 500,
			delay,
			skip: 3,
			onUpdate: this.onUpdateSpice.bind(this)
		});
	}

	onUpdateSpice(p, model) {
		Game.stage.rect(...this._destRect, bgcolor);
		Game.stage.drawImage(
			...this.pixelText(model.size),
			...this._destRect
		);
	}

	keyPress() {
		Game.input.keys.off('Space');
		Game.stage.clear(bgcolor);
		this._txtIdx = 7;
		Game.motion.stop();
		this.nextText();
	}

	end() {
		drop(this.canvas);
		this.canvas = null;
		this.pixelText = null;
	}
}
