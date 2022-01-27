import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Typewriter } from './Typewriter';
import { YoutubeMovie } from './YoutubeMovie';

const TYPEWRITER_TEXTS = [
	{ a: 'Forms for Creators', aClassName: 'orange', b: 'Anywhere' },
	{ a: 'Forms for Business', aClassName: 'violet', b: 'Anytime' },
	{ a: 'Forms for Influencers', aClassName: 'azure', b: 'Anyplace' }
];

export function HomeRoute() {
	const [isVideoVisible, setIsVideoVisible] = useState(false);

	function openVideoPopup() {
		setIsVideoVisible(true);
	}

	function closeVideoPopup() {
		setIsVideoVisible(false);
	}

	return (
		<section className="home">
			<div className="home-intro">
				<div className="info">
					<Typewriter texts={TYPEWRITER_TEXTS} />

					<p className="subtitle">Earn directly in AVAX cryptocurrency</p>

					<div className="action">
						<Link to="/create-form" className="btn btn-black">
							Create Form for Free
							<i className="ico ico-ml ico-arrow-right-white" />
						</Link>
					</div>
					<div className="subaction">
						<Link to="/examples" className="btn btn-gray">
							Explore Examples
							<i className="ico ico-ml ico-arrow-right-black" />
						</Link>
					</div>
				</div>
				<div className="picture">
					<div className="frame">
						<img src="images/home-intro-man.jpg" width={510} height={510} alt="" />
					</div>

					<div className="video">
						<button className="btn btn-orange" onClick={openVideoPopup}>
							Watch Video
							<i className="ico ico-ml ico-play-video-white" />
						</button>
					</div>
				</div>
			</div>

			<div className="home-possibilities">
				<ul>
					<li>
						<span className="text">
							<span className="icon"><img src="images/home-icon-digital.svg" width={48} height={48} alt="" /></span>
							<span className="line">Sell Digital</span> <span className="line">Products</span>
						</span>
					</li>
					<li>
						<span className="text">
							<span className="icon"><img src="images/home-icon-donates.svg" width={48} height={48} alt="" /></span>
							<span className="line">Receive</span> <span className="line">Donations</span>
						</span>
					</li>
					<li>
						<span className="text">
							<span className="icon"><img src="images/home-icon-offers.svg" width={48} height={48} alt="" /></span>
							<span className="line">Receive Paid</span> <span className="line">Offers</span>
						</span>
					</li>
					<li>
						<span className="text">
							<span className="icon"><img src="images/home-icon-advices.svg" width={48} height={48} alt="" /></span>
							<span className="line">Sell Your</span> <span className="line">Advices</span>
						</span>
					</li>
				</ul>
			</div>

			<div className="home-gray">
				<div className="home-pricing">
					<div className="picture">
						<div className="frame">
							<img src="images/home-pricing-man.jpg" width={260} height={260} alt="" />
						</div>
					</div>
					<div className="info">
						<h3>4%</h3>
						<h4>Simple Pricing</h4>
						<p>Fee is 4% of your income.</p>
						<p>We earn when you earn.</p>
					</div>
				</div>

				<div className="home-statistics">
					<ul>
						<li>
							<strong className="value">
								<span className="text">12.8</span>
							</strong>
							<span className="label">Transfered AVAX</span>
						</li>
						<li>
							<strong className="value">
								<span className="text">16</span>
							</strong>
							<span className="label">Created Forms</span>
						</li>
						<li>
							<strong className="value">
								<span className="text">02:22</span>
							</strong>
							<span className="label">Avg. Creating Form Time</span>
						</li>
					</ul>
				</div>
			</div>

			{isVideoVisible &&
				<div className="tiny-popup wide">
					<h4>Introduction</h4>

					<div className="simple-row">
						<YoutubeMovie movieId="fMD_9O26y-I" />
					</div>

					<div className="simple-row">
						<button className="btn btn-black" onClick={closeVideoPopup}>Close</button>
					</div>
				</div>}

			<div className="home-start">
				<h3>Start Your Crypto Business</h3>

				<p><img src="images/home-flow.png" width={658} height={339} alt="" /></p>

				<Link to="/create-form" className="btn btn-black">
					Create Form for Free
					<i className="ico ico-ml ico-arrow-right-white" />
				</Link>
			</div>
		</section>
	);
}
