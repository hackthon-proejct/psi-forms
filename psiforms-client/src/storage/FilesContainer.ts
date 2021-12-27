import { FilePointer } from './Model';

export interface FilesContainer {
	clone(): FilesContainer;
	add(file: File): void;
	delete(id: number): void;
	getDeltas(): DeltaFile[];
	save(): Promise<void>;
	toPointers(): FilePointer[];
}

export interface DeltaFile {
	status: DeltaFileStatus;
	id: number;
	name: string;
	size: number;
	url?: string;
	hash?: string;
	file?: File;
}

export enum DeltaFileStatus {
	uploaded,
	toUpload,
	toDelete
}
