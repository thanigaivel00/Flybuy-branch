import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import{CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
data:any={Username:"",Password:""};
Status:String='';
  
  constructor(private newadminservice:AdminService,private route:Router,private cookieservice:CookieService) { 
    if(this.cookieservice.get('Username')!=''&&this.cookieservice.get('Username')!='NOT FOUND')
    this.newadminservice.Current_User.Username=this.cookieservice.get('Username');
    this.newadminservice.Current_User.UserID=this.cookieservice.get('USerID');
    this.newadminservice.Current_User.LasttimeLogged=this.cookieservice.get('LasttimeLogged');
    this.route.navigate(['/order']);
  }
  ngOnInit(): void {
  }
  username(event:any):void
  {
    this.data.Username=event.target.value;
  }
  password(event:any):void{
    this.data.Password=event.target.value; 
  }
  check():void
  {
    this.newadminservice.getAdmin(JSON.stringify(this.data)).subscribe(data=>{this.newadminservice.Current_User=data;
      this.cookieservice.set('Username',data.Username);
      this.cookieservice.set('UserID',data.UserID);
      this.cookieservice.set('LasttimeLogged',data.LasttimeLogged);
      if(this.newadminservice.Current_User.Username==this.data.Username)
      {
        this.cookieservice.set('Username',data.Username);
      this.cookieservice.set('UserID',data.UserID);
      this.cookieservice.set('LasttimeLogged',data.LasttimeLogged);
        this.route.navigate(['/order']);}
      else
      {
        alert('Either username or password is wrong');
        location.reload();
      }
    });
      
  }


}
