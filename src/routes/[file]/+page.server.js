import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function load({ params }) {
	if (!existsSync(params.file)) {
		return { error: 'File not found' };
	}
	if (statSync(params.file).isDirectory()) {
		let toSend = [];
		const files = readdirSync(join(process.cwd(), params.file));
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
	} else {
		return { download: true, file: params.file };
	}
}
