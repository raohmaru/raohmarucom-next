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

const getMask = (comps) => {
	return comps.reduce( (acc, id) => {
		if(components.has(id)) {
			return acc | components.get(id).mask;
		}
		return 0;
	}, 0);
};

const updateGroups = (entity, remove) => {
	for (let group of groups.values()) {
		if(remove) {
			group.remove(entity);
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
		for (let entity of entities.values()) {
			group.match(entity);
		}
		groups.set(mask, group);
		return group;
	},

	addSystems(...sys) {
		sys.forEach(system => systems.add(system));
	},

	update(delta, currentTime) {
		systems.forEach((system) => {
			system.update && system.update(delta, currentTime);
		});
	}
};
