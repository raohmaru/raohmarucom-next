let nextID = 0;

export default function Recipe(onComplete) {
	this._spices = [];
	this._onComplete = onComplete;
	this.id = nextID++;
}

Recipe.prototype = Object.assign(Object.create(Object.prototype), {
	add: function(spice) {
		this._spices.push(spice);
	},

	start: function() {
		this._spices[0].start();
	},

	update: function(time) {
		if (!this._spices.length) {
			return false;
		}
		time = time || window.performance.now();
		const spice = this._spices[0];
		if (!spice.update(time)) {
			this._spices.shift();
			if (this._spices.length) {
				this._spices[0].start(spice.startTime + spice.duration);
			} else {
				this._onComplete && this._onComplete()
			}
			spice.dispose();
		}
		return true;
	},

	dispose: function() {
		for (let i = 0, len = this._spices.length; i < len; i++) {
			this._spices[i].dispose();
		}
		this._spices = null;
		this._onComplete = null;
	}
});
