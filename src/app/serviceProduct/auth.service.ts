
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
;


export interface AuthResponse {
   accessToken : string ;
   refreshToken : string ;
}

export interface UserPayload {
  id : number ;
  name : string ;
  iat : number ;
  exp : number ;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000';

  private AuthState = new BehaviorSubject<boolean | null>(null) ;

  private user  =  new BehaviorSubject<UserPayload |null>(null) ;

  public AuthState$ = this.AuthState.asObservable() ;

  public User$ = this.user.asObservable() ;

  constructor( private http : HttpClient , private jwtHelper : JwtHelperService , private router : Router) {
    this.decodeAndStoreUser(this.getAccessToken()) ;
  }


  /**
   * -------------------------------------------------------------
   * DECODETOKEN METHODS
   * -------------------------------------------------------------
   */

  /**
   * @param {string | null} token
   * @returns {void}
   * @description Decoder le token et stocker les informations de l'utilisateur dans un BehaviorSubject
   */

  private decodeAndStoreUser(token : string | null) : void {
    if(token){
      const decodeToken  = this.jwtHelper.decodeToken<UserPayload>(token) ;
      this.user.next(decodeToken) ;

    }
    else {
      this.user.next(null) ;
    }
  }

  /**
   * -------------------------------------------------------------
   * TOKEN EXPRIRED VERIFY  METHODS
   * ------------------------------------------------------------
   */

 /**
   * Décode manuellement le jeton pour vérifier son expiration.
   * @param {string} token - Le jeton d'accès JWT.
   * @returns {boolean} Vrai si le jeton est expiré, sinon faux.
   */
    public isTokenExpired(token : string ) : boolean {
      if(!token){
        return true ;
      }

      try{
        //decoder la charge utile du jeton en utilisant la bibliothèque jwt-decode
        const decodeToken = this.jwtHelper.decodeToken<UserPayload>(token) ;

        //decoder le token et vérifier l'expiration
        if(!decodeToken || !decodeToken.exp){
          return true  ;
        }

        //obtenir la date d'expiration et la comparer avec la date actuelle
        const expirationDate = decodeToken.exp * 1000 ;
        const now = new Date().getTime() ;

        return expirationDate < now ;

      }
      catch(error){
        return true ;
      }
    }

  /**
   * -------------------------------------------------------------
   * ISAUTHENTICATED  METHODS
   * ------------------------------------------------------------
   */

  /**
   * @return {boolean}
   * @description : Verifier si l'utilisateur est authentifié ou non
   */

  public isAuthenticated() : boolean {
    const token = this.getAccessToken() ;
    return token ? !this.isTokenExpired(token) : false ;
  }



/**
 * -----------------------------------------------------------
 *  GETACCESSTOKEN
 * -----------------------------------------------------------
 */

/**
 * @return { string | null}
 */

  public getAccessToken() : string | null {
    return localStorage.getItem('access_token ')
  }

/**
 * ------------------------------------------------------------
 * GETREFRESHTOKEN
 * ------------------------------------------------------------
 */

/**
 * @return { string | null}
 */

  getRefreshToken() : string | null {
    return localStorage.getItem('refresh_token')
  }



/**
 * -----------------------------------------------------------------------
 *  SETTOKENS METHOD
 * -----------------------------------------------------------------------
 */
    /**
   * Stocke les jetons d'accès et de rafraîchissement dans le localStorage et met à jour l'état d'authentification.
   * @param {AuthResponse} tokens - Les jetons à stocker.
   */


    public setTokens (tokens : AuthResponse) {
      localStorage.setItem('access_token' , tokens.accessToken)
      localStorage.setItem('refresh_token' , tokens.refreshToken)
      this.decodeAndStoreUser(tokens.accessToken)
      this.AuthState.next(true)
    }


  /**
   * -------------------------------------------------------------------
   * CLEARTOKEN
   * ---------------------------------------------------------------------
   * @description Efface les jetons du localStorage et met à jour l'état d'authentification.
   */

  public clearToken() : void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    this.user.next(null)
    this.AuthState.next(false)
  }

  /**
   * ------------------------------------------------------------------------
   * LOGIN METHOD
   * ---------------------------------------------------------------------
   * Gère la connexion de l'utilisateur avec l'email et le mot de passe.
   * @param {any} credentials - Les informations de connexion de l'utilisateur.
   * @returns {Observable<AuthResponse>}
   */

    public login( credentials : any ) : Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login` , credentials).pipe(
        tap((response)=>{
          this.setTokens(response)
          this.router.navigate(['/profile'])
        })
      );
    }

/**
 * -------------------------------------------------------------------------
 * SIGNUP METHOD
 * -----------------------------------------------------------------------
 * @param {any}
 * @return {Observable<AuthResponse>}
 */
    public signup(UserInfo : any) : Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup` , UserInfo).pipe(
        tap((response)=>{
          this.setTokens(response)
          this.router.navigate(['/profile'])
        })
      )
    }
}


