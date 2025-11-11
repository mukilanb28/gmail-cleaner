import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<AuthProvider>
			<ModalProvider>
				<App />
			</ModalProvider>
		</AuthProvider>
	</BrowserRouter>
);
