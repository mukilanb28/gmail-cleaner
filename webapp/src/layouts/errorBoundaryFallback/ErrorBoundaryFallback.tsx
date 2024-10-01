import ErrorImage from '../../assets/images/not-found.png';
import React from 'react';
import './errorBoundaryFallback.scss';

export const ErrorBoundaryFallback: React.FC = () => {
	return (
		<div className="error-boundary-fallback">
			<img
				src={ErrorImage}
				alt="Error Has Occurred"
				className="error-boundary-image"
			/>
			<div>
				<p className="error-heading">Something Went Wrong</p>
				<p className="error-information">
					It seems that an error has occurred, try refreshing your browser.
				</p>
				<p className="error-information">
					If the problem persists, please don&apos;t hesitate to leave your
					so that the team can resolve the issue as quickly as possible.
				</p>
			</div>
		</div>
	);
};
