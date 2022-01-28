import { useEffect } from 'react';

export interface YoutubeMovieProps {
	movieId: string;
}

export function YoutubeMovie(props: YoutubeMovieProps) {
	let iframe: HTMLElement | null = null;

	useEffect(() => {
		function resize() {
			if (iframe?.parentElement) {
				const width = iframe.parentElement.clientWidth;
				iframe.style.width = width + 'px';
				iframe.style.height = (width * 0.5625) + 'px';
			}
		}

		resize();
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	});

	return (
		<iframe src={`https://www.youtube.com/embed/${props.movieId}?autoplay=1&rel=0`} ref={i => iframe = i} title="YouTube video player"
			allowFullScreen={true}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
	);
}
