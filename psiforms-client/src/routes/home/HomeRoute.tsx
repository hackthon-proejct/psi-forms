import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export function HomeRoute() {
	return (
		<Fragment>
			<div className="home-intro">
				<div className="info">
					<h4>Sell Your Digital Files</h4>
					<h3>Anywhere</h3>
					<p className="subtitle">Earn in AVAX cryptocurrency</p>
					<Link to="/create-form" className="btn btn-black">Create Form for Free</Link>
				</div>
				<div className="picture">
					<div className="frame">
						<img src="images/home-intro-man.jpg" width={1020} height={1020} alt="" />
					</div>
				</div>
			</div>

			<div className="home-possibilities">
				<ul>
					<li>
						<span className="text">
							<span className="icon"><img src="images/home-icon-digital.svg" width={48} height={48} alt="" /></span>
							<span className="line">Sell Your</span> <span className="line">Digital Files</span>
						</span>
					</li>
					<li>
						<span className="text">
							<span className="icon"><img src="images/home-icon-donates.svg" width={48} height={48} alt="" /></span>
							<span className="line">Receive</span> <span className="line">Donates</span>
						</span>
					</li>
					<li>
						<span className="text">
							<span className="icon"><img src="images/home-icon-support.svg" width={48} height={48} alt="" /></span>
							<span className="line">Receive Paid</span><span className="line">Offers</span>
						</span>
					</li>
					<li>
						<span className="text">
							<span className="icon"><img src="images/home-icon-form.svg" width={48} height={48} alt="" /></span>
							<span className="line">Your Payable</span><span className="line">Forms</span>
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
								<span className="text">42.1</span>
							</strong>
							<span className="label">Transfered AVAX</span>
						</li>
						<li>
							<strong className="value">
								<span className="text">67</span>
							</strong>
							<span className="label">Created Forms</span>
						</li>
						<li>
							<strong className="value">
								<span className="text">03:21</span>
							</strong>
							<span className="label">Avg. Creating Form Time</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="home-start">
				<h3>Start Your Business Today</h3>

				<p><img src="images/home-flow.jpg" width={658} height={339} alt="" /></p>

				<Link to="/create-form" className="btn btn-black">Create Form for Free</Link>
			</div>
		</Fragment>
	);
}
