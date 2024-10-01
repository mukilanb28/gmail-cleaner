import { useNavigate } from 'react-router-dom';
import './notFound.scss';
import ErrorImage from '../../assets/images/not-found.png';

export const NotFound = () => {
	const navigate = useNavigate();

	const navigateToPreviousRoute = () => {
		navigate(-1);
	};

	return (
		<div
			className="page-not-found"
			id="page-not-found">
			<img
				src={ErrorImage}
				alt="Not Found"
				className="not-found-image"
			/>
			<div>
				<p className="commentary">
					Looks like the page you&apos;re looking for can&apos;t be found.
				</p>
				<p className="sub-commentary">
					Try checking if it&apos;s the correct URL.
				</p>
				<button
					//variant="tertiary"
					className="back-to-previous-link"
					onClick={navigateToPreviousRoute}>
					Back to previous page
				</button>
			</div>
		</div>
	);
};
