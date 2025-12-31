import type { IDeleteMessage, IGmailMessage, IProfileResponse } from "../models";

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Fetch messages
export async function fetchMessages(
    processCount: number, groupByDomain: boolean,
    onProgress: (progress: number) => void,
    onResult: (data: IGmailMessage[]) => void
): Promise<EventSource> {
    try {
        const eventSource = new EventSource(`${API_BASE_URL}/gmail/aggregate?processCount=${processCount}&groupByDomain=${groupByDomain}`, {
            withCredentials: true,
        });

        eventSource.addEventListener('progress', (e: MessageEvent) => {
            onProgress(Number(e.data));
        });

        eventSource.addEventListener('result', (e: MessageEvent) => {
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
        // Return a dummy EventSource or handle error appropriately.
        // Since the function signature promises EventSource, we might need to throw or return a mock.
        // However, the original code returned [] on error which is inconsistent with EventSource return type.
        // Given the usage, it seems it expects an EventSource.
        // Let's throw for now to be safe or return a closed EventSource if possible, but original code returned [] which is definitely wrong for type safety if it expects EventSource.
        // Looking at original code: return [] on error.
        // If I return [], it won't match EventSource type.
        // I will throw an error here to be more type safe, or return null if I change return type.
        // Let's change return type to Promise<EventSource | null> to be safe, but better to throw.
        throw err;
    }
}

// Delete messages
export async function deleteMessages(senders: IDeleteMessage[]): Promise<any> {
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
export async function getMyProfile(): Promise<IProfileResponse | null> {
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
export async function login(): Promise<any> {
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
export async function logout(): Promise<any> {
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
