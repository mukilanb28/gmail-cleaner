import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
	useRef,
} from 'react';
import { fetchMessages } from '../api/gmailApi';
// Create context
const TableContext = createContext();

// Custom hook for easier usage
export const useTable = () => useContext(TableContext);

// Provider component
export const TableProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [percentage, setPercentage] = useState(0);
	const eventSourceRef = useRef(null);

	const cleanupEventSource = () => {
		if (eventSourceRef.current) {
			eventSourceRef.current.close();
			eventSourceRef.current = null;
		}
	};

	const selectedCount = useMemo(() => {
		const msgs = messages.filter((msg) => msg.checked);
		return msgs.length;
	}, [messages]);

	useEffect(() => {
		loadMessages();
		return () => cleanupEventSource();
	}, []);

	const loadMessages = async () => {
		setIsloading(true);
		setPercentage(0);
		cleanupEventSource();

		const eventSource = await fetchMessages(setPercentage, (data) => {
			setMessages(data.map((item) => ({ ...item, checked: false })));
			setIsloading(false);
		});
		eventSourceRef.current = eventSource;
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
		percentage,
		messages,
		onChangeAll,
		onChangeCheckbox,
		onClickRefresh: handleRefresh,
		selectedCount,
		isDeleting,
		toggleDeleting: (value) => setIsDeleting(value),
	};
	return (
		<TableContext.Provider value={value}>{children}</TableContext.Provider>
	);
};
