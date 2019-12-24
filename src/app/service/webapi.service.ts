import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class WebApiService {
    constructor(public http: HttpClient, private apiBase?: string, private entity?: any) { }

    get(entity, action, params?: string, apiBase?: string) {
        const url = this.setUrl(action, entity, params, apiBase);
        return new Observable((observer) => {
            this.http.get(url)
                .pipe(
                    // to handle error
                    catchError(this.handleError)
                ).subscribe(res => {
                    observer.next(res);

                });
        });
    }

    setUrl(action, entity, params, apiBase) {
        // create link
        const url = `${environment[apiBase || this.apiBase]}${entity ? entity : this.entity}/${action}${params ? '?' + params : ''}`;
        console.log(url);
        return url;
    }

    post(body, action = '', entity, apiBase) {
        const url = this.setUrl(action, entity, null, apiBase);
        return this.http.post(url, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse, body) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
