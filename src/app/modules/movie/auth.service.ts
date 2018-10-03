import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './User';
import * as jwt_decode from 'jwt-decode';
import { last } from '@angular/router/src/utils/collection';
export const TOKEN_NAME: string = "jwt_token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private serviceURL = 'http://localhost:8081/auth';
  userId: string = "";
  private headers = new Headers();

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  setUserId(id: string) {
    this.userId = id;
  }

  getUserId() {
    return this.userId;
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_NAME);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined)
      return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined || date === null)
      return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(userId: string, password: string): Observable<Object> {
    let user: User = { userId: userId, password: password };
    return this.http.post(`${this.serviceURL}/login/`, user).pipe(
      catchError(this.handleError)
    );
  }

  register(userId: string, password: string, firstName: string, lastName: string) {
    let user: User = { userId: userId, password: password, firstName: firstName, lastName: lastName };
    return this.http.post(`${this.serviceURL}/register/`, user).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred in the client side', error.error.message);
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
  };


}
