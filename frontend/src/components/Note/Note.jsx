import './Note.scss';
import { useAuth } from '../../context/AuthContext';

const Note = () => {
	const { user } = useAuth();
	return (
		<div className="note-section">
			<span className="text">
				<b>Please note:</b> This project runs on limited infrastructure, so
				processing may take some time. We respect your privacy and do not
				store any user data or cookies. Only a limited number of messages
				such as the last {user?.max_msg_count || 'few'} are processed.
			</span>
		</div>
	);
};

export default Note;
