import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const API_URL=`${environment.apiBaseUrl}/questions/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getQuestionsList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'all');
  }

  getQuestion(id:number): Observable<any[]> {
    return this.http.get<any[]>(API_URL+id);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(API_URL+'delete/' + id);
  }

  add(libelle: any): Observable<any> {
    return this.http.post(API_URL + 'add',{libelle},httpOptions);
  }

  update(id:any,libelle: any): Observable<any> {
    return this.http.put(API_URL + 'update',{id,libelle},httpOptions);
  }
}
