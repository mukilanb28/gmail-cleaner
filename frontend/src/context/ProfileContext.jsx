import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleProfile = () => setIsOpen((prev) => !prev);

	const value = {
		isOpen,
		toggleProfile,
	};

	return (
		<ProfileContext.Provider value={value}>
			{children}
		</ProfileContext.Provider>
	);
};
