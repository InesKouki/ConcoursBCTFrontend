import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL=`${environment.apiBaseUrl}/postes/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PostesService {

  constructor(private http: HttpClient) { }

  getPostesList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'all');
  }

  getPoste(id:number): Observable<any[]> {
    return this.http.get<any[]>(API_URL+id);
  }

  deletePoste(id: number): Observable<any> {
    return this.http.delete(API_URL+'delete/' + id);
  }

  add(nom: any,description: any,nombrePlace: any): Observable<any> {
    return this.http.post(API_URL + 'add',{nom,description,nombrePlace},httpOptions);
  }

  update(id:any,nom: any,description: any,nombrePlace: any): Observable<any> {
    return this.http.post(API_URL + 'update',{id,nom,description,nombrePlace},httpOptions);
  }


}
