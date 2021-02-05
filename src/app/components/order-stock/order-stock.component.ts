import { element } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from './../../services/admin.service';
import { MystacksdataService } from './../../services/mystacksdata.service';

import { IProduct, dislaydata, cart } from './../products/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-stock',
  templateUrl: './order-stock.component.html',
  styleUrls: ['./order-stock.component.css']
})
export class OrderStockComponent implements OnInit {
  Repdata : dislaydata[]=[];
  MainData: dislaydata[]=[];
  Imageurl:String[]=[];
  cartQuantity:cart[]=[];
  cartvalue:number=0;
  temp:IProduct[]=[];
   element:cart={id:'',Quantity:0,finalQuantity:0};
  constructor(public newService : MystacksdataService,private newadminservice:AdminService,private sant:DomSanitizer) { 
    this.newService.GetUser().subscribe(data => {
      this.temp=data;
      this.temp.forEach(element=>{
        this.newService.getimage(element._id).subscribe(image=>{
          var urlsd=window.URL.createObjectURL(image);
          var urls=this.sant.bypassSecurityTrustUrl(urlsd);
          this.MainData.push({product:element,ImageUrl:urls})
        });
 });
 
 this.Repdata=this.MainData;
   });
   
   }
  ngOnInit(): void {
  }
  addcart(event:any,value:any)
  {
    var found=false;
    this.element.Quantity=Number(event.target.value);
    this.cartvalue=0;
    this.element.id=value;
    this.MainData.forEach(element=>{
      if(element.product._id==value)
      {
        this.element.finalQuantity=element.product.inventoryQuantity-this.element.Quantity;
      }
    });
    if(this.cartQuantity.length>0)
    {
    this.cartQuantity.forEach(element=>{
      if(element.id==value)
        {
          element.Quantity=this.element.Quantity;
          element.finalQuantity=this.element.finalQuantity;
          found=true;
        }
      this.cartvalue+=element.Quantity;
    });
    if(!found)
    { 
      this.cartQuantity.push({id:this.element.id,Quantity:this.element.Quantity,finalQuantity:this.element.finalQuantity});
      this.cartvalue+=this.element.Quantity;
    }
  }
    else
    {
      this.element.id=value;
      console.log("Entered else1");
      this.cartQuantity.push({id:this.element.id,Quantity:this.element.Quantity,finalQuantity:this.element.finalQuantity});
      this.cartvalue+=this.element.Quantity;
    }
    console.log(this.cartQuantity);
  }
  logout():void{
    this.newadminservice.logout();
  }
  

 
    
  
  sendcart():void
  {
    console.log(JSON.stringify(this.cartQuantity));
    this.newService.updatedata(JSON.stringify(this.cartQuantity)).subscribe();
    this.MainData=[];
    this.Imageurl=[];
    this.newService.GetUser().subscribe(data => {
      this.temp=data;
      this.temp.forEach(element=>{
        this.MainData.push({product:element,ImageUrl: 'assets/images/'+element._id+'.jpg'});
 });
 this.Repdata=this.MainData;
   });
  }
  onfilter(event:any):void{
    this.Repdata=[];
    if(event.target.value!='')
    this.MainData.forEach(element=>{
      if(element.product.productName.toLowerCase().includes(event.target.value.toLowerCase()))
      {
        this.Repdata.push(element);
      }
    });
    else{
      this.Repdata=this.MainData;
    }

  }


}
