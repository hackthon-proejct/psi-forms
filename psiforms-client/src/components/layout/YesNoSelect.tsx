
export interface YesNoSelectProps {
	value: boolean;
	isDisabled: boolean;
	onChange: (value: boolean) => void;
}

export function YesNoSelect(props: YesNoSelectProps) {
	return (
		<select value={props.value ? '1' : '0'} disabled={props.isDisabled} onChange={e => props.onChange(parseInt(e.target.value, 10) === 1)}>
			<option value="1">Yes</option>
			<option value="0">No</option>
		</select>
	);
}
