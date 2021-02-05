import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http :HttpClient) { }

  generatereport(data:string): Observable<any>
  {
    const header={'Content-Type': 'application/json'};
    return this.http.post("http://localhost:3001/insertreport",data,{headers:header});
  }
}
