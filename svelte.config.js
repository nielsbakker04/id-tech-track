import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Gebruik de Vercel-adapter
		adapter: vercel({
			runtime: 'nodejs18.x' // Gebruik Node.js 20
		})
	}
};

export default config;
