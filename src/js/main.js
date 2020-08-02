import ecs from './libs/ecs/ecs.js';
import Beat from './util/beat.js';
import scenes from './scenes/index.js';
import * as comps from './comps/index.js';
import {
	SceneMan, Motion, Input, BackgroundMan, Renderer, MoveMaster, MouseLord, Collider
} from './systems/index.js';
import { r2d } from './render/index.js';
import { throttle, once } from './util/event.js';
import { $ } from './util/dom.js';

let stage;
let beat;
let $stats = $('#stats-fps');

function resizeCanvas() {
	stage.resize(window.innerWidth, window.innerHeight);
}

function frame(delta, currentTime) {
	ecs.update(delta, currentTime);

	if ((currentTime | 0) % 60 === 0) {
		$stats.textContent = (1000 / delta).toFixed(2);
	}
}

function start() {
	beat = new Beat(60, frame);
	beat.start();
	window.Game = {
		stage,
		beat,
		ecs,
		scene: SceneMan(scenes),
		motion: Motion(),
		input: Input(stage.getCanvas())
	};
	ecs.registerComponents(...Object.values(comps));
	ecs.addSystems(
		Game.scene,
		Game.motion,
		BackgroundMan(),
		MouseLord(),
		MoveMaster(),
		Collider(),
		Renderer()
	);
	resizeCanvas();
	window.addEventListener('resize', throttle(resizeCanvas, 50), false);
	Game.scene.next();
}

function init() {
	stage = new r2d($('.maincanvas'), {
		scale: 2,
		antialias: false
	});
	if(stage.getCanvas()) {
		start();
	} else {
		$('.header__text').textContent = 'Your browser don\'t wanna play :(';
	}
}

once($('.home__option[data-option="1"]'), 'click', e => {
	$('.header__content').classList.add('disabled');
	window.setTimeout(init, /* 1000 */);
});
