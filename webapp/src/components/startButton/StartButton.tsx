import { FC } from 'react';
import './start.scss';
import { ReactComponent as Play } from '../../assets/icons/play.svg';

interface IStartButton {
	onClick: () => void;
}
export const StartButton: FC<IStartButton> = ({ onClick }) => {
	return (
		<button
			className="start-btn"
			onClick={() => onClick()}>
			<span>Start</span>
			<Play />
		</button>
	);
};
