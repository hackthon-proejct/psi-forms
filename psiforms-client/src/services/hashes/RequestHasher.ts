import BN from 'bn.js';

import { SHA256 } from '../../core/SHA256';
import { FieldData } from '../../storage/Model';

export class RequestHasher {

	public static async hash(email: string, fields: FieldData[]): Promise<BN> {
		const data = email + ';' + JSON.stringify(fields, null, 0);
		return SHA256(data);
	}
}
