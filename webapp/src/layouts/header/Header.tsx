import { FC } from 'react';
import './header.scss';
import GmailLogo from '../../assets/icons/gmail-logo.svg?path';
import { SvgIcon } from '../../components';
import { APP_NAME } from '../../common/constants';

export const Header: FC = () => {
	return (
		<header>
			<div className="header-wrapper">
				<div className="left-pane">
					<SvgIcon src={GmailLogo} />
					<div>{APP_NAME}</div>
				</div>
				<div></div>
			</div>
		</header>
	);
};
