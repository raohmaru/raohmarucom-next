let currentId = 1;

export default class Entity {
	constructor(id) {
		this._id = id || (currentId++).toString(36);
		this._comps = new Map();
		this._mask = 0;
	}

	get mask() {
		return this._mask;
	}

	addComponents(...comps) {
		comps.forEach((cmp) => {
			this._comps.set(cmp.constructor.id, cmp);
			this._mask |= cmp.constructor.mask;
		});
	}

	removeComponents(...comps) {
		comps.forEach((CmpClass) => {
			const cmp = this._comps.get(CmpClass.id);

			if (cmp) {
				this._comps.delete(cmp.constructor.id);
				this._mask &= ~cmp.constructor.mask;
				cmp.dispose && cmp.dispose();
			}
		});
	}

	hasComponent(cmp) {
		return this._comps.has(cmp.id);
	}

	getComponent(cmp) {
		return this._comps.get(cmp.id);
	}

	getComponents() {
		return this._comps;
	}

	dispose() {
		this._comps.forEach((cmp) => {
			cmp.dispose && cmp.dispose();
		});
		this._comps = null;
	}
}
