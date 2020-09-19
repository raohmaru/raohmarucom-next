import cfg from './cfg.js';
import ecs from './libs/ecs/ecs.js';
import Beat from './util/beat.js';
import state from './util/state.js';
import scenes from './scenes/index.js';
import * as comps from './comps/index.js';
import { SceneMan, Motion, Input, BackgroundMan } from './systems/index.js';
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

	if ((currentTime | 0) % cfg.fps === 0) {
		$stats.textContent = (1000 / delta).toFixed(2);
	}
}

function start() {
	beat = new Beat(cfg.fps, frame);
	beat.start();
	window.Game = {
		cfg,
		stage,
		beat,
		ecs,
		scene: new SceneMan(scenes),
		motion: new Motion(),
		input: Input(stage.getCanvas()),
		state: state(cfg.state)
	};
	ecs.registerComponents(...Object.values(comps));
	ecs.addSystems(
		Game.scene,
		Game.motion,
		new BackgroundMan()
	);
	resizeCanvas();
	window.addEventListener('resize', throttle(resizeCanvas, 50), false);
	Game.scene.next();
}

function init() {
	stage = new r2d($('.maincanvas'), {
		scale: cfg.scale,
		antialias: cfg.antialias
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
