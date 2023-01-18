import dts from 'rollup-plugin-dts';

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

const bundleDTS = getAllFilePath('./src/lib', ['.js'], 'index.js').map((fileInfo) => {
	let floder = fileInfo.path.replace('./src/lib', '');
	let extension = Path.extname(fileInfo.filename);
	let name = Path.basename(fileInfo.filename, extension);
	if (extension == '.svelte') name = 'index';

	return {
		input: './dist' + `${floder}/${name}.js`,
		output: [{ dir: 'dist' + `${floder}`, format: 'es' }],
		plugins: [dts()]
	};
});

export default [...bundleDTS];
