import { useEffect, useState } from 'react';

export interface LoaderState<T> {
	isLoading: boolean;
	value?: T;
	error?: string;
	reload(): void;
}

export function useLoader<T>(factory: () => Promise<T>): LoaderState<T> {

	const [state, setState] = useState<{
		isLoading: boolean;
		value?: T;
		error?: string;
	}>(() => {
		return { isLoading: true };
	});

	useEffect(() => {
		async function load() {
			try {
				const newValue = await factory();
				setState({
					isLoading: false,
					value: newValue
				});
			} catch (e) {
				console.error(e);
				setState({
					isLoading: false,
					error: (e as Error).message
				});
			}
		}

		if (state.isLoading) {
			load();
		}
	}, [state.isLoading, factory]);

	function reload() {
		if (state.isLoading) {
			throw new Error('Loader is already reloading');
		}
		setState({
			isLoading: true
		});
	}

	return {
		isLoading: state.isLoading,
		value: state.value,
		error: state.error,
		reload
	};
}

export interface LoaderProps<T> {
	state: LoaderState<T>;
	loadingText?: string;
	element: (value: T) => JSX.Element;
}

export function Loader<T>(props: LoaderProps<T>) {
	if (props.state.isLoading) {
		return (
			<div className="loading-idle">
				<i className="ico ico-mr ico-refresh-black ico-rotating" />
				{props.loadingText ?? 'Loading...'}
			</div>
		);
	}
	if (props.state.error) {
		return (
			<div className="loading-error">
				<p className="message">Error: {props.state.error}</p>

				<button className="btn btn-black btn-large" onClick={props.state.reload}>Try Again</button>
			</div>
		);
	}
	if (props.state.value) {
		return props.element(props.state.value);
	}
	throw new Error('Undefined behavior');
}
