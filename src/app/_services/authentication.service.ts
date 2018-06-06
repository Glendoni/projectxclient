﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>('http://127.0.0.1:8000/api/login?email=' +
                          email + '&password=' +
                          password, JSON.stringify({ email: email, password : password }))
            .pipe(map((res:any) => {
                // login successful if there's a jwt token in the response
            
             console.log(res)
                if (res && res.token) {
               
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email:email, token: res.token }));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}