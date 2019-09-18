import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    public get<T>(queryUrl: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
        try {
            return this.http.get<T>(queryUrl, {
                observe: 'response', headers, params
            }).pipe(map(result => result.body));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // public post<T>(queryUrl: string, requestBody: object, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    //     try {
    //         return this.http.post<T>(queryUrl, requestBody, {
    //             observe: 'response', headers, params
    //         }).pipe( map(result => result.body) );
    //     } catch (error) {
    //         console.log(error);  
    //         throw error;
    //     }
    // }

    public post(queryUrl: string, requestBody: object) {
        try {

            return this.http.post(queryUrl,
                requestBody)
                .pipe(map(result => result));
                // .subscribe(
                //     data => {                        
                //         console.log("POST Request is successful ", data);
                //         return data;
                //     },
                //     error => {

                //         console.log("Error", error);

                //     }

                // );

            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // public post<T>(queryUrl: string, requestBody: object, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    //     try {

    //         this.http.post("http://localhost:3001/api/exec/code",
    //         {
    //             "script" : "print('hello yuvi')",
    //             "language": "python3",
    //             "versionIndex": "2"
    //         })
    //             .subscribe(
    //                 data => {
    //                     console.log("POST Request is successful ", data);
    //                 },
    //                 error => {

    //                     console.log("Error", error);

    //                 }

    //             );

    //         return this.http.post<T>(queryUrl, requestBody, {
    //             observe: 'response', headers, params
    //         }).pipe(map(result => result.body));
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }

}
