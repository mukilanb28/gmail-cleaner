const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Fetch messages
export async function fetchMessages(onProgress, onResult) {
	try {
		const eventSource = new EventSource(`${API_BASE_URL}/gmail/aggregate`, {
			withCredentials: true,
		});

		eventSource.addEventListener('progress', (e) => {
			onProgress(Number(e.data));
		});

		eventSource.addEventListener('result', (e) => {
			onResult(JSON.parse(e.data));
			eventSource.close();
		});

		eventSource.onerror = (err) => {
			console.error('SSE error:', err);
			eventSource.close();
		};

		return eventSource;
	} catch (err) {
		console.error('Error fetching messages:', err);
		return [];
	}
}

// Delete messages
export async function deleteMessages(senders) {
	try {
		const res = await fetch(`${API_BASE_URL}/gmail/messages`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(senders),
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
