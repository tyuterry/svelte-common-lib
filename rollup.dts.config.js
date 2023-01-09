import dts from 'rollup-plugin-dts';

export default [
	{
		input: 'dist/index.js',
		output: [{ file: 'dist/index.d.ts' }],
		plugins: [dts()]
	}
];
