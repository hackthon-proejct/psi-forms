import { useEffect } from 'react';

export interface YoutubeMovieProps {
	movieId: string;
}

export function YoutubeMovie(props: YoutubeMovieProps) {
	let iframe: HTMLElement | null = null;

	useEffect(() => {
		function reload() {
			if (iframe?.parentElement) {
				const width = iframe.parentElement.clientWidth;
				iframe.style.width = width + 'px';
				iframe.style.height = (width * 0.5625) + 'px';
			}
		}

		reload();
		window.addEventListener('resize', reload);

		return () => {
			window.removeEventListener('resize', reload);
		};
	});

	return (
		<iframe src={`https://www.youtube.com/embed/${props.movieId}?autoplay=1`} ref={r => iframe = r} title="YouTube video player"
			allowFullScreen={true}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
	);
}
