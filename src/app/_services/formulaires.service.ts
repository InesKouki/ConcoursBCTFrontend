import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL=`${environment.apiBaseUrl}/formulaires/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormulairesService {


  constructor(private http: HttpClient) { }
  getFormulairesList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'all');
  }

  getFormulaire(id:number): Observable<any[]> {
    return this.http.get<any[]>(API_URL+id);
  }

  deleteFormulaire(id: number): Observable<any> {
    return this.http.delete(API_URL+'delete/' + id);
  }

  add(titre: any,posteId: any): Observable<any> {
    return this.http.post(API_URL + 'add',{titre,posteId},httpOptions);
  }

  ajouterQuestions(formulaireId:any,questionsId: any): Observable<any> {
    return this.http.post(API_URL + 'addQuestions',{formulaireId,questionsId},httpOptions);
  }

  SupprimerQuestions(formulaireId:any,questionId: any): Observable<any> {
    return this.http.post(API_URL + 'removeQuestion',{formulaireId,questionId},httpOptions);
  }

  getQuestions(id:number): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'questions/'+id);
  }

  update(id:any,titre: any,posteId: any): Observable<any> {
    return this.http.put(API_URL + 'update',{id,titre,posteId},httpOptions);
  }
  
  getPoste(id:number): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'poste/'+id);
  }

  getQuestionsNotInForm(id):Observable<any[]> {
    return this.http.get<any[]>(API_URL+'questsNotInForm/'+id);
  }

}
