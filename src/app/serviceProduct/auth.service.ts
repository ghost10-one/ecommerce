
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { BehaviorSubject } from 'rxjs';
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

  private User  =  new BehaviorSubject<UserPayload |null>(null) ;




}
