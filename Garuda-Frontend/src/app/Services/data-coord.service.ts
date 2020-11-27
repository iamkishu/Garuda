import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataCoordService {


  private logListUrl = 'https://ms-iot-api.azurewebsites.net/data/getData';
  private logListUrl1 = 'https://ms-iot-api.azurewebsites.net/data/updateData';
  //private logUrl =  environment.BASE_URL + '/patient/cons/dairy';
  
    private rxjsOb = new BehaviorSubject<any>([]);
    rxJsInfo = this.rxjsOb.asObservable();
  
    headerOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) { }
    rxjsUpdateInfo(value) {
      this.rxjsOb.next(value);
    }
  
    
  
    logList(): Observable<any> {
      //console.log(data.patientEmail);
      return this.http.get(this.logListUrl).pipe(
        catchError(this.handleError)
      );
    }

    log(bodyData): Observable<any> {
      //console.log(data.patientEmail);
      return this.http.post(this.logListUrl1,bodyData).pipe(
        catchError(this.handleError)
      );
    }
  
  
  
    private handleError(err: HttpErrorResponse) {
      return throwError(err.error);
    }
  }


