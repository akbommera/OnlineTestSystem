import { WebApiService } from './webapi.service';
import { HttpClient } from '@angular/common/http';
import { WebApiRequest } from '../interface/webapi-request.interface';
import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({ providedIn: 'root' })
export class SystemApiRequest {
    constructor(private apiSvc: ApiRequestService) {
    }

    getUserAuthenticate(user_name, password) {
        const webapi: WebApiRequest = {
            apiBase: 'apiBase',
            entity: 'login',
            action: 'authLogin',
            crud: 'post',
            body: { user_name, password }
        };
        return this.apiSvc.sendAPIReq(webapi);
    }

    saveNewLogin(body) {
        const webapi: WebApiRequest = {
            apiBase: 'apiBase',
            entity: 'login',
            action: 'saveNewLogin',
            crud: 'post',
            body
        };
        return this.apiSvc.sendAPIReq(webapi);
    }

    getQustionList(params) {
        const webapi: WebApiRequest = {
            apiBase: 'apiBase',
            entity: 'ques',
            action: 'getQuestList',
            crud: 'get',
            params
        };
        return this.apiSvc.sendAPIReq(webapi);
    }

    saveEvaluation(body) {
        const webapi: WebApiRequest = {
            apiBase: 'apiBase',
            entity: 'evaluation',
            action: 'saveEvaluation',
            crud: 'post',
            body
        };
        return this.apiSvc.sendAPIReq(webapi);
    }

    getEvaluation(params) {
        const webapi: WebApiRequest = {
            apiBase: 'apiBase',
            entity: 'evaluation',
            action: 'getEvaluation',
            crud: 'get',
            params
        };
        return this.apiSvc.sendAPIReq(webapi);
    }

    saveNewQuestions(body) {
        const webapi: WebApiRequest = {
            apiBase: 'apiBase',
            entity: 'ques',
            action: 'saveQuestions',
            crud: 'post',
            body
        };
        return this.apiSvc.sendAPIReq(webapi);
    }

    // getEvaluationList(params) {
    //     const webapi: WebApiRequest = {
    //         apiBase: 'apiBase',
    //         entity: 'evaluation',
    //         action: 'getEvaluationList',
    //         crud: 'get',
    //         params
    //     };
    //     return this.apiSvc.sendAPIReq(webapi);
    // }
}
