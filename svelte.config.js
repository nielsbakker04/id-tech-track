import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Gebruik de Vercel-adapter
		adapter: vercel({
			runtime: 'node20' // Gebruik Node.js 20
		})
	}
};

export default config;
