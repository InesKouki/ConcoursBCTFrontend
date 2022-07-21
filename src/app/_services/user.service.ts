import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiBaseUrl}/user/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'userlist');
  }

  confirm(id:any,username:any,password:any,code: any): Observable<any> {
    return this.http.put(API_URL+'confirm', {id,username,password,code},httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(API_URL+'userdelete/' + id);
  }

  makeAdmin(username: string): Observable<any> {
    return this.http.post(API_URL+'makeAdminRH', username);
  }
}
