const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Fetch messages
export async function fetchMessages() {
	try {
		const res = await fetch(`${API_BASE_URL}/gmail/aggregate`, {
			method: 'GET',
			credentials: 'include', // send HttpOnly cookie
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!res.ok) throw new Error('Failed to fetch messages');
		return await res.json(); // [{ senderName, emailCount }]
	} catch (err) {
		console.error('Error fetching messages:', err);
		return [];
	}
}

// Delete messages
export async function deleteMessages(senders) {
	try {
		const res = await fetch(`${API_BASE_URL}/messages`, {
			method: 'DELETE',
			credentials: 'include', // send HttpOnly cookie
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ sender: senders }),
		});
		if (!res.ok) throw new Error('Failed to delete messages');
		return await res.json();
	} catch (err) {
		console.error('Error deleting messages:', err);
		return null;
	}
}

// Get current logged-in user's profile
export async function getMyProfile() {
	try {
		const res = await fetch(`${API_BASE_URL}/auth/profile`, {
			method: 'GET',
			credentials: 'include', // important for cookie auth
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!res.ok) throw new Error('Failed to fetch profile');
		return await res.json(); // { user: { id, name, email, ... } }
	} catch (err) {
		console.error('Error fetching profile:', err);
		return null;
	}
}

// Get login
export async function login() {
	try {
		const res = await fetch(`${API_BASE_URL}/auth/login`, {
			method: 'GET',
			credentials: 'include', // important for cookie auth
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!res.ok) throw new Error('Failed to login');
		return await res.json();
	} catch (err) {
		console.error('Error login:', err);
		return null;
	}
}

// POST logout
export async function logout() {
	try {
		const res = await fetch(`${API_BASE_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include', // important for cookie auth
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!res.ok) throw new Error('Failed to logout');
		return await res.json();
	} catch (err) {
		console.error('Error login:', err);
		return null;
	}
}
