import Scene from './scene.js';
import pixelateText from '../render/effects/pixelate.js';
import { create, drop } from '../render/index.js';
import Spice from '../libs/paprika/spice.js';
import Recipe from '../libs/paprika/recipe.js';

const texts = [
	['Hello.',           500, 1500],
	['If you want to',   500, 1300],
	['see my profile,',    0, 1300],
	['you need to',      300, 1400],
	['beat a game.',       0, 2000],
	['Ready?',          1000, 0],
	['press [space] to play', 2000, 0, 1, 40]
];
const style = {
	font: 'px press_start_kregular, sans-serif',
	fillStyle: '#000000'
};

export default class extends Scene {
	constructor() {
		super();
		this.init();
	}

	init() {
		this.canvas = create();
		this.nextText();
		Game.input.on('Space', this.keyPress.bind(this));
	}

	nextText() {
		if (!texts.length) {
			return;
		}
		const [text, delay, dur, scale, offsetY] = texts.shift();
		this.prepareText(text, scale, offsetY);
		const recipe = new Recipe(this.nextText.bind(this));
		recipe.add( this.createSpice(0, 8, delay) );
		if (dur) {
			recipe.add( this.createSpice(8, 0, dur) );
		}
		Game.motion.add(recipe);
	}

	prepareText(text, scale = 3, offsetY = 0) {
		this.pixelText = pixelateText(this.canvas, text, 8, style);
		const w = this.canvas.width * scale;
		const h = w * (this.canvas.height / this.canvas.width);
		this.destRect = [
			Game.stage.width / 2 - w / 2,
			Game.stage.height / 2 - h / 2 + offsetY,
			w,
			h
		];
	}

	createSpice(startSize, endSize, delay) {
		return new Spice({
			from: { size: startSize },
			to: { size: endSize },
			duration: 500,
			delay,
			skip: 3,
			onUpdate: this.onUpdateSpice.bind(this)
		});
	}

	onUpdateSpice(p, model) {
		Game.stage.rect(...this.destRect, {
			fillStyle: '#ffffff'
		});
		Game.stage.drawImage(
			...this.pixelText(model.size),
			...this.destRect
		);
	}

	keyPress() {
		Game.input.off('Space');
		Game.scene.next();
	}

	end() {
		Game.motion.stop();
		drop(this.canvas);
		this.canvas = null;
		this.pixelText = null;
	}
}
