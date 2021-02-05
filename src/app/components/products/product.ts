import { SafeUrl } from "@angular/platform-browser";

export interface IProduct {
    _id: String,
    category: String[],
    productName: String,
    productPrice: Number,
    productDescription : String,
    inventoryQuantity: number
}
export interface cart {
    id: String,
    Quantity: number,
    productprice:number,
    finalQuantity:number
}
export interface dislaydata {
    product:IProduct,
    ImageUrl:SafeUrl    
}
export interface AdminUser{
    Username:String,
    UserID:String,
    LasttimeLogged: String,
}
export interface Reportproduct{
        Product_id: string,
        Product_quantity: number,
        product_price: number,
        Total_price: number,
}
export interface Reportdata{
    Transaction_id :string,
    Cus_name :string,
    Contact :string,
    Products : Reportproduct[],
    Total_amount:number;
    Purcahsed_date :Date,
}



