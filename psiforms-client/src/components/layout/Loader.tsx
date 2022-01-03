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
		loadTime?: number;
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
					loadTime: state.loadTime,
					value: newValue
				});
			} catch (e) {
				console.error(e);
				setState({
					isLoading: false,
					loadTime: state.loadTime,
					error: (e as Error).message
				});
			}
		}

		if (!state.isLoading) {
			setState({
				loadTime: state.loadTime,
				isLoading: true
			});
		}
		load();
	}, [state.loadTime, factory]);

	function reload() {
		setState({
			isLoading: true,
			loadTime: Date.now()
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
