import { readdirSync, statSync } from 'fs';

export async function load({ params }) {
	let toSend = [];
	const files = readdirSync(process.cwd());
	files.forEach((file) => {
		toSend.push({
			name: file,
			size: statSync(file).size,
			isDirectory: statSync(file).isDirectory(),
			modified: statSync(file).mtime,
			created: statSync(file).birthtime
		});
	});
	toSend.sort((a, b) => {
		if (a.isDirectory && !b.isDirectory) return -1;
		if (!a.isDirectory && b.isDirectory) return 1;
		return 0;
	});
	return { files: toSend };
}
