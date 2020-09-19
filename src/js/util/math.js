const PI = Math.PI;
const rnd = Math.random;
const round = Math.round;
const atan = Math.atan;

export function sqr(num) {
	return num * num;
}

export function dte(x1, y1, x2, y2) {
	return (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
};

export function angle(x1, y1, x2, y2) {
	let angle = atan((y2 - y1) / (x2 - x1));
	if(x1 > x2) {
		angle += PI;
	}
	return angle;
}

export function toRad(degree) {
	return degree * PI / 180;
}

export function random(min, max) {
	if(!max) {
		if(!min) {
			return rnd();
		}
		max = min;
		min = 0;
	}
	return rnd()*(max-min) + min;
}

export function randomInt(min, max) {
	return round( random(min, max) );
}

export function randomBool(perc) {
	if(perc !== undefined) {
		return rnd() <= perc;
	}
	return !!round(rnd());
}

export function clamp(num, min, max) {
	return Math.max(Math.min(num, max), min);
}
