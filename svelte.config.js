import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// aktiviert den neuen Runes Mode (Svelte 5)
	compilerOptions: {
		runes: true
	},

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},

	// erlaubt Preprocessing für z. B. TypeScript, SCSS, PostCSS etc.
	preprocess: preprocess()
};

export default config;
