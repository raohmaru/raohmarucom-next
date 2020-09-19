export class Background {
	constructor(module) {
		this._module = module;
	}

	render(delta, currentTime) {
		this._module.render(delta, currentTime);
	}
};
