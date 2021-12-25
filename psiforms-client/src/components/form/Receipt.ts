import { FilesContainer } from '../../storage/FilesContainer';

export interface PreReceipt {
	message: string;
}

export interface PostReceipt {
	message: string;
	files: FilesContainer;
}
