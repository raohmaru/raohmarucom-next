import pool from '../util/pool.js';
import r2d from './r2d.js';

const canvases = pool();

export function create(w, h, options) {
	let cnv;
	if (canvases.length) {
		cnv = canvases.pop();
		cnv.setOptions(options);
	} else {
		const canvas = document.createElement('canvas');
		cnv = new r2d(canvas, options);
	}
	if (w) {
		cnv.resize(w, h);
	}
	return cnv;
}

export function drop(canvas) {
	canvases.add(canvas);
}
