export default function pool() {
	const dict = new Set();
	const api = {
		add: (item) => {
			dict.add(item);
		},
		pop: () => {
			const item = dict.size ? Array.from(dict)[dict.size - 1] : undefined;
			item && dict.delete(item);
			return item;
		}
	}
	Object.defineProperty(api, 'length', {
		get: () => dict.size
	});
	return api;
}
