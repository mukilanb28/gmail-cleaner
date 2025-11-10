import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useTransition,
	useMemo,
} from 'react';
import { fetchMessages } from '../api/gmailApi';
// Create context
const TableContext = createContext();

// Custom hook for easier usage
export const useTable = () => useContext(TableContext);

// Provider component
export const TableProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);
	const [isLoading, startTransition] = useTransition();

	const selectedCount = useMemo(() => {
		const msgs = messages.filter((msg) => msg.checked);
		return msgs.length;
	}, [messages]);

	useEffect(() => {
		loadMessages();
	}, []);

	const loadMessages = () => {
		startTransition(async () => {
			try {
				let result = await fetchMessages();
				result = result.map((item) => ({ ...item, checked: false }));
				setMessages(result);
			} catch (err) {
				console.log(err);
			}
		});
	};

	const onChangeCheckbox = (index, state) => {
		setMessages((prev) => {
			let newArr = [...prev];
			newArr[index].checked = state;
			return newArr;
		});
	};
	const onChangeAll = (state) => {
		setMessages((prev) => {
			return prev.map((item) => ({ ...item, checked: state }));
		});
	};
	const handleRefresh = () => {
		loadMessages();
	};
	const value = {
		isLoading,
		messages,
		onChangeAll,
		onChangeCheckbox,
		onClickRefresh: handleRefresh,
		selectedCount,
	};
	return (
		<TableContext.Provider value={value}>{children}</TableContext.Provider>
	);
};
