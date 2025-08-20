import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AuthResponse {
  accessToen : string  ;
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

  private readonly apiurl = "http://localhost:3000"

  public subjectIEx = new Subject
  constructor() { }
}
