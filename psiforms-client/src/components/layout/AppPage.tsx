
export interface AppPageProps {
	children: JSX.Element | (JSX.Element | boolean | null)[];
}

export function AppPage(props: AppPageProps) {
	return (
		<main className="app-page">
			<div className="app-page-body">
				{props.children}
			</div>
		</main>
	);
}
