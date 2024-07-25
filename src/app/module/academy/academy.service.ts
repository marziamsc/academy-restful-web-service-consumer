import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Academy } from '../../model/academy.model';
import { AcademyServiceI } from '../academyI.service';

@Injectable({
  providedIn: 'root'
})
export class AcademyService implements AcademyServiceI{

  private apiURL = "http://localhost:8080/rest/api/academies"

  /*
  Tramite httpOptions specifichiamo il formato dati utiizzato per lo 
  scambio di informazioni con il Web Service Provider
  */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*
  HTTPClient è una API fornita da Angular
  E' un Service che si può iniettare tramite Costruttore in un altro Service
  La funzione di HttpClient è quella di effettuare chiamare REST tramite metodi get, post, put, delete
  */
  constructor(private httpClient: HttpClient) { }

  getAcademies(): Observable<any> {

    /*
    Chimamata rest GET "http://localhost:8080/rest/api/academies"
    Tutti i metodi di HttpClient (compreso il metodo get) restituiscono un Observable
    Observable è un API in grado di mappare JSON in Oggetti TypeScript e può trovarsi in tre stati differenti:
    - NEXT = la chiamata ad un servizio REST è stata effettuata ma ancora non terminata
    - COMPLETED = la chiamata ad un servizio REST è stata effettuata con successo
    - ERROR = la chiamata ad un servizio REST ha restituito una eccezione

    NB. Observable non è un API Angular
    */
    return this.httpClient.get(this.apiURL)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /*
  Chiamata rest GET "http://localhost:8080/rest/api/academies/code/{}"
  */
  getAcademyByCode(code: string): Observable<any> {

    return this.httpClient.get(this.apiURL + '/code/' + code)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /*
  Chiamata rest POST "http://localhost:8080/rest/api/academies"
  */
  saveAcademy(academy: Academy): Observable<any> {

    return this.httpClient.post(this.apiURL, JSON.stringify(academy), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /*
  Chiamata rest PUT "http://localhost:8080/rest/api/academies"
  */
  updateAcademy(academy: Academy): Observable<any> {

    return this.httpClient.put(this.apiURL, JSON.stringify(academy), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /*
  Chiamata rest DELETE "http://localhost:8080/rest/api/academies/code/{}"
  */
  removeAcademyByCode(code: string): Observable<any> {

    return this.httpClient.delete(this.apiURL + '/code/' + code)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /*
  Metodo che serve per gestire eventuali eccezioni derivanti da errori relativi alle chiamate REST
  */
  errorHandler(ecception: any) {

    let errorMessage = "";

    if (ecception.error instanceof ErrorEvent) {
      errorMessage = ecception.error.message;
    } else {
      errorMessage = "Error Code: ${error.status}\nMessage: ${error.message}";
    }
    return throwError(() => new Error(errorMessage));
  }
}
