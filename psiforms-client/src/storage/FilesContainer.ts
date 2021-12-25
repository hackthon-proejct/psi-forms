
export interface FilesContainer {
	clone(): FilesContainer;
	add(file: File): void;
	delete(index: number): void;
	getFileNames(): string[];
	save(): Promise<void>;
	toPointers(): FilePointer[];
}

export interface FilePointer {
	name: string;
	url: string;
}
