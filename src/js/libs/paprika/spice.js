import Linear from './easing/linear.js';

let nextID = 0;
const defaults = {
	duration: 0,
	delay: 0,
	skip: 0,
	yoyo: false,
	repeat: 0,
	repeatDelay: 0,
	easing: Linear.None,
	onUpdate: null,
	onComplete: null,
	to: {}
};

export default function Spice(options) {
	Object.assign(this, defaults, options);
	this._i = 0;
	this.id = nextID++;
}

Spice.prototype = Object.assign(Object.create(Object.prototype), {
	start: function(time) {
		this.startTime = time || window.performance.now();
		this.startTime += this.delay;
		this._valuesStart = Object.assign(Object.create(null), this.from);
		return this;
	},

	end: function() {
		this.update(this.startTime + this.duration);
		return this;
	},

	update: function(time) {
		time = time || window.performance.now();
		if (time < this.startTime) {
			return true;
		}
		let elapsed = (time - this.startTime) / this.duration;
		elapsed = elapsed > 1 ? 1 : elapsed;
		if (!this.skip || elapsed < 1 && this._i++ % this.skip !== 0) {
			return true;
		}
		const value = this.easing(elapsed);
		let start, end;
		for (let key in this.to) {
			start = this._valuesStart[key] || 0;
			end = this.to[key];
			this.from[key] = start + (end - start) * value;
		}
		this.onUpdate && this.onUpdate(value, this.from);
		if (elapsed === 1) {
			if (this.repeat-- > 0) {
				if (this.yoyo) {
					const tmp = this._valuesStart;
					this._valuesStart = this.to;
					this.to = tmp;
				}
				this.startTime = time + this.repeatDelay;
				return true;
			} else {
				this.onComplete && this.onComplete(this.from);
				return false;
			}
		}
		return true;
	},

	dispose: function() {
		this.from = null;
		this.to = null;
		this.onUpdate = null;
		this.onComplete = null;
	}
});
