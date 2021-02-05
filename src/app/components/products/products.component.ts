import { ReportsService } from './../../services/reports.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MystacksdataService } from './../../services/mystacksdata.service';
import { Component, OnInit } from '@angular/core';
import { IProduct, cart, dislaydata, Reportdata } from './product';



@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  Repdata : dislaydata[]=[];
  MainData: dislaydata[]=[];
  Imageurl:String[]=[];
  cartQuantity:cart[]=[];
  cartvalue:number=0;
  temp:IProduct[]=[];
  element:cart={id:'',Quantity:0,finalQuantity:0,productprice:0};
  cutomer:Reportdata={Transaction_id:"",Cus_name:"",Contact:"",Purcahsed_date:new Date(),Products:[],Total_amount:0};
  constructor(public newService : MystacksdataService,private sant:DomSanitizer,private reportservice:ReportsService) { 
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
  oncusname(event:any)
  {
    this.cutomer.Cus_name=event.target.value;
  }
  oncuscont(event:any)
  {
    this.cutomer.Contact=event.target.value;
  }
  ondate(event:any)
  {
    this.cutomer.Purcahsed_date=new Date(event.target.value);
  }
  addcart(event:any,value:any,price:number)
  {
    var found=false;
    var maxQunatity=false;
    var productname="";
    this.element.Quantity=Number(event.target.value);
    this.cartvalue=0;
    this.element.id=value;
    this.element.productprice=price;
    this.MainData.forEach(element=>{
      if(element.product._id==value)
      {
        if(element.product.inventoryQuantity>=this.element.Quantity)
        {
          this.element.finalQuantity=element.product.inventoryQuantity-this.element.Quantity;
          maxQunatity=true;
        }
        else
        {
        maxQunatity=false;
        productname=String(element.product.productName);
        }
      }
    });
    if(maxQunatity)
    {
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
      this.cartQuantity.push({id:this.element.id,Quantity:this.element.Quantity,finalQuantity:this.element.finalQuantity,productprice:this.element.productprice});
      this.cartvalue+=this.element.Quantity;
    }
  }
    else
    {
      this.element.id=value;
      console.log("Entered else1");
      this.cartQuantity.push({id:this.element.id,Quantity:this.element.Quantity,finalQuantity:this.element.finalQuantity,productprice:this.element.productprice});
      this.cartvalue+=this.element.Quantity;
    }
  }
  else{
    alert(productname+" Quantity is not Range check the amount of products");
    event.target.value=0; 
  }
  }  

  
  sendcart():void
  {
    if(this.cutomer.Cus_name!='')
    {
     this.cutomer.Transaction_id="#F"+Math.floor(Math.random()*10000000)+(new Date()).toString().substr(1,2)+"Y"
     this.cartQuantity.forEach(element=>{
     this.cutomer.Products.push({Product_id:String(element.id),product_price:this.element.productprice,Product_quantity:this.element.Quantity,Total_price:this.element.productprice*this.element.Quantity});
     });
     this.newService.updatedata(JSON.stringify(this.cartQuantity)).subscribe();
     this.reportservice.generatereport(JSON.stringify(this.cutomer)).subscribe();
     this.MainData=[];
     this.Imageurl=[];
     this.cartQuantity=[]
     this.cartvalue=0;
     location.reload();
    }
    else
    {
      alert("Pls Enter the Customer name:");
    }
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
