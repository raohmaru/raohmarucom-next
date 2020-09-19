import Entity from './entity.js';
import Group from './group.js';

const components = new Map();
const entities = new Map();
const systems = new Set();
const groups = new Map();
let bitMask = 0;

const Entity_addComponents_proxy = {
    apply: function(target, thisArg, argumentsList) {
        target.apply(thisArg, argumentsList);
		updateGroups(thisArg);
		return thisArg;
    }
};

const Entity_removeComponents_proxy = {
    apply: function(target, thisArg, argumentsList) {
		updateGroups(thisArg, argumentsList);
        target.apply(thisArg, argumentsList);
		return thisArg;
    }
};

const getMask = (comps) => {
	return comps.reduce( (acc, cmp) => {
		if(components.has(cmp.id)) {
			return acc | components.get(cmp.id).mask;
		}
		return 0;
	}, 0);
};

const updateGroups = (entity, removeFrom) => {
	for (let group of groups.values()) {
		if(removeFrom) {
			if (removeFrom === true) {
				group.remove(entity);
			} else {
				removeFrom.forEach(cmp => {
					if((group._mask & cmp.mask) === cmp.mask) {
						group.remove(entity);
					}
				});
			}
		} else {
			group.match(entity);
		}
	}
};

export default {
	registerComponents(...comps) {
		comps.forEach((ComponentClass) => {
			ComponentClass.id = ComponentClass.name;
			ComponentClass.mask = 1 << bitMask++;
			components.set(ComponentClass.id, ComponentClass);
		});
	},

	createEntity(id) {
		if (entities[id]) {
			throw new Error('The entity already exists');
		}
		const entity = new Entity(id);
		entities.set(id, entity);
		entity.addComponents = new Proxy(entity.addComponents, Entity_addComponents_proxy);
		entity.removeComponents = new Proxy(entity.removeComponents, Entity_removeComponents_proxy);
		return entity;
	},

	destroyEntity(id) {
		const entity = entities.get(id);
		if (entity) {
			updateGroups(entity, true);
			entity.dispose();
			entities.delete(id);
		}
	},

	getEntity(id) {
		return entities.get(id);
	},

	getEntitiesByComponents(...comps) {
		const mask = getMask(comps);
		if(groups.has(mask)) {
			return groups.get(mask);
		}
		const group = new Group(mask);
		group.name = comps.map(a => a.name).join(' ');
		for (let entity of entities.values()) {
			group.match(entity);
		}
		groups.set(mask, group);
		return group;
	},

	addSystems(...sys) {
		sys.forEach(system => systems.add(system));
	},

	getSystem(fun) {
		for (const sys of systems) {
			if (sys.name === fun.name) {
				return sys;
			}
		}
	},

	update(delta, currentTime) {
		systems.forEach((system) => {
			system.update && system.update(delta, currentTime);
		});
	}
};
