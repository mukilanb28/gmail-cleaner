import { FC, useEffect, useState } from 'react';
import { StatusChecker } from '../../components';
import { getUserProfile } from '../../service/DataService';
import { LoginButton } from '../../components/loginButton/LoginButton';
import './home.scss';
import { StartButton } from '../../components/startButton/StartButton';
import { MessageTable } from '../../components/messageTable/MessageTable';

export const Home: FC = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const [showTable, setShowTable] = useState<boolean>(false);

	useEffect(() => {
		getUserProfile().then((res) => {
			if (res && res.emailAddress) {
				setIsUserLoggedIn(true);
			}
		});
	}, []);
	return (
		<div className="home">
			<StatusChecker />
			{isUserLoggedIn ? (
				showTable ? (
					<MessageTable />
				) : (
					<StartButton onClick={() => setShowTable(true)} />
				)
			) : (
				<LoginButton />
			)}
		</div>
	);
};
