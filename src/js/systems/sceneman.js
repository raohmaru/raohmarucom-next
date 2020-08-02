export function SceneMan(scenes) {
	let idx = 1;
	let scene;

	return {
		update: (delta, currentTime) => {
			scene.update(delta, currentTime);
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
