import { Fragment, useEffect, useState } from 'react';

export interface TypewriterProps {
	texts: { a: string; aClassName: string; b: string; }[];
}

export function Typewriter(props: TypewriterProps) {

	const [a, setA] = useState(() => {
		return {
			text: props.texts[0].a,
			className: props.texts[0].aClassName
		};
	});
	const [b, setB] = useState(() => props.texts[0].b);

	useEffect(() => {
		const state = {
			aIndex: 0,
			bIndex: 0,
			mode: true,
			pos: props.texts[0].a.length,
			text: props.texts[0].a,
			step: -1,
			skipSteps: 20
		};

		const iv = setInterval(() => {
			if (state.skipSteps > 0) {
				state.skipSteps--;
				return;
			}

			state.pos += state.step;

			const newValue = state.text.substring(0, state.pos);
			if (state.mode) {
				setA({
					text: newValue,
					className: props.texts[state.aIndex].aClassName
				});
			} else {
				setB(newValue);
			}

			const isLtrEnd = (state.step === 1 && state.pos === state.text.length);
			if (isLtrEnd) {
				state.step = -1;
				state.mode = !state.mode;
				state.text = state.mode
					? props.texts[state.aIndex].a
					: props.texts[state.bIndex].b;
				state.pos = state.text.length;
				state.skipSteps = 20;
			}

			const isRtlEnd = (state.step === -1 && state.pos === 0);
			if (isRtlEnd) {
				state.step = 1;

				if (state.mode) {
					state.aIndex = (state.aIndex + 1) % props.texts.length;
					state.text = props.texts[state.aIndex].a;
				} else {
					state.bIndex = (state.bIndex + 1) % props.texts.length;
					state.text = props.texts[state.bIndex].b;
				}
			}
		}, 60);

		return () => clearInterval(iv);
	}, [props.texts]);

	return (
		<Fragment>
			<h4 className={a.className}>{a.text ? a.text : <Fragment>&nbsp;</Fragment>}</h4>
			<h3>{b ? b : <Fragment>&nbsp;</Fragment>}</h3>
		</Fragment>
	)
}
