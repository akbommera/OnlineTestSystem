import { WebApiService } from './webapi.service';
import { HttpClient } from '@angular/common/http';
import { WebApiRequest } from '../interface/webapi-request.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiRequestService extends WebApiService {
    constructor(public http: HttpClient) {
        super(http);
    }

    sendAPIReq(webApiRequest: WebApiRequest) {
        const { action, entity, params, body, crud, apiBase } = webApiRequest;
        if (webApiRequest && crud === 'get') {
            return super.get(entity, action, params, apiBase);
        } else {
            return super.post(body, action, entity, apiBase);
        }
    }
}
