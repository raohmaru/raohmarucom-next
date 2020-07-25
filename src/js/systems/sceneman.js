export default function SceneMan(scenes) {
	let idx = -1;
	let scene;

	return {
		update: (delta) => {
			scene.update(delta);
		},

		next: () => {
			if (++idx < scenes.length) {
				if (scene) {
					scene.end();
				}
				scene = new scenes[idx]();
			}
		}
	};
}
