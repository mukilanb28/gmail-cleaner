import React, { createContext, useContext, useState } from 'react';

// Create context
const SidebarContext = createContext();

// Custom hook for easier usage
export const useSidebar = () => useContext(SidebarContext);

// Provider component
export const SidebarProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false); // sidebar open/close state
	const [activeItem, setActiveItem] = useState(null); // currently active item

	const toggleSidebar = () => setIsOpen((prev) => !prev);

	const value = {
		isOpen,
		activeItem,
		setActiveItem,
		toggleSidebar,
	};

	return (
		<SidebarContext.Provider value={value}>
			{children}
		</SidebarContext.Provider>
	);
};
