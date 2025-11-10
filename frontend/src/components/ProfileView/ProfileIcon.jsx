import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';

export default () => {
	const { user } = useAuth();
	const { toggleProfile } = useProfile();

	let initial = 'A';
	if (user && user.name) {
		let namesArr = user.name.split(' ');
		if (namesArr.length === 1) {
			initial = namesArr[0][0];
		} else {
			initial = namesArr[0][0] + namesArr[1][0];
		}
	}
	if (!user) return '';
	return (
		<button
			className="icon"
			onClick={() => toggleProfile()}>
			<div className="icon-inner">
				<div className="abs-center">{initial}</div>
			</div>
		</button>
	);
};
