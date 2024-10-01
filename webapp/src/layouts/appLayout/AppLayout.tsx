import { Outlet } from 'react-router-dom';
import { Header, Footer, Menu } from '../index';
import './appLayout.scss';

export const AppLayout: React.FC = () => {
	return (
		<div className="layout">
			<header>
				<Header />
			</header>
			<div className="scrollable">
				<aside>
					<Menu />
				</aside>
				<section>
					<main>
						<Outlet />
					</main>
					<footer>
						<Footer />
					</footer>
				</section>
			</div>
		</div>
	);
};
