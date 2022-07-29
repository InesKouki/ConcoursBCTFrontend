import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, NEVER } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

const AUTH_API_URL=`${environment.apiBaseUrl}/auth/`;
const USER_API_URL=`${environment.apiBaseUrl}/user/`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string,email: string,nom: string,prenom: string, sexe: string,dateNaissance:any,cin:string, password: string): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signup', {
      username,
      email,
      nom,
      prenom,
      sexe,
      dateNaissance,
      cin,
      password
      
      
    }, httpOptions);
  }

  resetpw(email: string): Observable<any> {
    return this.http.post(AUTH_API_URL + 'resetpw', email);
  }

  sendmail(email: string): Observable<any> {
    return this.http.post(AUTH_API_URL + 'sendmail', email);
  }

  editpw(pw: any,id:any,password:string): Observable<any> {
    return this.http.put(AUTH_API_URL + 'editpw/'+ pw,{id,password},httpOptions);
  }

  getStatistics(): Observable<any[]> {
    return this.http.get<any[]>(USER_API_URL+'home').pipe(
      catchError((err) => {
        if (err.status ===401) {
          this.tokenStorageService.signOut();
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    ); 
  }
}
