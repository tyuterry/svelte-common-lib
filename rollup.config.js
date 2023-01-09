import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

export default [
	{
		input: 'src/lib/index.js',
		output: [
			{ file: 'dist/index.mjs', format: 'es' },
			{ file: 'dist/index.js', format: 'umd', name: 'src/index.js' }
		],
		plugins: [
			svelte({
				preprocess: sveltePreprocess({})
			}),
			resolve(),
			typescript()
		]
	}
];
