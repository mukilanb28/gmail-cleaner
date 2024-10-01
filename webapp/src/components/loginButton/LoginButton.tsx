import { FC } from 'react';
import './loginButton.scss';
import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { loginUser } from '../../service/DataService';

export const LoginButton: FC = () => {
	const handleOnClickBtn = () => {
		loginUser();
	};
	return (
		<button
			className="login-btn"
			onClick={handleOnClickBtn}>
			<Google />
			<span>Sign in with Google</span>
			<span></span>
		</button>
	);
};
