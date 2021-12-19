
export class HttpClient {

	public static async request<T>(method: 'GET' | 'POST' | 'PUT', url: string, data: any): Promise<T> {
		if (method === 'POST' || method === 'PUT') {
			url += (url.includes('?') ? '&' : '?') + '_=' + Date.now();
		}
		const response = await fetch(url, {
			method,
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: data ? JSON.stringify(data) : null
		});
		if (response.status !== 200) {
			const err = await response.json();
			throw new Error(err?.message || response.statusText);
		}
		return await response.json();
	}

	public static async get<T>(url: string): Promise<T> {
		return HttpClient.request('GET', url, null);
	}
}
