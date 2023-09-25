export class testFetch {
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async getData(params: Record<string, string>) {
        const baseUrl = 'http://192.168.1.37:5000/api';
        const url = baseUrl + this.endpoint + '?' + new URLSearchParams(params);

        const response = await fetch(url);

        return await response.json();
    }
}
