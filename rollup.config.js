import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

import Fs from 'fs';
import Path from 'path';

function getAllFilePath(path, extname, fullname) {
	let fileInfoArray = [];
	Fs.readdirSync(path).map((filename) => {
		if (Fs.statSync(path + '/' + filename).isDirectory()) {
			fileInfoArray.push(...getAllFilePath(path + '/' + filename, extname));
		} else if (
			extname.indexOf(Path.extname(filename)) != -1 &&
			(!fullname || filename == fullname)
		) {
			fileInfoArray.push({
				path: path,
				filename: filename
			});
		}
	});
	return fileInfoArray;
}

const bundleIndex = getAllFilePath('./src/lib', ['.js'], 'index.js').map((fileInfo) => {
	let floder = fileInfo.path.replace('./src/lib', '');

	return {
		input: './src/lib' + `${floder}/${fileInfo.filename}`,
		output: [{ file: 'dist' + `${floder}/index.js`, format: 'es' }],
		plugins: [
			svelte({
				customElement: true,
				compilerOptions: {
					accessors: true
				},
				preprocess: sveltePreprocess({
					typescript: {
						tsconfigFile: 'tsconfig.json'
					}
				})
			}),
			resolve({
				browser: true,
				extensions: ['.svelte', '.js'],
				dedupe: ['svelte']
			}),
			typescript(),
			scss({
				fileName: 'index.css'
			})
		]
	};
});

// const bundleJS = getAllFilePath('./src/lib', ['.js', '.ts']).map((fileInfo) => {
// 	let floder = fileInfo.path.replace('./src/lib', '');
// 	let extension = Path.extname(fileInfo.filename);
// 	let name = Path.basename(fileInfo.filename, extension);

// 	return {
// 		input: './src/lib' + `${floder}/${fileInfo.filename}`,
// 		output: [{ dir: 'dist/' + `${floder}`, format: 'es' }],
// 		plugins: [
// 			resolve(),
// 			typescript({
// 				declarationDir: 'dist/' + `${floder}`
// 			})
// 		]
// 	};
// });

export default [
	...bundleIndex
	// ...bundleJS
];
