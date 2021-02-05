import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MystacksdataService {
  constructor(private http:HttpClient) { }

 GetUser(): Observable<any> 
 {

   return this.http.get('http://localhost:3001/getdata');
 } 
  getimage(id:any): Observable<any>
  {

    return this.http.get('http://localhost:3001/ProductImage/'+id,{responseType:"blob"});
  }
  updatedata(datas:any): Observable<any>
  {
    const header={'Content-Type': 'application/json'};
    return this.http.post('http://localhost:3001/updatedata',datas,{headers:header});
  }
}