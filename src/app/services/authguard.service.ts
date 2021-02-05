import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private newadminservice:AdminService,private route:Router) { }

canActivate(): Promise<boolean>
{
  return new Promise((resolve,reject)=>
  {
    this.newadminservice.islogged().then((data)=>{
  if(data)
  {
    resolve(true);
  }
  else
  {
    this.route.navigate(['/admin']);
    resolve(false);
  }
});
});
}
}
