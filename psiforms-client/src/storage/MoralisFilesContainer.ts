import Moralis from 'moralis';

import { DeltaFile, DeltaFileStatus, FilePointer, FilesContainer } from './FilesContainer';

export class MoralisFilesContainer implements FilesContainer {

	public static createFromPointers(pointers?: FilePointer[]): MoralisFilesContainer {
		return new MoralisFilesContainer(pointers ? pointers.map((pointer, index) => {
			return {
				status: DeltaFileStatus.uploaded,
				id: index,
				name: pointer.name,
				size: pointer.size,
				url: pointer.url
			};
		}) : []);
	}

	private constructor(
		private readonly deltas: DeltaFile[]) {
	}

	public clone(): FilesContainer {
		return new MoralisFilesContainer(this.deltas.map(o => {
			return Object.assign({}, o);
		}));
	}

	public add(file: File) {
		this.deltas.push({
			status: DeltaFileStatus.toUpload,
			id: this.deltas.length,
			name: file.name,
			size: file.size,
			file
		});
	}

	public delete(id: number) {
		const index = this.deltas.findIndex(o => o.id === id);
		if (index < 0) {
			throw new Error(`Not found id ${id}`);
		}
		const delta = this.deltas[index];
		switch (delta.status) {
			case DeltaFileStatus.toUpload:
				this.deltas.splice(index, 1);
				return;
			case DeltaFileStatus.uploaded:
				delta.status = DeltaFileStatus.toDelete;
				return;
			default:
				throw new Error('Unsupported status');
		}
	}

	public getDeltas(): DeltaFile[] {
		return this.deltas
			.filter(o => o.status !== DeltaFileStatus.toDelete);
	}

	public async save(): Promise<void> {
		for (let delta of this.deltas.filter(o => o.status === DeltaFileStatus.toDelete)) {
			// TODO: Moralis does not support deleting by public user, here should be a notification to backend with unused file info.
			const index = this.deltas.indexOf(delta);
			this.deltas.splice(index, 1);
		}

		for (let delta of this.deltas.filter(o => o.status === DeltaFileStatus.toUpload)) {
			const file = new Moralis.File(delta.name, delta.file as File);
			await file.save();
			delta.status = DeltaFileStatus.uploaded;
			delta.url = file.url();
		}
	}

	public toPointers(): FilePointer[] {
		if (this.deltas.some(o => o.status !== DeltaFileStatus.uploaded)) {
			throw new Error('Invalid state');
		}
		return this.deltas.map(d => {
			return {
				name: d.name,
				size: d.size,
				url: d.url as string
			};
		});
	}
}
