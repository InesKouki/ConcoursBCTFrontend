import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const API_URL=`${environment.apiBaseUrl}/concours/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ConcoursService {

  constructor(private http: HttpClient) { }

  getConcoursList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'all');
  }

  getConcours(id:number): Observable<any[]> {
    return this.http.get<any[]>(API_URL+id);
  }

  deleteConcours(id: number): Observable<any> {
    return this.http.delete(API_URL+'delete/' + id);
  }

  add(titre: any,dateDebut: any,dateFin: any,description:any): Observable<any> {
    return this.http.post(API_URL + 'add',{titre,dateDebut,dateFin,description},httpOptions);
  }

  assign(concoursId:any,posteId: any): Observable<any> {
    return this.http.post(API_URL + 'assignPoste',{concoursId,posteId},httpOptions);
  }

  unassign(concoursId:any,posteId: any): Observable<any> {
    return this.http.post(API_URL + 'removePoste',{concoursId,posteId},httpOptions);
  }

  getPoste(id:number): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'postes/'+id);
  }

  update(id:any,titre: any,dateDebut: any,dateFin: any,description:any): Observable<any> {
    return this.http.put(API_URL + 'update',{id,titre,dateDebut,dateFin,description},httpOptions);
  }
  
  getNonPostes(id:number): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'postes/'+id);
  }

  getConcoursDetails(id:any): Observable<any[]> {
    return this.http.get<any[]>(API_URL+id);
  }

  


}
