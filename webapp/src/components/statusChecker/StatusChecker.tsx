import { FC, useEffect, useState } from 'react';
import { isApplicationOnline } from '../../service/DataService';

export const StatusChecker: FC = () => {
	const [isOnline, setIsOnline] = useState<boolean>(false);

	useEffect(() => {
		isApplicationOnline().then((res) => setIsOnline(res));
	}, []);
	return <div>{isOnline ? 'Online' : 'Offline'}</div>;
};
