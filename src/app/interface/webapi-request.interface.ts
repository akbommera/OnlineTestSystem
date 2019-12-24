export interface WebApiRequest {
    apiBase: string;
    entity: string;
    action: string;
    params?: string;
    crud: 'get' | 'post';
    body?: any;
}
