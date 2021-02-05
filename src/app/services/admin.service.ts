import { Router } from '@angular/router';
import { AdminUser } from './../components/products/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  Current_User:AdminUser={Username:"",UserID:"",LasttimeLogged:""};
  constructor(private http:HttpClient,private router:Router,private cookieservice:CookieService) { }
  getAdmin(data:String): Observable<any>
  {
    const header={'Content-Type': 'application/json'};
    return this.http.post("http://localhost:3001/admindata",data,{headers:header});
  }
  islogged(): Promise<boolean>
{
  return new Promise((resolve,reject)=>
  {
  if(this.Current_User.Username!="NOT FOUND"&& this.Current_User.Username!="")
  {
    console.log("Logged");
    console.log(this.Current_User.Username);
    resolve(true);
  }
  else
  {
    console.log("Not Logged ");
    resolve(false);
  }
});
}
logout(): void
{  
  this.Current_User={Username:"",UserID:"",LasttimeLogged:""};
  this.cookieservice.set('Username',"");
      this.cookieservice.set('UserID',"");
      this.cookieservice.set('LasttimeLogged',"");
  this.router.navigate(['/admin']);
}
}
