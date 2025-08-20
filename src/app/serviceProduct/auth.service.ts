
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject } from 'rxjs';

export interface AuthResponse {
  accessToken : string  ;
  refreshToken : string ;
}

export interface UserPayload {
  id : number | string  ;
  name : string ;
  iat : string ;
  exp : string ;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  private readonly API_URL = "http://localhost:3000"

  public journal = new Subject()

  // État d’auth + utilisateur courant
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());
  private user = new BehaviorSubject<UserPayload | null>(null);

  /**
   * @param {boolean} isAuthenticated - Check if the user is authenticated
   * @returns {boolean} - Returns true if the user is authenticated, otherwise false
   * @param {UserPayload} user - The user payload containing user information
   * @returns {UserPayload | null} - Returns the user payload if available, otherwise null
   * @description This service handles authentication state and user information.
   *
   */
  public authState$ = this.authState.asObservable() ;
  public user$ = this.user.asObservable() ;

  constructor(
    private http: HttpClient ,
    private jwtHelper : JwtHelperService ,
    private route : Router
  ) {
    this.decodeAndStoreUser(this.getAccessToken());
  }

  /**
   * @param {string} accessToken - The access token to decode and store user information
   * @returns {void}
   * @description Decodes the access token and stores user information in the user BehaviorSubject.
   * @param { string | null } token
   */

  private decodeAndStoreUser( token : string |null) {
    if(token){
      const decodeToken = this.jwtHelper.decodeToken<UserPayload>(token) ;
      this.user.next(decodeToken)
    }
    else {
      this.user.next(null);
    }
  }

  /**
   * @param {string} token - The access token to check
   * @return {boolean} - Returns true if the token is valid, otherwise false
   * @description Checks if the provided access token is valid.
   * @param {string | null} token - The access token to check
   */

  public isAuthenticated() : boolean {
    const token  = this.getAccessToken() ;
    return token ? !this.jwtHelper.isTokenExpired(token) : false ;
  }
}
