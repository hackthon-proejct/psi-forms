import { Fragment } from "react";
import { FormUpdatedEntity } from "../../storage/StorageEntities";

export function HomeRoute() {

	async function x() {
		const q = new FormUpdatedEntity();
		q.set('block_hash', 'aaa');

		const w = await q.save();

		console.log(w);
	}

	return (
		<Fragment>
			HOME
			<button onClick={x}>X</button>
		</Fragment>
	);
}
