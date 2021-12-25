import Moralis from 'moralis';

import { FilePointer, FilesContainer } from './FilesContainer';
import { FileDto } from './StorageModel';

export class MoralisFilesContainer implements FilesContainer {

	public static createFromPointers(files?: FilePointer[]): MoralisFilesContainer {
		return new MoralisFilesContainer(files ? files.map(f => {
			return {
				status: 'uploaded',
				name: f.name,
				url: f.url
			};
		}) : []);
	}

	private constructor(
		private readonly operations: Operation[]) {
	}

	public clone(): FilesContainer {
		return new MoralisFilesContainer(this.operations.map(o => {
			return Object.assign({}, o);
		}));
	}

	public add(file: File) {
		this.operations.push({
			status: 'toUpload',
			name: file.name,
			file
		});
	}

	public delete(index: number) {
		const operation = this.operations[index];
		switch (operation.status) {
			case 'toUpload':
				this.operations.splice(index, 1);
				return;
			case 'toDelete':
				return;
			case 'uploaded':
				operation.status = 'toDelete';
				return;
			default:
				throw new Error('Unsupported status');
		}
	}

	public getFileNames(): string[] {
		return this.operations
			.filter(o => o.status !== 'toDelete')
			.map(o => o.name);
	}

	public async save(): Promise<void> {
		for (let operation of this.operations.filter(o => o.status === 'toDelete')) {
			// TODO: Moralis does not support deleting by public user, here should be a notification to backend with unused file info.
			const index = this.operations.indexOf(operation);
			this.operations.splice(index, 1);
		}

		for (let operation of this.operations.filter(o => o.status === 'toUpload')) {
			const file = new Moralis.File(operation.name, operation.file as File);
			await file.save();
			operation.status = 'uploaded';
			operation.url = file.url();
		}
	}

	public toPointers(): FileDto[] {
		if (this.operations.some(o => o.status !== 'uploaded')) {
			throw new Error('Invalid state');
		}
		return this.operations.map(o => {
			return {
				name: o.name,
				url: o.url as string
			};
		});
	}
}

interface Operation {
	status: 'uploaded' | 'toUpload' | 'toDelete';
	name: string;
	url?: string;
	file?: File;
}
