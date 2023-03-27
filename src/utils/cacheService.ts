import { TOKEN } from 'config/constants';

export function getToken(): string | null {
	return localStorage.getItem(TOKEN);
}

export function getCache(key: string): any {
	const value = localStorage.getItem(key);
	return JSON.parse(value ?? '{}');
}

export function setCache(key: string, value: any): void {
	localStorage.setItem(key, JSON.stringify(value));
}

export function rmCache(key: string): void {
	localStorage.removeItem(key);
}
